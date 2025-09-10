import type { Collider } from "@wandelbots/nova-api/v1"
import type React from "react"
import * as THREE from "three"
import { colliderShapeToBufferGeometry } from "./colliderShapeToBufferGeometry"

type ColliderElementProps = {
  name?: string
  collider: Collider
  children?: React.ReactNode
}

export default function ColliderElement({
  name,
  collider,
  children,
}: ColliderElementProps) {
  const position = collider.pose?.position ?? [0, 0, 0]
  const rotation = collider.pose?.orientation ?? [0, 0, 0]
  if (collider.margin) {
    console.warn(`${name} margin is not supported`)
  }
  return (
    <mesh
      name={name}
      position={new THREE.Vector3(
        position[0],
        position[1],
        position[2],
      ).divideScalar(1000)}
      rotation={new THREE.Euler(rotation[0], rotation[1], rotation[2], "XYZ")}
      geometry={colliderShapeToBufferGeometry(collider.shape)}
    >
      {children}
    </mesh>
  )
}
