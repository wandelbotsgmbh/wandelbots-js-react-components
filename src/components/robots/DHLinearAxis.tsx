import { Line } from "@react-three/drei"
import type { DHParameter } from "@wandelbots/nova-js/v2"
import React, { useRef } from "react"
import type * as THREE from "three"
import { Matrix4, Quaternion, Vector3 } from "three"
import type { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js"
import LinearAxisAnimator from "./LinearAxisAnimator"
import type { DHLinearAxisProps } from "./SupportedLinearAxis"

const CHILD_LINE = "line"
const CHILD_MESH = "mesh"

export function DHLinearAxis({
  rapidlyChangingMotionState,
  dhParameters,
  ...props
}: DHLinearAxisProps) {
  // reused in every update
  const accumulatedMatrix = new Matrix4()

  // Store direct references to avoid searching by name
  const lineRefs = useRef<any[]>([])
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])

  // Initialize refs array when dhParameters change
  React.useEffect(() => {
    lineRefs.current = new Array(dhParameters.length).fill(null)
    meshRefs.current = new Array(dhParameters.length).fill(null)
  }, [dhParameters.length])

  // Updates accumulatedMatrix with every execution
  // Reset the matrix to identity if you start a new position update
  function getLinePoints(
    dhParameter: DHParameter,
    jointTranslation: number,
  ): {
    a: THREE.Vector3
    b: THREE.Vector3
  } {
    const position = new Vector3()
    const quaternion = new Quaternion()
    const scale = new Vector3()
    accumulatedMatrix.decompose(position, quaternion, scale)
    const prevPosition = position.clone() // Update the previous position

    // For linear axes, we apply linear translation instead of rotation
    // The jointTranslation represents the linear displacement along the axis
    const matrix = new Matrix4()
      .makeRotationY(dhParameter.theta!) // Base rotation (if any)
      .multiply(
        new Matrix4().makeTranslation(
          0,
          (dhParameter.d! + jointTranslation * (dhParameter.reverse_rotation_direction ? -1 : 1)) / 1000,
          0,
        ),
      ) // Translate along Y with joint translation
      .multiply(new Matrix4().makeTranslation(dhParameter.a! / 1000, 0, 0)) // Translate along X
      .multiply(new Matrix4().makeRotationX(dhParameter.alpha!)) // Rotate around X

    // Accumulate transformations
    accumulatedMatrix.multiply(matrix)
    accumulatedMatrix.decompose(position, quaternion, scale)
    return { a: prevPosition, b: position }
  }

  function setJointLineTranslation(
    jointIndex: number,
    line: any, // Use any for drei Line component
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

  function setTranslation(joints: THREE.Object3D[], jointValues: number[]) {
    accumulatedMatrix.identity()

    // Use direct refs instead of searching by name
    for (
      let jointIndex = 0;
      jointIndex < Math.min(joints.length, jointValues.length);
      jointIndex++
    ) {
      const line = lineRefs.current[jointIndex]
      const mesh = meshRefs.current[jointIndex]

      if (line && mesh) {
        setJointLineTranslation(jointIndex, line, mesh, jointValues[jointIndex]!)
      }
    }
  }

  return (
    <>
      <LinearAxisAnimator
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        dhParameters={dhParameters}
        onTranslationChanged={setTranslation}
      >
        <group {...props} name="Scene">
          <mesh>
            <sphereGeometry args={[0.01, 32, 32]} />
            <meshStandardMaterial color={"black"} depthTest={true} />
          </mesh>
          {dhParameters!.map((param, index) => {
            const { a, b } = getLinePoints(
              param,
              rapidlyChangingMotionState.joint_position[index] ?? 0,
            )
            const jointName = `dhlinearaxis_J0${index}`
            return (
              <group name={jointName} key={jointName}>
                <Line
                  ref={(ref) => {
                    lineRefs.current[index] = ref
                  }}
                  name={CHILD_LINE}
                  points={[a, b]}
                  color={"white"}
                  lineWidth={5}
                />
                <mesh
                  ref={(ref) => {
                    meshRefs.current[index] = ref
                  }}
                  name={CHILD_MESH}
                  key={"mesh_" + index}
                  position={b}
                >
                  <sphereGeometry args={[0.01, 32, 32]} />
                  <meshStandardMaterial color={"black"} depthTest={true} />
                </mesh>
              </group>
            )
          })}
        </group>
      </LinearAxisAnimator>
    </>
  )
}
