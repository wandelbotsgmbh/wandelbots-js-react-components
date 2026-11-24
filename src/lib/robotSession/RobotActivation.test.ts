import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  controllerState,
  makeHarness,
} from "./__fixtures__/robotSessionHarness"
import { MODE_CHANGE_TIMEOUT_MS, RobotModeChangeError } from "./RobotActivation"

// The activation of a real session on a fake NOVA, with the clock in the
// test's hands: the live state "stops" when the test sends nothing

let harness: ReturnType<typeof makeHarness>
/** What the controller reports now, sent again by `pass` */
let reported: Parameters<typeof controllerState>[0]

beforeEach(() => {
  vi.useFakeTimers()
  harness = makeHarness()
  reported = {}
})

afterEach(() => {
  vi.useRealTimers()
})

async function loadSession() {
  const session = await harness.load().ready
  return session
}

/** The controller reports a state */
function report(state: Parameters<typeof controllerState>[0]) {
  reported = state
  harness.source.send(controllerState(state))
}

/** Time passes while the live state keeps coming, a message every 500 ms */
async function pass(ms: number) {
  for (let passed = 0; passed < ms; passed += 500) {
    await vi.advanceTimersByTimeAsync(500)
    harness.source.send(controllerState(reported))
  }
}

/** Time passes without a message of the live state: laptop sleep, wifi */
async function silence(ms: number) {
  await vi.advanceTimersByTimeAsync(ms)
}

describe("RobotActivation", () => {
  it("shows what the controller reports again once its live state is back, also with the mode unchanged", async () => {
    const session = await loadSession()
    report({ mode: "MODE_CONTROL" })
    expect(session.activation.state).toBe("active")

    // No message for longer than a virtual robot's 6 s: the mode cannot be
    // confirmed
    await silence(7000)
    expect(session.state.connectionQuality).toBe("critical")
    expect(session.activation.state).toBe("inactive")

    // The messages come back, with the controller still in control mode
    await pass(1000)
    expect(session.state.connectionQuality).toBe("good")
    expect(session.activation.state).toBe("active")
    expect(session.safety.canBeMoved).toBe(true)
    session.dispose()
  })

  it("shows a mode that changed while the live state was away", async () => {
    const session = await loadSession()
    report({ mode: "MODE_CONTROL" })
    await silence(7000)
    expect(session.activation.state).toBe("inactive")

    reported = { mode: "MODE_MONITOR" }
    await pass(1000)

    expect(session.activation.state).toBe("inactive")
    expect(session.safety.notMoveableReason).toEqual({ code: "deactivated" })
    session.dispose()
  })

  it("ends an activation that the controller never confirms, so it can be asked for again", async () => {
    const session = await loadSession()

    await session.activation.activate()
    expect(session.activation.state).toBe("activating")
    // Meanwhile a toggle asks NOVA for nothing
    await session.activation.toggle()
    expect(harness.api.controller.setDefaultMode).toHaveBeenCalledTimes(1)

    // NOVA accepted the request, the controller stays in monitor mode (e.g.
    // in manual mode, without the confirmation at its panel)
    await pass(MODE_CHANGE_TIMEOUT_MS - 1000)
    expect(session.activation.state).toBe("activating")
    await pass(1500)
    expect(session.activation.state).toBe("inactive")

    await session.activation.toggle()
    expect(harness.api.controller.setDefaultMode).toHaveBeenCalledTimes(2)
    expect(session.activation.state).toBe("activating")
    session.dispose()
  })

  it("ends a deactivation that the controller never confirms: the robot shows as activated, as its controller reports", async () => {
    const session = await loadSession()
    report({ mode: "MODE_CONTROL" })

    await session.activation.deactivate()
    expect(session.activation.state).toBe("deactivating")

    await pass(MODE_CHANGE_TIMEOUT_MS + 500)
    expect(session.activation.state).toBe("active")

    await session.activation.toggle()
    expect(harness.api.controller.setDefaultMode).toHaveBeenCalledTimes(2)
    expect(session.activation.state).toBe("deactivating")
    session.dispose()
  })

  it("follows the controller when it confirms after the wait is over", async () => {
    const session = await loadSession()
    await session.activation.activate()
    await pass(MODE_CHANGE_TIMEOUT_MS + 500)
    expect(session.activation.state).toBe("inactive")

    report({ mode: "MODE_CONTROL" })

    expect(session.activation.state).toBe("active")
    session.dispose()
  })

  it("shows an activation only until the controller confirms it: a controller that leaves control mode later is inactive", async () => {
    const session = await loadSession()
    await session.activation.activate()
    report({ mode: "MODE_CONTROL" })
    expect(session.activation.state).toBe("active")

    report({ mode: "MODE_MONITOR" })
    expect(session.activation.state).toBe("inactive")

    // The wait of the activation is over with its confirmation
    report({ mode: "MODE_CONTROL" })
    await session.activation.deactivate()
    await pass(MODE_CHANGE_TIMEOUT_MS - 1000)
    expect(session.activation.state).toBe("deactivating")
    session.dispose()
  })

  it("does not take the mode it knew before the live state stopped for a confirmation", async () => {
    const session = await loadSession()
    report({ mode: "MODE_CONTROL" })
    await silence(7000)
    expect(session.activation.state).toBe("inactive")

    // Asked while nothing is heard of the controller, whose last known mode
    // is control mode
    await session.activation.activate()

    expect(session.activation.state).toBe("activating")
    expect(session.safety.canBeMoved).toBe(false)
    session.dispose()
  })

  it("keeps showing a second activation when the request of the first one fails late", async () => {
    const session = await loadSession()
    // NOVA does not answer the first request
    let failFirst: (error: Error) => void = () => {}
    harness.api.controller.setDefaultMode.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          failFirst = reject
        }),
    )
    const first = session.activation.activate().catch((e: unknown) => e)
    await pass(MODE_CHANGE_TIMEOUT_MS + 500)
    expect(session.activation.state).toBe("inactive")

    await session.activation.activate()
    expect(session.activation.state).toBe("activating")
    failFirst(new Error("timeout"))

    expect(await first).toBeInstanceOf(RobotModeChangeError)
    expect(session.activation.state).toBe("activating")
    session.dispose()
  })

  it("is inactive again at once when NOVA refuses the activation", async () => {
    harness.api.controller.setDefaultMode.mockRejectedValue(
      new Error("refused"),
    )
    const session = await loadSession()
    const idleTimers = vi.getTimerCount()

    await session.activation.activate().catch(() => {})

    expect(session.activation.state).toBe("inactive")
    // The wait for the confirmation is over as well
    expect(vi.getTimerCount()).toBe(idleTimers)
    session.dispose()
  })

  it("leaves no timer behind when the session is disposed during a mode change", async () => {
    // What a session without a mode change leaves, e.g. its websockets
    const idle = await loadSession()
    idle.dispose()
    const timersOfAnIdleSession = vi.getTimerCount()
    vi.clearAllTimers()

    const session = await loadSession()
    await session.activation.activate()
    session.dispose()

    expect(vi.getTimerCount()).toBe(timersOfAnIdleSession)
  })

  // A header can still show a session that its app has disposed, e.g.
  // while it switches to another robot
  it("asks NOVA for no mode change once the session is disposed", async () => {
    const session = await loadSession()
    expect(session.activation.state).toBe("inactive")

    session.dispose()
    await session.activation.activate()
    await session.activation.toggle()

    expect(harness.api.controller.setDefaultMode).not.toHaveBeenCalled()
  })

  // Whatever the live state still says
  it("asks NOVA for no mode change once it is disposed itself", async () => {
    const session = await loadSession()
    report({ mode: "MODE_CONTROL" })
    expect(session.activation.state).toBe("active")

    session.activation.dispose()
    await session.activation.deactivate()
    await session.activation.toggle()
    report({ mode: "MODE_MONITOR" })
    await session.activation.activate()

    expect(harness.api.controller.setDefaultMode).not.toHaveBeenCalled()
    session.dispose()
  })
})
