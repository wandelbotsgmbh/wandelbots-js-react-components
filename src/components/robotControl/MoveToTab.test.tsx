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

  // After a click on Edit pose the pointer rests on Save pose edit, whose
  // tooltip opens next to Cancel. A tooltip that takes the pointer stays
  // open under it and takes the click that was meant for Cancel. jsdom has
  // no layout: where the tooltips open is checked in a browser.
  it("lets a click through the tooltips of the pose's buttons, e.g. on Cancel right after Edit pose", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    })
    setup()
    fireEvent.click(tab("Move to"))

    fireEvent.click(button("Copy"))
    const copied = await screen.findByRole("tooltip")
    expect(copied).toHaveTextContent("Pose copied")
    expect(copied).toHaveStyle({ pointerEvents: "none" })

    fireEvent.click(button("Edit pose"))
    fireEvent.mouseOver(button("Save pose edit"))
    const save = await screen.findByRole("tooltip")
    expect(save).toHaveTextContent("Save pose edit")
    expect(save).toHaveStyle({ pointerEvents: "none" })
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

  it("offers to plan the target again while the app says why it cannot move there, without typing it again", () => {
    const { onTargetChange, rerender } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    // Planned and ready: there is nothing to plan again
    expect(queryButton("Plan the move again")).toBeNull()

    rerender({
      state: "idle",
      error: "The move to this pose failed: Collision detected",
    })
    expect(
      screen.getByText("The move to this pose failed: Collision detected"),
    ).toBeVisible()
    expect(moveButton()).toBeDisabled()

    fireEvent.click(button("Plan the move again"))
    expect(onTargetChange).toHaveBeenCalledTimes(2)
    expect(onTargetChange).toHaveBeenLastCalledWith(TARGET)
    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")

    // While the app plans it, there is no second request
    rerender({ state: "planning" })
    expect(button("Plan the move again")).toBeDisabled()

    // Not while another pose is typed: that one is saved instead
    rerender({ state: "idle" })
    fireEvent.click(button("Edit pose"))
    expect(queryButton("Plan the move again")).toBeNull()
  })

  // RobotPad: a saved pose gets selected and takes the trajectory. The tab
  // still shows its target, and its button moved nowhere, without a word.
  it("says when the app dropped the plan of the target it shows, and offers to plan it again", () => {
    const NOT_PLANNED = "The move to this target is no longer planned."
    const { onTargetChange, rerender } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    expect(coordinates()).toHaveAccessibleDescription("")
    expect(queryButton("Plan the move again")).toBeNull()

    rerender({ state: "idle" })
    expect(coordinates()).toHaveAccessibleDescription(NOT_PLANNED)
    expect(moveButton()).toBeDisabled()
    // The target stays, so it need not be typed again
    expect(coordinates()).toHaveValue("(1, 2, 3, 0, 0, 0)")

    fireEvent.click(button("Plan the move again"))
    expect(onTargetChange).toHaveBeenCalledTimes(2)
    expect(onTargetChange).toHaveBeenLastCalledWith(TARGET)
    // Said until the app plans it
    expect(coordinates()).toHaveAccessibleDescription(NOT_PLANNED)

    rerender({ state: "planning" })
    expect(coordinates()).toHaveAccessibleDescription("")
    rerender({ state: "planned" })
    expect(queryButton("Plan the move again")).toBeNull()
    expect(moveButton()).toBeEnabled()
  })

  it("does not call a target dropped that the app has not planned yet", () => {
    const { rerender } = setup({ state: "planned" })
    fireEvent.click(tab("Move to"))
    confirmPose("(1, 2, 3, 0, 0, 0)")
    rerender({ state: "idle" })
    expect(button("Plan the move again")).toBeEnabled()

    // Another target is saved, and the app has yet to say that it plans it
    confirmPose("(9, 9, 9, 0, 0, 0)")
    expect(coordinates()).toHaveAccessibleDescription("")
    expect(queryButton("Plan the move again")).toBeNull()
  })

  it("does not call a target dropped that the robot stands at: there is no move to plan", async () => {
    let pose: RobotControlPose = CURRENT_POSE
    const { rerender } = setup({
      getCurrentPose: () => pose,
      state: "planned",
    })
    fireEvent.click(tab("Move to"))
    confirmPose("(539.94, 0, 895, -3.14, -0.04, 0.8)")
    await waitFor(() => expect(moveButton()).toBeDisabled())

    rerender({ state: "idle" })
    expect(coordinates()).toHaveAccessibleDescription("")
    expect(queryButton("Plan the move again")).toBeNull()

    // Jogged away from it, the target is one to move to again
    pose = { position: [600, 0, 895], orientation: [-3.14, -0.04, 0.8] }
    expect(
      await screen.findByRole("button", { name: "Plan the move again" }),
    ).toBeEnabled()
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

    const field = screen.getByRole("textbox", { name: "Velocity" })
    expect(field).toHaveValue("125")
    expect(screen.getByText("mm/s")).toBeVisible()
    fireEvent.change(screen.getByRole("slider", { name: "Velocity" }), {
      target: { value: 200 },
    })
    expect(onVelocityChange).toHaveBeenLastCalledWith("translate", 200)
    fireEvent.change(field, { target: { value: "30" } })
    fireEvent.keyDown(field, { key: "Enter" })
    expect(onVelocityChange).toHaveBeenLastCalledWith("translate", 30)
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

describe("RobotControlPanel's Move to tab with joint values as the target", () => {
  const JOINTS = [0.1, -1.2, 1.3, 0, 1.5708, 0]
  const JOINT_TARGET = { joints: [0.1, -1.2, 1.3, 0, 1.5708, 0.5] }
  const JOINT_TEXT = "[0.1, -1.2, 1.3, 0, 1.5708, 0.5]"
  const INVALID = "Please enter valid pose coordinates."
  const jointPositions = (unit: string) =>
    screen.getByRole("textbox", { name: `Joint positions (${unit})` })
  const velocityField = () => screen.getByRole("textbox", { name: "Velocity" })

  /** The Joint tab of an app: 10 °/s, of 1 to 60 °/s */
  function jointsTab(
    overrides: Partial<RobotControlPanelProps["joints"]> = {},
  ) {
    const onVelocityChange = vi.fn()
    return {
      onVelocityChange,
      joints: {
        joints: JOINTS.map((value) => ({ value, min: -3, max: 3 })),
        velocity: {
          value: Math.PI / 18,
          min: Math.PI / 180,
          max: Math.PI / 3,
        },
        onVelocityChange,
        onJogStart: vi.fn(),
        onJogStop: vi.fn(),
        ...overrides,
      },
    }
  }

  it("takes joint values in square brackets as the target, and moves to them while the button is held", async () => {
    const { onTargetChange, onMoveStart, rerender } = setup({
      getCurrentJoints: () => JOINTS,
    })
    fireEvent.click(tab("Move to"))
    // The field shows the TCP's pose, as without joints
    expect(coordinates()).toHaveValue(LIVE_TEXT)

    confirmPose(" [0.1, -1.2, 1.3, 0, 1.5708, 0.50001] ")
    expect(onTargetChange).toHaveBeenLastCalledWith({
      joints: [0.1, -1.2, 1.3, 0, 1.5708, 0.50001],
    })
    // As the copy of joint values: to 0.0001
    expect(coordinates()).toHaveValue(JOINT_TEXT)
    expect(coordinates()).toHaveAttribute("readonly")
    expect(button("Reset pose to previous one")).toBeEnabled()

    rerender({ state: "planned" })
    await holdUntilStarted(onMoveStart)
    expect(onMoveStart).toHaveBeenCalledWith({
      joints: [0.1, -1.2, 1.3, 0, 1.5708, 0.50001],
    })
  })

  it("still reads a pose in parentheses, and numbers without brackets, as a pose of the TCP", () => {
    const { onTargetChange } = setup({ getCurrentJoints: () => JOINTS })
    fireEvent.click(tab("Move to"))

    confirmPose("(1, 2, 3, 0, 0, 0)")
    expect(onTargetChange).toHaveBeenLastCalledWith(TARGET)
    confirmPose("1, 2, 3, 0, 0, 0")
    expect(onTargetChange).toHaveBeenCalledTimes(2)
    expect(onTargetChange).toHaveBeenLastCalledWith(TARGET)
  })

  it("says that joint values for another number of joints are no target, and cannot save them", () => {
    const { onTargetChange } = setup({ getCurrentJoints: () => JOINTS })
    fireEvent.click(tab("Move to"))

    fireEvent.click(button("Edit pose"))
    fireEvent.change(coordinates(), { target: { value: "[0.1, -1.2, 1.3]" } })
    expect(coordinates()).toHaveAccessibleDescription(INVALID)
    expect(button("Save pose edit")).toBeDisabled()
    fireEvent.keyDown(coordinates(), { key: "Enter" })
    expect(onTargetChange).not.toHaveBeenCalled()

    fireEvent.change(coordinates(), { target: { value: JOINT_TEXT } })
    expect(coordinates()).toHaveAttribute("aria-invalid", "false")
    expect(button("Save pose edit")).toBeEnabled()
  })

  it("takes no joint values from an app that gives no joints", () => {
    const { onTargetChange } = setup()
    fireEvent.click(tab("Move to"))

    confirmPose(JOINT_TEXT)
    expect(coordinates()).toHaveAccessibleDescription(INVALID)
    expect(onTargetChange).not.toHaveBeenCalled()
  })

  it("cannot move to joint values the robot stands at, and shows the live pose again after a move that got there", async () => {
    let joints = JOINTS
    const { onMoveStart, onTargetChange, rerender } = setup({
      getCurrentJoints: () => joints,
      state: "planned",
    })
    fireEvent.click(tab("Move to"))
    // Where the robot stands, within a thousandth
    confirmPose("[0.1005, -1.2, 1.3, 0, 1.5708, 0]")
    await waitFor(() => expect(moveButton()).toBeDisabled())
    expect(
      screen.getByLabelText("Robot is already at this pose"),
    ).toContainElement(moveButton())

    confirmPose(JOINT_TEXT)
    await waitFor(() => expect(moveButton()).toBeEnabled())
    await holdUntilStarted(onMoveStart)
    rerender({ state: "moving" })
    joints = [0.1, -1.2, 1.3, 0, 1.5708, 0.4995]
    await waitFor(() => expect(moveButton()).toBeDisabled())

    release(moveButton())
    rerender({ state: "planned" })
    await waitFor(() => expect(coordinates()).toHaveValue(LIVE_TEXT))
    expect(onTargetChange).toHaveBeenLastCalledWith(null)
  })

  it("shows the velocity that the move to its target has: of the Joint tab for joint values, of Translate for a pose", () => {
    const { joints, onVelocityChange: onJointVelocityChange } = jointsTab()
    const { onVelocityChange } = setup(
      { getCurrentJoints: () => JOINTS },
      { joints },
    )
    fireEvent.click(tab("Move to"))
    expect(velocityField()).toHaveValue("125")
    expect(screen.getByText("mm/s")).toBeVisible()

    confirmPose(JOINT_TEXT)
    expect(velocityField()).toHaveValue("10")
    expect(screen.getByText("°/s")).toBeVisible()
    fireEvent.change(velocityField(), { target: { value: "45" } })
    fireEvent.keyDown(velocityField(), { key: "Enter" })
    expect(onJointVelocityChange).toHaveBeenLastCalledWith(
      expect.closeTo(Math.PI / 4, 10),
    )
    expect(onVelocityChange).not.toHaveBeenCalled()

    confirmPose("(1, 2, 3, 0, 0, 0)")
    expect(velocityField()).toHaveValue("125")
    fireEvent.change(velocityField(), { target: { value: "30" } })
    fireEvent.keyDown(velocityField(), { key: "Enter" })
    expect(onVelocityChange).toHaveBeenLastCalledWith("translate", 30)
  })

  it("moves to joint values with the rotation velocity when the app has no Joint tab", () => {
    const { onVelocityChange } = setup({ getCurrentJoints: () => JOINTS })
    fireEvent.click(tab("Move to"))

    confirmPose(JOINT_TEXT)
    // 0.1 rad/s
    expect(velocityField()).toHaveValue("5.73")
    fireEvent.change(velocityField(), { target: { value: "45" } })
    fireEvent.keyDown(velocityField(), { key: "Enter" })
    expect(onVelocityChange).toHaveBeenLastCalledWith(
      "rotate",
      expect.closeTo(Math.PI / 4, 10),
    )
  })

  describe("of a robot that takes no TCP poses", () => {
    it("shows the joints, live, and takes joint values with or without brackets, but no pose", async () => {
      let joints = JOINTS
      const { onTargetChange } = setup(
        { getCurrentPose: () => null, getCurrentJoints: () => joints },
        { cartesian: false, ...jointsTab() },
      )
      fireEvent.click(tab("Move to"))

      const field = () => jointPositions("rad")
      expect(field()).toHaveValue("[0.1, -1.2, 1.3, 0, 1.5708, 0]")
      joints = [0.2, -1.2, 1.3, 0, 1.5708, 0]
      await waitFor(() =>
        expect(field()).toHaveValue("[0.2, -1.2, 1.3, 0, 1.5708, 0]"),
      )
      // The velocity of the Joint tab from the start
      expect(velocityField()).toHaveValue("10")

      fireEvent.click(button("Edit pose"))
      fireEvent.change(field(), { target: { value: "(1, 2, 3, 0, 0, 0)" } })
      expect(field()).toHaveAccessibleDescription(INVALID)
      expect(button("Save pose edit")).toBeDisabled()

      fireEvent.change(field(), {
        target: { value: "0.1, -1.2, 1.3, 0, 1.5708, 0.5" },
      })
      fireEvent.keyDown(field(), { key: "Enter" })
      expect(onTargetChange).toHaveBeenLastCalledWith(JOINT_TARGET)
      expect(field()).toHaveValue(JOINT_TEXT)
    })

    it("shows a linear axis in mm, and its velocity in mm/s", () => {
      const { joints, onVelocityChange } = jointsTab({
        joints: [{ value: 250, min: 0, max: 1000 }],
        linear: true,
        velocity: { value: 100, min: 1, max: 250 },
      })
      const { onTargetChange } = setup(
        { getCurrentPose: () => null, getCurrentJoints: () => [250] },
        { cartesian: false, joints },
      )
      fireEvent.click(tab("Move to"))

      expect(jointPositions("mm")).toHaveValue("[250]")
      expect(velocityField()).toHaveValue("100")
      expect(screen.getByText("mm/s")).toBeVisible()
      fireEvent.change(velocityField(), { target: { value: "30" } })
      fireEvent.keyDown(velocityField(), { key: "Enter" })
      expect(onVelocityChange).toHaveBeenLastCalledWith(30)

      fireEvent.click(button("Edit pose"))
      fireEvent.change(jointPositions("mm"), { target: { value: "400.5" } })
      fireEvent.keyDown(jointPositions("mm"), { key: "Enter" })
      expect(onTargetChange).toHaveBeenLastCalledWith({ joints: [400.5] })
    })
  })
})
