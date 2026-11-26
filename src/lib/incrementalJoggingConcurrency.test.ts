/**
 * Step jogs (`runIncrementalCartesianMotion`). Ported from RobotPad
 * (unit/incrementalJoggingConcurrency.test.ts), with tests of the step's
 * target pose, its planning and its errors added.
 *
 * Regression tests for the "Movement not started. Motion group is not at
 * expected location on trajectory" error a user hits by pressing an increment
 * jog button twice in quick succession.
 *
 * A trajectory is planned from a joint position sampled on the client, so the
 * robot has to still be at that position when the controller receives it. That
 * only holds if an incremental jog blocks its caller for the whole motion and
 * a jog requested in the meantime is dropped.
 */
import type { AutoReconnectingWebsocket } from "@wandelbots/nova-js"
import {
  type MotionGroupDescription,
  type MotionGroupState,
  Nova,
  type PlanTrajectoryRequest,
  type PlanTrajectoryResponse,
  type RobotControllerState,
} from "@wandelbots/nova-js/v2"
import { runInAction } from "mobx"
import { describe, expect, test, vi } from "vitest"
import {
  ur5eDescription,
  ur5eMotionGroupState,
} from "../components/jogging/__fixtures__/motionStreamMockData"
import {
  JoggingRefusedError,
  type JoggingRefusedReason,
} from "../components/jogging/JoggingRefusedError"
import {
  type IncrementalCartesianMotionRequest,
  JoggerConnection,
  type JoggerConnectionOptions,
} from "./JoggerConnection"
import { MotionStreamConnection } from "./MotionStreamConnection"

class FakeSocket {
  listeners: ((ev: MessageEvent) => void)[] = []
  openListeners: (() => void)[] = []
  sent: Record<string, unknown>[] = []
  disposed = false
  /** `WebSocket.OPEN`, unless the test opens it itself (`open`) */
  readyState = 1

  constructor(readonly path: string) {}

  addEventListener(type: string, cb: (ev: MessageEvent) => void) {
    if (type === "open") {
      this.openListeners.push(cb as () => void)
    } else {
      this.listeners.push(cb)
    }
  }
  removeEventListener(type: string, cb: (ev: MessageEvent) => void) {
    if (type === "open") {
      this.openListeners = this.openListeners.filter((l) => l !== cb)
    } else {
      this.listeners = this.listeners.filter((l) => l !== cb)
    }
  }
  /** The connection is up: what a real websocket queued goes out now */
  open() {
    this.readyState = 1
    for (const l of [...this.openListeners]) l()
  }
  sendJson(data: Record<string, unknown>) {
    this.sent.push(data)
  }
  dispose() {
    this.disposed = true
  }
  closed() {
    return Promise.resolve()
  }

  /** Simulate a message from the controller */
  emit(result: Record<string, unknown>) {
    const ev = { data: JSON.stringify({ result }) } as MessageEvent
    for (const l of this.listeners) l(ev)
  }

  get sentMessageTypes() {
    return this.sent.map((m) => m.message_type)
  }
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 0))

/** The states of a trajectory's execution that the tests report */
type ExecutionKind = "RUNNING" | "END_OF_TRAJECTORY" | "PAUSED_BY_USER"

function setup({
  plannedDurationSeconds = 2,
  planResponse,
  description = ur5eDescription,
  withoutOnError = false,
  socketsOpenLater = false,
  ...joggerOptions
}: {
  plannedDurationSeconds?: number
  /** What the planner answers instead of a trajectory */
  planResponse?: PlanTrajectoryResponse
  description?: MotionGroupDescription
  /** Failures reject the step instead of going to `onError` */
  withoutOnError?: boolean
  /** A trajectory websocket is open only once the test calls its `open()` */
  socketsOpenLater?: boolean
} & JoggerConnectionOptions = {}) {
  const trajectorySockets: FakeSocket[] = []
  const planRequests: PlanTrajectoryRequest[] = []
  const errors: unknown[] = []

  const nova = new Nova({ instanceUrl: "https://mock.example.com" })
  vi.spyOn(nova, "openReconnectingWebsocket").mockImplementation((path) => {
    const socket = new FakeSocket(path)
    if (socketsOpenLater) socket.readyState = 0
    trajectorySockets.push(socket)
    return socket as unknown as AutoReconnectingWebsocket
  })
  vi.spyOn(nova.api.trajectoryPlanning, "planTrajectory").mockImplementation(
    async (_cellId, body) => {
      planRequests.push(body)
      // `times` are per-sample timestamps in seconds; the last one is the
      // planned duration the motion watchdog is derived from
      return (
        planResponse ?? {
          response: {
            joint_positions: [[0], [0]],
            times: [0, plannedDurationSeconds],
            locations: [0, 1],
          },
        }
      )
    },
  )

  const motionGroup = structuredClone(ur5eMotionGroupState)
  const controller = {
    controller: motionGroup.controller,
    motion_groups: [motionGroup],
  } as unknown as RobotControllerState

  const motionStream = new MotionStreamConnection(
    nova,
    controller,
    motionGroup,
    description,
    structuredClone(ur5eMotionGroupState),
    new FakeSocket("state-stream") as unknown as AutoReconnectingWebsocket,
    "cell",
  )

  const jogger = new JoggerConnection(motionStream, {
    mode: "trajectory",
    onError: withoutOnError ? undefined : (err) => errors.push(err),
    ...joggerOptions,
  })

  const state = () =>
    motionStream.rapidlyChangingMotionState as MotionGroupState

  return {
    jogger,
    trajectorySockets,
    planRequests,
    errors,
    state,

    /** Where the TCP is before the step */
    get startPosition() {
      return [...(ur5eMotionGroupState.tcp_pose?.position ?? [])]
    },

    /** The target position of the first planned step */
    get plannedTargetPosition() {
      const command = planRequests[0]?.motion_commands[0]
      if (!command || !("path" in command) || !command.path) {
        throw new Error("No step was planned")
      }
      const path = command.path as { target_pose?: { position?: number[] } }
      return path.target_pose?.position ?? []
    },

    setStandstill(standstill: boolean) {
      runInAction(() => {
        state().standstill = standstill
      })
    },

    /**
     * What the motion stream reports of the trajectory that NOVA executes,
     * and where on it the robot is: from 0 to 1, the end of a step. null:
     * NOVA executes nothing (the stream has no `execute`).
     */
    setExecution(kind: ExecutionKind | null, location = 0) {
      runInAction(() => {
        state().execute =
          kind === null
            ? undefined
            : {
                joint_position: state().joint_position,
                details: {
                  kind: "TRAJECTORY",
                  trajectory: "step",
                  location,
                  state:
                    kind === "RUNNING" ? { kind, time_to_end: 0 } : { kind },
                },
              }
      })
    },

    /** Pretend the robot moved a little, as it does while a jog executes */
    nudgeJoints(delta: number) {
      runInAction(() => {
        state().joint_position = state().joint_position.map((j) => j + delta)
      })
    },

    jog(request: Partial<IncrementalCartesianMotionRequest> = {}) {
      const currentTcpPose = state().tcp_pose
      if (!currentTcpPose) {
        throw new Error("Fixture motion state has no tcp_pose")
      }

      return jogger.runIncrementalCartesianMotion({
        currentTcpPose,
        currentJoints: state().joint_position as [number, number, number],
        velocityInRelevantUnits: 10,
        axis: "x",
        direction: "+",
        motion: { type: "translate", distanceMm: 10 },
        ...request,
      })
    },

    /** Wait until `count` trajectory sockets have been opened */
    async waitForTrajectorySocket(count: number) {
      await vi.waitUntil(() => trajectorySockets.length >= count)
      const socket = trajectorySockets[count - 1]
      if (!socket) {
        throw new Error(`Trajectory socket ${count} was never opened`)
      }
      return socket
    },

    /** Drive a socket through the controller handshake, up to "moving" */
    startMotionOn(socket: FakeSocket) {
      socket.emit({ kind: "INITIALIZE_RECEIVED" })
      socket.emit({ kind: "START_RECEIVED" })
    },

    /** Drive a socket through a whole motion, until the robot stands still */
    finishMotionOn(socket: FakeSocket) {
      this.startMotionOn(socket)
      this.setExecution("RUNNING", 0.5)
      this.setStandstill(false)
      this.setExecution("END_OF_TRAJECTORY", 1)
      this.setStandstill(true)
    },

    /**
     * Start a step with the fake clock: vi.waitUntil needs real timers, so
     * the clock is stepped until planning has resolved and the execution
     * socket is open. Returns the step, its socket and whether it is over.
     */
    async startJogWithFakeTimers() {
      const step = { released: false }
      const jog = this.jog().then(() => {
        step.released = true
      })
      for (let i = 0; i < 20 && trajectorySockets.length === 0; i++) {
        await vi.advanceTimersByTimeAsync(1)
      }
      const socket = trajectorySockets[0]
      if (!socket) throw new Error("no trajectory socket")
      this.startMotionOn(socket)
      return { jog, socket, step }
    },
  }
}

test("an incremental jog resolves only once the robot has stopped moving", async () => {
  const h = setup()

  let resolved = false
  const jog = h.jog().then(() => {
    resolved = true
  })

  const socket = await h.waitForTrajectorySocket(1)
  h.startMotionOn(socket)
  h.setExecution("RUNNING", 0.5)
  h.setStandstill(false)
  await tick()

  // The caller -- and with it the jogging UI's motion lock -- has to stay
  // blocked while the robot is mid-motion
  expect(resolved).toBe(false)

  // The last sample went out, and the robot still settles
  h.setExecution("END_OF_TRAJECTORY", 1)
  await tick()
  expect(resolved).toBe(false)

  h.setStandstill(true)
  await jog

  expect(resolved).toBe(true)
  expect(socket.disposed).toBe(true)
})

// A 5° step at 1 °/s, planned for 5 s, ended after about 0.7 s on a real
// NOVA instance: the robot had turned 0.6°. `standstill` says that NOVA
// treats the measured joint velocities as 0, which it also does for a robot
// that moves this slowly: it is no sign that a trajectory is over. NOVA
// reports that in `execute` of the motion state.
describe("a slow step, during which the robot counts as standing still", () => {
  test("runs on while NOVA runs its trajectory, to its end", async () => {
    vi.useFakeTimers()
    try {
      const h = setup({ plannedDurationSeconds: 5 })
      const { jog, socket, step } = await h.startJogWithFakeTimers()

      // The robot turns, and `standstill` never turns false
      h.setExecution("RUNNING", 0.1)
      await vi.advanceTimersByTimeAsync(700)
      expect(step.released).toBe(false)
      expect(socket.disposed).toBe(false)

      h.setExecution("RUNNING", 0.9)
      await vi.advanceTimersByTimeAsync(4000)
      expect(step.released).toBe(false)
      expect(socket.disposed).toBe(false)

      h.setExecution("END_OF_TRAJECTORY", 1)
      await jog
      expect(socket.disposed).toBe(true)
      expect(h.errors).toHaveLength(0)
    } finally {
      vi.useRealTimers()
    }
  })

  test("runs on when `standstill` comes back on the way", async () => {
    const h = setup({ plannedDurationSeconds: 5 })
    let resolved = false
    void h.jog().then(() => {
      resolved = true
    })
    const socket = await h.waitForTrajectorySocket(1)
    h.startMotionOn(socket)

    h.setExecution("RUNNING", 0.1)
    h.setStandstill(false)
    await tick()
    h.setStandstill(true)
    await tick()

    expect(resolved).toBe(false)
    expect(socket.disposed).toBe(false)
  })
})

describe("the end of a step", () => {
  test("a step that was over before the stream showed it running ends at once", async () => {
    vi.useFakeTimers()
    try {
      const h = setup()
      const { socket, step } = await h.startJogWithFakeTimers()

      h.setExecution("END_OF_TRAJECTORY", 1)
      await vi.advanceTimersByTimeAsync(0)

      expect(step.released).toBe(true)
      expect(socket.disposed).toBe(true)
      expect(h.errors).toHaveLength(0)
    } finally {
      vi.useRealTimers()
    }
  })

  // NOVA calls the first sample of a trajectory its end as well, for a
  // move backward: a trajectory that waits there has not run
  test("a trajectory at its first sample is not at the end of the step", async () => {
    const h = setup()
    let resolved = false
    void h.jog().then(() => {
      resolved = true
    })
    const socket = await h.waitForTrajectorySocket(1)
    h.startMotionOn(socket)

    h.setExecution("END_OF_TRAJECTORY", 0)
    await tick()

    expect(resolved).toBe(false)
    expect(socket.disposed).toBe(false)
  })

  test("a step that is stopped on the way ends once the robot stands still", async () => {
    const h = setup()
    let resolved = false
    const jog = h.jog().then(() => {
      resolved = true
    })
    const socket = await h.waitForTrajectorySocket(1)
    h.startMotionOn(socket)
    h.setExecution("RUNNING", 0.3)
    h.setStandstill(false)

    await h.jogger.stop()
    expect(socket.sentMessageTypes).toContain("PauseMovementRequest")
    // NOVA took the pause, and the stream still shows the move
    socket.emit({ kind: "PAUSE_RECEIVED" })
    await tick()
    expect(resolved).toBe(false)

    h.setExecution("PAUSED_BY_USER", 0.4)
    await tick()
    expect(resolved).toBe(false)

    h.setStandstill(true)
    await jog
    expect(socket.disposed).toBe(true)
    expect(h.errors).toHaveLength(0)
  })

  test("a step that is stopped before the stream showed it running ends as well", async () => {
    const h = setup()
    const jog = h.jog()
    const socket = await h.waitForTrajectorySocket(1)
    h.startMotionOn(socket)

    await h.jogger.stop()
    socket.emit({ kind: "PAUSE_RECEIVED" })
    h.setExecution("PAUSED_BY_USER", 0)

    await jog
    expect(socket.disposed).toBe(true)
    expect(h.errors).toHaveLength(0)
  })

  test("a step that NOVA no longer executes ends once the robot stands still", async () => {
    const h = setup()
    const jog = h.jog()
    const socket = await h.waitForTrajectorySocket(1)
    h.startMotionOn(socket)
    h.setExecution("RUNNING", 0.3)
    h.setStandstill(false)

    // e.g. the controller left the control mode
    h.setExecution(null)
    h.setStandstill(true)

    await jog
    expect(socket.disposed).toBe(true)
  })

  test("a step that never starts ends with an error after the watchdog, not for ever and not as done", async () => {
    vi.useFakeTimers()
    try {
      const h = setup({ plannedDurationSeconds: 2 })
      const watchdogMs = 2 * 2000 + 5000
      const { jog, socket, step } = await h.startJogWithFakeTimers()

      // NOVA took the start, and the stream shows no trajectory running:
      // the robot stands still, as before the step
      await vi.advanceTimersByTimeAsync(watchdogMs - 100)
      expect(step.released).toBe(false)
      expect(socket.disposed).toBe(false)

      await vi.advanceTimersByTimeAsync(200)
      await jog
      expect(h.errors).toHaveLength(1)
      expect(String(h.errors[0])).toContain("did not complete")
      expect(socket.disposed).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })
})

test.each([
  ["custom-UniversalRobots_UR5e-1", "custom-UniversalRobots_UR5e-1"],
  [undefined, ur5eDescription.motion_group_model],
])("plans an incremental jog with model %j", async (motionGroupModel, expected) => {
  const h = setup({ motionGroupModel })

  const jog = h.jog()
  const socket = await h.waitForTrajectorySocket(1)
  h.finishMotionOn(socket)
  await jog

  expect(
    h.planRequests.map((r) => r.motion_group_setup.motion_group_model),
  ).toEqual([expected])
})

test("a jog requested while the robot is still moving is dropped", async () => {
  const h = setup()

  void h.jog()
  const first = await h.waitForTrajectorySocket(1)
  h.startMotionOn(first)
  h.setStandstill(false)
  await tick()

  // Second press. Planning it here would use a joint position the robot has
  // already left, which the controller refuses.
  h.nudgeJoints(0.003)
  await h.jog()

  expect(h.planRequests).toHaveLength(1)
  expect(h.trajectorySockets).toHaveLength(1)
  expect(first.disposed).toBe(false)
  expect(h.errors).toHaveLength(0)
})

test("the next jog after a finished motion gets its own socket", async () => {
  const h = setup()

  const first = h.jog()
  const firstSocket = await h.waitForTrajectorySocket(1)
  h.finishMotionOn(firstSocket)
  await first

  void h.jog()
  const secondSocket = await h.waitForTrajectorySocket(2)
  h.startMotionOn(secondSocket)
  h.setStandstill(false)
  await tick()

  // The finished first motion must not have taken the second one's socket
  // down with it
  expect(secondSocket).not.toBe(firstSocket)
  expect(secondSocket.disposed).toBe(false)
})

test("a motion that never reports standstill releases the caller anyway", async () => {
  vi.useFakeTimers()
  try {
    // Watchdog fires at 2x the planned duration plus 5s of handshake slack
    const h = setup({ plannedDurationSeconds: 2 })
    const watchdogMs = 2 * 2000 + 5000

    const jog = h.jog()

    // vi.waitUntil needs real timers, so step the fake clock instead until
    // planning has resolved and the execution socket is open
    for (let i = 0; i < 20 && h.trajectorySockets.length === 0; i++) {
      await vi.advanceTimersByTimeAsync(1)
    }
    const socket = h.trajectorySockets[0]
    if (!socket) throw new Error("no trajectory socket")

    socket.emit({ kind: "INITIALIZE_RECEIVED" })
    socket.emit({ kind: "START_RECEIVED" })

    // The robot starts moving and the stream then goes quiet: standstill never
    // comes back, so nothing but the watchdog can release the jogging UI
    h.setStandstill(false)

    // Just short of the watchdog the caller is still blocked
    let released = false
    void jog.then(() => {
      released = true
    })
    await vi.advanceTimersByTimeAsync(watchdogMs - 100)
    expect(released).toBe(false)

    await vi.advanceTimersByTimeAsync(200)
    await jog

    expect(h.errors).toHaveLength(1)
    expect(String(h.errors[0])).toContain("did not complete")
    expect(socket.disposed).toBe(true)
  } finally {
    vi.useRealTimers()
  }
})

test("a refused trajectory releases the caller and is not started anyway", async () => {
  const h = setup()

  const jog = h.jog()
  const socket = await h.waitForTrajectorySocket(1)

  // What the controller answers when the robot is not where the trajectory
  // starts -- the error the user sees in the jogging panel
  socket.emit({
    kind: "INITIALIZE_RECEIVED",
    message:
      "Movement not started. Motion group is not at expected location on trajectory. Please move to the trajectory!",
  })

  await jog

  expect(socket.sentMessageTypes).not.toContain("StartMovementRequest")
  expect(h.errors).toHaveLength(1)
  expect(socket.disposed).toBe(true)

  // The refusal must not leave the jogger stuck: the next press has to work
  void h.jog()
  await expect(h.waitForTrajectorySocket(2)).resolves.toBeDefined()
})

test("without onError, an error of the controller rejects the step and frees the jogger", async () => {
  const h = setup({ withoutOnError: true })

  const jog = h.jog()
  const rejected = expect(jog).rejects.toThrow("Joint limit reached")
  const socket = await h.waitForTrajectorySocket(1)
  socket.emit({ kind: "INITIALIZE_RECEIVED" })
  socket.emit({ kind: "MOTION_ERROR", message: "Joint limit reached" })

  await rejected
  expect(socket.disposed).toBe(true)

  void h.jog().catch(() => {})
  await expect(h.waitForTrajectorySocket(2)).resolves.toBeDefined()
})

test("dispose() ends a step that still runs, without an error", async () => {
  const h = setup()

  const jog = h.jog()
  const socket = await h.waitForTrajectorySocket(1)
  h.startMotionOn(socket)
  h.setStandstill(false)

  await h.jogger.dispose()

  await expect(jog).resolves.toBeUndefined()
  expect(h.errors).toHaveLength(0)
  expect(socket.disposed).toBe(true)
})

describe("the planner's answer", () => {
  const failedPlan = {
    response: {
      error_feedback: { error_feedback_name: "FeedbackSingularity" },
      error_location_on_trajectory: 0,
    },
  } as unknown as PlanTrajectoryResponse

  test("a failed plan goes to onError and is not executed", async () => {
    const h = setup({ planResponse: failedPlan })

    await h.jog()

    expect(h.errors).toEqual([failedPlan.response])
    expect(h.trajectorySockets).toHaveLength(0)
  })

  test("without onError, a failed plan rejects the step", async () => {
    const h = setup({ planResponse: failedPlan, withoutOnError: true })

    await expect(h.jog()).rejects.toThrow("FeedbackSingularity")
    expect(h.trajectorySockets).toHaveLength(0)
  })
})

describe("the target of a step", () => {
  // The fixture's TCP is turned by about 180° about world X: its Z axis
  // points down along world -Z
  test.each([
    ["coordsys", 10],
    ["tool", -10],
  ] as const)("in %s orientation, a step along +z moves world z by %d mm", async (orientation, worldDz) => {
    const h = setup({ orientation })

    const jog = h.jog({ axis: "z" })
    const socket = await h.waitForTrajectorySocket(1)
    h.finishMotionOn(socket)
    await jog

    const [x, y, z] = h.plannedTargetPosition
    const [startX, startY, startZ] = h.startPosition
    expect(x).toBeCloseTo(startX ?? 0, 1)
    expect(y).toBeCloseTo(startY ?? 0, 1)
    expect(z).toBeCloseTo((startZ ?? 0) + worldDz, 1)
  })

  test("follows the axes of the coordinate system", async () => {
    // Turned by 90° about world Z: its X axis points along world +Y
    const h = setup({
      coordinateSystem: {
        coordinate_system: "turned",
        position: [0, 0, 0],
        orientation: [0, 0, Math.PI / 2],
        orientation_type: "ROTATION_VECTOR",
      },
    })

    const jog = h.jog({ axis: "x" })
    const socket = await h.waitForTrajectorySocket(1)
    h.finishMotionOn(socket)
    await jog

    const [x, y] = h.plannedTargetPosition
    const [startX, startY] = h.startPosition
    expect(x).toBeCloseTo(startX ?? 0, 6)
    expect(y).toBeCloseTo((startY ?? 0) + 10, 6)
  })
})

describe("the TCP offset sent to the planner", () => {
  const gripperPose = { position: [0, 0, 100], orientation: [0, 0, 0] }
  const descriptionWithGripper = {
    ...ur5eDescription,
    tcps: { Gripper: { name: "Gripper", pose: gripperPose } },
  } as unknown as MotionGroupDescription

  test.each([
    ["Gripper", gripperPose],
    // e.g. a UR: the active TCP has no entry in the description, the streamed
    // pose is the flange pose
    ["Flange", undefined],
  ])("is the pose of the active TCP %s", async (activeTcp, expected) => {
    const h = setup({ description: descriptionWithGripper })
    runInAction(() => {
      h.state().tcp = activeTcp
    })

    const jog = h.jog()
    const socket = await h.waitForTrajectorySocket(1)
    h.finishMotionOn(socket)
    await jog

    expect(h.planRequests[0]?.motion_group_setup.tcp_offset).toEqual(expected)
  })
})

test("a motion group without a cycle time is not planned, and the jogger's logger says so", async () => {
  const logger = { info: vi.fn(), debug: vi.fn(), warn: vi.fn() }
  const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {})
  const h = setup({
    description: {
      ...ur5eDescription,
      cycle_time: undefined,
    } as unknown as MotionGroupDescription,
    logger,
  })

  await h.jog()

  expect(h.planRequests).toHaveLength(0)
  expect(logger.warn).toHaveBeenCalledTimes(1)
  expect(consoleWarn).not.toHaveBeenCalled()
  consoleWarn.mockRestore()
})

// NOVA switches a controller to control mode by itself for a movement
// request. Planning a step takes a round trip, and NOVA's answer to its
// trajectory another: the robot may have been deactivated or stopped by
// then, and the step must not go to the robot
describe("a step that the robot may no longer make", () => {
  const deactivated: JoggingRefusedReason = { code: "deactivated" }

  /** The reason a step was refused with, or the test fails */
  async function refusalOf(step: Promise<unknown>) {
    const error = await step.then(
      () => undefined,
      (e: unknown) => e,
    )
    expect(error).toBeInstanceOf(JoggingRefusedError)
    return (error as JoggingRefusedError).reason
  }

  test("sends no trajectory, and opens no websocket for it, when the robot may no longer move once it is planned", async () => {
    const h = setup()
    let reason: JoggingRefusedReason | null = null
    // The planner of setup(), which answers with a trajectory
    const plan = vi.spyOn(
      h.jogger.nova.api.trajectoryPlanning,
      "planTrajectory",
    )
    const planned = plan.getMockImplementation()
    plan.mockImplementation(async (...args) => {
      // The robot was deactivated while the planner worked
      reason = deactivated
      return planned?.(...args) as never
    })

    const step = refusalOf(h.jog({ refusedReason: () => reason }))

    expect(await step).toEqual(deactivated)
    expect(h.planRequests).toHaveLength(1)
    expect(h.trajectorySockets).toHaveLength(0)
    // No error of the motion: the step did not start
    expect(h.errors).toHaveLength(0)
  })

  test("sends the trajectory only once its websocket is open, and not when the robot may no longer move by then", async () => {
    const h = setup({ socketsOpenLater: true })
    let reason: JoggingRefusedReason | null = null

    const step = refusalOf(h.jog({ refusedReason: () => reason }))
    const socket = await h.waitForTrajectorySocket(1)
    await tick()
    // A websocket that is not open yet would only queue it
    expect(socket.sent).toHaveLength(0)

    reason = deactivated
    socket.open()

    expect(await step).toEqual(deactivated)
    expect(socket.sent).toHaveLength(0)
    expect(socket.disposed).toBe(true)
    expect(h.errors).toHaveLength(0)
  })

  test("sends the trajectory once its websocket is open, while the robot may move", async () => {
    const h = setup({ socketsOpenLater: true })

    const jog = h.jog({ refusedReason: () => null })
    const socket = await h.waitForTrajectorySocket(1)
    socket.open()
    expect(socket.sentMessageTypes).toEqual(["InitializeMovementRequest"])

    h.finishMotionOn(socket)
    await jog
    expect(socket.sentMessageTypes).toEqual([
      "InitializeMovementRequest",
      "StartMovementRequest",
    ])
  })

  test("does not start the trajectory when the robot may no longer move once NOVA has it", async () => {
    const h = setup()
    let reason: JoggingRefusedReason | null = null

    const step = refusalOf(h.jog({ refusedReason: () => reason }))
    const socket = await h.waitForTrajectorySocket(1)
    expect(socket.sentMessageTypes).toEqual(["InitializeMovementRequest"])

    reason = { code: "safety_state", value: "SAFETY_STATE_STOP" }
    socket.emit({ kind: "INITIALIZE_RECEIVED" })

    expect(await step).toEqual(reason)
    expect(socket.sentMessageTypes).not.toContain("StartMovementRequest")
    expect(socket.disposed).toBe(true)
    expect(h.errors).toHaveLength(0)

    // The jogger is free for the next step
    void h.jog().catch(() => {})
    await expect(h.waitForTrajectorySocket(2)).resolves.toBeDefined()
  })
})
