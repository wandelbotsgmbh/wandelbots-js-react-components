import { Globals, useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type { MotionGroupStateResponse } from "@wandelbots/wandelbots-api-client"
import React, { useRef } from "react"
import type * as THREE from "three"
import { useAutorun } from "../utils/hooks"
import {
  getAllJointsByName,
  type RobotSceneJoint,
} from "../utils/robotTreeQuery"
import type { RobotModelConfig } from "./types"

type RobotAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  onRotationChanged?: (joints: THREE.Object3D[], jointValues: number[]) => void
  jointCollector?: (rootObject: THREE.Object3D) => RobotSceneJoint[]
  robotConfig?: RobotModelConfig
  children: React.ReactNode
}

export default function RobotAnimator({
  rapidlyChangingMotionState,
  jointCollector,
  onRotationChanged,
  robotConfig,
  children,
}: RobotAnimatorProps) {
  Globals.assign({ frameLoop: "always" })
  const jointValues = useRef<number[]>([])
  const jointObjects = useRef<THREE.Object3D[]>([])
  const { invalidate } = useThree()

  function setGroupRef(group: THREE.Group | null) {
    if (!group) return

    jointObjects.current = jointCollector
      ? jointCollector(group)
      : getAllJointsByName(group)

    // Set initial position
    setRotation()
    invalidate()
  }

  function updateJoints(newJointValues: number[]) {
    jointValues.current = newJointValues
    setSpring.start(Object.assign({}, jointValues.current) as any)
  }

  const rotationSign = robotConfig?.rotationSign || [1, 1, 1, 1, 1, 1]
  const rotationOffsets = robotConfig?.rotationOffsets || [0, 0, 0, 0, 0, 0]

  function setRotation() {
    const updatedJointValues = jointObjects.current.map((_, objectIndex) =>
      (axisValues as any)[objectIndex].get(),
    )

    if (onRotationChanged) {
      onRotationChanged(jointObjects.current, updatedJointValues)
    } else {
      for (const [index, object] of jointObjects.current.entries()) {
        object.rotation.y =
          rotationSign[index]! * updatedJointValues[index]! +
          rotationOffsets[index]!
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

  return <group ref={setGroupRef}>{children}</group>
}
