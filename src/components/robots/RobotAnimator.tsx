import { useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React, { useRef } from "react"
import type { Group, Object3D } from "three"
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
  const jointObjects = useRef<Object3D[]>([])
  const { invalidate } = useThree()

  function setGroupRef(group: Group | null) {
    if (!group) return
    jointObjects.current = collectJoints(group)

    // Trigger callback if provided
    if (onRotationChanged) {
      const joints = rapidlyChangingMotionState.state.joint_position.joints
      const filteredJoints = joints.filter((item) => item !== undefined)
      onRotationChanged(jointObjects.current, filteredJoints)
    }
  }

  // Get current joint values
  const joints = rapidlyChangingMotionState.state.joint_position.joints
  const filteredJoints = joints.filter((item) => item !== undefined)

  // Create spring values for each joint - declarative approach
  const springValues: Record<string, number> = {}
  for (
    let index = 0;
    index < Math.min(dhParameters.length, filteredJoints.length);
    index++
  ) {
    const dhParam = dhParameters[index]
    const jointValue = filteredJoints[index]!
    const rotationOffset = dhParam.theta || 0
    const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

    springValues[`joint${index}`] = rotationSign * jointValue + rotationOffset
  }

  // Declarative spring that automatically animates when target values change
  const jointRotations = useSpring({
    ...springValues,
    config: { tension: 120, friction: 20 }, // Smooth but responsive
    onChange: () => {
      // Apply rotations to joint objects
      for (const [index, object] of jointObjects.current.entries()) {
        const jointKey = `joint${index}`
        if (jointKey in jointRotations) {
          object.rotation.y = (jointRotations as any)[jointKey].get()
        }
      }
      invalidate()
    },
  })

  return <group ref={setGroupRef}>{children}</group>
}
