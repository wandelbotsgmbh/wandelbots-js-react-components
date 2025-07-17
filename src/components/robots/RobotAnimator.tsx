import { Globals, useSpring, type SpringValues } from "@react-spring/three"
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

  function isRobotFullyInitialized(): boolean {
    return (
      jointObjects.current.length > 0 &&
      jointObjects.current.every(
        (joint): joint is Object3D => joint !== undefined && joint !== null,
      ) &&
      typedAxisValues !== undefined &&
      dhParameters.length === jointObjects.current.length &&
      dhParameters.every((param): param is DHParameter => param !== undefined)
    )
  }

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Only set initial position if robot is fully initialized
    if (isRobotFullyInitialized()) {
      setRotation()
      invalidate()
    }
  }

  function updateJoints(newJointValues: number[]) {
    jointValues.current = newJointValues
    setSpring.start(Object.assign({}, jointValues.current) as any)
  }

  function setRotation() {
    // Use the comprehensive validation function
    if (!isRobotFullyInitialized()) {
      return
    }

    const updatedJointValues = jointObjects.current.map(
      (_, objectIndex) => typedAxisValues[objectIndex.toString()]?.get() || 0,
    )

    if (onRotationChanged) {
      // Filter out undefined/null joints before passing to callback
      const validJoints = jointObjects.current.filter((joint) => joint != null)
      const validJointValues = validJoints.map(
        (_, index) => updatedJointValues[index] || 0,
      )

      if (validJoints.length > 0) {
        onRotationChanged(validJoints, validJointValues)
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

  useAutorun(() => {
    const newJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    requestAnimationFrame(() => updateJoints(newJointValues))
  })

  const [axisValues, setSpring] = useSpring(() => ({
    ...Object.assign(
      {},
      rapidlyChangingMotionState.state.joint_position.joints,
    ),
    onChange: () => {
      setRotation()
      invalidate()
    },
    onResolve: () => {
      setRotation()
    },
  }))

  // Type the spring values properly
  const typedAxisValues = axisValues as SpringValues<Record<string, number>>

  return <group ref={setGroupRef}>{children}</group>
}
