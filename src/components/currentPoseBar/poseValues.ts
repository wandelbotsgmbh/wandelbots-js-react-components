import type { RobotControlPose } from "../robotControl/RobotControlPanel"
import type { OrientationFormat } from "./CurrentPoseBar"
import {
  parseEulerConvention,
  quaternionToEuler,
  rotationVectorToQuaternion,
} from "./orientation"

/** Rotation vector in rad, Figma's default; Euler angles as Figma's, extrinsic XYZ */
export const DEFAULT_ORIENTATION_FORMAT: OrientationFormat = {
  type: "rotationVector",
  angleUnit: "rad",
  eulerConvention: "EULER_ANGLES_EXTRINSIC_XYZ",
}

/** One value of the bar, e.g. "X" and "-328.2" */
export type PoseValue = {
  label: string
  value: string
  kind: "x" | "y" | "z" | "orientation"
}

/** A value to `digits` decimals, without a minus before a zero */
function fixed(value: number, digits: number): string {
  const text = value.toFixed(digits)
  return Number(text) === 0 ? (0).toFixed(digits) : text
}

function angle(radians: number, unit: OrientationFormat["angleUnit"]) {
  return unit === "deg"
    ? `${fixed((radians * 180) / Math.PI, 1)}°`
    : `${fixed(radians, 3)} rad`
}

function orientationLabels(format: OrientationFormat): string[] {
  switch (format.type) {
    case "quaternion":
      return ["Qx", "Qy", "Qz", "Qw"]
    case "eulerAngles":
      // Each angle by the axis it turns about: Rx Ry Rz for XYZ
      return parseEulerConvention(format.eulerConvention).axes.map(
        (axis) => `R${axis.toLowerCase()}`,
      )
    default:
      return ["Rx", "Ry", "Rz"]
  }
}

function orientationValues(
  rotationVector: [number, number, number],
  format: OrientationFormat,
): string[] {
  switch (format.type) {
    case "quaternion":
      return rotationVectorToQuaternion(rotationVector).map((v) => fixed(v, 3))
    case "eulerAngles":
      return quaternionToEuler(
        rotationVectorToQuaternion(rotationVector),
        format.eulerConvention,
      ).map((v) => angle(v, format.angleUnit))
    default:
      return rotationVector.map((v) => angle(v, format.angleUnit))
  }
}

/**
 * The values the bar shows for a pose: the position to 0.1 mm, then the
 * orientation in the format; a dash for each while the pose is unknown
 */
export function poseValues(
  pose: RobotControlPose | null,
  format: OrientationFormat,
): PoseValue[] {
  const position = (["x", "y", "z"] as const).map((kind, i) => ({
    label: kind.toUpperCase(),
    value: pose ? fixed(pose.position[i] ?? 0, 1) : "–",
    kind,
  }))
  const shown = pose ? orientationValues(pose.orientation, format) : null
  const orientation = orientationLabels(format).map((label, i) => ({
    label,
    value: shown?.[i] ?? "–",
    kind: "orientation" as const,
  }))
  return [...position, ...orientation]
}
