import { makeAutoObservable } from "mobx"
import type { RobotActivationState } from "./RobotActivation"
import type { RobotLiveState } from "./RobotLiveState"

// From RobotPad's ActiveRobotStore and RobotPadStore.reasonNotMoveable

/**
 * Why a robot cannot move now, as a code an app can translate. `value` is the
 * controller's state behind it.
 */
export type RobotNotMoveableReason =
  /** The live state stopped coming */
  | { code: "disconnected" }
  /** The safety state does not allow movement, e.g. an emergency stop */
  | { code: "safety_state"; value: string }
  /** The operation mode does not allow movement */
  | { code: "operation_mode"; value: string }
  /** The robot is not activated (the controller is not in control mode) */
  | { code: "deactivated" }

const ESTOP_SAFETY_STATES = [
  "SAFETY_STATE_ROBOT_EMERGENCY_STOP",
  "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
]

const MOVEABLE_SAFETY_STATES = ["SAFETY_STATE_NORMAL", "SAFETY_STATE_REDUCED"]

/** Stop states that still allow switching to control mode (RPS-1296) */
const ACTIVATABLE_STOP_STATES = [
  "SAFETY_STATE_STOP",
  "SAFETY_STATE_STOP_0",
  "SAFETY_STATE_STOP_1",
  "SAFETY_STATE_STOP_2",
]

const MOVEABLE_OPERATION_MODES = [
  "OPERATION_MODE_AUTO",
  "OPERATION_MODE_MANUAL",
  "OPERATION_MODE_MANUAL_T1",
  "OPERATION_MODE_MANUAL_T2",
]

/**
 * Whether a robot may be activated and moved, from its controller's safety
 * state and operation mode, its activation and its connection
 */
export class RobotSafety {
  /** @internal The session makes it, see RobotSession */
  constructor(
    private readonly state: RobotLiveState,
    private readonly activationState: () => RobotActivationState,
  ) {
    makeAutoObservable<this, "state" | "activationState">(
      this,
      { state: false, activationState: false },
      { autoBind: true },
    )
  }

  private get safetyState() {
    return this.state.controllerState.safety_state
  }

  private get operationMode() {
    return this.state.controllerState.operation_mode
  }

  /** Whether an emergency stop is active */
  get isEstopActive() {
    return ESTOP_SAFETY_STATES.includes(this.safetyState)
  }

  /** Whether the safety state allows movement */
  get isMoveableSafetyState() {
    return MOVEABLE_SAFETY_STATES.includes(this.safetyState)
  }

  /** Whether the operation mode allows movement */
  get isMoveableOperationMode() {
    return MOVEABLE_OPERATION_MODES.includes(this.operationMode)
  }

  /**
   * Whether the safety state allows switching to control mode: the moveable
   * ones and the stop states (RPS-1296)
   */
  get isActivatableSafetyState() {
    return (
      this.isMoveableSafetyState ||
      ACTIVATABLE_STOP_STATES.includes(this.safetyState)
    )
  }

  /**
   * Why the controller cannot be switched to control mode now, or null. NOVA
   * refuses the mode change then (an emergency stop needs a hand on the
   * physical controller), so it is not even requested.
   */
  get activationBlockedReason(): string | null {
    if (this.isEstopActive) {
      return `an emergency stop is active (${this.safetyState})`
    }
    if (!this.isActivatableSafetyState) {
      return `the safety state is ${this.safetyState}`
    }
    if (!this.isMoveableOperationMode) {
      return `the operation mode is ${this.operationMode}`
    }
    return null
  }

  /** Whether the robot may be activated now */
  get canBeActive() {
    return this.activationBlockedReason === null
  }

  /** Why the robot cannot move now, or null when it can */
  get notMoveableReason(): RobotNotMoveableReason | null {
    if (this.state.connectionQuality === "critical") {
      return { code: "disconnected" }
    }
    if (!this.isMoveableSafetyState) {
      return { code: "safety_state", value: this.safetyState }
    }
    if (!this.isMoveableOperationMode) {
      return { code: "operation_mode", value: this.operationMode }
    }
    if (this.activationState() === "inactive") {
      return { code: "deactivated" }
    }
    return null
  }

  /**
   * Whether the robot can move now: a moveable safety state and operation
   * mode, activated, and its live state coming
   */
  get canBeMoved() {
    return (
      this.isMoveableSafetyState &&
      this.isMoveableOperationMode &&
      this.activationState() === "active" &&
      this.state.connectionQuality !== "critical"
    )
  }
}
