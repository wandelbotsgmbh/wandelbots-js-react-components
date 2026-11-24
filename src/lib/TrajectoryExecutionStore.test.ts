import type {
  CoordinateSystem,
  MotionGroupState,
  PlanTrajectoryRequest,
  PlanTrajectoryResponse,
} from "@wandelbots/nova-js/v2"
import { autorun, observable, runInAction } from "mobx"
import { describe, expect, onTestFinished, test, vi } from "vitest"
import type { JoggingStore } from "../components/jogging/JoggingStore"
import type { JoggerConnection, JoggerMode } from "./JoggerConnection"
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
  ...options
}: Partial<Omit<TrajectoryExecutionStoreOptions, "joggingStore">> & {
  joggerMode?: JoggerMode
  motionGroupModel?: string
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
})

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
