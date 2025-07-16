import { Globals, useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React, { useEffect, useRef, useState, useCallback } from "react"
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
  const [isInitialized, setIsInitialized] = useState(false)
  const { invalidate } = useThree()

  function setGroupRef(group: Group | null) {
    if (!group) {
      setIsInitialized(false)
      return
    }

    jointObjects.current = collectJoints(group)

    // Only mark as initialized if we have valid joint objects
    if (
      jointObjects.current.length > 0 &&
      jointObjects.current.every((obj) => obj != null)
    ) {
      setIsInitialized(true)
    } else {
      setIsInitialized(false)
    }
  }

  function updateJoints(newJointValues: number[]) {
    if (!isInitialized) return

    jointValues.current = newJointValues
    setSpring.start(Object.assign({}, jointValues.current) as any)
  }

  // Initialize spring only after joints are ready
  const [axisValues, setSpring] = useSpring(() => ({
    ...Object.assign(
      {},
      rapidlyChangingMotionState.state.joint_position.joints,
    ),
    onChange: () => {
      if (isInitialized) {
        setRotation()
        invalidate()
      }
    },
    onResolve: () => {
      if (isInitialized) {
        setRotation()
      }
    },
  }))

  const setRotation = useCallback(() => {
    if (!isInitialized) return

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
  }, [isInitialized, axisValues, onRotationChanged, dhParameters])

  // Effect to handle initial rotation when component becomes initialized
  useEffect(() => {
    if (isInitialized) {
      setRotation()
      invalidate()
    }
  }, [isInitialized, setRotation, invalidate])

  useAutorun(() => {
    if (!isInitialized) return

    const newJointValues =
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    requestAnimationFrame(() => updateJoints(newJointValues))
  })

  return <group ref={setGroupRef}>{children}</group>
}
