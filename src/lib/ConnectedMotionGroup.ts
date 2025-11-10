import {
  tryParseJson,
  type AutoReconnectingWebsocket,
} from "@wandelbots/nova-js"
import type {
  DHParameter,
  MotionGroupDescription,
  MotionGroupState,
  NovaClient,
  OperationMode,
  RobotControllerState,
  SafetyStateType,
} from "@wandelbots/nova-js/v2"
import { makeAutoObservable, runInAction } from "mobx"
import * as THREE from "three"
import type { Vector3Simple } from "./JoggerConnection"
import { jointValuesEqual, tcpMotionEqual } from "./motionStateUpdate"

const MOTION_DELTA_THRESHOLD = 0.0001

export type RobotTcpLike = {
  id: string
  readable_name: string
  position: Vector3Simple
  orientation: Vector3Simple
}

export type MotionGroupOption = {
  selectionId: string
}

const EMPTY_DH_PARAMETER: DHParameter = {
  a: 0,
  d: 0,
  alpha: 0,
  theta: 0,
  reverse_rotation_direction: false,
}

/**
 * Store representing the current state of a connected motion group.
 * API v2 version, not used yet in the components.
 */
export class ConnectedMotionGroup {
  static async connectMultiple(nova: NovaClient, motionGroupIds: string[]) {
    return Promise.all(
      motionGroupIds.map((motionGroupId) =>
        ConnectedMotionGroup.connect(nova, motionGroupId),
      ),
    )
  }

  static async connect(nova: NovaClient, motionGroupId: string) {
    const [_motionGroupIndex, controllerId] = motionGroupId.split("@") as [
      string,
      string,
    ]

    const controller =
      await nova.api.controller.getCurrentRobotControllerState(controllerId)
    const motionGroup = controller?.motion_groups.find(
      (mg) => mg.motion_group === motionGroupId,
    )
    if (!controller || !motionGroup) {
      throw new Error(
        `Controller ${controllerId} or motion group ${motionGroupId} not found`,
      )
    }

    const motionStateSocket = nova.openReconnectingWebsocket(
      `/controllers/${controllerId}/motion-groups/${motionGroupId}/state-stream`,
    )

    // Wait for the first message to get the initial state
    const firstMessage = await motionStateSocket.firstMessage()
    const initialMotionState = tryParseJson(firstMessage.data)
      ?.result as MotionGroupState

    if (!initialMotionState) {
      throw new Error(
        `Unable to parse initial motion state message ${firstMessage.data}`,
      )
    }

    console.log(
      `Connected motion state websocket to motion group ${motionGroup.motion_group}. Initial state:\n  `,
      initialMotionState,
    )

    // Check if robot is virtual or physical
    const config = await nova.api.controller.getRobotController(
      controller.controller,
    )
    const isVirtual = config.configuration.kind === "VirtualController"

    // If there's a configured mounting, we need it to show the right
    // position of the robot model
    const description = await nova.api.motionGroup.getMotionGroupDescription(
      controllerId,
      motionGroup.motion_group,
    )

    // Find out what TCPs this motion group has (we need it for jogging)
    // There are converted into a RobotTcpLike for easier use in the UI
    const tcps: RobotTcpLike[] = Object.entries(description.tcps || {}).map(
      ([id, tcp]) => ({
        id,
        readable_name: tcp.name,
        position: tcp.pose.position as Vector3Simple,
        orientation: tcp.pose.orientation as Vector3Simple,
      }),
    )

    // Open the websocket to monitor controller state for e.g. e-stop
    const controllerStateSocket = nova.openReconnectingWebsocket(
      `/controllers/${controller.controller}/state-stream?response_rate=1000`,
    )

    // Wait for the first message to get the initial state
    const firstControllerMessage = await controllerStateSocket.firstMessage()
    const initialControllerState = tryParseJson(firstControllerMessage.data)
      ?.result as RobotControllerState

    if (!initialControllerState) {
      throw new Error(
        `Unable to parse initial controller state message ${firstControllerMessage.data}`,
      )
    }

    console.log(
      `Connected controller state websocket to controller ${controller.controller}. Initial state:\n  `,
      initialControllerState,
    )

    return new ConnectedMotionGroup(
      nova,
      controller,
      motionGroup,
      initialMotionState,
      motionStateSocket,
      isVirtual,
      tcps,
      description,
      initialControllerState,
      controllerStateSocket,
    )
  }

  connectedJoggingSocket: WebSocket | null = null
  // biome-ignore lint/suspicious/noExplicitAny: legacy code
  planData: any | null // tmp
  joggingVelocity: number = 10

  // Not mobx-observable as this changes very fast; should be observed
  // using animation frames
  rapidlyChangingMotionState: MotionGroupState

  // Response rate on the websocket should be a bit slower on this one since
  // we don't use the motion data
  controllerState: RobotControllerState

  /**
   * Reflects activation state of the motion group / robot servos. The
   * movement controls in the UI should only be enabled in the "active" state
   */
  activationState: "inactive" | "activating" | "deactivating" | "active" =
    "inactive"

  constructor(
    readonly nova: NovaClient,
    readonly controller: RobotControllerState,
    readonly motionGroup: MotionGroupState,
    readonly initialMotionState: MotionGroupState,
    readonly motionStateSocket: AutoReconnectingWebsocket,
    readonly isVirtual: boolean,
    readonly tcps: RobotTcpLike[],
    readonly description: MotionGroupDescription,
    readonly initialControllerState: RobotControllerState,
    readonly controllerStateSocket: AutoReconnectingWebsocket,
  ) {
    this.rapidlyChangingMotionState = initialMotionState
    this.controllerState = initialControllerState

    // Track controller state updates (e.g. safety state and operation mode)
    controllerStateSocket.addEventListener("message", (event) => {
      const data = tryParseJson(event.data)?.result

      if (!data) {
        return
      }

      runInAction(() => {
        this.controllerState = data
      })
    })

    motionStateSocket.addEventListener("message", (event) => {
      const latestMotionState = tryParseJson(event.data)?.result as
        | MotionGroupState
        | undefined

      if (!latestMotionState) {
        throw new Error(
          `Failed to get motion state for ${this.motionGroupId}: ${event.data}`,
        )
      }

      // handle joint position changes
      if (
        !jointValuesEqual(
          this.rapidlyChangingMotionState.joint_position,
          latestMotionState.joint_position,
          MOTION_DELTA_THRESHOLD,
        )
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.joint_position =
            latestMotionState.joint_position
        })
      }

      // handle tcp pose changes
      if (
        !tcpMotionEqual(
          this.rapidlyChangingMotionState,
          latestMotionState,
          MOTION_DELTA_THRESHOLD,
        )
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.tcp_pose = latestMotionState.tcp_pose
        })
      }

      // handle standstill changes
      if (
        this.rapidlyChangingMotionState.standstill !==
        latestMotionState.standstill
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.standstill =
            latestMotionState.standstill
        })
      }
    })
    makeAutoObservable(this)
  }

  get motionGroupId() {
    return this.motionGroup.motion_group
  }

  get controllerId() {
    return this.controller.controller
  }

  get modelFromController() {
    return this.description.motion_group_model
  }

  get wandelscriptIdentifier() {
    const num = this.motionGroupId.split("@")[0]
    return `${this.controllerId.replace(/-/g, "_")}_${num}`
  }

  /** Jogging velocity in radians for rotation and joint movement */
  get joggingVelocityRads() {
    return (this.joggingVelocity * Math.PI) / 180
  }

  get joints() {
    return this.initialMotionState.joint_position.map((_, i) => {
      return {
        index: i,
      }
    })
  }

  // Please note that API v2 omits 0 values
  get dhParameters() {
    if (this.description.dh_parameters === undefined) {
      return undefined
    }

    return this.description.dh_parameters.map((dh_param) => ({
      ...EMPTY_DH_PARAMETER,
      ...dh_param,
    }))
  }

  get safetyZones() {
    return this.description.safety_zones
  }

  /** Gets the robot mounting position offset in 3D viz coordinates */
  get mountingPosition(): [number, number, number] {
    if (!this.description.mounting) {
      return [0, 0, 0]
    }

    return [
      (this.description.mounting.position?.[0] || 0) / 1000,
      (this.description.mounting.position?.[1] || 0) / 1000,
      (this.description.mounting.position?.[2] || 0) / 1000,
    ]
  }

  /** Gets the robot mounting position rotation in 3D viz coordinates */
  get mountingQuaternion() {
    const rotationVector = new THREE.Vector3(
      this.description.mounting?.orientation?.[0] || 0,
      this.description.mounting?.orientation?.[1] || 0,
      this.description.mounting?.orientation?.[2] || 0,
    )

    const magnitude = rotationVector.length()
    const axis = rotationVector.normalize()

    return new THREE.Quaternion().setFromAxisAngle(axis, magnitude)
  }

  /**
   * Whether the controller is currently in a safety state
   * corresponding to an emergency stop
   */
  get isEstopActive() {
    const estopStates: SafetyStateType[] = [
      "SAFETY_STATE_ROBOT_EMERGENCY_STOP",
      "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    ]

    return estopStates.includes(this.controllerState.safety_state)
  }

  /**
   * Whether the controller is in a safety state
   * that may be non-functional for robot pad purposes
   */
  get isMoveableSafetyState() {
    const goodSafetyStates: SafetyStateType[] = [
      "SAFETY_STATE_NORMAL",
      "SAFETY_STATE_REDUCED",
    ]

    return goodSafetyStates.includes(this.controllerState.safety_state)
  }

  /**
   * Whether the controller is in an operation mode that allows movement
   */
  get isMoveableOperationMode() {
    const goodOperationModes: OperationMode[] = [
      "OPERATION_MODE_AUTO",
      "OPERATION_MODE_MANUAL",
      "OPERATION_MODE_MANUAL_T1",
      "OPERATION_MODE_MANUAL_T2",
    ]

    return goodOperationModes.includes(this.controllerState.operation_mode)
  }

  /**
   * Whether the robot is currently active and can be moved, based on the
   * safety state, operation mode and servo toggle activation state.
   */
  get canBeMoved() {
    return (
      this.isMoveableSafetyState &&
      this.isMoveableOperationMode &&
      this.activationState === "active"
    )
  }

  async deactivate() {
    if (this.activationState !== "active") {
      console.error("Tried to deactivate while already deactivating")
      return
    }

    runInAction(() => {
      this.activationState = "deactivating"
    })

    try {
      await this.nova.api.controller.setDefaultMode(
        this.controllerId,
        "ROBOT_SYSTEM_MODE_MONITOR",
      )

      runInAction(() => {
        this.activationState = "inactive"
      })
    } catch (err) {
      runInAction(() => {
        this.activationState = "active"
      })
      throw err
    }
  }

  async activate() {
    if (this.activationState !== "inactive") {
      console.error("Tried to activate while already activating")
      return
    }

    runInAction(() => {
      this.activationState = "activating"
    })

    try {
      await this.nova.api.controller.setDefaultMode(
        this.controllerId,
        "ROBOT_SYSTEM_MODE_CONTROL",
      )

      runInAction(() => {
        this.activationState = "active"
      })
    } catch (err) {
      runInAction(() => {
        this.activationState = "inactive"
      })
      throw err
    }
  }

  toggleActivation() {
    if (this.activationState === "inactive") {
      this.activate()
    } else if (this.activationState === "active") {
      this.deactivate()
    }
  }

  dispose() {
    this.motionStateSocket.close()
    if (this.connectedJoggingSocket) this.connectedJoggingSocket.close()
  }

  setJoggingVelocity(velocity: number) {
    this.joggingVelocity = velocity
  }
}
