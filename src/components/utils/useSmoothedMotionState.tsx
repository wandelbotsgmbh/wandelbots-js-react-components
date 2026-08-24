import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import { autorun, observable, runInAction } from "mobx"
import { useEffect, useRef, useState } from "react"
import { useMounted } from "./hooks"
import { type InterpolationOptions, ValueInterpolator } from "./interpolation"

/**
 * Smooths the joint stream of a `MotionGroupState` and returns a new, derived
 * motion state to feed the robot visualizer.
 *
 * Smoothing is a transformation over the joint stream, not a concern of the
 * visualizer: the visualizer renders whatever pose it is given, as-is. This
 * hook sits in front of it — `raw stream → useSmoothedMotionState → visualizer`
 * — so consumers who want spring-damped previews opt in, and consumers who
 * stream already-exact poses (e.g. scrubbing a planned trajectory) simply skip
 * it and get frame-accurate tracking.
 *
 * The returned object is a **stable, MobX-observable** motion state whose
 * `joint_position` is mutated in place every animation frame while the spring
 * settles. Because the object identity never changes, passing it to
 * `<SupportedRobot rapidlyChangingMotionState={...} />` triggers no React
 * re-renders — the visualizer's own MobX autorun reacts to the mutation and
 * updates the scene directly. All non-joint fields mirror the latest input.
 *
 * @example
 * ```tsx
 * const smoothed = useSmoothedMotionState(
 *   connectedMotionGroup.rapidlyChangingMotionState,
 *   { tension: 120, friction: 20 },
 * )
 *
 * <SupportedRobot rapidlyChangingMotionState={smoothed} {...props} />
 * ```
 */
export function useSmoothedMotionState(
  motionState: MotionGroupState,
  options?: InterpolationOptions,
): MotionGroupState {
  // Stable observable output. `joint_position` is owned by the frame loop;
  // every other field mirrors the latest input (see pushTarget).
  const [smoothed] = useState<MotionGroupState>(() =>
    observable({ ...motionState }),
  )

  const interpolatorRef = useRef<ValueInterpolator | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef(0)

  function stopLoop() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }

  function frame() {
    const interpolator = interpolatorRef.current
    if (!interpolator) return

    const now = performance.now()
    const delta = (now - lastFrameTimeRef.current) / 1000
    lastFrameTimeRef.current = now

    const isComplete = interpolator.update(delta)

    runInAction(() => {
      smoothed.joint_position = interpolator.getCurrentValues()
    })

    // Tick until the spring settles, then idle until the next target arrives.
    frameRef.current = isComplete ? null : requestAnimationFrame(frame)
  }

  function startLoop() {
    if (frameRef.current === null) {
      lastFrameTimeRef.current = performance.now()
      frameRef.current = requestAnimationFrame(frame)
    }
  }

  function pushTarget(state: MotionGroupState) {
    const target = state.joint_position.filter(
      (value): value is number => value !== undefined,
    )
    interpolatorRef.current?.setTarget(target)

    // Mirror non-joint fields so the returned value stays a faithful snapshot.
    // Only write fields that actually changed, so we don't emit MobX change
    // notifications for untouched fields on every stream frame.
    runInAction(() => {
      const from = state as unknown as Record<string, unknown>
      const to = smoothed as unknown as Record<string, unknown>
      for (const key of Object.keys(from)) {
        if (key !== "joint_position" && to[key] !== from[key]) {
          to[key] = from[key]
        }
      }
    })

    startLoop()
  }

  // Create the interpolator once, seeded with the initial pose.
  useMounted(() => {
    const initial = motionState.joint_position.filter(
      (value): value is number => value !== undefined,
    )
    interpolatorRef.current = new ValueInterpolator(initial, options)

    return () => {
      stopLoop()
      interpolatorRef.current?.destroy()
    }
  })

  // Reflect option changes onto the live interpolator.
  useEffect(() => {
    if (options) interpolatorRef.current?.updateOptions(options)
  }, [options])

  // Re-target the interpolator whenever the input changes.
  //
  // The autorun tracks the observable reads inside pushTarget, so in-place
  // mutations of a stable observable re-fire it. Recreating the autorun when
  // the motionState *identity* changes resubscribes to a swapped observable
  // (and covers plain, non-observable props, which change by reference).
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-subscribe only on input identity change; pushTarget reads refs and is safe to re-invoke
  useEffect(() => {
    return autorun(() => pushTarget(motionState))
  }, [motionState])

  return smoothed
}
