import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, onTestFinished } from "vitest"
import {
  controllerState,
  makeHarness,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import { ActivationSwitch } from "./ActivationSwitch"

// The switch on its own, for an app that builds its own header: a real
// session on a fake NOVA (RobotHeader.test.tsx has the switch in the header)

/** Lets queued promise callbacks run, and React draw what they changed */
const flush = () =>
  act(async () => {
    for (let i = 0; i < 20; i++) await Promise.resolve()
  })

describe("ActivationSwitch for a robot session", () => {
  it("switches the robot's controller, and is off while NOVA would refuse it", async () => {
    const { load, api, source } = makeHarness()
    const session = await load().ready
    onTestFinished(() => session.dispose())
    render(<ActivationSwitch session={session} />)

    const activation = screen.getByRole("switch", { name: "Activate" })
    fireEvent.click(activation)
    await flush()
    expect(api.controller.setDefaultMode).toHaveBeenCalledWith(
      "cell",
      "ur5e",
      "ROBOT_SYSTEM_MODE_CONTROL",
    )

    source.send(
      controllerState({ safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" }),
    )
    await flush()
    expect(screen.getByRole("switch")).toBeDisabled()
  })

  // E.g. in a header while no robot is loaded
  it("shows nothing without a robot", () => {
    const { container } = render(<ActivationSwitch session={null} />)
    expect(container).toBeEmptyDOMElement()
  })
})
