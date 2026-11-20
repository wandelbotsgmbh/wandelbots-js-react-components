import type {
  CoordinateSystem,
  KinematicModel,
  MotionGroupDescription,
  MotionGroupState,
  RobotTcp,
} from "@wandelbots/nova-js/v2"
import { Vector3 } from "three"
import { beforeEach, describe, expect, it, vi } from "vitest"
import deTranslations from "../../i18n/locales/de/translations.json"
import enTranslations from "../../i18n/locales/en/translations.json"
import type { JoggerConnection } from "../../lib/JoggerConnection"
import type { MotionStreamConnection } from "../../lib/MotionStreamConnection"
import { Pose3 } from "../../lib/Pose3"
import {
  ur5eDescription,
  ur5eMotionGroupState,
} from "./__fixtures__/motionStreamMockData"
import { JoggingStore } from "./JoggingStore"

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
  return {
    nova: motionStream.nova,
    motionStream,
    motionGroupId: motionStream.motionGroupId,
    mode: "off" as const,
    tcp: "Flange",
    orientation: "coordsys" as const,
    coordinateSystem: undefined,
    stop: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn().mockResolvedValue(undefined),
    translateTCP: vi.fn().mockResolvedValue(undefined),
    rotateTCP: vi.fn().mockResolvedValue(undefined),
    setOptions: vi.fn().mockResolvedValue(undefined),
    setJoggingMode: vi.fn().mockResolvedValue(undefined),
    initializeJoggingWebsocket: vi.fn().mockResolvedValue(undefined),
  } as unknown as JoggerConnection
}

function createStore({
  coordinateSystems = [worldFrame, rotatedFrame, chainedFrame],
  description = ur5eDescription,
  jogger = createMockJogger(),
  tcps = [{ id: "Flange", readable_name: "Flange" } as unknown as RobotTcp],
}: {
  coordinateSystems?: CoordinateSystem[]
  description?: MotionGroupDescription
  jogger?: JoggerConnection
  tcps?: RobotTcp[]
} = {}) {
  return new JoggingStore(
    jogger,
    structuredClone(coordinateSystems),
    description,
    tcps,
    "some-solver",
  )
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
})
