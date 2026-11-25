import { ThemeProvider } from "@mui/material/styles"
import { act, render, screen } from "@testing-library/react"
import { createNovaMuiTheme } from "@wandelbots/mui"
import { describe, expect, it, onTestFinished } from "vitest"
import {
  controllerState,
  makeHarness,
} from "../lib/robotSession/__fixtures__/robotSessionHarness"
import { SafetyBar, type SafetyBarProps } from "./SafetyBar"

// What a test of an app holds on to: the compact bar shows three icons, and
// the text of an icon only in a popover while the mouse is over it

const theme = createNovaMuiTheme()

function setup(props: Partial<SafetyBarProps> = {}) {
  const bar = (p: Partial<SafetyBarProps>) => (
    <ThemeProvider theme={theme}>
      <SafetyBar
        isVirtual
        motionGroupId="0@ur5e"
        operationMode="OPERATION_MODE_AUTO"
        safetyState="SAFETY_STATE_NORMAL"
        {...props}
        {...p}
      />
    </ThemeProvider>
  )
  const view = render(bar({}))
  return { rerender: (p: Partial<SafetyBarProps>) => view.rerender(bar(p)) }
}

const safetyState = () => screen.getByTestId("safety-state-indicator")
const operationMode = () => screen.getByTestId("operation-mode-indicator")
const controllerType = () => screen.getByTestId("controller-type-indicator")

describe("SafetyBar", () => {
  it("names its three indicators, which show only icons", () => {
    setup()

    expect(safetyState()).toHaveAccessibleName("Safety state: Safe")
    expect(operationMode()).toHaveAccessibleName("Operation mode: Automatic")
    expect(controllerType()).toHaveAccessibleName("Controller type: Virtual")
    // An image to a screen reader: found by its name as well
    expect(
      screen.getByRole("img", { name: "Safety state: Safe" }),
    ).toBeVisible()
  })

  it("keeps the indicators' test ids while their state changes, and names the state", () => {
    const { rerender } = setup()

    rerender({ safetyState: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" })
    expect(safetyState()).toHaveAccessibleName("Safety state: E-Stop")
    rerender({ safetyState: "SAFETY_STATE_ROBOT_EMERGENCY_STOP" })
    expect(safetyState()).toHaveAccessibleName("Safety state: E-Stop")
    rerender({ safetyState: "SAFETY_STATE_PROTECTIVE_STOP" })
    expect(safetyState()).toHaveAccessibleName("Safety state: Stop")
    rerender({ safetyState: "SAFETY_STATE_REDUCED" })
    expect(safetyState()).toHaveAccessibleName("Safety state: Action required")
    rerender({ safetyState: "SAFETY_STATE_FAULT" })
    expect(safetyState()).toHaveAccessibleName("Safety state: Error")

    rerender({ operationMode: "OPERATION_MODE_MANUAL_T1" })
    expect(operationMode()).toHaveAccessibleName("Operation mode: Manual")
    rerender({ operationMode: "OPERATION_MODE_NO_CONTROLLER" })
    expect(operationMode()).toHaveAccessibleName("Operation mode: Error")

    rerender({ isVirtual: false })
    expect(controllerType()).toHaveAccessibleName("Controller type: Physical")
  })

  it("names them the same when it also shows their texts", () => {
    setup({ compact: false })

    expect(safetyState()).toHaveAccessibleName("Safety state: Safe")
    expect(safetyState()).toHaveTextContent("Safe")
  })
})

// A real session on a fake NOVA: the bar reads the robot itself, so an app
// that builds its own header cannot forget to follow it
describe("SafetyBar for a robot session", () => {
  it("shows the robot's safety state, and an emergency stop as soon as NOVA reports it", async () => {
    const { load, source } = makeHarness()
    const session = await load().ready
    onTestFinished(() => session.dispose())
    render(
      <ThemeProvider theme={theme}>
        <SafetyBar session={session} />
      </ThemeProvider>,
    )

    expect(safetyState()).toHaveAccessibleName("Safety state: Safe")
    expect(operationMode()).toHaveAccessibleName("Operation mode: Automatic")
    expect(controllerType()).toHaveAccessibleName("Controller type: Virtual")

    source.send(
      controllerState({ safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" }),
    )
    await act(async () => {
      for (let i = 0; i < 20; i++) await Promise.resolve()
    })

    expect(safetyState()).toHaveAccessibleName("Safety state: E-Stop")
  })

  // E.g. in a header while no robot is loaded
  it("shows nothing without a robot", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <SafetyBar session={undefined} />
      </ThemeProvider>,
    )
    expect(container).toBeEmptyDOMElement()
  })
})
