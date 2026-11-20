import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type {
  RobotControlPose,
  RobotControlSelect,
} from "../robotControl/RobotControlPanel"
import {
  CurrentPoseBar,
  type CurrentPoseBarProps,
  type OrientationFormat,
} from "./CurrentPoseBar"

// The pose of the Figma design of the bar
const POSE: RobotControlPose = {
  position: [-328.24, -607.46, 339.21],
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: Figma's Rx, not ln(10)
  orientation: [-2.303, -2.492, -2.181],
}

const QUATERNION: OrientationFormat = {
  type: "quaternion",
  angleUnit: "rad",
  eulerConvention: "EULER_ANGLES_EXTRINSIC_XYZ",
}

function select(value: string, options: [string, string][]) {
  return {
    options: options.map(([id, label]) => ({ id, label })),
    value,
    onChange: vi.fn(),
  } satisfies RobotControlSelect
}

function setup(props: Partial<CurrentPoseBarProps> = {}) {
  const tcp = select("gripper", [
    ["flange", "Flange"],
    ["gripper", "Gripper"],
  ])
  const frame = select("world", [
    ["world", "World"],
    ["base", "Base"],
  ])
  const onOrientationFormatChange = vi.fn()
  const all = (p: Partial<CurrentPoseBarProps>): CurrentPoseBarProps => ({
    getCurrentPose: () => POSE,
    tcp,
    frame,
    onOrientationFormatChange,
    ...p,
  })
  const view = render(<CurrentPoseBar {...all(props)} />)
  const rerender = (p: Partial<CurrentPoseBarProps>) =>
    view.rerender(<CurrentPoseBar {...all({ ...props, ...p })} />)
  return { tcp, frame, onOrientationFormatChange, rerender }
}

const values = () => screen.getByTestId("current-pose-values")

function choose(name: string, option: string, index = 0) {
  fireEvent.mouseDown(screen.getByRole("combobox", { name }))
  const options = within(screen.getByRole("listbox")).getAllByRole("option", {
    name: option,
  })
  fireEvent.click(options[index] as HTMLElement)
}

function openOrientationFormat() {
  fireEvent.click(screen.getByRole("button", { name: "Orientation format" }))
  return screen.getByRole("dialog", { name: "Orientation format" })
}

describe("CurrentPoseBar", () => {
  it("measures no open menu again when the app renders with new functions", () => {
    // An app that renders on each update of the motion state, with new
    // functions each time: an open menu must not measure its place again
    // each time, which froze the page with the 24 conventions open
    const { tcp, frame, rerender } = setup()
    openOrientationFormat()
    choose("Format", "Euler angles")
    fireEvent.mouseDown(
      screen.getByRole("combobox", { name: "Euler convention" }),
    )
    const measure = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect")

    for (let i = 0; i < 5; i++) {
      rerender({
        getCurrentPose: () => POSE,
        onOrientationFormatChange: vi.fn(),
        tcp: { ...tcp, options: [...tcp.options], onChange: vi.fn() },
        frame: { ...frame, options: [...frame.options], onChange: vi.fn() },
      })
    }
    expect(measure).not.toHaveBeenCalled()
    measure.mockRestore()
  })

  it("shows the pose in the bar's TCP and frame, the orientation as a rotation vector", () => {
    setup()

    expect(screen.getByText("Current position")).toBeVisible()
    expect(screen.getByRole("combobox", { name: "TCP" })).toHaveTextContent(
      "Gripper",
    )
    expect(
      screen.getByRole("combobox", { name: "Relative to" }),
    ).toHaveTextContent("World")
    expect(values()).toHaveTextContent(
      "X-328.2Y-607.5Z339.2Rx-2.303 radRy-2.492 radRz-2.181 rad",
    )
  })

  it("lets the app change the bar's TCP and frame", () => {
    const { tcp, frame } = setup()

    choose("TCP", "Flange")
    expect(tcp.onChange).toHaveBeenCalledWith("flange")
    choose("Relative to", "Base")
    expect(frame.onChange).toHaveBeenCalledWith("base")
  })

  it("shows the orientation in the format chosen in Orientation format", () => {
    const { onOrientationFormatChange } = setup()
    openOrientationFormat()

    choose("Format", "Euler angles")
    expect(values()).toHaveTextContent("Rx1.723 radRy-0.022 radRz1.668 rad")
    expect(onOrientationFormatChange).toHaveBeenLastCalledWith({
      type: "eulerAngles",
      angleUnit: "rad",
      eulerConvention: "EULER_ANGLES_EXTRINSIC_XYZ",
    })

    choose("Angle unit", "Degrees")
    expect(values()).toHaveTextContent("Rx98.7°Ry-1.2°Rz95.6°")
  })

  it("lists the 24 Euler conventions, intrinsic and then extrinsic", () => {
    setup()
    openOrientationFormat()
    choose("Format", "Euler angles")
    expect(
      screen.getByRole("combobox", { name: "Euler convention" }),
    ).toHaveTextContent("Extrinsic XYZ")

    fireEvent.mouseDown(
      screen.getByRole("combobox", { name: "Euler convention" }),
    )
    const listbox = screen.getByRole("listbox")
    expect(within(listbox).getAllByRole("option")).toHaveLength(24)
    expect(within(listbox).getByText("Intrinsic rotations")).toBeVisible()
    expect(within(listbox).getByText("Extrinsic rotations")).toBeVisible()
    fireEvent.click(
      within(listbox).getAllByRole("option", { name: "XYZ" })[0] as HTMLElement,
    )

    expect(
      screen.getByRole("combobox", { name: "Euler convention" }),
    ).toHaveTextContent("Intrinsic XYZ")
    expect(values()).toHaveTextContent("Rx-2.562 radRy1.388 radRz-2.136 rad")
  })

  it("shows a quaternion without an angle unit", () => {
    setup()
    const dialog = openOrientationFormat()

    choose("Format", "Quaternion")
    expect(values()).toHaveTextContent("Qx-0.515Qy-0.557Qz-0.488Qw-0.431")
    expect(
      within(dialog).queryByRole("combobox", { name: "Angle unit" }),
    ).toBeNull()
    expect(
      within(dialog).queryByRole("combobox", { name: "Euler convention" }),
    ).toBeNull()
  })

  it("shows the app's orientation format when the app keeps it", () => {
    const { onOrientationFormatChange, rerender } = setup({
      orientationFormat: QUATERNION,
    })
    expect(values()).toHaveTextContent("Qx-0.515")

    openOrientationFormat()
    choose("Format", "Rotation vector")
    expect(onOrientationFormatChange).toHaveBeenLastCalledWith({
      ...QUATERNION,
      type: "rotationVector",
    })
    expect(values(), "until the app passes it").toHaveTextContent("Qx-0.515")

    rerender({ orientationFormat: { ...QUATERNION, type: "rotationVector" } })
    expect(values()).toHaveTextContent("Rx-2.303 rad")
  })

  it("copies the pose as Move to reads it, in any format", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })
    setup({ orientationFormat: QUATERNION })

    fireEvent.click(screen.getByRole("button", { name: "Copy" }))
    expect(writeText).toHaveBeenCalledWith(
      "(-328.2, -607.5, 339.2, -2.303, -2.492, -2.181)",
    )
    expect(await screen.findByText("Pose copied")).toBeVisible()
  })

  it("shows dashes and copies nothing while the pose is unknown", () => {
    setup({ getCurrentPose: () => null })

    expect(values()).toHaveTextContent("X–Y–Z–Rx–Ry–Rz–")
    expect(screen.getByRole("button", { name: "Copy" })).toBeDisabled()
  })

  it("shows the state of the motion stream, Ready without one", () => {
    const { rerender } = setup()
    expect(screen.getByText("Ready")).toBeVisible()

    rerender({ state: "PAUSED_NEAR_JOINT_LIMIT" })
    expect(screen.getByText("Paused (near joint limit)")).toBeVisible()
  })

  it("shows an error instead of the state, as RobotPad does", () => {
    setup({
      state: "RUNNING",
      error: "Cannot plan this motion: it would cause a collision",
    })

    expect(
      screen.getByText("Cannot plan this motion: it would cause a collision"),
    ).toBeVisible()
    expect(screen.queryByText("Running")).toBeNull()
  })
})
