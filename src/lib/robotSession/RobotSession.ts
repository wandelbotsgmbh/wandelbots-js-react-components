import { makeErrorMessage } from "@wandelbots/nova-js"
import type { Nova } from "@wandelbots/nova-js/v2"
import {
  JoggingStore,
  type JoggingStoreStorage,
} from "../../components/jogging/JoggingStore"
import type { ConnectionLogger } from "../connectionLogger"
import { ControllerStateStream } from "../ControllerStateStream"
import { JoggerConnection, type JoggerMode } from "../JoggerConnection"
import { MotionStreamConnection } from "../MotionStreamConnection"
import { TrajectoryExecutionStore } from "../TrajectoryExecutionStore"
import type { RobotLoadResources } from "./loadRobotResources"
import { RobotActivation, RobotModeChangeError } from "./RobotActivation"
import { RobotDescription } from "./RobotDescription"
import { RobotLiveState } from "./RobotLiveState"
import { type RobotNotMoveableReason, RobotSafety } from "./RobotSafety"
import { RobotTargetPose } from "./RobotTargetPose"

// Built from RobotPad's ActiveRobotStore

/** Something that went wrong in a robot session, for the app to show */
export type RobotSessionError = {
  /**
   * What failed: a mode change, a jog, a message of the live state, or an
   * automatic activation
   */
  kind: "mode" | "jog" | "stream"
  message: string
  /** The request or stream it came from */
  url?: string
  cause?: unknown
}

/** What an app can give a robot session */
export type RobotSessionOptions = {
  /** The app's lock: a locked app plans and starts no trajectory */
  isLocked?: () => boolean
  /**
   * Gets what goes wrong in the background: a jog error, a message of the
   * live state the session could not use, a failed automatic activation.
   * What an app calls itself (e.g. `activation.activate()`) rejects instead.
   */
  onError?: (error: RobotSessionError) => void
  /**
   * Where to keep the user's jogging settings, e.g. `localStorage`. Without
   * it nothing is kept.
   */
  storage?: JoggingStoreStorage
  /** Where the session's connections log. Defaults to the console. */
  logger?: ConnectionLogger
  /** Activate a virtual robot once it is loaded. Defaults to false. */
  autoActivateVirtual?: boolean
}

/** A storage that keeps nothing */
const NO_STORAGE: JoggingStoreStorage = {
  getItem: () => null,
  setItem: () => {},
}

/**
 * One robot of a NOVA cell, loaded and connected: what NOVA describes about
 * it, its live state, its safety and activation, its jogging and its moves to
 * a pose. Made by {@link loadRobotSession}; {@link RobotSession.dispose}
 * closes its connections.
 */
export class RobotSession {
  readonly motionGroupId: string
  readonly controllerId: string
  readonly cellId: string
  /**
   * The library's own NOVA client of the robot's instance (see
   * `createNovaClient`): `robotModelOf` downloads the model with it
   * @internal
   */
  readonly nova: Nova

  /** What NOVA describes about the robot; does not change */
  readonly description: RobotDescription
  /** The live state of the robot and its controller, and its TCP pose */
  readonly state: RobotLiveState
  /** Whether the robot may be activated and moved, and why not */
  readonly safety: RobotSafety
  /** The robot's activation (control mode) */
  readonly activation: RobotActivation
  /**
   * Jogging the robot, with the user's jogging settings. It starts no jog
   * while the robot may not move ({@link RobotSafety.canBeMoved}): the start
   * rejects with a `JoggingRefusedError` that says why.
   */
  readonly jogging: JoggingStore
  /** Moving the robot to a pose along a planned trajectory (Move to) */
  readonly trajectory: TrajectoryExecutionStore
  /** A pose the user types in, planned so Move to can drive there */
  readonly targetPose: RobotTargetPose

  private readonly stateSource: RobotLoadResources["stateSource"]
  private readonly motionStateSocket: RobotLoadResources["motionStateSocket"]
  private readonly onError: (error: RobotSessionError) => void

  /**
   * @internal Use {@link loadRobotSession}, which loads the resources and
   * makes the session
   */
  constructor(
    nova: Nova,
    ids: { cellId: string; controllerId: string; motionGroupId: string },
    resources: RobotLoadResources,
    options: RobotSessionOptions = {},
  ) {
    const logger = options.logger ?? console
    this.onError = options.onError ?? (() => {})
    this.nova = nova
    this.motionGroupId = ids.motionGroupId
    this.controllerId = ids.controllerId
    this.cellId = ids.cellId
    this.stateSource = resources.stateSource
    this.motionStateSocket = resources.motionStateSocket

    const motionStream = new MotionStreamConnection(
      nova,
      resources.controllerState,
      resources.motionGroupState,
      resources.motionGroupDescription,
      resources.initialMotionState,
      resources.motionStateSocket,
      ids.cellId,
      { logger },
    )
    const jogger = new JoggerConnection(motionStream, {
      cellId: ids.cellId,
      motionGroupModel: resources.motionGroupModelName,
      logger,
      onError: (error) =>
        this.onError({
          kind: "jog",
          message: makeErrorMessage(error),
          url: jogger.motionStream.motionStateSocket.url,
          cause: error,
        }),
    })
    this.jogging = JoggingStore.create(
      jogger,
      {
        coordinateSystems: resources.coordinateSystems,
        description: resources.motionGroupDescription,
        kinematicModel: resources.kinematicModel,
      },
      {
        storage: options.storage ?? NO_STORAGE,
        // The store starts no jog while the robot may not move
        notMoveableReason: () => this.jogRefusedReason,
      },
    )

    // The jogging store has made the controller's default coordinate system
    // "world"; the description takes the same list
    this.description = new RobotDescription(
      resources.motionGroupDescription,
      resources.controllerConfiguration,
      resources.kinematicModel,
      resources.motionGroupModelName,
      this.jogging.coordSystems,
    )

    const stream = new ControllerStateStream(
      resources.stateSource,
      ids.motionGroupId,
      resources.initialControllerState,
      {
        isVirtual: this.description.isVirtual,
        onError: (error) => this.onError({ kind: "stream", ...error }),
      },
    )
    this.state = new RobotLiveState(stream, this.description, this.jogging)
    this.activation = new RobotActivation(
      nova,
      ids,
      this.state,
      () => this.safety,
      logger,
      () => this.releaseControl(),
    )
    this.safety = new RobotSafety(this.state, () => this.activation.state)

    this.trajectory = new TrajectoryExecutionStore({
      joggingStore: this.jogging,
      isLocked: options.isLocked,
      ensureMovementOwnership: () => this.ensureMovementOwnership("trajectory"),
      logger,
    })

    this.targetPose = new RobotTargetPose(
      {
        motionGroupId: ids.motionGroupId,
        state: this.state,
        jogging: this.jogging,
        trajectory: this.trajectory,
        // A typed pose plans nothing while the robot may not move, or while
        // the app is locked
        notMoveableReason: () =>
          this.safety.notMoveableReason ??
          (options.isLocked?.() ? { code: "locked" } : null),
      },
      logger,
    )
    // A staged typed pose holds the execution session open for its armed
    // Move to, and the controller does not jog then: hand it back when the
    // user starts jogging instead
    this.jogging.onBeforeActivate = async () => {
      if (this.targetPose.staged) {
        await this.targetPose.resetToLive()
      }
    }

    // A virtual robot can be activated without any safety considerations
    if (
      options.autoActivateVirtual &&
      this.description.isVirtual &&
      this.activation.state === "inactive"
    ) {
      this.activation.activate().catch((error: unknown) => {
        this.onError({
          kind: "mode",
          message: makeErrorMessage(error),
          url: error instanceof RobotModeChangeError ? error.url : undefined,
          cause: error,
        })
      })
    }
  }

  /**
   * Reports what went wrong in a call that a connected component made for
   * the user, e.g. a jog: such a component has nobody to reject to, so it
   * goes to the app's `onError` like the session's own background problems
   * @internal
   */
  reportError(error: RobotSessionError) {
    this.onError(error)
  }

  /** Which motion owns the robot: jogging, a trajectory, or none ("off") */
  get movementOwner(): JoggerMode {
    return this.jogging.jogger.mode
  }

  /**
   * Hands the robot to jogging or to a trajectory: the controller runs only
   * one of them at a time.
   *
   * Handing it to jogging opens the jogging websocket, a movement connection
   * for which NOVA switches the controller to control mode by itself. So it
   * rejects with a `JoggingRefusedError` as a jog of {@link RobotSession.jogging}
   * does, while the robot may not move or its jogging store is locked.
   * Handing it to a trajectory opens nothing.
   */
  async ensureMovementOwnership(target: Exclude<JoggerMode, "off">) {
    if (this.movementOwner === target) {
      return
    }

    if (target === "jogging") {
      // The store's guard is the only way to the jogging websocket
      await this.jogging.claimForJogging()
      return
    }

    await this.jogging.deactivate()
    await this.jogging.jogger.setJoggingMode(target)
  }

  /**
   * Why the jogging store starts no jog now, or null when the robot can move.
   * While the robot is activating or deactivating its safety has no reason
   * (the robot is not deactivated, and Move to waits for it). But its
   * controller is not in control mode yet, where NOVA would switch it for
   * the jog, or is about to leave it: no jog then either.
   */
  private get jogRefusedReason(): RobotNotMoveableReason | null {
    return (
      this.safety.notMoveableReason ??
      (this.safety.canBeMoved ? null : { code: "deactivated" })
    )
  }

  /**
   * Hands back what holds the controller in control mode, before the robot
   * is deactivated: a step that runs, which is stopped and over once the
   * robot stands still (NOVA would run it to its end), and a planned move
   */
  private async releaseControl() {
    await this.jogging.stopIncrementalJog({ code: "deactivated" })
    await this.releasePlannedMove()
  }

  /**
   * Drops a planned move: a staged typed pose, or a trajectory the app
   * planned itself (RobotPad: to a saved pose). It holds the controller's
   * execution session, which keeps the controller in control mode: also
   * when the store has no plan any more (the robot arrived, the move
   * failed), since NOVA keeps the trajectory.
   */
  private async releasePlannedMove() {
    if (this.targetPose.staged) {
      await this.targetPose.resetToLive()
    }
    if (
      this.trajectory.plannedTrajectory ||
      this.trajectory.trajectoryState !== "idle" ||
      this.trajectory.holdsExecutionSession
    ) {
      await this.trajectory.stopAndReset()
    }
  }

  /** Closes the session's connections and stops following the robot */
  dispose() {
    this.activation.dispose()
    this.targetPose.dispose()
    this.state.stream.dispose()
    this.trajectory.dispose()
    this.stateSource.close()
    this.jogging.dispose()
    // The jogger does not own the motion stream it was given, so closing the
    // jogging store leaves its websocket open: close it here
    this.motionStateSocket.dispose()
  }
}
