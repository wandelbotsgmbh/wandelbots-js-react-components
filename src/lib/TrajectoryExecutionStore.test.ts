import {
  type CoordinateSystem,
  JointTypeEnum,
  type MotionGroupState,
  type PlanTrajectoryRequest,
  type PlanTrajectoryResponse,
} from "@wandelbots/nova-js/v2"
import { autorun, observable, runInAction } from "mobx"
import { describe, expect, onTestFinished, test, vi } from "vitest"
import type { JoggingStore } from "../components/jogging/JoggingStore"
import type { JoggerConnection, JoggerMode } from "./JoggerConnection"
import type { RobotNotMoveableReason } from "./robotSession/RobotSafety"
import {
  type TrajectoryExecutionStoreOptions,
  type TrajectoryTarget,
  TrajectoryExecutionStore,
} from "./TrajectoryExecutionStore"

// Ported from RobotPad (unit/TrajectoryExecutionStore.test.ts), with tests for
// what the library adds: the default movement ownership, joint targets, the
// socket's states and the release of the execution session.

const coordinateSystems = [
  {
    coordinate_system: "world",
    name: "World",
    reference_coordinate_system: "",
    position: [0, 0, 0],
    orientation: [0, 0, 0],
    orientation_type: "ROTATION_VECTOR",
  },
  {
    coordinate_system: "offset-300x",
    name: "300mm X Axis Offset",
    reference_coordinate_system: "",
    position: [300, 0, 0],
    orientation: [0, 0, 0],
    orientation_type: "ROTATION_VECTOR",
  },
  {
    coordinate_system: "rotated-offset",
    name: "Rotated offset",
    reference_coordinate_system: "offset-300x",
    position: [0, 100, 0],
    orientation: [0, 0, Math.PI / 2],
    orientation_type: "ROTATION_VECTOR",
  },
  {
    coordinate_system: "nested-offset",
    name: "Nested offset",
    reference_coordinate_system: "rotated-offset",
    position: [0, 100, 0],
    orientation: [0, 0, -Math.PI / 2],
    orientation_type: "ROTATION_VECTOR",
  },
] satisfies CoordinateSystem[]

/** A trajectory execution websocket that records what the store sends */
function makeFakeSocket() {
  const listeners = new Set<(event: MessageEvent) => void>()
  return {
    addEventListener: vi.fn(
      (type: string, listener: (event: MessageEvent) => void) => {
        if (type === "message") listeners.add(listener)
      },
    ),
    removeEventListener: vi.fn(
      (type: string, listener: (event: MessageEvent) => void) => {
        if (type === "message") listeners.delete(listener)
      },
    ),
    sendJson: vi.fn(),
    dispose: vi.fn(),
    /** Delivers a message of NOVA to the store */
    emit(result: object) {
      for (const listener of listeners) {
        listener({ data: JSON.stringify({ result }) } as MessageEvent)
      }
    },
  }
}

type FakeSocket = ReturnType<typeof makeFakeSocket>

/**
 * A jogging store and its jogger with the parts the trajectory store reads,
 * with the planner and the execution websocket faked out
 */
function makeStore({
  joggerMode = "trajectory",
  motionGroupModel = "custom-TestRobot-1",
  jointType = JointTypeEnum.RevoluteJoint,
  ...options
}: Partial<Omit<TrajectoryExecutionStoreOptions, "joggingStore">> & {
  joggerMode?: JoggerMode
  motionGroupModel?: string
  /** The joints of the motion group: revolute, or the linear axes of a rail */
  jointType?: JointTypeEnum
} = {}) {
  const planTrajectory = vi.fn(
    async (
      _cell: string,
      _request: PlanTrajectoryRequest,
    ): Promise<PlanTrajectoryResponse> => ({
      response: {
        joint_positions: [
          [0, 0, 0, 0, 0, 0],
          [0.1, 0, 0, 0, 0, 0],
        ],
        times: [0, 1],
        locations: [0, 1],
      },
    }),
  )

  const sockets: FakeSocket[] = []
  const openReconnectingWebsocket = vi.fn((_path: string) => {
    const socket = makeFakeSocket()
    sockets.push(socket)
    return socket
  })

  // The streamed state is observable, like the one of MotionStreamConnection
  const motionState = observable({
    joint_position: [0, 0, 0, 0, 0, 0],
    standstill: true,
    execute: undefined as MotionGroupState["execute"],
  })

  const jogger = {
    mode: joggerMode,
    options: { motionGroupModel },
    cellId: "cell",
    motionGroupId: "0@controller",
    nova: {
      api: { trajectoryPlanning: { planTrajectory } },
      openReconnectingWebsocket,
    },
    motionStream: {
      controllerId: "controller",
      description: {
        motion_group_model: "TestRobot",
        cycle_time: 10,
        mounting: undefined,
        tcps: {
          tcp1: {
            name: "tcp1",
            pose: { position: [0, 0, 10], orientation: [0, 0, 0] },
          },
        },
      },
      rapidlyChangingMotionState: motionState,
    },
    setJoggingMode: vi.fn(async (mode: JoggerMode) => {
      jogger.mode = mode
    }),
  }

  const joggingStore = {
    jogger: jogger as unknown as JoggerConnection,
    selectedTcpId: "tcp1",
    selectedCoordSystemId: "world",
    coordSystems: coordinateSystems,
    translationVelocityMmPerSec: 50,
    rotationVelocityRadsPerSec: 1,
    jointType,
    deactivate: vi.fn(async () => {}),
  }

  const store = new TrajectoryExecutionStore({
    joggingStore: joggingStore as unknown as JoggingStore,
    ...options,
  })
  onTestFinished(() => store.dispose())

  /** Delivers a message on the store's current trajectory socket */
  const emit = (kind: string, fields: object = {}) =>
    sockets.at(-1)?.emit({ kind, ...fields })

  /** Sets the execution state that the motion stream reports */
  const setExecutionState = (kind: string) =>
    runInAction(() => {
      motionState.execute = {
        joint_position: [],
        details: {
          kind: "TRAJECTORY",
          trajectory: "trajectory",
          location: 1,
          state: { kind },
        },
      } as unknown as MotionGroupState["execute"]
    })

  return {
    store,
    planTrajectory,
    sockets,
    emit,
    jogger,
    joggingStore,
    motionState,
    setExecutionState,
  }
}

function plannedRequest(
  planTrajectory: ReturnType<typeof makeStore>["planTrajectory"],
) {
  const request = planTrajectory.mock.calls.at(-1)?.[1]
  if (!request) {
    throw new Error("Expected a trajectory request")
  }
  return request
}

function plannedTargetPose(
  planTrajectory: ReturnType<typeof makeStore>["planTrajectory"],
) {
  const path = plannedRequest(planTrajectory).motion_commands[0]?.path
  expect(path?.path_definition_name).toBe("PathCartesianPTP")
  if (path?.path_definition_name !== "PathCartesianPTP") {
    throw new Error("Expected a cartesian trajectory request")
  }
  return path.target_pose
}

function cartesianTarget(coordinateSystemId?: string) {
  return {
    type: "cartesian" as const,
    pose: { position: [100, 50, 25], orientation: [0, 0, 0] },
    coordinateSystemId,
  } satisfies TrajectoryTarget
}

/** Lets queued promise callbacks run */
async function flushPromises() {
  for (let i = 0; i < 20; i++) await Promise.resolve()
}

/** Every message the store sent on a socket, by its type */
function sentMessageTypes(socket: FakeSocket | undefined) {
  return socket?.sendJson.mock.calls.map(
    ([message]) => (message as { message_type: string }).message_type,
  )
}

describe("TrajectoryExecutionStore.planTrajectory", () => {
  test("plans with the model the jogger plans step jogs with, so a custom copy's data is used", async () => {
    const { store, planTrajectory } = makeStore()

    await store.planTrajectory(cartesianTarget("world"))

    expect(
      plannedRequest(planTrajectory).motion_group_setup.motion_group_model,
    ).toBe("custom-TestRobot-1")
  })

  test("plans with the model of the motion group description without a model of the jogger", async () => {
    const { store, planTrajectory, jogger } = makeStore()
    jogger.options = {} as typeof jogger.options

    await store.planTrajectory(cartesianTarget("world"))

    expect(
      plannedRequest(planTrajectory).motion_group_setup.motion_group_model,
    ).toBe("TestRobot")
  })

  test.each([
    "world",
    "",
    undefined,
  ])("sends a %j world-frame pose through unchanged", async (coordinateSystemId) => {
    const { store, planTrajectory } = makeStore()
    const target = cartesianTarget(coordinateSystemId)
    target.pose.orientation = [0.1, 0.2, 0.3]
    const result = await store.planTrajectory(target)

    expect(result.ok).toBe(true)
    expect(plannedTargetPose(planTrajectory)).toEqual(target.pose)
  })

  test("transforms a pose from its coordinate system into world before planning", async () => {
    const { store, planTrajectory } = makeStore()
    const target = cartesianTarget("offset-300x")
    const result = await store.planTrajectory(target)

    expect(result.ok).toBe(true)
    const targetPose = plannedTargetPose(planTrajectory)
    // The planner reads target_pose as world coordinates; the typed values
    // were in a frame 300mm along x
    expect(targetPose?.position?.[0]).toBeCloseTo(400)
    expect(targetPose?.position?.[1]).toBeCloseTo(50)
    expect(targetPose?.position?.[2]).toBeCloseTo(25)
    expect(targetPose.orientation).toEqual([0, 0, 0])
    // Leave the target in its own coordinate system, and keep the TCP in
    // motion_group_setup (no extra flange transform)
    expect(target).toEqual(cartesianTarget("offset-300x"))
    expect(
      plannedRequest(planTrajectory).motion_group_setup.tcp_offset,
    ).toEqual({
      position: [0, 0, 10],
      orientation: [0, 0, 0],
    })
  })

  test("composes frame and target rotations as well as positions", async () => {
    const { store, planTrajectory } = makeStore()
    const target = cartesianTarget("rotated-offset")
    target.pose.orientation = [Math.PI / 2, 0, 0]

    expect(await store.planTrajectory(target)).toEqual({ ok: true })

    const targetPose = plannedTargetPose(planTrajectory)
    for (const [index, value] of [250, 200, 25].entries()) {
      expect(targetPose.position?.[index]).toBeCloseTo(value)
    }
    // Rz(90 degrees) * Rx(90 degrees) is a 120-degree rotation about [1,1,1].
    for (const component of targetPose.orientation ?? []) {
      expect(component).toBeCloseTo((2 * Math.PI) / (3 * Math.sqrt(3)))
    }
    expect(targetPose.orientation).toHaveLength(3)
  })

  test("resolves nested coordinate systems independently of the displayed one", async () => {
    const { store, planTrajectory, joggingStore } = makeStore()
    joggingStore.selectedCoordSystemId = "rotated-offset"

    expect(
      await store.planTrajectory(cartesianTarget("nested-offset")),
    ).toEqual({ ok: true })

    const targetPose = plannedTargetPose(planTrajectory)
    for (const [index, value] of [300, 150, 25].entries()) {
      expect(targetPose.position?.[index]).toBeCloseTo(value)
      expect(targetPose.orientation?.[index]).toBeCloseTo(0)
    }
  })

  test("plans a cartesian target with the translation velocity of the jogging store", async () => {
    const { store, planTrajectory } = makeStore()

    await store.planTrajectory(cartesianTarget("world"))

    expect(
      plannedRequest(planTrajectory).motion_commands[0]?.limits_override,
    ).toEqual({ tcp_velocity_limit: 50 })
  })

  test("leaves joint targets unchanged, with the rotation velocity of the jogging store for each joint", async () => {
    const { store, planTrajectory } = makeStore()
    const joints = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]

    expect(await store.planTrajectory({ type: "joint", joints })).toEqual({
      ok: true,
    })

    const [command] = plannedRequest(planTrajectory).motion_commands
    expect(command?.path).toEqual({
      path_definition_name: "PathJointPTP",
      target_joint_position: joints,
    })
    expect(command?.limits_override).toEqual({
      joint_velocity_limits: [1, 1, 1, 1, 1, 1],
    })
  })

  // A linear axis moves in mm: its joint velocity is the jogging store's
  // translation velocity, as when it is jogged. The rotation velocity is a
  // number of rad/s, which as mm/s is no speed at all.
  test("plans the joints of a linear axis with the translation velocity, and is outdated when that one changes", async () => {
    const { store, planTrajectory, emit, joggingStore } = makeStore({
      jointType: JointTypeEnum.PrismaticJoint,
    })

    await store.planTrajectory({ type: "joint", joints: [250, 0, 0, 0, 0, 0] })
    emit("INITIALIZE_RECEIVED")

    expect(
      plannedRequest(planTrajectory).motion_commands[0]?.limits_override,
    ).toEqual({ joint_velocity_limits: [50, 50, 50, 50, 50, 50] })
    joggingStore.rotationVelocityRadsPerSec = 0.5
    expect(store.isPlanOutdated).toBe(false)
    joggingStore.translationVelocityMmPerSec = 10
    expect(store.isPlanOutdated).toBe(true)
  })

  test("plans from the current joints of the motion stream", async () => {
    const { store, planTrajectory, motionState } = makeStore()
    runInAction(() => {
      motionState.joint_position = [1, 2, 3, 4, 5, 6]
    })

    await store.planTrajectory(cartesianTarget("world"))

    expect(plannedRequest(planTrajectory).start_joint_position).toEqual([
      1, 2, 3, 4, 5, 6,
    ])
  })

  test("reports an unresolvable coordinate system as a planner rejection", async () => {
    const { store, planTrajectory, sockets } = makeStore()
    store.plannedTrajectory = { startJoints: [0], endJoints: [0.1] }
    const result = await store.planTrajectory(cartesianTarget("deleted-frame"))

    expect(result).toEqual({ ok: false, errorFeedbackName: "FeedbackUnknown" })
    expect(planTrajectory).not.toHaveBeenCalled()
    expect(sockets.at(-1)?.sendJson).not.toHaveBeenCalled()
    expect(store.plannedTrajectory).toBeNull()
    expect(store.trajectoryState).toBe("idle")
  })

  test("returns the planner's rejection and leaves no plan", async () => {
    const { store, planTrajectory, sockets } = makeStore()
    store.plannedTrajectory = { startJoints: [0], endJoints: [0.1] }
    planTrajectory.mockResolvedValueOnce({
      response: {
        error_feedback: { error_feedback_name: "FeedbackOutOfWorkspace" },
        error_location_on_trajectory: 0,
      },
    } as PlanTrajectoryResponse)

    const result = await store.planTrajectory(cartesianTarget("world"))

    expect(result).toEqual({
      ok: false,
      errorFeedbackName: "FeedbackOutOfWorkspace",
    })
    expect(sockets.at(-1)?.sendJson).not.toHaveBeenCalled()
    expect(store.plannedTrajectory).toBeNull()
    expect(store.trajectoryState).toBe("idle")
  })

  test("does not stay in planning when the planner cannot be reached", async () => {
    const { store, planTrajectory } = makeStore()
    planTrajectory.mockRejectedValueOnce(new Error("Network Error"))

    await expect(
      store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow("Network Error")

    expect(store.trajectoryState).toBe("idle")
  })

  test("initializes the planned trajectory on the execution websocket", async () => {
    const { store, sockets } = makeStore()

    expect(await store.planTrajectory(cartesianTarget("world"))).toEqual({
      ok: true,
    })

    expect(sockets).toHaveLength(1)
    expect(sockets[0]?.sendJson).toHaveBeenCalledWith({
      message_type: "InitializeMovementRequest",
      trajectory: {
        message_type: "TrajectoryData",
        motion_group: "0@controller",
        tcp: "tcp1",
        data: {
          joint_positions: [
            [0, 0, 0, 0, 0, 0],
            [0.1, 0, 0, 0, 0, 0],
          ],
          times: [0, 1],
          locations: [0, 1],
        },
      },
    })
    expect(store.plannedTrajectory).toEqual({
      startJoints: [0, 0, 0, 0, 0, 0],
      endJoints: [0.1, 0, 0, 0, 0, 0],
    })
    expect(store.trajectoryState).toBe("planning")
  })

  test("opens the execution websocket of the jogger's controller", () => {
    const { jogger } = makeStore()

    expect(jogger.nova.openReconnectingWebsocket).toHaveBeenCalledWith(
      "/cells/cell/controllers/controller/execution/trajectory",
    )
  })

  test("refuses to plan while the app locks the robot", async () => {
    const { store, planTrajectory } = makeStore({ isLocked: () => true })
    store.plannedTrajectory = { startJoints: [0], endJoints: [0.1] }

    await expect(
      store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow("locked")

    expect(planTrajectory).not.toHaveBeenCalled()
    expect(store.plannedTrajectory).toBeNull()
  })

  // NOVA switches a controller to control mode by itself for a movement
  // request, and holds it there while it holds the trajectory
  test("refuses to plan while the robot may not move", async () => {
    const { store, planTrajectory, sockets } = makeStore({
      notMoveableReason: () => ({ code: "deactivated" }),
    })

    await expect(
      store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow("may not move (deactivated)")

    expect(planTrajectory).not.toHaveBeenCalled()
    expect(sentMessageTypes(sockets.at(-1))).toEqual([])
  })

  // Planning takes a round trip
  test.each<[string, Partial<TrajectoryExecutionStoreOptions>, string]>([
    [
      "the robot may no longer move",
      { notMoveableReason: () => (planned ? { code: "deactivated" } : null) },
      "may not move (deactivated)",
    ],
    ["the app locks the robot", { isLocked: () => planned }, "locked"],
  ])("sends no trajectory to NOVA when %s once it is planned", async (_name, options, message) => {
    planned = false
    const { store, planTrajectory, sockets } = makeStore(options)
    const plan = planTrajectory.getMockImplementation()
    planTrajectory.mockImplementation(async (...args) => {
      planned = true
      return plan?.(...args) as never
    })

    await expect(
      store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow(message)

    expect(planTrajectory).toHaveBeenCalledOnce()
    expect(sentMessageTypes(sockets.at(-1))).toEqual([])
    expect(store.trajectoryState).toBe("idle")
    expect(store.plannedTrajectory).toBeNull()
  })
})

/** Set by the planner of a test, once it has planned */
let planned = false

describe("TrajectoryExecutionStore movement ownership", () => {
  test("by default ends continuous jogging and puts the jogger into trajectory mode before planning", async () => {
    const { store, planTrajectory, jogger, joggingStore } = makeStore({
      joggerMode: "jogging",
    })
    planTrajectory.mockImplementationOnce(async () => {
      // Owned before planning, so the plan starts from joints that stay
      expect(joggingStore.deactivate).toHaveBeenCalled()
      expect(jogger.setJoggingMode).toHaveBeenCalledWith("trajectory")
      return {
        response: {
          joint_positions: [[0], [0.1]],
          times: [0, 1],
          locations: [0, 1],
        },
      }
    })

    expect(await store.planTrajectory(cartesianTarget("world"))).toEqual({
      ok: true,
    })
    expect(jogger.mode).toBe("trajectory")
  })

  test("by default leaves a jogger that is in trajectory mode alone", async () => {
    const { store, jogger, joggingStore } = makeStore({
      joggerMode: "trajectory",
    })

    await store.planTrajectory(cartesianTarget("world"))

    expect(joggingStore.deactivate).not.toHaveBeenCalled()
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
  })

  test("uses the app's own ownership instead", async () => {
    const ensureMovementOwnership = vi.fn(async () => {})
    const { store, jogger, joggingStore } = makeStore({
      joggerMode: "jogging",
      ensureMovementOwnership,
    })

    await store.planTrajectory(cartesianTarget("world"))

    expect(ensureMovementOwnership).toHaveBeenCalledOnce()
    expect(joggingStore.deactivate).not.toHaveBeenCalled()
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
  })
})

describe("TrajectoryExecutionStore execution", () => {
  async function plan(store: TrajectoryExecutionStore) {
    expect(await store.planTrajectory(cartesianTarget("world"))).toEqual({
      ok: true,
    })
  }

  test("is planned once NOVA accepts the trajectory", async () => {
    const { store, emit } = makeStore()
    await plan(store)

    emit("INITIALIZE_RECEIVED")

    expect(store.trajectoryState).toBe("planned")
  })

  test("drops a trajectory that NOVA refuses", async () => {
    const { store, emit } = makeStore()
    await plan(store)

    emit("INITIALIZE_RECEIVED", {
      add_trajectory_error: { message: "invalid" },
    })

    expect(store.trajectoryState).toBe("idle")
    expect(store.plannedTrajectory).toBeNull()
  })

  test("drops a trajectory whose initialization NOVA answers with an error message, and says why", async () => {
    const { store, emit } = makeStore()
    await plan(store)

    emit("INITIALIZE_RECEIVED", {
      message: "Trajectory does not start at the current joints",
    })

    expect(store.trajectoryState).toBe("idle")
    expect(store.plannedTrajectory).toBeNull()
    expect(store.lastError).toBe(
      "Trajectory does not start at the current joints",
    )
  })

  test("starts a planned trajectory and moves once NOVA confirms", async () => {
    const { store, emit, sockets } = makeStore()
    await plan(store)
    emit("INITIALIZE_RECEIVED")

    store.start()
    expect(sockets.at(-1)?.sendJson).toHaveBeenLastCalledWith({
      message_type: "StartMovementRequest",
      direction: "DIRECTION_FORWARD",
    })

    emit("START_RECEIVED")
    expect(store.trajectoryState).toBe("moving")
  })

  test("refuses to start without a planned trajectory", () => {
    const { store } = makeStore()

    expect(() => store.start()).toThrow("no planned trajectory")
  })

  test("refuses to start before NOVA accepted the trajectory", async () => {
    const { store } = makeStore()
    await plan(store)

    expect(() => store.start()).toThrow('expected state "planned"')
  })

  // NOVA switches a controller to control mode by itself for a start
  test.each<
    [
      string,
      (refused: () => boolean) => Partial<TrajectoryExecutionStoreOptions>,
      string,
    ]
  >([
    [
      "the robot may not move",
      (refused) => ({
        notMoveableReason: () => (refused() ? { code: "deactivated" } : null),
      }),
      "may not move (deactivated)",
    ],
    ["the app locks the robot", (refused) => ({ isLocked: refused }), "locked"],
  ])("refuses to start while %s, and starts once it may", async (_name, options, message) => {
    let refused = false
    const { store, emit, sockets } = makeStore(options(() => refused))
    await plan(store)
    emit("INITIALIZE_RECEIVED")
    refused = true

    expect(() => store.start()).toThrow(message)
    expect(sentMessageTypes(sockets.at(-1))).not.toContain(
      "StartMovementRequest",
    )

    refused = false
    store.start()
    expect(sentMessageTypes(sockets.at(-1))).toContain("StartMovementRequest")
  })

  test("keeps the error of a motion and drops the plan", async () => {
    const { store, emit } = makeStore()
    await plan(store)
    emit("INITIALIZE_RECEIVED")
    store.start()
    emit("START_RECEIVED")

    emit("MOTION_ERROR", { message: "Collision detected" })

    expect(store.lastError).toBe("Collision detected")
    expect(store.trajectoryState).toBe("idle")
    expect(store.plannedTrajectory).toBeNull()

    store.clearError()
    expect(store.lastError).toBeNull()
  })

  test("drops the plan once the motion stream reports the end of the trajectory", async () => {
    const { store, emit, setExecutionState } = makeStore()
    await plan(store)
    emit("INITIALIZE_RECEIVED")
    store.start()
    emit("START_RECEIVED")
    setExecutionState("RUNNING")
    expect(store.executionState).toBe("RUNNING")

    setExecutionState("END_OF_TRAJECTORY")

    expect(store.trajectoryState).toBe("idle")
    expect(store.plannedTrajectory).toBeNull()
  })

  test("stopAndReset pauses a moving robot, waits for it to stand still and opens a new execution websocket", async () => {
    const { store, emit, sockets, motionState } = makeStore()
    await plan(store)
    emit("INITIALIZE_RECEIVED")
    store.start()
    emit("START_RECEIVED")
    runInAction(() => {
      motionState.standstill = false
    })
    const firstSocket = sockets[0]

    const stopped = store.stopAndReset()
    expect(sentMessageTypes(firstSocket)).toContain("PauseMovementRequest")
    // The execution session stays until the robot stands still
    expect(firstSocket?.dispose).not.toHaveBeenCalled()

    runInAction(() => {
      motionState.standstill = true
    })
    await stopped

    expect(firstSocket?.dispose).toHaveBeenCalled()
    expect(sockets).toHaveLength(2)
    expect(store.trajectoryState).toBe("idle")
    expect(store.plannedTrajectory).toBeNull()
  })

  test("stopAndReset releases an armed trajectory without a pause", async () => {
    const { store, emit, sockets } = makeStore()
    await plan(store)
    emit("INITIALIZE_RECEIVED")

    await store.stopAndReset()

    expect(sentMessageTypes(sockets[0])).not.toContain("PauseMovementRequest")
    expect(sockets[0]?.dispose).toHaveBeenCalled()
    expect(sockets).toHaveLength(2)
    expect(store.trajectoryState).toBe("idle")
  })

  test("listens on the new execution websocket after stopAndReset", async () => {
    const { store, emit } = makeStore()
    await store.stopAndReset()
    await plan(store)

    emit("INITIALIZE_RECEIVED")

    expect(store.trajectoryState).toBe("planned")
  })

  test("dispose closes the execution websocket and stops following the motion stream", async () => {
    const { store, emit, sockets, setExecutionState } = makeStore()
    await plan(store)
    emit("INITIALIZE_RECEIVED")

    store.dispose()
    setExecutionState("END_OF_TRAJECTORY")

    expect(sockets[0]?.dispose).toHaveBeenCalled()
    expect(store.trajectoryState).toBe("planned")
  })
})

// NOVA keeps a trajectory it accepted until the execution websocket closes:
// it holds the controller's execution session, which blocks jogging and keeps
// the controller in control mode
describe("TrajectoryExecutionStore execution session", () => {
  /** Plans a trajectory that NOVA accepts: it is armed on the first socket */
  async function armed(options: Parameters<typeof makeStore>[0] = {}) {
    const made = makeStore(options)
    expect(made.store.holdsExecutionSession).toBe(false)
    await made.store.planTrajectory(cartesianTarget("world"))
    made.emit("INITIALIZE_RECEIVED")
    expect(made.store.trajectoryState).toBe("planned")
    expect(made.store.holdsExecutionSession).toBe(true)
    return made
  }

  /** The first socket was closed and replaced, so NOVA holds nothing */
  function expectSessionHandedBack(made: Awaited<ReturnType<typeof armed>>) {
    expect(made.sockets[0]?.dispose).toHaveBeenCalled()
    expect(made.sockets).toHaveLength(2)
    expect(made.store.holdsExecutionSession).toBe(false)
    expect(made.store.plannedTrajectory).toBeNull()
    expect(made.store.trajectoryState).toBe("idle")
  }

  test("a target that the planner rejects takes the trajectory before it off the controller", async () => {
    const made = await armed()
    made.planTrajectory.mockResolvedValueOnce({
      response: {
        error_feedback: { error_feedback_name: "FeedbackOutOfWorkspace" },
        error_location_on_trajectory: 0,
      },
    } as PlanTrajectoryResponse)

    expect(await made.store.planTrajectory(cartesianTarget("world"))).toEqual({
      ok: false,
      errorFeedbackName: "FeedbackOutOfWorkspace",
    })

    expectSessionHandedBack(made)
  })

  test("a target in a deleted coordinate system takes the trajectory before it off the controller", async () => {
    const made = await armed()

    expect(
      await made.store.planTrajectory(cartesianTarget("deleted-frame")),
    ).toEqual({ ok: false, errorFeedbackName: "FeedbackUnknown" })

    expectSessionHandedBack(made)
  })

  test("a planner that cannot be reached takes the trajectory before it off the controller", async () => {
    const made = await armed()
    made.planTrajectory.mockRejectedValueOnce(new Error("Network Error"))

    await expect(
      made.store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow("Network Error")

    expectSessionHandedBack(made)
  })

  test("a plan refused by the app's lock takes the trajectory before it off the controller", async () => {
    let locked = false
    const made = await armed({ isLocked: () => locked })
    locked = true

    await expect(
      made.store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow("locked")

    expectSessionHandedBack(made)
  })

  test("a plan without joint positions takes the trajectory before it off the controller", async () => {
    const made = await armed()
    made.planTrajectory.mockResolvedValueOnce({
      response: { joint_positions: [], times: [], locations: [] },
    })

    await expect(
      made.store.planTrajectory(cartesianTarget("world")),
    ).rejects.toThrow("invalid joint positions")

    expectSessionHandedBack(made)
  })

  // What NOVA does with a second trajectory on a session whose move failed
  // or ended is its own matter: the next plan does not depend on it
  test.each<[string, (made: Awaited<ReturnType<typeof armed>>) => void]>([
    [
      "a failed move",
      (made) => made.emit("MOTION_ERROR", { message: "Collision detected" }),
    ],
    [
      "a trajectory that NOVA refused",
      (made) => made.emit("INITIALIZE_RECEIVED", { message: "invalid" }),
    ],
    [
      "the end of a trajectory",
      (made) => made.setExecutionState("END_OF_TRAJECTORY"),
    ],
    ["a reset", (made) => made.store.reset()],
  ])("plans on a new execution session after %s, as the first plan did", async (_what, drop) => {
    const made = await armed()
    drop(made)
    expect(made.store.plannedTrajectory).toBeNull()

    await made.store.planTrajectory(cartesianTarget("world"))

    expect(made.sockets).toHaveLength(2)
    expect(made.sockets[0]?.dispose).toHaveBeenCalled()
    expect(sentMessageTypes(made.sockets[0])).toEqual([
      "InitializeMovementRequest",
    ])
    expect(sentMessageTypes(made.sockets[1])).toEqual([
      "InitializeMovementRequest",
    ])
    made.emit("INITIALIZE_RECEIVED")
    expect(made.store.trajectoryState).toBe("planned")
  })

  test("plans another target on the same execution session while the one before it is planned", async () => {
    const made = await armed()

    await made.store.planTrajectory(cartesianTarget("offset-300x"))

    expect(made.sockets).toHaveLength(1)
    expect(sentMessageTypes(made.sockets[0])).toEqual([
      "InitializeMovementRequest",
      "InitializeMovementRequest",
    ])
  })

  test("keeps holding the session after reset, at the end of the trajectory and after a motion error, until stopAndReset", async () => {
    const afterReset = await armed()
    afterReset.store.reset()
    expect(afterReset.store.holdsExecutionSession).toBe(true)

    const arrived = await armed()
    arrived.setExecutionState("END_OF_TRAJECTORY")
    expect(arrived.store.trajectoryState).toBe("idle")
    expect(arrived.store.holdsExecutionSession).toBe(true)

    const failed = await armed()
    failed.emit("MOTION_ERROR", { message: "Collision detected" })
    expect(failed.store.trajectoryState).toBe("idle")
    expect(failed.store.holdsExecutionSession).toBe(true)

    await failed.store.stopAndReset()
    expect(failed.store.holdsExecutionSession).toBe(false)
  })
})

describe("TrajectoryExecutionStore pausing", () => {
  /** Plan, initialize and start a trajectory, leaving it in "moving" */
  async function startMoving(
    store: TrajectoryExecutionStore,
    emit: (kind: string) => void,
  ) {
    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    store.start()
    emit("START_RECEIVED")
    expect(store.trajectoryState).toBe("moving")
  }

  test("shows the interim stopping state while the robot decelerates", async () => {
    const { store, emit } = makeStore()
    await startMoving(store, emit)

    emit("PAUSE_RECEIVED")
    expect(store.trajectoryState).toBe("stopping")
  })

  test("waits until the robot stands still, then is planned again", async () => {
    const { store, emit, sockets, motionState } = makeStore()
    await startMoving(store, emit)
    runInAction(() => {
      motionState.standstill = false
    })

    let paused = false
    const pausing = store.pause().then(() => {
      paused = true
    })
    expect(sockets.at(-1)?.sendJson).toHaveBeenLastCalledWith({
      message_type: "PauseMovementRequest",
    })
    emit("PAUSE_RECEIVED")
    await Promise.resolve()
    expect(paused).toBe(false)
    expect(store.trajectoryState).toBe("stopping")

    runInAction(() => {
      motionState.standstill = true
    })
    await pausing

    expect(store.trajectoryState).toBe("planned")
  })

  test("a pause acknowledgement arriving after the motion settled leaves the state alone", async () => {
    const { store, emit } = makeStore()
    await startMoving(store, emit)

    // pause() waits on the motion stream, which settles as soon as the robot
    // stands still -- that happens before the socket acknowledges the pause
    // when the robot was already at its target
    await store.pause()
    expect(store.trajectoryState).toBe("planned")

    // The late acknowledgement must not re-enter the interim state: nothing
    // writes trajectoryState afterwards, so the button would stay disabled
    // with a "Stopping..." spinner forever (RB-3805)
    emit("PAUSE_RECEIVED")
    expect(store.trajectoryState).toBe("planned")
  })

  test("refuses to pause a trajectory that does not move", async () => {
    const { store } = makeStore()

    await expect(store.pause()).rejects.toThrow('expected state "moving"')
  })
})

// The Move to button: held, the robot moves along the planned trajectory;
// let go, it stops, whatever NOVA and the motion stream have said by then
describe("TrajectoryExecutionStore hold to move", () => {
  /** A trajectory that NOVA accepted */
  async function planned() {
    const made = makeStore()
    await made.store.planTrajectory(cartesianTarget("world"))
    made.emit("INITIALIZE_RECEIVED")
    /** How many messages of a type the store sent */
    const sent = (type: string) =>
      made.sockets
        .flatMap((socket) => sentMessageTypes(socket) ?? [])
        .filter((sentType) => sentType === type).length
    /** What the motion stream reports: the robot moves, or stands still */
    const moving = (isMoving: boolean) =>
      runInAction(() => {
        made.motionState.standstill = !isMoving
      })
    return { ...made, sent, moving }
  }

  test("hold starts the planned trajectory, release pauses it and resolves once the robot stands still", async () => {
    const { store, emit, sent, moving } = await planned()

    expect(store.hold()).toBe(true)
    expect(sent("StartMovementRequest")).toBe(1)
    emit("START_RECEIVED")
    expect(store.trajectoryState).toBe("moving")
    moving(true)

    let released = false
    const releasing = store.release().then(() => {
      released = true
    })
    expect(sent("PauseMovementRequest")).toBe(1)
    emit("PAUSE_RECEIVED")
    await flushPromises()
    expect(released).toBe(false)
    expect(store.trajectoryState).toBe("stopping")

    moving(false)
    await releasing
    // Still planned: the next hold goes on from here
    expect(store.trajectoryState).toBe("planned")
    expect(store.hold()).toBe(true)
    expect(sent("StartMovementRequest")).toBe(2)
  })

  // NOVA switches a controller to control mode by itself for a start: a
  // robot that is deactivating would be moved, or one still activating
  test("hold moves nothing while the robot may not move, and moves once it may", async () => {
    let reason: RobotNotMoveableReason | null = null
    const { store, emit, sockets } = makeStore({
      notMoveableReason: () => reason,
    })
    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    reason = { code: "deactivated" }

    expect(store.hold()).toBe(false)
    expect(sentMessageTypes(sockets.at(-1))).not.toContain(
      "StartMovementRequest",
    )

    reason = null
    expect(store.hold()).toBe(true)
    expect(sentMessageTypes(sockets.at(-1))).toContain("StartMovementRequest")
  })

  // "A locked app plans and starts no trajectory" (RobotSessionOptions)
  test("hold moves nothing while the app locks the robot, and moves once it no longer does", async () => {
    let locked = false
    const { store, emit, sockets } = makeStore({ isLocked: () => locked })
    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    locked = true

    expect(store.hold()).toBe(false)
    expect(sentMessageTypes(sockets.at(-1))).not.toContain(
      "StartMovementRequest",
    )

    locked = false
    expect(store.hold()).toBe(true)
  })

  test("hold moves nothing without a trajectory that NOVA accepted", async () => {
    const { store, sockets } = makeStore()

    expect(store.hold()).toBe(false)
    await store.planTrajectory(cartesianTarget("world"))
    // Planned, but NOVA has not answered
    expect(store.hold()).toBe(false)

    expect(sentMessageTypes(sockets[0])).not.toContain("StartMovementRequest")
  })

  test("hold moves nothing along a trajectory that was dropped before NOVA accepted it", async () => {
    const { store, emit, sockets } = makeStore()
    await store.planTrajectory(cartesianTarget("world"))
    store.reset()
    // NOVA knows nothing of the reset
    emit("INITIALIZE_RECEIVED")

    expect(store.hold()).toBe(false)

    expect(sentMessageTypes(sockets[0])).not.toContain("StartMovementRequest")
  })

  // The caller says where its button moves to: the store starts only a
  // trajectory that goes there
  describe("for a target", () => {
    const pose = (
      position: number[],
      orientation?: number[],
      coordinateSystemId?: string,
    ): TrajectoryTarget => ({
      type: "cartesian",
      pose: { position, orientation },
      coordinateSystemId,
    })

    test.each<[string, TrajectoryTarget, TrajectoryTarget]>([
      [
        "another position",
        pose([1, 2, 3], [0, 0, 0]),
        pose([1, 2, 4], [0, 0, 0]),
      ],
      [
        "another orientation",
        pose([1, 2, 3], [0, 0, 0]),
        pose([1, 2, 3], [0, 0, 1]),
      ],
      [
        "another coordinate system",
        pose([1, 2, 3], [0, 0, 0], "offset-300x"),
        pose([1, 2, 3], [0, 0, 0], "world"),
      ],
      [
        "other joints",
        { type: "joint", joints: [0.1, 0.2] },
        { type: "joint", joints: [0.1, 0.3] },
      ],
      [
        "a pose, held for joints",
        pose([1, 2, 3], [0, 0, 0]),
        { type: "joint", joints: [1, 2, 3, 0, 0, 0] },
      ],
      [
        "joints, held for a pose",
        { type: "joint", joints: [1, 2, 3, 0, 0, 0] },
        pose([1, 2, 3], [0, 0, 0]),
      ],
    ])("hold moves nothing along a trajectory that was planned for %s", async (_what, plannedFor, held) => {
      const { store, emit, sockets } = makeStore()
      await store.planTrajectory(plannedFor)
      emit("INITIALIZE_RECEIVED")

      expect(store.hold(held)).toBe(false)
      expect(sentMessageTypes(sockets[0])).not.toContain("StartMovementRequest")

      expect(store.hold(plannedFor)).toBe(true)
    })

    test("hold takes a pose without an orientation or a coordinate system as the one in world without a rotation", async () => {
      const { store, emit } = makeStore()
      await store.planTrajectory(pose([1, 2, 3]))
      emit("INITIALIZE_RECEIVED")

      expect(store.hold(pose([1, 2, 3], [0, 0, 0], "world"))).toBe(true)
    })

    test("hold moves nothing for a target while the trajectory was planned by hand", async () => {
      const { store, sockets } = makeStore()
      // As a test, or an app, that sets the plan without planTrajectory
      store.plannedTrajectory = { startJoints: [0], endJoints: [1] }
      store.trajectoryState = "planned"

      expect(store.hold(pose([1, 2, 3]))).toBe(false)
      expect(sentMessageTypes(sockets[0])).toEqual([])
    })

    test("the target of a plan that was dropped is no longer the planned one", async () => {
      const { store, emit, sockets } = makeStore()
      await store.planTrajectory(pose([1, 2, 3]))
      store.reset()
      store.plannedTrajectory = { startJoints: [0], endJoints: [1] }
      emit("INITIALIZE_RECEIVED")

      expect(store.hold(pose([1, 2, 3]))).toBe(false)
      expect(sentMessageTypes(sockets[0])).not.toContain("StartMovementRequest")
    })

    test("a target that changes after it was planned does not change what was planned", async () => {
      const { store, emit } = makeStore()
      const target = pose([1, 2, 3], [0, 0, 0])
      await store.planTrajectory(target)
      emit("INITIALIZE_RECEIVED")

      // e.g. a saved pose that is edited while it is selected
      ;(target as { pose: { position: number[] } }).pose.position[2] = 300

      expect(store.hold(target)).toBe(false)
      expect(store.hold(pose([1, 2, 3], [0, 0, 0]))).toBe(true)
    })
  })

  // The velocity is planned into the trajectory, and the slider stays live
  describe("at the velocity of the jogging store", () => {
    test("a trajectory is outdated once the velocity is another than it was planned with, and hold moves nothing along it", async () => {
      const { store, joggingStore, sent } = await planned()
      expect(store.isPlanOutdated).toBe(false)

      joggingStore.translationVelocityMmPerSec = 10
      expect(store.isPlanOutdated).toBe(true)
      expect(store.hold()).toBe(false)
      expect(sent("StartMovementRequest")).toBe(0)

      // Back at the planned velocity, it is the trajectory to move along
      joggingStore.translationVelocityMmPerSec = 50
      expect(store.isPlanOutdated).toBe(false)
      expect(store.hold()).toBe(true)
    })

    test("a trajectory to a pose is planned with the translation velocity, one to joints with the rotation velocity", async () => {
      const toPose = await planned()
      toPose.joggingStore.rotationVelocityRadsPerSec = 0.5
      expect(toPose.store.isPlanOutdated).toBe(false)

      const toJoints = makeStore()
      await toJoints.store.planTrajectory({ type: "joint", joints: [0.1] })
      toJoints.emit("INITIALIZE_RECEIVED")
      toJoints.joggingStore.translationVelocityMmPerSec = 10
      expect(toJoints.store.isPlanOutdated).toBe(false)
      toJoints.joggingStore.rotationVelocityRadsPerSec = 0.5
      expect(toJoints.store.isPlanOutdated).toBe(true)
      expect(toJoints.store.hold()).toBe(false)
    })

    test("a move that runs keeps its velocity: it stays held, and is outdated for the next hold", async () => {
      const { store, emit, joggingStore, sent } = await planned()
      store.hold()
      emit("START_RECEIVED")

      joggingStore.translationVelocityMmPerSec = 10
      expect(store.hold()).toBe(true)
      await store.release()

      expect(store.trajectoryState).toBe("planned")
      expect(store.hold()).toBe(false)
      expect(sent("StartMovementRequest")).toBe(1)
    })

    test("a velocity that is no number does not make every trajectory outdated", async () => {
      const { store, emit, joggingStore } = makeStore()
      joggingStore.translationVelocityMmPerSec = Number.NaN
      await store.planTrajectory(cartesianTarget("world"))
      emit("INITIALIZE_RECEIVED")

      // Outdated for ever, it would be planned again for ever
      expect(store.isPlanOutdated).toBe(false)
    })

    test("nothing is outdated without a trajectory, or with one that was dropped", async () => {
      const { store, joggingStore } = await planned()
      joggingStore.translationVelocityMmPerSec = 10

      store.reset()

      expect(store.isPlanOutdated).toBe(false)
      expect(makeStore().store.isPlanOutdated).toBe(false)
    })
  })

  test("holding again while held starts nothing more", async () => {
    const { store, emit, sent } = await planned()

    expect(store.hold()).toBe(true)
    expect(store.hold()).toBe(true)
    emit("START_RECEIVED")
    expect(store.hold()).toBe(true)

    expect(sent("StartMovementRequest")).toBe(1)
  })

  test("a release before NOVA confirmed the start pauses as soon as it does, however late", async () => {
    const { store, emit, sent } = await planned()
    vi.useFakeTimers()
    onTestFinished(() => {
      vi.useRealTimers()
    })

    store.hold()
    void store.release()
    // NOVA has not taken the start: there is nothing to pause yet
    expect(sent("PauseMovementRequest")).toBe(0)
    await vi.advanceTimersByTimeAsync(10 * 60_000)
    expect(sent("PauseMovementRequest")).toBe(0)

    emit("START_RECEIVED")

    expect(sent("PauseMovementRequest")).toBe(1)
    await flushPromises()
    expect(store.trajectoryState).toBe("planned")
  })

  test("a release pauses a move that goes on after a pause, while the motion stream still shows that pause", async () => {
    const { store, emit, sent, setExecutionState } = await planned()
    store.hold()
    emit("START_RECEIVED")
    await store.release()
    setExecutionState("PAUSED_BY_USER")

    expect(store.hold()).toBe(true)
    emit("START_RECEIVED")
    // The stream has not shown RUNNING yet
    expect(store.executionState).toBe("PAUSED_BY_USER")
    await store.release()

    expect(sent("PauseMovementRequest")).toBe(2)
  })

  test("pause no longer refuses a move that the motion stream still shows as paused", async () => {
    const { store, emit, sent, setExecutionState } = await planned()
    store.start()
    emit("START_RECEIVED")
    setExecutionState("PAUSED_BY_USER")

    await store.pause()

    expect(sent("PauseMovementRequest")).toBe(1)
  })

  test("releasing again while the robot stops sends no second pause", async () => {
    const { store, emit, sent, moving } = await planned()
    store.hold()
    emit("START_RECEIVED")
    moving(true)

    const first = store.release()
    const second = store.release()
    emit("PAUSE_RECEIVED")
    const third = store.release()
    expect(sent("PauseMovementRequest")).toBe(1)

    moving(false)
    await Promise.all([first, second, third])
    expect(store.trajectoryState).toBe("planned")
  })

  test("release does nothing when nothing moves", async () => {
    const idle = makeStore()
    await idle.store.release()
    expect(sentMessageTypes(idle.sockets[0])).toEqual([])

    const { store, sent } = await planned()
    await store.release()
    expect(sent("PauseMovementRequest")).toBe(0)
    expect(store.trajectoryState).toBe("planned")
  })

  test("a hold while the last move still stops moves nothing", async () => {
    const { store, emit, sent, moving } = await planned()
    store.hold()
    emit("START_RECEIVED")
    moving(true)
    void store.release()

    // The pause is on its way, then NOVA has it
    expect(store.hold()).toBe(false)
    emit("PAUSE_RECEIVED")
    expect(store.hold()).toBe(false)

    expect(sent("StartMovementRequest")).toBe(1)
  })

  test("a hold moves nothing before the robot stands still, also when another trajectory was accepted meanwhile", async () => {
    const { store, emit, sent, moving } = await planned()
    store.hold()
    emit("START_RECEIVED")
    moving(true)
    void store.release()
    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    expect(store.trajectoryState).toBe("planned")

    expect(store.hold()).toBe(false)
    moving(false)
    await flushPromises()
    expect(store.hold()).toBe(true)

    expect(sent("StartMovementRequest")).toBe(2)
  })

  test("a hold moves nothing while the motion stream shows a running trajectory", async () => {
    const { store, sent, setExecutionState } = await planned()
    setExecutionState("RUNNING")

    expect(store.hold()).toBe(false)

    expect(sent("StartMovementRequest")).toBe(0)
  })

  test("a hold after a release that still waits for the start moves nothing, and the release stands", async () => {
    const { store, emit, sent } = await planned()
    store.hold()
    void store.release()

    expect(store.hold()).toBe(false)
    emit("START_RECEIVED")

    expect(sent("StartMovementRequest")).toBe(1)
    expect(sent("PauseMovementRequest")).toBe(1)
  })

  test("a start that NOVA answers with an error is no longer on its way: the release ends, and the next trajectory can be held", async () => {
    const { store, emit, sent } = await planned()
    store.hold()
    let released = false
    void store.release().then(() => {
      released = true
    })

    emit("MOTION_ERROR", { message: "The robot is not at the start" })
    await flushPromises()
    expect(released).toBe(true)

    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    expect(store.hold()).toBe(true)
    expect(sent("StartMovementRequest")).toBe(2)
  })

  // The error drops the plan, but only NOVA's word that the trajectory
  // ended says that nothing moves
  test("a release still pauses a move that NOVA confirmed and then reported an error for", async () => {
    const { store, emit, sent } = await planned()
    store.hold()
    emit("START_RECEIVED")
    emit("MOTION_ERROR", { message: "Collision detected" })
    expect(store.trajectoryState).toBe("idle")

    await store.release()

    expect(sent("PauseMovementRequest")).toBe(1)
    expect(store.trajectoryState).toBe("idle")
  })

  test("start sends no second start while the first is unconfirmed, and leaves a release of it standing", async () => {
    const { store, emit, sent } = await planned()
    store.hold()
    void store.release()

    store.start()
    expect(sent("StartMovementRequest")).toBe(1)

    emit("START_RECEIVED")
    expect(sent("PauseMovementRequest")).toBe(1)
  })

  test("a release that waits for the start still pauses when the plan was reset meanwhile", async () => {
    const { store, emit, sent } = await planned()
    store.hold()
    void store.release()

    // NOVA knows nothing of this: it may still start the move
    store.reset()
    emit("START_RECEIVED")

    expect(sent("PauseMovementRequest")).toBe(1)
  })

  test("a release pauses a move whose plan was reset while it ran", async () => {
    const { store, emit, sent } = await planned()
    store.hold()
    emit("START_RECEIVED")
    store.reset()
    expect(store.trajectoryState).toBe("idle")

    await store.release()

    expect(sent("PauseMovementRequest")).toBe(1)
  })

  test("a release after the end of the trajectory pauses nothing", async () => {
    const { store, emit, sent, setExecutionState } = await planned()
    store.hold()
    emit("START_RECEIVED")
    setExecutionState("RUNNING")
    setExecutionState("END_OF_TRAJECTORY")

    await store.release()

    expect(sent("PauseMovementRequest")).toBe(0)
  })

  test("the standstill of a pause does not end a move that was started after it", async () => {
    const { store, emit, moving } = await planned()
    store.hold()
    emit("START_RECEIVED")
    moving(true)
    void store.release()
    // Planned anew before the robot stood still, and started with `start`
    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    store.start()
    emit("START_RECEIVED")

    moving(false)
    await flushPromises()

    expect(store.trajectoryState).toBe("moving")
  })

  test("a pause that settles after the trajectory was planned again does not call the new one accepted", async () => {
    const { store, emit, moving } = await planned()
    store.hold()
    emit("START_RECEIVED")
    moving(true)
    const releasing = store.release()
    await store.planTrajectory(cartesianTarget("world"))
    expect(store.trajectoryState).toBe("planning")

    moving(false)
    await releasing

    // NOVA has not answered the new trajectory
    expect(store.trajectoryState).toBe("planning")
  })

  test("stopAndReset pauses a start that NOVA has not confirmed, before it closes the execution websocket", async () => {
    const { store, sockets } = await planned()
    store.hold()

    await store.stopAndReset()

    expect(sentMessageTypes(sockets[0])).toEqual([
      "InitializeMovementRequest",
      "StartMovementRequest",
      "PauseMovementRequest",
    ])
    expect(sockets[0]?.dispose).toHaveBeenCalled()
  })

  test("stopAndReset while the robot stops after a release sends no second pause", async () => {
    const { store, emit, sent, moving } = await planned()
    store.hold()
    emit("START_RECEIVED")
    moving(true)
    void store.release()

    const stopped = store.stopAndReset()
    moving(false)
    await stopped

    expect(sent("PauseMovementRequest")).toBe(1)
  })

  test("a new execution websocket starts without a move: the next trajectory can be held", async () => {
    const { store, emit, sockets } = await planned()
    store.hold()
    await store.stopAndReset()

    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")

    expect(store.hold()).toBe(true)
    expect(sentMessageTypes(sockets[1])).toEqual([
      "InitializeMovementRequest",
      "StartMovementRequest",
    ])
  })
})

describe("TrajectoryExecutionStore observers", () => {
  test("changes its observed state in actions, also after awaiting NOVA", async () => {
    const warn = vi.spyOn(console, "warn")
    warn.mockClear()
    const { store, emit, motionState } = makeStore()
    // A UI that shows the state, like an observer component
    const stopObserving = autorun(() => [
      store.trajectoryState,
      store.plannedTrajectory,
      store.lastError,
    ])
    onTestFinished(stopObserving)

    await store.planTrajectory(cartesianTarget("world"))
    emit("INITIALIZE_RECEIVED")
    store.start()
    emit("START_RECEIVED")
    runInAction(() => {
      motionState.standstill = false
    })
    const pausing = store.pause()
    runInAction(() => {
      motionState.standstill = true
    })
    await pausing
    await store.stopAndReset()

    const mobxWarnings = warn.mock.calls.filter(([message]) =>
      String(message).includes("[MobX]"),
    )
    expect(mobxWarnings).toEqual([])
  })
})
