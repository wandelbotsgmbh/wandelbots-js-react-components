import type { CoordinateSystem } from "@wandelbots/wandelbots-api-client"
import type { ReactNode } from "react"
import { Vector3, Quaternion } from "three"

/**
 * Applies a Nova API coordinate system transformation to
 * all react-three child components.
 */
export const CoordinateSystemTransform = ({
  coordinateSystem,
  children,
}: {
  coordinateSystem?: CoordinateSystem
  children: ReactNode
}) => {
  const position = new Vector3(
    (coordinateSystem?.position?.x ?? 0) / 1000,
    (coordinateSystem?.position?.y ?? 0) / 1000,
    (coordinateSystem?.position?.z ?? 0) / 1000,
  )

  let rotation = coordinateSystem?.rotation
  const rotationType = rotation?.type
  if (rotationType && rotationType !== "ROTATION_VECTOR") {
    console.warn(
      `Unsupported rotation type ${rotationType}. Only ROTATION_VECTOR is supported.`,
    )
    rotation = { type: "ROTATION_VECTOR", angles: [0, 0, 0, 0] }
  }

  const rotationVector = new Vector3(
    rotation?.angles[0] ?? 0,
    rotation?.angles[1] ?? 0,
    rotation?.angles[2] ?? 0,
  )
  const magnitude = rotationVector.length()
  const axis = rotationVector.normalize()
  const quaternion = new Quaternion().setFromAxisAngle(axis, magnitude)
  return (
    <group position={position} quaternion={quaternion}>
      {children}
    </group>
  )
}
