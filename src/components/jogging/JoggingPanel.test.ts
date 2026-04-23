import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import type { MotionGroupDescription, MotionGroupState, RobotTcp } from "@wandelbots/nova-js/v2"
import { describe, expect, it, vi } from "vitest"
import { JoggerConnection } from "../../lib/JoggerConnection"
import type { MotionStreamConnection } from "../../lib/MotionStreamConnection"
import { JoggingStore } from "./JoggingStore"

// ---------------------------------------------------------------------------
// Mock helpers – inline mock factories for three motion group setups
// ---------------------------------------------------------------------------

function mockMotionStream(opts: {
  jointCount: number
  firstJointType: JointTypeEnum
  tcp?: string
  dhParameters?: MotionGroupDescription["dh_parameters"]
}): MotionStreamConnection {
  const jointPosition = new Array(opts.jointCount).fill(0)

  return {
    nova: {} as any,
    controller: { controller: "mock-ctrl" } as any,
    motionGroup: {
      motion_group: "0@mock-ctrl",
      tcp: opts.tcp,
      joint_position: jointPosition,
      standstill: true,
    } as unknown as MotionGroupState,
    description: {
      motion_group_model: "MockModel",
      cycle_time: 0.004,
      mounting: {},
      operation_limits: { auto_limits: {} },
      dh_parameters: opts.dhParameters ?? [
        { type: opts.firstJointType },
      ],
    } as unknown as MotionGroupDescription,
    initialMotionState: {
      joint_position: jointPosition,
      standstill: true,
    } as unknown as MotionGroupState,
    motionStateSocket: { changeUrl: vi.fn(), close: vi.fn() } as any,
    rapidlyChangingMotionState: {
      joint_position: jointPosition,
      standstill: true,
      tcp_pose: { position: [0, 0, 0], orientation: [0, 0, 0] },
    } as unknown as MotionGroupState,
    motionGroupId: "0@mock-ctrl",
    controllerId: "mock-ctrl",
    joints: jointPosition.map((_: number, i: number) => ({ index: i })),
    dispose: vi.fn(),
  } as unknown as MotionStreamConnection
}

function makeDhParams(count: number, type: JointTypeEnum) {
  return Array.from({ length: count }, () => ({ type }))
}

// ---------------------------------------------------------------------------
// Three standard setups used across tests
// ---------------------------------------------------------------------------

/** Standard 6-joint revolute robot (e.g. UR5e) */
function setup6JointRevolute() {
  return mockMotionStream({
    jointCount: 6,
    firstJointType: JointTypeEnum.RevoluteJoint,
    tcp: "Flange",
    dhParameters: makeDhParams(6, JointTypeEnum.RevoluteJoint),
  })
}

/** Single-joint prismatic axis */
function setup1JointPrismatic() {
  return mockMotionStream({
    jointCount: 1,
    firstJointType: JointTypeEnum.PrismaticJoint,
    tcp: undefined,
    dhParameters: makeDhParams(1, JointTypeEnum.PrismaticJoint),
  })
}

/** 2-joint revolute robot without inverse solver */
function setup2JointRevolute() {
  return mockMotionStream({
    jointCount: 2,
    firstJointType: JointTypeEnum.RevoluteJoint,
    tcp: undefined,
    dhParameters: makeDhParams(2, JointTypeEnum.RevoluteJoint),
  })
}

// ---------------------------------------------------------------------------
// Helper to build a JoggingStore from a mock motion stream
// ---------------------------------------------------------------------------

function createJoggingStore(
  motionStream: MotionStreamConnection,
  inverseSolver: string | null | undefined,
) {
  // Mock localStorage so the constructor doesn't throw
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null)
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {})

  const jogger = new JoggerConnection(motionStream)

  const description = motionStream.description as MotionGroupDescription

  const store = new JoggingStore(
    jogger,
    /* coordSystems */ [],
    description,
    /* tcps */ [{ id: "Flange" } as RobotTcp],
    inverseSolver,
  )

  return { store, jogger }
}

// ===========================================================================
// 1. Cartesian tab visibility
// ===========================================================================

describe("Cartesian tab visibility", () => {
  it("6-joint revolute with solver shows both cartesian and joint tabs", () => {
    const ms = setup6JointRevolute()
    const { store } = createJoggingStore(ms, "some-solver")

    const tabIds = store.tabs.map((t) => t.id)
    expect(tabIds).toContain("cartesian")
    expect(tabIds).toContain("joint")
  })

  it("1-joint prismatic with solver shows both cartesian and joint tabs", () => {
    const ms = setup1JointPrismatic()
    const { store } = createJoggingStore(ms, "some-solver")

    const tabIds = store.tabs.map((t) => t.id)
    expect(tabIds).toContain("cartesian")
    expect(tabIds).toContain("joint")
  })

  it("2-joint revolute without solver (inverseSolver=null) shows only joint tab", () => {
    const ms = setup2JointRevolute()
    const { store } = createJoggingStore(ms, null)

    const tabIds = store.tabs.map((t) => t.id)
    expect(tabIds).not.toContain("cartesian")
    expect(tabIds).toContain("joint")
    expect(tabIds).toHaveLength(1)
  })

  it("inverseSolver=undefined (loading/unknown) shows both tabs as fallback", () => {
    const ms = setup6JointRevolute()
    const { store } = createJoggingStore(ms, undefined)

    const tabIds = store.tabs.map((t) => t.id)
    expect(tabIds).toContain("cartesian")
    expect(tabIds).toContain("joint")
  })
})

// ===========================================================================
// 2. mm / deg velocity conversions
// ===========================================================================

describe("Velocity unit conversions (mm/deg)", () => {
  it("rotationVelocityRadsPerSec converts degrees to radians correctly", () => {
    const ms = setup6JointRevolute()
    const { store } = createJoggingStore(ms, "solver")

    // Default is 1 °/s
    expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI / 180)

    store.rotationVelocityDegPerSec = 180
    expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI)

    store.rotationVelocityDegPerSec = 90
    expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI / 2)
  })

  it("velocityInDisplayUnits returns deg/s when useDegree=true, mm/s when false", () => {
    const ms = setup6JointRevolute()
    const { store } = createJoggingStore(ms, "solver")

    store.translationVelocityMmPerSec = 42
    store.rotationVelocityDegPerSec = 15

    expect(store.velocityInDisplayUnits(false)).toBe(42)
    expect(store.velocityInDisplayUnits(true)).toBe(15)
  })

  it("setVelocityFromSlider updates the correct velocity field", () => {
    const ms = setup6JointRevolute()
    const { store } = createJoggingStore(ms, "solver")

    store.setVelocityFromSlider(50, false)
    expect(store.translationVelocityMmPerSec).toBe(50)
    // rotation should be unchanged from default
    expect(store.rotationVelocityDegPerSec).toBe(1)

    store.setVelocityFromSlider(30, true)
    expect(store.rotationVelocityDegPerSec).toBe(30)
    // translation should be unchanged
    expect(store.translationVelocityMmPerSec).toBe(50)
  })

  it("minVelocityInDisplayUnits and maxVelocityInDisplayUnits return correct bounds", () => {
    const ms = setup6JointRevolute()
    const { store } = createJoggingStore(ms, "solver")

    // Translation (mm/s)
    expect(store.minVelocityInDisplayUnits(false)).toBe(store.minTranslationVelocityMmPerSec)
    expect(store.maxVelocityInDisplayUnits(false)).toBe(store.maxTranslationVelocityMmPerSec)

    // Rotation (deg/s)
    expect(store.minVelocityInDisplayUnits(true)).toBe(store.minRotationVelocityDegPerSec)
    expect(store.maxVelocityInDisplayUnits(true)).toBe(store.maxRotationVelocityDegPerSec)
  })
})

// ===========================================================================
// 3. JoggerConnection TCP resolution
// ===========================================================================

describe("JoggerConnection TCP resolution", () => {
  it("6-joint revolute defaults to 'Flange' TCP from motionGroup.tcp", () => {
    const ms = setup6JointRevolute()
    const jogger = new JoggerConnection(ms)

    expect(jogger.tcp).toBe("Flange")
  })

  it("1-joint prismatic without motionGroup.tcp gets undefined (NO_TCP)", () => {
    const ms = setup1JointPrismatic()
    const jogger = new JoggerConnection(ms)

    expect(jogger.tcp).toBeUndefined()
  })

  it("2-joint revolute without motionGroup.tcp gets undefined (NO_TCP)", () => {
    const ms = setup2JointRevolute()
    const jogger = new JoggerConnection(ms)

    expect(jogger.tcp).toBeUndefined()
  })

  it("explicit tcp option overrides any default", () => {
    const ms = setup1JointPrismatic()
    const jogger = new JoggerConnection(ms, { tcp: "MyCustomTool" })

    expect(jogger.tcp).toBe("MyCustomTool")
  })

  it("6-joint revolute with explicit tcp option uses the provided value", () => {
    const ms = setup6JointRevolute()
    const jogger = new JoggerConnection(ms, { tcp: "GripperTCP" })

    expect(jogger.tcp).toBe("GripperTCP")
  })

  it("6-joint revolute with no motionGroup.tcp falls back to DEFAULT_TCP", () => {
    // Create a 6-joint revolute but without motionGroup.tcp set
    const ms = mockMotionStream({
      jointCount: 6,
      firstJointType: JointTypeEnum.RevoluteJoint,
      tcp: undefined,
      dhParameters: makeDhParams(6, JointTypeEnum.RevoluteJoint),
    })
    const jogger = new JoggerConnection(ms)

    // 6 joints → getDefaultTcp returns DEFAULT_TCP ("Flange")
    expect(jogger.tcp).toBe("Flange")
  })
})



