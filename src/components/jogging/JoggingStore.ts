import { degreesToRadians, tryParseJson } from "@wandelbots/nova-js"
import {
  JointTypeEnum,
  type CoordinateSystem,
  type KinematicModel,
  type MotionGroupDescription,
  type Pose,
  type RobotTcp,
} from "@wandelbots/nova-js/v2"
import { countBy, keyBy, uniqueId } from "lodash-es"
import {
  autorun,
  makeAutoObservable,
  reaction,
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
import type { RobotNotMoveableReason } from "../../lib/robotSession/RobotSafety"
import {
  JoggingRefusedError,
  type JoggingRefusedReason,
} from "./JoggingRefusedError"
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

/**
 * What a jog needs of the jogger: the jogging websocket for a held jog of the
 * TCP or of a joint, a trajectory for a step
 */
type JogKind = "cartesian" | "cartesianStep" | "joint"

/**
 * Where a jogging store keeps the user's jogging settings between visits: the
 * part of the Web Storage API that it uses, so `localStorage` itself fits, as
 * does a storage of the app's own
 */
export type JoggingStoreStorage = Pick<Storage, "getItem" | "setItem">

/** What an app can give a jogging store besides its robot's data */
export type JoggingStoreOptions = {
  /**
   * Where to keep the jogging settings: the tab, the coordinate systems, the
   * increment, the motion type and the orientation. Without it the store
   * keeps them in `localStorage`, where the browser has one; the app decides
   * where they belong, so pass it.
   */
  storage?: JoggingStoreStorage
  /**
   * Why the robot may not move right now, or null when it may. The store asks
   * before it starts a jog, and starts none while there is a reason: the
   * start rejects with a {@link JoggingRefusedError}. NOVA switches a
   * controller to control mode by itself for a movement request, so without
   * this a robot that is not activated jogs. A robot session gives its
   * safety's reason; a store without it refuses only while it is locked or
   * blocked by another client's jogging.
   */
  notMoveableReason?: () => RobotNotMoveableReason | null
}

/** The key of the jogging settings in the storage */
const SETTINGS_KEY = "joggingToolStore"

/** `localStorage`, where the environment has one (not in Node) */
const defaultStorage = (): JoggingStoreStorage | undefined =>
  typeof localStorage === "undefined" ? undefined : localStorage

export class JoggingStore {
  selectedTabId: TabType = "cartesian"

  /** Locks to prevent UI interactions during certain operations */
  locks = new Set<string>()

  /**
   * NOVA refused the jogging connection because another client jogs the
   * robot. The store then starts no jog (see {@link JoggingRefusedError},
   * "blocked") until {@link JoggingStore.unblock}: it does not ask NOVA
   * again by itself, so a UI has to say it and offer to try again.
   */
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

  /**
   * Whether to show the coordinate system select dropdown in the UI
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it. `RobotControlPanel`
   * shows a select where it gets one, e.g. `jogFrame`.
   */
  showCoordSystemSelect: boolean = false

  /**
   * Whether to show the TCP select dropdown in the UI
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it. `RobotControlPanel`
   * shows the TCP select when it gets `tcp`.
   */
  showTcpSelect: boolean = true

  /**
   * Whether to show the orientation select dropdown in the UI
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it. `RobotControlPanel`
   * has the tool among the frames of `jogFrame`.
   */
  showOrientationSelect: boolean = true

  /**
   * Whether to show the increment select dropdown in the UI
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it. `RobotControlPanel`
   * offers the steps when it gets `increments`.
   */
  showIncrementSelect: boolean = true

  /**
   * Whether to show icons in the jogging tabs
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it
   */
  showTabIcons: boolean = false

  /**
   * Whether to show the label to the right of the velocity slider
   *
   * @deprecated Only `VelocitySlider` (deprecated) reads it
   */
  showVelocitySliderLabel: boolean = true

  /**
   * Whether to show the legend before the slider
   *
   * @deprecated Only `VelocitySlider` (deprecated) reads it
   */
  showVelocityLegend: boolean = false

  /**
   * Whether to show the legend before the joints
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it
   */
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
  static async loadFor(
    jogger: JoggerConnection,
    options: JoggingStoreOptions = {},
  ) {
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

    return JoggingStore.create(
      jogger,
      {
        coordinateSystems: coordinatesystems || [],
        description,
        kinematicModel,
      },
      options,
    )
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
    options: JoggingStoreOptions = {},
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
      options,
    )
  }

  /** Where the jogging settings are kept, see {@link JoggingStoreOptions} */
  private readonly storage: JoggingStoreStorage | undefined

  /** Why the robot may not move now, see {@link JoggingStoreOptions} */
  private readonly notMoveableReason: JoggingStoreOptions["notMoveableReason"]

  /**
   * Counts the starts and stops of held jogs, so that each one knows whether
   * it is still the latest when its wait is over: a stop while the jogging
   * websocket opens makes that press move nothing, and a stop keeps the
   * websocket for a start that came in the same event (a joint slider that
   * turns around)
   */
  private jogPress = 0

  /**
   * Whether the latest of {@link JoggingStore.jogPress} is a stop: a start
   * that it overtook closes the websocket that it opened then
   */
  private stoppedLast = false

  /**
   * The step that runs now: stops it, see
   * `stopIncrementalJog`, and resolves once it is over
   */
  private runningStep: {
    stop: (reason: JoggingRefusedReason) => void
    over: Promise<void>
  } | null = null

  /**
   * Set by {@link JoggingStore.dispose}: a panel may still show the store,
   * and it starts no jog any more
   */
  private disposed = false

  /** Ends the watch of the held jog that moves now, see `watchHeldJog` */
  private endHeldJogWatch: (() => void) | null = null

  constructor(
    readonly jogger: JoggerConnection,
    readonly coordSystems: CoordinateSystem[],
    readonly motionGroupDescription: MotionGroupDescription,
    readonly tcps: RobotTcp[],
    readonly inverseSolverValue: string | null | undefined,
    options: JoggingStoreOptions = {},
  ) {
    this.storage = options.storage ?? defaultStorage()
    this.notMoveableReason = options.notMoveableReason
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
    makeAutoObservable<
      this,
      | "storage"
      | "notMoveableReason"
      | "jogPress"
      | "stoppedLast"
      | "runningStep"
      | "endHeldJogWatch"
    >(
      this,
      {
        storage: false,
        notMoveableReason: false,
        jogPress: false,
        stoppedLast: false,
        runningStep: false,
        endHeldJogWatch: false,
      },
      { autoBind: true },
    )

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

    // Load the user's settings from the storage, if it holds them
    this.loadFromLocalStorage()

    // Keep the user's settings in the storage whenever they change
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
  }

  /**
   * Closes the jogger's websockets. The store starts no jog afterwards: a
   * start rejects with a {@link JoggingRefusedError} ("disconnected"), and
   * opens nothing.
   */
  dispose() {
    this.disposed = true
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
   * Activate the jogger with current settings: for the tab that is selected
   * and, on the Cartesian tab, for a step while an increment is selected.
   * Resolves when the jogging websocket is initialized, or when the jogging
   * was stopped before that (`deactivate`).
   *
   * Rejects with a {@link JoggingRefusedError} while the store is locked or
   * its owner says that the robot may not move (see
   * {@link JoggingStoreOptions}): nothing is sent to the robot then, and no
   * jogging websocket opens. Also when that came to be while the jogging
   * websocket opened: the store closes it again.
   *
   * {@link JoggingStore.startCartesianJogging},
   * {@link JoggingStore.startJointJogging} and
   * {@link JoggingStore.runIncrementalCartesianJog} activate what they need
   * themselves.
   *
   * @deprecated Only `JoggingPanel` (deprecated) calls it: it activates for
   * the panel's tab. Jog with the methods above, which activate for their
   * jog; a robot session hands the robot to jogging with
   * `session.ensureMovementOwnership("jogging")`.
   */
  async activate() {
    if (this.currentTab.id !== "cartesian") {
      return this.activateFor("joint")
    }
    return this.activateFor(
      this.activeDiscreteIncrement ? "cartesianStep" : "cartesian",
    )
  }

  /**
   * Activates the jogger for a jog of the given kind, unless it is refused
   * (see {@link JoggingStore.refuseUnlessJoggable}, also for `ownLock`)
   */
  private async activateFor(jog: JogKind, ownLock?: string) {
    // First of all: a refused start ends no other motion, and keeps the
    // error of the jog before
    this.refuseUnlessJoggable(ownLock)

    // Clear any latched error from a previous jog now that the user is
    // starting a new one
    this.lastJogError = null

    // Let the owner hand back a competing motion flow first, e.g. one that
    // keeps the controller's execution session open: the controller refuses
    // to jog while that session is alive
    await this.onBeforeActivate?.()

    // That took its time: the robot may have stopped being moveable since
    this.refuseUnlessJoggable(ownLock)

    if (jog !== "joint") {
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
    }

    if (jog === "cartesianStep") {
      // Opens nothing yet: the step opens its own websocket
      await this.jogger.setJoggingMode("trajectory")
    } else {
      await this.openJoggingWebsocket()
    }

    return this.jogger
  }

  /**
   * Opens the jogging websocket of the jogger, unless a jog may not start
   * (see {@link JoggingStore.refuseUnlessJoggable}). It is a movement
   * connection, for which NOVA switches a controller to control mode by
   * itself and holds it there: the store opens it only here, for a jog, a
   * TCP change or its robot session.
   *
   * It asks before it opens the websocket, and again once it is open: that
   * takes 0.1 to 0.5 s, in which the robot may have been deactivated or
   * stopped. Refused then, the websocket closes again before anything moves.
   *
   * `reinitialize` opens it anew when it is open already, for another TCP.
   */
  private async openJoggingWebsocket(reinitialize = false) {
    this.refuseUnlessJoggable()
    if (reinitialize) {
      await this.jogger.setJoggingMode("jogging", false)
    } else {
      await this.jogger.setJoggingMode("jogging")
    }
    try {
      this.refuseUnlessJoggable()
    } catch (error) {
      await this.deactivate()
      throw error
    }
  }

  /**
   * Hands the jogger to jogging: opens its jogging websocket, as a held jog
   * does, and rejects with a {@link JoggingRefusedError} as one.
   * @internal For the store's robot session, see
   * `RobotSession.ensureMovementOwnership`
   */
  async claimForJogging() {
    await this.openJoggingWebsocket()
  }

  /**
   * Throws a {@link JoggingRefusedError} while a jog may not start: once
   * the store is disposed ("disconnected"), with the
   * owner's reason that the robot may not move, else while another client
   * holds the jogging connection ({@link JoggingStore.blocked}), else while
   * the store is locked. `ownLock` is the lock of the step that asks: it
   * locks the store against other jogs, not against itself.
   */
  private refuseUnlessJoggable(ownLock?: string) {
    const reason = this.refusedReason(ownLock)
    if (reason) {
      throw new JoggingRefusedError(reason)
    }
  }

  /**
   * Why a jog may not start now, or null: see
   * {@link JoggingStore.refuseUnlessJoggable}. Observed while a step runs,
   * which it stops.
   */
  private refusedReason(ownLock?: string): JoggingRefusedReason | null {
    // Its connections are closed: no live state comes for it any more
    if (this.disposed) return { code: "disconnected" }
    const reason = this.notMoveableReason?.() ?? null
    if (reason) return reason
    if (this.blocked) return { code: "blocked" }
    for (const lock of this.locks) {
      if (lock !== ownLock) return { code: "locked" }
    }
    return null
  }

  /**
   * Starts jogging the TCP along an axis (`translate`) or about it
   * (`rotate`) until {@link JoggingStore.stopJogging}, with the store's
   * velocity, TCP and "Move relative to". For a jog control that is held:
   * call this on the press and `stopJogging` on the release.
   *
   * The robot moves once the jogging websocket is ready, about 0.1 to 0.5 s
   * later. A press that was stopped by then, or that another press followed,
   * moves nothing. Rejects with a {@link JoggingRefusedError} as
   * {@link JoggingStore.activate} does: while the store is locked or the
   * robot may not move, also when that came to be while the websocket
   * opened.
   *
   * A jog that moves is stopped as by its release (see
   * {@link JoggingStore.stopJogging}) once a jog would be refused: when the
   * robot may no longer move, another client takes the jogging connection or
   * the store gets locked. It stays stopped until the next press, also when
   * the reason goes away; the release still comes and changes nothing.
   */
  async startCartesianJogging(
    motion: CartesianMotionType,
    axis: JoggingAxis,
    direction: JoggingDirection,
  ) {
    if (!(await this.openForHeldJog("cartesian"))) return

    if (motion === "translate") {
      await this.jogger.translateTCP({
        axis,
        direction,
        velocityMmPerSec: this.translationVelocityMmPerSec,
      })
    } else {
      await this.jogger.rotateTCP({
        axis,
        direction,
        velocityRadsPerSec: this.rotationVelocityRadsPerSec,
      })
    }
    this.watchHeldJog()
  }

  /**
   * Starts jogging one joint (by its index) until
   * {@link JoggingStore.stopJogging}, with the store's rotation velocity, or
   * its translation velocity for a linear axis. As
   * {@link JoggingStore.startCartesianJogging}, for a control that is held,
   * and refused and stopped as it.
   */
  async startJointJogging(joint: number, direction: JoggingDirection) {
    if (!(await this.openForHeldJog("joint"))) return

    const linear = this.jointType === JointTypeEnum.PrismaticJoint
    await this.jogger.rotateJoints({
      joint,
      direction,
      velocityUnit: linear ? "mm/s" : "rad/s",
      velocityValue: linear
        ? this.translationVelocityMmPerSec
        : this.rotationVelocityRadsPerSec,
    })
    this.watchHeldJog()
  }

  /**
   * Follows the held jog that moves now, until its release or the press
   * that follows it: stops it as its release does once a jog would be
   * refused, see {@link JoggingStore.startCartesianJogging}. NOVA jogs on
   * at the last velocity for as long as the jogging websocket is open.
   */
  private watchHeldJog() {
    this.endHeldJogWatch?.()
    const stopWatching = reaction(
      () => this.refusedReason(),
      (reason) => {
        // The stop ends this watch
        if (!reason) return
        this.stopJogging().catch((err: unknown) => {
          console.error("Failed to stop jogging:", err)
        })
      },
    )
    const end = () => {
      stopWatching()
      if (this.endHeldJogWatch === end) this.endHeldJogWatch = null
    }
    this.endHeldJogWatch = end
  }

  /**
   * Opens the jogging websocket for a held jog. Resolves to whether this
   * press is still the latest once it is open: a press that was stopped by
   * then, or that another press followed, moves nothing.
   *
   * A start that fails or is refused leaves no jogging websocket open. A stop
   * that came in the same event kept it for this start (see
   * {@link JoggingStore.stopJogging}), and no other stop may follow. A stop
   * that came while the start waited, before the websocket opened (for
   * `onBeforeActivate`, or for the TCP and orientation), found nothing to
   * close: the start closes it then, unless another press followed the
   * stop, which owns it.
   */
  private async openForHeldJog(jog: "cartesian" | "joint") {
    const press = ++this.jogPress
    this.stoppedLast = false
    try {
      await this.activateFor(jog)
    } catch (error) {
      if (press === this.jogPress || this.stoppedLast) {
        // The error to report is the start's, whatever the closing does
        await this.deactivate().catch(() => {})
      }
      throw error
    }
    if (press === this.jogPress) return true
    // A stop overtook this start: nothing moves, and nothing stays open
    if (this.stoppedLast) await this.deactivate()
    return false
  }

  /**
   * Stops the jog of {@link JoggingStore.startCartesianJogging} or
   * {@link JoggingStore.startJointJogging} and closes the jogging websocket.
   * Never refused, also while the store is locked or the robot may not move:
   * a jog always gets its stop.
   *
   * A start that comes while the robot is told to stop keeps the websocket,
   * e.g. a joint slider that turns around stops and starts in one event.
   *
   * A step that runs is no held jog, and is left alone: a held jog is
   * refused meanwhile, so the stop of its control belongs to none.
   */
  async stopJogging() {
    const press = ++this.jogPress
    this.stoppedLast = true
    this.endHeldJogWatch?.()
    // The jogger's stop would pause the step
    if (!this.runningStep) await this.jogger.stop()
    if (press !== this.jogPress) return
    await this.deactivate()
  }

  /**
   * Moves the TCP one step along an axis (`translate`, by the increment's
   * mm) or about it (`rotate`, by its degrees), with the store's velocity,
   * TCP and "Move relative to". `increment` is one of
   * {@link JoggingStore.discreteIncrementOptions}. Resolves once the robot
   * has made the step.
   *
   * One step runs at a time: the store is locked while it runs (as by
   * {@link JoggingStore.withMotionLock}) and shows it as
   * {@link JoggingStore.incrementJogInProgress}. Rejects with a
   * {@link JoggingRefusedError} as {@link JoggingStore.activate} does: while
   * the store is locked, so also while another step runs, or the robot may
   * not move.
   *
   * A step that the robot may no longer make is stopped: when the robot may
   * no longer move, another client takes the jogging connection or
   * something else locks the store. Before its trajectory went to NOVA
   * (planning it takes a round trip) or was started, it rejects with a
   * {@link JoggingRefusedError} then; once it runs, it is paused and
   * resolves when the robot stands still. A stopped step stays stopped,
   * also when the reason goes away.
   */
  async runIncrementalCartesianJog(
    motion: CartesianMotionType,
    axis: JoggingAxis,
    direction: JoggingDirection,
    increment: DiscreteIncrementOption,
  ) {
    // Before the step locks the store itself
    this.refuseUnlessJoggable()
    await this.withOwnLock(async (lock) => {
      const step = this.watchStep(lock)
      try {
        const jogger = await this.activateFor("cartesianStep", lock)
        const state = jogger.motionStream.rapidlyChangingMotionState
        if (!state.tcp_pose) return

        this.setCurrentIncrementJog({ axis, direction })
        await jogger.runIncrementalCartesianMotion({
          currentTcpPose: state.tcp_pose,
          currentJoints: state.joint_position as Vector3Simple,
          velocityInRelevantUnits:
            motion === "translate"
              ? this.translationVelocityMmPerSec
              : this.rotationVelocityRadsPerSec,
          axis,
          direction,
          motion:
            motion === "translate"
              ? { type: "translate", distanceMm: increment.mm }
              : {
                  type: "rotate",
                  distanceRads: degreesToRadians(increment.degrees),
                },
          // The jogger asks right before the step goes to NOVA
          refusedReason: step.refusedReason,
        })
      } finally {
        step.end()
        this.setCurrentIncrementJog(null)
        await this.deactivate()
      }
    })
  }

  /**
   * Stops the step that runs, as when the robot may no longer move (see
   * {@link JoggingStore.runIncrementalCartesianJog}), and resolves once it
   * is over: the robot stands still and its trajectory websocket is closed.
   * Resolves at once without a step.
   * @internal For the store's robot session: a step holds the controller in
   * control mode, and NOVA runs it to its end, so it goes before the robot
   * is deactivated
   */
  async stopIncrementalJog(reason: JoggingRefusedReason) {
    const step = this.runningStep
    if (!step) return
    step.stop(reason)
    await step.over
  }

  /**
   * Follows the step of the lock `lock` until `end`: stops it once a jog
   * would be refused for another reason than its own lock, see
   * {@link JoggingStore.runIncrementalCartesianJog}. `refusedReason` is what
   * the jogger asks: the reason that stopped the step, else why a jog would
   * be refused now.
   */
  private watchStep(lock: string) {
    let stoppedFor: JoggingRefusedReason | null = null
    let ended = () => {}
    const step = {
      stop: (reason: JoggingRefusedReason) => {
        if (stoppedFor) return
        stoppedFor = reason
        // Pauses a step that NOVA runs. One that it has not started yet
        // does not start: the jogger asks refusedReason first.
        this.jogger.stop().catch((err: unknown) => {
          console.error("Failed to stop the step:", err)
        })
      },
      over: new Promise<void>((resolve) => {
        ended = resolve
      }),
    }
    this.runningStep = step
    const stopWatching = reaction(
      () => this.refusedReason(lock),
      (reason) => {
        if (reason) step.stop(reason)
      },
    )

    return {
      refusedReason: () => stoppedFor ?? this.refusedReason(lock),
      end: () => {
        stopWatching()
        if (this.runningStep === step) this.runningStep = null
        ended()
      },
    }
  }

  /**
   * Takes the user's settings from the storage (see
   * {@link JoggingStoreOptions}), which is `localStorage` only by default
   */
  loadFromLocalStorage() {
    const saved = this.storage?.getItem(SETTINGS_KEY)
    const save = saved ? tryParseJson(saved) : undefined
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

  /**
   * Keeps the user's settings in the storage (see
   * {@link JoggingStoreOptions}), which is `localStorage` only by default
   */
  saveToLocalStorage() {
    this.storage?.setItem(SETTINGS_KEY, JSON.stringify(this.localStorageSave))
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

  /**
   * Whether the robot can jog its TCP along axes (translate, rotate): with an
   * inverse solver, or when none could be loaded (as a default). A kinematic
   * model without a solver (null), e.g. a linear axis or a turntable, jogs
   * its joints only.
   */
  get canJogCartesian(): boolean {
    return this.inverseSolver !== null
  }

  /**
   * The tabs of `JoggingPanel`: Cartesian (where the robot can jog its TCP)
   * and Joints
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it. Whether the robot
   * can jog its TCP is {@link JoggingStore.canJogCartesian}; the tab is
   * {@link JoggingStore.selectedTabId}.
   */
  get tabs(): [JoggingTab, ...JoggingTab[]] {
    const tempTabs: [JoggingTab, ...JoggingTab[]] = [
      {
        id: "joint",
        label: "Joints",
      },
    ]
    if (this.canJogCartesian) {
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

  /** @deprecated See {@link JoggingStore.tabs} */
  get tabsById() {
    return keyBy(this.tabs, (t) => t.id)
  }

  /**
   * The selected tab, or the first where the robot has not the selected one
   * (no Cartesian tab without an inverse solver)
   */
  get currentTab() {
    return this.tabsById[this.selectedTabId] || this.tabs[0]
  }

  /**
   * The index of the selected tab in {@link JoggingStore.tabs}, for the MUI
   * `Tabs` of `JoggingPanel`
   *
   * @deprecated See {@link JoggingStore.tabs}
   */
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
   *
   * @deprecated Only `JoggingPanel` (deprecated) reads it: it jogs in the
   * coordinate system that the values are shown in. The store's own jogs
   * move along {@link JoggingStore.jogCoordSystem} ("Move relative to"), or
   * along the tool's axes in tool orientation.
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

  /**
   * The `onChange` of the MUI `Tabs` of `JoggingPanel`
   *
   * @deprecated Only `JoggingPanel` (deprecated) calls it. Set
   * {@link JoggingStore.selectedTabId}; `useRobotControlProps` does that for
   * the tabs of `RobotControlPanel`.
   */
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
   *
   * The jogging websocket is a movement connection, for which NOVA switches a
   * controller to control mode by itself. So the change rejects with a
   * {@link JoggingRefusedError} as a jog does, while the store is locked or
   * its owner says that the robot may not move: the TCP stays, and no
   * websocket opens (or it closes again, see {@link JoggingStore.activate}).
   * As for a jog, {@link JoggingStore.onBeforeActivate} ends another motion
   * first; when it rejects, the TCP stays.
   */
  async requestTcpChange(tcpId: string): Promise<void> {
    if (tcpId === this.selectedTcpId) return

    // First of all: a refused change leaves the TCP and the store as they are
    this.refuseUnlessJoggable()

    this.tcpChangeInProgress = true
    const previousTcp = this.jogger.tcp
    let wasOff = true
    // Whether this change asked for the jogging websocket, which it closes
    // again on an error
    let opening = false

    try {
      // As for a jog: NOVA refuses the jogging connection while e.g. Move
      // to's staged pose holds the controller's execution session
      await this.onBeforeActivate?.()
      wasOff = this.jogger.mode !== "jogging"

      // Store the new TCP on the jogger
      this.jogger.tcp = tcpId
      opening = true

      // Jogger is idle — open a jogging websocket to send
      // InitializeJoggingRequest with the new TCP. Jogger is actively
      // jogging — reinitialize with the new TCP.
      await this.openJoggingWebsocket(!wasOff)

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
      if (opening && wasOff) {
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

  /**
   * @deprecated Only `JoggingPanel` (deprecated) calls it, for the steps it
   * runs itself. {@link JoggingStore.runIncrementalCartesianJog} sets
   * {@link JoggingStore.incrementJogInProgress} for its step.
   */
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

  /**
   * Ends {@link JoggingStore.blocked}, so that jogging can be tried again.
   * For a jogger that is still in jogging mode (one that an app keeps there),
   * it opens the jogging websocket again, unless a jog may not start: then
   * the jogger is switched off instead.
   */
  unblock() {
    this.blocked = false
    if (this.jogger.mode !== "jogging") return

    try {
      this.refuseUnlessJoggable()
    } catch {
      this.deactivate().catch((err) => {
        console.error("Failed to stop jogging:", err)
      })
      return
    }
    this.jogger.initializeJoggingWebsocket().catch((err) => {
      console.error("Failed to initialize jogging:", err)
    })
  }

  /** Lock the UI until the given async callback resolves */
  async withMotionLock(fn: () => Promise<void>) {
    return this.withOwnLock(() => fn())
  }

  /**
   * Locks the store until the callback resolves, and gives the callback the
   * id of its lock: for a jog that starts under it (see
   * {@link JoggingStore.refuseUnlessJoggable})
   */
  private async withOwnLock(fn: (lockId: string) => Promise<void>) {
    const lockId = uniqueId()
    this.lock(lockId)

    try {
      return await fn(lockId)
    } finally {
      this.unlock(lockId)
    }
  }
}

export default JoggingStore
