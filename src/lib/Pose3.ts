import type { CoordinateSystem, Pose, RobotTcp } from "@wandelbots/nova-js/v2"
import { Quaternion, Vector3 } from "three"
import {
  parseRotationToQuaternion,
  quaternionToRotationVector,
} from "./rotation"

/**
 * Partial port of Pose math for use on the frontend, allowing
 * us to avoid a network roundtrip for fast animation stuff
 * See https://code.wabo.run/robotics/wb-robotix/-/blob/develop/src/math/core/include/wb/math/space/Pose.h
 *
 * Ported from RobotPad (src/util/Pose3.ts), only what the jogger and the
 * jogging store use.
 */
export class Pose3 {
  static fromPose(apiPose: Pose) {
    const quaternion = apiPose.orientation
      ? parseRotationToQuaternion(apiPose.orientation, "ROTATION_VECTOR")
      : new Quaternion()
    const position = apiPose.position ?? [0, 0, 0]

    return new Pose3(
      new Vector3(position[0] ?? 0, position[1] ?? 0, position[2] ?? 0),
      quaternion,
    )
  }

  /** A TCP's offset from the flange */
  static fromRobotTcp(
    robotTcp: Pick<RobotTcp, "position" | "orientation" | "orientation_type">,
  ) {
    const quaternion = robotTcp.orientation
      ? parseRotationToQuaternion(
          robotTcp.orientation,
          robotTcp.orientation_type ?? "ROTATION_VECTOR",
        )
      : new Quaternion()
    const position = robotTcp.position ?? [0, 0, 0]

    return new Pose3(
      new Vector3(position[0] ?? 0, position[1] ?? 0, position[2] ?? 0),
      quaternion,
    )
  }

  static fromCoordinateSystem(coordinateSystem: CoordinateSystem) {
    const quaternion = coordinateSystem.orientation
      ? parseRotationToQuaternion(
          coordinateSystem.orientation,
          coordinateSystem.orientation_type ?? "ROTATION_VECTOR",
        )
      : new Quaternion()
    const position = coordinateSystem.position ?? [0, 0, 0]

    return new Pose3(
      new Vector3(position[0] ?? 0, position[1] ?? 0, position[2] ?? 0),
      quaternion,
    )
  }

  constructor(
    readonly position: Vector3,
    readonly quaternion: Quaternion,
  ) {}

  inverse() {
    const inverseQuat = this.quaternion.clone().invert()
    return new Pose3(
      this.position.clone().applyQuaternion(inverseQuat).multiplyScalar(-1),
      inverseQuat,
    )
  }

  multiply(other: Pose3) {
    return new Pose3(
      this.position
        .clone()
        .add(other.position.clone().applyQuaternion(this.quaternion)),
      this.quaternion.clone().multiply(other.quaternion).normalize(),
    )
  }

  get orientation(): Vector3 {
    return quaternionToRotationVector(this.quaternion)
  }
}
