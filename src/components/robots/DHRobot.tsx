import { Line } from "@react-three/drei"
import type * as THREE from "three"
import { Matrix4 } from "three"
import type { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import { getDHLine, getDHLines } from "../utils/dhParameter"
import RobotAnimator from "./RobotAnimator"
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
  const dhLines = getDHLines(
    accumulatedMatrix,
    dhParameters,
    rapidlyChangingMotionState.state.joint_position.joints,
  )

  function setJointLineRotation(
    jointIndex: number,
    line: THREE.Line,
    mesh: THREE.Mesh,
    jointValue: number,
  ) {
    if (!dhParameters) {
      return
    }

    const dhParameter = dhParameters[jointIndex]
    if (!dhParameter) {
      return
    }

    const dhLine = getDHLine(accumulatedMatrix, dhParameter, jointValue)
    const lineGeometry = line.geometry as LineGeometry
    lineGeometry.setPositions(
      [dhLine.start.toArray(), dhLine.end.toArray()].flat(),
    )

    mesh.position.set(dhLine.end.x, dhLine.end.y, dhLine.end.z)
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

  return (
    <>
      <RobotAnimator
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        dhParameters={dhParameters}
        onRotationChanged={setRotation}
      >
        <group {...props} name="Scene">
          <mesh>
            <sphereGeometry args={[0.01, 32, 32]} />
            <meshStandardMaterial color={"black"} depthTest={true} />
          </mesh>

          {dhParameters!.map((param, index) => {
            const jointName = `dhrobot_J0${index}`
            return (
              <group name={jointName} key={jointName}>
                <Line
                  name={CHILD_LINE}
                  points={[dhLines[index].start, dhLines[index].end]}
                  color={"white"}
                  lineWidth={5}
                  segments
                />
                <mesh
                  name={CHILD_MESH}
                  key={"mesh_" + index}
                  position={dhLines[index].end}
                >
                  <sphereGeometry args={[0.01, 32, 32]} />
                  <meshStandardMaterial color={"black"} depthTest={true} />
                </mesh>
              </group>
            )
          })}
        </group>
      </RobotAnimator>
    </>
  )
}
