import { useFrame, useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import React, { useEffect, useRef, useCallback } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import { ValueInterpolator } from "../utils/interpolation"
import { collectJoints } from "./robotModelLogic"
import { useAutorun } from "../utils/hooks"

type RobotAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: DHParameter[]
  onRotationChanged?: (joints: Object3D[], jointValues: number[]) => void
  children: React.ReactNode
}

export default function RobotAnimator({
  rapidlyChangingMotionState,
  dhParameters,
  onRotationChanged,
  children,
}: RobotAnimatorProps) {
  const jointValues = useRef<number[]>([])
  const jointObjects = useRef<Object3D[]>([])
  const interpolatorRef = useRef<ValueInterpolator | null>(null)
  const { invalidate } = useThree()

  // Initialize interpolator
  useEffect(() => {
    const initialJointValues = rapidlyChangingMotionState.joint_position.filter(
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
  useFrame((state, delta) => {
    if (interpolatorRef.current) {
      const isComplete = interpolatorRef.current.update(delta)
      setRotation()

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
    setRotation()
    invalidate()
  }

  function setRotation() {
    const updatedJointValues = interpolatorRef.current?.getCurrentValues() || []

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
