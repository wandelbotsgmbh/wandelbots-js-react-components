import type { Nova } from "@wandelbots/nova-js/v2"
// Ported from RobotPad (unit/loadRobotResources.test.ts)
import { AxiosError } from "axios"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { loadRobotResources } from "./loadRobotResources"
import { isRobotLoadStepError, RobotLoadProgress } from "./RobotLoadProgress"
import type { ControllerStateSource } from "../controllerStateSource"

const CELL_ID = "cell"
const CONTROLLER_ID = "ur5e"
const MOTION_GROUP_ID = "0@ur5e"

function makeMotionGroupState() {
  return {
    motion_group: MOTION_GROUP_ID,
    joint_position: [0, 0, 0, 0, 0, 0],
    joint_limit_reached: { limit_reached: [false] },
  }
}

function makeControllerState() {
  return {
    controller: CONTROLLER_ID,
    mode: "MODE_MONITOR",
    safety_state: "SAFETY_STATE_NORMAL",
    operation_mode: "OPERATION_MODE_AUTO",
    motion_groups: [makeMotionGroupState()],
  }
}

/** A websocket stand-in with just the surface the loader touches */
function makeSocketMock() {
  return {
    firstMessage: vi.fn().mockResolvedValue({
      data: JSON.stringify({ result: makeMotionGroupState() }),
    }),
    close: vi.fn(),
    dispose: vi.fn(),
  }
}

/** A controller state source stand-in with just the surface the loader touches */
function makeNatsMock() {
  return {
    firstMessage: vi.fn().mockResolvedValue({
      data: JSON.stringify(makeControllerState()),
    }),
    url: "ws://nova.test:80/api/nats (subject: nova.v2.cells.cell.controllers.ur5e.state)",
    // NATS sends the controller state itself
    parse: (data: unknown) => JSON.parse(data as string),
    close: vi.fn(),
  }
}

type Harness = ReturnType<typeof makeHarness>

function makeHarness(overrides: Record<string, unknown> = {}) {
  const socket = makeSocketMock()
  const nats = makeNatsMock()

  const api = {
    motionGroup: {
      getMotionGroupDescription: vi.fn().mockResolvedValue({
        motion_group_model: "UniversalRobots_UR5e",
        serial_number: "robot-serial-42",
        dh_parameters: [{ type: "JOINT_TYPE_REVOLUTE" }],
        operation_limits: { auto_limits: { joints: [] } },
        tcps: {},
      }),
    },
    controller: {
      getRobotController: vi
        .fn()
        .mockResolvedValue({ configuration: { kind: "VirtualController" } }),
      listCoordinateSystems: vi
        .fn()
        .mockResolvedValue([{ coordinate_system: "world" }]),
      getCurrentRobotControllerState: vi
        .fn()
        .mockResolvedValue(makeControllerState()),
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
    ...overrides,
  }

  const nova = {
    api,
    openReconnectingWebsocket: vi.fn().mockReturnValue(socket),
  } as unknown as Nova

  const progress = new RobotLoadProgress(MOTION_GROUP_ID, CONTROLLER_ID)

  return { api, nova, progress, socket, nats }
}

function run(harness: Harness, options: Record<string, unknown> = {}) {
  return loadRobotResources({
    nova: harness.nova,
    cellId: CELL_ID,
    controllerId: CONTROLLER_ID,
    motionGroupId: MOTION_GROUP_ID,
    progress: harness.progress,
    createStateSource: () => harness.nats as unknown as ControllerStateSource,
    ...options,
  })
}

describe("loadRobotResources", () => {
  let harness: Harness

  beforeEach(() => {
    harness = makeHarness()
  })

  it("fetches each piece of robot data exactly once", async () => {
    await run(harness)

    // Previously the description was fetched three times and the kinematic
    // model twice for a single robot selection
    expect(
      harness.api.motionGroup.getMotionGroupDescription,
    ).toHaveBeenCalledTimes(1)
    expect(harness.api.opts.axiosInstance.get).toHaveBeenCalledWith(
      "/experimental/motion-group-models/UniversalRobots_UR5e/kinematic",
      { params: { serial_number: "robot-serial-42" } },
    )
    expect(harness.api.controller.listCoordinateSystems).toHaveBeenCalledTimes(
      1,
    )
  })

  it("forwards the virtual serial without selecting a model from controller type", async () => {
    harness.api.controller.getRobotController.mockResolvedValue({
      configuration: {
        kind: "VirtualController",
        type: "custom-ABB_1010_037_15-copy1",
      },
    })

    harness.api.motionGroup.getMotionGroupDescription.mockResolvedValue({
      motion_group_model: "UniversalRobots_UR5e",
      serial_number: "VR-SERIAL-42",
      dh_parameters: [{ type: "JOINT_TYPE_REVOLUTE" }],
      operation_limits: { auto_limits: { joints: [] } },
      tcps: {},
    })

    await run(harness)

    expect(harness.api.opts.axiosInstance.get).toHaveBeenCalledWith(
      "/experimental/motion-group-models/UniversalRobots_UR5e/kinematic",
      { params: { serial_number: "VR-SERIAL-42" } },
    )
  })

  it("forwards physical robot serial numbers", async () => {
    harness.api.controller.getRobotController.mockResolvedValue({
      configuration: { kind: "UniversalRobotsController" },
    })

    await run(harness)

    expect(harness.api.opts.axiosInstance.get).toHaveBeenCalledWith(
      "/experimental/motion-group-models/UniversalRobots_UR5e/kinematic",
      { params: { serial_number: "robot-serial-42" } },
    )
  })

  it("hands over the model registered for the robot's serial number", async () => {
    const resources = await run(harness)

    expect(harness.api.opts.axiosInstance.get).toHaveBeenCalledWith(
      "/experimental/motion-group-models/UniversalRobots_UR5e/description",
      { params: { serial_number: "robot-serial-42" } },
    )
    expect(resources?.motionGroupModelName).toBe(
      "custom-UniversalRobots_UR5e-1",
    )
  })

  it("reports every step as succeeded on a clean load", async () => {
    const resources = await run(harness)

    expect(resources).not.toBeNull()
    expect(harness.progress.isComplete).toBe(true)
    expect(harness.progress.succeededCount).toBe(harness.progress.totalCount)
    expect(harness.progress.isFailed).toBe(false)
  })

  it("opens the controller state source of this robot's controller and hands it over", async () => {
    const createStateSource = vi.fn(
      () => harness.nats as unknown as ControllerStateSource,
    )

    const resources = await run(harness, { createStateSource })

    expect(createStateSource).toHaveBeenCalledWith({
      cellId: CELL_ID,
      controllerId: CONTROLLER_ID,
    })
    expect(resources?.stateSource).toBe(harness.nats)
    expect(resources?.initialControllerState.controller).toBe(CONTROLLER_ID)
  })

  it("marks the step that failed and reports it on the error", async () => {
    harness.api.opts.axiosInstance.get.mockRejectedValue(
      new AxiosError("Network Error", AxiosError.ERR_NETWORK),
    )

    const err = await run(harness).catch((e) => e)

    expect(isRobotLoadStepError(err)).toBe(true)
    expect(err.stepId).toBe("kinematicModel")
    expect(harness.progress.failedStep?.id).toBe("kinematicModel")
    // The steps before it still count as done, so the user sees how far we got
    expect(harness.progress.succeededCount).toBe(2)
    expect(harness.progress.failedStep?.url).toContain("kinematic")
  })

  it("reports the stable endpoint when the serial number is missing", async () => {
    harness.api.motionGroup.getMotionGroupDescription.mockResolvedValue({
      motion_group_model: "UniversalRobots_UR5e",
      serial_number: "",
      dh_parameters: [{ type: "JOINT_TYPE_REVOLUTE" }],
      operation_limits: { auto_limits: { joints: [] } },
      tcps: {},
    })
    harness.api.opts.axiosInstance.get.mockRejectedValue(
      new AxiosError("Network Error", AxiosError.ERR_NETWORK),
    )

    await run(harness).catch(() => undefined)

    expect(harness.progress.failedStep?.url).toBe(
      "/motion-group-models/UniversalRobots_UR5e/kinematic",
    )
  })

  it("reports the stable endpoint when the fallback request fails", async () => {
    harness.api.opts.axiosInstance.get
      .mockRejectedValueOnce(
        Object.assign(new AxiosError("Not found"), {
          response: { status: 404 },
        }),
      )
      .mockRejectedValueOnce(
        new AxiosError("Network Error", AxiosError.ERR_NETWORK),
      )

    await run(harness).catch(() => undefined)

    expect(harness.progress.failedStep?.url).toBe(
      "/motion-group-models/UniversalRobots_UR5e/kinematic",
    )
  })

  it("closes sockets it already opened when a later step fails", async () => {
    harness.nats.firstMessage.mockRejectedValue(new Error("nats is down"))

    await run(harness).catch(() => undefined)

    // The motion state websocket is opened before the NATS connection
    expect(harness.socket.dispose).toHaveBeenCalled()
    expect(harness.nats.close).toHaveBeenCalled()
  })

  it("fails the stream step instead of hanging forever when no message arrives", async () => {
    harness.nats.firstMessage.mockImplementation(() => new Promise(() => {}))

    const err = await run(harness, { socketTimeoutMs: 20 }).catch((e) => e)

    expect(isRobotLoadStepError(err)).toBe(true)
    expect(err.stepId).toBe("controllerStateStream")
    expect(harness.progress.failedStep?.id).toBe("controllerStateStream")
  })

  it("stops without reporting a failure when superseded before opening anything", async () => {
    let calls = 0
    const resources = await run(harness, {
      isStale: () => {
        calls += 1
        // Stale from the second check onwards, i.e. before any stream is opened
        return calls > 1
      },
    })

    expect(resources).toBeNull()
    expect(harness.progress.isFailed).toBe(false)
    expect(harness.socket.dispose).not.toHaveBeenCalled()
  })

  it("closes the motion state socket when superseded after opening it", async () => {
    // The stale check that follows the motionStateStream step is the 8th; by
    // then the websocket is open and nothing else will ever own it
    let calls = 0
    const resources = await run(harness, {
      isStale: () => {
        calls += 1
        return calls >= 8
      },
    })

    expect(resources).toBeNull()
    expect(harness.progress.steps.at(-2)?.status).toBe("succeeded")
    expect(harness.socket.dispose).toHaveBeenCalled()
  })

  it("fails the controller state stream step when the state does not list the motion group", async () => {
    // A controller that is still starting up publishes state without this
    // motion group. That used to parse fine here and then throw out of
    // ControllerStateStream's constructor, where it was neither retried nor
    // attributed to a step - and leaked both streams.
    harness.nats.firstMessage.mockResolvedValue({
      data: JSON.stringify({ ...makeControllerState(), motion_groups: [] }),
    })

    const err = await run(harness).catch((e) => e)

    expect(isRobotLoadStepError(err)).toBe(true)
    expect(err.stepId).toBe("controllerStateStream")
    expect(harness.progress.failedStep?.id).toBe("controllerStateStream")
    expect(harness.socket.dispose).toHaveBeenCalled()
    expect(harness.nats.close).toHaveBeenCalled()
  })
})
