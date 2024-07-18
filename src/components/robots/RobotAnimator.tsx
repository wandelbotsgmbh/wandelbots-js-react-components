import { useEffect, useRef } from "react"
import { Globals, useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type * as THREE from "three"
import {
  getAllJointsByName,
  type RobotSceneJoint,
} from "../utils/robotTreeQuery"
import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js"
import { useAutorun } from "../utils/hooks"

type RobotAnimatorProps = {
  connectedMotionGroup: ConnectedMotionGroup
  robotRootObjectName: string
  onRotationChanged: (joints: THREE.Object3D[], jointValues: number[]) => void
  jointCollector?: (rootObject: THREE.Object3D) => RobotSceneJoint[]
}

export default function RobotAnimator({
  connectedMotionGroup,
  robotRootObjectName,
  onRotationChanged,
  jointCollector,
}: RobotAnimatorProps) {
  Globals.assign({ frameLoop: "always" })
  const jointValues = useRef<number[]>([])
  const jointObjects = useRef<THREE.Object3D[]>([])
  const { scene, invalidate } = useThree()

  useEffect(() => {
    // All robots have a "Scene" object as root
    // From this object the tree is traversed and all joints are extracted (ordered ASC)
    const sceneObject = scene.getObjectByName(robotRootObjectName)
    if (!sceneObject) {
      return
    }

    jointObjects.current = jointCollector
      ? jointCollector(sceneObject)
      : getAllJointsByName(sceneObject)

    // Set initial position
    setRotation()
    invalidate()
  }, [])

  function updateJoints(newJointValues: number[]) {
    jointValues.current = newJointValues
    setSpring.start(Object.assign({}, jointValues.current) as any)
  }

  function setRotation() {
    const updatedJointValues = jointObjects.current.map((object, objectIndex) =>
      (axisValues as any)[objectIndex].get(),
    )
    onRotationChanged(jointObjects.current, updatedJointValues)
  }

  useAutorun(() => {
    const newJointValues =
      connectedMotionGroup.rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      )

    requestAnimationFrame(() => updateJoints(newJointValues))
  })

  const [axisValues, setSpring] = useSpring(() => ({
    ...Object.assign(
      {},
      connectedMotionGroup.rapidlyChangingMotionState.state.joint_position
        .joints,
    ),
    onChange: () => {
      setRotation()
      invalidate()
    },
    onResolve: () => {
      setRotation()
    },
  }))
  return null
}
