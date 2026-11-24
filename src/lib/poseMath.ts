import type {
  CoordinateSystem,
  OrientationType,
  Pose,
  RobotTcp,
} from "@wandelbots/nova-js/v2"

// The pose math of the library's NOVA code on plain numbers: no three.js, so
// an app without a 3D view can load it. /3d has the same math on three.js
// objects (Pose3, rotation.ts), and a robot must get the same numbers from
// both. So every formula here is the one of three.js, operation for
// operation: a formula that is equal on paper (a division instead of a
// multiplication by the reciprocal, Math.hypot) gives other last bits.
// poseMath.test.ts compares the two exactly.

/** x, y, z */
export type Vec3 = [number, number, number]

/** A rotation as a quaternion. A three.js `Quaternion` is one too. */
export type Quat = {
  readonly x: number
  readonly y: number
  readonly z: number
  readonly w: number
}

/** A pose as a position and the quaternion of its orientation */
export type PlainPose = {
  readonly position: Readonly<Vec3>
  readonly quaternion: Quat
}

/** No rotation */
const IDENTITY: Quat = { x: 0, y: 0, z: 0, w: 1 }

const AXIS_INDEX = { x: 0, y: 1, z: 2 } as const

export function vectorLength([x, y, z]: Readonly<Vec3>): number {
  return Math.sqrt(x * x + y * y + z * z)
}

export function scaleVector([x, y, z]: Readonly<Vec3>, scalar: number): Vec3 {
  return [x * scalar, y * scalar, z * scalar]
}

/** The vector with length 1. A vector without length stays as it is. */
export function normalizeVector(vector: Readonly<Vec3>): Vec3 {
  return scaleVector(vector, 1 / (vectorLength(vector) || 1))
}

export function dotVectors(a: Readonly<Vec3>, b: Readonly<Vec3>): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

/** A vector of the given length along one axis */
export function vectorAlongAxis(axis: "x" | "y" | "z", length: number): Vec3 {
  const vector: Vec3 = [0, 0, 0]
  vector[AXIS_INDEX[axis]] = length
  return vector
}

/** The vector turned by a quaternion of length 1 */
export function rotateVector(
  [vx, vy, vz]: Readonly<Vec3>,
  { x: qx, y: qy, z: qz, w: qw }: Quat,
): Vec3 {
  // t = 2 * cross(q.xyz, v)
  const tx = 2 * (qy * vz - qz * vy)
  const ty = 2 * (qz * vx - qx * vz)
  const tz = 2 * (qx * vy - qy * vx)
  // v + q.w * t + cross(q.xyz, t)
  return [
    vx + qw * tx + qy * tz - qz * ty,
    vy + qw * ty + qz * tx - qx * tz,
    vz + qw * tz + qx * ty - qy * tx,
  ]
}

/** The rotation by an angle in rad about an axis of length 1 */
export function quaternionOfAxisAngle(
  axis: Readonly<Vec3>,
  angle: number,
): Quat {
  const halfAngle = angle / 2
  const sin = Math.sin(halfAngle)
  return {
    x: axis[0] * sin,
    y: axis[1] * sin,
    z: axis[2] * sin,
    w: Math.cos(halfAngle),
  }
}

/** The rotation `b`, then the rotation `a` */
export function multiplyQuaternions(a: Quat, b: Quat): Quat {
  return {
    x: a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y,
    y: a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z,
    z: a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x,
    w: a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z,
  }
}

/** The quaternion with length 1. One without length becomes no rotation. */
function normalizeQuaternion(quaternion: Quat): Quat {
  const { x, y, z, w } = quaternion
  const length = Math.sqrt(x * x + y * y + z * z + w * w)
  if (length === 0) {
    return IDENTITY
  }
  const scale = 1 / length
  return { x: x * scale, y: y * scale, z: z * scale, w: w * scale }
}

/** The rotation back, for a quaternion of length 1 */
function conjugateQuaternion({ x, y, z, w }: Quat): Quat {
  return { x: -x, y: -y, z: -z, w }
}

/**
 * The quaternion of an orientation of the NOVA API. Supports rotation
 * vectors and quaternions; any other type warns and gives no rotation. A
 * quaternion is taken as it is, also when it is not of length 1.
 */
export function quaternionOfOrientation(
  orientation?: readonly number[],
  orientationType?: OrientationType,
): Quat {
  if (orientationType === "QUATERNION" && orientation) {
    const [x = 0, y = 0, z = 0, w = 1] = orientation
    return { x, y, z, w }
  }
  if (orientationType === "ROTATION_VECTOR" && orientation) {
    if (orientation.length < 3) {
      throw new Error(
        `Invalid rotation vector length: ${orientation.length}. Expected at least 3 values.`,
      )
    }
    const [x = 0, y = 0, z = 0] = orientation
    const rotationVector: Vec3 = [x, y, z]
    return quaternionOfAxisAngle(
      normalizeVector(rotationVector),
      vectorLength(rotationVector),
    )
  }
  console.warn(
    `Unsupported rotation type '${orientationType}'. Only QUATERNION and ROTATION_VECTOR are supported for now.`,
  )
  return IDENTITY
}

/**
 * A quaternion as a rotation vector: its direction is the axis, its length
 * the angle in rad, up to a half turn
 * See https://code.wabo.run/robotics/wb-robotix/-/blob/develop/src/math/core/include/wb/math/QuaternionBasePlugin.h
 */
export function rotationVectorOfQuaternion({ x, y, z, w }: Quat): Vec3 {
  const axis: Vec3 = [x, y, z]
  // https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#Recovering_the_axis-angle_representation
  const angle = 2 * Math.atan2(vectorLength(axis), Math.abs(w))
  const signReal = (w >= 0 ? 1 : 0) - (w < 0 ? 1 : 0)
  return scaleVector(scaleVector(normalizeVector(axis), signReal), angle)
}

function positionOf(position: readonly number[] | undefined): Vec3 {
  return [position?.[0] ?? 0, position?.[1] ?? 0, position?.[2] ?? 0]
}

/** A pose of the NOVA API: its orientation is a rotation vector */
export function poseOf(pose: Pose): PlainPose {
  return {
    position: positionOf(pose.position),
    quaternion: pose.orientation
      ? quaternionOfOrientation(pose.orientation, "ROTATION_VECTOR")
      : IDENTITY,
  }
}

/**
 * The pose of a coordinate system in its reference, or of a TCP in the
 * flange: its orientation has a type, a rotation vector without one
 */
export function poseOfFrame(
  frame: Pick<
    CoordinateSystem | RobotTcp,
    "position" | "orientation" | "orientation_type"
  >,
): PlainPose {
  return {
    position: positionOf(frame.position),
    quaternion: frame.orientation
      ? quaternionOfOrientation(
          frame.orientation,
          frame.orientation_type ?? "ROTATION_VECTOR",
        )
      : IDENTITY,
  }
}

/** The pose `b`, which is relative to the pose `a`, in the frame of `a` */
export function composePoses(a: PlainPose, b: PlainPose): PlainPose {
  const offset = rotateVector(b.position, a.quaternion)
  return {
    position: [
      a.position[0] + offset[0],
      a.position[1] + offset[1],
      a.position[2] + offset[2],
    ],
    quaternion: normalizeQuaternion(
      multiplyQuaternions(a.quaternion, b.quaternion),
    ),
  }
}

/** The pose that brings back: `pose` composed with it moves nothing */
export function invertPose(pose: PlainPose): PlainPose {
  const quaternion = conjugateQuaternion(pose.quaternion)
  return {
    position: scaleVector(rotateVector(pose.position, quaternion), -1),
    quaternion,
  }
}
