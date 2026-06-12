import { useFrame, useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import type React from "react"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import { ValueInterpolator } from "../utils/interpolation"
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

const RobotAnimator = forwardRef<RobotAnimatorHandle, RobotAnimatorProps>(
  function RobotAnimator(
    { rapidlyChangingMotionState, dhParameters, onRotationChanged, children },
    ref,
  ) {
    const groupRef = useRef<Group | null>(null)
    const jointObjects = useRef<Object3D[]>([])
    const interpolatorRef = useRef<ValueInterpolator | null>(null)
    const { invalidate } = useThree()
    const motionStateRef = useRef(rapidlyChangingMotionState)
    motionStateRef.current = rapidlyChangingMotionState

    // Initialize interpolator
    // biome-ignore lint/correctness/useExhaustiveDependencies: pre-biome code
    useEffect(() => {
      const initialJointValues =
        rapidlyChangingMotionState.joint_position.filter(
          (item) => item !== undefined,
        )

      interpolatorRef.current = new ValueInterpolator(initialJointValues, {
        tension: 120, // Controls spring stiffness - higher values create faster, more responsive motion
        friction: 20, // Controls damping - higher values reduce oscillation and create smoother settling
        threshold: 0.001,
      })

      return () => {
        interpolatorRef.current?.destroy()
      }
    }, [])

    // Animation loop that runs at the display's refresh rate
    useFrame((_state, delta) => {
      if (!interpolatorRef.current) return

      // Safety net: if the model mounted its meshes after our group ref
      // already fired (the common async case), the joints won't have been
      // collected yet. Re-scan while we have a group but no joints.
      if (jointObjects.current.length === 0 && groupRef.current) {
        recollectJoints()
      }

      const isComplete = interpolatorRef.current.update(delta)
      setRotation()

      // Trigger a re-render only if the animation is still running
      if (!isComplete) {
        invalidate()
      }
    })

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

    // biome-ignore lint/correctness/useExhaustiveDependencies: recollectJoints is a stable closure reading refs
    useImperativeHandle(ref, () => ({ recollectJoints }), [])

    function setRotation() {
      const updatedJointValues =
        interpolatorRef.current?.getCurrentValues() || []

      if (onRotationChanged) {
        onRotationChanged(jointObjects.current, updatedJointValues)
      } else {
        for (const [index, object] of jointObjects.current.entries()) {
          const dhParam = dhParameters[index]
          const rotationOffset = dhParam.theta || 0
          const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

          object.rotation.y =
            rotationSign * (updatedJointValues[index] || 0) + rotationOffset
        }
      }
    }

    // Single path for feeding new joint targets — works for both MobX and plain props
    function applyMotionState(state: MotionGroupState) {
      const newJointValues = state.joint_position.filter(
        (item) => item !== undefined,
      )
      interpolatorRef.current?.setTarget(newJointValues)
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
     * Calling setTarget with the same values is idempotent and cheap.
     */
    // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
    useEffect(() => {
      applyMotionState(rapidlyChangingMotionState)
    }, [rapidlyChangingMotionState])

    return <group ref={setGroupRef}>{children}</group>
  },
)

export default RobotAnimator
