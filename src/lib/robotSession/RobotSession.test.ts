import type { Nova, RobotControllerState } from "@wandelbots/nova-js/v2"
import { beforeEach, describe, expect, it, vi } from "vitest"
import type { ControllerStateSource } from "../controllerStateSource"
import {
  createRobotSessionLoad,
  type LoadRobotSessionOptions,
} from "./loadRobotSession"
import { RobotModeChangeError } from "./RobotActivation"

// The load flow is ported from RobotPad (unit/robotPadRobotLoad.test.ts), the
// session from its ActiveRobotStore

const CONTROLLER_ID = "ur5e"
const MOTION_GROUP_ID = "0@ur5e"

function motionGroupState() {
  return {
    motion_group: MOTION_GROUP_ID,
    joint_position: [0, 0, 0, 0, 0, 0],
    joint_limit_reached: { limit_reached: [false] },
    tcp: "Flange",
    tcp_pose: { position: [400, 0, 300], orientation: [Math.PI, 0, 0] },
    flange_pose: { position: [400, 0, 300], orientation: [Math.PI, 0, 0] },
  }
}

function controllerState(
  overrides: Partial<Record<"mode" | "safety_state", string>> = {},
) {
  return {
    controller: CONTROLLER_ID,
    mode: "MODE_MONITOR",
    safety_state: "SAFETY_STATE_NORMAL",
    operation_mode: "OPERATION_MODE_AUTO",
    motion_groups: [motionGroupState()],
    ...overrides,
  } as unknown as RobotControllerState
}

/** A controller state source that the test feeds by hand */
class FakeStateSource extends EventTarget implements ControllerStateSource {
  readyState = 1
  url =
    "ws://nova.test/api/nats (subject: nova.v2.cells.cell.controllers.ur5e.state)"
  reconnect = vi.fn()
  close = vi.fn()
  firstMessage = vi.fn(async () => ({
    data: JSON.stringify(controllerState()),
  })) as unknown as () => Promise<MessageEvent>
  nextMessage = () =>
    new Promise<MessageEvent>((resolve) =>
      this.addEventListener("message", (e) => resolve(e as MessageEvent), {
        once: true,
      }),
    )
  parse = (data: unknown) => JSON.parse(data as string) as RobotControllerState

  send(state: RobotControllerState) {
    this.dispatchEvent(
      new MessageEvent("message", { data: JSON.stringify(state) }),
    )
  }
}

function makeHarness() {
  const socket = {
    url: "ws://nova.test/api/v2/cells/cell/controllers/ur5e/motion-groups/0@ur5e/state-stream",
    firstMessage: vi.fn().mockResolvedValue({
      data: JSON.stringify({ result: motionGroupState() }),
    }),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    close: vi.fn(),
    dispose: vi.fn(),
  }
  const source = new FakeStateSource()

  const api = {
    motionGroup: {
      getMotionGroupDescription: vi.fn().mockResolvedValue({
        motion_group_model: "UniversalRobots_UR5e",
        serial_number: "robot-serial-42",
        dh_parameters: [{ type: "REVOLUTE_JOINT" }],
        operation_limits: { auto_limits: { joints: [] } },
        tcps: { Flange: { name: "Flange", pose: {} } },
      }),
    },
    controller: {
      getRobotController: vi
        .fn()
        .mockResolvedValue({ configuration: { kind: "VirtualController" } }),
      listCoordinateSystems: vi
        .fn()
        .mockResolvedValue([{ coordinate_system: "" }]),
      getCurrentRobotControllerState: vi
        .fn()
        .mockResolvedValue(controllerState()),
      setDefaultMode: vi.fn().mockResolvedValue(undefined),
    },
    opts: {
      axiosInstance: {
        get: vi.fn(async (url: string) => ({
          data: url.endsWith("/description")
            ? { name: "custom-UniversalRobots_UR5e-1" }
            : { inverse_solver: "UR" },
        })),
      },
    },
  }

  const nova = {
    // MotionStreamConnection makes its own client from the instance URL
    config: { instanceUrl: "http://nova.test" },
    api,
    openReconnectingWebsocket: vi.fn().mockReturnValue(socket),
  } as unknown as Nova

  function load(options: LoadRobotSessionOptions = {}) {
    return createRobotSessionLoad(nova, MOTION_GROUP_ID, {
      stateSource: () => source,
      retryDelaysMs: [],
      ...options,
    })
  }

  return { api, socket, source, load }
}

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
