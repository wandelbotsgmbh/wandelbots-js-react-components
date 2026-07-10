import { Quaternion, Vector3 } from "three"

/** Below this the rotation is treated as identity to avoid dividing by ~0 */
const ROTATION_EPSILON = 1e-9

/**
 * Convert a rotation vector (axis * angle, angle in radians) into a quaternion.
 * This is the orientation representation used by the Nova API for poses.
 */
export function quaternionFromRotationVector(
  rotationVector: ArrayLike<number>,
): Quaternion {
  const vector = new Vector3(
    rotationVector[0] ?? 0,
    rotationVector[1] ?? 0,
    rotationVector[2] ?? 0,
  )
  const angle = vector.length()
  if (angle < ROTATION_EPSILON) {
    return new Quaternion() // identity
  }
  return new Quaternion().setFromAxisAngle(vector.divideScalar(angle), angle)
}

/**
 * Convert a quaternion into a rotation vector (axis * angle, angle in radians).
 * Returns the minimal representation with angle in [0, π].
 */
export function rotationVectorFromQuaternion(quaternion: Quaternion): number[] {
  const q = quaternion.clone().normalize()

  // Quaternions double-cover rotations; pick the hemisphere with w >= 0 so the
  // extracted angle stays in [0, π] (the minimal rotation).
  if (q.w < 0) {
    q.set(-q.x, -q.y, -q.z, -q.w)
  }

  const sinHalfAngle = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z)
  if (sinHalfAngle < ROTATION_EPSILON) {
    return [0, 0, 0]
  }

  const angle = 2 * Math.atan2(sinHalfAngle, q.w)
  const scale = angle / sinHalfAngle
  return [q.x * scale, q.y * scale, q.z * scale]
}
