import { act, renderHook } from "@testing-library/react"
import { degreesToRadians } from "@wandelbots/nova-js"
import type { RobotControllerState } from "@wandelbots/nova-js/v2"
import { observable, runInAction } from "mobx"
import { Vector3 } from "three"
import { describe, expect, it, onTestFinished, vi } from "vitest"
import { i18n } from "../../i18n/config"
import {
  controllerState,
  fakeExecution,
  MOTION_GROUP_ID,
  makeHarness,
  motionGroupState,
} from "../../lib/robotSession/__fixtures__/robotSessionHarness"
import type { LoadRobotSessionOptions } from "../../lib/robotSession/loadRobotSession"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { RobotControlPose, RobotControlTarget } from "./RobotControlPanel"
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
 * The session with a trajectory and a target pose whose state the test sets
 * by hand
 */
function withFakeMoveTo(session: RobotSession) {
  const trajectory = observable({
    trajectoryState: "idle" as string,
    plannedTrajectory: null as unknown,
  })
  const targetPose = observable({
    confirming: false,
    staged: null as { errorKey: string | null } | null,
    stagedPose: null,
  })
  const robot = Object.assign(Object.create(session), {
    trajectory,
    targetPose,
  }) as RobotSession
  return { robot, trajectory, targetPose }
}

const TARGET: RobotControlPose = { position: [1, 2, 3], orientation: [0, 0, 0] }
const OTHER_TARGET: RobotControlPose = {
  position: [9, 8, 7],
  orientation: [0, 0, 0],
}

/**
 * The Move to of an activated robot, with the session's own trajectory and
 * typed pose on a faked planner and execution websocket: the test types a
 * pose, holds the button and plays NOVA's answers
 */
async function loadMoveTo({ activated = true } = {}) {
  const harness = makeHarness()
  const onError = vi.fn()
  const session = await harness.load({ onError }).ready
  onTestFinished(() => session.dispose())
  if (activated) {
    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
  }
  const execution = await fakeExecution(session)
  // The robot stands still, until a test says that it moves
  execution.setMotionState({ standstill: true })
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
    async type(pose: RobotControlTarget) {
      act(() => moveTo().onTargetChange(pose))
      await act(flush)
    },
    /** A pose is saved in the panel, and NOVA accepts its trajectory */
    async plan(pose: RobotControlTarget) {
      act(() => moveTo().onTargetChange(pose))
      await act(flush)
      act(() => execution.emit("INITIALIZE_RECEIVED"))
      expect(moveTo().state).toBe("planned")
    },
    /** The button is held, and NOVA confirms the start */
    start(pose: RobotControlTarget) {
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

  // The panel asks when it goes away while a step runs: a step of another
  // part of the app goes on
  it("stops the step that it started when the panel asks, and no other", async () => {
    const session = await loadSession()
    const { jogger } = session.jogging
    vi.spyOn(jogger, "setOptions").mockResolvedValue(undefined as never)
    vi.spyOn(jogger, "setJoggingMode").mockResolvedValue(undefined as never)
    const stop = vi.spyOn(jogger, "stop").mockResolvedValue(undefined)
    let stepOver: () => void = () => {}
    vi.spyOn(jogger, "runIncrementalCartesianMotion").mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          stepOver = resolve
        }),
    )
    const { result } = renderHook(() => useRobotControlProps(session))

    /** A step of another part of the app, which the panel leaves alone */
    async function otherStepGoesOn() {
      const other = session.jogging.runIncrementalCartesianJog(
        "translate",
        "x",
        "+",
        session.jogging.discreteIncrementOptions[3],
      )
      await flush()
      const stops = stop.mock.calls.length
      act(() => result.current.increments?.onStepStop?.())
      await flush()
      expect(stop).toHaveBeenCalledTimes(stops)
      stepOver()
      await other
    }

    await otherStepGoesOn()

    // The panel's own
    act(() => result.current.increments?.onStep("translate", "x", "+", 10))
    await flush()
    act(() => result.current.increments?.onStepStop?.())
    await flush()
    expect(stop).toHaveBeenCalledOnce()
    stepOver()
    await flush()

    // Once the panel's step is over, a step of another part is none of it
    await otherStepGoesOn()
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

  it("plans the pose of Move to as the session's typed pose, and moves along its trajectory while the button is held", async () => {
    const { session, execution, moveTo, sent, type, start, letGo } =
      await loadMoveTo()
    const pose: RobotControlPose = {
      position: [1.23456, 2, 3],
      orientation: [0, 0, 0],
    }

    // The pose as numbers, of the TCP and in the frame that the panel shows
    await type(pose)
    expect(session.targetPose.stagedPose).toEqual({
      type: "cartesian",
      motionGroupId: MOTION_GROUP_ID,
      tcpPose: { pose, coordSystemId: "world", tcpId: "Flange" },
    })
    // NOVA has not accepted the trajectory: holding Move to starts nothing
    expect(moveTo().state).toBe("planning")
    act(() => moveTo().onMoveStart(pose))
    expect(sent("StartMovementRequest")).toBe(0)

    act(() => execution.emit("INITIALIZE_RECEIVED"))
    expect(moveTo().state).toBe("planned")
    start(pose)
    expect(sent("StartMovementRequest")).toBe(1)
    await letGo()
    expect(sent("PauseMovementRequest")).toBe(1)
    expect(moveTo().state).toBe("planned")

    // Reset: the session drops the pose and hands the trajectory back
    const armed = execution.sockets.at(-1)
    act(() => moveTo().onTargetChange(null))
    await act(flush)
    expect(session.targetPose.staged).toBeNull()
    expect(armed?.dispose).toHaveBeenCalled()
    expect(moveTo().state).toBe("idle")
  })

  it("plans joint values of Move to as the session's joint pose, and moves along their trajectory while the button is held", async () => {
    const { session, execution, moveTo, sent, type, start, letGo } =
      await loadMoveTo()
    const target = { joints: [0.1, 0, 0, 0, 0, 0.5] }

    await type(target)
    expect(session.targetPose.stagedPose).toEqual({
      type: "joint",
      motionGroupId: MOTION_GROUP_ID,
      joints: [0.1, 0, 0, 0, 0, 0.5],
    })
    expect(
      execution.planTrajectory.mock.calls.at(-1)?.[1].motion_commands[0]?.path,
    ).toEqual({
      path_definition_name: "PathJointPTP",
      target_joint_position: [0.1, 0, 0, 0, 0, 0.5],
    })
    expect(moveTo().state).toBe("planning")

    act(() => execution.emit("INITIALIZE_RECEIVED"))
    expect(moveTo().state).toBe("planned")
    // Not for other joint values, and not for a pose of the TCP
    act(() => moveTo().onMoveStart({ joints: [0.1, 0, 0, 0, 0, 0.6] }))
    act(() => moveTo().onMoveStart(TARGET))
    expect(sent("StartMovementRequest")).toBe(0)

    start(target)
    expect(sent("StartMovementRequest")).toBe(1)
    await letGo()
    expect(sent("PauseMovementRequest")).toBe(1)
    expect(moveTo().state).toBe("planned")

    // Reset: the session drops the joint pose and hands the trajectory back
    act(() => moveTo().onTargetChange(null))
    await act(flush)
    expect(session.targetPose.staged).toBeNull()
    expect(moveTo().state).toBe("idle")
  })

  it("gives Move to the robot's joints, and the frame of a typed pose only to a robot that takes TCP poses", async () => {
    const { session, harness, moveTo } = await loadMoveTo()
    expect(moveTo().getCurrentJoints?.()).toEqual([0, 0, 0, 0, 0, 0])
    expect(moveTo().frame?.value).toBe("world")

    act(() =>
      harness.source.send({
        ...controllerState({ mode: "MODE_CONTROL" }),
        motion_groups: [
          { ...motionGroupState(), joint_position: [0.5, 0, 0, 0, 0, 0] },
        ],
      } as unknown as RobotControllerState),
    )
    expect(moveTo().getCurrentJoints?.()).toEqual([0.5, 0, 0, 0, 0, 0])

    // A linear axis or a turntable: no inverse solver, so no TCP poses
    runInAction(() => {
      session.jogging.inverseSolver = null
    })
    expect(moveTo().frame).toBeUndefined()
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

  it("moves to the pose the panel shows once the robot may move again, not to the one planned before", async () => {
    const { harness, execution, moveTo, sent, plan, type } = await loadMoveTo()
    /** Where the last planned trajectory goes */
    const plannedPosition = () => {
      const path =
        execution.planTrajectory.mock.calls.at(-1)?.[1].motion_commands[0]?.path
      return path && "target_pose" in path ? path.target_pose.position : null
    }
    await plan(TARGET)
    const armed = execution.sockets.at(-1)

    // The robot is deactivated, then another pose is saved in the panel
    act(() => harness.source.send(controllerState({ mode: "MODE_MONITOR" })))
    await type(OTHER_TARGET)
    expect(moveTo().error).toBe("The robot must be activated first")
    // Nothing is planned for the pose that shows, so nothing stays armed
    expect(armed?.dispose).toHaveBeenCalled()
    expect(moveTo().state).toBe("idle")

    // Activated again: the panel's pose is planned, and the button moves there
    act(() => harness.source.send(controllerState({ mode: "MODE_CONTROL" })))
    await act(flush)
    expect(plannedPosition()).toEqual(OTHER_TARGET.position)
    act(() => execution.emit("INITIALIZE_RECEIVED"))
    expect(moveTo().state).toBe("planned")
    act(() => moveTo().onMoveStart(OTHER_TARGET))
    expect(sent("StartMovementRequest")).toBe(1)
  })

  it("moves at the velocity that shows when the button is held, not at the one the pose was planned with", async () => {
    const { session, execution, moveTo, sent, plan } = await loadMoveTo()
    const { result, rerender } = renderHook(() => useRobotControlProps(session))
    /** The TCP velocity limit of the last planned trajectory */
    const plannedVelocity = () =>
      execution.planTrajectory.mock.calls.at(-1)?.[1].motion_commands[0]
        ?.limits_override?.tcp_velocity_limit
    const fast = session.jogging.maxTranslationVelocityMmPerSec
    const slow = session.jogging.minTranslationVelocityMmPerSec
    expect(fast).toBeGreaterThan(slow)

    act(() => result.current.onVelocityChange("translate", fast))
    await plan(TARGET)
    expect(plannedVelocity()).toBe(fast)

    // The slider of the Move to tab goes down, then the button is held
    act(() => result.current.onVelocityChange("translate", slow))
    rerender()
    expect(result.current.velocity.translate.value).toBe(slow)
    act(() => moveTo().onMoveStart(TARGET))
    // Not along the trajectory that was planned for the old velocity
    expect(sent("StartMovementRequest")).toBe(0)

    // The pose is planned again with the velocity that shows
    await act(flush)
    expect(plannedVelocity()).toBe(slow)
    expect(moveTo().state).toBe("planning")
    act(() => execution.emit("INITIALIZE_RECEIVED"))
    act(() => moveTo().onMoveStart(TARGET))
    expect(sent("StartMovementRequest")).toBe(1)
  })

  it("starts nothing when the button is held for another pose than the planned one", async () => {
    const { moveTo, sent, plan } = await loadMoveTo()
    await plan(TARGET)

    act(() => moveTo().onMoveStart(OTHER_TARGET))
    expect(sent("StartMovementRequest")).toBe(0)

    act(() => moveTo().onMoveStart(TARGET))
    expect(sent("StartMovementRequest")).toBe(1)
  })

  // RobotPad: a saved pose gets selected, which drops the typed pose and
  // plans a trajectory of its own. The Move to tab still shows its target.
  it("keeps Move to off while the planned trajectory is not the one of the panel's pose", async () => {
    const { session, execution, moveTo, sent, plan } = await loadMoveTo()
    await plan(TARGET)

    act(() => session.targetPose.clear())
    await act(async () => {
      await session.trajectory.planTrajectory({ type: "joint", joints: [1] })
    })
    act(() => execution.emit("INITIALIZE_RECEIVED"))
    expect(session.trajectory.trajectoryState).toBe("planned")

    expect(moveTo().state).toBe("idle")
    act(() => moveTo().onMoveStart(TARGET))
    expect(sent("StartMovementRequest")).toBe(0)
  })

  it("shows why a move failed, and plans the same pose again when the panel asks for it", async () => {
    const { execution, moveTo, plan, start, type } = await loadMoveTo()
    await plan(TARGET)
    start(TARGET)

    act(() =>
      execution.emit("MOTION_ERROR", { message: 'Collision with "table"' }),
    )

    // The reason as NOVA gave it, and no button that looks ready
    expect(moveTo().error).toBe(
      'The move to this pose failed: Collision with "table"',
    )
    expect(moveTo().state).toBe("idle")

    // Plan again, as the panel's button asks for the pose it still shows
    await type(TARGET)
    expect(execution.planTrajectory).toHaveBeenCalledTimes(2)
    act(() => execution.emit("INITIALIZE_RECEIVED"))
    expect(moveTo().error ?? null).toBeNull()
    expect(moveTo().state).toBe("planned")
  })

  it("shows why NOVA refused the trajectory of a planned pose", async () => {
    const { execution, moveTo, type } = await loadMoveTo()
    await type(TARGET)

    act(() =>
      execution.emit("INITIALIZE_RECEIVED", {
        message: "Trajectory does not start at the current joints",
      }),
    )

    expect(moveTo().error).toBe(
      "The move to this pose failed: Trajectory does not start at the current joints",
    )
    expect(moveTo().state).toBe("idle")
  })

  it("hands the trajectory of a failed move back when the pose is reset", async () => {
    const { execution, moveTo, plan, start } = await loadMoveTo()
    await plan(TARGET)
    start(TARGET)
    act(() => execution.emit("MOTION_ERROR", { message: "Collision" }))
    const held = execution.sockets.at(-1)

    act(() => moveTo().onTargetChange(null))
    await act(flush)

    expect(held?.dispose).toHaveBeenCalled()
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
    const { harness, session, execution, moveTo, type } = await loadMoveTo({
      activated: false,
    })
    // The robot is not activated: the controller monitors it
    expect(session.safety.notMoveableReason?.code).toBe("deactivated")

    await type(TARGET)
    expect(moveTo().error).toBe("The robot must be activated first")
    expect(execution.planTrajectory).not.toHaveBeenCalled()

    // Activating, the robot cannot move yet: an app may still lock it (as
    // RobotPad does), and the session would plan nothing
    await act(async () => {
      await session.activation.activate()
    })
    expect(session.activation.state).toBe("activating")
    await act(flush)
    expect(execution.planTrajectory).not.toHaveBeenCalled()

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
    expect(session.safety.notMoveableReason).toBeNull()
    expect(execution.planTrajectory).toHaveBeenCalledOnce()
    expect(session.targetPose.stagedPose).toMatchObject({
      tcpPose: { pose: TARGET },
    })
    expect(moveTo().error ?? null).toBeNull()
  })

  // The reason of the robot, not of a target: the panel shows it while a
  // pose is typed as well
  it("gives Move to the reason why the robot may not move, also without a target and while it is activating", async () => {
    const MUST_BE_ACTIVATED = "The robot must be activated first"
    const { harness, session, moveTo, type } = await loadMoveTo({
      activated: false,
    })
    expect(moveTo().notMoveableReason).toBe(MUST_BE_ACTIVATED)
    // No target: no reason of a target
    expect(moveTo().error ?? null).toBeNull()

    // Activating: not moveable yet, and the session has no reason of its own
    await type(TARGET)
    await act(async () => {
      await session.activation.activate()
    })
    expect(session.activation.state).toBe("activating")
    expect(session.safety.notMoveableReason).toBeNull()
    expect(moveTo().notMoveableReason).toBe(MUST_BE_ACTIVATED)
    expect(moveTo().error).toBe(MUST_BE_ACTIVATED)

    act(() => harness.source.send(controllerState({ mode: "MODE_CONTROL" })))
    await act(flush)
    expect(moveTo().notMoveableReason ?? null).toBeNull()
    expect(moveTo().error ?? null).toBeNull()

    act(() =>
      harness.source.send(
        controllerState({
          mode: "MODE_CONTROL",
          safety_state: "SAFETY_STATE_STOP",
        }),
      ),
    )
    expect(moveTo().notMoveableReason).toBe(
      "The robot is in a non-moveable safety state: SAFETY_STATE_STOP",
    )
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

  it("names the joints of a six-axis arm as the design does, in the user's language", async () => {
    const session = await loadSession()
    const { result, rerender } = renderHook(() => useRobotControlProps(session))
    const names = () => {
      rerender()
      return result.current.joints?.joints.map((joint) => joint.name)
    }

    expect(names()).toEqual([
      "Base",
      "Shoulder",
      "Elbow",
      "Forearm",
      "Wrist",
      "Flange",
    ])

    await act(() => i18n.changeLanguage("de"))
    onTestFinished(async () => {
      await i18n.changeLanguage("en")
    })
    expect(names()).toEqual([
      "Basis",
      "Schulter",
      "Ellbogen",
      "Unterarm",
      "Handgelenk",
      "Flansch",
    ])
  })

  // The gizmo's handles must point where the jogger moves the TCP: the
  // jogger takes a coordinate system without an orientation as not turned,
  // and an orientation without a type as a rotation vector (see Pose3)
  it("turns the gizmo as the jogger jogs along the coordinate system, also one without an orientation or its type", async () => {
    const harness = makeHarness()
    harness.api.controller.listCoordinateSystems.mockResolvedValue([
      { coordinate_system: "" },
      // A quarter turn about Z: its X is world's Y
      { coordinate_system: "turned", orientation: [0, 0, Math.PI / 2] },
    ])
    const session = await harness.load().ready
    onTestFinished(() => session.dispose())
    const { result, rerender } = renderHook(() => useRobotControlProps(session))
    /** Where an axis of the gizmo's frame points in world */
    const along = (x: number, y: number, z: number) => {
      rerender()
      const frame = result.current.gizmoFrameQuaternion
      if (typeof frame !== "function") throw new Error("No frame")
      const axis = new Vector3(x, y, z).applyQuaternion(frame())
      return [axis.x, axis.y, axis.z]
    }
    const expectClose = (actual: number[], expected: number[]) =>
      expected.forEach((value, i) => {
        expect(actual[i]).toBeCloseTo(value)
      })

    expect(session.jogging.jogCoordSystem.orientation).toBeUndefined()
    expectClose(along(0, 0, 1), [0, 0, 1])
    expectClose(along(0, 1, 0), [0, 1, 0])

    act(() => session.jogging.setMoveRelativeToCoordSystem("turned"))
    expectClose(along(1, 0, 0), [0, 1, 0])
    expectClose(along(0, 0, 1), [0, 0, 1])
  })

  // The jog tabs show it where their hint is; Move to has its own text
  it("says why jogging is off: the robot's reason, or a trajectory that moves it, in English and German", async () => {
    const harness = makeHarness()
    const session = await harness.load().ready
    onTestFinished(() => session.dispose())
    const fake = withFakeMoveTo(session)
    const { result, rerender } = renderHook(
      ({ disabled }) => useRobotControlProps(fake.robot, { disabled }),
      { initialProps: { disabled: false } },
    )
    const reason = () => {
      rerender({ disabled: false })
      return result.current.jogDisabledReason
    }

    expect(reason()).toBe("The robot must be activated first")

    // Activating: the controller is not in control mode yet
    await act(async () => {
      await session.activation.activate()
    })
    expect(session.activation.state).toBe("activating")
    expect(reason()).toBe("The robot must be activated first")

    act(() => harness.source.send(controllerState({ mode: "MODE_CONTROL" })))
    expect(reason()).toBeUndefined()

    act(() =>
      runInAction(() => {
        fake.trajectory.trajectoryState = "moving"
      }),
    )
    expect(reason()).toBe("The robot is moving to a pose")
    act(() =>
      runInAction(() => {
        fake.trajectory.trajectoryState = "idle"
      }),
    )

    act(() =>
      harness.source.send(
        controllerState({
          mode: "MODE_CONTROL",
          safety_state: "SAFETY_STATE_STOP",
        }),
      ),
    )
    expect(reason()).toBe(
      "The robot is in a non-moveable safety state: SAFETY_STATE_STOP",
    )

    await act(() => i18n.changeLanguage("de"))
    onTestFinished(async () => {
      await i18n.changeLanguage("en")
    })
    expect(reason()).toBe(
      "Der Roboter befindet sich in einem nicht beweglichen Sicherheitszustand: SAFETY_STATE_STOP",
    )
    act(() => {
      harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
      runInAction(() => {
        fake.trajectory.trajectoryState = "stopping"
      })
    })
    expect(reason()).toBe("Der Roboter bewegt sich zu einer Pose")
  })

  // NOVA gives the jogging connection to one client at a time. The store
  // stays blocked until it is told to try again: the panel must offer that.
  it("says that another client jogs the robot, with a way to try again, and jogs again after it", async () => {
    const onError = vi.fn()
    const session = await loadSession({ onError })
    const { jogger } = session.jogging
    let heldByAnother = true
    vi.spyOn(jogger, "setOptions").mockResolvedValue(undefined as never)
    vi.spyOn(jogger, "setJoggingMode").mockImplementation(async (mode) => {
      jogger.mode = mode
      // As the jogger when NOVA answers that another client is jogging
      if (mode === "jogging" && heldByAnother) jogger.onBlocked?.()
    })
    const translateTCP = vi
      .spyOn(jogger, "translateTCP")
      .mockResolvedValue(undefined as never)
    const { result, rerender } = renderHook(() => useRobotControlProps(session))
    expect(result.current.onJogRetry).toBeUndefined()

    act(() => result.current.onJogStart("translate", "x", "+"))
    await act(flush)
    rerender()

    expect(translateTCP).not.toHaveBeenCalled()
    expect(result.current.jogDisabled).toBe(true)
    expect(result.current.jogDisabledReason).toBe(
      "Another client is currently controlling the jogging.",
    )
    // The panel says it: nothing for the app to show as an error
    expect(onError).not.toHaveBeenCalled()

    heldByAnother = false
    act(() => result.current.onJogRetry?.())
    rerender()
    expect(result.current.jogDisabled).toBe(false)
    expect(result.current.jogDisabledReason).toBeUndefined()
    expect(result.current.onJogRetry).toBeUndefined()

    act(() => result.current.onJogStart("translate", "x", "+"))
    await act(flush)
    expect(translateTCP).toHaveBeenCalledOnce()
  })

  it("offers no way to try again for a reason that is the robot's", async () => {
    const harness = makeHarness()
    const session = await harness.load().ready
    onTestFinished(() => session.dispose())
    act(() => session.jogging.block())

    const { result } = renderHook(() => useRobotControlProps(session))

    expect(result.current.jogDisabledReason).toBe(
      "The robot must be activated first",
    )
    expect(result.current.onJogRetry).toBeUndefined()
  })

  // The app knows why it locks the panel, the hook does not
  it("gives no reason for the app's own lock", async () => {
    const session = await loadSession()

    const { result } = renderHook(() =>
      useRobotControlProps(session, { disabled: true }),
    )

    expect(result.current.jogDisabledReason).toBeUndefined()
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

  // The panel shows the TCP select as off then, as jogging
  it("reports no TCP change that the session refuses for a robot that may not move", async () => {
    const harness = makeHarness()
    const onError = vi.fn()
    const session = await harness.load({ onError }).ready
    onTestFinished(() => session.dispose())
    expect(session.safety.notMoveableReason).toEqual({ code: "deactivated" })
    const setJoggingMode = vi.spyOn(session.jogging.jogger, "setJoggingMode")
    const { result } = renderHook(() => useRobotControlProps(session))

    act(() => result.current.tcp?.onChange("Other"))
    await flush()

    expect(setJoggingMode).not.toHaveBeenCalled()
    expect(onError).not.toHaveBeenCalled()
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
