import { useFrame, useThree } from "@react-three/fiber"
import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import { autorun, observable, runInAction } from "mobx"
import { useEffect, useRef, useState } from "react"
import { ValueInterpolator } from "../utils/interpolation"

/**
 * The smoothing of the visualizers that draw in a canvas (`SupportedRobot`,
 * `SupportedLinearAxis`, `MotionGroupVisualizer`): the spring of
 * `useSmoothedMotionState`, stepped in React Three Fiber's frame loop instead
 * of a `requestAnimationFrame` loop of its own.
 *
 * Each frame steps the spring by that frame's time and sets the joints
 * before R3F draws the frame, so a drawn frame shows the spring at its own
 * time. In a loop of its own, the spring stepped after R3F drew (the drawn
 * frame showed the step of the frame before) or before it, as the browser
 * happened to order the two callbacks, and each step lasted from one of its
 * callbacks to the next, which moved with how long the drawing took: the
 * robot moved in uneven steps.
 *
 * The canvas draws while the spring moves and rests once it settled. Setting
 * the joints makes the animator invalidate from inside R3F's frame, which R3F
 * takes as a request for one more frame: the canvas draws one frame after
 * the spring settled.
 *
 * Returns the same as `useSmoothedMotionState`: a stable, MobX-observable
 * motion state whose `joint_position` changes in place, so a message of the
 * stream re-renders no React component. Only inside a `<Canvas>`.
 */
export function useFrameSmoothedMotionState(
  motionState: MotionGroupState,
): MotionGroupState {
  const invalidate = useThree((state) => state.invalidate)
  // joint_position is set by the frame loop; every other field mirrors the
  // latest input
  const [smoothed] = useState<MotionGroupState>(() =>
    observable({ ...motionState }),
  )
  const [spring] = useState(() => new ValueInterpolator(jointsOf(motionState)))
  /** When the spring started from rest, while it moves; null at rest */
  const movingSince = useRef<number | null>(null)

  useFrame((_state, delta) => {
    const since = movingSince.current
    if (since === null) return

    // The spring rests until its target arrives, however long ago the
    // canvas drew its last frame
    const elapsed = Math.min(delta, (performance.now() - since) / 1000)
    const settled = spring.update(elapsed)
    runInAction(() => {
      smoothed.joint_position = spring.getCurrentValues()
    })

    if (settled) {
      movingSince.current = null
    } else {
      invalidate()
    }
  })

  // Re-target the spring whenever the input changes: the autorun follows
  // in-place changes of an observable motion state, the effect a new one
  useEffect(
    () =>
      autorun(() => {
        spring.setTarget(jointsOf(motionState))
        mirrorOtherFields(motionState, smoothed)
        movingSince.current ??= performance.now()
        invalidate()
      }),
    [motionState, smoothed, spring, invalidate],
  )

  return smoothed
}

function jointsOf(state: MotionGroupState) {
  return state.joint_position.filter(
    (value): value is number => value !== undefined,
  )
}

/**
 * Copies the fields other than `joint_position`, writing only the changed
 * ones, so that the fields that did not change notify no one
 */
function mirrorOtherFields(from: MotionGroupState, to: MotionGroupState) {
  runInAction(() => {
    const source = from as unknown as Record<string, unknown>
    const target = to as unknown as Record<string, unknown>
    for (const key of Object.keys(source)) {
      if (key !== "joint_position" && target[key] !== source[key]) {
        target[key] = source[key]
      }
    }
  })
}
