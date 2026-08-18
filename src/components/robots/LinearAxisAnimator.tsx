import { useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import type React from "react"
import { useEffect, useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import { collectJoints } from "./robotModelLogic"

type LinearAxisAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: DHParameter[]
  onTranslationChanged?: (joints: Object3D[], jointValues: number[]) => void
  children: React.ReactNode
}

/**
 * Applies the incoming motion state to the linear axis, as-is.
 *
 * This component performs no smoothing: it renders exactly the pose it is
 * given. If damped/spring transitions are desired, run the motion state
 * through {@link useSmoothedMotionState} before passing it here.
 */
export default function LinearAxisAnimator({
  rapidlyChangingMotionState,
  dhParameters,
  onTranslationChanged,
  children,
}: LinearAxisAnimatorProps) {
  const jointObjects = useRef<Object3D[]>([])
  const jointValues = useRef<number[]>(
    rapidlyChangingMotionState.joint_position.filter(
      (value): value is number => value !== undefined,
    ),
  )
  const { invalidate } = useThree()
  const motionStateRef = useRef(rapidlyChangingMotionState)
  motionStateRef.current = rapidlyChangingMotionState

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Set initial position
    setTranslation()
    invalidate()
  }

  function setTranslation() {
    const values = jointValues.current

    if (onTranslationChanged) {
      onTranslationChanged(jointObjects.current, values)
    } else {
      // For linear axes, we apply translation instead of rotation
      for (const [index, object] of jointObjects.current.entries()) {
        const dhParam = dhParameters[index]
        const translationSign = dhParam.reverse_rotation_direction ? -1 : 1

        // Apply linear translation along Y axis
        // Convert from millimeters to meters
        object.position.y = (translationSign * (values[index] || 0)) / 1000
      }
    }
  }

  // Single path for applying new joint values — works for both MobX and plain props
  function applyMotionState(state: MotionGroupState) {
    jointValues.current = state.joint_position.filter(
      (value): value is number => value !== undefined,
    )
    setTranslation()
    invalidate()
  }

  /**
   * MobX path: autorun tracks observable reads inside the callback.
   */
  useAutorun(() => {
    applyMotionState(motionStateRef.current)
  })

  /**
   * Plain-prop path: catch reference changes not tracked by MobX.
   */
  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    applyMotionState(rapidlyChangingMotionState)
  }, [rapidlyChangingMotionState])

  return <group ref={setGroupRef}>{children}</group>
}
