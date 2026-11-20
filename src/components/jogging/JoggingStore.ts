import { tryParseJson } from "@wandelbots/nova-js"
import {
  JointTypeEnum,
  type CoordinateSystem,
  type KinematicModel,
  type MotionGroupDescription,
  type Pose,
  type RobotTcp,
} from "@wandelbots/nova-js/v2"
import { countBy } from "lodash-es"
import keyBy from "lodash-es/keyBy.js"
import uniqueId from "lodash-es/uniqueId.js"
import {
  autorun,
  makeAutoObservable,
  runInAction,
  when,
  type IReactionDisposer,
} from "mobx"
import type {
  JoggerConnection,
  JoggerOrientation,
  Vector3Simple,
} from "../../lib/JoggerConnection"
import {
  resolveCoordinateSystemInWorld,
  transformPoseToCoordinateSystem,
  transformPoseToTcp,
} from "../../lib/PoseTransformer"
import { extractJogErrorMessage, getJogErrorTranslationKey } from "./jogError"
import {
  DEFAULT_ROTATION_VELOCITY_DEG_PER_SEC,
  getDefaultTranslationVelocityMmPerSec,
} from "./joggingVelocity"

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
type JoggingTab = { id: TabType; label: string }
export type CartesianMotionType = "translate" | "rotate"

export class JoggingStore {
  selectedTabId: TabType = "cartesian"

  /** Locks to prevent UI interactions during certain operations */
  locks = new Set<string>()

  /** Block jogging UI interactions when connection is taken by another jogger */
  blocked: boolean = false

  /**
   * Id of selected coordinate system from among those defined on the API side.
   * The cartesian values are shown in it ("Values relative to"), see
   * {@link JoggingStore.tcpPoseInSelectedCoordSystem}.
   */
  selectedCoordSystemId: string = "world"

  /**
   * Id of the coordinate system whose axes the jog buttons move along unless
   * in tool orientation ("Move relative to"). Starts at the first coordinate
   * system, like {@link JoggingStore.selectedCoordSystemId}.
   */
  jogCoordSystemId: string = "world"

  /** Id of selected tool center point from among the options available on the robot */
  selectedTcpId: string = ""

  /** Whether a TCP change request is currently in flight */
  tcpChangeInProgress: boolean = false

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

  /**
   * Human-readable message from the most recent jogging/trajectory error
   * (e.g. a collision that stopped an incremental jog). The state stream
   * itself resets to a normal state (e.g. "Ready") as soon as the motion
   * stops, so this is latched here to stay visible until the next jog
   * attempt is made.
   */
  lastJogError: string | null = null

  /**
   * Awaited by {@link JoggingStore.activate} before the jogger claims the
   * robot for a jog, e.g. to end another motion that holds the controller's
   * execution session. When it rejects, the jog does not start.
   */
  onBeforeActivate: (() => void | Promise<void>) | null = null

  /**
   * How fast the robot goes when doing cartesian translate and prismatic joint
   * jogging in mm/s. Starts at 10 % of the motion group's T1 max (the lowest
   * manual TCP velocity limit it reports, at most 250 mm/s), so 25 mm/s for
   * most robots, and is overwritten by the slider.
   */
  translationVelocityMmPerSec: number
  /** How fast the robot goes when doing cartesian or joint rotation jogging in °/s. Starts at 5 °/s. */
  rotationVelocityDegPerSec: number = DEFAULT_ROTATION_VELOCITY_DEG_PER_SEC

  /** Minimum translation velocity user can choose on the velocity slider in mm/s */
  minTranslationVelocityMmPerSec: number = 1
  /** Maximum translation velocity user can choose on the velocity slider in mm/s */
  maxTranslationVelocityMmPerSec: number = 250

  /** Minimum rotation velocity user can choose on the velocity slider in °/s */
  minRotationVelocityDegPerSec: number = 1
  /** Maximum rotation velocity user can choose on the velocity slider in °/s */
  maxRotationVelocityDegPerSec: number = 60

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

  /**
   * Load a jogging store with the relevant data it needs
   * from the backend
   */
  static async loadFor(jogger: JoggerConnection) {
    const { nova, cellId } = jogger

    // Find out what TCPs this motion group has (we need it for jogging)
    const [coordinatesystems, description] = await Promise.all([
      // Fetch coord systems so user can select between them
      nova.api.controller.listCoordinateSystems(
        cellId,
        jogger.motionStream.controllerId,
        "ROTATION_VECTOR",
      ),

      // Same for TCPs and other info from description
      nova.api.motionGroup.getMotionGroupDescription(
        cellId,
        jogger.motionStream.controllerId,
        jogger.motionGroupId,
      ),
    ])

    const kinematicModel: KinematicModel =
      await nova.api.motionGroupModels.getMotionGroupKinematicModel(
        description.motion_group_model,
      )

    return JoggingStore.create(jogger, {
      coordinateSystems: coordinatesystems || [],
      description,
      kinematicModel,
    })
  }

  /**
   * Make a jogging store from data that was loaded before: the coordinate
   * systems of the controller, the description and the kinematic model of the
   * motion group. An app that loads them once for several stores uses this
   * instead of {@link JoggingStore.loadFor}.
   */
  static create(
    jogger: JoggerConnection,
    data: {
      coordinateSystems: CoordinateSystem[]
      description: MotionGroupDescription
      kinematicModel: KinematicModel
    },
  ) {
    const { coordinateSystems, description, kinematicModel } = data

    const tcps = Object.entries(description.tcps || {}).map(([id, tcp]) => ({
      id,
      readable_name: tcp.name,
      position: tcp.pose.position as Vector3Simple,
      orientation: tcp.pose.orientation as Vector3Simple,
    }))

    return new JoggingStore(
      jogger,
      coordinateSystems,
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
    this.selectedCoordSystemId = coordSystems[0]?.coordinate_system || "world"
    this.jogCoordSystemId = this.selectedCoordSystemId
    // Only trust the server-reported active TCP; don't guess from defaults
    this.selectedTcpId =
      jogger.motionStream.rapidlyChangingMotionState.tcp ?? ""
    // If server hasn't reported a TCP yet but the robot has TCPs, mark as in-progress
    // until the autorun below picks up the server value
    this.tcpChangeInProgress = this.tcps.length > 0 && !this.selectedTcpId
    this.inverseSolver = inverseSolverValue
    this.translationVelocityMmPerSec = getDefaultTranslationVelocityMmPerSec(
      motionGroupDescription?.operation_limits,
    )
    this.jointType =
      motionGroupDescription?.dh_parameters?.[0]?.type ??
      JointTypeEnum.RevoluteJoint

    // Make all properties observable and actions auto-bound
    makeAutoObservable(this, {}, { autoBind: true })

    // Register blocked watching
    this.jogger.onBlocked = () => {
      this.block()
    }

    // Latch a human-readable message for the most recent jogging error,
    // without displacing any error handler already registered on the jogger
    // (e.g. the app's own error recording)
    const previousOnError = this.jogger.onError
    this.jogger.onError = (err: unknown) => {
      this.setLastJogError(extractJogErrorMessage(err))
      previousOnError?.(err)
    }

    // Load user settings from local storage if available
    this.loadFromLocalStorage()

    // Automatically save user settings to local storage when save changes
    this.disposers.push(autorun(() => this.saveToLocalStorage()))

    // Sync server-reported TCP → UI (only when no user-initiated TCP change is in flight)
    this.disposers.push(
      autorun(() => {
        const serverTcp =
          this.jogger.motionStream.rapidlyChangingMotionState.tcp
        if (serverTcp && serverTcp !== this.selectedTcpId) {
          runInAction(() => {
            this.selectedTcpId = serverTcp
            this.tcpChangeInProgress = false
          })
        }
      }),
    )

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

  /**
   * Activate the jogger with current settings. Resolves when the jogging
   * websocket is initialized, or when the jogging was stopped before that
   * (`deactivate`).
   */
  async activate() {
    // Clear any latched error from a previous jog now that the user is
    // starting a new one
    this.lastJogError = null

    // Let the owner hand back a competing motion flow first, e.g. one that
    // keeps the controller's execution session open: the controller refuses
    // to jog while that session is alive
    await this.onBeforeActivate?.()

    if (this.currentTab.id === "cartesian") {
      // Ensure jogger has the correct TCP and orientation before starting
      if (
        this.jogger.tcp !== this.selectedTcpId ||
        this.jogger.orientation !== this.selectedOrientation
      ) {
        await this.jogger.setOptions({
          tcp: this.selectedTcpId || undefined,
          orientation: this.selectedOrientation as JoggerOrientation,
        })
      }

      // "Move relative to" a coordinate system. Applied to each jog command,
      // so it needs no reconnect.
      this.jogger.coordinateSystem = this.jogCoordSystem

      if (this.activeDiscreteIncrement) {
        await this.jogger.setJoggingMode("trajectory")
      } else {
        await this.jogger.setJoggingMode("jogging")
      }
    } else {
      await this.jogger.setJoggingMode("jogging")
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

    if (this.coordSystemsById[save.jogCoordSystemId]) {
      this.jogCoordSystemId = save.jogCoordSystemId
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

  /**
   * Translation key for a friendlier version of
   * {@link JoggingStore.lastJogError}, if the raw backend message is
   * recognized. `null` when there's no latched error or the message isn't one
   * we have a friendlier version for (in which case the raw message should be
   * shown as-is).
   */
  get lastJogErrorTranslationKey() {
    return this.lastJogError
      ? getJogErrorTranslationKey(this.lastJogError)
      : null
  }

  get localStorageSave() {
    return {
      selectedTabId: this.selectedTabId,
      selectedCoordSystemId: this.selectedCoordSystemId,
      jogCoordSystemId: this.jogCoordSystemId,
      selectedOrientation: this.selectedOrientation,
      selectedIncrementId: this.selectedIncrementId,
      selectedCartesianMotionType: this.selectedCartesianMotionType,
    }
  }

  get tabs(): [JoggingTab, ...JoggingTab[]] {
    const tempTabs: [JoggingTab, ...JoggingTab[]] = [
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
    return this.tabsById[this.selectedTabId] || this.tabs[0]
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

  /** The coordinate system to jog along, resolved relative to world */
  get jogCoordSystem(): CoordinateSystem {
    return resolveCoordinateSystemInWorld(
      this.jogCoordSystemId,
      this.coordSystems,
    )
  }

  /**
   * The streamed TCP pose (its readout, see
   * {@link MotionStreamConnection.readoutState}) expressed in the selected
   * coordinate system, for values that show what a pose field in that
   * coordinate system shows.
   */
  get tcpPoseInSelectedCoordSystem(): Pose | undefined {
    const { tcp_pose, coordinate_system } =
      this.jogger.motionStream.readoutState
    if (!tcp_pose?.position || !tcp_pose.orientation) {
      return tcp_pose
    }

    return transformPoseToCoordinateSystem(
      {
        pose: {
          position: tcp_pose.position,
          orientation: tcp_pose.orientation,
        },
        coordinateSystemId: coordinate_system || "world",
      },
      this.selectedCoordSystemId,
      this.coordSystems,
    ).pose
  }

  get tcpsById() {
    return keyBy(this.tcps, (tcp) => tcp.id)
  }

  /**
   * The streamed TCP pose (its readout) as the pose of a TCP, relative to a
   * coordinate system: for a pose display with a TCP and frame of its own,
   * like CurrentPoseBar. Undefined without a pose, or for an unknown TCP or
   * coordinate system.
   */
  tcpPoseIn(tcpId: string, coordinateSystemId: string): Pose | undefined {
    const { tcp_pose, tcp, coordinate_system } =
      this.jogger.motionStream.readoutState
    const poseTcp = this.tcpsById[tcp || this.selectedTcpId]
    const targetTcp = this.tcpsById[tcpId]
    if (!tcp_pose?.position || !tcp_pose.orientation) return undefined
    if (!poseTcp || !targetTcp) return undefined

    try {
      return transformPoseToCoordinateSystem(
        {
          pose: transformPoseToTcp(tcp_pose, poseTcp, targetTcp),
          coordinateSystemId: coordinate_system || "world",
        },
        coordinateSystemId,
        this.coordSystems,
      ).pose
    } catch {
      // An unknown coordinate system
      return undefined
    }
  }

  /**
   * The step of the selected increment, or undefined for continuous jogging.
   * In tool orientation, a step moves along the tool's axes.
   */
  get activeDiscreteIncrement() {
    return discreteIncrementOptions.find(
      (d) => d.id === this.selectedIncrementId,
    )
  }

  /** The selected rotation velocity converted to radians per second */
  get rotationVelocityRadsPerSec() {
    return (this.rotationVelocityDegPerSec * Math.PI) / 180
  }

  /** Selected velocity in mm/sec or deg/sec */
  velocityInDisplayUnits(useDegree: boolean) {
    return useDegree
      ? this.rotationVelocityDegPerSec
      : this.translationVelocityMmPerSec
  }

  /** Minimum selectable velocity in mm/sec or deg/sec */
  minVelocityInDisplayUnits(useDegree: boolean) {
    return useDegree
      ? this.minRotationVelocityDegPerSec
      : this.minTranslationVelocityMmPerSec
  }

  /** Maximum selectable velocity in mm/sec or deg/sec */
  maxVelocityInDisplayUnits(useDegree: boolean) {
    return useDegree
      ? this.maxRotationVelocityDegPerSec
      : this.maxTranslationVelocityMmPerSec
  }

  onTabChange(_event: React.SyntheticEvent, newValue: number) {
    const tab = this.tabs[newValue] || this.tabs[0]
    this.selectedTabId = tab.id
  }

  setSelectedCoordSystemId(id: string) {
    this.selectedCoordSystemId = id
  }

  /**
   * @deprecated Use {@link JoggingStore.requestTcpChange} instead. This method now delegates
   * to `requestTcpChange` which properly communicates the TCP change to the server.
   */
  setSelectedTcpId(id: string): void {
    this.requestTcpChange(id).catch((err) => {
      console.error("Failed to change TCP:", err)
    })
  }

  /**
   * Request a TCP change on the server. Sends an InitializeJoggingRequest
   * with the new TCP to the backend via the jogging websocket.
   *
   * If the jogger is actively jogging, the websocket is reinitialised with the new TCP.
   * If the jogger is idle, a jogging websocket is briefly opened to communicate the
   * TCP change. The websocket is kept open until the state-stream confirms the
   * change (or a 1s timeout), to ensure the backend has time to process it.
   */
  async requestTcpChange(tcpId: string): Promise<void> {
    if (tcpId === this.selectedTcpId) return

    this.tcpChangeInProgress = true
    const previousTcp = this.jogger.tcp
    const wasOff = this.jogger.mode !== "jogging"

    try {
      // Store the new TCP on the jogger
      this.jogger.tcp = tcpId

      if (wasOff) {
        // Jogger is idle — open a jogging websocket to send
        // InitializeJoggingRequest with the new TCP
        await this.jogger.setJoggingMode("jogging")
      } else {
        // Jogger is actively jogging — reinitialize with the new TCP
        await this.jogger.setJoggingMode("jogging", false)
      }

      // Wait for server to confirm the new TCP via state stream.
      // Use a short 1s timeout — if not confirmed in time, close the
      // websocket anyway and continue waiting.
      let confirmed = await this.waitForTcpConfirmation(tcpId, 1_000)

      // If the jogger was idle, close the websocket now
      if (wasOff) {
        await this.jogger.setJoggingMode("off")
      }

      // If not yet confirmed, wait an additional 2s for the state-stream
      // to report the change (it may arrive after the jogging websocket closes)
      if (!confirmed) {
        confirmed = await this.waitForTcpConfirmation(tcpId, 2_000)
      }

      runInAction(() => {
        if (confirmed) {
          this.selectedTcpId = tcpId
        } else {
          // Timeout: revert jogger tcp and use only what the server reports
          this.jogger.tcp = previousTcp
          this.selectedTcpId =
            this.jogger.motionStream.rapidlyChangingMotionState.tcp ?? ""
        }
      })
    } catch (err) {
      // On error, close the websocket if we opened it, revert jogger tcp
      if (wasOff) {
        await this.jogger.setJoggingMode("off").catch(() => {})
      }
      runInAction(() => {
        this.jogger.tcp = previousTcp
        this.selectedTcpId =
          this.jogger.motionStream.rapidlyChangingMotionState.tcp ?? ""
      })
      throw err
    } finally {
      runInAction(() => {
        this.tcpChangeInProgress = false
      })
    }
  }

  private waitForTcpConfirmation(
    tcpId: string,
    timeoutMs: number,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        disposer()
        resolve(false)
      }, timeoutMs)

      const disposer = when(
        () => this.jogger.motionStream.rapidlyChangingMotionState.tcp === tcpId,
        () => {
          clearTimeout(timeout)
          resolve(true)
        },
      )
    })
  }

  setSelectedOrientation(orientation: OrientationId) {
    this.selectedOrientation = orientation
  }

  /** "Move relative to" the selected TCP: jog along its own axes */
  setMoveRelativeToSelectedTcp() {
    this.selectedOrientation = "tool"
  }

  /** "Move relative to" a coordinate system: jog along its axes */
  setMoveRelativeToCoordSystem(coordSystemId: string) {
    this.selectedOrientation = "coordsys"
    this.jogCoordSystemId = coordSystemId
  }

  setSelectedIncrementId(id: IncrementOptionId) {
    this.selectedIncrementId = id
  }

  setCurrentIncrementJog(incrementJog: IncrementJogInProgress | null) {
    this.incrementJogInProgress = incrementJog
  }

  setLastJogError(message: string | null) {
    this.lastJogError = message
  }

  /**
   * Set the selected velocity in mm/s or °/s, from the slider or a velocity
   * text field. Values outside the slider range (and values that are not a
   * finite number) are ignored; a text field reports them to the user
   * instead of applying them.
   */
  setVelocityFromSlider(velocity: number, useDegree: boolean) {
    if (
      !Number.isFinite(velocity) ||
      velocity < this.minVelocityInDisplayUnits(useDegree) ||
      velocity > this.maxVelocityInDisplayUnits(useDegree)
    ) {
      return
    }
    if (useDegree) {
      this.rotationVelocityDegPerSec = velocity
    } else {
      this.translationVelocityMmPerSec = velocity
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
      this.jogger.initializeJoggingWebsocket().catch((err) => {
        console.error("Failed to initialize jogging:", err)
      })
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
