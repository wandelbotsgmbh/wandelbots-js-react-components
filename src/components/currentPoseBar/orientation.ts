import type { OrientationType } from "@wandelbots/nova-js/v2"

/** One of NOVA's Euler angle conventions, e.g. `EULER_ANGLES_EXTRINSIC_XYZ` */
export type EulerConvention = Extract<OrientationType, `EULER_ANGLES_${string}`>

/** A quaternion as [x, y, z, w], NOVA's order */
export type QuaternionTuple = [number, number, number, number]

type Axis = "X" | "Y" | "Z"

/** The axis orders in the order the Euler convention picker lists them */
const SEQUENCES = [
  // Tait–Bryan angles: three different axes
  "XYZ",
  "XZY",
  "YXZ",
  "YZX",
  "ZXY",
  "ZYX",
  // Proper Euler angles: the first axis again at the end
  "XYX",
  "XZX",
  "YXY",
  "YZY",
  "ZXZ",
  "ZYZ",
] as const

/** All Euler conventions of NOVA: the intrinsic ones, then the extrinsic ones */
export const EULER_CONVENTIONS: readonly EulerConvention[] = [
  ...SEQUENCES.map((s) => `EULER_ANGLES_INTRINSIC_${s}` as const),
  ...SEQUENCES.map((s) => `EULER_ANGLES_EXTRINSIC_${s}` as const),
]

/**
 * Whether the convention turns about the moving axes (intrinsic) or the fixed
 * ones (extrinsic), and its axes in the order of its angles
 */
export function parseEulerConvention(convention: EulerConvention): {
  intrinsic: boolean
  axes: [Axis, Axis, Axis]
} {
  const sequence = convention.slice(convention.lastIndexOf("_") + 1)
  return {
    intrinsic: convention.includes("_INTRINSIC_"),
    axes: [...sequence] as [Axis, Axis, Axis],
  }
}

/** The quaternion of a rotation vector: its direction is the axis, its length the angle in rad */
export function rotationVectorToQuaternion([x, y, z]: [
  number,
  number,
  number,
]): QuaternionTuple {
  const angle = Math.hypot(x, y, z)
  if (angle < 1e-12) return [0, 0, 0, 1]
  const s = Math.sin(angle / 2) / angle
  return [x * s, y * s, z * s, Math.cos(angle / 2)]
}

const AXIS_INDEX: Record<Axis, 0 | 1 | 2> = { X: 0, Y: 1, Z: 2 }

/** Keeps an angle within [-π, π] */
function wrap(angle: number): number {
  if (angle > Math.PI) return angle - 2 * Math.PI
  if (angle < -Math.PI) return angle + 2 * Math.PI
  return angle
}

/**
 * The Euler angles of a rotation in rad, in the order of the convention's
 * axes: intrinsic XYZ turns about X, then the turned Y, then the turned Z;
 * extrinsic XYZ about the fixed X, Y and Z. Each angle is within [-π, π].
 *
 * The method of Bernardes and Viollet (2022), "Quaternion to Euler angles
 * conversion: a direct, general and computationally efficient method", as
 * SciPy uses it. In gimbal lock only the sum or the difference of the first
 * and last angle is known; then the last extrinsic angle is 0.
 */
export function quaternionToEuler(
  quaternion: QuaternionTuple,
  convention: EulerConvention,
): [number, number, number] {
  const { intrinsic, axes } = parseEulerConvention(convention)
  // The method is for extrinsic angles. Intrinsic angles about A, B, C are
  // the extrinsic angles about C, B, A in reverse order.
  const sequence = intrinsic ? [...axes].reverse() : axes
  const i = AXIS_INDEX[sequence[0] as Axis]
  const j = AXIS_INDEX[sequence[1] as Axis]
  const proper = sequence[0] === sequence[2]
  const k = proper ? 3 - i - j : AXIS_INDEX[sequence[2] as Axis]
  // +1 for an even order of the axes (XYZ), -1 for an odd one (XZY)
  const sign = ((i - j) * (j - k) * (k - i)) / 2

  const length = Math.hypot(...quaternion) || 1
  const [x, y, z, w] = quaternion.map((v) => v / length) as QuaternionTuple
  const v = [x, y, z]
  const vi = v[i] ?? 0
  const vj = v[j] ?? 0
  const vk = (v[k] ?? 0) * sign

  const [a, b, c, d] = proper
    ? [w, vi, vj, vk]
    : [w - vj, vi + vk, vj + w, vk - vi]

  let second = 2 * Math.atan2(Math.hypot(c, d), Math.hypot(a, b))
  const halfSum = Math.atan2(b, a)
  const halfDiff = Math.atan2(d, c)

  let first: number
  let third: number
  const EPSILON = 1e-7
  if (Math.abs(second) <= EPSILON) {
    // Gimbal lock: only the sum of the first and the last angle is known
    first = 2 * halfSum
    third = 0
  } else if (Math.abs(second - Math.PI) <= EPSILON) {
    // Gimbal lock: only their difference is known
    first = -2 * halfDiff
    third = 0
  } else {
    first = halfSum - halfDiff
    third = halfSum + halfDiff
  }

  if (!proper) {
    third *= sign
    second -= Math.PI / 2
  }

  const angles: [number, number, number] = intrinsic
    ? [third, second, first]
    : [first, second, third]
  return angles.map(wrap) as [number, number, number]
}
