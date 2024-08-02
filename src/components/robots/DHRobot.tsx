import { Vector3, Matrix4, Quaternion } from "three"
import { Line } from "@react-three/drei"
import type { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import type { DHParameter } from "@wandelbots/wandelbots-api-client"
import RobotAnimator from "./RobotAnimator"
import type * as THREE from "three"
import {
  getAllJointsByName,
  type RobotSceneJoint,
} from "../utils/robotTreeQuery"
import type { DHRobotProps } from "./SupportedRobot"

const CHILD_LINE = "line"
const CHILD_MESH = "mesh"

export function DHRobot({
  rapidlyChangingMotionState,
  dhParameters,
  ...props
}: DHRobotProps) {
  // reused in every update
  const accumulatedMatrix = new Matrix4()

  // Updates accumulatedMatrix with every execution
  // Reset the matrix to identity if you start a new position update
  function getLinePoints(
    dhParameter: DHParameter,
    jointRotation: number,
  ): {
    a: THREE.Vector3
    b: THREE.Vector3
  } {
    const position = new Vector3()
    const quaternion = new Quaternion()
    const scale = new Vector3()
    accumulatedMatrix.decompose(position, quaternion, scale)
    const prevPosition = position.clone() // Update the previous position

    const matrix = new Matrix4()
      .makeRotationY(
        dhParameter.theta! +
          jointRotation * (dhParameter.reverse_rotation_direction ? -1 : 1),
      ) // Rotate around Z
      .multiply(new Matrix4().makeTranslation(0, dhParameter.d! / 1000, 0)) // Translate along Z
      .multiply(new Matrix4().makeTranslation(dhParameter.a! / 1000, 0, 0)) // Translate along X
      .multiply(new Matrix4().makeRotationX(dhParameter.alpha!)) // Rotate around X

    // Accumulate transformations
    accumulatedMatrix.multiply(matrix)
    accumulatedMatrix.decompose(position, quaternion, scale)
    return { a: prevPosition, b: position }
  }

  function setJointLineRotation(
    jointIndex: number,
    line: THREE.Line,
    mesh: THREE.Mesh,
    jointValue: number,
  ) {
    if (!dhParameters) {
      return
    }

    const dh_parameter = dhParameters[jointIndex]
    if (!dh_parameter) {
      return
    }

    const { a, b } = getLinePoints(dh_parameter, jointValue)
    const lineGeometry = line.geometry as LineGeometry
    lineGeometry.setPositions([a.toArray(), b.toArray()].flat())

    mesh.position.set(b.x, b.y, b.z)
  }

  function setRotation(joints: THREE.Object3D[], jointValues: number[]) {
    accumulatedMatrix.identity()
    joints.forEach((joint, jointIndex) => {
      setJointLineRotation(
        jointIndex,
        joint.getObjectByName(CHILD_LINE) as THREE.Line,
        joint.getObjectByName(CHILD_MESH) as THREE.Mesh,
        jointValues[jointIndex]!,
      )
    })
  }

  function getAllJoints(rootObject: THREE.Object3D): RobotSceneJoint[] {
    return getAllJointsByName(rootObject, "^group_[0-9]+$")
  }

  return (
    <>
      <RobotAnimator
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        robotRootObjectName="Scene"
        onRotationChanged={setRotation}
        jointCollector={getAllJoints}
      />
      <group {...props} name="Scene">
        <mesh>
          <sphereGeometry args={[0.01, 32, 32]} />
          <meshStandardMaterial color={"black"} depthTest={true} />
        </mesh>
        {dhParameters!.map((param, index) => {
          const { a, b } = getLinePoints(
            param,
            rapidlyChangingMotionState.state.joint_position.joints[index] ?? 0,
          )
          return (
            <group name={`group_${index}`} key={"group_" + index}>
              <Line
                name={CHILD_LINE}
                points={[a, b]}
                color={"white"}
                lineWidth={5}
              />
              <mesh name={CHILD_MESH} key={"mesh_" + index} position={b}>
                <sphereGeometry args={[0.01, 32, 32]} />
                <meshStandardMaterial color={"black"} depthTest={true} />
              </mesh>
            </group>
          )
        })}
      </group>
    </>
  )
}
