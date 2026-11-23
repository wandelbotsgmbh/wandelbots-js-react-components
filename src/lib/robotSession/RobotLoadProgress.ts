// Ported from RobotPad (src/robotLoad/RobotLoadProgress.ts); the step labels
// are the app's, see ROBOT_LOAD_STEP_IDS

import { makeAutoObservable } from "mobx"

/**
 * Delays before each automatic retry of a failed robot load. A robot that was
 * just powered up or a controller that is still initializing usually recovers
 * within a few seconds, so we retry quietly before bothering the user.
 */
export const AUTO_RETRY_DELAYS_MS = [1000, 2000]

/**
 * The distinct pieces of data an app needs before it can show and control a
 * robot, in the order they are loaded. Kept explicit (rather than implicit in
 * the await chain of the load) so the UI can tell the user
 * how far the load got and which piece failed.
 */
export const ROBOT_LOAD_STEP_IDS = [
  "motionGroupDescription",
  "controllerConfiguration",
  "kinematicModel",
  "motionGroupModel",
  "coordinateSystems",
  "controllerState",
  "motionStateStream",
  "controllerStateStream",
] as const

export type RobotLoadStepId = (typeof ROBOT_LOAD_STEP_IDS)[number]

export type RobotLoadStepStatus = "pending" | "running" | "succeeded" | "failed"

export type RobotLoadStep = {
  id: RobotLoadStepId
  status: RobotLoadStepStatus
  /** Endpoint the step talks to; shown to the user and included in support details */
  url: string | null
  error: unknown
}

/**
 * Error thrown by a load step, carrying the step it belongs to so the caller
 * can tell a transient connection problem (worth retrying) apart from a
 * programming error.
 */
export class RobotLoadStepError extends Error {
  constructor(
    readonly stepId: RobotLoadStepId,
    readonly cause: unknown,
    message: string,
  ) {
    super(message)
    this.name = "RobotLoadStepError"
  }
}

export function isRobotLoadStepError(err: unknown): err is RobotLoadStepError {
  return err instanceof RobotLoadStepError
}

/**
 * Observable progress of loading a single robot: which steps have completed,
 * which one is currently running, and which one failed. Drives both the
 * loading screen and the failure screen.
 */
export class RobotLoadProgress {
  /** The robot this progress refers to; null before any load has started */
  motionGroupId: string | null = null
  controllerId: string | null = null

  steps: RobotLoadStep[] = []

  /** 0 while on the first try, 1.. while auto-retrying */
  retryAttempt = 0

  /** Set when the load gave up; failure is also implied by a failed step */
  fatalError: unknown = null

  /** When the currently running step started, for the "still waiting" hint */
  currentStepStartedAt: number | null = null

  /**
   * One instance tracks one load. Concurrent loads must not share one — a load
   * that has been superseded keeps reporting for a step or two before it
   * notices, and those reports would otherwise overwrite the state of the load
   * that replaced it (clearing a recorded failure, for instance).
   */
  constructor(
    motionGroupId: string | null = null,
    controllerId: string | null = null,
  ) {
    this.motionGroupId = motionGroupId
    this.controllerId = controllerId
    this.steps = ROBOT_LOAD_STEP_IDS.map((id) => ({
      id,
      status: "pending" as const,
      url: null,
      error: null,
    }))

    makeAutoObservable(this, {}, { autoBind: true })
  }

  /** Reset the step states for another attempt at the same robot */
  beginRetry(attempt: number) {
    for (const step of this.steps) {
      step.status = "pending"
      step.url = null
      step.error = null
    }
    this.retryAttempt = attempt
    this.fatalError = null
    this.currentStepStartedAt = null
  }

  private stepById(id: RobotLoadStepId) {
    return this.steps.find((step) => step.id === id)
  }

  startStep(id: RobotLoadStepId, url: string | null) {
    const step = this.stepById(id)
    if (!step) return
    step.status = "running"
    step.url = url
    step.error = null
    this.currentStepStartedAt = Date.now()
  }

  updateStepUrl(id: RobotLoadStepId, url: string) {
    const step = this.stepById(id)
    if (!step) return
    step.url = url
  }

  succeedStep(id: RobotLoadStepId) {
    const step = this.stepById(id)
    if (!step) return
    step.status = "succeeded"
    this.currentStepStartedAt = null
  }

  failStep(id: RobotLoadStepId, error: unknown) {
    const step = this.stepById(id)
    if (!step) return
    step.status = "failed"
    step.error = error
    this.currentStepStartedAt = null
  }

  /** A failure that is not tied to a specific step (e.g. an invalid selection) */
  failWith(error: unknown) {
    this.fatalError = error
    this.currentStepStartedAt = null
  }

  get totalCount() {
    return this.steps.length
  }

  get succeededCount() {
    return this.steps.filter((step) => step.status === "succeeded").length
  }

  get runningStep(): RobotLoadStep | undefined {
    return this.steps.find((step) => step.status === "running")
  }

  get failedStep(): RobotLoadStep | undefined {
    return this.steps.find((step) => step.status === "failed")
  }

  get isFailed() {
    return this.fatalError !== null || this.failedStep !== undefined
  }

  get isComplete() {
    return (
      this.steps.length > 0 && this.steps.every((s) => s.status === "succeeded")
    )
  }
}
