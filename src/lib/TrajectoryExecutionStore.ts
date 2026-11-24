import {
  type AutoReconnectingWebsocket,
  tryParseJson,
} from "@wandelbots/nova-js"
import type {
  ExecuteTrajectoryResponse,
  InitializeMovementRequest,
  MotionCommand,
  PauseMovementRequest,
  PlanTrajectoryResponse,
  Pose,
  StartMovementRequest,
} from "@wandelbots/nova-js/v2"
import {
  type IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
  when,
} from "mobx"
import type { JoggingStore } from "../components/jogging/JoggingStore"
import type { ConnectionLogger } from "./connectionLogger"
import { transformPoseToCoordinateSystem } from "./PoseTransformer"

// Ported from RobotPad (src/util/TrajectoryExecutionStore.ts)

/** Where {@link TrajectoryExecutionStore.planTrajectory} moves the robot to */
export type TrajectoryTarget =
  | {
      type: "cartesian"
      /**
       * The pose of the jogging store's selected TCP, in the coordinate
       * system `coordinateSystemId`
       */
      pose: Pose
      /**
       * A coordinate system of the jogging store's `coordSystems`, also one
       * that refers to another. Defaults to world.
       */
      coordinateSystemId?: string
    }
  | {
      type: "joint"
      /** The position of each joint (rad, or mm for a prismatic joint) */
      joints: number[]
    }

/**
 * Outcome of a planTrajectory call. Planner rejections (unreachable pose,
 * singularity, joint limit, ...) are an expected user-facing result rather
 * than an exception, so they are returned as a value carrying the backend's
 * error_feedback_name (e.g. "FeedbackOutOfWorkspace") for the caller to
 * translate into a friendly message, see `planErrorTranslationKey`.
 */
export type PlanTrajectoryResult =
  | { ok: true }
  | { ok: false; errorFeedbackName: string }

/** The first and the last joint positions of the planned trajectory */
export type PlannedTrajectory = {
  startJoints: number[]
  endJoints: number[]
}

/**
 * - "idle": no trajectory
 * - "planning": a trajectory is planned or waits for NOVA to accept it
 * - "planned": NOVA accepted the trajectory, `start` moves the robot
 * - "moving": the robot moves along the trajectory
 * - "stopping": the robot decelerates after a pause
 */
export type TrajectoryState =
  | "idle"
  | "planning"
  | "planned"
  | "moving"
  | "stopping"

/** See {@link TrajectoryExecutionStore} */
export type TrajectoryExecutionStoreOptions = {
  /**
   * The jogging store of the motion group: its jogger's connection, the
   * selected TCP, the coordinate systems and the velocities
   */
  joggingStore: JoggingStore

  /**
   * Whether the app locks the robot. `planTrajectory` refuses to plan then.
   * Defaults to never locked.
   */
  isLocked?: () => boolean

  /**
   * Called before each plan: ends every other motion of the app that holds
   * the controller's execution session. Defaults to ending continuous jogging
   * and putting the jogger into its "trajectory" mode.
   */
  ensureMovementOwnership?: () => Promise<void>

  /** Where the store logs. Defaults to the console. */
  logger?: ConnectionLogger
}

/**
 * Moves the robot to a target ("Move to"): plans a trajectory to it, keeps it
 * initialized on an execution websocket of the controller, and starts and
 * pauses the motion along it. Without a UI: an app shows `trajectoryState`,
 * `plannedTrajectory` and `lastError` and calls the actions.
 *
 * A planned trajectory holds the controller's execution session, also after
 * the robot arrived, until `stopAndReset`. So an app calls that before
 * jogging again (e.g. from the jogging store's `onBeforeActivate`).
 */
export class TrajectoryExecutionStore {
  /** The trajectory that `start` moves along, from the last plan */
  plannedTrajectory: PlannedTrajectory | null = null
  /** See {@link TrajectoryState} */
  trajectoryState: TrajectoryState = "idle"
  /** The message of the last motion error. `clearError` removes it. */
  lastError: string | null = null

  private socket: AutoReconnectingWebsocket
  /**
   * NOVA got a trajectory on the execution websocket and the websocket is
   * still open: it may hold the trajectory, whatever became of the plan here
   */
  private armed = false
  private readonly disposers: IReactionDisposer[] = []
  private readonly logger: ConnectionLogger

  constructor(private readonly options: TrajectoryExecutionStoreOptions) {
    this.logger = options.logger ?? console
    makeAutoObservable<this, "socket" | "disposers" | "logger" | "options">(
      this,
      { socket: false, disposers: false, logger: false, options: false },
      { autoBind: true },
    )
    this.socket = this.openSocket()

    this.disposers.push(
      reaction(
        () => this.executionState,
        (executionState) => {
          if (executionState === "END_OF_TRAJECTORY") {
            this.reset()
          }
        },
      ),
    )
  }

  private get joggingStore() {
    return this.options.joggingStore
  }

  private get jogger() {
    return this.options.joggingStore.jogger
  }

  private get motionStream() {
    return this.options.joggingStore.jogger.motionStream
  }

  /**
   * Whether NOVA may still hold a trajectory of this store, and with it the
   * controller's execution session, which blocks jogging and keeps the
   * controller in control mode: from a plan that NOVA got until
   * `stopAndReset`. Also after `reset`, after the robot arrived and after a
   * failed move, which only drop the plan here.
   */
  get holdsExecutionSession() {
    return this.armed
  }

  /** The execution state that the motion stream reports, e.g. "RUNNING" */
  get executionState() {
    return this.motionStream.rapidlyChangingMotionState.execute?.details?.state
      .kind
  }

  /**
   * Plans a trajectory from the current joints to the target and initializes
   * it on the execution websocket. The store is "planned" once NOVA accepted
   * it. Returns a planner rejection as a value; throws while the app locks
   * the robot and when the planner cannot be reached. A target that cannot be
   * planned leaves no trajectory, also not the one before it on the
   * controller.
   */
  async planTrajectory(
    target: TrajectoryTarget,
  ): Promise<PlanTrajectoryResult> {
    if (this.options.isLocked?.()) {
      await this.dropPlan()
      throw new Error("Cannot plan trajectory: the robot is locked")
    }

    await this.ensureMovementOwnership()

    const currentJoints =
      this.motionStream.rapidlyChangingMotionState.joint_position ?? []

    const { cycle_time, mounting, motion_group_model, tcps } =
      this.motionStream.description

    const selectedTcpId = this.joggingStore.selectedTcpId
    const tcp_offset = selectedTcpId ? tcps?.[selectedTcpId]?.pose : undefined

    const motion_group_setup = {
      // The model the jogger plans step jogs with: the custom copy that holds
      // this robot's data, if the app gave one
      motion_group_model:
        this.jogger.options?.motionGroupModel ?? motion_group_model,
      cycle_time: cycle_time ?? 0,
      mounting,
      ...(tcp_offset && { tcp_offset }),
    }

    let motionCommand: MotionCommand
    if (target.type === "cartesian") {
      let targetPose = target.pose
      const coordinateSystemId = target.coordinateSystemId || "world"
      if (coordinateSystemId !== "world") {
        try {
          // PathCartesianPTP expects world coordinates. The TCP offset
          // remains handled separately by motion_group_setup.
          targetPose = transformPoseToCoordinateSystem(
            {
              pose: {
                position: targetPose.position ?? [0, 0, 0],
                orientation: targetPose.orientation ?? [0, 0, 0],
              },
              coordinateSystemId,
            },
            "world",
            this.joggingStore.coordSystems,
          ).pose
        } catch {
          // A saved pose may refer to a deleted frame. Never plan its local
          // coordinates as world coordinates or leave an old plan armed.
          await this.dropPlan()
          return { ok: false, errorFeedbackName: "FeedbackUnknown" }
        }
      }

      motionCommand = {
        limits_override: {
          tcp_velocity_limit: this.joggingStore.translationVelocityMmPerSec,
        },
        path: {
          target_pose: targetPose,
          path_definition_name: "PathCartesianPTP",
        },
      }
    } else {
      motionCommand = {
        limits_override: {
          joint_velocity_limits: Array(currentJoints.length).fill(
            this.joggingStore.rotationVelocityRadsPerSec,
          ),
        },
        path: {
          target_joint_position: target.joints,
          path_definition_name: "PathJointPTP",
        },
      }
    }

    // After an await, so no longer in the action of planTrajectory
    runInAction(() => {
      this.lastError = null
      this.trajectoryState = "planning"
    })

    let planned: PlanTrajectoryResponse
    try {
      planned = await this.jogger.nova.api.trajectoryPlanning.planTrajectory(
        this.jogger.cellId,
        {
          motion_group_setup,
          start_joint_position: currentJoints,
          motion_commands: [motionCommand],
        },
      )
    } catch (err) {
      // Not a planner verdict but a transport failure: do not stay "planning"
      await this.dropPlan()
      throw err
    }
    const trajectory = planned.response

    // A failed plan comes back as a regular 200 response carrying
    // error_feedback with the actual failure reason (out of workspace,
    // singularity, joint limit, ...). This is an expected outcome of typing
    // in an arbitrary target pose, so it's reported as a result value rather
    // than thrown.
    if ("error_feedback" in trajectory) {
      const errorFeedbackName =
        (trajectory.error_feedback as { error_feedback_name?: string })
          ?.error_feedback_name ?? "FeedbackUnknown"
      await this.dropPlan()
      return { ok: false, errorFeedbackName }
    }

    const trajectoryJoints = trajectory.joint_positions
    const startJoints = trajectoryJoints[0]
    const endJoints = trajectoryJoints[trajectoryJoints.length - 1]

    if (!startJoints || !endJoints) {
      await this.dropPlan()
      throw new Error("Trajectory returned invalid joint positions")
    }

    const initRequest: InitializeMovementRequest = {
      message_type: "InitializeMovementRequest",
      trajectory: {
        message_type: "TrajectoryData",
        motion_group: this.jogger.motionGroupId,
        tcp: selectedTcpId || undefined,
        data: trajectory,
      },
    }

    this.socket.sendJson(initRequest)
    runInAction(() => {
      this.armed = true
      this.plannedTrajectory = { startJoints, endJoints }
    })

    return { ok: true }
  }

  /** Starts the motion along the planned trajectory */
  start() {
    if (!this.plannedTrajectory) {
      throw new Error("Cannot start trajectory: no planned trajectory exists")
    }

    if (this.trajectoryState !== "planned") {
      throw new Error(
        `Cannot start trajectory: expected state "planned", got "${this.trajectoryState}"`,
      )
    }

    if (this.executionState === "RUNNING") {
      throw new Error("Cannot start trajectory: robot is already running")
    }

    const request: StartMovementRequest = {
      message_type: "StartMovementRequest",
      direction: "DIRECTION_FORWARD",
    }

    this.socket.sendJson(request)
  }

  /**
   * Pauses the motion. Resolves once the robot stands still; the trajectory
   * stays planned, so `start` goes on from there.
   */
  async pause() {
    if (this.trajectoryState !== "moving") {
      throw new Error(
        `Cannot pause trajectory: expected state "moving", got "${this.trajectoryState}"`,
      )
    }

    if (this.executionState === "PAUSED_BY_USER") {
      throw new Error("Cannot pause trajectory: robot is already paused")
    }

    const request: PauseMovementRequest = {
      message_type: "PauseMovementRequest",
    }

    this.socket.sendJson(request)

    await this.waitUntilStopped()

    runInAction(() => {
      this.trajectoryState = this.plannedTrajectory ? "planned" : "idle"
    })
  }

  /**
   * Stops a moving robot, drops the trajectory and hands the controller's
   * execution session back: closes the execution websocket and opens a new
   * one for the next plan
   */
  async stopAndReset() {
    try {
      if (
        this.executionState === "RUNNING" ||
        this.trajectoryState === "moving"
      ) {
        const request: PauseMovementRequest = {
          message_type: "PauseMovementRequest",
        }
        this.socket.sendJson(request)
        await this.waitUntilStopped()
      }
    } catch (err) {
      this.logger.warn("Failed to stop trajectory execution cleanly", err)
    } finally {
      this.reset()
      this.closeSocket()
      this.socket = this.openSocket()
    }
  }

  /**
   * Drops the planned trajectory here, without telling NOVA: it keeps the
   * trajectory and the execution session, see
   * {@link TrajectoryExecutionStore.holdsExecutionSession}
   */
  reset() {
    this.plannedTrajectory = null
    this.trajectoryState = "idle"
  }

  /**
   * Drops the plan because its next target cannot be planned. The trajectory
   * before it is still armed on the controller, so the execution session goes
   * back as well: with no plan here, nothing else would ask for that.
   */
  private async dropPlan() {
    if (this.armed) {
      await this.stopAndReset()
    } else {
      this.reset()
    }
  }

  /** Removes {@link TrajectoryExecutionStore.lastError} */
  clearError() {
    this.lastError = null
  }

  /** Closes the execution websocket and stops following the motion stream */
  dispose() {
    for (const dispose of this.disposers) {
      dispose()
    }
    this.closeSocket()
  }

  /** Ends continuous jogging, unless the app has its own way */
  private async ensureMovementOwnership() {
    if (this.options.ensureMovementOwnership) {
      await this.options.ensureMovementOwnership()
      return
    }

    if (this.jogger.mode === "trajectory") {
      return
    }

    await this.joggingStore.deactivate()
    await this.jogger.setJoggingMode("trajectory")
  }

  /** Resolves once the motion stream reports that the robot stands still */
  private async waitUntilStopped() {
    await when(() => this.motionStream.rapidlyChangingMotionState.standstill)
  }

  private handleMessage(event: MessageEvent) {
    const data = tryParseJson(event.data)?.result as
      | ExecuteTrajectoryResponse
      | undefined
    if (!data) return

    switch (data.kind) {
      case "INITIALIZE_RECEIVED":
        // NOVA refuses with add_trajectory_error, or with a message for an
        // invalid request, as JoggerConnection's steps read it too
        if (data.add_trajectory_error || data.message) {
          this.lastError =
            data.add_trajectory_error?.message ??
            data.message ??
            "NOVA refused the trajectory"
          this.reset()
        } else {
          this.trajectoryState = "planned"
        }
        break
      case "START_RECEIVED":
        this.trajectoryState = "moving"
        break
      case "PAUSE_RECEIVED":
        // Only an interim state while the robot is still decelerating.
        // pause() waits on the motion stream, which settles as soon as the
        // robot stands still -- for a robot that was already at its target
        // that happens before this acknowledgement arrives. Re-entering
        // "stopping" then would strand the Move to button: nothing writes
        // trajectoryState afterwards.
        if (this.trajectoryState === "moving") {
          this.trajectoryState = "stopping"
        }
        break
      case "MOTION_ERROR":
        this.lastError = data.message
        this.reset()
        break
    }
  }

  private openSocket() {
    const socket = this.jogger.nova.openReconnectingWebsocket(
      `/cells/${this.jogger.cellId}/controllers/${this.motionStream.controllerId}/execution/trajectory`,
    )
    socket.addEventListener("message", this.handleMessage)
    return socket
  }

  private closeSocket() {
    this.socket.removeEventListener("message", this.handleMessage)
    this.socket.dispose()
    // The execution session ends with its websocket
    this.armed = false
  }
}
