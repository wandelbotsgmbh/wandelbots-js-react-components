import { act, renderHook } from "@testing-library/react"
import { observable, runInAction } from "mobx"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import {
  controllerState,
  makeHarness,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import type { LoadRobotSessionOptions } from "../../lib/robotSession/loadRobotSession"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { useRobotControlProps } from "./useRobotControlProps"

// RobotPad's wiring of the Robot control panel to its stores, as the
// library's connected component has it: a real session on a fake NOVA

async function loadSession(options: LoadRobotSessionOptions = {}) {
  const session = await makeHarness().load(options).ready
  onTestFinished(() => session.dispose())
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
  const start = vi.fn()
  const pause = vi.fn(async () => {})
  const trajectory = observable({
    trajectoryState: "idle" as string,
    plannedTrajectory: null as unknown,
    start,
    pause,
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
    start,
    pause,
    setDraft,
    confirmEdit,
    resetToLive,
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

  it("plans the pose of Move to as the session's typed pose, and moves only along a planned trajectory", async () => {
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

    // Nothing planned: holding Move to starts nothing
    act(() => moveTo().onMoveStart())
    expect(fake.start).not.toHaveBeenCalled()

    runInAction(() => {
      fake.targetPose.confirming = false
      fake.trajectory.trajectoryState = "planned"
      fake.trajectory.plannedTrajectory = {}
    })
    rerender()
    act(() => moveTo().onMoveStart())
    expect(fake.start).toHaveBeenCalledOnce()

    runInAction(() => {
      fake.trajectory.trajectoryState = "moving"
    })
    act(() => moveTo().onMoveStop())
    await flush()
    expect(fake.pause).toHaveBeenCalledOnce()

    act(() => moveTo().onTargetChange(null))
    expect(fake.resetToLive).toHaveBeenCalled()
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
