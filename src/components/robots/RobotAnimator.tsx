import type { MotionGroupStateResponse } from "@wandelbots/wandelbots-api-client"
import React from "react"
import type * as THREE from "three"
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
  return <group>{children}</group>

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
}
