import type { OrientationType } from "@wandelbots/nova-js/v2"
import { Quaternion, Vector3 } from "three"

// Ported from RobotPad (src/util/converters.ts)

/**
 * The quaternion of an orientation of the NOVA API. Supports rotation
 * vectors and quaternions; any other type warns and gives no rotation.
 */
export function parseRotationToQuaternion(
  orientation?: Array<number>,
  orientationType?: OrientationType,
): Quaternion {
  if (orientationType === "QUATERNION" && orientation) {
    return new Quaternion(...orientation)
  } else if (orientationType === "ROTATION_VECTOR" && orientation) {
    if (orientation && orientation.length < 3) {
      throw new Error(
        `Invalid rotation vector length: ${orientation.length}. Expected at least 3 values.`,
      )
    }

    const rotationVector = new Vector3(
      orientation[0],
      orientation[1],
      orientation[2],
    )
    const magnitude = rotationVector.length()
    const axis = rotationVector.normalize()
    return new Quaternion().setFromAxisAngle(axis, magnitude)
  } else {
    console.warn(
      `Unsupported rotation type '${orientationType}'. Only QUATERNION and ROTATION_VECTOR are supported for now.`,
    )
    return new Quaternion()
  }
}

/**
 * Convert a quaternion to a [rad, rad, rad] rotation vector
 * See https://code.wabo.run/robotics/wb-robotix/-/blob/develop/src/math/core/include/wb/math/QuaternionBasePlugin.h
 */
export function quaternionToRotationVector(q: Quaternion) {
  const axis = new Vector3(q.x, q.y, q.z)

  // https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#Recovering_the_axis-angle_representation
  const angle = 2 * Math.atan2(axis.length(), Math.abs(q.w))
  axis.normalize()

  const signReal = (q.w >= 0 ? 1 : 0) - (q.w < 0 ? 1 : 0)
  return axis.multiplyScalar(signReal).multiplyScalar(angle)
}
