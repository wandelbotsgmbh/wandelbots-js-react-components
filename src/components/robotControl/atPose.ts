import type { RobotControlPose } from "./RobotControlPanel"

/** RobotPad's tolerances for "the robot is at this pose" */
const POSITION_TOLERANCE_MM = 0.5
const ORIENTATION_TOLERANCE_RAD = 0.01

/**
 * Whether the TCP stands at `target`, within RobotPad's tolerances. The
 * orientations are compared as rotations, not as rotation vectors: a vector
 * and the same turn the other way round (by π, or a typed turn beyond π that
 * NOVA reports as the shorter one) are one orientation.
 */
export function isAtPose(
  current: RobotControlPose | null,
  target: RobotControlPose,
): boolean {
  if (!current) return false
  const distance = Math.hypot(
    current.position[0] - target.position[0],
    current.position[1] - target.position[1],
    current.position[2] - target.position[2],
  )
  return (
    distance <= POSITION_TOLERANCE_MM &&
    angleBetween(current.orientation, target.orientation) <=
      ORIENTATION_TOLERANCE_RAD
  )
}

type Quaternion = [number, number, number, number]

function toQuaternion(rotation: [number, number, number]): Quaternion {
  const angle = Math.hypot(...rotation)
  if (angle < 1e-12) return [1, 0, 0, 0]
  const s = Math.sin(angle / 2) / angle
  return [
    Math.cos(angle / 2),
    rotation[0] * s,
    rotation[1] * s,
    rotation[2] * s,
  ]
}

/** The angle of the turn from one orientation to the other */
function angleBetween(
  a: [number, number, number],
  b: [number, number, number],
): number {
  const p = toQuaternion(a)
  const q = toQuaternion(b)
  const dot = Math.abs(p[0] * q[0] + p[1] * q[1] + p[2] * q[2] + p[3] * q[3])
  return 2 * Math.acos(Math.min(1, dot))
}
