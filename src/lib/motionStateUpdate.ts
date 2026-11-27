import type { MotionGroupState, Pose } from "@wandelbots/nova-js/v2"
import type { Vector3Simple } from "./JoggerConnection"
import {
  dotVectors,
  normalizeVector,
  scaleVector,
  type Vec3,
  vectorLength,
} from "./poseMath"

/**
 * Whether two sets of joint values are the same within `changeDeltaThreshold`:
 * a different number of joints is never the same
 *
 * @deprecated A helper of the library's motion stream, not meant for apps.
 * Compare the joints in the app. Removed in the next major version.
 */
export function jointValuesEqual(
  oldJointValues: number[],
  newJointValues: number[],
  changeDeltaThreshold: number,
): boolean {
  if (newJointValues.length !== oldJointValues.length) {
    return false
  }
  return jointsWithin(oldJointValues, newJointValues, changeDeltaThreshold)
}

/**
 * Like {@link jointValuesEqual}, but a change of the number of joints counts
 * as unchanged: the dedupe of a motion stream, where another number of joints
 * means another motion group, which the stream handles on its own. Not for
 * real equality checks.
 */
export function jointValuesUnchanged(
  oldJointValues: number[],
  newJointValues: number[],
  changeDeltaThreshold: number,
): boolean {
  if (newJointValues.length !== oldJointValues.length) {
    return true
  }
  return jointsWithin(oldJointValues, newJointValues, changeDeltaThreshold)
}

function jointsWithin(
  oldJointValues: number[],
  newJointValues: number[],
  changeDeltaThreshold: number,
): boolean {
  for (let jointIndex = 0; jointIndex < newJointValues.length; jointIndex++) {
    if (
      Math.abs(
        (newJointValues[jointIndex] ?? 0) - (oldJointValues[jointIndex] ?? 0),
      ) > changeDeltaThreshold
    ) {
      return false
    }
  }
  return true
}

/**
 * @deprecated A helper of the library's motion stream, not meant for apps.
 * Compare the poses in the app. Removed in the next major version.
 */
export function poseEqual(
  oldTcp: Pose | undefined,
  newTcp: Pose | undefined,
  changeDeltaThreshold: number,
): boolean {
  // undefined -> defined (+reverse) transition
  if ((oldTcp === undefined && newTcp) || (oldTcp && newTcp === undefined)) {
    return false
  }

  // Poses might be incomplete (missing orientation or position)
  if (
    oldTcp?.orientation === undefined ||
    newTcp?.orientation === undefined ||
    oldTcp?.position === undefined ||
    newTcp?.position === undefined
  ) {
    return false
  }

  // the typechecker cannot resolve states to "!= undefined" if "&&" is used
  if (oldTcp === undefined || newTcp === undefined) {
    return true
  }

  let changedDelta = 0
  changedDelta += Math.abs(oldTcp.orientation[0] - newTcp.orientation[0])
  changedDelta += Math.abs(oldTcp.orientation[1] - newTcp.orientation[1])
  changedDelta += Math.abs(oldTcp.orientation[2] - newTcp.orientation[2])
  changedDelta += Math.abs(oldTcp.position[0] - newTcp.position[0])
  changedDelta += Math.abs(oldTcp.position[1] - newTcp.position[1])
  changedDelta += Math.abs(oldTcp.position[2] - newTcp.position[2])

  return changedDelta <= changeDeltaThreshold
}

/**
 * Runs poseEqual check + coordinate system/tcp name equality
 *
 * @deprecated A helper of the library's motion stream, not meant for apps.
 * Compare the motion states in the app. Removed in the next major version.
 */
export function tcpMotionEqual(
  oldMotionState: MotionGroupState,
  newMotionState: MotionGroupState,
  changeDeltaThreshold: number,
): boolean {
  return (
    oldMotionState.coordinate_system === newMotionState.coordinate_system &&
    oldMotionState.tcp === newMotionState.tcp &&
    poseEqual(
      oldMotionState.tcp_pose,
      newMotionState.tcp_pose,
      changeDeltaThreshold,
    )
  )
}

/**
 * @deprecated A helper of the library's motion stream, not meant for apps.
 * Removed in the next major version.
 */
export function unwrapRotationVector(
  newRotationVectorApi: Vector3Simple,
  currentRotationVectorApi: Vector3Simple,
): Vector3Simple {
  // A value that a stream's message misses counts as 0
  const [currentX = 0, currentY = 0, currentZ = 0] = currentRotationVectorApi
  const currentRotationVector: Vec3 = [currentX, currentY, currentZ]
  const [newX = 0, newY = 0, newZ = 0] = newRotationVectorApi
  const newRotationVector: Vec3 = [newX, newY, newZ]

  const currentAngle = vectorLength(currentRotationVector)
  const currentAxis = normalizeVector(currentRotationVector)

  let newAngle = vectorLength(newRotationVector)
  let newAxis = normalizeVector(newRotationVector)

  // Align rotation axes
  if (dotVectors(newAxis, currentAxis) < 0) {
    newAngle = -newAngle
    newAxis = scaleVector(newAxis, -1.0)
  }

  // Shift rotation angle close to previous one to extend domain of rotation angles beyond [0, pi]
  // - this simplifies interpolation and prevents abruptly changing signs of the rotation angles
  let angleDifference = newAngle - currentAngle
  angleDifference -=
    2.0 * Math.PI * Math.floor((angleDifference + Math.PI) / (2.0 * Math.PI))

  newAngle = currentAngle + angleDifference

  return scaleVector(newAxis, newAngle)
}

/**
 * How far a joint has to move from the reading shown before pose readouts
 * show a new one. A UR jitters by up to 0.000194 rad per joint while it stands
 * still (measured in RobotPad against the held reading, over 30 s), which
 * made the readouts flicker; 0.0002 is that with ~3 % headroom. It is a joint
 * angle in rad, so a linear axis (mm) is not held, and a readout can sit up to
 * this far behind a joint: ~0.2 mm at the TCP per metre of reach.
 */
const JOINT_NOISE_THRESHOLD = 0.0002

/** The part of a motion state that pose readouts show */
export type MotionStateReadout = Pick<
  MotionGroupState,
  "joint_position" | "tcp_pose" | "tcp" | "coordinate_system"
>

/**
 * The part of a motion state that pose readouts show, snapshotted so that
 * {@link readoutsEqual} can compare the held reading with the next one. The
 * streams replace these fields instead of mutating them, which keeps a held
 * snapshot intact.
 */
export function readoutOf(motionState: MotionGroupState): MotionStateReadout {
  const { joint_position, tcp_pose, tcp, coordinate_system } = motionState
  return { joint_position, tcp_pose, tcp, coordinate_system }
}

/**
 * The `equals` of a computed readout: it keeps showing the reading it holds
 * until a joint moved more than `JOINT_NOISE_THRESHOLD` (0.0002 rad) from it, or the
 * TCP or coordinate system changed. Slow movement adds up against the held
 * reading, so it still shows.
 */
export function readoutsEqual(
  shown: MotionStateReadout,
  next: MotionStateReadout,
): boolean {
  return (
    shown.tcp === next.tcp &&
    shown.coordinate_system === next.coordinate_system &&
    (shown.tcp_pose === undefined) === (next.tcp_pose === undefined) &&
    jointValuesEqual(
      shown.joint_position,
      next.joint_position,
      JOINT_NOISE_THRESHOLD,
    )
  )
}
