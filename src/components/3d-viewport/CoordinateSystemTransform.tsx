import type { CoordinateSystem } from "@wandelbots/nova-js/v2"
import type { ReactNode } from "react"
import { Quaternion, Vector3 } from "three"
import { quaternionFromRotationVector } from "../../lib/rotationVector"

/**
 * Applies a API coordinate system transformation to
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
    (coordinateSystem?.position?.[0] ?? 0) / 1000,
    (coordinateSystem?.position?.[1] ?? 0) / 1000,
    (coordinateSystem?.position?.[2] ?? 0) / 1000,
  )

  const orientationType = coordinateSystem?.orientation_type

  let quaternion: Quaternion

  if (orientationType === "QUATERNION") {
    quaternion = new Quaternion(
      coordinateSystem?.orientation?.[0] ?? 0,
      coordinateSystem?.orientation?.[1] ?? 0,
      coordinateSystem?.orientation?.[2] ?? 0,
      coordinateSystem?.orientation?.[3] ?? 1,
    )
  } else {
    if (orientationType && orientationType !== "ROTATION_VECTOR") {
      console.warn(
        `Unsupported orientation type ${orientationType}. Only ROTATION_VECTOR and QUATERNION are supported.`,
      )
    }
    // Default to ROTATION_VECTOR
    quaternion = quaternionFromRotationVector(
      coordinateSystem?.orientation ?? [],
    )
  }

  return (
    <group position={position} quaternion={quaternion}>
      {children}
    </group>
  )
}

export default CoordinateSystemTransform
