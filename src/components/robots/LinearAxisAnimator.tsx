import { useFrame, useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import {
  type MotionInterpolator,
  type MotionInterpolatorFactory,
  ValueInterpolator,
} from "../utils/interpolation"
import { collectJoints } from "./robotModelLogic"

type LinearAxisAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: DHParameter[]
  onTranslationChanged?: (joints: Object3D[], jointValues: number[]) => void
  /**
   * Strategy used to interpolate joint values towards each incoming motion
   * state. Defaults to spring smoothing via {@link ValueInterpolator}. Provide a
   * custom {@link MotionInterpolatorFactory} to tune the spring, follow the
   * streamed pose exactly (no smoothing), or plug in any other behaviour.
   */
  createInterpolator?: MotionInterpolatorFactory
  children: React.ReactNode
}

const defaultCreateInterpolator: MotionInterpolatorFactory = (initialValues) =>
  new ValueInterpolator(initialValues)

export default function LinearAxisAnimator({
  rapidlyChangingMotionState,
  dhParameters,
  onTranslationChanged,
  createInterpolator = defaultCreateInterpolator,
  children,
}: LinearAxisAnimatorProps) {
  const jointValues = useRef<number[]>([])
  const jointObjects = useRef<Object3D[]>([])
  const interpolatorRef = useRef<MotionInterpolator | null>(null)
  const { invalidate } = useThree()

  // Read the factory once on mount (see MotionInterpolatorFactory docs).
  const createInterpolatorRef = useRef(createInterpolator)

  // Initialize interpolator
  // biome-ignore lint/correctness/useExhaustiveDependencies: pre-biome code
  useEffect(() => {
    const initialJointValues = rapidlyChangingMotionState.joint_position.filter(
      (item) => item !== undefined,
    )

    interpolatorRef.current = createInterpolatorRef.current(initialJointValues)

    return () => {
      interpolatorRef.current?.destroy?.()
    }
  }, [])

  // Animation loop that runs at the display's refresh rate
  useFrame((state, delta) => {
    if (interpolatorRef.current) {
      const isComplete = interpolatorRef.current.update(delta)
      setTranslation()

      // Trigger a re-render only if the animation is still running
      if (!isComplete) {
        invalidate()
      }
    }
  })

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Set initial position
    setTranslation()
    invalidate()
  }

  function setTranslation() {
    const updatedJointValues = interpolatorRef.current?.getCurrentValues() || []

    if (onTranslationChanged) {
      onTranslationChanged(jointObjects.current, updatedJointValues)
    } else {
      // For linear axes, we apply translation instead of rotation
      for (const [index, object] of jointObjects.current.entries()) {
        const dhParam = dhParameters[index]
        const translationSign = dhParam.reverse_rotation_direction ? -1 : 1

        // Apply linear translation along Y axis
        // Convert from millimeters to meters
        object.position.y =
          (translationSign * (updatedJointValues[index] || 0)) / 1000
      }
    }
  }

  const updateJoints = useCallback(() => {
    const newJointValues = rapidlyChangingMotionState.joint_position.filter(
      (item) => item !== undefined,
    )

    requestAnimationFrame(() => {
      jointValues.current = newJointValues
      interpolatorRef.current?.setTarget(newJointValues)
    })
  }, [rapidlyChangingMotionState])

  /**
   * Fire an update joints call on every motion state change.
   * requestAnimationFrame used to avoid blocking main thread
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: pre-biome code
  useEffect(() => {
    updateJoints()
  }, [rapidlyChangingMotionState, updateJoints])

  /**
   * As some consumer applications (eg. storybook) deliver
   * mobx observable for rapidlyChangingMotionState, we need to
   * register the watcher to get the newest value updates
   */
  useAutorun(() => {
    updateJoints()
  })

  return <group ref={setGroupRef}>{children}</group>
}
