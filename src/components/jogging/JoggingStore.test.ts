import { degreesToRadians } from "@wandelbots/nova-js"
import {
  type CoordinateSystem,
  JointTypeEnum,
  type KinematicModel,
  type MotionGroupDescription,
  type MotionGroupState,
  type RobotTcp,
} from "@wandelbots/nova-js/v2"
import { observable, runInAction } from "mobx"
import { Vector3 } from "three"
import { beforeEach, describe, expect, it, vi } from "vitest"
import deTranslations from "../../i18n/locales/de/translations.json"
import enTranslations from "../../i18n/locales/en/translations.json"
import type { JoggerConnection, JoggerMode } from "../../lib/JoggerConnection"
import type { MotionStreamConnection } from "../../lib/MotionStreamConnection"
import { Pose3 } from "../../lib/Pose3"
import {
  ur5eDescription,
  ur5eMotionGroupState,
} from "./__fixtures__/motionStreamMockData"
import {
  JoggingRefusedError,
  type JoggingRefusedReason,
} from "./JoggingRefusedError"
import {
  JoggingStore,
  type JoggingStoreOptions,
  type JoggingStoreStorage,
} from "./JoggingStore"

const HALF_PI = Math.PI / 2

const worldFrame: CoordinateSystem = {
  coordinate_system: "world",
  name: "world",
  reference_coordinate_system: "",
  position: [0, 0, 0],
  orientation: [0, 0, 0],
  orientation_type: "ROTATION_VECTOR",
}

/** Rotated +90° about world Z, so its X axis points along world +Y */
const rotatedFrame: CoordinateSystem = {
  ...worldFrame,
  coordinate_system: "rotated-90-z",
  name: "Rotated 90° Z",
  position: [500, 0, 0],
  orientation: [0, 0, HALF_PI],
}

/** Defined on top of rotatedFrame, like controller user frames on a base frame */
const chainedFrame: CoordinateSystem = {
  ...worldFrame,
  coordinate_system: "chained",
  name: "Chained",
  reference_coordinate_system: "rotated-90-z",
  position: [0, 100, 0],
  orientation: [0, 0, HALF_PI],
}

function createMockMotionStream(
  state: MotionGroupState = ur5eMotionGroupState,
): MotionStreamConnection {
  const motionState = structuredClone(state)
  return {
    nova: {},
    controller: { controller: state.controller },
    motionGroup: { ...state },
    description: ur5eDescription,
    initialMotionState: state,
    rapidlyChangingMotionState: motionState,
    readoutState: motionState,
    motionGroupId: state.motion_group,
    controllerId: state.controller,
    cellId: "cell",
    joints: state.joint_position.map((_, index) => ({ index })),
    dispose: vi.fn(),
  } as unknown as MotionStreamConnection
}

function createMockJogger(
  motionStream: MotionStreamConnection = createMockMotionStream(),
): JoggerConnection {
  // With a prototype of its own, as the jogger: MobX would make the store's
  // `jogger` an observable copy of a plain object, with a mode of its own
  const jogger = Object.assign(Object.create({}), {
    nova: motionStream.nova,
    motionStream,
    motionGroupId: motionStream.motionGroupId,
    mode: "off" as JoggerMode,
    tcp: "Flange",
    orientation: "coordsys" as const,
    coordinateSystem: undefined,
    stop: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn().mockResolvedValue(undefined),
    translateTCP: vi.fn().mockResolvedValue(undefined),
    rotateTCP: vi.fn().mockResolvedValue(undefined),
    rotateJoints: vi.fn().mockResolvedValue(undefined),
    runIncrementalCartesianMotion: vi.fn().mockResolvedValue(undefined),
    setOptions: vi.fn().mockResolvedValue(undefined),
    // As the jogger: the mode is set at once, the websocket opens later
    setJoggingMode: vi.fn(async (mode: JoggerMode) => {
      jogger.mode = mode
    }),
    initializeJoggingWebsocket: vi.fn().mockResolvedValue(undefined),
  })
  return jogger as unknown as JoggerConnection
}

/** A promise that the test settles */
function deferred() {
  let resolve!: () => void
  let reject!: (error: unknown) => void
  const promise = new Promise<void>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

/** Lets queued promise callbacks run */
async function flush() {
  for (let i = 0; i < 20; i++) await Promise.resolve()
}

/** The jogger's mode changes that ask for `mode` */
function modeChangesTo(jogger: JoggerConnection, mode: JoggerMode) {
  return vi
    .mocked(jogger.setJoggingMode)
    .mock.calls.filter(([asked]) => asked === mode)
}

function createStore({
  coordinateSystems = [worldFrame, rotatedFrame, chainedFrame],
  description = ur5eDescription,
  jogger = createMockJogger(),
  tcps = [{ id: "Flange", readable_name: "Flange" } as unknown as RobotTcp],
  inverseSolver = "some-solver",
  storage,
  notMoveableReason,
}: {
  coordinateSystems?: CoordinateSystem[]
  description?: MotionGroupDescription
  jogger?: JoggerConnection
  tcps?: RobotTcp[]
  inverseSolver?: string | null | undefined
  storage?: JoggingStoreStorage
  notMoveableReason?: JoggingStoreOptions["notMoveableReason"]
} = {}) {
  return new JoggingStore(
    jogger,
    structuredClone(coordinateSystems),
    description,
    tcps,
    inverseSolver,
    { storage, notMoveableReason },
  )
}

/** The reason a start was refused with, or the test fails */
async function refusalOf(start: Promise<unknown>) {
  const error = await start.then(
    () => undefined,
    (e: unknown) => e,
  )
  expect(error).toBeInstanceOf(JoggingRefusedError)
  return (error as JoggingRefusedError).reason
}

/** A storage of the app's own, with what it holds to look into */
function memoryStorage(entries: Record<string, string> = {}) {
  const held = new Map(Object.entries(entries))
  return {
    getItem: (key: string) => held.get(key) ?? null,
    setItem: (key: string, value: string) => {
      held.set(key, value)
    },
    held,
  }
}

function expectVectorCloseTo(actual: number[] | undefined, expected: number[]) {
  expect(actual).toHaveLength(expected.length)
  expected.forEach((value, index) => {
    expect(actual?.[index]).toBeCloseTo(value)
  })
}

beforeEach(() => {
  localStorage.clear()
})

// Ported from RobotPad (unit/JoggingPanel.test.tsx, "Jog error")
describe("jog error", () => {
  it("starts with no latched jog error", () => {
    const store = createStore()
    expect(store.lastJogError).toBeNull()
  })

  it("latches a plain message from the jogger's onError handler", () => {
    const store = createStore()
    store.jogger.onError?.({ message: "Something went wrong" })
    expect(store.lastJogError).toBe("Something went wrong")
  })

  it("keeps a text that is not JSON as it is", () => {
    const store = createStore()
    store.jogger.onError?.("Connection lost")
    expect(store.lastJogError).toBe("Connection lost")
  })

  it("prefers add_trajectory_error.message over a generic message", () => {
    const store = createStore()
    store.jogger.onError?.({
      message: "generic failure",
      add_trajectory_error: {
        message: "Collision. \n'robotLink2' is in contact with 'safety_zone_5'",
      },
    })
    expect(store.lastJogError).toBe(
      "Collision. \n'robotLink2' is in contact with 'safety_zone_5'",
    )
  })

  it("unwraps a { result: ... } envelope", () => {
    const store = createStore()
    store.jogger.onError?.({
      result: { kind: "MOTION_ERROR", message: "Motion stopped" },
    })
    expect(store.lastJogError).toBe("Motion stopped")
  })

  it("parses a raw JSON string payload", () => {
    const store = createStore()
    store.jogger.onError?.(
      JSON.stringify({
        result: { kind: "MOTION_ERROR", message: "Faulted" },
      }),
    )
    expect(store.lastJogError).toBe("Faulted")
  })

  it("falls back to a generic message for an unrecognized shape", () => {
    const store = createStore()
    store.jogger.onError?.({ foo: "bar" })
    expect(store.lastJogError).toBe("Jogging motion failed")
  })

  it("has no friendly translation key for an unrecognized raw message", () => {
    const store = createStore()
    store.jogger.onError?.({ message: "Something went wrong" })
    expect(store.lastJogErrorTranslationKey).toBeNull()
  })

  it("maps a plan failure (PlanTrajectoryFailedResponse) to a cause-specific translation key", () => {
    const store = createStore()
    store.jogger.onError?.({
      error_feedback: {
        error_feedback_name: "FeedbackSingularity",
        singularity_type: "WRIST",
      },
    })
    expect(store.lastJogError).toBe("FeedbackSingularity")
    expect(store.lastJogErrorTranslationKey).toBe(
      "Jogging.StreamStateSection.Error.Singularity.lb",
    )
  })

  it.each([
    ["FeedbackSingularity", "Singularity"],
    ["FeedbackJointLimitExceeded", "JointLimit"],
    ["FeedbackOutOfWorkspace", "OutOfWorkspace"],
    ["FeedbackCollision", "Collision"],
    ["FeedbackNoSolutionInCurrentConfiguration", "NoSolutionInConfiguration"],
    ["FeedbackTorqueExceeded", "PlanningFailed"],
  ])("translates the plan failure %s in English and German", (cause, name) => {
    const store = createStore()
    store.jogger.onError?.({ error_feedback: { error_feedback_name: cause } })

    const key = `Jogging.StreamStateSection.Error.${name}.lb`
    expect(store.lastJogErrorTranslationKey).toBe(key)
    expect(enTranslations).toHaveProperty([key])
    expect(deTranslations).toHaveProperty([key])
  })

  it("still calls a previously registered onError handler", () => {
    const jogger = createMockJogger()
    const previous = vi.fn()
    jogger.onError = previous
    const store = createStore({ jogger })

    store.jogger.onError?.({ message: "boom" })
    expect(previous).toHaveBeenCalledWith({ message: "boom" })
    expect(store.lastJogError).toBe("boom")
  })

  it("clears the latched error when activate() is called", async () => {
    const store = createStore()
    store.jogger.onError?.({ message: "Something went wrong" })
    expect(store.lastJogError).toBe("Something went wrong")

    await store.activate()
    expect(store.lastJogError).toBeNull()
  })
})

describe("jogging along the TCP's axes", () => {
  it("is possible with an inverse solver", () => {
    const store = createStore()
    expect(store.canJogCartesian).toBe(true)
    expect(store.tabs.map((tab) => tab.id)).toEqual(["cartesian", "joint"])
  })

  it("is not possible when the kinematic model has no inverse solver, as a linear axis", () => {
    const store = createStore({ inverseSolver: null })
    expect(store.canJogCartesian).toBe(false)
    expect(store.tabs.map((tab) => tab.id)).toEqual(["joint"])
  })

  it("is assumed possible when the solver could not be loaded", () => {
    const store = createStore({ inverseSolver: undefined })
    expect(store.canJogCartesian).toBe(true)
  })
})

describe("velocity", () => {
  it("starts the translation at 10% of the robot's T1 limit", () => {
    const store = createStore({
      description: {
        ...ur5eDescription,
        operation_limits: {
          ...ur5eDescription.operation_limits,
          manual_t1_limits: { tcp: { velocity: 120 } },
        },
      },
    })
    expect(store.translationVelocityMmPerSec).toBe(12)
  })

  // Ported from RobotPad (unit/JoggingPanel.test.tsx)
  it("ignores velocities outside the slider range", () => {
    const store = createStore()
    const translation = store.translationVelocityMmPerSec
    const rotation = store.rotationVelocityDegPerSec
    store.setVelocityFromSlider(999, false)
    store.setVelocityFromSlider(Number.NaN, false)
    store.setVelocityFromSlider(0, true)
    expect(store.translationVelocityMmPerSec).toBe(translation)
    expect(store.rotationVelocityDegPerSec).toBe(rotation)
  })

  it("ignores a velocity that is not a number", () => {
    const store = createStore()
    store.setVelocityFromSlider(Number.NaN, false)
    store.setVelocityFromSlider(Number.NaN, true)
    expect(store.translationVelocityMmPerSec).toBe(25)
    expect(store.rotationVelocityDegPerSec).toBe(5)
  })

  it("takes the velocities at the bounds of the slider range", () => {
    const store = createStore()
    for (const useDegree of [false, true]) {
      const min = store.minVelocityInDisplayUnits(useDegree)
      const max = store.maxVelocityInDisplayUnits(useDegree)
      store.setVelocityFromSlider(min, useDegree)
      expect(store.velocityInDisplayUnits(useDegree)).toBe(min)
      store.setVelocityFromSlider(max, useDegree)
      expect(store.velocityInDisplayUnits(useDegree)).toBe(max)
    }
  })
})

// Store parts ported from RobotPad (unit/joggingRelativeToOptions.test.tsx)
describe("move relative to", () => {
  it("moves relative to world by default", () => {
    const store = createStore()
    expect(store.jogCoordSystemId).toBe("world")
    expect(store.selectedOrientation).toBe("coordsys")
  })

  it("resolves the jog coordinate system through its reference chain", () => {
    const store = createStore()
    store.setMoveRelativeToCoordSystem("chained")

    // 90° about Z on top of the reference frame's 90° about Z
    const orientation = Pose3.fromCoordinateSystem(
      store.jogCoordSystem,
    ).quaternion
    const xAxis = new Vector3(1, 0, 0).applyQuaternion(orientation)
    expectVectorCloseTo([xAxis.x, xAxis.y, xAxis.z], [-1, 0, 0])
  })

  it("moves relative to a coordinate system, and keeps the values relative to the selected one", () => {
    const store = createStore()
    store.setMoveRelativeToSelectedTcp()
    expect(store.selectedOrientation).toBe("tool")

    store.setMoveRelativeToCoordSystem("rotated-90-z")
    expect(store.selectedOrientation).toBe("coordsys")
    expect(store.jogCoordSystemId).toBe("rotated-90-z")
    expect(store.selectedCoordSystemId).toBe("world")
  })

  it("restores the jog coordinate system from local storage", () => {
    createStore().setMoveRelativeToCoordSystem("rotated-90-z")
    expect(createStore().jogCoordSystemId).toBe("rotated-90-z")
  })

  it("ignores a saved jog coordinate system that the robot does not have", () => {
    createStore().setMoveRelativeToCoordSystem("chained")
    const store = createStore({
      coordinateSystems: [worldFrame, rotatedFrame],
    })
    expect(store.jogCoordSystemId).toBe("world")
  })

  it("jogs along world when the controller lists no coordinate systems", async () => {
    const store = createStore({ coordinateSystems: [] })

    await store.activate()

    const coordinateSystem = store.jogger.coordinateSystem
    expect(coordinateSystem?.coordinate_system).toBe("world")
    expectVectorCloseTo(coordinateSystem?.position, [0, 0, 0])
  })

  it("hands the jog coordinate system, resolved into world, to the jogger", async () => {
    const store = createStore()
    store.setMoveRelativeToCoordSystem("chained")

    await store.activate()

    const coordinateSystem = store.jogger.coordinateSystem
    expect(coordinateSystem?.coordinate_system).toBe("chained")
    // 100 mm along the rotated frame's Y axis (world -X) from [500, 0, 0]
    expectVectorCloseTo(coordinateSystem?.position, [400, 0, 0])
  })

  it("jogs along the tool's axes when moving relative to the selected TCP", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    store.setMoveRelativeToSelectedTcp()

    await store.activate()

    expect(jogger.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({ orientation: "tool" }),
    )
  })
})

// Store parts ported from RobotPad (unit/JoggingPanel.test.tsx, "Jog button values")
describe("TCP pose in the selected coordinate system", () => {
  function storeWithReadout(
    readout: Partial<MotionGroupState>,
    selectedCoordSystemId: string,
  ) {
    const state = { ...ur5eMotionGroupState, ...readout }
    const store = createStore({
      jogger: createMockJogger(createMockMotionStream(state)),
    })
    store.setSelectedCoordSystemId(selectedCoordSystemId)
    return store
  }

  it("is the TCP position in the selected coordinate system", () => {
    const store = storeWithReadout({}, "rotated-90-z")

    // The TCP is at world (491.93, -133.28, 487.43)
    expectVectorCloseTo(store.tcpPoseInSelectedCoordSystem?.position, [
      -133.28,
      500 - 491.93,
      487.43,
    ])
  })

  it("is the TCP orientation in the selected coordinate system", () => {
    const store = storeWithReadout(
      { tcp_pose: { position: [0, 0, 0], orientation: [0, 0, 0] } },
      "rotated-90-z",
    )

    // Aligned with world, i.e. rotated -90° about the frame's Z
    expectVectorCloseTo(store.tcpPoseInSelectedCoordSystem?.orientation, [
      0,
      0,
      -HALF_PI,
    ])
  })

  it("is the streamed pose while the stream's coordinate system is selected", () => {
    const store = storeWithReadout({}, "world")

    expectVectorCloseTo(
      store.tcpPoseInSelectedCoordSystem?.position,
      ur5eMotionGroupState.tcp_pose?.position ?? [],
    )
  })

  // Ported from RobotPad (unit/poseReadouts.test.ts)
  it("is the readout, which holds while the joints only jitter, not the stored state", () => {
    const motionStream = createMockMotionStream()
    const readout = { position: [185, 0, 330], orientation: [0, 0, 0] }
    // What the stream delivered since: inside the noise filter, not shown yet
    Object.assign(motionStream.readoutState, { tcp_pose: readout })
    ;(
      motionStream as { rapidlyChangingMotionState: unknown }
    ).rapidlyChangingMotionState = {
      ...ur5eMotionGroupState,
      tcp_pose: { position: [185.1, 0.05, 330.02], orientation: [0, 0, 1e-4] },
    }
    const store = createStore({ jogger: createMockJogger(motionStream) })
    store.setSelectedCoordSystemId("world")

    expect(store.tcpPoseInSelectedCoordSystem).toEqual(readout)
  })

  it("takes the coordinate system that the stream reports the pose in", () => {
    const store = storeWithReadout(
      {
        coordinate_system: "rotated-90-z",
        tcp_pose: { position: [10, 0, 0], orientation: [0, 0, 0] },
      },
      "world",
    )

    expectVectorCloseTo(
      store.tcpPoseInSelectedCoordSystem?.position,
      [500, 10, 0],
    )
  })

  it("is undefined without a TCP pose", () => {
    const store = storeWithReadout({ tcp_pose: undefined }, "rotated-90-z")
    expect(store.tcpPoseInSelectedCoordSystem).toBeUndefined()
  })
})

describe("TCP pose in a TCP and coordinate system of their own", () => {
  const flange = {
    id: "Flange",
    position: [0, 0, 0],
    orientation: [0, 0, 0],
  } as RobotTcp
  /** 100 mm out along the flange's Z */
  const gripper = {
    id: "gripper",
    position: [0, 0, 100],
    orientation: [0, 0, 0],
  } as RobotTcp

  function storeWithReadout(readout: Partial<MotionGroupState>) {
    return createStore({
      jogger: createMockJogger(
        createMockMotionStream({
          ...ur5eMotionGroupState,
          tcp: "Flange",
          coordinate_system: "world",
          ...readout,
        }),
      ),
      tcps: [flange, gripper],
    })
  }

  it("is the pose of another TCP than the streamed one", () => {
    const store = storeWithReadout({
      // Turned 180° about X: the flange's Z points down
      tcp_pose: { position: [400, 0, 300], orientation: [Math.PI, 0, 0] },
    })

    const pose = store.tcpPoseIn("gripper", "world")
    expectVectorCloseTo(pose?.position, [400, 0, 200])
    expectVectorCloseTo(pose?.orientation, [Math.PI, 0, 0])
  })

  it("takes the TCP that the stream reports the pose of", () => {
    const store = storeWithReadout({
      tcp: "gripper",
      tcp_pose: { position: [400, 0, 200], orientation: [Math.PI, 0, 0] },
    })

    expectVectorCloseTo(
      store.tcpPoseIn("Flange", "world")?.position,
      [400, 0, 300],
    )
  })

  it("is relative to the coordinate system asked for, not the selected one", () => {
    const store = storeWithReadout({
      tcp_pose: { position: [10, 0, 0], orientation: [0, 0, 0] },
    })
    store.setSelectedCoordSystemId("world")

    // rotated-90-z is at world (500, 0, 0), its X along world +Y
    expectVectorCloseTo(
      store.tcpPoseIn("Flange", "rotated-90-z")?.position,
      [0, 490, 0],
    )
  })

  it("is undefined for an unknown TCP or coordinate system, or without a pose", () => {
    const store = storeWithReadout({})
    expect(store.tcpPoseIn("unknown", "world")).toBeUndefined()
    expect(store.tcpPoseIn("gripper", "unknown")).toBeUndefined()
    expect(
      storeWithReadout({ tcp_pose: undefined }).tcpPoseIn("Flange", "world"),
    ).toBeUndefined()
  })
})

describe("onBeforeActivate", () => {
  it("is awaited before the jogging starts", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    let release = () => {}
    store.onBeforeActivate = () =>
      new Promise<void>((resolve) => {
        release = resolve
      })

    const activation = store.activate()
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()

    release()
    await activation
    expect(jogger.setJoggingMode).toHaveBeenCalledWith("jogging")
  })

  it("keeps the jogging off when it fails", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    store.onBeforeActivate = () => Promise.reject(new Error("still moving"))

    await expect(store.activate()).rejects.toThrow("still moving")
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
  })
})

// The sequencing of hold-to-jog, ported from RobotPad's Robot control (and
// from useRobotControlProps, which had it before)
describe("jogging while a control is held", () => {
  it("jogs the TCP along an axis and about it, with the store's velocities", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })

    await store.startCartesianJogging("translate", "x", "+")
    expect(jogger.setJoggingMode).toHaveBeenCalledWith("jogging")
    expect(jogger.translateTCP).toHaveBeenCalledWith({
      axis: "x",
      direction: "+",
      velocityMmPerSec: store.translationVelocityMmPerSec,
    })

    await store.startCartesianJogging("rotate", "z", "-")
    expect(jogger.rotateTCP).toHaveBeenCalledWith({
      axis: "z",
      direction: "-",
      velocityRadsPerSec: store.rotationVelocityRadsPerSec,
    })
  })

  it("jogs a joint in rad/s with the rotation velocity, and a linear axis in mm/s with the translation velocity", async () => {
    const jogger = createMockJogger()
    await createStore({ jogger }).startJointJogging(2, "-")
    expect(jogger.setJoggingMode).toHaveBeenCalledWith("jogging")
    expect(jogger.rotateJoints).toHaveBeenCalledWith({
      joint: 2,
      direction: "-",
      velocityUnit: "rad/s",
      velocityValue: degreesToRadians(5),
    })

    const axis = createMockJogger()
    const linear = createStore({
      jogger: axis,
      description: {
        ...ur5eDescription,
        dh_parameters: [{ type: JointTypeEnum.PrismaticJoint }],
      },
    })
    await linear.startJointJogging(0, "+")
    expect(axis.rotateJoints).toHaveBeenCalledWith({
      joint: 0,
      direction: "+",
      velocityUnit: "mm/s",
      velocityValue: linear.translationVelocityMmPerSec,
    })
  })

  // activate() opens a trajectory while an increment is selected, and sets
  // the TCP's frame only on the Cartesian tab: a held jog needs neither
  // setting to be right
  it("opens the jogging connection for a held jog whatever tab and increment are selected", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    store.setSelectedIncrementId("1")
    store.setMoveRelativeToSelectedTcp()
    store.onTabChange({} as React.SyntheticEvent, 1)
    expect(store.currentTab.id).toBe("joint")

    await store.startCartesianJogging("translate", "y", "+")

    expect(jogger.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({ orientation: "tool" }),
    )
    expect(modeChangesTo(jogger, "trajectory")).toHaveLength(0)
    expect(jogger.translateTCP).toHaveBeenCalledOnce()

    store.onTabChange({} as React.SyntheticEvent, 0)
    await store.stopJogging()
    await store.startJointJogging(0, "+")

    expect(modeChangesTo(jogger, "trajectory")).toHaveLength(0)
    expect(jogger.rotateJoints).toHaveBeenCalledOnce()
  })

  // The jogging websocket takes about 0.1 to 0.5 s to open: a tap shorter
  // than that must not start a jog that nothing stops
  it("moves nothing when the jog is stopped before the jogging connection is ready", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const opening = deferred()
    vi.mocked(jogger.setJoggingMode).mockImplementation(async (mode) => {
      jogger.mode = mode
      if (mode === "jogging") await opening.promise
    })

    const cartesian = store.startCartesianJogging("translate", "x", "+")
    const stopped = store.stopJogging()
    const joint = store.startJointJogging(1, "+")
    const stoppedAgain = store.stopJogging()
    opening.resolve()
    await Promise.all([cartesian, stopped, joint, stoppedAgain])

    expect(jogger.translateTCP).not.toHaveBeenCalled()
    expect(jogger.rotateJoints).not.toHaveBeenCalled()
    expect(jogger.mode).toBe("off")
  })

  // Before the jogging websocket opens, the start may wait for another
  // motion to end (onBeforeActivate: Move to's staged pose) or for the TCP
  // and orientation to be set: a release then finds nothing to close yet.
  // The open websocket would hold the controller in control mode and keep
  // other clients from jogging.
  it.each([
    [
      "another motion ends",
      (store: JoggingStore, wait: Promise<void>) => {
        store.onBeforeActivate = () => wait
      },
    ],
    [
      "the orientation is set",
      (store: JoggingStore, wait: Promise<void>) => {
        store.setMoveRelativeToSelectedTcp()
        vi.mocked(store.jogger.setOptions).mockReturnValue(wait)
      },
    ],
  ])("closes the jogging connection of a press that was let go while %s", async (_name, prepare) => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const waiting = deferred()
    prepare(store, waiting.promise)

    const started = store.startCartesianJogging("translate", "x", "+")
    await flush()
    await store.stopJogging()
    waiting.resolve()
    await started

    expect(jogger.translateTCP).not.toHaveBeenCalled()
    expect(modeChangesTo(jogger, "jogging")).toHaveLength(1)
    expect(jogger.mode).toBe("off")
  })

  it("leaves the jogging connection to a press that followed the stop", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const ending = deferred()
    // The other motion ends for the first press; none is left for the next
    store.onBeforeActivate = vi
      .fn()
      .mockReturnValueOnce(ending.promise)
      .mockResolvedValue(undefined)
    const first = store.startJointJogging(1, "+")
    await flush()

    // A joint slider that turns around: a stop and a start in one event
    const stopped = store.stopJogging()
    const second = store.startJointJogging(1, "-")
    await Promise.all([stopped, second])
    ending.resolve()
    await first

    expect(jogger.rotateJoints).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ joint: 1, direction: "-" }),
    )
    expect(jogger.mode).toBe("jogging")
  })

  it("closes the jogging connection of a press that was let go and then failed to start", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const ending = deferred()
    store.onBeforeActivate = () => ending.promise
    // As the jogger: a websocket that NOVA does not confirm in time stays
    vi.mocked(jogger.setJoggingMode).mockImplementation(async (mode) => {
      jogger.mode = mode
      if (mode === "jogging") throw new Error("Jogging initialization timeout")
    })

    const started = store
      .startJointJogging(0, "+")
      .catch((error: unknown) => error)
    await flush()
    await store.stopJogging()
    ending.resolve()

    expect(await started).toEqual(new Error("Jogging initialization timeout"))
    expect(jogger.mode).toBe("off")
  })

  it("moves only for the latest press when another one came before the jogging connection was ready", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })

    await Promise.all([
      store.startCartesianJogging("translate", "x", "+"),
      store.startCartesianJogging("translate", "y", "-"),
    ])

    expect(jogger.translateTCP).toHaveBeenCalledOnce()
    expect(jogger.translateTCP).toHaveBeenCalledWith(
      expect.objectContaining({ axis: "y", direction: "-" }),
    )
  })

  it("stops the motion and closes the jogging connection on a stop", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    await store.startJointJogging(1, "+")

    await store.stopJogging()

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("off")
  })

  // A joint slider that turns around stops and starts in one event
  it("keeps the jogging connection on a stop when a start came in the same event", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    await store.startJointJogging(1, "+")

    const stopped = store.stopJogging()
    const started = store.startJointJogging(1, "-")
    await Promise.all([stopped, started])

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(modeChangesTo(jogger, "off")).toHaveLength(0)
    expect(jogger.rotateJoints).toHaveBeenLastCalledWith(
      expect.objectContaining({ joint: 1, direction: "-" }),
    )
  })

  // A lock that comes during a hold stops the jog itself (see "a held jog
  // that the robot may no longer make"); the release still comes
  it("takes the release of a jog also while the store is locked", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    await store.startCartesianJogging("translate", "x", "+")
    store.lock("external")
    await flush()
    expect(jogger.mode).toBe("off")

    await store.stopJogging()

    expect(jogger.stop).toHaveBeenCalled()
    expect(jogger.mode).toBe("off")
  })
})

describe("a step", () => {
  const tenMm = { id: "10", mm: 10, degrees: 5 }

  it("moves the TCP one increment along an axis or about it, as a trajectory", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const state = jogger.motionStream.rapidlyChangingMotionState

    await store.runIncrementalCartesianJog("translate", "z", "-", tenMm)
    expect(jogger.setJoggingMode).toHaveBeenCalledWith("trajectory")
    expect(jogger.runIncrementalCartesianMotion).toHaveBeenCalledWith({
      currentTcpPose: state.tcp_pose,
      currentJoints: state.joint_position,
      velocityInRelevantUnits: store.translationVelocityMmPerSec,
      axis: "z",
      direction: "-",
      motion: { type: "translate", distanceMm: 10 },
      refusedReason: expect.any(Function),
    })

    await store.runIncrementalCartesianJog("rotate", "x", "+", tenMm)
    expect(jogger.runIncrementalCartesianMotion).toHaveBeenLastCalledWith(
      expect.objectContaining({
        velocityInRelevantUnits: store.rotationVelocityRadsPerSec,
        axis: "x",
        direction: "+",
        motion: { type: "rotate", distanceRads: degreesToRadians(5) },
      }),
    )
  })

  // activate() opens the jogging connection while Continuous is selected:
  // a step needs no setting to be right
  it("runs as a trajectory whatever tab and increment are selected", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    store.setSelectedIncrementId("continuous")
    store.setMoveRelativeToSelectedTcp()
    store.onTabChange({} as React.SyntheticEvent, 1)

    await store.runIncrementalCartesianJog("translate", "x", "+", tenMm)

    expect(jogger.setOptions).toHaveBeenCalledWith(
      expect.objectContaining({ orientation: "tool" }),
    )
    expect(modeChangesTo(jogger, "jogging")).toHaveLength(0)
    expect(jogger.runIncrementalCartesianMotion).toHaveBeenCalledOnce()
  })

  it("shows which step runs and locks the store until the robot has made it", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const moving = deferred()
    vi.mocked(jogger.runIncrementalCartesianMotion).mockReturnValue(
      moving.promise,
    )

    const step = store.runIncrementalCartesianJog("translate", "y", "+", tenMm)
    await flush()
    expect(store.incrementJogInProgress).toEqual({ axis: "y", direction: "+" })
    expect(store.isLocked).toBe(true)

    moving.resolve()
    await step
    expect(store.incrementJogInProgress).toBeNull()
    expect(store.isLocked).toBe(false)
  })

  it("runs one step at a time: a step asked for while another runs moves nothing", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const moving = deferred()
    vi.mocked(jogger.runIncrementalCartesianMotion).mockReturnValue(
      moving.promise,
    )

    // The second comes before the first has even opened its trajectory
    const first = store.runIncrementalCartesianJog("translate", "x", "+", tenMm)
    const second = refusalOf(
      store.runIncrementalCartesianJog("translate", "x", "+", tenMm),
    )
    await flush()
    const third = refusalOf(
      store.runIncrementalCartesianJog("translate", "x", "-", tenMm),
    )
    moving.resolve()
    await first

    expect(await second).toEqual({ code: "locked" })
    expect(await third).toEqual({ code: "locked" })
    expect(jogger.runIncrementalCartesianMotion).toHaveBeenCalledOnce()
    expect(modeChangesTo(jogger, "trajectory")).toHaveLength(1)
  })

  it("is over when it fails: the store is unlocked and shows no step", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    vi.mocked(jogger.runIncrementalCartesianMotion).mockRejectedValue(
      new Error("Collision"),
    )

    await expect(
      store.runIncrementalCartesianJog("translate", "x", "+", tenMm),
    ).rejects.toThrow("Collision")

    expect(store.incrementJogInProgress).toBeNull()
    expect(store.isLocked).toBe(false)
  })

  it("moves nothing while the robot's TCP pose is not known", async () => {
    const jogger = createMockJogger(
      createMockMotionStream({ ...ur5eMotionGroupState, tcp_pose: undefined }),
    )
    const store = createStore({ jogger })

    await store.runIncrementalCartesianJog("translate", "x", "+", tenMm)

    expect(jogger.runIncrementalCartesianMotion).not.toHaveBeenCalled()
    expect(store.isLocked).toBe(false)
  })
})

// A held jog moves until its release. The store stops it itself when the
// robot may no longer move, so an app with controls of its own needs no
// rule for it: the jogging websocket holds the controller in control mode
// for as long as it is open.
describe("a held jog that the robot may no longer make", () => {
  /** Every held jog */
  const holds: [string, (store: JoggingStore) => Promise<void>][] = [
    [
      "a held jog of the TCP",
      (store) => store.startCartesianJogging("translate", "x", "+"),
    ],
    ["a held jog of a joint", (store) => store.startJointJogging(0, "+")],
  ]

  /** The velocity requests the jogger got */
  const velocities = (jogger: JoggerConnection) =>
    vi.mocked(jogger.translateTCP).mock.calls.length +
    vi.mocked(jogger.rotateJoints).mock.calls.length

  it.each(
    holds,
  )("%s stops, and its connection closes, when the robot may no longer move, and stays stopped", async (_name, hold) => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    await hold(store)
    expect(jogger.mode).toBe("jogging")

    runInAction(() => reason.set({ code: "deactivated" }))
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("off")

    // The reason goes away while the control is still held: nothing moves
    // until the next press
    runInAction(() => reason.set(null))
    await flush()
    expect(velocities(jogger)).toBe(1)
    expect(jogger.mode).toBe("off")

    // The release comes later
    await store.stopJogging()
    expect(jogger.mode).toBe("off")
  })

  it.each([
    [
      "something else locks the store",
      (store: JoggingStore) => store.lock("external"),
    ],
    [
      "another client takes the jogging connection",
      (store: JoggingStore) => store.block(),
    ],
  ])("stops when %s", async (_name, interrupt) => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    await store.startCartesianJogging("translate", "x", "+")

    interrupt(store)
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("off")
  })

  it("is not stopped any more once it is released", async () => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    await store.startJointJogging(1, "+")
    await store.stopJogging()
    expect(jogger.stop).toHaveBeenCalledOnce()

    runInAction(() => reason.set({ code: "deactivated" }))
    store.lock("external")
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
  })

  // A second finger, or a press that comes before the release of the one
  // before: one jog moves, so one stop
  it("stops once when a press followed another without its release", async () => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    await store.startCartesianJogging("translate", "x", "+")
    await store.startCartesianJogging("translate", "y", "+")

    runInAction(() => reason.set({ code: "deactivated" }))
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("off")
  })

  it("is not stopped any more once the press that followed it is released", async () => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    await store.startCartesianJogging("translate", "x", "+")
    await store.startCartesianJogging("translate", "y", "+")
    await store.stopJogging()

    runInAction(() => reason.set({ code: "deactivated" }))
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
  })

  // A joint slider that turns around stops and starts in one event: the
  // jog in the other direction is the one to watch
  it("watches the jog that followed in the same event", async () => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    await store.startJointJogging(1, "+")
    await Promise.all([store.stopJogging(), store.startJointJogging(1, "-")])
    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("jogging")

    runInAction(() => reason.set({ code: "deactivated" }))
    await flush()

    expect(jogger.stop).toHaveBeenCalledTimes(2)
    expect(jogger.mode).toBe("off")
  })
})

// Planning a step takes a round trip, and NOVA runs it to its end once it
// started it: a 10 mm step at 1 mm/s takes 10 s. NOVA switches a controller
// to control mode by itself for a movement request.
describe("a step that the robot may no longer make", () => {
  const tenMm = { id: "10", mm: 10, degrees: 5 }

  /** A step that runs until the test ends it, and what the jogger got */
  async function runningStep(store: JoggingStore) {
    const { jogger } = store
    const moving = deferred()
    vi.mocked(jogger.runIncrementalCartesianMotion).mockReturnValue(
      moving.promise,
    )
    const step = store.runIncrementalCartesianJog("translate", "x", "+", tenMm)
    await flush()
    const request = vi.mocked(jogger.runIncrementalCartesianMotion).mock
      .lastCall?.[0]
    if (!request?.refusedReason) throw new Error("No check for the jogger")
    return {
      step,
      refusedReason: request.refusedReason,
      end: async () => {
        moving.resolve()
        await step
      },
    }
  }

  it("is refused by the jogger right before it goes to NOVA while the robot may not move or something else locks the store, not for its own lock", async () => {
    const jogger = createMockJogger()
    // MobX sees no change of it: the jogger asks it right then
    let reason: JoggingRefusedReason | null = null
    const store = createStore({ jogger, notMoveableReason: () => reason })
    const { refusedReason, end } = await runningStep(store)
    expect(store.isLocked).toBe(true)

    // The step locks the store itself
    expect(refusedReason()).toBeNull()
    reason = { code: "deactivated" }
    expect(refusedReason()).toEqual({ code: "deactivated" })
    reason = null
    expect(refusedReason()).toBeNull()

    store.lock("external")
    expect(refusedReason()).toEqual({ code: "locked" })
    await end()
  })

  it("is stopped while it runs when the robot may no longer move, and stays stopped", async () => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    const { refusedReason, end } = await runningStep(store)
    expect(jogger.stop).not.toHaveBeenCalled()

    runInAction(() => reason.set({ code: "deactivated" }))

    expect(jogger.stop).toHaveBeenCalledOnce()
    // The step was stopped: it does not go on when the reason is gone, e.g.
    // while NOVA's answer to its trajectory is still to come
    runInAction(() => reason.set(null))
    expect(refusedReason()).toEqual({ code: "deactivated" })
    await end()
    expect(jogger.stop).toHaveBeenCalledOnce()
  })

  it.each([
    [
      "something else locks the store",
      (store: JoggingStore) => store.lock("external"),
    ],
    [
      "another client takes the jogging connection",
      (store: JoggingStore) => store.block(),
    ],
  ])("is stopped while it runs when %s", async (_name, interrupt) => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const { end } = await runningStep(store)

    interrupt(store)

    expect(jogger.stop).toHaveBeenCalledOnce()
    await end()
  })

  it("is not stopped any more once it is over", async () => {
    const jogger = createMockJogger()
    const reason = observable.box<JoggingRefusedReason | null>(null)
    const store = createStore({ jogger, notMoveableReason: () => reason.get() })
    const { end } = await runningStep(store)
    await end()

    runInAction(() => reason.set({ code: "deactivated" }))
    store.lock("external")

    expect(jogger.stop).not.toHaveBeenCalled()
  })

  it("is stopped for the store's owner, which learns when it is over", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    // Without a step there is nothing to wait for
    await store.stopIncrementalJog({ code: "deactivated" })
    expect(jogger.stop).not.toHaveBeenCalled()

    const { refusedReason, end } = await runningStep(store)
    let over = false
    const stopped = store
      .stopIncrementalJog({ code: "deactivated" })
      .then(() => {
        over = true
      })
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(refusedReason()).toEqual({ code: "deactivated" })
    expect(over).toBe(false)

    // The robot stands still: the step is over
    await end()
    await stopped
    expect(over).toBe(true)
  })

  // As a held jog stops on its release: e.g. the panel that started the
  // step goes away
  it("is stopped by its starter: paused while it runs, and over once the robot stands still", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const { refusedReason, step, end } = await runningStep(store)

    const stopped = store.stopIncrementalJog()
    await flush()

    expect(jogger.stop).toHaveBeenCalledOnce()
    // The jogger sends nothing more of it
    expect(refusedReason()).not.toBeNull()
    await end()
    await stopped
    await expect(step).resolves.toBeUndefined()
  })

  it("moves nothing when its starter stops it before it went to NOVA, and is no refusal", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const ending = deferred()
    store.onBeforeActivate = () => ending.promise
    // As the jogger: it asks the step's check before the trajectory goes out
    let sent = false
    vi.mocked(jogger.runIncrementalCartesianMotion).mockImplementation(
      async (request) => {
        const reason = request.refusedReason?.()
        if (reason) throw new JoggingRefusedError(reason)
        sent = true
      },
    )
    const step = store.runIncrementalCartesianJog("translate", "x", "+", tenMm)
    await flush()

    const stopped = store.stopIncrementalJog()
    ending.resolve()

    await expect(step).resolves.toBeUndefined()
    await stopped
    expect(sent).toBe(false)
    expect(store.isLocked).toBe(false)
    expect(store.incrementJogInProgress).toBeNull()
  })
})

// NOVA switches a controller to control mode by itself for a movement
// request: what stops a jog of a robot that may not move is this store
describe("a start that is refused", () => {
  const tenMm = { id: "10", mm: 10, degrees: 5 }

  /** Every way to start a jog */
  const starts: [string, (store: JoggingStore) => Promise<unknown>][] = [
    ["activate", (store) => store.activate()],
    [
      "a held jog of the TCP",
      (store) => store.startCartesianJogging("translate", "x", "+"),
    ],
    ["a held jog of a joint", (store) => store.startJointJogging(0, "+")],
    [
      "a step",
      (store) => store.runIncrementalCartesianJog("translate", "x", "+", tenMm),
    ],
  ]

  function expectNothingSent(jogger: JoggerConnection) {
    expect(jogger.setOptions).not.toHaveBeenCalled()
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
    expect(jogger.translateTCP).not.toHaveBeenCalled()
    expect(jogger.rotateJoints).not.toHaveBeenCalled()
    expect(jogger.runIncrementalCartesianMotion).not.toHaveBeenCalled()
  }

  it.each(
    starts,
  )("%s opens no jogging connection while the store's owner says the robot may not move", async (_name, start) => {
    const jogger = createMockJogger()
    let reason: JoggingRefusedReason | null = { code: "deactivated" }
    const store = createStore({ jogger, notMoveableReason: () => reason })
    // It would end another motion for a jog that does not start
    const onBeforeActivate = vi.fn()
    store.onBeforeActivate = onBeforeActivate

    expect(await refusalOf(start(store))).toEqual({ code: "deactivated" })
    expect(onBeforeActivate).not.toHaveBeenCalled()
    expectNothingSent(jogger)
    expect(store.isLocked).toBe(false)

    reason = null
    await start(store)
    expect(jogger.setJoggingMode).toHaveBeenCalledOnce()
  })

  it.each(
    starts,
  )("%s opens no jogging connection while the store is locked", async (_name, start) => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    store.lock("external")

    expect(await refusalOf(start(store))).toEqual({ code: "locked" })
    expectNothingSent(jogger)

    store.unlock("external")
    await start(store)
    expect(jogger.setJoggingMode).toHaveBeenCalledOnce()
  })

  // A panel can still show a store that its app has disposed
  it.each(
    starts,
  )("%s opens no jogging connection once the store is disposed", async (_name, start) => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })

    store.dispose()

    expect(await refusalOf(start(store))).toEqual({ code: "disconnected" })
    expectNothingSent(jogger)
  })

  it("changes no TCP and hands the jogger to no jogging once the store is disposed", async () => {
    const jogger = createMockJogger()
    const store = createStore({
      jogger,
      tcps: [
        { id: "Flange", readable_name: "Flange" },
        { id: "gripper", readable_name: "Gripper" },
      ] as unknown as RobotTcp[],
    })

    store.dispose()

    expect(await refusalOf(store.requestTcpChange("gripper"))).toEqual({
      code: "disconnected",
    })
    expect(await refusalOf(store.claimForJogging())).toEqual({
      code: "disconnected",
    })
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
  })

  it("says why the robot may not move, not that the store is locked, when both hold", async () => {
    const store = createStore({
      notMoveableReason: () => ({
        code: "safety_state",
        value: "SAFETY_STATE_STOP",
      }),
    })
    store.lock("external")

    const error = await store.activate().catch((e: unknown) => e)

    expect((error as JoggingRefusedError).reason).toEqual({
      code: "safety_state",
      value: "SAFETY_STATE_STOP",
    })
    expect((error as Error).message).toContain("SAFETY_STATE_STOP")
  })

  // onBeforeActivate ends another motion first, which takes its time
  it.each(
    starts,
  )("%s opens no jogging connection when the robot may no longer move once the other motion has ended", async (_name, start) => {
    const jogger = createMockJogger()
    let reason: JoggingRefusedReason | null = null
    const store = createStore({ jogger, notMoveableReason: () => reason })
    const ending = deferred()
    store.onBeforeActivate = () => ending.promise

    const started = refusalOf(start(store))
    reason = { code: "disconnected" }
    ending.resolve()

    expect(await started).toEqual({ code: "disconnected" })
    expectNothingSent(jogger)
    expect(store.isLocked).toBe(false)
  })

  // A step locks the store against other jogs, not against itself
  it("a step opens no trajectory when the store gets locked while the other motion ends", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const ending = deferred()
    store.onBeforeActivate = () => ending.promise

    const step = refusalOf(
      store.runIncrementalCartesianJog("translate", "x", "+", tenMm),
    )
    store.lock("external")
    ending.resolve()

    expect(await step).toEqual({ code: "locked" })
    expectNothingSent(jogger)
    expect(store.incrementJogInProgress).toBeNull()
  })

  it("keeps the error of the jog before, which a start that is not refused clears", async () => {
    const store = createStore()
    store.jogger.onError?.({ message: "Collision" })
    store.lock("external")

    await store.activate().catch(() => {})

    expect(store.lastJogError).toBe("Collision")
  })

  it("stops a jog also while the robot may no longer move", async () => {
    const jogger = createMockJogger()
    let reason: JoggingRefusedReason | null = null
    const store = createStore({ jogger, notMoveableReason: () => reason })
    await store.startCartesianJogging("translate", "x", "+")
    reason = { code: "safety_state", value: "SAFETY_STATE_STOP" }

    await store.stopJogging()

    expect(jogger.stop).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("off")
  })

  // A joint slider that turns around stops and starts in one event, and
  // the stop keeps the connection for that start
  it.each([
    [
      "the robot may no longer move",
      { code: "safety_state", value: "SAFETY_STATE_STOP" },
    ],
    ["the store got locked", { code: "locked" }],
  ] as [
    string,
    JoggingRefusedReason,
  ][])("closes the jogging connection that a stop kept for a start in the same event, when %s", async (_name, refusal) => {
    const jogger = createMockJogger()
    let reason: JoggingRefusedReason | null = null
    const store = createStore({ jogger, notMoveableReason: () => reason })
    await store.startJointJogging(1, "+")
    expect(jogger.mode).toBe("jogging")
    if (refusal.code === "locked") {
      store.lock("external")
    } else {
      reason = refusal
    }

    const stopped = store.stopJogging()
    const started = refusalOf(store.startJointJogging(1, "-"))
    await stopped

    expect(await started).toEqual(refusal)
    expect(jogger.rotateJoints).toHaveBeenCalledOnce()
    expect(jogger.mode).toBe("off")
  })

  // The press that followed owns the connection by then
  it("leaves the jogging connection to the press that followed a start that fails", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const ending = deferred()
    // The other motion does not end for the first start; the second finds
    // none to end
    store.onBeforeActivate = vi
      .fn()
      .mockReturnValueOnce(ending.promise)
      .mockResolvedValue(undefined)

    const first = store
      .startCartesianJogging("translate", "x", "+")
      .catch((e: unknown) => e)
    await store.startCartesianJogging("translate", "y", "+")
    expect(jogger.mode).toBe("jogging")
    ending.reject(new Error("still moving"))

    expect(await first).toEqual(new Error("still moving"))
    expect(jogger.mode).toBe("jogging")
    expect(jogger.translateTCP).toHaveBeenCalledOnce()
    expect(jogger.translateTCP).toHaveBeenCalledWith(
      expect.objectContaining({ axis: "y" }),
    )
  })

  // A step runs as a trajectory: a held jog that is refused because of it
  // must not end it
  it("leaves a running step alone when a held jog is refused meanwhile", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const moving = deferred()
    vi.mocked(jogger.runIncrementalCartesianMotion).mockReturnValue(
      moving.promise,
    )
    const step = store.runIncrementalCartesianJog("translate", "x", "+", tenMm)
    await flush()
    expect(jogger.mode).toBe("trajectory")

    expect(await refusalOf(store.startJointJogging(0, "+"))).toEqual({
      code: "locked",
    })
    expect(jogger.mode).toBe("trajectory")

    moving.resolve()
    await step
  })

  // A control that is released after a refused press still stops: the stop
  // belongs to no held jog then, and the jogger's stop would pause the step
  it("leaves a running step alone when the press of a refused held jog is released", async () => {
    const jogger = createMockJogger()
    const store = createStore({ jogger })
    const moving = deferred()
    vi.mocked(jogger.runIncrementalCartesianMotion).mockReturnValue(
      moving.promise,
    )
    const step = store.runIncrementalCartesianJog("translate", "x", "+", tenMm)
    await flush()
    await refusalOf(store.startJointJogging(0, "+"))

    await store.stopJogging()

    expect(jogger.stop).not.toHaveBeenCalled()
    expect(jogger.mode).toBe("trajectory")
    moving.resolve()
    await step

    // A stop with no step stops as before
    await store.stopJogging()
    expect(jogger.stop).toHaveBeenCalledOnce()
  })

  // The jogging websocket takes about 0.1 to 0.5 s to open, and NOVA holds
  // the controller in control mode for as long as it is open
  describe("once the jogging connection is open", () => {
    /** Every start that opens the jogging websocket */
    const opening = starts.filter(([name]) => name !== "a step")

    /** A jogger whose jogging websocket is open when the test says so */
    function joggerThatOpensLater() {
      const jogger = createMockJogger()
      const open = deferred()
      vi.mocked(jogger.setJoggingMode).mockImplementation(async (mode) => {
        jogger.mode = mode
        if (mode === "jogging") await open.promise
      })
      return { jogger, open }
    }

    it.each(
      opening,
    )("%s sends no velocity and closes the connection when the robot may no longer move", async (_name, start) => {
      const { jogger, open } = joggerThatOpensLater()
      let reason: JoggingRefusedReason | null = null
      const store = createStore({ jogger, notMoveableReason: () => reason })

      const started = refusalOf(start(store))
      await flush()
      expect(jogger.mode).toBe("jogging")
      reason = { code: "deactivated" }
      open.resolve()

      expect(await started).toEqual({ code: "deactivated" })
      expect(jogger.translateTCP).not.toHaveBeenCalled()
      expect(jogger.rotateJoints).not.toHaveBeenCalled()
      expect(jogger.mode).toBe("off")
    })

    it.each(
      opening,
    )("%s sends no velocity and closes the connection when the store got locked", async (_name, start) => {
      const { jogger, open } = joggerThatOpensLater()
      const store = createStore({ jogger })

      const started = refusalOf(start(store))
      await flush()
      store.lock("external")
      open.resolve()

      expect(await started).toEqual({ code: "locked" })
      expect(jogger.translateTCP).not.toHaveBeenCalled()
      expect(jogger.rotateJoints).not.toHaveBeenCalled()
      expect(jogger.mode).toBe("off")
    })
  })
})

// A TCP change goes to NOVA through the jogging websocket, which the store
// opens for it when the jogger is idle: a movement connection, for which
// NOVA switches the controller to control mode by itself
describe("a TCP change", () => {
  const flange = {
    id: "Flange",
    readable_name: "Flange",
  } as unknown as RobotTcp
  const gripper = {
    id: "gripper",
    readable_name: "Gripper",
  } as unknown as RobotTcp

  /** A jogger whose controller reports the new TCP once it is asked to */
  function joggerThatConfirms() {
    const jogger = createMockJogger()
    vi.mocked(jogger.setJoggingMode).mockImplementation(async (mode) => {
      jogger.mode = mode
      if (mode === "jogging") {
        jogger.motionStream.rapidlyChangingMotionState.tcp = jogger.tcp
      }
    })
    return jogger
  }

  it("goes to NOVA through the jogging connection of an idle jogger, which closes again", async () => {
    const jogger = joggerThatConfirms()
    const store = createStore({ jogger, tcps: [flange, gripper] })

    await store.requestTcpChange("gripper")

    expect(modeChangesTo(jogger, "jogging")).toHaveLength(1)
    expect(store.selectedTcpId).toBe("gripper")
    expect(jogger.mode).toBe("off")
    expect(store.tcpChangeInProgress).toBe(false)
  })

  it.each([
    [
      "the store's owner says the robot may not move",
      (store: JoggingStore) => store,
      { code: "deactivated" } as JoggingRefusedReason,
    ],
    [
      "the store is locked",
      (store: JoggingStore) => {
        store.lock("external")
        return store
      },
      { code: "locked" } as JoggingRefusedReason,
    ],
  ])("opens no jogging connection while %s", async (_name, prepare, expected) => {
    const jogger = joggerThatConfirms()
    const store = prepare(
      createStore({
        jogger,
        tcps: [flange, gripper],
        notMoveableReason: () => (expected.code === "locked" ? null : expected),
      }),
    )

    expect(await refusalOf(store.requestTcpChange("gripper"))).toEqual(expected)

    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
    expect(jogger.tcp).toBe("Flange")
    expect(store.selectedTcpId).toBe("Flange")
    expect(store.tcpChangeInProgress).toBe(false)
  })

  // Move to's staged pose holds the controller's execution session, and
  // NOVA refuses the jogging connection while that is alive: the change
  // went back after 3 s, with an error
  it("hands back another motion first, as a jog does", async () => {
    const jogger = joggerThatConfirms()
    const store = createStore({ jogger, tcps: [flange, gripper] })
    const ending = deferred()
    store.onBeforeActivate = () => ending.promise

    const change = store.requestTcpChange("gripper")
    await flush()
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
    expect(store.tcpChangeInProgress).toBe(true)

    ending.resolve()
    await change
    expect(modeChangesTo(jogger, "jogging")).toHaveLength(1)
    expect(store.selectedTcpId).toBe("gripper")
    expect(jogger.mode).toBe("off")
  })

  it("keeps the TCP and opens no jogging connection when the other motion does not end", async () => {
    const jogger = joggerThatConfirms()
    const store = createStore({ jogger, tcps: [flange, gripper] })
    store.onBeforeActivate = () => Promise.reject(new Error("still moving"))

    await expect(store.requestTcpChange("gripper")).rejects.toThrow(
      "still moving",
    )

    expect(jogger.setJoggingMode).not.toHaveBeenCalled()
    expect(jogger.tcp).toBe("Flange")
    expect(store.selectedTcpId).toBe("Flange")
    expect(store.tcpChangeInProgress).toBe(false)
  })

  it("closes the jogging connection and keeps the TCP when the robot may no longer move once the connection is open", async () => {
    const jogger = createMockJogger()
    const open = deferred()
    vi.mocked(jogger.setJoggingMode).mockImplementation(async (mode) => {
      jogger.mode = mode
      if (mode === "jogging") await open.promise
    })
    let reason: JoggingRefusedReason | null = null
    const store = createStore({
      jogger,
      tcps: [flange, gripper],
      notMoveableReason: () => reason,
    })

    const change = refusalOf(store.requestTcpChange("gripper"))
    await flush()
    reason = { code: "safety_state", value: "SAFETY_STATE_STOP" }
    open.resolve()

    expect(await change).toEqual(reason)
    expect(jogger.mode).toBe("off")
    expect(jogger.tcp).toBe("Flange")
    expect(store.selectedTcpId).toBe("Flange")
    expect(store.tcpChangeInProgress).toBe(false)
  })
})

describe("the connection that another client blocked", () => {
  /**
   * A jogger whose jogging websocket NOVA refuses while `held` says so,
   * because another client jogs: as the real jogger, it tells its onBlocked
   * and the opening ends without an error
   */
  function joggerThatIsBlocked(held: { byAnother: boolean }) {
    const jogger = createMockJogger()
    vi.mocked(jogger.setJoggingMode).mockImplementation(async (mode) => {
      jogger.mode = mode
      if (mode === "jogging" && held.byAnother) jogger.onBlocked?.()
    })
    return jogger
  }

  it("moves nothing, closes again and stays refused with a reason of its own until unblock()", async () => {
    const held = { byAnother: true }
    const jogger = joggerThatIsBlocked(held)
    const store = createStore({ jogger })

    expect(
      await refusalOf(store.startCartesianJogging("translate", "x", "+")),
    ).toEqual({ code: "blocked" })
    expect(store.blocked).toBe(true)
    expect(jogger.translateTCP).not.toHaveBeenCalled()
    expect(jogger.mode).toBe("off")

    // No start asks NOVA again by itself: the user decides to try again
    vi.mocked(jogger.setJoggingMode).mockClear()
    const error = await store.startJointJogging(0, "+").catch((e: unknown) => e)
    expect((error as JoggingRefusedError).reason).toEqual({ code: "blocked" })
    expect((error as Error).message).toContain("another client")
    expect(
      await refusalOf(
        store.runIncrementalCartesianJog("translate", "x", "+", {
          id: "1",
          mm: 1,
          degrees: 0.5,
        }),
      ),
    ).toEqual({ code: "blocked" })
    expect(await refusalOf(store.requestTcpChange("gripper"))).toEqual({
      code: "blocked",
    })
    expect(jogger.setJoggingMode).not.toHaveBeenCalled()

    // The other client is gone
    held.byAnother = false
    store.unblock()
    await store.startCartesianJogging("translate", "x", "+")
    expect(jogger.translateTCP).toHaveBeenCalledOnce()
  })

  it("says that the robot may not move rather than that the connection is blocked, and that rather than that the store is locked", async () => {
    let reason: JoggingRefusedReason | null = { code: "deactivated" }
    const store = createStore({ notMoveableReason: () => reason })
    store.block()
    store.lock("external")

    expect(await refusalOf(store.activate())).toEqual({ code: "deactivated" })
    reason = null
    expect(await refusalOf(store.activate())).toEqual({ code: "blocked" })
  })

  // unblock() opens the jogging websocket again for a jogger that an app
  // keeps in jogging mode
  it("is opened again by unblock() only for a robot that may move", async () => {
    const jogger = createMockJogger()
    let reason: JoggingRefusedReason | null = null
    const store = createStore({ jogger, notMoveableReason: () => reason })
    jogger.mode = "jogging"
    store.block()

    reason = { code: "deactivated" }
    store.unblock()
    await flush()
    expect(jogger.initializeJoggingWebsocket).not.toHaveBeenCalled()
    expect(jogger.mode).toBe("off")

    jogger.mode = "jogging"
    reason = null
    store.unblock()
    expect(jogger.initializeJoggingWebsocket).toHaveBeenCalledOnce()
  })
})

describe("create", () => {
  it("makes a store from data that was loaded before", () => {
    const store = JoggingStore.create(createMockJogger(), {
      coordinateSystems: [worldFrame, rotatedFrame],
      description: {
        ...ur5eDescription,
        tcps: {
          gripper: {
            name: "Gripper",
            pose: { position: [0, 0, 150], orientation: [0, 0, 0] },
          },
        },
      },
      kinematicModel: { inverse_solver: null } as unknown as KinematicModel,
    })

    expect(store.coordSystems.map((cs) => cs.coordinate_system)).toEqual([
      "world",
      "rotated-90-z",
    ])
    expect(store.tcps).toEqual([
      {
        id: "gripper",
        readable_name: "Gripper",
        position: [0, 0, 150],
        orientation: [0, 0, 0],
      },
    ])
    // No inverse solver: no cartesian jogging
    expect(store.tabs.map((tab) => tab.id)).toEqual(["joint"])
  })

  it("keeps the jogging settings in the storage it is given", () => {
    const storage = memoryStorage()
    const store = JoggingStore.create(
      createMockJogger(),
      {
        coordinateSystems: [worldFrame],
        description: ur5eDescription,
        kinematicModel: { inverse_solver: null } as unknown as KinematicModel,
      },
      { storage },
    )

    store.setSelectedOrientation("tool")

    expect(
      JSON.parse(storage.held.get("joggingToolStore") ?? "{}")
        .selectedOrientation,
    ).toBe("tool")
  })
})

describe("jogging settings", () => {
  it("start as the app's storage holds them", () => {
    const storage = memoryStorage({
      joggingToolStore: JSON.stringify({
        selectedOrientation: "tool",
        selectedCartesianMotionType: "rotate",
      }),
    })

    const store = createStore({ storage })

    expect(store.selectedOrientation).toBe("tool")
    expect(store.selectedCartesianMotionType).toBe("rotate")
  })

  it("are kept in the app's storage, not in localStorage", () => {
    const storage = memoryStorage()
    const store = createStore({ storage })

    store.setSelectedCartesianMotionType("rotate")

    expect(
      JSON.parse(storage.held.get("joggingToolStore") ?? "{}")
        .selectedCartesianMotionType,
    ).toBe("rotate")
    expect(localStorage.getItem("joggingToolStore")).toBeNull()
  })

  it("are kept in localStorage when the app gives no storage", () => {
    const store = createStore()

    store.setSelectedOrientation("tool")

    expect(
      JSON.parse(localStorage.getItem("joggingToolStore") ?? "{}")
        .selectedOrientation,
    ).toBe("tool")
  })

  it("the store puts nothing on window", () => {
    // biome-ignore lint/suspicious/noExplicitAny: window has no such property
    delete (window as any).joggingStore

    createStore()

    expect("joggingStore" in window).toBe(false)
  })
})
