import type { CoordinateSystem } from "@wandelbots/nova-js/v2"
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
 * Ported from RobotPad (src/util/Pose3.ts), only what the jogger uses.
 */
export class Pose3 {
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

  get orientation(): Vector3 {
    return quaternionToRotationVector(this.quaternion)
  }
}
