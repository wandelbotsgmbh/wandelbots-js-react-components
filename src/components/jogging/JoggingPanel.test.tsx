import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi, beforeEach } from "vitest"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import type {
  CoordinateSystem,
  MotionGroupDescription,
  MotionGroupState,
  RobotTcp,
  DHParameter,
} from "@wandelbots/nova-js/v2"
import { JoggingStore } from "./JoggingStore"
import { JoggingJointTab } from "./JoggingJointTab"
import { JoggingCartesianTab } from "./JoggingCartesianTab"
import { I18nextProvider } from "react-i18next"
import { i18n } from "../../i18n/config"
import { JoggerConnection } from "../../lib/JoggerConnection"
import type { JoggerConnection as JoggerConnectionType } from "../../lib/JoggerConnection"
import type { MotionStreamConnection } from "../../lib/MotionStreamConnection"
import {
  ur5eMotionGroupState,
  ur5eDescription,
  turnMockMotionGroupState,
  turnMockDescription,
  linearAxisMotionGroupState,
  linearAxisDescription,
} from "./__fixtures__/motionStreamMockData"

// ---------- helpers ----------

function createMockMotionStream(
  motionGroupState: MotionGroupState,
  description: MotionGroupDescription,
  tcpOverride?: string,
): MotionStreamConnection {
  const jointPositions = motionGroupState.joint_position as number[]

  return {
    nova: {} as any,
    controller: { controller: motionGroupState.controller } as any,
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
    } as any,
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
      expect(store.tabs[0]!.id).toBe("joint")
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
      renderWithI18n(
        <JoggingJointTab store={store}>
          <></>
        </JoggingJointTab>,
      )

      const wrapper = screen.getByTestId("jogging-joint-value-controls-wrapper")
      for (let i = 0; i < 6; i++) {
        expect(
          within(wrapper).getByTestId(`jogging-joint-value-control-${i}`),
        ).toBeInTheDocument()
      }
    })

    it("renders the joint tab", () => {
      renderWithI18n(
        <JoggingJointTab store={store}>
          <></>
        </JoggingJointTab>,
      )
      expect(screen.getByTestId("jogging-joint-tab")).toBeInTheDocument()
    })

    it("renders the cartesian tab with translate/rotate toggle", () => {
      renderWithI18n(
        <JoggingCartesianTab store={store}>
          <></>
        </JoggingCartesianTab>,
      )
      expect(screen.getByTestId("jogging-cartesian-tab")).toBeInTheDocument()
    })

    it("shows X, Y, Z axis controls in cartesian tab", () => {
      renderWithI18n(
        <JoggingCartesianTab store={store}>
          <></>
        </JoggingCartesianTab>,
      )
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
      expect(store.tabs[0]!.id).toBe("joint")
    })

    it("uses mm/s as velocity unit for prismatic joints", () => {
      const useDegree = store.jointType === JointTypeEnum.RevoluteJoint
      expect(useDegree).toBe(false)
    })

    it("renders 1 joint control for single-axis prismatic group", () => {
      renderWithI18n(
        <JoggingJointTab store={store}>
          <></>
        </JoggingJointTab>,
      )

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
      renderWithI18n(
        <JoggingJointTab store={store}>
          <></>
        </JoggingJointTab>,
      )

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

      renderWithI18n(
        <JoggingJointTab store={store}>
          <></>
        </JoggingJointTab>,
      )

      expect(screen.getByText("G1")).toBeInTheDocument()
      expect(screen.getByText("G2")).toBeInTheDocument()
    })

    it("hides joint labels when showJointsLegend is disabled", () => {
      const store = createJoggingStore({
        motionGroupState: turnMockMotionGroupState,
        description: turnMockDescription,
      })
      store.showJointsLegend = false

      renderWithI18n(
        <JoggingJointTab store={store}>
          <></>
        </JoggingJointTab>,
      )

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
