import type { MotionGroupState, Pose } from "@wandelbots/nova-js/v2"
import type { Vector3Simple } from "./JoggerConnection"
import { Vector3 } from "three"

export function jointValuesEqual(
  oldJointValues: number[],
  newJointValues: number[],
  changeDeltaThreshold: number,
): boolean {
  if (newJointValues.length !== oldJointValues.length) {
    return true
  }

  for (let jointIndex = 0; jointIndex < newJointValues.length; jointIndex++) {
    if (
      // biome-ignore lint/style/noNonNullAssertion: legacy code
      Math.abs(newJointValues[jointIndex]! - oldJointValues[jointIndex]!) >
      changeDeltaThreshold
    ) {
      return false
    }
  }

  return true
}

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

// Runs poseEqual check + coordinate system/tcp name equality
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

export function unwrapRotationVector(
  newRotationVectorApi: Vector3Simple,
  currentRotationVectorApi: Vector3Simple,
): Vector3Simple {
  const currentRotationVector = new Vector3(
    currentRotationVectorApi[0],
    currentRotationVectorApi[1],
    currentRotationVectorApi[2],
  )

  const newRotationVector = new Vector3(
    newRotationVectorApi[0],
    newRotationVectorApi[1],
    newRotationVectorApi[2],
  )

  const currentAngle = currentRotationVector.length()
  const currentAxis = currentRotationVector.normalize()

  let newAngle = newRotationVector.length()
  let newAxis = newRotationVector.normalize()

  // Align rotation axes
  if (newAxis.dot(currentAxis) < 0) {
    newAngle = -newAngle
    newAxis = newAxis.multiplyScalar(-1.0)
  }

  // Shift rotation angle close to previous one to extend domain of rotation angles beyond [0, pi]
  // - this simplifies interpolation and prevents abruptly changing signs of the rotation angles
  let angleDifference = newAngle - currentAngle
  angleDifference -=
    2.0 * Math.PI * Math.floor((angleDifference + Math.PI) / (2.0 * Math.PI))

  newAngle = currentAngle + angleDifference

  return [...newAxis.multiplyScalar(newAngle)] as Vector3Simple
}
