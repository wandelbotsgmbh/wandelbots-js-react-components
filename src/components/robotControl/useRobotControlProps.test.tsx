import { act, renderHook } from "@testing-library/react"
import { degreesToRadians } from "@wandelbots/nova-js"
import { observable, runInAction } from "mobx"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import {
  controllerState,
  fakeExecution,
  makeHarness,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import type { LoadRobotSessionOptions } from "../../lib/robotSession/loadRobotSession"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { RobotControlPose } from "./RobotControlPanel"
import { useRobotControlProps } from "./useRobotControlProps"

// RobotPad's wiring of the Robot control panel to its stores, as the
// library's connected component has it: a real session on a fake NOVA

/**
 * The session of a robot that may move: activated, as its controller
 * reports. A robot that is not is jogged by nothing.
 */
async function loadSession(options: LoadRobotSessionOptions = {}) {
  const harness = makeHarness()
  const session = await harness.load(options).ready
  onTestFinished(() => session.dispose())
  harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
  expect(session.safety.canBeMoved).toBe(true)
  return session
}

/** Lets queued promise callbacks run */
async function flush() {
  for (let i = 0; i < 20; i++) await Promise.resolve()
}

/** A promise that the test settles */
function deferred() {
  let resolve!: () => void
  const promise = new Promise<void>((r) => {
    resolve = r
  })
  return { promise, resolve }
}

/**
 * The session with a trajectory and a target pose that the test drives by
 * hand: their MobX actions cannot be spied on
 */
function withFakeMoveTo(session: RobotSession) {
  const hold = vi.fn(() => true)
  const release = vi.fn(async () => {})
  const trajectory = observable({
    trajectoryState: "idle" as string,
    plannedTrajectory: null as unknown,
    hold,
    release,
  })
  const setDraft = vi.fn()
  const confirmEdit = vi.fn(async () => {})
  const resetToLive = vi.fn(async () => {})
  const targetPose = observable({
    confirming: false,
    staged: null as { errorKey: string | null } | null,
    setDraft,
    confirmEdit,
    resetToLive,
  })
  const robot = Object.assign(Object.create(session), {
    trajectory,
    targetPose,
  }) as RobotSession
  return {
    robot,
    trajectory,
    targetPose,
    hold,
    release,
    setDraft,
    confirmEdit,
    resetToLive,
  }
}

const TARGET: RobotControlPose = { position: [1, 2, 3], orientation: [0, 0, 0] }

/**
 * The Move to of an activated robot, with the session's own trajectory and
 * typed pose on a faked planner and execution websocket: the test types a
 * pose, holds the button and plays NOVA's answers
 */
async function loadMoveTo() {
  const harness = makeHarness()
  const onError = vi.fn()
  const session = await harness.load({ onError }).ready
  onTestFinished(() => session.dispose())
  harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
  const execution = await fakeExecution(session)
  const { result, rerender } = renderHook(() => useRobotControlProps(session))
  const moveTo = () => {
    rerender()
    const props = result.current.moveTo
    if (!props) throw new Error("No Move to")
    return props
  }
  /** The messages of one type sent on the open execution websocket */
  const sent = (type: string) =>
    execution.sent().filter((sentType) => sentType === type).length

  return {
    harness,
    session,
    execution,
    moveTo,
    sent,
    /** What the panel's calls reported to the app */
    onError,
    /** A pose is saved in the panel: the session plans it */
    async type(pose: RobotControlPose) {
      act(() => moveTo().onTargetChange(pose))
      await act(flush)
    },
    /** A pose is saved in the panel, and NOVA accepts its trajectory */
    async plan(pose: RobotControlPose) {
      act(() => moveTo().onTargetChange(pose))
      await act(flush)
      act(() => execution.emit("INITIALIZE_RECEIVED"))
      expect(moveTo().state).toBe("planned")
    },
    /** The button is held, and NOVA confirms the start */
    start(pose: RobotControlPose) {
      act(() => moveTo().onMoveStart(pose))
      act(() => execution.emit("START_RECEIVED"))
      expect(moveTo().state).toBe("moving")
    },
    /** The button is let go */
    async letGo() {
      act(() => moveTo().onMoveStop())
      await act(flush)
    },
  }
}

describe("useRobotControlProps", () => {
  it("shows the tab of the session's jogging store and changes it there", async () => {
    const session = await loadSession()
    const { result, rerender } = renderHook(() => useRobotControlProps(session))

    expect(result.current.tab).toBe("translate")

    act(() => result.current.onTabChange?.("joint"))
    rerender()
    expect(result.current.tab).toBe("joint")
    expect(session.jogging.selectedTabId).toBe("joint")

    act(() => result.current.onTabChange?.("rotate"))
    rerender()
    expect(result.current.tab).toBe("rotate")
    expect(session.jogging.selectedTabId).toBe("cartesian")
    expect(session.jogging.selectedCartesianMotionType).toBe("rotate")

    // Move to plans a TCP pose: from Joint, the store leaves its joint tab,
    // or the typed pose would read the pose's text as joints
    act(() => result.current.onTabChange?.("joint"))
    act(() => result.current.onTabChange?.("moveTo"))
    rerender()
    expect(result.current.tab).toBe("moveTo")
    expect(session.jogging.selectedTabId).toBe("cartesian")
  })

  it("jogs the TCP while a handle is held, with the store's velocity", async () => {
    const session = await loadSession()
    const { jogger } = session.jogging
    vi.spyOn(jogger, "setOptions").mockResolvedValue(undefined as never)
    vi.spyOn(jogger, "setJoggingMode").mockResolvedValue(undefined as never)
    const translateTCP = vi
      .spyOn(jogger, "translateTCP")
      .mockResolvedValue(undefined as never)
    const { result } = renderHook(() => useRobotControlProps(session))

    act(() => result.current.onJogStart("translate", "x", "+"))
    await flush()

    expect(translateTCP).toHaveBeenCalledWith({
      axis: "x",
      direction: "+",
      velocityMmPerSec: session.jogging.translationVelocityMmPerSec,
    })
  })

  // The jogging websocket takes about 0.1 to 0.5 s to open: a tap shorter
  // than that must not start a jog that nothing stops
  it("moves nothing when the handle is released before jogging is ready", async () => {
    const session = await loadSession()
    const { jogger } = session.jogging
    const opening = deferred()
    vi.spyOn(jogger, "setOptions").mockResolvedValue(undefined as never)
    vi.spyOn(jogger, "setJoggingMode").mockReturnValue(opening.promise as never)
    vi.spyOn(jogger, "stop").mockResolvedValue(undefined as never)
    const translateTCP = vi
      .spyOn(jogger, "translateTCP")
      .mockResolvedValue(undefined as never)
    const { result } = renderHook(() => useRobotControlProps(session))

    act(() => {
      result.current.onJogStart("translate", "x", "+")
      result.current.onJogStop()
    })
    opening.resolve()
    await flush()

    expect(translateTCP).not.toHaveBeenCalled()
  })

  it("jogs a joint while its slider is held, and stops it on release", async () => {
    const session = await loadSession()
    const { jogger } = session.jogging
    vi.spyOn(jogger, "setJoggingMode").mockResolvedValue(undefined as never)
    const rotateJoints = vi
      .spyOn(jogger, "rotateJoints")
      .mockResolvedValue(undefined as never)
    const stop = vi.spyOn(jogger, "stop").mockResolvedValue(undefined as never)
    const { result } = renderHook(() => useRobotControlProps(session))

    act(() => result.current.joints?.onJogStart(1, "-"))
    await flush()
    expect(rotateJoints).toHaveBeenCalledWith({
      joint: 1,
      direction: "-",
      velocityUnit: "rad/s",
      velocityValue: session.jogging.rotationVelocityRadsPerSec,
    })

    act(() => result.current.joints?.onJogStop())
    await flush()
    expect(stop).toHaveBeenCalledOnce()
  })

  // The panel's step sizes are in mm and rad, the store's increments pair
  // mm with degrees
  it("runs one step of the store's increment that has the panel's step size", async () => {
    const onError = vi.fn()
    const session = await loadSession({ onError })
    const { jogger } = session.jogging
    vi.spyOn(jogger, "setOptions").mockResolvedValue(undefined as never)
    vi.spyOn(jogger, "setJoggingMode").mockResolvedValue(undefined as never)
    const run = vi
      .spyOn(jogger, "runIncrementalCartesianMotion")
      .mockResolvedValue(undefined as never)
    const { result } = renderHook(() => useRobotControlProps(session))
    const step = result.current.increments?.onStep
    if (!step) throw new Error("No increments")

    act(() => step("translate", "z", "-", 10))
    await flush()
    expect(run).toHaveBeenLastCalledWith(
      expect.objectContaining({
        axis: "z",
        direction: "-",
        motion: { type: "translate", distanceMm: 10 },
      }),
    )

    act(() => step("rotate", "x", "+", degreesToRadians(2.5)))
    await flush()
    expect(run).toHaveBeenLastCalledWith(
      expect.objectContaining({
        axis: "x",
        direction: "+",
        motion: { type: "rotate", distanceRads: degreesToRadians(2.5) },
      }),
    )

    // Not a step size of the store: nothing moves, and nothing went wrong
    act(() => step("translate", "x", "+", 7))
    await flush()
    expect(run).toHaveBeenCalledTimes(2)
    expect(onError).not.toHaveBeenCalled()
  })

  it("reports a jog that failed to the session's onError", async () => {
    const onError = vi.fn()
    const session = await loadSession({ onError })
    vi.spyOn(session.jogging.jogger, "setJoggingMode").mockRejectedValue(
      new Error("No jogging websocket"),
    )
    const { result } = renderHook(() => useRobotControlProps(session))

    act(() => result.current.joints?.onJogStart(0, "+"))
    await flush()

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ kind: "jog", message: "No jogging websocket" }),
    )
  })

  // The panel shows jogging as off then: a press that still comes (a touch
  // in the frame before, an app that enables the controls itself) is no
  // error for the app to show
  it("moves nothing and reports nothing for a jog that the store refuses", async () => {
    const onError = vi.fn()
    const session = await loadSession({ onError })
    const { jogger } = session.jogging
    const setJoggingMode = vi
      .spyOn(jogger, "setJoggingMode")
      .mockResolvedValue(undefined as never)
    const { result } = renderHook(() =>
      useRobotControlProps(session, { disabled: true }),
    )

    act(() => {
      result.current.onJogStart("translate", "x", "+")
      result.current.joints?.onJogStart(0, "+")
      result.current.increments?.onStep("translate", "x", "+", 10)
    })
    await flush()

    expect(setJoggingMode).not.toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
  })

  it("plans the pose of Move to as the session's typed pose, and holds and releases its trajectory with the button", async () => {
    const session = await loadSession()
    const fake = withFakeMoveTo(session)
    const { result, rerender } = renderHook(() =>
      useRobotControlProps(fake.robot),
    )
    const moveTo = () => {
      const props = result.current.moveTo
      if (!props) throw new Error("No Move to")
      return props
    }

    act(() =>
      moveTo().onTargetChange({ position: [1, 2, 3], orientation: [0, 0, 0] }),
    )
    expect(fake.setDraft).toHaveBeenCalledWith("(1, 2, 3, 0, 0, 0)")
    expect(fake.confirmEdit).toHaveBeenCalled()

    runInAction(() => {
      fake.targetPose.confirming = true
    })
    rerender()
    expect(moveTo().state).toBe("planning")

    runInAction(() => {
      fake.targetPose.confirming = false
      fake.trajectory.trajectoryState = "planned"
      fake.trajectory.plannedTrajectory = {}
    })
    rerender()
    // The hook keeps no state of the hold: the trajectory decides what a
    // hold starts and what a release has to pause
    act(() => moveTo().onMoveStart(TARGET))
    expect(fake.hold).toHaveBeenCalledOnce()
    act(() => moveTo().onMoveStop())
    await flush()
    expect(fake.release).toHaveBeenCalledOnce()

    act(() => moveTo().onTargetChange(null))
    expect(fake.resetToLive).toHaveBeenCalled()
  })

  it("pauses a move that was started again, though the motion stream still shows the pause before it", async () => {
    const { execution, sent, onError, plan, start, letGo } = await loadMoveTo()
    await plan(TARGET)

    // Held, and let go on the way: the stream reports the pause
    start(TARGET)
    execution.setMotionState({ standstill: false })
    await letGo()
    expect(sent("PauseMovementRequest")).toBe(1)
    execution.setMotionState({
      standstill: true,
      execute: {
        joint_position: [],
        details: {
          kind: "TRAJECTORY",
          trajectory: "trajectory",
          location: 0.5,
          state: { kind: "PAUSED_BY_USER" },
        },
      },
    })
    await act(flush)

    // Held again, and let go before the stream shows that the robot runs
    start(TARGET)
    await letGo()

    expect(onError).not.toHaveBeenCalled()
    expect(sent("StartMovementRequest")).toBe(2)
    expect(sent("PauseMovementRequest")).toBe(2)
  })

  it("pauses a move whose start NOVA confirms long after the button was let go", async () => {
    const { execution, moveTo, sent, plan, letGo } = await loadMoveTo()
    await plan(TARGET)
    // Only the timeouts: the session's streams keep their real clock
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] })
    onTestFinished(() => {
      vi.useRealTimers()
    })

    act(() => moveTo().onMoveStart(TARGET))
    await letGo()
    expect(sent("PauseMovementRequest")).toBe(0)
    await act(() => vi.advanceTimersByTimeAsync(60_000))
    act(() => execution.emit("START_RECEIVED"))
    await act(flush)

    expect(sent("PauseMovementRequest")).toBe(1)
  })

  it("shows why the typed pose could not be planned, in the library's words", async () => {
    const session = await loadSession()
    const fake = withFakeMoveTo(session)
    runInAction(() => {
      fake.targetPose.staged = {
        errorKey: "Jogging.TargetPose.Error.NotReachable.lb",
      }
    })

    const { result } = renderHook(() => useRobotControlProps(fake.robot))

    expect(result.current.moveTo?.error).toMatch(/\w/)
    expect(result.current.moveTo?.error).not.toContain("Jogging.TargetPose")
  })

  it("says why a typed pose is not planned while the robot may not move, and plans it once it may", async () => {
    const harness = makeHarness()
    const session = await harness.load().ready
    onTestFinished(() => session.dispose())
    const fake = withFakeMoveTo(session)
    const { result, rerender } = renderHook(() =>
      useRobotControlProps(fake.robot),
    )
    // The robot is not activated: the controller monitors it
    expect(session.safety.notMoveableReason?.code).toBe("deactivated")

    act(() =>
      result.current.moveTo?.onTargetChange({
        position: [1, 2, 3],
        orientation: [0, 0, 0],
      }),
    )
    rerender()
    expect(result.current.moveTo?.error).toBe(
      "The robot must be activated first",
    )

    // Activating, the robot cannot move yet: an app may still lock it (as
    // RobotPad does), and the session would plan nothing
    fake.setDraft.mockClear()
    fake.confirmEdit.mockClear()
    await act(async () => {
      await session.activation.activate()
    })
    expect(session.activation.state).toBe("activating")
    expect(fake.confirmEdit).not.toHaveBeenCalled()

    // Activated: the pose is planned, without typing it again
    act(() =>
      harness.source.send(
        controllerState({
          mode: "MODE_CONTROL",
          safety_state: "SAFETY_STATE_NORMAL",
        }),
      ),
    )
    await act(flush)
    rerender()
    expect(session.safety.notMoveableReason).toBeNull()
    expect(fake.setDraft).toHaveBeenCalledWith("(1, 2, 3, 0, 0, 0)")
    expect(fake.confirmEdit).toHaveBeenCalledOnce()
    expect(result.current.moveTo?.error ?? null).toBeNull()
  })

  it("stops jogging while the app is disabled or a trajectory moves the robot", async () => {
    const session = await loadSession()
    const fake = withFakeMoveTo(session)
    const { result, rerender } = renderHook(
      ({ disabled }) => useRobotControlProps(fake.robot, { disabled }),
      { initialProps: { disabled: true } },
    )

    expect(session.jogging.isLocked).toBe(true)
    expect(result.current.disabled).toBe(true)

    rerender({ disabled: false })
    expect(session.jogging.isLocked).toBe(false)

    runInAction(() => {
      fake.trajectory.trajectoryState = "moving"
    })
    rerender({ disabled: false })
    expect(session.jogging.isLocked).toBe(true)
    expect(result.current.jogDisabled).toBe(true)
  })

  // The app's own lock stays the app's: `disabled` is what the app gave
  it("turns jogging off while the robot may not move: not activated, activating, stopped by its safety", async () => {
    const harness = makeHarness()
    const session = await harness.load().ready
    onTestFinished(() => session.dispose())
    const { result, rerender } = renderHook(() => useRobotControlProps(session))
    const expectJogging = (on: boolean) => {
      rerender()
      expect(result.current.jogDisabled).toBe(!on)
      expect(session.jogging.isLocked).toBe(!on)
      expect(result.current.disabled).toBe(false)
    }

    // Not activated: the controller monitors the robot
    expect(session.activation.state).toBe("inactive")
    expectJogging(false)

    // Activating: NOVA was asked, the controller is not in control mode yet
    await act(async () => {
      await session.activation.activate()
    })
    expect(session.activation.state).toBe("activating")
    expectJogging(false)

    act(() => harness.source.send(controllerState({ mode: "MODE_CONTROL" })))
    expect(session.activation.state).toBe("active")
    expectJogging(true)

    act(() =>
      harness.source.send(
        controllerState({
          mode: "MODE_CONTROL",
          safety_state: "SAFETY_STATE_STOP",
        }),
      ),
    )
    expectJogging(false)
  })

  // The session outlives the panel: another UI jogs with its store
  it("leaves the session's jogging unlocked when the panel goes away", async () => {
    const session = await loadSession()
    const { unmount } = renderHook(() =>
      useRobotControlProps(session, { disabled: true }),
    )
    expect(session.jogging.isLocked).toBe(true)

    unmount()

    expect(session.jogging.isLocked).toBe(false)
  })

  it("reports a failed TCP change to the session's onError", async () => {
    const onError = vi.fn()
    const session = await loadSession({ onError })
    vi.spyOn(session.jogging.jogger, "setJoggingMode").mockRejectedValue(
      new Error("TCP refused"),
    )
    const { result } = renderHook(() => useRobotControlProps(session))

    act(() => result.current.tcp?.onChange("Other"))
    await flush()

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ kind: "jog", message: "TCP refused" }),
    )
  })
})
