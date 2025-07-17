import { Globals, useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React, { useMemo, useRef } from "react"
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
  Globals.assign({ frameLoop: "always" })
  const jointObjects = useRef<Object3D[]>([])
  const { invalidate } = useThree()

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Set initial position
    setRotation()
    invalidate()
  }

  // Extract joint values
  const jointValues = useMemo(
    () =>
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      ),
    [rapidlyChangingMotionState.state.joint_position.joints],
  )

  // Create dynamic spring configuration based on actual number of joints
  const springConfig = useMemo(() => {
    const config: any = {
      config: {
        tension: 120,
        friction: 20,
      },
      onChange: () => {
        // This is critical: trigger setRotation when spring values change
        setRotation()
        invalidate()
      },
    }

    // Add joint values dynamically based on dhParameters length
    dhParameters.forEach((_, index) => {
      config[`joint${index}`] = jointValues[index] || 0
    })

    return config
  }, [jointValues, dhParameters.length])

  const axisValues = useSpring(springConfig)

  // Update setRotation to use the dynamic spring values
  function setRotation() {
    const updatedJointValues = dhParameters.map((_, index) => {
      const springValue = (axisValues as any)[`joint${index}`]
      return springValue ? springValue.get() : 0
    })

    if (onRotationChanged) {
      onRotationChanged(jointObjects.current, updatedJointValues)
    } else {
      for (const [index, object] of jointObjects.current.entries()) {
        const dhParam = dhParameters[index]
        const rotationOffset = dhParam.theta || 0
        const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

        object.rotation.y =
          rotationSign * updatedJointValues[index]! + rotationOffset
      }
    }
  }

  return <group ref={setGroupRef}>{children}</group>
}
