import type { Nova } from "@wandelbots/nova-js/v2"
import { makeErrorMessage } from "@wandelbots/nova-js"
import { makeAutoObservable, reaction, runInAction } from "mobx"
import type { ConnectionLogger } from "../connectionLogger"
import type { RobotLiveState } from "./RobotLiveState"
import type { RobotSafety } from "./RobotSafety"

// From RobotPad's ActiveRobotStore

/**
 * Whether the robot is activated, i.e. its controller is in control mode
 * (MODE_CONTROL) rather than monitor mode
 */
export type RobotActivationState =
  | "inactive"
  | "activating"
  | "deactivating"
  | "active"

type ControllerMode = "ROBOT_SYSTEM_MODE_CONTROL" | "ROBOT_SYSTEM_MODE_MONITOR"

/** A mode change that NOVA refused or that failed; `url` is the request's */
export class RobotModeChangeError extends Error {
  /** @internal The session makes it, see RobotSession */
  constructor(
    message: string,
    readonly url: string,
    readonly cause: unknown,
  ) {
    super(message)
    this.name = "RobotModeChangeError"
  }
}

/**
 * The robot's activation: it follows the mode that the controller reports,
 * and switches the mode on request
 */
export class RobotActivation {
  /** What the controller reports, or the mode change in progress */
  state: RobotActivationState = "inactive"

  private readonly disposers: (() => void)[] = []

  constructor(
    private readonly nova: Nova,
    private readonly ids: { cellId: string; controllerId: string },
    private readonly live: RobotLiveState,
    private readonly safety: () => RobotSafety,
    private readonly logger: ConnectionLogger,
  ) {
    if (live.controllerState.mode === "MODE_CONTROL") {
      this.state = "active"
    }

    makeAutoObservable<
      this,
      "nova" | "ids" | "live" | "safety" | "logger" | "disposers"
    >(
      this,
      {
        nova: false,
        ids: false,
        live: false,
        safety: false,
        logger: false,
        disposers: false,
      },
      { autoBind: true },
    )

    // The controller's mode is the source of truth: the activation shows what
    // NOVA reports
    this.disposers.push(
      reaction(
        () => this.live.controllerState.mode,
        (mode) => {
          this.state = mode === "MODE_CONTROL" ? "active" : "inactive"
        },
      ),
    )

    // Without the live state the mode cannot be confirmed
    this.disposers.push(
      reaction(
        () => this.live.connectionQuality,
        (quality) => {
          if (quality === "critical") {
            this.state = "inactive"
          }
        },
      ),
    )
  }

  /**
   * Switches the controller to control mode. Does nothing while a mode change
   * is in progress, or when the safety state or operation mode would make
   * NOVA refuse it (see {@link RobotSafety.activationBlockedReason}). Rejects
   * with a {@link RobotModeChangeError} when NOVA refuses it.
   */
  async activate() {
    if (this.state !== "inactive") {
      this.logger.warn("Tried to activate while already activating")
      return
    }

    const blockedReason = this.safety().activationBlockedReason
    if (blockedReason) {
      this.logger.warn(
        `Not enabling control mode for controller "${this.ids.controllerId}" because ${blockedReason}`,
      )
      return
    }

    this.state = "activating"
    try {
      await this.setMode("ROBOT_SYSTEM_MODE_CONTROL")
      // A reaction only fires on a change: the mode may be reported already
      runInAction(() => {
        if (this.live.controllerState.mode === "MODE_CONTROL") {
          this.state = "active"
        }
      })
    } catch (err) {
      runInAction(() => {
        this.state = "inactive"
      })
      throw err
    }
  }

  /**
   * Switches the controller to monitor mode. Rejects with a
   * {@link RobotModeChangeError} when NOVA refuses it.
   */
  async deactivate() {
    if (this.state !== "active") {
      this.logger.warn("Tried to deactivate while already deactivating")
      return
    }

    this.state = "deactivating"
    try {
      await this.setMode("ROBOT_SYSTEM_MODE_MONITOR")
      runInAction(() => {
        if (this.live.controllerState.mode !== "MODE_CONTROL") {
          this.state = "inactive"
        }
      })
    } catch (err) {
      runInAction(() => {
        this.state = "active"
      })
      throw err
    }
  }

  /** Activates an inactive robot, deactivates an active one */
  async toggle() {
    if (this.state === "inactive") {
      await this.activate()
    } else if (this.state === "active") {
      await this.deactivate()
    }
  }

  dispose() {
    for (const dispose of this.disposers) {
      dispose()
    }
  }

  private async setMode(mode: ControllerMode) {
    const { cellId, controllerId } = this.ids
    try {
      await this.nova.api.controller.setDefaultMode(cellId, controllerId, mode)
    } catch (err) {
      const url =
        (typeof err === "object" &&
        err !== null &&
        "url" in err &&
        typeof err.url === "string"
          ? err.url
          : undefined) ?? `/cells/${cellId}/controllers/${controllerId}/mode`
      throw new RobotModeChangeError(
        `Failed to set controller "${controllerId}" to ${mode}: ${makeErrorMessage(err)}`,
        url,
        err,
      )
    }
  }
}
