import { ThemeProvider } from "@mui/material/styles"
import { act, fireEvent, render, screen, within } from "@testing-library/react"
import { createNovaMuiTheme } from "@wandelbots/mui"
import type { ReactNode } from "react"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import {
  controllerState,
  makeHarness,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import type { LoadRobotSessionOptions } from "../../lib/robotSession/loadRobotSession"
import { RobotSessionProvider } from "../robotSession/RobotSessionProvider"
import { RobotHeader, type RobotHeaderProps } from "./RobotHeader"

function setup(props: Partial<RobotHeaderProps> = {}) {
  const onMotionGroupChange = vi.fn()
  const all = (p: Partial<RobotHeaderProps>): RobotHeaderProps => ({
    appName: "Robot Pad",
    motionGroup: {
      options: [
        { id: "0@ur5e", label: "0@ur5e" },
        { id: "1@robotarm", label: "1@Robotarm" },
      ],
      value: "1@robotarm",
      onChange: onMotionGroupChange,
    },
    ...p,
  })
  const view = render(<RobotHeader {...all(props)} />)
  const rerender = (p: Partial<RobotHeaderProps>) =>
    view.rerender(<RobotHeader {...all({ ...props, ...p })} />)
  return { onMotionGroupChange, rerender }
}

const activation = () =>
  screen.getByRole("switch", { name: /Activat|Deactivat/ })

describe("RobotHeader", () => {
  it("shows the app's name and the selected motion group", () => {
    setup()

    expect(screen.getByRole("heading", { name: "Robot Pad" })).toBeVisible()
    expect(
      screen.getByRole("combobox", { name: "Motion group" }),
    ).toHaveTextContent("1@Robotarm")
  })

  it("lets the app change the motion group", () => {
    const { onMotionGroupChange } = setup()

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Motion group" }))
    fireEvent.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: "0@ur5e",
      }),
    )
    expect(onMotionGroupChange).toHaveBeenCalledWith("0@ur5e")
  })

  it("switches to an app of the app menu", () => {
    const onClick = vi.fn()
    const onAppSelect = vi.fn()
    setup({
      apps: [
        { id: "home", name: "Homescreen", icon: null, onClick },
        { id: "settings", name: "Settings", icon: null },
      ],
      onAppSelect,
    })

    fireEvent.click(screen.getByRole("button", { name: "Apps" }))
    fireEvent.click(screen.getByRole("menuitem", { name: "Homescreen" }))
    expect(onClick).toHaveBeenCalled()
    expect(onAppSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "home" }),
    )
    expect(screen.queryByRole("menu")).toBeNull()
  })

  it("has a search button only when the app can search", () => {
    const onSearch = vi.fn()
    const { rerender } = setup()
    expect(screen.queryByRole("button", { name: "Search" })).toBeNull()

    rerender({ onSearch })
    fireEvent.click(screen.getByRole("button", { name: "Search" }))
    expect(onSearch).toHaveBeenCalled()
  })

  it("shows the activation of the robot as RobotPad does", () => {
    const onToggle = vi.fn()
    const { rerender } = setup({ activation: { state: "inactive", onToggle } })
    expect(screen.getByText("Activate")).toBeVisible()
    expect(activation()).not.toBeChecked()

    fireEvent.click(activation())
    expect(onToggle).toHaveBeenCalledTimes(1)

    // While it changes, the switch waits
    rerender({ activation: { state: "activating", onToggle } })
    expect(screen.getByText("Activating")).toBeVisible()
    expect(activation()).toBeDisabled()

    rerender({ activation: { state: "active", onToggle } })
    expect(screen.getByText("Activated")).toBeVisible()
    expect(activation()).toBeChecked()
    expect(activation()).toBeEnabled()

    rerender({ activation: { state: "deactivating", onToggle } })
    expect(screen.getByText("Deactivating")).toBeVisible()
    expect(activation()).toBeChecked()
    expect(activation()).toBeDisabled()
  })

  it("keeps the switch off while the robot cannot be activated", () => {
    setup({
      activation: { state: "inactive", disabled: true, onToggle: vi.fn() },
    })

    expect(activation()).toBeDisabled()
  })

  it("shows the app's own buttons at the right", () => {
    setup({ actions: <button type="button">Add robot</button> })

    expect(screen.getByRole("button", { name: "Add robot" })).toBeVisible()
  })
})

// A real session on a fake NOVA: the header reads the robot itself, so an
// app cannot forget to follow it (e.g. miss an emergency stop)
describe("RobotHeader for a robot session", () => {
  async function loadSession(options: LoadRobotSessionOptions = {}) {
    const harness = makeHarness()
    const session = await harness.load(options).ready
    onTestFinished(() => session.dispose())
    return { session, ...harness }
  }

  // The safety bar draws in the NOVA theme's colors, as in an app
  const theme = createNovaMuiTheme()
  const inApp = (ui: ReactNode) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

  /** Lets queued promise callbacks run, and React draw what they changed */
  const flush = () =>
    act(async () => {
      for (let i = 0; i < 20; i++) await Promise.resolve()
    })

  const safetyState = (name: string) =>
    screen.queryByRole("img", { name: `Safety state: ${name}` })

  it("shows the robot's safety state, and an emergency stop as soon as NOVA reports it", async () => {
    const { session, source } = await loadSession()
    inApp(<RobotHeader appName="Robot Pad" session={session} />)

    expect(safetyState("Safe")).toBeVisible()

    source.send(
      controllerState({ safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" }),
    )
    await flush()

    expect(safetyState("E-Stop")).toBeVisible()
  })

  it("switches the robot's controller to control mode", async () => {
    const { session, api } = await loadSession()
    inApp(<RobotHeader appName="Robot Pad" session={session} />)

    expect(activation()).not.toBeChecked()
    fireEvent.click(activation())
    await flush()

    expect(api.controller.setDefaultMode).toHaveBeenCalledWith(
      "cell",
      "ur5e",
      "ROBOT_SYSTEM_MODE_CONTROL",
    )
  })

  it("keeps the switch off while NOVA would refuse it, e.g. at an emergency stop", async () => {
    const { session, source } = await loadSession()
    inApp(<RobotHeader appName="Robot Pad" session={session} />)
    expect(activation()).toBeEnabled()

    source.send(
      controllerState({ safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" }),
    )
    await flush()

    expect(activation()).toBeDisabled()
  })

  // A switch has nobody to reject to: an unhandled rejection would show as
  // a crash, so the refusal goes to the app's onError
  it("reports a refused mode change to the session's onError", async () => {
    const onError = vi.fn()
    const { session, api } = await loadSession({ onError })
    api.controller.setDefaultMode.mockRejectedValue(
      new Error("Mode change refused"),
    )
    inApp(<RobotHeader appName="Robot Pad" session={session} />)

    fireEvent.click(activation())
    await flush()

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "mode",
        url: expect.stringContaining("/controllers/ur5e"),
      }),
    )
  })

  it("takes the robot of the nearest RobotSessionProvider", async () => {
    const { session } = await loadSession()
    inApp(
      <RobotSessionProvider session={session}>
        <RobotHeader appName="Robot Pad" />
      </RobotSessionProvider>,
    )

    expect(safetyState("Safe")).toBeVisible()
    expect(activation()).toBeEnabled()
  })

  // The header shows before a robot is loaded: the app's name and menu. An
  // app's store may hold no robot as null, e.g. RobotPad's
  it("shows neither safety state nor switch without a robot", () => {
    inApp(<RobotHeader appName="Robot Pad" session={null} />)

    expect(screen.getByRole("heading", { name: "Robot Pad" })).toBeVisible()
    expect(screen.queryByTestId("safety-state-indicator")).toBeNull()
    expect(screen.queryByRole("switch")).toBeNull()
  })

  it("lets the app's own activation replace the robot's", async () => {
    const { session } = await loadSession()
    const onToggle = vi.fn()
    inApp(
      <RobotHeader
        appName="Robot Pad"
        session={session}
        activation={{ state: "inactive", disabled: true, onToggle }}
      />,
    )

    expect(activation()).toBeDisabled()
  })
})
