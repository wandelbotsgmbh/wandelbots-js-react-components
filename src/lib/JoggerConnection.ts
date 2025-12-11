import {
  type AutoReconnectingWebsocket,
  tryParseJson,
  XYZ_TO_VECTOR,
} from "@wandelbots/nova-js"
import type {
  InitializeMovementResponse,
  MotionCommand,
  NovaClient,
  Pose,
  StartMovementResponse,
} from "@wandelbots/nova-js/v2"
import { when } from "mobx"
import { Vector3 } from "three/src/math/Vector3.js"
import { MotionStreamConnection } from "./MotionStreamConnection"

export type Vector3Simple = [number, number, number]

const API_ERROR_CONNECTION_BLOCKED = `Movement request rejected. Another client is currently executing a 'Jogging' motion!`

export type JoggerConnectionOptions = {
  // The mode of the jogger connection - see type description of JoggerMode for details
  mode?: JoggerMode

  // Connection timeout in milliseconds to wait for jogging initialization to complete
  timeout?: number

  /**
   * When an error message is received from the jogging websocket, it
   * will be passed here. If this handler is not provided, the error will
   * instead be thrown as an unhandled error.
   */
  onError?: (err: unknown) => void

  // The TCP to use for jogging motions.
  tcp?: string

  // The coordinate system in which jogging takes place in
  // coordinateSystem?: string,

  // If set to "tool", jogging TcpVelocityRequest will use `use_tool_coordinate_system` option
  orientation?: JoggerOrientation
}

// Three modes are supported:
// - "jogging": Continuous jogging mode, where joint velocities or TCP velocities can be commanded. Opens a single websocket connection to jogging endpoint
// - "trajectory": Incremental jogging mode, where fixed distance motions are planned and executed. Opens a short lived websocket for each motion.
// - "off": No jogging, all websockets are closed.
export type JoggerMode = "jogging" | "trajectory" | "off"

// If set to "tool", will use `use_tool_coordinate_system` option in movement requests
export type JoggerOrientation = "coordsys" | "tool"

export class JoggerConnection {
  ENDPOINT_JOGGING = "/execution/jogging"
  ENDPOINT_TRAJECTORY = "/execution/trajectory"
  DEFAULT_MODE = "off" as JoggerMode
  DEFAULT_TCP = "Flange"
  // DEFAULT_COORDINATE_SYSTEM = "world"
  DEFAULT_INIT_TIMEOUT = 5000
  DEFAULT_ORIENTATION = "coordsys" as JoggerOrientation

  mode: JoggerMode = "off"
  joggingSocket: AutoReconnectingWebsocket | null = null
  trajectorySocket: AutoReconnectingWebsocket | null = null
  timeout: number = this.DEFAULT_INIT_TIMEOUT
  tcp: string
  // coordinateSystem?: string
  orientation: JoggerOrientation
  onError?: (err: unknown) => void
  onBlocked?: () => void

  /**
   * Initialize the jogging connection using jogging endpoint or trajectory endpoint depending on the selected mode.
   *
   * @param nova - The Nova client instance
   * @param motionGroupId - The ID of the motion group to connect to
   * @param options - Configuration options for the jogger connection
   * @param options.mode - The jogging mode to initialize:
   *   - "jogging": Continuous jogging mode with persistent websocket for real-time velocity commands
   *   - "trajectory": Incremental jogging mode for fixed-distance motions via trajectory planning
   *   - "off": No jogging enabled, all websockets closed (default)
   * @param options.timeout - Timeout in milliseconds for websocket initialization (default: 5000ms)
   * @param options.tcp - TCP frame to use for motions (default: from motion group)
   * //param options.coordinateSystem - Coordinate system for jogging commands (default: "world"). Please note: Currently not implemented
   * @param options.orientation - If set to "tool", jogging TcpVelocityRequest will use `use_tool_coordinate_system` option (default: "coordsys")
   * @param options.onError - Error handler for websocket errors
   * @returns Promise resolving to initialized JoggerConnection instance
   */
  static async open(
    nova: NovaClient,
    motionGroupId: string,
    options: JoggerConnectionOptions = {},
  ) {
    // Get matching motion stream
    const motionStream = await MotionStreamConnection.open(nova, motionGroupId)

    // Initialize jogger with options
    const jogger = new JoggerConnection(motionStream, options)

    // Initialize the jogging websocket, if necessary (mode is "jogging")
    await jogger.setJoggingMode(jogger.mode)

    // Return the initialized jogger
    return jogger
  }

  constructor(
    readonly motionStream: MotionStreamConnection,
    readonly options: JoggerConnectionOptions | undefined = {},
  ) {
    this.tcp = options?.tcp || motionStream.motionGroup.tcp || this.DEFAULT_TCP
    // this.coordinateSystem = options?.coordinateSystem || this.DEFAULT_COORDINATE_SYSTEM
    this.orientation = options?.orientation || this.DEFAULT_ORIENTATION
    this.timeout = options?.timeout || this.DEFAULT_INIT_TIMEOUT
    this.mode = options?.mode || this.DEFAULT_MODE
    this.onError = options?.onError
  }

  // Set a new tcp or other options. If current mode is jogging, will reinitialize the jogging websocket
  async setOptions(options: Partial<JoggerConnectionOptions>) {
    if (options.tcp) {
      this.tcp = options.tcp
    }

    if (options.orientation) {
      this.orientation = options.orientation
    }

    // if (options.coordinateSystem) {
    //   this.coordinateSystem = options.coordinateSystem
    // }

    if (options.timeout) {
      this.timeout = options.timeout
    }

    if (options.mode) {
      this.mode = options.mode
    }

    if (options.onError) {
      this.onError = options.onError
    }

    this.setJoggingMode(this.mode, false)
  }

  get motionGroupId() {
    return this.motionStream.motionGroupId
  }

  get nova() {
    return this.motionStream.nova
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

  // Dispose the jogger, closing all open websockets
  async dispose() {
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
    this.dispose()

    // Set the new mode
    this.mode = mode

    // Mode is "jogging" - open jogging websocket
    if (this.mode === "jogging") {
      return this.initializeJoggingWebsocket()
    }

    // Mode is "trajectory" or "off" - nothing more to do
    return
  }

  // Initializes continuous jogging websocket, called by setJoggingMode("jogging")
  async initializeJoggingWebsocket() {
    // Wait for initialization with timeout
    return new Promise<void>((resolve, reject) => {
      const connectionFailedTimeout = setTimeout(() => {
        reject(
          new Error(
            `Jogging initialization timeout after ${this.timeout} seconds`,
          ),
        )
      }, this.timeout)

      this.joggingSocket = this.nova.openReconnectingWebsocket(
        this.ENDPOINT_JOGGING,
      )
      this.joggingSocket.addEventListener("message", (ev: MessageEvent) => {
        const data = tryParseJson(ev.data)

        if (data?.result?.kind === "INITIALIZE_RECEIVED") {
          clearTimeout(connectionFailedTimeout)
          resolve()
          return
        }

        if (data?.result?.kind === "MOTION_ERROR") {
          clearTimeout(connectionFailedTimeout)
          if (
            this.onBlocked &&
            data?.result?.message.includes(API_ERROR_CONNECTION_BLOCKED)
          ) {
            this.joggingSocket?.dispose()
            this.onBlocked()
            return
          } else if (this.onError) {
            this.onError(ev.data)
          } else {
            reject(new Error(ev.data))
          }
        }
      })

      this.joggingSocket.sendJson({
        message_type: "InitializeJoggingRequest",
        motion_group: this.motionGroupId,
        tcp: this.tcp,
      })
    })
  }

  /**
   * Jogging: Start rotation of a single robot joint at the specified velocity
   */
  async rotateJoints({
    joint,
    direction,
    velocityRadsPerSec,
  }: {
    /** Index of the joint to rotate */
    joint: number
    /** Direction of rotation ("+" or "-") */
    direction: "+" | "-"
    /** Speed of the rotation in radians per second */
    velocityRadsPerSec: number
  }) {
    if (!this.joggingSocket || this.mode !== "jogging") {
      throw new Error(
        "Joint jogging websocket not connected; create one by setting jogging mode to 'jogging'",
      )
    }

    const velocity = new Array(this.numJoints).fill(0)

    velocity[joint] =
      direction === "-" ? -velocityRadsPerSec : velocityRadsPerSec

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
    const rotation = [0, 0, 0]
    const translation = [0, 0, 0]
    translation[XYZ_TO_VECTOR[axis]] =
      direction === "-" ? -velocityMmPerSec : velocityMmPerSec

    this.joggingSocket.sendJson({
      message_type: "TcpVelocityRequest",
      translation,
      rotation,
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
    const rotation = [0, 0, 0]
    const translation = [0, 0, 0]
    rotation[XYZ_TO_VECTOR[axis]] =
      direction === "-" ? -velocityRadsPerSec : velocityRadsPerSec

    this.joggingSocket.sendJson({
      message_type: "TcpVelocityRequest",
      translation,
      rotation,
    })
  }

  /**
   * Trajectory jogging:
   *
   * Move the robot by a fixed distance in a single cartesian
   * axis, either rotating or translating relative to the TCP.
   * Promise resolves only after the motion has completed.
   */
  async runIncrementalCartesianMotion({
    currentTcpPose,
    currentJoints,
    // coordSystemId,
    velocityInRelevantUnits,
    axis,
    direction,
    motion,
  }: {
    currentTcpPose: Pose
    currentJoints: Vector3Simple
    coordSystemId: string
    velocityInRelevantUnits: number
    axis: "x" | "y" | "z"
    direction: "-" | "+"
    motion:
      | {
          type: "rotate"
          distanceRads: number
        }
      | {
          type: "translate"
          distanceMm: number
        }
  }) {
    const commands: MotionCommand[] = []

    if (this.mode !== "trajectory") {
      throw new Error(
        "Set jogging mode to 'trajectory' to run incremental cartesian motions",
      )
    }

    if (motion.type === "translate") {
      if (!currentTcpPose.position) {
        throw new Error(
          "Current pose has no position, cannot perform translation",
        )
      }

      const targetTcpPosition = [...currentTcpPose.position]
      targetTcpPosition[XYZ_TO_VECTOR[axis]] +=
        motion.distanceMm * (direction === "-" ? -1 : 1)

      commands.push({
        limits_override: {
          tcp_velocity_limit: velocityInRelevantUnits,
        },
        path: {
          path_definition_name: "PathLine",
          target_pose: {
            position: targetTcpPosition,
            orientation: currentTcpPose.orientation,
          },
        },
      })
    } else if (motion.type === "rotate") {
      // Concatenate rotations expressed by rotation vectors
      // Equations taken from https://physics.stackexchange.com/a/287819

      if (!currentTcpPose.orientation) {
        throw new Error(
          "Current pose has no orientation, cannot perform rotation",
        )
      }

      // Compute axis and angle of current rotation vector
      const currentRotationVector = new Vector3(
        currentTcpPose.orientation[0],
        currentTcpPose.orientation[1],
        currentTcpPose.orientation[2],
      )

      const currentRotationRad = currentRotationVector.length()
      const currentRotationDirection = currentRotationVector.clone().normalize()

      // Compute axis and angle of difference rotation vector
      const differenceRotationRad =
        motion.distanceRads * (direction === "-" ? -1 : 1)

      const differenceRotationDirection = new Vector3(0.0, 0.0, 0.0)
      differenceRotationDirection[axis] = 1.0

      // Some abbreviations to make the following equations more readable
      const f1 =
        Math.cos(0.5 * differenceRotationRad) *
        Math.cos(0.5 * currentRotationRad)
      const f2 =
        Math.sin(0.5 * differenceRotationRad) *
        Math.sin(0.5 * currentRotationRad)
      const f3 =
        Math.sin(0.5 * differenceRotationRad) *
        Math.cos(0.5 * currentRotationRad)
      const f4 =
        Math.cos(0.5 * differenceRotationRad) *
        Math.sin(0.5 * currentRotationRad)

      const dotProduct = differenceRotationDirection.dot(
        currentRotationDirection,
      )

      const crossProduct = differenceRotationDirection
        .clone()
        .cross(currentRotationDirection)

      // Compute angle of concatenated rotation
      const newRotationRad = 2.0 * Math.acos(f1 - f2 * dotProduct)

      // Compute rotation vector of concatenated rotation
      const f5 = newRotationRad / Math.sin(0.5 * newRotationRad)

      const targetTcpOrientation = new Vector3()
        .addScaledVector(crossProduct, f2)
        .addScaledVector(differenceRotationDirection, f3)
        .addScaledVector(currentRotationDirection, f4)
        .multiplyScalar(f5)

      commands.push({
        limits_override: {
          tcp_orientation_velocity_limit: velocityInRelevantUnits,
        },
        path: {
          path_definition_name: "PathLine",
          target_pose: {
            position: currentTcpPose.position,
            orientation: [...targetTcpOrientation],
          },
        },
      })
    }

    // Plan the motion https://portal.wandelbots.io/docs/api/v2/ui/#/operations/planTrajectory
    const description = this.motionStream.description
    if (description.cycle_time === undefined) {
      console.warn(
        "Current motion group has no cycle time, cannot plan jogging motion",
      )
      return
    }

    const motion_group_setup = {
      motion_group_model: description.motion_group_model,
      cycle_time: description.cycle_time,
      mounting: description.mounting,

      // tcp_offset: description.tcp_offset, TODO: implement tcp_offset handling
      // FIXME use proper mode's limits if set
      global: description.operation_limits.auto_limits,
    }

    const motionPlanRes = await this.nova.api.trajectoryPlanning.planTrajectory(
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

    if (this.trajectorySocket) {
      console.warn("Trajectory jogging websocket already open; will close")
      this.trajectorySocket.dispose()
    }

    // Execute the planned motion https://portal.wandelbots.io/docs/api/v2/ui/#/operations/executeTrajectory
    this.trajectorySocket = this.nova.openReconnectingWebsocket(
      this.ENDPOINT_TRAJECTORY,
    )

    const messageInitializeMovementResponse = (
      result: InitializeMovementResponse | undefined,
    ) => {
      // Handle errorous response
      if (!result || result.add_trajectory_error || result.message) {
        if (this.onError) {
          this.onError(result)
        } else {
          throw new Error(
            result?.add_trajectory_error?.message ||
              result?.message ||
              "Failed to execute trajectory, unknown error",
          )
        }
      }

      // Handle socket gone
      if (!this.trajectorySocket) {
        throw new Error(
          `Failed to execute trajectory, websocket not available anymore`,
        )
      }

      // Trajectory locked, now start movement
      this.trajectorySocket.sendJson({
        message_type: "StartMovementRequest",
        direction: "DIRECTION_FORWARD",
      })
    }

    const waitForMovementToStartAndFinish = async () => {
      // Wait for robot to start moving (standstill becomes false)
      await when(() => !this.motionStream.rapidlyChangingMotionState.standstill)

      // Then wait for robot to stop moving (standstill becomes true)
      await when(() => this.motionStream.rapidlyChangingMotionState.standstill)

      // Close connection and free robot
      this.trajectorySocket?.dispose()
      this.trajectorySocket = null
    }

    const waitForMovementToFinish = async () => {
      // Wait for robot to stop moving (standstill becomes true)
      await when(() => this.motionStream.rapidlyChangingMotionState.standstill)

      // Close connection and free robot
      this.trajectorySocket?.dispose()
      this.trajectorySocket = null
    }

    const messageStartMovementResponse = async (
      data: StartMovementResponse,
    ) => {
      if (data?.message) {
        if (this.onError) {
          this.onError(data)
          return
        } else {
          throw new Error(
            data.message || "Failed to execute trajectory, unknown error",
          )
        }
      }

      // Movement started we now wait to verify the robot is moving
      // by observing changes to motion state
      if (this.motionStream.rapidlyChangingMotionState.standstill) {
        await waitForMovementToStartAndFinish()
      } else {
        await waitForMovementToFinish()
      }
    }

    this.trajectorySocket.addEventListener("message", (ev: MessageEvent) => {
      const data = tryParseJson(ev.data)

      if (!data?.result?.kind) {
        throw new Error(
          `Failed to execute trajectory: Received invalid message ${ev.data}`,
        )
      }

      if (
        this.onBlocked &&
        data.result.message?.includes(API_ERROR_CONNECTION_BLOCKED)
      ) {
        this.onBlocked()
        return
      }

      if (data.result.kind === "INITIALIZE_RECEIVED") {
        messageInitializeMovementResponse(data.result)
      } else if (data.result.kind === "START_RECEIVED") {
        messageStartMovementResponse(data)
      } else if (data.result.kind === "PAUSE_RECEIVED") {
        // do nothing
      } else if (data.result.kind === "MOTION_ERROR" && data.result.message) {
        if (this.onError) {
          this.onError(data)
          return
        } else {
          throw new Error(data.result.message)
        }
      } else {
        throw new Error(
          `Failed to execute trajectory, cannot handle message type "${data.result.kind}"`,
        )
      }
    })

    // Send initialization/movement request
    this.trajectorySocket.sendJson({
      message_type: "InitializeMovementRequest",
      trajectory: {
        message_type: "TrajectoryData",
        motion_group: this.motionGroupId,
        data: trajectoryData,
        tcp: this.tcp,
      },
    })
  }
}
