import { fireEvent, render, screen } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import {
  RobotControlPanel,
  type RobotControlMoveTo,
  type RobotControlPanelProps,
} from "./RobotControlPanel"

const CURRENT_POSE = {
  position: [539.94, 0, 895] as [number, number, number],
  orientation: [-3.14, -0.04, 0.8] as [number, number, number],
}

function setup(
  moveTo: Partial<RobotControlMoveTo> | null = {},
  panel: Partial<RobotControlPanelProps> = {},
) {
  const onTargetChange = vi.fn()
  const onMoveStart = vi.fn()
  const onMoveStop = vi.fn()
  const onVelocityChange = vi.fn()
  const props = (
    m: Partial<RobotControlMoveTo> | null,
  ): RobotControlPanelProps => ({
    velocity: {
      translate: { value: 125, min: 1, max: 250 },
      rotate: { value: 0.1, min: 0.01, max: 1 },
    },
    onVelocityChange,
    onJogStart: vi.fn(),
    onJogStop: vi.fn(),
    moveTo:
      m === null
        ? undefined
        : {
            getCurrentPose: () => CURRENT_POSE,
            onTargetChange,
            onMoveStart,
            onMoveStop,
            ...m,
          },
    ...panel,
  })
  const view = render(
    <I18nextProvider i18n={i18n}>
      <RobotControlPanel {...props(moveTo)} />
    </I18nextProvider>,
  )
  const rerender = (m: Partial<RobotControlMoveTo>) =>
    view.rerender(
      <I18nextProvider i18n={i18n}>
        <RobotControlPanel {...props({ ...moveTo, ...m })} />
      </I18nextProvider>,
    )
  return { onTargetChange, onMoveStart, onMoveStop, onVelocityChange, rerender }
}

const tab = (name: string) => screen.getByRole("tab", { name })
const coordinates = () =>
  screen.getByRole("textbox", {
    name: "Coordinates XYZ (mm) · Rotation vector (rad)",
  })
const type = (text: string) =>
  fireEvent.change(coordinates(), { target: { value: text } })
const moveButton = () => screen.getByRole("button", { name: "Move to pose" })
const press = (element: HTMLElement) =>
  fireEvent.pointerDown(element, { button: 0, pointerId: 1 })
const release = (element: HTMLElement) =>
  fireEvent.pointerUp(element, { pointerId: 1 })

describe("RobotControlPanel's Move to tab", () => {
  it("is there only when the app gives moveTo", () => {
    setup(null)
    expect(screen.queryByRole("tab", { name: "Move to" })).toBeNull()
  })

  it("fills in the current pose, and reports a typed pose for the app to plan", () => {
    const { onTargetChange } = setup()
    fireEvent.click(tab("Move to"))

    fireEvent.click(screen.getByRole("button", { name: "Use current pose" }))
    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
    expect(onTargetChange).toHaveBeenLastCalledWith({
      position: [539.9, 0, 895],
      orientation: [-3.14, -0.04, 0.8],
    })

    type("(1, 2, 3, 0.1, 0.2, 0.3)")
    expect(onTargetChange).toHaveBeenLastCalledWith({
      position: [1, 2, 3],
      orientation: [0.1, 0.2, 0.3],
    })
  })

  it("says what a text that is no pose lacks, reports no pose, and does not move", () => {
    const { onTargetChange, onMoveStart } = setup()
    fireEvent.click(tab("Move to"))

    type("(1, 2, 3)")
    expect(
      screen.getByText("Enter six numbers: (x, y, z, rx, ry, rz)"),
    ).toBeVisible()
    expect(onTargetChange).toHaveBeenLastCalledWith(null)
    expect(moveButton()).toBeDisabled()
    press(moveButton())
    expect(onMoveStart).not.toHaveBeenCalled()
  })

  it("moves to the target while the button is held, and stops on release", () => {
    const { onMoveStart, onMoveStop } = setup()
    fireEvent.click(tab("Move to"))
    type("(1, 2, 3, 0, 0, 0)")

    press(moveButton())
    expect(onMoveStart).toHaveBeenCalledWith({
      position: [1, 2, 3],
      orientation: [0, 0, 0],
    })
    release(moveButton())
    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("cannot be held while the app plans or when it cannot move there, and says why", () => {
    const { onMoveStart, rerender } = setup()
    fireEvent.click(tab("Move to"))
    type("(1, 2, 3, 0, 0, 0)")

    rerender({ planning: true })
    press(moveButton())
    expect(onMoveStart).not.toHaveBeenCalled()

    rerender({ planning: false, error: "The robot cannot reach this pose" })
    expect(screen.getByText("The robot cannot reach this pose")).toBeVisible()
    expect(moveButton()).toBeDisabled()
  })

  it("stops a held move when the tab changes", () => {
    const { onMoveStop } = setup()
    fireEvent.click(tab("Move to"))
    type("(1, 2, 3, 0, 0, 0)")

    press(moveButton())
    fireEvent.click(tab("Translate"))

    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("keeps the typed pose while another tab is shown", () => {
    setup()
    fireEvent.click(tab("Move to"))
    type("(1, 2, 3, 0, 0, 0)")

    fireEvent.click(tab("Translate"))
    fireEvent.click(tab("Move to"))

    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")
  })

  it("moves with the translation velocity", () => {
    const { onVelocityChange } = setup()
    fireEvent.click(tab("Move to"))

    expect(screen.getByText("125 mm/s")).toBeVisible()
    fireEvent.change(screen.getByRole("slider", { name: "Velocity" }), {
      target: { value: 200 },
    })
    expect(onVelocityChange).toHaveBeenCalledWith("translate", 200)
  })

  it("shows the TCP and the frame the pose is relative to", () => {
    const onFrameChange = vi.fn()
    setup(
      {
        frame: {
          options: [
            { id: "world", label: "World" },
            { id: "table", label: "Table" },
          ],
          value: "world",
          onChange: onFrameChange,
        },
      },
      {
        tcp: {
          options: [{ id: "flange", label: "Flange" }],
          value: "flange",
          onChange: vi.fn(),
        },
      },
    )
    fireEvent.click(tab("Move to"))

    expect(screen.getByRole("combobox", { name: "TCP" })).toHaveTextContent(
      "Flange",
    )
    expect(
      screen.getByRole("combobox", { name: "Relative to" }),
    ).toHaveTextContent("World")
  })

  it("moves nothing while disabled", () => {
    const { onMoveStart } = setup({}, { disabled: true })
    fireEvent.click(tab("Move to"))

    expect(
      screen.getByRole("button", { name: "Use current pose" }),
    ).toBeDisabled()
    expect(moveButton()).toBeDisabled()
    press(moveButton())
    expect(onMoveStart).not.toHaveBeenCalled()
  })
})
