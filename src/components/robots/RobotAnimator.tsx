import { useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import type React from "react"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import { collectJoints } from "./robotModelLogic"

export type RobotAnimatorHandle = {
  /**
   * Re-scan the robot group for joints and re-apply the current pose.
   * Must be called whenever the (async-loaded) robot model mounts its
   * meshes into the scene, since the group ref callback only fires when
   * the outer group itself mounts — not when its children appear later.
   */
  recollectJoints: () => void
}

type RobotAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: DHParameter[]
  onRotationChanged?: (joints: Object3D[], jointValues: number[]) => void
  children: React.ReactNode
}

/**
 * Applies the incoming motion state to the robot's joints, as-is.
 *
 * This component performs no smoothing: it renders exactly the pose it is
 * given. If damped/spring transitions are desired, run the motion state
 * through {@link useSmoothedMotionState} before passing it here.
 */
const RobotAnimator = forwardRef<RobotAnimatorHandle, RobotAnimatorProps>(
  function RobotAnimator(
    { rapidlyChangingMotionState, dhParameters, onRotationChanged, children },
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
     * (Re)scan the robot group for joints and re-apply the current pose.
     * Safe to call repeatedly — exposed via the imperative handle so it can
     * be triggered when the async robot model finishes mounting.
     */
    function recollectJoints() {
      if (!groupRef.current) return

      jointObjects.current = collectJoints(groupRef.current)

      // Apply the current pose to the freshly collected joints
      setRotation()
      invalidate()
    }

    // No deps array: re-expose the current closure each render so ref-triggered
    // calls never apply rotation using stale dhParameters / onRotationChanged props.
    useImperativeHandle(ref, () => ({ recollectJoints }))

    function setRotation() {
      const values = jointValues.current

      if (onRotationChanged) {
        onRotationChanged(jointObjects.current, values)
      } else {
        for (const [index, object] of jointObjects.current.entries()) {
          const dhParam = dhParameters[index]
          const rotationOffset = dhParam.theta || 0
          const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

          object.rotation.y =
            rotationSign * (values[index] || 0) + rotationOffset
        }
      }
    }

    // Single path for applying new joint values — works for both MobX and plain props
    function applyMotionState(state: MotionGroupState) {
      jointValues.current = state.joint_position.filter(
        (value): value is number => value !== undefined,
      )
      setRotation()
      invalidate()
    }

    /**
     * MobX path: autorun tracks observable reads inside the callback.
     * Reads motionStateRef.current which dereferences the observable's properties.
     */
    useAutorun(() => {
      applyMotionState(motionStateRef.current)
    })

    /**
     * Plain-prop path: catch reference changes not tracked by MobX.
     * Re-applying the same values is idempotent and cheap.
     */
    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
    useEffect(() => {
      applyMotionState(rapidlyChangingMotionState)
    }, [rapidlyChangingMotionState])

    return <group ref={setGroupRef}>{children}</group>
  },
)

export default RobotAnimator
