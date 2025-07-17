import { useFrame, useThree } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React, { useEffect, useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import { ValueInterpolator } from "../utils/interpolation"
import { collectJoints } from "./robotModelLogic"

type RobotAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
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
    const initialJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    interpolatorRef.current = new ValueInterpolator(initialJointValues, {
      alpha: 0.15, // Frame-rate independent interpolation
      easing: "spring", // Spring-like animation to match the previous feel
      threshold: 0.001,
    })

    return () => {
      interpolatorRef.current?.destroy()
    }
  }, [])

  // Frame-rate independent animation loop
  useFrame((state, delta) => {
    if (interpolatorRef.current) {
      interpolatorRef.current.update(delta)
      setRotation()
      invalidate()
    }
  })

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Set initial position
    setRotation()
    invalidate()
  }

  function updateJoints(newJointValues: number[]) {
    jointValues.current = newJointValues
    interpolatorRef.current?.setTarget(newJointValues)
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

  useAutorun(() => {
    const newJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    requestAnimationFrame(() => updateJoints(newJointValues))
  })

  return <group ref={setGroupRef}>{children}</group>
}
