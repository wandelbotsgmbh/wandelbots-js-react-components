import type { Nova } from "@wandelbots/nova-js/v2"
import { makeErrorMessage } from "@wandelbots/nova-js"
import { makeAutoObservable, when } from "mobx"
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

/** A mode change on its way to the controller */
type ModeChange = "activating" | "deactivating"

/**
 * How long a mode change waits for the controller to report the new mode.
 * NOVA accepts a request that the controller does not follow, e.g. in manual
 * operation mode without the confirmation at its panel: the change is over
 * then, and can be asked for again. A controller that confirms later is
 * followed all the same.
 */
export const MODE_CHANGE_TIMEOUT_MS = 30_000

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
  /**
   * The mode change that was asked for and that the controller has not
   * reported yet
   */
  private pending: ModeChange | null = null

  /** Ends the wait of the pending mode change */
  private endPending: (() => void) | undefined

  constructor(
    private readonly nova: Nova,
    private readonly ids: { cellId: string; controllerId: string },
    private readonly live: RobotLiveState,
    private readonly safety: () => RobotSafety,
    private readonly logger: ConnectionLogger,
    /**
     * Hands back what holds the controller in control mode (a planned
     * move's execution session): until then, it does not leave it
     */
    private readonly releaseControl: () => Promise<void> = async () => {},
  ) {
    makeAutoObservable<
      this,
      | "nova"
      | "ids"
      | "live"
      | "safety"
      | "logger"
      | "releaseControl"
      | "endPending"
    >(
      this,
      {
        nova: false,
        ids: false,
        live: false,
        safety: false,
        logger: false,
        releaseControl: false,
        endPending: false,
      },
      { autoBind: true },
    )
  }

  /**
   * What the controller reports, or null while its live state does not
   * come: the mode cannot be confirmed then
   */
  private get reported(): "active" | "inactive" | null {
    if (this.live.connectionQuality === "critical") {
      return null
    }
    return this.live.controllerState.mode === "MODE_CONTROL"
      ? "active"
      : "inactive"
  }

  /**
   * The mode change in progress, else what the controller reports. The
   * controller's mode is the source of truth: without a mode change, the
   * state is derived from the live state and nothing else, so it cannot
   * drift from it. Inactive while the live state does not come.
   */
  get state(): RobotActivationState {
    return this.pending ?? this.reported ?? "inactive"
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

    await this.changeMode("activating", () =>
      this.setMode("ROBOT_SYSTEM_MODE_CONTROL"),
    )
  }

  /**
   * Switches the controller to monitor mode, after handing back a planned
   * move, which holds it in control mode. Rejects with a
   * {@link RobotModeChangeError} when NOVA refuses it.
   */
  async deactivate() {
    if (this.state !== "active") {
      this.logger.warn("Tried to deactivate while already deactivating")
      return
    }

    await this.changeMode("deactivating", async () => {
      // Else the controller stays in control mode, and the activation would
      // wait for monitor mode in vain
      await this.releaseControl()
      await this.setMode("ROBOT_SYSTEM_MODE_MONITOR")
    })
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
    this.endPending?.()
  }

  /**
   * Shows a mode change until it is over: the controller reports the mode
   * that was asked for, the request fails, or the controller has not
   * confirmed it after {@link MODE_CHANGE_TIMEOUT_MS}. Then the state is
   * what the controller reports again, and the change can be asked for
   * again.
   */
  private async changeMode(change: ModeChange, request: () => Promise<void>) {
    const confirmed = change === "activating" ? "active" : "inactive"
    let stopWatching = () => {}
    let timer: ReturnType<typeof setTimeout> | undefined
    // Only while this change is the pending one: a request that fails after
    // its wait is over must not end the next change
    const end = () => {
      if (this.endPending !== end) return
      this.endPending = undefined
      stopWatching()
      clearTimeout(timer)
      this.setPending(null)
    }

    this.endPending?.()
    this.endPending = end
    this.setPending(change)
    timer = setTimeout(end, MODE_CHANGE_TIMEOUT_MS)
    stopWatching = when(() => this.reported === confirmed, end)

    try {
      await request()
    } catch (err) {
      end()
      throw err
    }
  }

  private setPending(change: ModeChange | null) {
    this.pending = change
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
