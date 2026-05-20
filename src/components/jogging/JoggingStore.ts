import { tryParseJson } from "@wandelbots/nova-js"
import {
  JointTypeEnum,
  OperationMode,
  type CoordinateSystem,
  type JointLimits,
  type KinematicModel,
  type MotionGroupDescription,
  type RobotTcp,
} from "@wandelbots/nova-js/v2"
import { countBy } from "lodash-es"
import keyBy from "lodash-es/keyBy.js"
import uniqueId from "lodash-es/uniqueId.js"
import { autorun, makeAutoObservable, type IReactionDisposer } from "mobx"
import type {
  JoggerConnection,
  JoggerOrientation,
  Vector3Simple,
} from "../../lib/JoggerConnection"
import { degreesToRadians, radiansToDegree } from "../utils/converters"

const discreteIncrementOptions = [
  { id: "0.1", mm: 0.1, degrees: 0.05 },
  { id: "1", mm: 1, degrees: 0.5 },
  { id: "5", mm: 5, degrees: 2.5 },
  { id: "10", mm: 10, degrees: 5 },
]

const incrementOptions = [
  { id: "continuous" },
  ...discreteIncrementOptions,
] as const

export type JoggingAxis = "x" | "y" | "z"
export type JoggingDirection = "+" | "-"
export type DiscreteIncrementOption = (typeof discreteIncrementOptions)[number]
export type IncrementOption = (typeof incrementOptions)[number]
export type IncrementOptionId = IncrementOption["id"]

export const ORIENTATION_IDS = ["coordsys", "tool"]
export type OrientationId = (typeof ORIENTATION_IDS)[number]

export type IncrementJogInProgress = {
  direction: JoggingDirection
  axis: JoggingAxis
}

type TabType = "cartesian" | "joint" | "debug"
export type CartesianMotionType = "translate" | "rotate"

export class JoggingStore {
  selectedTabId: TabType = "cartesian"

  /** Locks to prevent UI interactions during certain operations */
  locks = new Set<string>()

  /** Block jogging UI interactions when connection is taken by another jogger */
  blocked: boolean = false

  /**
   * Id of selected coordinate system from among those defined on the API side
   */
  selectedCoordSystemId: string = "world"

  /** Id of selected tool center point from among the options available on the robot */
  selectedTcpId: string = ""

  /**
   * Whether the user is jogging in the coordinate system or tool orientation.
   * When in tool orientation, the robot moves in a direction relative to the
   * attached tool rotation.
   */
  selectedOrientation: OrientationId = "coordsys"

  /**
   * Id of selected increment amount for jogging. Options are defined by robot pad.
   * When non-continuous, jogging moves the robot by a fixed number of mm or degrees
   * each time the button is pressed, for extra precision
   */
  selectedIncrementId: IncrementOptionId = "continuous"

  /**
   * When on the cartesian tab, jogging can be either translating or rotating
   * around the TCP.
   */
  selectedCartesianMotionType: CartesianMotionType = "translate"

  /**
   * If the jogger is busy running an incremental jog, this will be set
   * with the information about the motion
   */
  incrementJogInProgress: IncrementJogInProgress | null = null

  /** How fast the robot goes when doing joint translate in mm/s */
  jointTranslationVelocityMmPerSec: number = 10
  /** How fast the robot goes when doing cartesian translate jogging in mm/s */
  translationVelocityMmPerSec: number = 10

  /** How fast the robot goes when joint rotation jogging in °/s */
  jointVelocityDegPerSec: number = 1
  /** How fast the robot goes when doing cartesian or joint rotation jogging in °/s */
  rotationVelocityDegPerSec: number = 1

  /** Fallback for cartesian and joint rotation if not defined by the motion group description **/
  rotationVelocityFallbackDegPerSec = 60

  /** Fallback for cartesian and joint translation if not defined by the motion group description **/
  translationVelocityFallbackMmPerSec = 250

  /** Minimum translation velocity user can choose on the velocity slider in mm/s */
  minTranslationVelocityMmPerSec: number = 5

  /** Minimum rotation velocity user can choose on the velocity slider in °/s */
  minRotationVelocityDegPerSec: number = 1

  /** Whether to show the coordinate system select dropdown in the UI */
  showCoordSystemSelect: boolean = false

  /** Whether to show the TCP select dropdown in the UI */
  showTcpSelect: boolean = true

  /** Whether to show the orientation select dropdown in the UI */
  showOrientationSelect: boolean = true

  /** Whether to show the increment select dropdown in the UI */
  showIncrementSelect: boolean = true

  /** Whether to show icons in the jogging tabs */
  showTabIcons: boolean = false

  /** Whether to show the label to the right of the velocity slider */
  showVelocitySliderLabel: boolean = true

  /** Whether to show the legend before the slider */
  showVelocityLegend: boolean = false

  /** Whether to show the legend before the joints */
  showJointsLegend: boolean = false

  disposers: IReactionDisposer[] = []

  /**
   * Inverse solver from the kinematic model of the motion group to determine, which tabs should be rendered
   */
  inverseSolver: string | null | undefined = undefined

  /**
   * Joint type to determine, whether the active robot should be displayed as Robot or Linear Axis and what tabs
   * should be rendered by the JoggingPanel component.
   */
  jointType: JointTypeEnum = JointTypeEnum.RevoluteJoint

  operationMode: OperationMode | null = null

  /**
   * Load a jogging store with the relevant data it needs
   * from the backend
   */
  static async loadFor(jogger: JoggerConnection) {
    const { nova } = jogger

    // Find out what TCPs this motion group has (we need it for jogging)
    const [coordinatesystems, description] = await Promise.all([
      // Fetch coord systems so user can select between them
      nova.api.controller.listCoordinateSystems(
        jogger.motionStream.controllerId,
        "ROTATION_VECTOR",
      ),

      // Same for TCPs and other info from description
      nova.api.motionGroup.getMotionGroupDescription(
        jogger.motionStream.controllerId,
        jogger.motionGroupId,
      ),
    ])

    const kinematicModel: KinematicModel =
      await nova.api.motionGroupModels.getMotionGroupKinematicModel(
        description.motion_group_model,
      )

    const tcps = Object.entries(description.tcps || {}).map(([id, tcp]) => ({
      id,
      readable_name: tcp.name,
      position: tcp.pose.position as Vector3Simple,
      orientation: tcp.pose.orientation as Vector3Simple,
    }))

    return new JoggingStore(
      jogger,
      coordinatesystems || [],
      description,
      tcps,
      kinematicModel.inverse_solver,
    )
  }

  constructor(
    readonly jogger: JoggerConnection,
    readonly coordSystems: CoordinateSystem[],
    readonly motionGroupDescription: MotionGroupDescription,
    readonly tcps: RobotTcp[],
    readonly inverseSolverValue: string | null | undefined,
  ) {
    // TODO workaround for default coord system on backend having a canonical id
    // of empty string. Can remove when fixed on API side
    for (const cs of coordSystems) {
      if (cs.coordinate_system === "") {
        cs.coordinate_system = "world"
        break
      }
    }
    this.operationMode = jogger.motionStream.controller.operation_mode
    this.selectedCoordSystemId = coordSystems[0]?.coordinate_system || "world"
    this.selectedTcpId = tcps[0]?.id || ""
    this.inverseSolver = inverseSolverValue
    this.jointType =
      motionGroupDescription?.dh_parameters?.[0]?.type ??
      JointTypeEnum.RevoluteJoint

    // Make all properties observable and actions auto-bound
    makeAutoObservable(this, {}, { autoBind: true })

    // Register blocked watching
    this.jogger.onBlocked = () => {
      this.block()
    }

    // Load user settings from local storage if available
    this.loadFromLocalStorage()

    // Automatically save user settings to local storage when save changes
    this.disposers.push(autorun(() => this.saveToLocalStorage()))

    // Assign joggingStore to window
    // biome-ignore lint/suspicious/noExplicitAny: pre-biome code
    ;(window as any).joggingStore = this
  }

  dispose() {
    for (const dispose of this.disposers) {
      dispose()
    }
    this.jogger.dispose()
  }

  get coordSystemCountByName() {
    return countBy(this.coordSystems, (cs) => cs.name)
  }

  async deactivate() {
    if (this.jogger.mode === "jogging") {
      await this.jogger.setJoggingMode("off")
    }
  }

  /** Activate the jogger with current settings */
  async activate() {
    if (this.currentTab.id === "cartesian") {
      if (
        this.jogger.tcp !== this.selectedTcpId ||
        this.jogger.orientation !== this.selectedOrientation
      ) {
        this.jogger.setOptions({
          tcp: this.selectedTcpId,
          orientation: this.selectedOrientation as JoggerOrientation,
        })
      }

      if (this.activeDiscreteIncrement) {
        this.jogger.setJoggingMode("trajectory")
      } else {
        this.jogger.setJoggingMode("jogging")
      }
    } else {
      this.jogger.setJoggingMode("jogging")
    }

    return this.jogger
  }

  loadFromLocalStorage() {
    const save = tryParseJson(localStorage.getItem("joggingToolStore"))
    if (!save) return

    if (this.tabsById[save.selectedTabId]) {
      this.selectedTabId = save.selectedTabId
    }

    if (this.coordSystemsById[save.selectedCoordSystemId]) {
      this.selectedCoordSystemId = save.selectedCoordSystemId
    }

    if (this.tcpsById[save.selectedTcpId]) {
      this.selectedTcpId = save.selectedTcpId
    }

    if (this.incrementOptionsById[save.selectedIncrementId]) {
      this.selectedIncrementId = save.selectedIncrementId
    }

    if (["translate", "rotate"].includes(save.selectedCartesianMotionType)) {
      this.selectedCartesianMotionType = save.selectedCartesianMotionType
    }

    if (["coordsys", "tool"].includes(save.selectedOrientation)) {
      this.selectedOrientation = save.selectedOrientation
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(
      "joggingToolStore",
      JSON.stringify(this.localStorageSave),
    )
  }

  get isLocked() {
    return this.locks.size > 0
  }

  get localStorageSave() {
    return {
      selectedTabId: this.selectedTabId,
      selectedCoordSystemId: this.selectedCoordSystemId,
      selectedTcpId: this.selectedTcpId,
      selectedOrientation: this.selectedOrientation,
      selectedIncrementId: this.selectedIncrementId,
      selectedCartesianMotionType: this.selectedCartesianMotionType,
    }
  }

  get tabs() {
    const tempTabs: { id: TabType; label: string }[] = [
      {
        id: "joint",
        label: "Joints",
      },
    ]
    // show the cartesian tab only : 1. when there is a solver or 2. when no solver could be loaded ( as a default )
    // do not show the cartesian tab when the solver is null this means, it cannot get jogged cartesian
    if (this.inverseSolver !== null) {
      tempTabs.unshift({
        id: "cartesian",
        label: "Cartesian",
      })
    }

    return tempTabs
  }

  get incrementOptions() {
    return incrementOptions
  }

  get discreteIncrementOptions() {
    return discreteIncrementOptions
  }

  get incrementOptionsById() {
    return keyBy(this.incrementOptions, (o) => o.id)
  }

  get tabsById() {
    return keyBy(this.tabs, (t) => t.id)
  }

  get currentTab() {
    // biome-ignore lint/style/noNonNullAssertion: pre-biome code
    return this.tabsById[this.selectedTabId] || this.tabs[0]!
  }

  get tabIndex() {
    return this.tabs.indexOf(this.currentTab)
  }

  get coordSystemsById() {
    return keyBy(this.coordSystems, (cs) => cs.coordinate_system)
  }

  /**
   * The id of the coordinate system to use for jogging.
   * If in tool orientation, this is set to "tool", not the
   * selected coordinate system.
   */
  get activeCoordSystemId() {
    return this.selectedOrientation === "tool"
      ? "tool"
      : this.selectedCoordSystemId
  }

  get tcpsById() {
    return keyBy(this.tcps, (tcp) => tcp.id)
  }

  get activeDiscreteIncrement() {
    return this.selectedOrientation === "tool"
      ? undefined
      : discreteIncrementOptions.find((d) => d.id === this.selectedIncrementId)
  }

  /** Operation limits for the current operation mode, falling back to auto_limits */
  get activeOperationLimits() {
    const { operation_limits } = this.motionGroupDescription

    let velocityAttribute: keyof MotionGroupDescription["operation_limits"] =
      "auto_limits"

    switch (this.operationMode) {
      case OperationMode.OperationModeManual:
        velocityAttribute = "manual_limits"
        break
      case OperationMode.OperationModeManualT1:
        velocityAttribute = "manual_t1_limits"
        break
      case OperationMode.OperationModeManualT2:
        velocityAttribute = "manual_t2_limits"
        break
      default:
        velocityAttribute = "auto_limits"
        break
    }

    return operation_limits[velocityAttribute] ?? operation_limits.auto_limits
  }

  /** The selected rotation velocity converted to radians per second */
  get rotationVelocityRadsPerSec() {
    return degreesToRadians(this.rotationVelocityDegPerSec)
  }

  /**
   * Internal function for retrieving joint velocity based on joint limits and fallback value
   * Prismatic Joint - the api already delivers the data in mm/s - no recalculation needed
   * Revolute Joint - the api delivers the data in rad/s - convert to deg/s
   * @param joint
   * @param fallback
   * @private
   */
  private getJointVelocity(joint: JointLimits, fallback: number) {
    if (joint.velocity === null || joint.velocity === undefined) return fallback
    return this.jointType === JointTypeEnum.RevoluteJoint
      ? radiansToDegree(joint.velocity)
      : joint.velocity
  }

  /** Maximum rotation velocity user can choose on the velocity slider in °/s */
  get maxRotationVelocityDegPerSec() {
    const velocityInRadPerSec =
      this.activeOperationLimits?.tcp?.orientation_velocity

    return velocityInRadPerSec !== null && velocityInRadPerSec !== undefined
      ? radiansToDegree(velocityInRadPerSec)
      : this.rotationVelocityFallbackDegPerSec
  }

  /** Maximum translation velocity user can choose on the velocity slider in mm/s */
  get maxTranslationVelocityMmPerSec() {
    const velocityInMmPerSec = this.activeOperationLimits?.tcp?.velocity

    return velocityInMmPerSec ?? this.translationVelocityFallbackMmPerSec
  }

  /**
   * Maximum joint velocity user can choose on the velocity slider.
   * Returns deg/s for revolute joints, mm/s for prismatic joints.
   */
  get maxJointVelocityInDisplayUnits() {
    const fallback =
      this.jointType === JointTypeEnum.RevoluteJoint
        ? this.rotationVelocityFallbackDegPerSec
        : this.translationVelocityFallbackMmPerSec

    const joints = this.activeOperationLimits?.joints ?? []

    if (joints.length === 0) return fallback

    const velocities = joints.map((joint: JointLimits) =>
      this.getJointVelocity(joint, fallback),
    )
    return Math.floor(Math.max(...velocities))
  }

  /**  Minimum selectable velocity in mm/sec or deg/sec */
  minVelocityInDisplayUnits(useDegree: boolean) {
    return useDegree
      ? this.minRotationVelocityDegPerSec
      : this.minTranslationVelocityMmPerSec
  }

  /**
   * Maximum selectable velocity in mm/sec or deg/sec
   *
   * If data provided by the api is already present - read out the limits from the motionGroupDescription
   * In other case - return the fallbacks
   */
  maxVelocityInDisplayUnits(useDegree: boolean) {
    return Math.floor(
      useDegree
        ? this.maxRotationVelocityDegPerSec
        : this.maxTranslationVelocityMmPerSec,
    )
  }

  /** Selected velocity in mm/sec or deg/sec */
  velocityInDisplayUnits(useDegree: boolean, isJointVelocity?: boolean) {
    if (isJointVelocity) {
      return this.jointType === JointTypeEnum.RevoluteJoint
        ? this.jointVelocityDegPerSec
        : this.jointTranslationVelocityMmPerSec
    } else {
      return useDegree
        ? this.rotationVelocityDegPerSec
        : this.translationVelocityMmPerSec
    }
  }

  onTabChange(_event: React.SyntheticEvent, newValue: number) {
    // biome-ignore lint/style/noNonNullAssertion: pre-biome code
    const tab = this.tabs[newValue] || this.tabs[0]!
    this.selectedTabId = tab.id
  }

  setSelectedCoordSystemId(id: string) {
    this.selectedCoordSystemId = id
  }

  setSelectedTcpId(id: string) {
    this.selectedTcpId = id
  }

  setSelectedOrientation(orientation: OrientationId) {
    this.selectedOrientation = orientation
  }

  setSelectedIncrementId(id: IncrementOptionId) {
    this.selectedIncrementId = id
  }

  setCurrentIncrementJog(incrementJog: IncrementJogInProgress | null) {
    this.incrementJogInProgress = incrementJog
  }

  setVelocityFromSlider(velocity: number, useDegree: boolean) {
    if (useDegree) {
      this.rotationVelocityDegPerSec = velocity
    } else {
      this.translationVelocityMmPerSec = velocity
    }
  }

  setJointVelocityFromSlider(velocity: number) {
    if (this.jointType === JointTypeEnum.RevoluteJoint) {
      this.jointVelocityDegPerSec = velocity
    } else {
      this.jointTranslationVelocityMmPerSec = velocity
    }
  }

  setSelectedCartesianMotionType(type: CartesianMotionType) {
    this.selectedCartesianMotionType = type
  }

  lock(id: string) {
    this.locks.add(id)
  }

  unlock(id: string) {
    this.locks.delete(id)
  }

  block() {
    this.blocked = true
  }

  unblock() {
    this.blocked = false
    if (this.jogger.mode === "jogging") {
      this.jogger.initializeJoggingWebsocket()
    }
  }

  /** Lock the UI until the given async callback resolves */
  async withMotionLock(fn: () => Promise<void>) {
    const lockId = uniqueId()
    this.lock(lockId)

    try {
      return await fn()
    } finally {
      this.unlock(lockId)
    }
  }
}

export default JoggingStore
