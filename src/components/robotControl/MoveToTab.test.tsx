import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { I18nextProvider } from "react-i18next"
import { describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import {
  RobotControlPanel,
  type RobotControlMoveTo,
  type RobotControlPanelProps,
  type RobotControlPose,
} from "./RobotControlPanel"

const CURRENT_POSE: RobotControlPose = {
  position: [539.94, 0, 895],
  orientation: [-3.14, -0.04, 0.8],
}
const TARGET: RobotControlPose = {
  position: [1, 2, 3],
  orientation: [0, 0, 0],
}

function setup(
  moveTo: Partial<RobotControlMoveTo> | null = {},
  panel: Partial<RobotControlPanelProps> = {},
) {
  const onTargetChange = vi.fn()
  const onMoveStart = vi.fn()
  const onMoveStop = vi.fn()
  const onVelocityChange = vi.fn()
  let latest: Partial<RobotControlMoveTo> = moveTo ?? {}
  let latestPanel = panel
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
            state: "idle",
            onMoveStart,
            onMoveStop,
            ...m,
          },
    ...latestPanel,
  })
  const view = render(
    <I18nextProvider i18n={i18n}>
      <RobotControlPanel {...props(moveTo)} />
    </I18nextProvider>,
  )
  /** The app's side changed, e.g. the state of the move or the TCP */
  const rerender = (
    m: Partial<RobotControlMoveTo>,
    p: Partial<RobotControlPanelProps> = {},
  ) => {
    latest = { ...latest, ...m }
    latestPanel = { ...latestPanel, ...p }
    view.rerender(
      <I18nextProvider i18n={i18n}>
        <RobotControlPanel {...props(latest)} />
      </I18nextProvider>,
    )
  }
  return { onTargetChange, onMoveStart, onMoveStop, onVelocityChange, rerender }
}

const tab = (name: string) => screen.getByRole("tab", { name })
const coordinates = () =>
  screen.getByRole("textbox", {
    name: "Coordinates XYZ (mm) · Rotation vector (rad)",
  })
const button = (name: string) => screen.getByRole("button", { name })
const queryButton = (name: string) => screen.queryByRole("button", { name })
const moveButton = () =>
  screen.getByRole("button", { name: /^(Move to|Moving…|Stopping…)$/ })
const press = (element: HTMLElement) =>
  fireEvent.pointerDown(element, { button: 0, pointerId: 1 })
const release = (element: HTMLElement) =>
  fireEvent.pointerUp(element, { pointerId: 1 })
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const frame = (value: string) => ({
  options: [
    { id: "world", label: "World" },
    { id: "table", label: "Table" },
  ],
  value,
  onChange: vi.fn(),
})
const tcpSelect = (value: string) => ({
  options: [
    { id: "flange", label: "Flange" },
    { id: "gripper", label: "Gripper" },
  ],
  value,
  onChange: vi.fn(),
})
const LIVE_TEXT = "(539.9, 0, 895, -3.14, -0.04, 0.8)"

/** Edit the field, type `text` and save it with Enter, as in RobotPad */
function confirmPose(text: string) {
  fireEvent.click(button("Edit pose"))
  fireEvent.change(coordinates(), { target: { value: text } })
  fireEvent.keyDown(coordinates(), { key: "Enter" })
}

/** Hold the Move to button until the move starts (after 200 ms) */
async function holdUntilStarted(onMoveStart: ReturnType<typeof vi.fn>) {
  press(moveButton())
  await waitFor(() => expect(onMoveStart).toHaveBeenCalledTimes(1))
}

describe("RobotControlPanel's Move to tab, as RobotPad's pose field", () => {
  it("is there only when the app gives moveTo", () => {
    setup(null)
    expect(screen.queryByRole("tab", { name: "Move to" })).toBeNull()
  })

  it("shows the TCP's current pose, live, with Copy and Edit pose, Move to off, and nothing to reset", async () => {
    let pose: RobotControlPose = CURRENT_POSE
    setup({ getCurrentPose: () => pose })
    fireEvent.click(tab("Move to"))

    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
    pose = { position: [540, 0, 900], orientation: [-3.14, -0.04, 0.8] }
    await waitFor(() =>
      expect(coordinates()).toHaveValue("(540, 0, 900, -3.14, -0.04, 0.8)"),
    )
    expect(button("Copy")).toBeEnabled()
    expect(button("Edit pose")).toBeEnabled()
    // RobotPad's hint, as its button gives it without a target
    expect(moveButton()).toHaveTextContent("Move to")
    expect(moveButton()).toBeDisabled()
    expect(screen.getByLabelText("Click and hold to move")).toContainElement(
      moveButton(),
    )
    expect(queryButton("Reset pose to previous one")).toBeNull()
  })

  it("edits the shown pose on a click of the field or of Edit pose, and Escape or Cancel go back without a target", () => {
    const { onTargetChange } = setup()
    fireEvent.click(tab("Move to"))

    fireEvent.click(coordinates())
    expect(coordinates()).not.toHaveAttribute("readonly")
    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
    fireEvent.change(coordinates(), { target: { value: "(1, 2" } })
    fireEvent.keyDown(coordinates(), { key: "Escape" })
    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
    expect(coordinates()).toHaveAttribute("readonly")

    fireEvent.click(button("Edit pose"))
    fireEvent.click(button("Cancel"))
    expect(coordinates()).toHaveAttribute("readonly")
    expect(onTargetChange).not.toHaveBeenCalled()
  })

  it("says when the typed text is no pose, and cannot save it", () => {
    const { onTargetChange } = setup()
    fireEvent.click(tab("Move to"))

    fireEvent.click(button("Edit pose"))
    fireEvent.change(coordinates(), { target: { value: "(1, 2, 3)" } })
    expect(
      screen.getByText("Please enter valid pose coordinates."),
    ).toBeVisible()
    expect(button("Save pose edit")).toBeDisabled()
    fireEvent.keyDown(coordinates(), { key: "Enter" })
    expect(onTargetChange).not.toHaveBeenCalled()
  })

  it("makes a saved pose the target: the app plans it, and Reset and Move to show", () => {
    const { onTargetChange, rerender } = setup()
    fireEvent.click(tab("Move to"))

    fireEvent.click(button("Edit pose"))
    fireEvent.change(coordinates(), {
      target: { value: "(1, 2, 3, 0, 0, 0)" },
    })
    fireEvent.click(button("Save pose edit"))
    expect(onTargetChange).toHaveBeenLastCalledWith(TARGET)
    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")
    expect(coordinates()).toHaveAttribute("readonly")
    expect(button("Reset pose to previous one")).toBeEnabled()

    // While the app plans, Move to waits
    rerender({ state: "planning" })
    expect(moveButton()).toBeDisabled()
    rerender({ state: "planned" })
    expect(moveButton()).toBeEnabled()
    expect(screen.getByLabelText("Click and hold to move")).toContainElement(
      moveButton(),
    )
  })

  it("starts the move after 200 ms of holding, and a shorter click moves nothing", async () => {
    const { onMoveStart, onMoveStop } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")

    press(moveButton())
    await sleep(50)
    release(moveButton())
    await sleep(300)
    expect(onMoveStart).not.toHaveBeenCalled()
    expect(onMoveStop).not.toHaveBeenCalled()

    await holdUntilStarted(onMoveStart)
    expect(onMoveStart).toHaveBeenCalledWith(TARGET)
    release(moveButton())
    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("says Moving… while the robot moves and Stopping… while it stops, and keeps the target when let go on the way", async () => {
    let pose: RobotControlPose = CURRENT_POSE
    const { onMoveStart, onMoveStop, onTargetChange, rerender } = setup({
      getCurrentPose: () => pose,
      state: "planned",
    })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")

    await holdUntilStarted(onMoveStart)
    rerender({ state: "moving" })
    expect(moveButton()).toHaveTextContent("Moving…")
    pose = { position: [200, 2, 3], orientation: [0, 0, 0] }
    release(moveButton())
    expect(onMoveStop).toHaveBeenCalledTimes(1)
    rerender({ state: "stopping" })
    expect(moveButton()).toHaveTextContent("Stopping…")
    expect(moveButton()).toBeDisabled()

    rerender({ state: "planned" })
    await sleep(50)
    expect(moveButton()).toHaveTextContent("Move to")
    expect(moveButton()).toBeEnabled()
    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")
    expect(onTargetChange).toHaveBeenCalledTimes(1)
  })

  it("stays held at the target, then shows the live pose again on release", async () => {
    let pose: RobotControlPose = CURRENT_POSE
    const { onMoveStart, onMoveStop, onTargetChange, rerender } = setup({
      getCurrentPose: () => pose,
      state: "planned",
    })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")

    await holdUntilStarted(onMoveStart)
    rerender({ state: "moving" })
    pose = { position: [1, 2, 3.2], orientation: [0, 0, 0] }
    await waitFor(() => expect(moveButton()).toBeDisabled())
    expect(moveButton()).toHaveTextContent("Moving…")
    expect(
      screen.getByLabelText("Robot is already at this pose"),
    ).toContainElement(moveButton())
    // Held on: the move goes on, the target stays
    expect(onMoveStop).not.toHaveBeenCalled()
    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")

    release(moveButton())
    expect(onMoveStop).toHaveBeenCalledTimes(1)
    rerender({ state: "stopping" })
    rerender({ state: "planned" })
    await waitFor(() =>
      expect(coordinates()).toHaveValue("(1, 2, 3.2, 0, 0, 0)"),
    )
    expect(onTargetChange).toHaveBeenLastCalledWith(null)
    expect(moveButton()).toHaveTextContent("Move to")
    expect(moveButton()).toBeDisabled()
    expect(queryButton("Reset pose to previous one")).toBeNull()
  })

  it("cannot move to a pose the TCP is at already, and keeps it as the target", async () => {
    const { onMoveStart } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(539.94, 0, 895, -3.14, -0.04, 0.8)")

    await waitFor(() => expect(moveButton()).toBeDisabled())
    expect(
      screen.getByLabelText("Robot is already at this pose"),
    ).toContainElement(moveButton())
    press(moveButton())
    await sleep(300)
    expect(onMoveStart).not.toHaveBeenCalled()
    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
  })

  it("shows why the app cannot move there, with Move to off, until Reset shows the live pose again", () => {
    const { onTargetChange, rerender } = setup()
    fireEvent.click(tab("Move to"))
    confirmPose("(5000, 2, 3, 0, 0, 0)")

    rerender({ state: "idle", error: "The current pose is not reachable." })
    expect(screen.getByText("The current pose is not reachable.")).toBeVisible()
    expect(moveButton()).toBeDisabled()

    fireEvent.click(button("Reset pose to previous one"))
    expect(onTargetChange).toHaveBeenLastCalledWith(null)
    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
    expect(moveButton()).toBeDisabled()
    expect(queryButton("Reset pose to previous one")).toBeNull()
  })

  it("shows the live pose again when another tab is chosen, and stops a held move", async () => {
    const { onMoveStart, onMoveStop, onTargetChange } = setup({
      state: "planned",
    })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    await holdUntilStarted(onMoveStart)

    fireEvent.click(tab("Translate"))
    expect(onMoveStop).toHaveBeenCalledTimes(1)
    expect(onTargetChange).toHaveBeenLastCalledWith(null)

    fireEvent.click(tab("Move to"))
    expect(coordinates()).toHaveValue("(539.9, 0, 895, -3.14, -0.04, 0.8)")
  })

  it("cannot move to the saved target while another pose is being edited, as RobotPad", async () => {
    const { onMoveStart } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")

    fireEvent.click(button("Edit pose"))
    fireEvent.change(coordinates(), { target: { value: "(9, 9, 9, 0, 0, 0)" } })
    expect(moveButton()).toBeDisabled()
    expect(queryButton("Reset pose to previous one")).toBeNull()
    press(moveButton())
    await sleep(300)
    expect(onMoveStart).not.toHaveBeenCalled()

    // Cancelled, the saved target is the one to move to again
    fireEvent.keyDown(coordinates(), { key: "Escape" })
    expect(moveButton()).toBeEnabled()
  })

  it("stops a held move when editing starts", async () => {
    const { onMoveStart, onMoveStop } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    await holdUntilStarted(onMoveStart)

    fireEvent.click(button("Edit pose"))
    expect(onMoveStop).toHaveBeenCalledTimes(1)
  })

  it("shows the live pose again when the frame or the TCP changes: the target meant the old one", () => {
    const { onTargetChange, rerender } = setup(
      { frame: frame("world"), state: "planned" },
      { tcp: tcpSelect("flange") },
    )
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    // The app's other changes keep it
    rerender({ state: "planned", frame: frame("world") })
    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")

    rerender({ frame: frame("table") })
    expect(onTargetChange).toHaveBeenLastCalledWith(null)
    expect(coordinates()).toHaveValue(LIVE_TEXT)
    expect(queryButton("Reset pose to previous one")).toBeNull()

    confirmPose("(1, 2, 3, 0, 0, 0)")
    rerender({}, { tcp: tcpSelect("gripper") })
    expect(onTargetChange).toHaveBeenLastCalledWith(null)
    expect(coordinates()).toHaveValue(LIVE_TEXT)
  })

  it("stops a held move before it drops the target, on a new frame or another tab", async () => {
    const calls: string[] = []
    const { onMoveStart, rerender } = setup({
      state: "planned",
      frame: frame("world"),
      onTargetChange: (pose) => calls.push(pose ? "target" : "no target"),
      onMoveStop: () => calls.push("stop"),
    })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    await holdUntilStarted(onMoveStart)
    rerender({ frame: frame("table") })
    expect(calls).toEqual(["target", "stop", "no target"])

    confirmPose("(1, 2, 3, 0, 0, 0)")
    press(moveButton())
    await waitFor(() => expect(onMoveStart).toHaveBeenCalledTimes(2))
    fireEvent.click(tab("Translate"))
    expect(calls.slice(-2)).toEqual(["stop", "no target"])
  })

  it("copies the shown pose", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })
    setup()
    fireEvent.click(tab("Move to"))

    fireEvent.click(button("Copy"))
    expect(writeText).toHaveBeenCalledWith("(539.9, 0, 895, -3.14, -0.04, 0.8)")
    expect(await screen.findByText("Pose copied")).toBeVisible()
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
    setup(
      {
        frame: {
          options: [
            { id: "world", label: "World" },
            { id: "table", label: "Table" },
          ],
          value: "world",
          onChange: vi.fn(),
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

  it("edits and moves nothing while disabled", () => {
    setup({ state: "planned" }, { disabled: true })
    fireEvent.click(tab("Move to"))

    expect(button("Edit pose")).toBeDisabled()
    fireEvent.click(coordinates())
    expect(coordinates()).toHaveAttribute("readonly")
  })
})
