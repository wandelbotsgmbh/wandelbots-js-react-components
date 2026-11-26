import {
  tryParseJson,
  type AutoReconnectingWebsocket,
} from "@wandelbots/nova-js"
import {
  JointTypeEnum,
  type CoordinateSystem,
  type InitializeMovementResponse,
  type JointTrajectory,
  type MotionCommand,
  type Pose,
  type StartMovementResponse,
} from "@wandelbots/nova-js/v2"
import { when } from "mobx"
import {
  JoggingRefusedError,
  type JoggingRefusedReason,
} from "../components/jogging/JoggingRefusedError"
import type { ConnectionLogger } from "./connectionLogger"
import {
  computeIncrementalTargetPose,
  type IncrementalMotion,
} from "./incrementalCartesianMotion"
import { MotionStreamConnection } from "./MotionStreamConnection"
import type { NovaConnection } from "./novaConnection"
import {
  poseOfFrame,
  type Quat,
  rotateVector,
  vectorAlongAxis,
} from "./poseMath"

export type { IncrementalMotion } from "./incrementalCartesianMotion"

export type Vector3Simple = [number, number, number]

const API_ERROR_CONNECTION_BLOCKED = `Movement request rejected. Another client is currently executing a 'Jogging' motion!`

/** `WebSocket.OPEN`, also where there is no WebSocket (Node) */
const OPEN = 1

/**
 * Slack added on top of a jog's planned duration by {@link motionTimeoutMs}:
 * covers the two websocket round trips of the start handshake and the lag until
 * the motion stream reports standstill again.
 */
const MOTION_HANDSHAKE_ALLOWANCE_MS = 5_000

/**
 * Watchdog for a single incremental jog, after which the caller is released
 * even though the motion never reported completion. Without it, a motion
 * that never starts, or a lost update of the motion stream, would leave the
 * jogging UI locked for good.
 *
 * Derived from the planned trajectory rather than fixed, so that a 0.1mm jog is
 * not given the same budget as a 5° one at the slowest 1°/s. Doubling the planned duration
 * is deliberately generous: firing early disposes the execution socket
 * mid-motion, which truncates the jog and re-opens the very race that makes
 * waiting for the motion necessary in the first place.
 */
function motionTimeoutMs(trajectory: JointTrajectory) {
  const plannedSeconds = trajectory.times?.[trajectory.times.length - 1] ?? 0
  return plannedSeconds * 2000 + MOTION_HANDSHAKE_ALLOWANCE_MS
}

/** A step jog: see `JoggerConnection.runIncrementalCartesianMotion` */
export type IncrementalCartesianMotionRequest = {
  currentTcpPose: Pose
  currentJoints: Vector3Simple
  /**
   * @deprecated Not used: a step follows the jogger's `orientation` and
   * `coordinateSystem`
   */
  coordSystemId?: string
  velocityInRelevantUnits: number
  axis: "x" | "y" | "z"
  direction: "-" | "+"
  motion: IncrementalMotion
  /**
   * Why the robot may not move now, or null when it may. The step asks right
   * before it sends its trajectory to NOVA and right before it starts it:
   * with a reason it sends nothing more and rejects with a
   * `JoggingRefusedError`, also with `onError`, since the robot did not
   * move. Planning the step and NOVA's answer to its trajectory take a round
   * trip each, and NOVA switches a controller to control mode by itself for
   * a movement request. The jogging store gives it.
   */
  refusedReason?: () => JoggingRefusedReason | null
}

/**
 * The trajectory-execution messages this client acts on. Each generated
 * response type declares its own single-value `kind`, so there is no ready-made
 * union to use; the kinds without a dedicated response type are listed here.
 */
type TrajectoryExecutionResult = {
  kind:
    | InitializeMovementResponse["kind"]
    | StartMovementResponse["kind"]
    | "PAUSE_RECEIVED"
    | "MOTION_ERROR"
  message?: string
  add_trajectory_error?: InitializeMovementResponse["add_trajectory_error"]
}

export type JoggerConnectionOptions = {
  // The mode of the jogger connection - see type description of JoggerMode for details
  mode?: JoggerMode

  // Connection timeout in milliseconds to wait for jogging initialization to complete
  timeout?: number

  /**
   * Gets the errors of the jogging websocket and of step jogs (a refused
   * or failed plan, a refused trajectory, a motion that does not end). Without
   * it, the initialization of the jogging websocket and the step jog reject
   * with the error.
   */
  onError?: (err: unknown) => void

  // The TCP to use for jogging motions.
  tcp?: string

  /**
   * The coordinate system whose axes cartesian jogging moves along, unless in
   * tool orientation. Its pose has to be relative to world (a coordinate
   * system that refers to another one has to be resolved first). Defaults to
   * world.
   */
  coordinateSystem?: CoordinateSystem

  // If set to "tool", jogging TcpVelocityRequest will use `use_tool_coordinate_system` option
  orientation?: JoggerOrientation

  /** Cell id on the Nova instance. Defaults to "cell". */
  cellId?: string

  /**
   * Model name sent to the planner for incremental motions. Defaults to the
   * model in the motion group description; pass the resolved name for a robot
   * whose data lives in a custom copy.
   */
  motionGroupModel?: string

  /**
   * Where the jogger logs, and the motion stream that `open()` opens.
   * Defaults to the console.
   */
  logger?: ConnectionLogger
}

// Three modes are supported:
// - "jogging": Continuous jogging mode, where joint velocities or TCP velocities can be commanded. Opens a single websocket connection to jogging endpoint
// - "trajectory": Incremental jogging mode, where fixed distance motions are planned and executed. Opens a short lived websocket for each motion.
// - "off": No jogging, all websockets are closed.
export type JoggerMode = "jogging" | "trajectory" | "off"

// If set to "tool", will use `use_tool_coordinate_system` option in movement requests
export type JoggerOrientation = "coordsys" | "tool"

export class JoggerConnection {
  DEFAULT_MODE = "off" as JoggerMode
  DEFAULT_TCP: string | undefined = "Flange"
  NO_TCP: string | undefined = undefined
  DEFAULT_INIT_TIMEOUT = 5000
  DEFAULT_ORIENTATION = "coordsys" as JoggerOrientation

  mode: JoggerMode = "off"
  joggingSocket: AutoReconnectingWebsocket | null = null
  trajectorySocket: AutoReconnectingWebsocket | null = null
  timeout: number = this.DEFAULT_INIT_TIMEOUT
  tcp: string | undefined
  /** See {@link JoggerConnectionOptions.coordinateSystem}. Applies to the next jog command. */
  coordinateSystem: CoordinateSystem | undefined
  orientation: JoggerOrientation
  onError?: (err: unknown) => void
  onBlocked?: () => void

  private readonly logger: ConnectionLogger

  /**
   * Set from planning an incremental jog until the robot has come to a
   * standstill again. Jogs requested in between are dropped: their trajectory
   * would be planned from a joint position the robot has already left, and the
   * controller refuses that with "Motion group is not at expected location on
   * trajectory. Please move to the trajectory!".
   */
  private incrementalMotionInFlight = false

  /** Ends an incremental jog that still waits for the robot */
  private endIncrementalMotion?: () => void

  /**
   * Whether the jogger opened its motion stream itself (in `open()`): then
   * `dispose()` closes it too. A motion stream given to the constructor
   * belongs to the caller.
   */
  private ownsMotionStream = false

  /** Ends a jogging initialization that still waits for NOVA */
  private endJoggingInit?: () => void

  /**
   * Initialize the jogging connection using jogging endpoint or trajectory endpoint depending on the selected mode.
   *
   * @param connection - The base URL of a NOVA instance, or a NOVA client of the app (see `NovaConnection`)
   * @param motionGroupId - The ID of the motion group to connect to
   * @param options - Configuration options for the jogger connection
   * @param options.mode - The jogging mode to initialize:
   *   - "jogging": Continuous jogging mode with persistent websocket for real-time velocity commands
   *   - "trajectory": Incremental jogging mode for fixed-distance motions via trajectory planning
   *   - "off": No jogging enabled, all websockets closed (default)
   * @param options.timeout - Timeout in milliseconds for websocket initialization (default: 5000ms)
   * @param options.tcp - TCP frame to use for motions (default: from motion group)
   * @param options.coordinateSystem - Coordinate system whose axes cartesian jogging moves along, relative to world (default: world)
   * @param options.orientation - If set to "tool", jogging TcpVelocityRequest will use `use_tool_coordinate_system` option (default: "coordsys")
   * @param options.onError - Error handler for websocket errors and step jogs
   * @param options.motionGroupModel - Model name for planning step jogs (default: from the motion group description)
   * @param options.logger - Where the jogger and its motion stream log (default: the console)
   * @returns Promise resolving to initialized JoggerConnection instance. Its
   *   `dispose()` also closes the motion stream that this function opens.
   */
  static async open(
    connection: NovaConnection,
    motionGroupId: string,
    options: JoggerConnectionOptions = {},
  ) {
    // Get matching motion stream
    const motionStream = await MotionStreamConnection.open(
      connection,
      motionGroupId,
      {
        cellId: options.cellId,
        logger: options.logger,
      },
    )

    // Initialize jogger with options. It owns the motion stream.
    const jogger = new JoggerConnection(motionStream, options)
    jogger.ownsMotionStream = true

    // Initialize the jogging websocket, if necessary (mode is "jogging")
    try {
      await jogger.setJoggingMode(jogger.mode)
    } catch (err) {
      // Also closes the motion stream
      jogger.dispose()
      throw err
    }

    // Return the initialized jogger
    return jogger
  }

  constructor(
    readonly motionStream: MotionStreamConnection,
    readonly options: JoggerConnectionOptions | undefined = {},
  ) {
    this.tcp =
      options?.tcp ||
      motionStream.motionGroup.tcp ||
      this.getDefaultTcp(motionStream)
    this.coordinateSystem = options?.coordinateSystem
    this.orientation = options?.orientation || this.DEFAULT_ORIENTATION
    this.timeout = options?.timeout || this.DEFAULT_INIT_TIMEOUT
    this.mode = options?.mode || this.DEFAULT_MODE
    this.onError = options?.onError
    this.logger = options?.logger ?? console
  }

  getDefaultTcp(motionStream: MotionStreamConnection) {
    const firstJointType = motionStream.description.dh_parameters?.[0]?.type
    if (
      motionStream.joints.length < 6 &&
      (firstJointType === JointTypeEnum.RevoluteJoint ||
        firstJointType === JointTypeEnum.PrismaticJoint)
    ) {
      return this.NO_TCP
    }
    return this.DEFAULT_TCP
  }

  // Set a new tcp or other options. If current mode is jogging, will reinitialize the jogging websocket
  async setOptions(options: Partial<JoggerConnectionOptions>) {
    if (options.tcp) {
      this.tcp = options.tcp
    }

    if (options.orientation) {
      this.orientation = options.orientation
    }

    // Also undefined: back to world
    if ("coordinateSystem" in options) {
      this.coordinateSystem = options.coordinateSystem
    }

    if (options.timeout) {
      this.timeout = options.timeout
    }

    if (options.mode) {
      this.mode = options.mode
    }

    if (options.onError) {
      this.onError = options.onError
    }

    return this.setJoggingMode(this.mode, false)
  }

  get motionGroupId() {
    return this.motionStream.motionGroupId
  }

  /**
   * The library's own NOVA client of the motion stream
   * @internal
   */
  get nova() {
    return this.motionStream.nova
  }

  get cellId() {
    return this.motionStream.cellId
  }

  get numJoints() {
    return this.motionStream.joints.length
  }

  // get activeJoggingMode() {
  //   return this.mode
  // }

  // get activeWebsocket() {
  //   return this.mode === "jogging" ? this.joggingSocket : this.trajectorySocket;
  // }

  // Sends stop movement command to robot
  async stop() {
    if (this.joggingSocket) {
      const velocity = new Array(this.numJoints).fill(0)
      this.joggingSocket.sendJson({
        message_type: "JointVelocityRequest",
        velocity,
      })
    }

    if (this.trajectorySocket) {
      this.trajectorySocket.sendJson({
        message_type: "PauseMovementRequest",
      })
    }
  }

  /**
   * Dispose the jogger, closing all open websockets: the jogging websockets,
   * and the motion stream if the jogger opened it (in `open()`). A motion
   * stream given to the constructor stays open: its caller closes it.
   */
  async dispose() {
    const closed = this.closeJoggingSockets()
    if (this.ownsMotionStream) {
      this.motionStream.dispose()
    }
    return closed
  }

  /** Closes the jogging and trajectory websockets */
  private closeJoggingSockets() {
    // An initialization or a step that still waits has nothing to wait for
    // any more
    this.endJoggingInit?.()
    this.endIncrementalMotion?.()

    // Collect all initialized sockets
    const sockets = [this.joggingSocket, this.trajectorySocket].filter(
      (s) => s !== null,
    ) as AutoReconnectingWebsocket[]

    // Call them to dispose
    sockets.forEach((s) => {
      s.dispose()
    })

    // Remove references
    this.joggingSocket = null
    this.trajectorySocket = null

    // Return promise that resolves when all sockets are closed
    return Promise.all(sockets.map((s) => s.closed()))
  }

  // Activate jogger in one of the supported modes
  // Will iniitialize or close websockets as necessary
  // If mode is unchanged, does nothing (unless skipReinitializeIfSameMode is false)
  async setJoggingMode(mode: JoggerMode, skipReinitializeIfSameMode = true) {
    // If not changing mode, do nothing
    if (this.mode === mode && skipReinitializeIfSameMode) {
      return
    }

    // Close any previous websocket connection
    this.closeJoggingSockets()

    // Set the new mode
    this.mode = mode

    // Mode is "jogging" - open jogging websocket
    if (this.mode === "jogging") {
      return this.initializeJoggingWebsocket()
    }

    // Mode is "trajectory" or "off" - nothing more to do
    return
  }

  /**
   * Opens the continuous jogging websocket and initializes it; called by
   * `setJoggingMode("jogging")`. The promise settles once:
   * - it resolves when NOVA confirms the initialization (INITIALIZE_RECEIVED),
   *   when the jogger closes the websocket before that (`setJoggingMode`,
   *   `dispose`), or when an error message goes to `onBlocked` or `onError`;
   * - it rejects on an error message without such a handler, and when NOVA
   *   does not confirm the initialization within `timeout` milliseconds.
   */
  async initializeJoggingWebsocket() {
    return new Promise<void>((resolve, reject) => {
      const socket = this.nova.openReconnectingWebsocket(
        `/cells/${this.cellId}/controllers/${this.motionStream.controllerId}/execution/jogging`,
      )
      this.joggingSocket = socket

      let settled = false
      const timer = setTimeout(() => {
        end(
          new Error(`Jogging initialization timeout after ${this.timeout} ms`),
        )
      }, this.timeout)

      // Ends the initialization once: clears the timer and settles the promise
      const end = (error?: Error) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        socket.removeEventListener("close", onClose)
        if (this.endJoggingInit === endWithoutError) {
          this.endJoggingInit = undefined
        }
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      }
      // For the jogger: it closes the websocket (setJoggingMode, dispose)
      const endWithoutError = () => end()
      // The websocket was disposed elsewhere
      const onClose = () => {
        if (socket.disposed) end()
      }

      this.endJoggingInit = endWithoutError
      socket.addEventListener("close", onClose)

      socket.addEventListener("message", (ev: MessageEvent) => {
        const data = tryParseJson(ev.data)

        if (data?.result?.kind === "INITIALIZE_RECEIVED") {
          end()
          return
        }

        if (data?.result?.kind === "MOTION_ERROR") {
          if (
            this.onBlocked &&
            data?.result?.message.includes(API_ERROR_CONNECTION_BLOCKED)
          ) {
            end()
            socket.dispose()
            this.onBlocked()
            return
          } else if (this.onError) {
            end()
            this.onError(ev.data)
          } else {
            end(new Error(ev.data))
          }
        }
      })

      socket.sendJson({
        message_type: "InitializeJoggingRequest",
        motion_group: this.motionGroupId,
        ...(this.tcp ? { tcp: this.tcp } : {}),
      })
    })
  }

  /**
   * Jogging: Start rotation of a single robot joint at the specified velocity
   */
  async rotateJoints({
    joint,
    direction,
    velocityValue,
    velocityUnit,
  }: {
    /** Index of the joint to rotate */
    joint: number
    /** Direction of rotation ("+" or "-") */
    direction: "+" | "-"
    /** Speed of the rotation, unit is currently unused, but i wanted it there to raise awareness that not everything here is rad/s*/
    velocityValue: number
    velocityUnit: "mm/s" | "rad/s"
  }) {
    if (!this.joggingSocket || this.mode !== "jogging") {
      throw new Error(
        "Joint jogging websocket not connected; create one by setting jogging mode to 'jogging'",
      )
    }

    const velocity = new Array(this.numJoints).fill(0)

    velocity[joint] = direction === "-" ? -velocityValue : velocityValue

    this.joggingSocket.sendJson({
      message_type: "JointVelocityRequest",
      velocity,
    })
  }

  /**
   * Jogging: Start the TCP moving along a specified axis at a given velocity
   */
  async translateTCP({
    axis,
    direction,
    velocityMmPerSec,
  }: {
    axis: "x" | "y" | "z"
    direction: "-" | "+"
    velocityMmPerSec: number
  }) {
    if (!this.joggingSocket || this.mode !== "jogging") {
      throw new Error(
        "Continuous jogging websocket not connected; create one by setting jogging mode to 'jogging'",
      )
    }
    this.joggingSocket.sendJson({
      message_type: "TcpVelocityRequest",
      translation: this.velocityAlongAxis(
        axis,
        direction === "-" ? -velocityMmPerSec : velocityMmPerSec,
      ),
      rotation: [0, 0, 0],
      use_tool_coordinate_system: this.orientation === "tool",
    })
  }

  /**
   * Jogging: Start the TCP rotating around a specified axis at a given velocity
   */
  async rotateTCP({
    axis,
    direction,
    velocityRadsPerSec,
  }: {
    axis: "x" | "y" | "z"
    direction: "-" | "+"
    velocityRadsPerSec: number
  }) {
    if (!this.joggingSocket || this.mode !== "jogging") {
      throw new Error(
        "Continuous jogging websocket not connected; create one by setting jogging mode to 'jogging'",
      )
    }
    this.joggingSocket.sendJson({
      message_type: "TcpVelocityRequest",
      translation: [0, 0, 0],
      rotation: this.velocityAlongAxis(
        axis,
        direction === "-" ? -velocityRadsPerSec : velocityRadsPerSec,
      ),
      use_tool_coordinate_system: this.orientation === "tool",
    })
  }

  /**
   * Rotation from {@link JoggerConnection.coordinateSystem} into world,
   * while jogging along its axes. Undefined when jogging along world or tool
   * axes.
   */
  private get coordinateSystemRotation(): Quat | undefined {
    if (this.orientation === "tool" || !this.coordinateSystem) {
      return undefined
    }
    return poseOfFrame(this.coordinateSystem).quaternion
  }

  /**
   * Velocity vector along one axis of the jogging frame. The API takes TCP
   * velocities in either the tool frame or world, so an axis of
   * {@link JoggerConnection.coordinateSystem} is rotated into world here.
   */
  private velocityAlongAxis(
    axis: "x" | "y" | "z",
    velocity: number,
  ): Vector3Simple {
    const vector = vectorAlongAxis(axis, velocity)
    const rotation = this.coordinateSystemRotation
    return rotation ? rotateVector(vector, rotation) : vector
  }

  /**
   * Trajectory jogging:
   *
   * Move the robot by a fixed distance in a single cartesian
   * axis, either rotating or translating relative to the TCP.
   * The axis is one of the tool in tool orientation, else one of
   * {@link JoggerConnection.coordinateSystem} (default: world).
   *
   * Promise resolves only after the motion has completed: once NOVA reports
   * the trajectory at its end, or no longer as running (`stop()`), and the
   * robot stands still, or after a watchdog of twice the planned duration
   * plus 5 s, which also ends a step that never starts. A step requested
   * while another one runs is dropped (resolves at once). Every error (a
   * refused or failed plan, a refused trajectory, an error of the
   * controller, the watchdog) goes to `onError`, or without it rejects the
   * promise. A step that the robot may no longer make (see
   * {@link IncrementalCartesianMotionRequest.refusedReason}) rejects with a
   * `JoggingRefusedError`.
   */
  async runIncrementalCartesianMotion(
    request: IncrementalCartesianMotionRequest,
  ) {
    if (this.mode !== "trajectory") {
      throw new Error(
        "Set jogging mode to 'trajectory' to run incremental cartesian motions",
      )
    }

    // Dropped, not queued -- see incrementalMotionInFlight
    if (this.incrementalMotionInFlight) {
      return
    }
    this.incrementalMotionInFlight = true

    try {
      const trajectory = await this.planIncrementalCartesianMotion(request)
      if (trajectory) {
        await this.executeTrajectory(trajectory, request.refusedReason)
      }
    } finally {
      this.incrementalMotionInFlight = false
    }
  }

  /**
   * Plan the trajectory for a single incremental jog. Returns undefined when
   * no trajectory could be produced; the reason (a planner rejection such as a
   * singularity, or a motion group without a cycle time) is reported through
   * {@link JoggerConnection.onError} or logged.
   */
  private async planIncrementalCartesianMotion({
    currentTcpPose,
    currentJoints,
    velocityInRelevantUnits,
    axis,
    direction,
    motion,
  }: IncrementalCartesianMotionRequest) {
    const commands: MotionCommand[] = []

    // Resolve the absolute target pose to plan towards. The axis is interpreted
    // relative to the tool when the jogger is in tool orientation, matching the
    // `use_tool_coordinate_system` flag used for continuous jogging, and along
    // the jogging coordinate system otherwise.
    const targetPose = computeIncrementalTargetPose({
      currentTcpPose,
      axis,
      direction,
      motion,
      useToolCoordinateSystem: this.orientation === "tool",
      coordinateSystemRotation: this.coordinateSystemRotation,
    })

    commands.push({
      limits_override:
        motion.type === "translate"
          ? { tcp_velocity_limit: velocityInRelevantUnits }
          : { tcp_orientation_velocity_limit: velocityInRelevantUnits },
      path: {
        path_definition_name: "PathLine",
        target_pose: {
          position: targetPose.position,
          orientation: targetPose.orientation,
        },
      },
    })

    // Plan the motion https://portal.wandelbots.io/docs/api/v2/ui/#/operations/planTrajectory
    const description = this.motionStream.description
    if (description.cycle_time === undefined) {
      this.logger.warn(
        "Current motion group has no cycle time, cannot plan jogging motion",
      )
      return
    }

    // currentTcpPose (and thus the target pose) is the streamed pose of the
    // controller's active TCP. The planner interprets target_pose as the
    // flange pose unless given the flange-to-TCP offset, so without it the
    // planned motion would drive the flange to the TCP's target position --
    // a jump by the whole TCP offset instead of the requested increment.
    // Some controllers (e.g. UR) report an active TCP that has no entry in
    // the description's tcps map; there the streamed pose is the flange pose
    // and no offset must be applied.
    const activeTcpId = this.motionStream.rapidlyChangingMotionState.tcp
    const tcpOffset = activeTcpId
      ? description.tcps?.[activeTcpId]?.pose
      : undefined

    const motion_group_setup = {
      motion_group_model:
        this.options?.motionGroupModel ?? description.motion_group_model,
      cycle_time: description.cycle_time,
      mounting: description.mounting,
      tcp_offset: tcpOffset,

      // FIXME use proper mode's limits if set
      global: description.operation_limits.auto_limits,
    }

    const motionPlanRes = await this.nova.api.trajectoryPlanning.planTrajectory(
      this.cellId,
      {
        motion_group_setup,
        start_joint_position: currentJoints,
        motion_commands: commands,
      },
    )

    const trajectoryData = motionPlanRes.response
    if (!trajectoryData) {
      throw new Error(
        `Failed to plan jogging increment motion ${JSON.stringify(motionPlanRes)}`,
      )
    }

    // A failed plan comes back as a regular response object carrying
    // error_feedback with the actual failure reason (singularity, joint
    // limit, out of workspace, ...). It must not be sent to the execution
    // endpoint -- that would just produce a confusing follow-up error about
    // the trajectory having no samples.
    if ("error_feedback" in trajectoryData) {
      if (this.onError) {
        this.onError(trajectoryData)
        return
      }
      throw new Error(
        `Failed to plan jogging increment motion: ${JSON.stringify(trajectoryData.error_feedback)}`,
      )
    }

    return trajectoryData
  }

  /**
   * Execute a planned trajectory https://portal.wandelbots.io/docs/api/v2/ui/#/operations/executeTrajectory
   * and resolve once the robot has run it to its end and stands still again
   * (see {@link JoggerConnection.waitForMotionToFinish}), so that the caller
   * -- and with it the jogging UI's motion lock -- stays blocked for the
   * whole motion. It also resolves when the jogger closes the websocket
   * (`setJoggingMode`, `dispose`).
   *
   * Each call owns its own websocket. Sharing
   * {@link JoggerConnection.trajectorySocket} across motions meant a finishing
   * motion closed the socket of a later one.
   *
   * `refusedReason` is asked right before the trajectory and its start go to
   * NOVA, see {@link IncrementalCartesianMotionRequest.refusedReason}
   */
  private async executeTrajectory(
    trajectory: JointTrajectory,
    refusedReason: () => JoggingRefusedReason | null = () => null,
  ) {
    // Planning took a round trip: no websocket for a step that may not move
    const reason = refusedReason()
    if (reason) {
      throw new JoggingRefusedError(reason)
    }

    const socket = this.nova.openReconnectingWebsocket(
      `/cells/${this.cellId}/controllers/${this.motionStream.controllerId}/execution/trajectory`,
    )
    this.trajectorySocket = socket

    // Lets the cleanup below drop the standstill observers of an abandoned
    // motion instead of leaving them behind for the rest of the session
    const abortWaiting = new AbortController()
    let timeout: ReturnType<typeof setTimeout> | undefined
    let endWithoutError: (() => void) | undefined

    try {
      await new Promise<void>((resolve, reject) => {
        let settled = false

        const succeed = () => {
          if (settled) return
          settled = true
          resolve()
        }

        // Every failure path has to settle this promise: the jogging UI keeps
        // its axis buttons disabled for as long as it is pending.
        const fail = (err: unknown) => {
          if (settled) return
          settled = true

          if (this.onError) {
            this.onError(err)
            resolve()
            return
          }

          reject(
            err instanceof Error
              ? err
              : new Error(
                  `Failed to execute trajectory: ${JSON.stringify(err)}`,
                ),
          )
        }

        // Whether the robot may no longer move: then the step ends here, with
        // nothing more sent. Not an error of the motion, so not for onError.
        const refused = () => {
          const reason = refusedReason()
          if (!reason) return false
          if (!settled) {
            settled = true
            reject(new JoggingRefusedError(reason))
          }
          return true
        }

        // For the jogger: it closes the websocket, which ends the motion
        endWithoutError = succeed
        this.endIncrementalMotion = succeed

        const timeoutMs = motionTimeoutMs(trajectory)
        timeout = setTimeout(() => {
          fail(
            new Error(`Jogging motion did not complete within ${timeoutMs}ms`),
          )
        }, timeoutMs)

        socket.addEventListener("message", (ev: MessageEvent) => {
          const result = tryParseJson(ev.data)?.result as
            | TrajectoryExecutionResult
            | undefined

          if (!result?.kind) {
            fail(
              new Error(
                `Failed to execute trajectory: Received invalid message ${ev.data}`,
              ),
            )
            return
          }

          if (
            this.onBlocked &&
            result.message?.includes(API_ERROR_CONNECTION_BLOCKED)
          ) {
            this.onBlocked()
            succeed()
            return
          }

          if (result.kind === "INITIALIZE_RECEIVED") {
            // A refusal arrives as an INITIALIZE_RECEIVED carrying a message,
            // e.g. "Motion group is not at expected location on trajectory"
            // when the robot moved on after the trajectory was planned.
            // Starting the movement anyway would ask the controller to execute
            // exactly the trajectory it just refused.
            if (result.add_trajectory_error || result.message) {
              fail(result)
              return
            }

            // NOVA's answer took a round trip
            if (refused()) return

            // Trajectory locked, now start movement
            socket.sendJson({
              message_type: "StartMovementRequest",
              direction: "DIRECTION_FORWARD",
            })
          } else if (result.kind === "START_RECEIVED") {
            if (result.message) {
              fail(result)
              return
            }

            this.waitForMotionToFinish(trajectory, abortWaiting.signal).then(
              succeed,
              fail,
            )
          } else if (result.kind === "PAUSE_RECEIVED") {
            // `stop()` paused the step: it is over once the robot stands
            // still, also when the stream never showed it running
            this.waitUntilStopped(abortWaiting.signal).then(succeed, fail)
          } else if (result.kind === "MOTION_ERROR" && result.message) {
            fail(result)
          } else {
            fail(
              new Error(
                `Failed to execute trajectory, cannot handle message type "${result.kind}"`,
              ),
            )
          }
        })

        // Send initialization/movement request
        const initialize = () => {
          if (refused()) return
          socket.sendJson({
            message_type: "InitializeMovementRequest",
            trajectory: {
              message_type: "TrajectoryData",
              motion_group: this.motionGroupId,
              data: trajectory,
              tcp: this.tcp,
            },
          })
        }
        // A websocket that is not open yet queues what is sent, and sends it
        // once it is: the robot may no longer move by then. So it is sent,
        // and asked for, once the websocket is open; and only once, also
        // when it opens again.
        if (socket.readyState === OPEN) {
          initialize()
        } else {
          const onOpen = () => {
            socket.removeEventListener("open", onOpen)
            initialize()
          }
          socket.addEventListener("open", onOpen)
        }
      })
    } finally {
      clearTimeout(timeout)
      abortWaiting.abort()
      if (this.endIncrementalMotion === endWithoutError) {
        this.endIncrementalMotion = undefined
      }

      // Close connection and free robot
      socket.dispose()
      if (this.trajectorySocket === socket) {
        this.trajectorySocket = null
      }
    }
  }

  /**
   * Resolve once the robot has finished executing a trajectory.
   *
   * What says so is the execution state in the motion stream (`execute`),
   * which NOVA gives to follow a movement. `standstill` alone does not: it
   * says that NOVA treats the measured joint velocities as 0, which is so
   * before the robot picks up speed and can be so for the whole of a slow
   * motion. A step that took `standstill` as its end closed its websocket,
   * and with it stopped the robot, soon after the start of a 5° turn at
   * 1 °/s.
   *
   * So the step is over when NOVA has run the trajectory to its end, or no
   * longer runs it after it did (NOVA executes nothing any more), and the
   * robot stands still. A step that never starts does not get here: the
   * watchdog of `executeTrajectory` ends it with an error.
   */
  private async waitForMotionToFinish(
    trajectory: JointTrajectory,
    signal: AbortSignal,
  ) {
    // NOVA calls both ends of a trajectory END_OF_TRAJECTORY: its first
    // sample, for a move backward, and its last. A step moves forward, so an
    // end at the first sample is a trajectory that has not run: the step
    // ends on the half of the last one.
    const { locations } = trajectory
    const halfway =
      ((locations?.[0] ?? 0) + (locations?.[locations.length - 1] ?? 0)) / 2
    const isAtEnd = () => {
      const executed = this.executedTrajectory
      return (
        executed?.state.kind === "END_OF_TRAJECTORY" &&
        executed.location >= halfway
      )
    }

    // The move is on its way once NOVA reports it as running. A short step
    // can be over before the stream showed that: then it shows its end.
    await when(() => this.isTrajectoryRunning || isAtEnd(), { signal })

    await this.waitUntilStopped(signal)
  }

  /**
   * Resolve once NOVA no longer runs a trajectory and the robot stands
   * still: at the end of the trajectory, or after a pause
   */
  private async waitUntilStopped(signal: AbortSignal) {
    await when(
      () =>
        !this.isTrajectoryRunning &&
        this.motionStream.rapidlyChangingMotionState.standstill,
      { signal },
    )
  }

  /** The trajectory that NOVA executes now, as the motion stream reports it */
  private get executedTrajectory() {
    const details =
      this.motionStream.rapidlyChangingMotionState.execute?.details
    return details?.kind === "TRAJECTORY" ? details : undefined
  }

  /** Whether NOVA moves the robot along a trajectory, or is about to */
  private get isTrajectoryRunning() {
    const state = this.executedTrajectory?.state.kind
    return state === "RUNNING" || state === "WAIT_FOR_IO"
  }
}

export default JoggerConnection
