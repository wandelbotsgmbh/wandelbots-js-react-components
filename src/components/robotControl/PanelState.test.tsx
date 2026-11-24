import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import {
  RobotControlPanel,
  type RobotControlPanelProps,
} from "./RobotControlPanel"

// What the app may keep itself: the tab, the jog mode and the step size, and
// which parts may jog (jogDisabled) apart from the whole panel (disabled)

type Props = Partial<RobotControlPanelProps>

function setup(props: Props = {}) {
  const base: RobotControlPanelProps = {
    velocity: {
      translate: { value: 125, min: 1, max: 250 },
      rotate: { value: 0.1, min: 0.01, max: 1 },
    },
    onVelocityChange: vi.fn(),
    onJogStart: vi.fn(),
    onJogStop: vi.fn(),
  }
  const panel = (p: Props) => (
    <I18nextProvider i18n={i18n}>
      <RobotControlPanel {...base} {...p} />
    </I18nextProvider>
  )
  const view = render(panel(props))
  return {
    ...base,
    rerender: (p: Props) => view.rerender(panel({ ...props, ...p })),
  }
}

const tab = (name: string) => screen.getByRole("tab", { name })
const button = (name: string) => screen.getByRole("button", { name })
/** Edit the Move to field, type `text` and save it with Enter */
function confirmPose(text: string) {
  fireEvent.click(button("Edit pose"))
  const field = screen.getByRole("textbox", {
    name: "Coordinates XYZ (mm) · Rotation vector (rad)",
  })
  fireEvent.change(field, { target: { value: text } })
  fireEvent.keyDown(field, { key: "Enter" })
}
const press = (element: HTMLElement) =>
  fireEvent.pointerDown(element, { button: 0, pointerId: 1 })

function choose(name: string, option: string) {
  fireEvent.mouseDown(screen.getByRole("combobox", { name }))
  fireEvent.click(
    within(screen.getByRole("listbox")).getByRole("option", { name: option }),
  )
}

const increments = (more: object = {}) => ({
  steps: { translate: [1, 5, 10], rotate: [Math.PI / 72] },
  onStep: vi.fn(),
  ...more,
})

describe("RobotControlPanel's state", () => {
  it("keeps its own tab without one from the app, and reports each change", () => {
    const onTabChange = vi.fn()
    setup({ onTabChange })

    fireEvent.click(tab("Rotate"))

    expect(tab("Rotate")).toHaveAttribute("aria-selected", "true")
    expect(onTabChange).toHaveBeenCalledWith("rotate")
  })

  it("shows the tab the app gives, and only asks for a change", () => {
    const onTabChange = vi.fn()
    const { rerender } = setup({ tab: "rotate", onTabChange })
    expect(tab("Rotate")).toHaveAttribute("aria-selected", "true")

    fireEvent.click(tab("Translate"))
    expect(onTabChange).toHaveBeenCalledWith("translate")
    expect(tab("Rotate")).toHaveAttribute("aria-selected", "true")

    rerender({ tab: "translate" })
    expect(tab("Translate")).toHaveAttribute("aria-selected", "true")
  })

  it("shows the jog mode the app gives, and asks for a change", () => {
    const onJogModeChange = vi.fn()
    setup({ jogMode: "increment", onJogModeChange, increments: increments() })

    expect(button("Increment")).toHaveAttribute("aria-pressed", "true")
    fireEvent.click(button("Continuous"))

    expect(onJogModeChange).toHaveBeenCalledWith("continuous")
    expect(button("Increment")).toHaveAttribute("aria-pressed", "true")
  })

  it("steps by the step size the app gives, and asks for a change", () => {
    const onStepChange = vi.fn()
    const steps = increments({ step: { translate: 5 }, onStepChange })
    setup({ jogMode: "increment", increments: steps })

    expect(
      screen.getByRole("combobox", { name: "Step size" }),
    ).toHaveTextContent("5 mm")
    choose("Step size", "10 mm")
    expect(onStepChange).toHaveBeenCalledWith("translate", 10)

    press(button("Jog Z+"))
    expect(steps.onStep).toHaveBeenCalledWith("translate", "z", "+", 5)
  })

  it("with jogDisabled, jogs nothing but still moves to a pose", async () => {
    const onMoveStart = vi.fn()
    const onMoveStop = vi.fn()
    const { onJogStart } = setup({
      jogDisabled: true,
      joints: {
        joints: [{ value: 0, min: -2, max: 2 }],
        velocity: { value: 0.5, min: 0.01, max: 1 },
        onVelocityChange: vi.fn(),
        onJogStart: vi.fn(),
        onJogStop: vi.fn(),
      },
      moveTo: {
        getCurrentPose: () => null,
        onTargetChange: vi.fn(),
        state: "planned",
        onMoveStart,
        onMoveStop,
      },
    })

    press(button("Jog X+"))
    expect(onJogStart).not.toHaveBeenCalled()
    fireEvent.click(tab("Joint"))
    expect(screen.getByRole("slider", { name: "J1" })).toHaveAttribute(
      "aria-disabled",
      "true",
    )

    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    press(button("Move to"))
    await waitFor(() => expect(onMoveStart).toHaveBeenCalledTimes(1))
  })

  // In RobotPad they stayed usable while the robot was not activated: they
  // move nothing. A TCP change needs the jogging connection, as a jog.
  it("with jogDisabled, turns off the jog controls and the TCP select, and leaves the settings that move nothing", () => {
    const onTcpChange = vi.fn()
    const onFrameChange = vi.fn()
    const onJogModeChange = vi.fn()
    const onStepChange = vi.fn()
    const onJointVelocityChange = vi.fn()
    const props: Props = {
      jogDisabled: true,
      jogMode: "increment",
      onJogModeChange,
      increments: increments({ onStepChange }),
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
      joints: {
        joints: [{ value: 0, min: -2, max: 2 }],
        velocity: { value: 0.5, min: 0.01, max: 1 },
        onVelocityChange: onJointVelocityChange,
        onJogStart: vi.fn(),
        onJogStop: vi.fn(),
      },
    }
    const select = (name: string) => screen.getByRole("combobox", { name })
    const velocity = () => screen.getByRole("slider", { name: "Velocity" })
    const { onVelocityChange, onJogStart, rerender } = setup(props)

    // What moves the robot, or needs the connection that does, is off
    expect(button("Jog X+")).toBeDisabled()
    press(button("Jog X+"))
    expect(onJogStart).not.toHaveBeenCalled()
    expect(props.increments?.onStep).not.toHaveBeenCalled()
    expect(select("TCP")).toHaveAttribute("aria-disabled", "true")

    // The settings are the user's to prepare
    choose("Move relative to", "Tool")
    expect(onFrameChange).toHaveBeenCalledWith("tool")
    fireEvent.click(button("Continuous"))
    expect(onJogModeChange).toHaveBeenCalledWith("continuous")
    choose("Step size", "10 mm")
    expect(onStepChange).toHaveBeenCalledWith("translate", 10)
    // A disabled slider would still report a change that a test fires
    expect(velocity()).toBeEnabled()
    fireEvent.change(velocity(), { target: { value: 200 } })
    expect(onVelocityChange).toHaveBeenCalledWith("translate", 200)

    fireEvent.click(tab("Joint"))
    expect(screen.getByRole("slider", { name: "J1" })).toHaveAttribute(
      "aria-disabled",
      "true",
    )
    expect(velocity()).toBeEnabled()
    fireEvent.change(velocity(), { target: { value: 20 } })
    expect(onJointVelocityChange).toHaveBeenCalled()

    // The app's lock turns everything off
    rerender({ disabled: true })
    expect(velocity()).toBeDisabled()
    fireEvent.click(tab("Translate"))
    expect(velocity()).toBeDisabled()
    expect(button("Continuous")).toBeDisabled()
    for (const name of ["TCP", "Move relative to", "Step size"]) {
      expect(select(name)).toHaveAttribute("aria-disabled", "true")
    }
  })

  it("says why jogging is off in place of the hint on Translate and Rotate, and under the joints on Joint", () => {
    const reason = "The robot must be activated first"
    const hint = "Hold a button to jog · Release to stop"
    const { rerender } = setup({
      jogDisabled: true,
      jogDisabledReason: reason,
      joints: {
        joints: [{ value: 0, min: -2, max: 2 }],
        velocity: { value: 0.5, min: 0.01, max: 1 },
        onVelocityChange: vi.fn(),
        onJogStart: vi.fn(),
        onJogStop: vi.fn(),
      },
      moveTo: {
        getCurrentPose: () => null,
        onTargetChange: vi.fn(),
        state: "idle",
        onMoveStart: vi.fn(),
        onMoveStop: vi.fn(),
      },
    })

    for (const name of ["Translate", "Rotate", "Joint"]) {
      fireEvent.click(tab(name))
      expect(screen.getByText(reason)).toBeVisible()
      expect(screen.queryByText(hint)).toBeNull()
    }
    // Move to says itself why it cannot move, when it has a target
    fireEvent.click(tab("Move to"))
    expect(screen.queryByText(reason)).toBeNull()

    // Jogging is on again: the hint of how to jog is back
    rerender({ jogDisabled: false, jogDisabledReason: undefined })
    fireEvent.click(tab("Translate"))
    expect(screen.getByText(hint)).toBeVisible()
    expect(screen.queryByText(reason)).toBeNull()
  })

  it("offers Try again with the reason only when the app can end it, and not while the panel is disabled", () => {
    const onJogRetry = vi.fn()
    const joints = {
      joints: [{ value: 0, min: -2, max: 2 }],
      velocity: { value: 0.5, min: 0.01, max: 1 },
      onVelocityChange: vi.fn(),
      onJogStart: vi.fn(),
      onJogStop: vi.fn(),
    }
    const { rerender } = setup({
      jogDisabled: true,
      jogDisabledReason: "Another client is currently controlling the jogging.",
      joints,
    })
    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull()

    rerender({ onJogRetry })
    fireEvent.click(button("Try again"))
    expect(onJogRetry).toHaveBeenCalledTimes(1)

    fireEvent.click(tab("Joint"))
    fireEvent.click(button("Try again"))
    expect(onJogRetry).toHaveBeenCalledTimes(2)

    rerender({ onJogRetry, disabled: true })
    expect(button("Try again")).toBeDisabled()
  })

  it("goes on moving to a pose when jogging becomes disabled meanwhile", async () => {
    const onMoveStart = vi.fn()
    const onMoveStop = vi.fn()
    const { rerender } = setup({
      tab: "moveTo",
      moveTo: {
        getCurrentPose: () => null,
        onTargetChange: vi.fn(),
        state: "planned",
        onMoveStart,
        onMoveStop,
      },
    })
    confirmPose("(1, 2, 3, 0, 0, 0)")
    press(button("Move to"))
    await waitFor(() => expect(onMoveStart).toHaveBeenCalledTimes(1))

    // As an app locks jogging while its trajectory moves
    rerender({ jogDisabled: true })

    expect(onMoveStop).not.toHaveBeenCalled()
  })
})
