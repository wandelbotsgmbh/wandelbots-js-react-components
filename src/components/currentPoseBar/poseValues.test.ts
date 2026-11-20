import { describe, expect, it } from "vitest"
import type { RobotControlPose } from "../robotControl/RobotControlPanel"
import type { OrientationFormat } from "./CurrentPoseBar"
import { DEFAULT_ORIENTATION_FORMAT, poseValues } from "./poseValues"

// The pose of the Figma design of the bar
const POSE: RobotControlPose = {
  position: [-328.24, -607.46, 339.21],
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: Figma's Rx, not ln(10)
  orientation: [-2.303, -2.492, -2.181],
}

const shown = (pose: RobotControlPose | null, format: OrientationFormat) =>
  poseValues(pose, format).map(({ label, value }) => `${label} ${value}`)

const format = (change: Partial<OrientationFormat>): OrientationFormat => ({
  ...DEFAULT_ORIENTATION_FORMAT,
  ...change,
})

describe("poseValues", () => {
  it("shows the position to 0.1 mm and the rotation vector to 0.001 rad, as Figma", () => {
    expect(shown(POSE, DEFAULT_ORIENTATION_FORMAT)).toEqual([
      "X -328.2",
      "Y -607.5",
      "Z 339.2",
      "Rx -2.303 rad",
      "Ry -2.492 rad",
      "Rz -2.181 rad",
    ])
  })

  it("shows angles in degrees to 0.1°", () => {
    expect(shown(POSE, format({ angleUnit: "deg" })).slice(3)).toEqual([
      "Rx -132.0°",
      "Ry -142.8°",
      "Rz -125.0°",
    ])
  })

  it("shows Euler angles labeled by the axes of their convention", () => {
    expect(
      shown(POSE, format({ type: "eulerAngles" })).slice(3),
      "Figma's extrinsic XYZ",
    ).toEqual(["Rx 1.723 rad", "Ry -0.022 rad", "Rz 1.668 rad"])
    expect(
      poseValues(
        POSE,
        format({
          type: "eulerAngles",
          eulerConvention: "EULER_ANGLES_INTRINSIC_ZXZ",
        }),
      )
        .slice(3)
        .map((value) => value.label),
    ).toEqual(["Rz", "Rx", "Rz"])
  })

  it("shows the quaternion without a unit, in degrees too", () => {
    expect(
      shown(POSE, format({ type: "quaternion", angleUnit: "deg" })).slice(3),
    ).toEqual(["Qx -0.515", "Qy -0.557", "Qz -0.488", "Qw -0.431"])
  })

  it("shows no minus before a value that rounds to zero", () => {
    const nearZero: RobotControlPose = {
      position: [-0.04, 0, 0],
      orientation: [0, 0, -0.0001],
    }
    expect(shown(nearZero, DEFAULT_ORIENTATION_FORMAT)).toEqual([
      "X 0.0",
      "Y 0.0",
      "Z 0.0",
      "Rx 0.000 rad",
      "Ry 0.000 rad",
      "Rz 0.000 rad",
    ])
  })

  it("shows a dash while the pose is unknown", () => {
    expect(
      poseValues(null, DEFAULT_ORIENTATION_FORMAT).map((value) => value.value),
    ).toEqual(["–", "–", "–", "–", "–", "–"])
  })
})
