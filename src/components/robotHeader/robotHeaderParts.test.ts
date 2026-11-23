import { describe, expect, it, onTestFinished, vi } from "vitest"
import {
  controllerState,
  makeHarness,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import type { LoadRobotSessionOptions } from "../../lib/robotSession/loadRobotSession"
import { robotActivationOf } from "./robotActivationOf"
import { robotSafetyOf } from "./robotSafetyOf"

// The parts of RobotHeader (and SafetyBar) that are the robot's, as RobotPad
// wires them: a real session on a fake NOVA

async function loadSession(options: LoadRobotSessionOptions = {}) {
  const harness = makeHarness()
  const session = await harness.load(options).ready
  onTestFinished(() => session.dispose())
  return { session, ...harness }
}

/** Lets queued promise callbacks run */
async function flush() {
  for (let i = 0; i < 20; i++) await Promise.resolve()
}

describe("robotSafetyOf", () => {
  it("gives the controller's safety state and operation mode as NOVA reports them", async () => {
    const { session, source } = await loadSession()

    expect(robotSafetyOf(session)).toEqual({
      isVirtual: true,
      motionGroupId: "0@ur5e",
      operationMode: "OPERATION_MODE_AUTO",
      safetyState: "SAFETY_STATE_NORMAL",
    })

    source.send(
      controllerState({ safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" }),
    )
    await flush()
    expect(robotSafetyOf(session).safetyState).toBe(
      "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    )
  })
})

describe("robotActivationOf", () => {
  it("switches the controller to control mode", async () => {
    const { session, api } = await loadSession()

    const activation = robotActivationOf(session)
    expect(activation.state).toBe("inactive")
    expect(activation.disabled).toBe(false)

    activation.onToggle()
    await flush()

    expect(api.controller.setDefaultMode).toHaveBeenCalledWith(
      "cell",
      "ur5e",
      "ROBOT_SYSTEM_MODE_CONTROL",
    )
  })

  it("cannot be switched while NOVA would refuse it, e.g. at an emergency stop", async () => {
    const { session, source } = await loadSession()

    source.send(
      controllerState({ safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP" }),
    )
    await flush()

    expect(robotActivationOf(session).disabled).toBe(true)
  })

  // A switch has nobody to reject to: an unhandled rejection would show as
  // a crash, so the refusal goes to the app's onError
  it("reports a refused mode change to the session's onError", async () => {
    const onError = vi.fn()
    const { session, api } = await loadSession({ onError })
    api.controller.setDefaultMode.mockRejectedValue(
      new Error("Mode change refused"),
    )

    robotActivationOf(session).onToggle()
    await flush()

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: "mode",
        url: expect.stringContaining("/controllers/ur5e"),
      }),
    )
  })
})
