import { fireEvent, render, screen, within } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { Quaternion } from "three"
import { describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import {
  RobotControlPanel,
  type RobotControlPanelProps,
} from "./RobotControlPanel"

type Props = Partial<RobotControlPanelProps>

const VELOCITY: RobotControlPanelProps["velocity"] = {
  translate: { value: 125, min: 1, max: 250 },
  // 10 °/s, of 1 to 60 °/s
  rotate: { value: Math.PI / 18, min: Math.PI / 180, max: Math.PI / 3 },
}

function setup(props: Props = {}) {
  const onJogStart = vi.fn()
  const onJogStop = vi.fn()
  const onVelocityChange = vi.fn()
  const panel = (p: Props) => (
    <I18nextProvider i18n={i18n}>
      <RobotControlPanel
        velocity={VELOCITY}
        onVelocityChange={onVelocityChange}
        onJogStart={onJogStart}
        onJogStop={onJogStop}
        {...p}
      />
    </I18nextProvider>
  )
  const view = render(panel(props))
  const rerender = (p: Props) => view.rerender(panel({ ...props, ...p }))
  return { onJogStart, onJogStop, onVelocityChange, rerender }
}

const jogControl = (name: string) =>
  screen.getByRole("button", { name: `Jog ${name}` })
const press = (element: HTMLElement) =>
  fireEvent.pointerDown(element, { button: 0, pointerId: 1 })
const release = (element: HTMLElement) =>
  fireEvent.pointerUp(element, { pointerId: 1 })
const tab = (name: string) => screen.getByRole("tab", { name })

/** Picks `option` in the select named `name` */
function choose(name: string, option: string) {
  fireEvent.mouseDown(screen.getByRole("combobox", { name }))
  fireEvent.click(
    within(screen.getByRole("listbox")).getByRole("option", { name: option }),
  )
}

describe("RobotControlPanel", () => {
  it("is titled Robot control, with a tab to translate and one to rotate", () => {
    setup()

    expect(screen.getByRole("heading", { name: "Robot control" })).toBeVisible()
    expect(tab("Translate")).toHaveAttribute("aria-selected", "true")
    expect(tab("Rotate")).toHaveAttribute("aria-selected", "false")
  })

  it("has a close button only when the app can close it", () => {
    const { rerender } = setup()
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull()

    const onClose = vi.fn()
    rerender({ onClose })
    fireEvent.click(screen.getByRole("button", { name: "Close" }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("translates while a jog control is held, and rotates on the Rotate tab", () => {
    const { onJogStart, onJogStop } = setup()

    press(jogControl("X+"))
    expect(onJogStart).toHaveBeenLastCalledWith("translate", "x", "+")
    release(jogControl("X+"))
    expect(onJogStop).toHaveBeenCalledTimes(1)

    fireEvent.click(tab("Rotate"))
    press(jogControl("Rz-"))
    expect(onJogStart).toHaveBeenLastCalledWith("rotate", "z", "-")
    release(jogControl("Rz-"))
    expect(onJogStop).toHaveBeenCalledTimes(2)
  })

  it("shows the buttons without the 3D view's orientation, and else the gizmo, with a switch between them", () => {
    const { rerender } = setup()
    expect(screen.getByTestId("jogging-buttons")).toBeVisible()
    expect(screen.queryByTestId("jogging-gizmo")).toBeNull()
    expect(screen.queryByRole("button", { name: "Gizmo controls" })).toBeNull()

    rerender({ gizmoOrientation: { current: new Quaternion() } })
    expect(screen.getByTestId("jogging-gizmo")).toBeVisible()
    expect(screen.queryByTestId("jogging-buttons")).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "Button controls" }))
    expect(screen.getByTestId("jogging-buttons")).toBeVisible()
    fireEvent.click(screen.getByRole("button", { name: "Gizmo controls" }))
    expect(screen.getByTestId("jogging-gizmo")).toBeVisible()
  })

  it("shows the velocity of the tab's motion in mm/s or °/s, and reports a change in NOVA's units", () => {
    const { onVelocityChange } = setup()
    const slider = () => screen.getByRole("slider", { name: "Velocity" })

    expect(screen.getByText("125 mm/s")).toBeVisible()
    fireEvent.change(slider(), { target: { value: 200 } })
    expect(onVelocityChange).toHaveBeenLastCalledWith("translate", 200)

    fireEvent.click(tab("Rotate"))
    expect(screen.getByText("10°/s")).toBeVisible()
    fireEvent.change(slider(), { target: { value: 20 } })
    expect(onVelocityChange).toHaveBeenLastCalledWith(
      "rotate",
      expect.closeTo(Math.PI / 9, 10),
    )
  })

  it("shows the TCP and the frame to jog along only when the app gives them, and reports a choice", () => {
    const { rerender } = setup()
    expect(screen.queryByRole("combobox", { name: "TCP" })).toBeNull()
    expect(
      screen.queryByRole("combobox", { name: "Move along axis of" }),
    ).toBeNull()

    const onTcpChange = vi.fn()
    const onFrameChange = vi.fn()
    rerender({
      tcp: {
        options: [
          { id: "flange", label: "Flange" },
          { id: "gripper", label: "Gripper" },
        ],
        value: "flange",
        onChange: onTcpChange,
      },
      jogFrame: {
        options: [
          { id: "world", label: "World" },
          { id: "tool", label: "Tool" },
        ],
        value: "world",
        onChange: onFrameChange,
      },
    })

    expect(screen.getByRole("combobox", { name: "TCP" })).toHaveTextContent(
      "Flange",
    )
    choose("TCP", "Gripper")
    expect(onTcpChange).toHaveBeenCalledWith("gripper")
    choose("Move along axis of", "Tool")
    expect(onFrameChange).toHaveBeenCalledWith("tool")
  })

  it("offers Increment only when the app can jog in steps", () => {
    const { rerender } = setup()
    expect(screen.queryByRole("button", { name: "Increment" })).toBeNull()

    rerender({
      increments: {
        steps: { translate: [1], rotate: [0.01] },
        onStep: vi.fn(),
      },
    })
    expect(screen.getByRole("button", { name: "Continuous" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
    expect(screen.getByRole("button", { name: "Increment" })).toBeVisible()
  })

  it("jogs one step per press in Increment mode, by the chosen step size", () => {
    const onStep = vi.fn()
    const { onJogStart, onJogStop } = setup({
      increments: {
        steps: { translate: [1, 5, 10], rotate: [Math.PI / 72] },
        onStep,
      },
    })
    fireEvent.click(screen.getByRole("button", { name: "Increment" }))

    press(jogControl("Y-"))
    release(jogControl("Y-"))
    expect(onStep).toHaveBeenLastCalledWith("translate", "y", "-", 1)

    choose("Step size", "5 mm")
    press(jogControl("Y-"))
    release(jogControl("Y-"))
    expect(onStep).toHaveBeenLastCalledWith("translate", "y", "-", 5)

    fireEvent.click(tab("Rotate"))
    expect(
      screen.getByRole("combobox", { name: "Step size" }),
    ).toHaveTextContent("2.5°")
    press(jogControl("Rx+"))
    expect(onStep).toHaveBeenLastCalledWith("rotate", "x", "+", Math.PI / 72)

    // A step is not a hold: nothing jogs on, nothing to stop
    expect(onJogStart).not.toHaveBeenCalled()
    expect(onJogStop).not.toHaveBeenCalled()
  })

  it("shows the control of the running step as pressed", () => {
    setup({
      increments: {
        steps: { translate: [1], rotate: [0.01] },
        onStep: vi.fn(),
        running: { axis: "z", direction: "+" },
      },
    })
    fireEvent.click(screen.getByRole("button", { name: "Increment" }))

    expect(jogControl("Z+")).toHaveAttribute("aria-pressed", "true")
    expect(jogControl("Z-")).toHaveAttribute("aria-pressed", "false")
  })

  it("stops a held jog when the mode changes: its release would no longer stop it", () => {
    const { onJogStart, onJogStop } = setup({
      increments: {
        steps: { translate: [1], rotate: [0.01] },
        onStep: vi.fn(),
      },
    })

    press(jogControl("X-"))
    expect(onJogStart).toHaveBeenCalledTimes(1)
    fireEvent.click(screen.getByRole("button", { name: "Increment" }))

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("stops a held jog when the view switches between gizmo and buttons", () => {
    const { onJogStop } = setup({
      gizmoOrientation: { current: new Quaternion() },
    })

    press(jogControl("Z+"))
    fireEvent.click(screen.getByRole("button", { name: "Button controls" }))

    expect(onJogStop).toHaveBeenCalledTimes(1)
  })

  it("jogs nothing while disabled, and its settings cannot be changed", () => {
    const { onJogStart } = setup({
      disabled: true,
      increments: {
        steps: { translate: [1], rotate: [0.01] },
        onStep: vi.fn(),
      },
    })

    press(jogControl("X+"))

    expect(onJogStart).not.toHaveBeenCalled()
    expect(screen.getByRole("slider", { name: "Velocity" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled()
  })
})
