import type { Pose } from "@wandelbots/nova-js/v2"
import { Quaternion, Vector3 } from "three"
import {
  parseRotationToQuaternion,
  quaternionToRotationVector,
} from "./rotation"

// Ported from RobotPad (src/jogging/incrementalCartesianMotion.ts)

export type JoggingAxis = "x" | "y" | "z"
export type JoggingDirection = "-" | "+"

/** The distance of a step jog: a translation in mm or a rotation in rad */
export type IncrementalMotion =
  | {
      type: "rotate"
      distanceRads: number
    }
  | {
      type: "translate"
      distanceMm: number
    }

/**
 * Compute the target TCP pose for a single incremental cartesian jog step.
 *
 * The motion is a fixed translation (mm) or rotation (rad) along/around one
 * cartesian axis. When `useToolCoordinateSystem` is false the axis is
 * interpreted in the coordinate system frame (base/world, or the coordinate
 * system given by `coordinateSystemRotation`); when true it is interpreted in
 * the tool frame, i.e. relative to the current TCP orientation.
 *
 * This mirrors the `use_tool_coordinate_system` flag used for continuous
 * jogging, but here the target pose has to be resolved on the client because
 * the motion is planned as a trajectory to an absolute pose.
 */
export function computeIncrementalTargetPose({
  currentTcpPose,
  axis,
  direction,
  motion,
  useToolCoordinateSystem,
  coordinateSystemRotation,
}: {
  currentTcpPose: Pose
  axis: JoggingAxis
  direction: JoggingDirection
  motion: IncrementalMotion
  useToolCoordinateSystem: boolean
  /**
   * Rotation of the coordinate system whose axes the motion follows, relative
   * to the base frame of `currentTcpPose`. Ignored in tool orientation.
   */
  coordinateSystemRotation?: Quaternion
}): { position?: number[]; orientation?: number[] } {
  const sign = direction === "-" ? -1 : 1

  if (motion.type === "translate") {
    if (!currentTcpPose.position) {
      throw new Error(
        "Current pose has no position, cannot perform translation",
      )
    }

    const signedDistanceMm = motion.distanceMm * sign
    const displacement = new Vector3()
    displacement[axis] = signedDistanceMm

    if (useToolCoordinateSystem) {
      // Express the tool-frame axis in the base frame using the current TCP
      // orientation, then translate along it.
      if (!currentTcpPose.orientation) {
        throw new Error(
          "Current pose has no orientation, cannot translate relative to tool",
        )
      }
      displacement.applyQuaternion(
        parseRotationToQuaternion(
          currentTcpPose.orientation,
          "ROTATION_VECTOR",
        ),
      )
    } else if (coordinateSystemRotation) {
      // Express the coordinate system's axis in the base frame
      displacement.applyQuaternion(coordinateSystemRotation)
    }

    const targetPosition = [...currentTcpPose.position]
    targetPosition[0] = (targetPosition[0] ?? 0) + displacement.x
    targetPosition[1] = (targetPosition[1] ?? 0) + displacement.y
    targetPosition[2] = (targetPosition[2] ?? 0) + displacement.z

    return {
      position: targetPosition,
      orientation: currentTcpPose.orientation,
    }
  }

  // motion.type === "rotate"
  if (!currentTcpPose.orientation) {
    throw new Error("Current pose has no orientation, cannot perform rotation")
  }

  const currentOrientation = parseRotationToQuaternion(
    currentTcpPose.orientation,
    "ROTATION_VECTOR",
  )

  const rotationAxis = new Vector3()
  rotationAxis[axis] = 1
  if (!useToolCoordinateSystem && coordinateSystemRotation) {
    // Express the coordinate system's axis in the base frame
    rotationAxis.applyQuaternion(coordinateSystemRotation)
  }
  const deltaRotation = new Quaternion().setFromAxisAngle(
    rotationAxis,
    motion.distanceRads * sign,
  )

  // Coordinate-system frame: rotate about a fixed base axis (pre-multiply).
  // Tool frame: rotate about the tool's own axis (post-multiply / intrinsic).
  const targetOrientation = useToolCoordinateSystem
    ? currentOrientation.multiply(deltaRotation)
    : deltaRotation.multiply(currentOrientation)

  return {
    position: currentTcpPose.position,
    orientation: [...quaternionToRotationVector(targetOrientation)],
  }
}
