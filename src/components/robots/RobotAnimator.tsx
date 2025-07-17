import { Globals, useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React, { useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
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
  const jointValues = useRef<number[]>([])
  const jointObjects = useRef<Object3D[]>([])
  const isInitialized = useRef(false)
  const { invalidate } = useThree()

  // Use a direct spring that responds to joint value changes
  const currentJointValues =
    rapidlyChangingMotionState.state.joint_position.joints.filter(
      (item) => item !== undefined,
    )

  const targetValues = Object.fromEntries(
    currentJointValues.map((value, index) => [index.toString(), value]),
  )

  const springProps = useSpring({
    ...targetValues,
    onChange: () => {
      setRotation()
      invalidate()
    },
    config: { tension: 120, friction: 20 },
  })

  useAutorun(() => {
    const newJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    jointValues.current = newJointValues
    // The spring will automatically update via the dependency on currentJointValues
  })

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Only set initial position if robot is fully initialized
    if (isRobotFullyInitialized()) {
      setRotation()
      invalidate()
    }
  }

  function setRotation() {
    // Use the comprehensive validation function
    if (!isRobotFullyInitialized()) {
      return
    }

    const updatedJointValues = jointObjects.current.map((_, objectIndex) => {
      const key = objectIndex.toString()
      const springValue = (springProps as any)[key]
      return springValue ? springValue.get() : 0
    })

    if (onRotationChanged) {
      // Since we've validated everything, all joints should be valid
      // But let's still be defensive and only pass valid joints
      const validJoints = jointObjects.current.filter(
        (joint): joint is Object3D => joint != null,
      )

      if (validJoints.length === jointObjects.current.length) {
        // All joints are valid, pass them with corresponding values
        onRotationChanged(validJoints, updatedJointValues)
      } else {
        // Some joints are invalid, don't call the callback
        console.warn(
          "RobotAnimator: Some joints are invalid, skipping onRotationChanged callback",
        )
      }
    } else {
      for (const [index, object] of jointObjects.current.entries()) {
        // Skip if object or dhParameter is undefined
        if (!object || !dhParameters[index]) continue

        const dhParam = dhParameters[index]
        const rotationOffset = dhParam.theta || 0
        const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

        object.rotation.y =
          rotationSign * (updatedJointValues[index] || 0) + rotationOffset
      }
    }
  }

  function isRobotFullyInitialized(): boolean {
    return (
      jointObjects.current.length > 0 &&
      jointObjects.current.every(
        (joint): joint is Object3D => joint !== undefined && joint !== null,
      ) &&
      Object.keys(springProps as any).length > 0 &&
      dhParameters.length === jointObjects.current.length &&
      dhParameters.every((param): param is DHParameter => param !== undefined)
    )
  }

  return <group ref={setGroupRef}>{children}</group>
}
