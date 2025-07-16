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
  const { invalidate } = useThree()

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Set initial position only if we have valid joint objects
    if (
      jointObjects.current.length > 0 &&
      jointObjects.current.every((obj) => obj != null)
    ) {
      // Use requestAnimationFrame to ensure axisValues is ready
      requestAnimationFrame(() => {
        setRotation()
        invalidate()
      })
    }
  }

  function updateJoints(newJointValues: number[]) {
    jointValues.current = newJointValues
    setSpring.start(Object.assign({}, jointValues.current) as any)
  }

  const [axisValues, setSpring] = useSpring(() => {
    const currentJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    return {
      ...Object.assign({}, currentJointValues),
      onChange: () => {
        setRotation()
        invalidate()
      },
      onResolve: () => {
        setRotation()
      },
    }
  })

  function setRotation() {
    // Safety check to prevent race condition
    if (
      jointObjects.current.length === 0 ||
      !jointObjects.current.every((obj) => obj != null)
    ) {
      return
    }

    const updatedJointValues = jointObjects.current.map((_, objectIndex) =>
      (axisValues as any)[objectIndex].get(),
    )

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

  useAutorun(() => {
    const newJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    requestAnimationFrame(() => {
      // Check if spring values are significantly different from target values
      const currentSpringValues = jointObjects.current.map(
        (_, index) => (axisValues as any)[index]?.get() || 0,
      )

      const maxDifference = Math.max(
        ...newJointValues.map((newValue, index) =>
          Math.abs(newValue - (currentSpringValues[index] || 0)),
        ),
      )

      // Be more aggressive about detecting "snap back" situations
      // If difference is large (> 0.05 radians ~= 2.9 degrees), reset immediately
      // This handles focus restoration and other cases where animation would be jarring
      if (maxDifference > 0.05) {
        jointValues.current = newJointValues
        setSpring.set(Object.assign({}, jointValues.current) as any)
        // Force immediate rotation update
        setRotation()
        invalidate()
      } else {
        // Normal smooth animation for small changes
        updateJoints(newJointValues)
      }
    })
  })

  return <group ref={setGroupRef}>{children}</group>
}
