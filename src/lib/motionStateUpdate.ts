import type { MotionGroupState, Pose } from "@wandelbots/nova-js/v2"

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
