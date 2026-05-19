import { render, screen, within } from "@testing-library/react"
import type {
  CoordinateSystem,
  MotionGroupDescription,
  MotionGroupState,
  RobotTcp,
} from "@wandelbots/nova-js/v2"
import { JointTypeEnum, OperationMode } from "@wandelbots/nova-js/v2"
import { I18nextProvider } from "react-i18next"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { i18n } from "../../i18n/config"
import type { JoggerConnection as JoggerConnectionType } from "../../lib/JoggerConnection"
import { JoggerConnection } from "../../lib/JoggerConnection"
import type { MotionStreamConnection } from "../../lib/MotionStreamConnection"
import {
  linearAxisDescription,
  linearAxisMotionGroupState,
  turnMockDescription,
  turnMockMotionGroupState,
  ur5eDescription,
  ur5eMotionGroupState,
} from "./__fixtures__/motionStreamMockData"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingStore } from "./JoggingStore"

// ---------- helpers ----------

function createMockMotionStream(
  motionGroupState: MotionGroupState,
  description: MotionGroupDescription,
  tcpOverride?: string,
): MotionStreamConnection {
  const jointPositions = motionGroupState.joint_position as number[]

  return {
    nova: {},
    controller: { controller: motionGroupState.controller },
    motionGroup: {
      ...motionGroupState,
      tcp: tcpOverride,
    } as unknown as MotionGroupState,
    description,
    initialMotionState: motionGroupState,
    motionStateSocket: {
      addEventListener: vi.fn(),
      changeUrl: vi.fn(),
      close: vi.fn(),
    },
    rapidlyChangingMotionState: { ...motionGroupState },
    motionGroupId: motionGroupState.motion_group,
    controllerId: motionGroupState.controller,
    joints: jointPositions.map((_: number, i: number) => ({ index: i })),
    dispose: vi.fn(),
  } as unknown as MotionStreamConnection
}

function createMockJogger(
  motionStream: MotionStreamConnection,
): JoggerConnectionType {
  return {
    nova: motionStream.nova,
    motionStream,
    motionGroupId: motionStream.motionGroupId,
    mode: "off" as const,
    tcp: "Flange",
    orientation: "coordsys" as const,
    numJoints: motionStream.joints.length,
    stop: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn().mockResolvedValue(undefined),
    rotateJoints: vi.fn().mockResolvedValue(undefined),
    translateTCP: vi.fn().mockResolvedValue(undefined),
    rotateTCP: vi.fn().mockResolvedValue(undefined),
    setOptions: vi.fn(),
    setJoggingMode: vi.fn().mockResolvedValue(undefined),
    initializeJoggingWebsocket: vi.fn().mockResolvedValue(undefined),
    onBlocked: undefined,
  } as unknown as JoggerConnectionType
}

/** Create a JoggingStore from real captured motion group state data */
function createJoggingStore(opts: {
  motionGroupState: MotionGroupState
  description: MotionGroupDescription
  inverseSolver?: string | null | undefined
}): JoggingStore {
  const motionStream = createMockMotionStream(
    opts.motionGroupState,
    opts.description,
  )
  const jogger = createMockJogger(motionStream)

  const coordSystems: CoordinateSystem[] = [
    { coordinate_system: "world", name: "World" } as CoordinateSystem,
  ]

  const tcps: RobotTcp[] = [
    {
      id: "Flange",
      readable_name: "Flange",
      position: [0, 0, 0],
      orientation: [0, 0, 0],
    } as unknown as RobotTcp,
  ]

  return new JoggingStore(
    jogger,
    coordSystems,
    opts.description,
    tcps,
    opts.inverseSolver !== undefined ? opts.inverseSolver : "some-solver",
  )
}

/** Shorthand: create a UR5e-based store (6 revolute joints) with optional overrides */
function createUr5eStore(inverseSolver?: string | null | undefined) {
  return createJoggingStore({
    motionGroupState: ur5eMotionGroupState,
    description: ur5eDescription,
    inverseSolver,
  })
}

function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

// ---------- tests ----------

describe("JoggingPanel", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // ---- Tab visibility (cartesian tab shown / hidden) ----

  describe("Cartesian tab visibility", () => {
    it("shows both Cartesian and Joint tabs when inverseSolver is defined (string)", () => {
      const store = createUr5eStore("some-ik-solver")
      expect(store.tabs).toHaveLength(2)
      expect(store.tabs.map((t) => t.id)).toContain("cartesian")
      expect(store.tabs.map((t) => t.id)).toContain("joint")
    })

    it("shows both Cartesian and Joint tabs when inverseSolver is undefined (could not be loaded)", () => {
      const store = createUr5eStore(undefined)
      expect(store.tabs).toHaveLength(2)
      expect(store.tabs.map((t) => t.id)).toContain("cartesian")
    })

    it("hides Cartesian tab when inverseSolver is null (explicitly no solver)", () => {
      const store = createUr5eStore(null)
      expect(store.tabs).toHaveLength(1)
      expect(store.tabs[0]?.id).toBe("joint")
      expect(store.tabs.map((t) => t.id)).not.toContain("cartesian")
    })

    it("defaults to cartesian tab when solver is available", () => {
      const store = createUr5eStore("solver")
      expect(store.currentTab.id).toBe("cartesian")
    })

    it("defaults to joint tab when solver is null", () => {
      const store = createUr5eStore(null)
      expect(store.currentTab.id).toBe("joint")
    })
  })

  // ---- 6-joint revolute motion group (UR5e) ----

  describe("6-joint revolute motion group (UR5e)", () => {
    let store: JoggingStore

    beforeEach(() => {
      store = createJoggingStore({
        motionGroupState: ur5eMotionGroupState,
        description: ur5eDescription,
        inverseSolver: "ik-solver",
      })
    })

    it("has the correct joint type", () => {
      expect(store.jointType).toBe(JointTypeEnum.RevoluteJoint)
    })

    it("displays 6 joint controls in the joint tab", () => {
      renderWithI18n(<JoggingJointTab store={store}></JoggingJointTab>)

      const wrapper = screen.getByTestId("jogging-joint-value-controls-wrapper")
      for (let i = 0; i < 6; i++) {
        expect(
          within(wrapper).getByTestId(`jogging-joint-value-control-${i}`),
        ).toBeInTheDocument()
      }
    })

    it("renders the joint tab", () => {
      renderWithI18n(<JoggingJointTab store={store}></JoggingJointTab>)
      expect(screen.getByTestId("jogging-joint-tab")).toBeInTheDocument()
    })

    it("renders the cartesian tab with translate/rotate toggle", () => {
      renderWithI18n(<JoggingCartesianTab store={store}></JoggingCartesianTab>)
      expect(screen.getByTestId("jogging-cartesian-tab")).toBeInTheDocument()
    })

    it("shows X, Y, Z axis controls in cartesian tab", () => {
      renderWithI18n(<JoggingCartesianTab store={store}></JoggingCartesianTab>)
      for (const axis of ["x", "y", "z"]) {
        expect(
          screen.getByTestId(`jogging-cartesian-axis-control-${axis}`),
        ).toBeInTheDocument()
      }
    })

    it("has both cartesian and joint tabs available", () => {
      expect(store.tabs).toHaveLength(2)
    })
  })

  // ---- Prismatic motion group (linear axis) ----

  describe("Prismatic motion group (linear axis)", () => {
    let store: JoggingStore

    beforeEach(() => {
      store = createJoggingStore({
        motionGroupState: linearAxisMotionGroupState,
        description: linearAxisDescription,
        inverseSolver: null,
      })
    })

    it("has the correct joint type", () => {
      expect(store.jointType).toBe(JointTypeEnum.PrismaticJoint)
    })

    it("only shows joint tab (no cartesian) when solver is null", () => {
      expect(store.tabs).toHaveLength(1)
      expect(store.tabs[0]?.id).toBe("joint")
    })

    it("uses mm/s as velocity unit for prismatic joints", () => {
      const useDegree = store.jointType === JointTypeEnum.RevoluteJoint
      expect(useDegree).toBe(false)
    })

    it("renders 1 joint control for single-axis prismatic group", () => {
      renderWithI18n(<JoggingJointTab store={store}></JoggingJointTab>)

      const wrapper = screen.getByTestId("jogging-joint-value-controls-wrapper")
      expect(
        within(wrapper).getByTestId("jogging-joint-value-control-0"),
      ).toBeInTheDocument()
      expect(
        within(wrapper).queryByTestId("jogging-joint-value-control-1"),
      ).not.toBeInTheDocument()
    })
  })

  // ---- 2-joint motion group (turn mock) ----

  describe("2-joint motion group (turn mock)", () => {
    let store: JoggingStore

    beforeEach(() => {
      store = createJoggingStore({
        motionGroupState: turnMockMotionGroupState,
        description: turnMockDescription,
        inverseSolver: "solver-2j",
      })
    })

    it("has the correct joint type", () => {
      expect(store.jointType).toBe(JointTypeEnum.RevoluteJoint)
    })

    it("displays exactly 2 joint controls", () => {
      renderWithI18n(<JoggingJointTab store={store}></JoggingJointTab>)

      const wrapper = screen.getByTestId("jogging-joint-value-controls-wrapper")
      expect(
        within(wrapper).getByTestId("jogging-joint-value-control-0"),
      ).toBeInTheDocument()
      expect(
        within(wrapper).getByTestId("jogging-joint-value-control-1"),
      ).toBeInTheDocument()
      expect(
        within(wrapper).queryByTestId("jogging-joint-value-control-2"),
      ).not.toBeInTheDocument()
    })

    it("has cartesian tab available when solver is present", () => {
      expect(store.tabs.map((t) => t.id)).toContain("cartesian")
    })
  })

  // ---- Locking / Unlocking ----

  describe("Locking", () => {
    it("starts unlocked", () => {
      const store = createUr5eStore()
      expect(store.isLocked).toBe(false)
    })

    it("can be locked and unlocked via external lock", () => {
      const store = createUr5eStore()
      store.lock("external")
      expect(store.isLocked).toBe(true)

      store.unlock("external")
      expect(store.isLocked).toBe(false)
    })

    it("supports multiple simultaneous locks", () => {
      const store = createUr5eStore()
      store.lock("lock-a")
      store.lock("lock-b")
      expect(store.isLocked).toBe(true)

      store.unlock("lock-a")
      expect(store.isLocked).toBe(true) // still locked by lock-b

      store.unlock("lock-b")
      expect(store.isLocked).toBe(false)
    })
  })

  // ---- Blocking ----

  describe("Blocking", () => {
    it("starts unblocked", () => {
      const store = createUr5eStore()
      expect(store.blocked).toBe(false)
    })

    it("can be blocked and unblocked", () => {
      const store = createUr5eStore()
      store.block()
      expect(store.blocked).toBe(true)

      store.unblock()
      expect(store.blocked).toBe(false)
    })
  })

  // ---- Tab switching ----

  describe("Tab switching", () => {
    it("can switch from cartesian to joint tab", () => {
      const store = createUr5eStore("solver")
      expect(store.currentTab.id).toBe("cartesian")

      store.onTabChange({} as React.SyntheticEvent, 1)
      expect(store.currentTab.id).toBe("joint")
    })

    it("can switch back to cartesian tab", () => {
      const store = createUr5eStore("solver")
      store.onTabChange({} as React.SyntheticEvent, 1)
      expect(store.currentTab.id).toBe("joint")

      store.onTabChange({} as React.SyntheticEvent, 0)
      expect(store.currentTab.id).toBe("cartesian")
    })

    it("falls back to first tab when selected tab is invalid", () => {
      const store = createUr5eStore(null)
      // biome-ignore lint/suspicious/noExplicitAny: intentionally setting invalid tab id to test fallback
      store.selectedTabId = "cartesian" as any
      expect(store.currentTab.id).toBe("joint")
    })
  })

  // ---- Velocity settings ----

  describe("Velocity settings", () => {
    it("has default translation velocity", () => {
      const store = createUr5eStore()
      expect(store.translationVelocityMmPerSec).toBe(10)
    })

    it("has default rotation velocity", () => {
      const store = createUr5eStore()
      expect(store.rotationVelocityDegPerSec).toBe(1)
    })

    it("converts rotation velocity to radians correctly", () => {
      const store = createUr5eStore()
      store.rotationVelocityDegPerSec = 180
      expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI)
    })

    it("updates translation velocity via slider setter", () => {
      const store = createUr5eStore()
      store.setVelocityFromSlider(50, false)
      expect(store.translationVelocityMmPerSec).toBe(50)
    })

    it("updates rotation velocity via slider setter", () => {
      const store = createUr5eStore()
      store.setVelocityFromSlider(30, true)
      expect(store.rotationVelocityDegPerSec).toBe(30)
    })
  })

  // ---- Cartesian motion type ----

  describe("Cartesian motion type", () => {
    it("defaults to translate", () => {
      const store = createUr5eStore()
      expect(store.selectedCartesianMotionType).toBe("translate")
    })

    it("can switch to rotate", () => {
      const store = createUr5eStore()
      store.setSelectedCartesianMotionType("rotate")
      expect(store.selectedCartesianMotionType).toBe("rotate")
    })
  })

  // ---- Orientation & coordinate system ----

  describe("Orientation and coordinate system", () => {
    it("defaults to coordsys orientation", () => {
      const store = createUr5eStore()
      expect(store.selectedOrientation).toBe("coordsys")
    })

    it("can switch to tool orientation", () => {
      const store = createUr5eStore()
      store.setSelectedOrientation("tool")
      expect(store.selectedOrientation).toBe("tool")
      expect(store.activeCoordSystemId).toBe("tool")
    })

    it("uses selected coordinate system when not in tool orientation", () => {
      const store = createUr5eStore()
      expect(store.activeCoordSystemId).toBe("world")
    })
  })

  // ---- Increment options ----

  describe("Increment options", () => {
    it("defaults to continuous jogging", () => {
      const store = createUr5eStore()
      expect(store.selectedIncrementId).toBe("continuous")
    })

    it("has no active discrete increment when continuous", () => {
      const store = createUr5eStore()
      expect(store.activeDiscreteIncrement).toBeUndefined()
    })

    it("has active discrete increment when a discrete option is selected", () => {
      const store = createUr5eStore()
      store.setSelectedIncrementId("1")
      expect(store.activeDiscreteIncrement).toBeDefined()
      expect(store.activeDiscreteIncrement?.mm).toBe(1)
    })

    it("disables discrete increment when in tool orientation", () => {
      const store = createUr5eStore()
      store.setSelectedIncrementId("1")
      store.setSelectedOrientation("tool")
      expect(store.activeDiscreteIncrement).toBeUndefined()
    })
  })

  // ---- Joint legends ----

  describe("Joint legends", () => {
    it("shows joint labels when showJointsLegend is enabled", () => {
      const store = createJoggingStore({
        motionGroupState: turnMockMotionGroupState,
        description: turnMockDescription,
      })
      store.showJointsLegend = true

      renderWithI18n(<JoggingJointTab store={store}></JoggingJointTab>)

      expect(screen.getByText("G1")).toBeInTheDocument()
      expect(screen.getByText("G2")).toBeInTheDocument()
    })

    it("hides joint labels when showJointsLegend is disabled", () => {
      const store = createJoggingStore({
        motionGroupState: turnMockMotionGroupState,
        description: turnMockDescription,
      })
      store.showJointsLegend = false

      renderWithI18n(<JoggingJointTab store={store}></JoggingJointTab>)

      expect(screen.queryByText("G1")).not.toBeInTheDocument()
    })
  })

  // ---- Dispose ----

  describe("Dispose", () => {
    it("disposes the jogger connection when store is disposed", () => {
      const motionStream = createMockMotionStream(
        ur5eMotionGroupState,
        ur5eDescription,
      )
      const jogger = createMockJogger(motionStream)

      const store = new JoggingStore(
        jogger,
        [{ coordinate_system: "world", name: "World" } as CoordinateSystem],
        ur5eDescription,
        [],
        "solver",
      )

      store.dispose()
      expect(jogger.dispose).toHaveBeenCalled()
    })
  })

  // ---- Velocity unit conversions ----

  describe("Velocity unit conversions (mm/deg)", () => {
    it("rotationVelocityRadsPerSec converts degrees to radians correctly", () => {
      const store = createUr5eStore("solver")

      // Default is 1 °/s
      expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI / 180)

      store.rotationVelocityDegPerSec = 180
      expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI)

      store.rotationVelocityDegPerSec = 90
      expect(store.rotationVelocityRadsPerSec).toBeCloseTo(Math.PI / 2)
    })

    it("velocityInDisplayUnits returns deg/s when useDegree=true, mm/s when false", () => {
      const store = createUr5eStore("solver")

      store.translationVelocityMmPerSec = 42
      store.rotationVelocityDegPerSec = 15

      expect(store.velocityInDisplayUnits(false)).toBe(42)
      expect(store.velocityInDisplayUnits(true)).toBe(15)
    })

    it("setVelocityFromSlider updates the correct velocity field", () => {
      const store = createUr5eStore("solver")

      store.setVelocityFromSlider(50, false)
      expect(store.translationVelocityMmPerSec).toBe(50)
      expect(store.rotationVelocityDegPerSec).toBe(1)

      store.setVelocityFromSlider(30, true)
      expect(store.rotationVelocityDegPerSec).toBe(30)
      expect(store.translationVelocityMmPerSec).toBe(50)
    })

    it("minVelocityInDisplayUnits and maxVelocityInDisplayUnits return correct bounds", () => {
      const store = createUr5eStore("solver")

      expect(store.minVelocityInDisplayUnits(false)).toBe(
        store.minTranslationVelocityMmPerSec,
      )
      expect(store.maxVelocityInDisplayUnits(false)).toBe(
        store.maxTranslationVelocityMmPerSec,
      )
      expect(store.minVelocityInDisplayUnits(true)).toBe(
        store.minRotationVelocityDegPerSec,
      )
      expect(store.maxVelocityInDisplayUnits(true)).toBe(
        store.maxRotationVelocityDegPerSec,
      )
    })
  })

  // ---- Joint-specific velocity ----

  describe("Joint velocity", () => {
    describe("setJointVelocityFromSlider", () => {
      it("updates jointVelocityDegPerSec for revolute joints and leaves mm/s field unchanged", () => {
        const store = createUr5eStore()
        store.setJointVelocityFromSlider(45)
        expect(store.jointVelocityDegPerSec).toBe(45)
        expect(store.jointTranslationVelocityMmPerSec).toBe(10)
      })

      it("updates jointTranslationVelocityMmPerSec for prismatic joints and leaves deg/s field unchanged", () => {
        const store = createJoggingStore({
          motionGroupState: linearAxisMotionGroupState,
          description: linearAxisDescription,
          inverseSolver: null,
        })
        store.setJointVelocityFromSlider(80)
        expect(store.jointTranslationVelocityMmPerSec).toBe(80)
        expect(store.jointVelocityDegPerSec).toBe(1)
      })
    })

    describe("velocityInDisplayUnits with isJointVelocity=true", () => {
      it("returns jointVelocityDegPerSec for revolute joints", () => {
        const store = createUr5eStore()
        store.jointVelocityDegPerSec = 30
        expect(store.velocityInDisplayUnits(true, true)).toBe(30)
      })

      it("returns jointTranslationVelocityMmPerSec for prismatic joints", () => {
        const store = createJoggingStore({
          motionGroupState: linearAxisMotionGroupState,
          description: linearAxisDescription,
          inverseSolver: null,
        })
        store.jointTranslationVelocityMmPerSec = 75
        expect(store.velocityInDisplayUnits(false, true)).toBe(75)
      })

      it("is independent from cartesian velocity fields when isJointVelocity=true", () => {
        const store = createUr5eStore()
        store.rotationVelocityDegPerSec = 99
        store.jointVelocityDegPerSec = 5
        expect(store.velocityInDisplayUnits(true, true)).toBe(5)
        expect(store.velocityInDisplayUnits(true, false)).toBe(99)
      })
    })

    describe("maxJointVelocityInDisplayUnits", () => {
      it("falls back to rotationVelocityFallbackDegPerSec when no API limits (revolute)", () => {
        const store = createUr5eStore()
        expect(store.maxJointVelocityInDisplayUnits).toBe(
          store.rotationVelocityFallbackDegPerSec,
        )
      })

      it("falls back to translationVelocityFallbackMmPerSec when no API limits (prismatic)", () => {
        const store = createJoggingStore({
          motionGroupState: linearAxisMotionGroupState,
          description: linearAxisDescription,
          inverseSolver: null,
        })
        expect(store.maxJointVelocityInDisplayUnits).toBe(
          store.translationVelocityFallbackMmPerSec,
        )
      })

      it("converts rad/s joint velocity to deg/s for revolute joints", () => {
        const descWithLimits = {
          ...ur5eDescription,
          operation_limits: {
            auto_limits: { joints: [{ velocity: Math.PI }] },
          },
        } as unknown as MotionGroupDescription
        const store = createJoggingStore({
          motionGroupState: ur5eMotionGroupState,
          description: descWithLimits,
        })
        // Math.PI rad/s → 180 deg/s, floored → 180
        expect(store.maxJointVelocityInDisplayUnits).toBe(180)
      })

      it("uses raw mm/s joint velocity for prismatic joints without conversion", () => {
        const descWithLimits = {
          ...linearAxisDescription,
          operation_limits: {
            auto_limits: { joints: [{ velocity: 100.9 }] },
          },
        } as unknown as MotionGroupDescription
        const store = createJoggingStore({
          motionGroupState: linearAxisMotionGroupState,
          description: descWithLimits,
          inverseSolver: null,
        })
        // 100.9 mm/s, floored → 100
        expect(store.maxJointVelocityInDisplayUnits).toBe(100)
      })

      it("takes the maximum velocity across multiple revolute joints", () => {
        const descWithLimits = {
          ...ur5eDescription,
          operation_limits: {
            auto_limits: {
              joints: [
                { velocity: Math.PI / 4 }, // ~45 deg/s
                { velocity: Math.PI }, // 180 deg/s
                { velocity: Math.PI / 2 }, // ~90 deg/s
              ],
            },
          },
        } as unknown as MotionGroupDescription
        const store = createJoggingStore({
          motionGroupState: ur5eMotionGroupState,
          description: descWithLimits,
        })
        expect(store.maxJointVelocityInDisplayUnits).toBe(180)
      })
    })
  })

  // ---- activeOperationLimits ----

  describe("activeOperationLimits", () => {
    const descWithAllLimits = {
      ...ur5eDescription,
      operation_limits: {
        auto_limits: { joints: [{ velocity: 1 }] },
        manual_limits: { joints: [{ velocity: 2 }] },
        manual_t1_limits: { joints: [{ velocity: 3 }] },
        manual_t2_limits: { joints: [{ velocity: 4 }] },
      },
    } as unknown as MotionGroupDescription

    function storeWithAllLimits() {
      return createJoggingStore({
        motionGroupState: ur5eMotionGroupState,
        description: descWithAllLimits,
      })
    }

    it("returns auto_limits when operationMode is OperationModeAuto", () => {
      const store = storeWithAllLimits()
      store.operationMode = OperationMode.OperationModeAuto
      expect(store.activeOperationLimits?.joints?.[0]?.velocity).toBe(1)
    })

    it("returns manual_limits when operationMode is OperationModeManual", () => {
      const store = storeWithAllLimits()
      store.operationMode = OperationMode.OperationModeManual
      expect(store.activeOperationLimits?.joints?.[0]?.velocity).toBe(2)
    })

    it("returns manual_t1_limits when operationMode is OperationModeManualT1", () => {
      const store = storeWithAllLimits()
      store.operationMode = OperationMode.OperationModeManualT1
      expect(store.activeOperationLimits?.joints?.[0]?.velocity).toBe(3)
    })

    it("returns manual_t2_limits when operationMode is OperationModeManualT2", () => {
      const store = storeWithAllLimits()
      store.operationMode = OperationMode.OperationModeManualT2
      expect(store.activeOperationLimits?.joints?.[0]?.velocity).toBe(4)
    })

    it("falls back to auto_limits when operationMode is null (controller did not report a mode)", () => {
      const store = storeWithAllLimits()
      store.operationMode = null
      expect(store.activeOperationLimits?.joints?.[0]?.velocity).toBe(1)
    })

    it("falls back to auto_limits when mode is Manual but manual_limits is absent", () => {
      const descAutoOnly = {
        ...ur5eDescription,
        operation_limits: {
          auto_limits: { joints: [{ velocity: 1 }] },
        },
      } as unknown as MotionGroupDescription
      const store = createJoggingStore({
        motionGroupState: ur5eMotionGroupState,
        description: descAutoOnly,
      })
      store.operationMode = OperationMode.OperationModeManual
      expect(store.activeOperationLimits?.joints?.[0]?.velocity).toBe(1)
    })
  })

  // ---- JoggerConnection TCP resolution ----

  describe("JoggerConnection TCP resolution", () => {
    it("6-joint revolute defaults to 'Flange' TCP from motionGroup.tcp", () => {
      const ms = createMockMotionStream(
        ur5eMotionGroupState,
        ur5eDescription,
        "Flange",
      )
      const jogger = new JoggerConnection(ms)
      expect(jogger.tcp).toBe("Flange")
    })

    it("1-joint prismatic without motionGroup.tcp gets undefined (NO_TCP)", () => {
      const ms = createMockMotionStream(
        linearAxisMotionGroupState,
        linearAxisDescription,
      )
      const jogger = new JoggerConnection(ms)
      expect(jogger.tcp).toBeUndefined()
    })

    it("1-joint prismatic with motionGroup.tcp keeps tcp", () => {
      const ms = createMockMotionStream(
        linearAxisMotionGroupState,
        linearAxisDescription,
        "PrismaticTCP",
      )
      const jogger = new JoggerConnection(ms)
      expect(jogger.tcp).toBe("PrismaticTCP")
    })

    it("2-joint revolute without motionGroup.tcp gets undefined (NO_TCP)", () => {
      const ms = createMockMotionStream(
        turnMockMotionGroupState,
        turnMockDescription,
      )
      const jogger = new JoggerConnection(ms)
      expect(jogger.tcp).toBeUndefined()
    })

    it("explicit tcp option overrides any default", () => {
      const ms = createMockMotionStream(
        linearAxisMotionGroupState,
        linearAxisDescription,
      )
      const jogger = new JoggerConnection(ms, { tcp: "MyCustomTool" })
      expect(jogger.tcp).toBe("MyCustomTool")
    })

    it("6-joint revolute with explicit tcp option uses the provided value", () => {
      const ms = createMockMotionStream(
        ur5eMotionGroupState,
        ur5eDescription,
        "Flange",
      )
      const jogger = new JoggerConnection(ms, { tcp: "GripperTCP" })
      expect(jogger.tcp).toBe("GripperTCP")
    })

    it("6-joint revolute with no motionGroup.tcp falls back to DEFAULT_TCP", () => {
      const ms = createMockMotionStream(ur5eMotionGroupState, ur5eDescription)
      const jogger = new JoggerConnection(ms)
      expect(jogger.tcp).toBe("Flange")
    })
  })
})
