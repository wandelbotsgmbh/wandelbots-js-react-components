import type { TrajectoryTarget } from "../TrajectoryExecutionStore"

// From RobotPad (src/pointsPanel/PoseStore.tsx)

/**
 * A pose of a robot to move to or to store: its joint values, or a TCP's
 * pose in a coordinate system. The same shape as RobotPad's saved poses.
 */
export type RobotPose =
  | {
      type: "joint"
      motionGroupId: string
      /** rad, or mm for a linear axis */
      joints: number[]
    }
  | {
      type: "cartesian"
      motionGroupId: string
      tcpPose: {
        /** Position in mm, orientation as a rotation vector in rad */
        pose: { position: number[]; orientation?: number[] }
        coordSystemId: string
        tcpId: string
      }
    }

/**
 * Where a trajectory goes for a pose: the pose in its coordinate system, or
 * the joints. The trajectory store plans for the selected TCP.
 */
export function trajectoryTargetOf(pose: RobotPose): TrajectoryTarget {
  if (pose.type === "joint") {
    return { type: "joint", joints: pose.joints }
  }
  return {
    type: "cartesian",
    pose: pose.tcpPose.pose,
    coordinateSystemId: pose.tcpPose.coordSystemId,
  }
}

const sameNumbers = (
  a: readonly number[] = [0, 0, 0],
  b: readonly number[] = [0, 0, 0],
) => a.length === b.length && a.every((value, index) => value === b[index])

/**
 * Whether two poses are the same: the same numbers for the same motion
 * group, and for a TCP's pose the same TCP and coordinate system
 */
export function sameRobotPose(a: RobotPose, b: RobotPose): boolean {
  if (a.motionGroupId !== b.motionGroupId) return false
  if (a.type === "joint") {
    return b.type === "joint" && sameNumbers(a.joints, b.joints)
  }
  if (b.type === "joint") return false
  return (
    a.tcpPose.tcpId === b.tcpPose.tcpId &&
    a.tcpPose.coordSystemId === b.tcpPose.coordSystemId &&
    sameNumbers(a.tcpPose.pose.position, b.tcpPose.pose.position) &&
    sameNumbers(a.tcpPose.pose.orientation, b.tcpPose.pose.orientation)
  )
}
