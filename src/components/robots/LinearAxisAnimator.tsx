import { useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import type React from "react"
import { forwardRef, useImperativeHandle, useRef } from "react"
import type { Group, Object3D, Quaternion } from "three"
import { useAutorun } from "../utils/hooks"
import { collectJoints } from "./robotModelLogic"

export type LinearAxisAnimatorHandle = {
  /**
   * Re-scan the linear axis group for joints and re-apply the current
   * position. Must be called whenever the (async-loaded) model mounts its
   * meshes into the scene, since the group ref callback only fires when the
   * outer group itself mounts — not when its children appear later.
   */
  recollectJoints: () => void
}

type LinearAxisAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: DHParameter[]
  chainOffsetPosition?: [number, number, number]
  chainOffsetQuaternion?: Quaternion
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
const LinearAxisAnimator = forwardRef<
  LinearAxisAnimatorHandle,
  LinearAxisAnimatorProps
>(function LinearAxisAnimator(
  {
    rapidlyChangingMotionState,
    dhParameters,
    chainOffsetPosition,
    chainOffsetQuaternion,
    onTranslationChanged,
    children,
  },
  ref,
) {
  const groupRef = useRef<Group | null>(null)
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
    groupRef.current = group
    if (!group) return

    recollectJoints()
  }

  /**
   * (Re)scan the linear axis group for joints and re-apply the current
   * position. Safe to call repeatedly — exposed via the imperative handle so
   * it can be triggered when the async model finishes mounting.
   */
  function recollectJoints() {
    if (!groupRef.current) return

    jointObjects.current = collectJoints(groupRef.current)

    // Set initial position
    setTranslation()
    invalidate()
  }

  // No deps array: re-expose the current closure each render so ref-triggered
  // calls never apply positions using stale dhParameters / props.
  useImperativeHandle(ref, () => ({ recollectJoints }))

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

  return (
    <group
      ref={setGroupRef}
      position={chainOffsetPosition}
      quaternion={chainOffsetQuaternion}
    >
      {children}
    </group>
  )
})

export default LinearAxisAnimator
