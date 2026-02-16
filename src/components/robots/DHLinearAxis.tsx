import { Line } from "@react-three/drei"
import type { DHParameter } from "@wandelbots/nova-js/v2"
import React, { useRef } from "react"
import type * as THREE from "three"
import { Matrix4, Quaternion, Vector3 } from "three"
import LinearAxisAnimator from "./LinearAxisAnimator"
import type { DHLinearAxisProps } from "./SupportedLinearAxis"

export function DHLinearAxis({
  rapidlyChangingMotionState,
  dhParameters,
  ...props
}: DHLinearAxisProps) {
  // reused in every update
  const accumulatedMatrix = new Matrix4()

  const tcpMeshRef = useRef<THREE.Mesh | null>(null)
  const tcpLineRef = useRef<any>(null)

  // Calculate initial TCP position
  function calculateTcpPosition(jointValues: number[]): Vector3 {
    const tempMatrix = new Matrix4()
    
    for (let i = 0; i < dhParameters.length; i++) {
      const param = dhParameters[i]
      const jointValue = jointValues[i] ?? 0
      
      const matrix = new Matrix4()
        .makeRotationY(param.theta!) // Base rotation (if any)
        .multiply(
          new Matrix4().makeTranslation(
            param.a! / 1000,
            (param.d! + jointValue * (param.reverse_rotation_direction ? -1 : 1)) / 1000,
            0
          )
        ) // Translate along X by a, and Y by d + joint_position
        .multiply(new Matrix4().makeRotationX(param.alpha!)) // Rotate around X
      
      tempMatrix.multiply(matrix)
    }
    
    const position = new Vector3()
    const quaternion = new Quaternion()
    const scale = new Vector3()
    tempMatrix.decompose(position, quaternion, scale)
    return position
  }

  // Calculate initial TCP position for rendering
  const initialTcpPosition = calculateTcpPosition(rapidlyChangingMotionState.joint_position)

  function setTranslation(joints: THREE.Object3D[], jointValues: number[]) {
    accumulatedMatrix.identity()

    let tcpPosition = new Vector3()

    // Process all joints based on dhParameters length, not joints array
    // Since we're using DHLinearAxis directly without a model, we don't have joint objects
    for (let jointIndex = 0; jointIndex < dhParameters.length; jointIndex++) {
      const jointValue = jointValues[jointIndex] ?? 0
      const param = dhParameters[jointIndex]
      
      // Calculate and accumulate transformation
      const matrix = new Matrix4()
        .makeRotationY(param.theta!) // Base rotation (if any)
        .multiply(
          new Matrix4().makeTranslation(
            param.a! / 1000,
            (param.d! + jointValue * (param.reverse_rotation_direction ? -1 : 1)) / 1000,
            0
          )
        )
        .multiply(new Matrix4().makeRotationX(param.alpha!))
      
      accumulatedMatrix.multiply(matrix)
    }

    // Get final TCP position from accumulated matrix
    const position = new Vector3()
    const quaternion = new Quaternion()
    const scale = new Vector3()
    accumulatedMatrix.decompose(position, quaternion, scale)
    tcpPosition = position

    // Update TCP marker
    if (tcpMeshRef.current) {
      tcpMeshRef.current.position.set(tcpPosition.x, tcpPosition.y, tcpPosition.z)
    }

    // Update TCP line
    if (tcpLineRef.current) {
      const lineGeometry = tcpLineRef.current.geometry
      if (lineGeometry && lineGeometry.setPositions) {
        lineGeometry.setPositions([0, 0, 0, tcpPosition.x, tcpPosition.y, tcpPosition.z])
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
          {/* Base (origin) - Green sphere representing initial previous position */}
          <mesh name="Base" position={[0, 0, 0]}>
            <sphereGeometry args={[0.02, 32, 32]} />
            <meshStandardMaterial color={"green"} depthTest={true} />
          </mesh>
          {/* Line from Base to TCP */}
          <Line
            ref={tcpLineRef}
            points={[new Vector3(0, 0, 0), initialTcpPosition]}
            color={"White"}
            lineWidth={5}
          />
          {/* TCP (Tool Center Point) - Red sphere that shows final position */}
          <mesh ref={tcpMeshRef} name="TCP" position={initialTcpPosition}>
            <sphereGeometry args={[0.025, 32, 32]} />
            <meshStandardMaterial color={"red"} depthTest={true} />
          </mesh>
        </group>
      </LinearAxisAnimator>
    </>
  )
}
