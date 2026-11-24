import { beforeEach, describe, expect, it, vi } from "vitest"
import { JoggingRefusedError } from "../../components/jogging/JoggingRefusedError"
import {
  CONTROLLER_ID,
  MOTION_GROUP_ID,
  controllerState,
  fakeExecution,
  makeHarness,
} from "./__fixtures__/robotSessionHarness"
import { RobotModeChangeError } from "./RobotActivation"
import type { RobotSession } from "./RobotSession"

// The load flow is ported from RobotPad (unit/robotPadRobotLoad.test.ts), the
// session from its ActiveRobotStore

let harness: ReturnType<typeof makeHarness>

beforeEach(() => {
  harness = makeHarness()
  localStorage.clear()
})

describe("loadRobotSession", () => {
  it("loads the robot into a session", async () => {
    const load = harness.load()

    const session = await load.ready

    expect(load.state).toBe("ready")
    expect(load.session).toBe(session)
    expect(load.progress.isComplete).toBe(true)
    expect(session.controllerId).toBe(CONTROLLER_ID)
    expect(session.description.resolvedMotionGroupModel).toBe(
      "custom-UniversalRobots_UR5e-1",
    )
    expect(session.state.controllerState.controller).toBe(CONTROLLER_ID)
    session.dispose()
  })

  it("surfaces a failed step instead of rejecting or spinning forever", async () => {
    harness.api.motionGroup.getMotionGroupDescription.mockRejectedValue(
      new Error("Network Error"),
    )
    const onEvent = vi.fn()

    const load = harness.load({ onEvent })

    await expect(load.ready).rejects.toThrow("Network Error")
    expect(load.state).toBe("failed")
    expect(load.progress.failedStep?.id).toBe("motionGroupDescription")
    expect(onEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "loadFailed",
        step: "motionGroupDescription",
        attempts: 1,
      }),
    )
  })

  it("retries a failed load step before giving up", async () => {
    harness.api.motionGroup.getMotionGroupDescription.mockRejectedValueOnce(
      new Error("controller still starting"),
    )

    const load = harness.load({ retryDelaysMs: [0] })
    const session = await load.ready

    expect(
      harness.api.motionGroup.getMotionGroupDescription,
    ).toHaveBeenCalledTimes(2)
    expect(load.progress.retryAttempt).toBe(1)
    session.dispose()
  })

  it("gives up at once and releases the streams when making the session fails", async () => {
    harness.socket.addEventListener.mockImplementation(() => {
      throw new Error("broken socket")
    })

    const load = harness.load({ retryDelaysMs: [0, 0] })

    await expect(load.ready).rejects.toThrow("broken socket")
    expect(load.progress.fatalError).toBeInstanceOf(Error)
    expect(harness.socket.dispose).toHaveBeenCalled()
    expect(harness.source.close).toHaveBeenCalled()
  })

  it("loads again on retry after a failure", async () => {
    harness.api.motionGroup.getMotionGroupDescription.mockRejectedValueOnce(
      new Error("Network Error"),
    )
    const load = harness.load()
    await load.ready.catch(() => {})
    expect(load.state).toBe("failed")

    load.retry()
    const session = await load.ready

    expect(load.state).toBe("ready")
    session.dispose()
  })

  it("closes what a disposed load opened instead of handing it over", async () => {
    let sendFirstState: (event: { data: string }) => void = () => {}
    vi.mocked(harness.source.firstMessage).mockImplementation(
      () =>
        new Promise((resolve) => {
          sendFirstState = resolve as typeof sendFirstState
        }),
    )
    const load = harness.load()
    await vi.waitFor(() =>
      expect(harness.source.firstMessage).toHaveBeenCalled(),
    )

    load.dispose()
    sendFirstState({ data: JSON.stringify(controllerState()) })

    await expect(load.ready).rejects.toThrow("disposed")
    await vi.waitFor(() => expect(harness.source.close).toHaveBeenCalled())
    expect(harness.socket.dispose).toHaveBeenCalled()
    expect(load.session).toBeNull()
  })
})

describe("RobotSession", () => {
  it("follows the mode the controller reports", async () => {
    const session = await harness.load().ready
    expect(session.activation.state).toBe("inactive")

    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))

    expect(session.activation.state).toBe("active")
    session.dispose()
  })

  it("does not ask NOVA to activate while an emergency stop is active", async () => {
    const session = await harness.load().ready
    harness.source.send(
      controllerState({ safety_state: "SAFETY_STATE_ROBOT_EMERGENCY_STOP" }),
    )

    await session.activation.activate()

    expect(harness.api.controller.setDefaultMode).not.toHaveBeenCalled()
    expect(session.safety.canBeActive).toBe(false)
    session.dispose()
  })

  it("rejects an activation that NOVA refuses, with the request's URL, and stays inactive", async () => {
    harness.api.controller.setDefaultMode.mockRejectedValue(
      new Error("refused"),
    )
    const session = await harness.load().ready

    const error = await session.activation.activate().catch((e) => e)

    expect(error).toBeInstanceOf(RobotModeChangeError)
    expect(error.url).toBe("/cells/cell/controllers/ur5e/mode")
    expect(error.message).toContain("ROBOT_SYSTEM_MODE_CONTROL")
    expect(session.activation.state).toBe("inactive")
    session.dispose()
  })

  it("activates a virtual robot only when asked to", async () => {
    const quiet = await harness.load().ready
    expect(harness.api.controller.setDefaultMode).not.toHaveBeenCalled()
    quiet.dispose()

    const activated = await harness.load({ autoActivateVirtual: true }).ready

    expect(harness.api.controller.setDefaultMode).toHaveBeenCalledWith(
      "cell",
      CONTROLLER_ID,
      "ROBOT_SYSTEM_MODE_CONTROL",
    )
    activated.dispose()
  })

  it("reports a failed automatic activation to onError", async () => {
    harness.api.controller.setDefaultMode.mockRejectedValue(
      new Error("refused"),
    )
    const onError = vi.fn()

    const session = await harness.load({ autoActivateVirtual: true, onError })
      .ready

    await vi.waitFor(() =>
      expect(onError).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: "mode",
          url: "/cells/cell/controllers/ur5e/mode",
        }),
      ),
    )
    session.dispose()
  })

  it("tells why the robot cannot move, as a code", async () => {
    const session = await harness.load().ready
    expect(session.safety.notMoveableReason).toEqual({ code: "deactivated" })

    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
    expect(session.safety.notMoveableReason).toBeNull()
    expect(session.safety.canBeMoved).toBe(true)

    harness.source.send(
      controllerState({
        mode: "MODE_CONTROL",
        safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
      }),
    )
    expect(session.safety.notMoveableReason).toEqual({
      code: "safety_state",
      value: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    })
    expect(session.safety.isEstopActive).toBe(true)
    session.dispose()
  })

  it("keeps the jogging settings only in the storage it is given", async () => {
    const plain = await harness.load().ready
    plain.jogging.setSelectedOrientation("tool")
    expect(localStorage.getItem("joggingToolStore")).toBeNull()
    plain.dispose()

    const held = new Map<string, string>()
    const kept = await harness.load({
      storage: {
        getItem: (key) => held.get(key) ?? null,
        setItem: (key, value) => {
          held.set(key, value)
        },
      },
    }).ready
    kept.jogging.setSelectedOrientation("tool")
    expect(held.get("joggingToolStore")).toContain('"tool"')
    kept.dispose()
  })

  it("shows the TCP pose in the coordinate systems of its own controller", async () => {
    const session = await harness.load().ready

    // The controller's default coordinate system ("") is world
    expect(
      session.description.coordinateSystems.map((cs) => cs.coordinate_system),
    ).toEqual(["world"])
    expect(session.state.displayedTcpPoseReference).toMatchObject({
      coordinateSystemId: "world",
      tcpId: "Flange",
      pose: { position: [400, 0, 300] },
    })
    session.dispose()
  })

  it("closes the live state source and the motion state socket on dispose", async () => {
    const session = await harness.load().ready

    session.dispose()

    expect(harness.source.close).toHaveBeenCalled()
    expect(harness.socket.dispose).toHaveBeenCalled()
  })

  // From RobotPad's ActiveRobotStore: a staged typed pose holds the execution
  // session open for its armed Move to, and the controller does not jog then
  it("drops a staged typed pose when jogging starts", async () => {
    const session = await harness.load().ready
    session.targetPose.staged = {
      pose: { type: "joint", motionGroupId: MOTION_GROUP_ID, joints: [0] },
      displayString: "[0]",
      errorKey: "Jogging.TargetPose.Error.PlanningFailed.lb",
    }

    await session.jogging.onBeforeActivate?.()

    expect(session.targetPose.staged).toBeNull()
    session.dispose()
  })

  it("hands a planned move back before it deactivates the robot, whose controller it holds in control mode", async () => {
    const session = await harness.load().ready
    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
    // A typed pose planned for Move to: its trajectory is loaded on the
    // controller's execution session
    session.targetPose.staged = {
      pose: { type: "joint", motionGroupId: MOTION_GROUP_ID, joints: [0] },
      displayString: "[0]",
      errorKey: null,
    }
    session.trajectory.plannedTrajectory = { startJoints: [0], endJoints: [1] }
    session.trajectory.trajectoryState = "planned"
    let plannedWhenAsked: unknown = "never asked"
    harness.api.controller.setDefaultMode.mockImplementation(async () => {
      plannedWhenAsked = session.trajectory.plannedTrajectory
    })

    await session.activation.deactivate()

    expect(harness.api.controller.setDefaultMode).toHaveBeenCalledWith(
      "cell",
      CONTROLLER_ID,
      "ROBOT_SYSTEM_MODE_MONITOR",
    )
    expect(plannedWhenAsked).toBeNull()
    expect(session.targetPose.staged).toBeNull()

    // The controller leaves control mode then
    harness.source.send(controllerState({ mode: "MODE_MONITOR" }))
    expect(session.activation.state).toBe("inactive")
    session.dispose()
  })

  it("hands back a move that the app planned itself before it deactivates the robot", async () => {
    const session = await harness.load().ready
    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
    // RobotPad plans the move to a saved pose itself, with no typed pose
    session.trajectory.plannedTrajectory = { startJoints: [0], endJoints: [1] }
    session.trajectory.trajectoryState = "planned"
    let plannedWhenAsked: unknown = "never asked"
    harness.api.controller.setDefaultMode.mockImplementation(async () => {
      plannedWhenAsked = session.trajectory.plannedTrajectory
    })

    await session.activation.deactivate()

    expect(plannedWhenAsked).toBeNull()
    session.dispose()
  })

  // NOVA switches the controller to control mode by itself for a movement
  // request: a robot shown as deactivated made a step of 1 mm
  describe("jogging", () => {
    const oneMm = { id: "1", mm: 1, degrees: 0.5 }

    /** The jogger's calls that would move the robot, to look at */
    function spyOnJogger(session: RobotSession) {
      const { jogger } = session.jogging
      return {
        setJoggingMode: vi
          .spyOn(jogger, "setJoggingMode")
          .mockResolvedValue(undefined as never),
        setOptions: vi
          .spyOn(jogger, "setOptions")
          .mockResolvedValue(undefined as never),
        step: vi
          .spyOn(jogger, "runIncrementalCartesianMotion")
          .mockResolvedValue(undefined as never),
      }
    }

    /** The reason a jog was refused with, or the test fails */
    async function refusalOf(start: Promise<unknown>) {
      const error = await start.then(
        () => undefined,
        (e: unknown) => e,
      )
      expect(error).toBeInstanceOf(JoggingRefusedError)
      return (error as JoggingRefusedError).reason
    }

    it("moves a robot that is not activated by no step, and opens no connection to jog it", async () => {
      const session = await harness.load().ready
      const jogger = spyOnJogger(session)
      expect(session.activation.state).toBe("inactive")

      expect(
        await refusalOf(
          session.jogging.runIncrementalCartesianJog(
            "translate",
            "z",
            "+",
            oneMm,
          ),
        ),
      ).toEqual({ code: "deactivated" })
      expect(
        await refusalOf(
          session.jogging.startCartesianJogging("translate", "z", "+"),
        ),
      ).toEqual({ code: "deactivated" })
      expect(
        await refusalOf(session.jogging.startJointJogging(0, "+")),
      ).toEqual({ code: "deactivated" })
      expect(await refusalOf(session.jogging.activate())).toEqual({
        code: "deactivated",
      })

      expect(jogger.setJoggingMode).not.toHaveBeenCalled()
      expect(jogger.setOptions).not.toHaveBeenCalled()
      expect(jogger.step).not.toHaveBeenCalled()
      session.dispose()
    })

    it("jogs an activated robot, and no longer once its safety stops it", async () => {
      const session = await harness.load().ready
      const jogger = spyOnJogger(session)
      harness.source.send(controllerState({ mode: "MODE_CONTROL" }))

      await session.jogging.runIncrementalCartesianJog(
        "translate",
        "z",
        "+",
        oneMm,
      )
      expect(jogger.step).toHaveBeenCalledOnce()

      harness.source.send(
        controllerState({
          mode: "MODE_CONTROL",
          safety_state: "SAFETY_STATE_STOP",
        }),
      )
      expect(await refusalOf(session.jogging.activate())).toEqual({
        code: "safety_state",
        value: "SAFETY_STATE_STOP",
      })
      session.dispose()
    })

    // The safety has no reason then (the robot is not "deactivated", and
    // Move to waits for it), but the controller is not in control mode yet
    it("jogs no robot that is still activating, until its controller is in control mode", async () => {
      const session = await harness.load().ready
      const jogger = spyOnJogger(session)

      await session.activation.activate()
      expect(session.activation.state).toBe("activating")
      expect(session.safety.notMoveableReason).toBeNull()

      expect(
        await refusalOf(
          session.jogging.startCartesianJogging("translate", "z", "+"),
        ),
      ).toEqual({ code: "deactivated" })
      expect(jogger.setJoggingMode).not.toHaveBeenCalled()

      harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
      expect(session.activation.state).toBe("active")
      await session.jogging.activate()
      expect(jogger.setJoggingMode).toHaveBeenCalledOnce()
      session.dispose()
    })

    it("jogs no robot that is deactivating, whose controller is still in control mode", async () => {
      const session = await harness.load().ready
      const jogger = spyOnJogger(session)
      harness.source.send(controllerState({ mode: "MODE_CONTROL" }))

      await session.activation.deactivate()
      expect(session.activation.state).toBe("deactivating")

      expect(await refusalOf(session.jogging.activate())).toEqual({
        code: "deactivated",
      })
      expect(jogger.setJoggingMode).not.toHaveBeenCalled()
      session.dispose()
    })
  })

  // The store drops its plan at the end of a trajectory, after a failed move
  // and on reset, but NOVA keeps the trajectory until the websocket closes
  it("hands back a trajectory that the controller still holds without a plan, before it deactivates the robot", async () => {
    const session = await harness.load().ready
    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))
    const execution = await fakeExecution(session)
    await session.trajectory.planTrajectory({ type: "joint", joints: [1] })
    execution.emit("INITIALIZE_RECEIVED")
    session.trajectory.reset()
    expect(session.trajectory.trajectoryState).toBe("idle")
    const held = execution.sockets.at(-1)
    let closedWhenAsked: unknown = "never asked"
    harness.api.controller.setDefaultMode.mockImplementation(async () => {
      closedWhenAsked = held?.dispose.mock.calls.length
    })

    await session.activation.deactivate()

    expect(closedWhenAsked).toBe(1)
    session.dispose()
  })

  it("plans no typed pose while the app is locked", async () => {
    const session = await harness.load({ isLocked: () => true }).ready
    harness.source.send(controllerState({ mode: "MODE_CONTROL" }))

    session.targetPose.beginEdit()
    session.targetPose.setDraft("(1, 2, 3, 0, 0, 0)")
    await session.targetPose.confirmEdit()

    // A plan would have been tried (and failed against this fake NOVA),
    // staging the pose with an error; locked, nothing is planned or staged
    expect(session.targetPose.phase).toBe("editing")
    expect(session.targetPose.staged).toBeNull()
    session.dispose()
  })
})
