import { makeErrorMessage } from "@wandelbots/nova-js"
import type { Nova } from "@wandelbots/nova-js/v2"
import { makeAutoObservable, runInAction } from "mobx"
import {
  type ControllerStateSource,
  controllerStateWebsocket,
} from "../controllerStateSource"
import {
  cellIdOf,
  createNovaClient,
  type NovaConnection,
} from "../novaConnection"
import { loadRobotResources } from "./loadRobotResources"
import {
  isRobotLoadStepError,
  RobotLoadProgress,
  type RobotLoadStepId,
} from "./RobotLoadProgress"
import { RobotSession, type RobotSessionOptions } from "./RobotSession"

// From RobotPad's RobotPadStore (selectMotionGroup)

/**
 * Delays before each automatic retry of a failed load. A robot that was just
 * powered up or a controller that is still starting usually recovers within
 * a few seconds, so the load retries quietly before it gives up.
 */
const DEFAULT_RETRY_DELAYS_MS = [1000, 2000]

/** Something worth an app's analytics during a load */
export type RobotSessionEvent = {
  type: "loadFailed"
  motionGroupId: string
  /** The load step that failed, or "unknown" for another failure */
  step: RobotLoadStepId | "unknown"
  message: string
  /** How many times the load was tried */
  attempts: number
}

/** What an app can give {@link loadRobotSession} */
export type LoadRobotSessionOptions = RobotSessionOptions & {
  /** The NOVA cell; defaults to the cell of an older nova-js client, or "cell" */
  cellId?: string
  /** The robot's controller; defaults to the part after "@" of the motion group id */
  controllerId?: string
  /**
   * Opens the source of the controller's live state. Defaults to NOVA's
   * websocket of the controller's state; `natsControllerStateSource` of
   * `/nats` is the alternative.
   */
  stateSource?: (options: {
    cellId: string
    controllerId: string
  }) => ControllerStateSource
  /** Gets events for analytics, e.g. a load that failed */
  onEvent?: (event: RobotSessionEvent) => void
  /** Delays before each automatic retry of a failed load step, in ms */
  retryDelaysMs?: number[]
  /** How long to wait for a stream's first message, in ms */
  socketTimeoutMs?: number
}

export type RobotSessionLoadState = "loading" | "ready" | "failed"

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * The load of a {@link RobotSession}: its state and progress, the session
 * once it is ready, retry after a failure, and dispose
 */
export class RobotSessionLoad {
  /** "loading" (also between automatic retries), "ready" or "failed" */
  state: RobotSessionLoadState = "loading"
  /** Which load steps are done, running or failed, for a loading screen */
  readonly progress: RobotLoadProgress
  /** The session, once it is ready */
  session: RobotSession | null = null
  /** Why the load failed */
  error: unknown = null

  private attempt = 0
  private disposed = false
  private readyPromise!: Promise<RobotSession>
  private settle!: {
    resolve: (session: RobotSession) => void
    reject: (error: unknown) => void
  }

  /** @internal Use {@link loadRobotSession} */
  constructor(
    private readonly nova: Nova,
    readonly motionGroupId: string,
    private readonly ids: { cellId: string; controllerId: string },
    private readonly options: LoadRobotSessionOptions,
  ) {
    this.progress = new RobotLoadProgress(motionGroupId, ids.controllerId)
    makeAutoObservable<
      this,
      | "nova"
      | "ids"
      | "options"
      | "attempt"
      | "disposed"
      | "readyPromise"
      | "settle"
    >(
      this,
      {
        nova: false,
        ids: false,
        options: false,
        attempt: false,
        disposed: false,
        readyPromise: false,
        settle: false,
        progress: false,
      },
      { autoBind: true },
    )
    this.start()
  }

  /**
   * Resolves with the session once it is ready; rejects when the load fails
   * or is disposed. After {@link RobotSessionLoad.retry}, a new promise for the new load.
   */
  get ready(): Promise<RobotSession> {
    return this.readyPromise
  }

  /** Loads the robot again after a failure */
  retry() {
    if (this.disposed || this.state !== "failed") return
    this.start()
  }

  /** Stops a running load and closes the session */
  dispose() {
    if (this.disposed) return
    this.disposed = true
    this.attempt++
    this.session?.dispose()
    this.session = null
    this.settle.reject(new Error("The robot session load was disposed"))
  }

  private start() {
    this.attempt++
    const attempt = this.attempt
    this.readyPromise = new Promise<RobotSession>((resolve, reject) => {
      this.settle = { resolve, reject }
    })
    // An app need not wait for the session: a failure it does not await must
    // not become an unhandled rejection
    this.readyPromise.catch(() => {})
    runInAction(() => {
      this.state = "loading"
      this.error = null
    })
    void this.run(attempt)
  }

  private isStale(attempt: number) {
    return this.disposed || attempt !== this.attempt
  }

  private async run(attempt: number) {
    const { cellId, controllerId } = this.ids
    const retryDelays = this.options.retryDelaysMs ?? DEFAULT_RETRY_DELAYS_MS
    const logger = this.options.logger ?? console
    const createStateSource =
      this.options.stateSource ??
      ((ids: { cellId: string; controllerId: string }) =>
        controllerStateWebsocket(this.nova, ids))

    for (let retry = 0; ; retry++) {
      try {
        const resources = await loadRobotResources({
          nova: this.nova,
          cellId,
          controllerId,
          motionGroupId: this.motionGroupId,
          progress: this.progress,
          createStateSource,
          isStale: () => this.isStale(attempt),
          socketTimeoutMs: this.options.socketTimeoutMs,
        })
        if (!resources) return
        if (this.isStale(attempt)) {
          resources.dispose()
          return
        }

        // From here on the streams belong to the session. A failure while
        // making it has to give them back, or the load leaves live
        // connections behind that nothing will ever close.
        let session: RobotSession
        try {
          session = new RobotSession(
            this.nova,
            { cellId, controllerId, motionGroupId: this.motionGroupId },
            resources,
            this.options,
          )
        } catch (err) {
          resources.dispose()
          throw err
        }

        if (this.isStale(attempt)) {
          session.dispose()
          return
        }
        runInAction(() => {
          this.session = session
          this.state = "ready"
        })
        this.settle.resolve(session)
        return
      } catch (err) {
        // A newer load took over; it reports its own outcome
        if (this.isStale(attempt)) return

        const retryDelay = isRobotLoadStepError(err)
          ? retryDelays[retry]
          : undefined

        if (retryDelay === undefined) {
          runInAction(() => {
            if (isRobotLoadStepError(err)) {
              this.progress.failStep(err.stepId, err.cause)
            } else {
              this.progress.failWith(err)
            }
            this.state = "failed"
            this.error = err
          })
          this.options.onEvent?.({
            type: "loadFailed",
            motionGroupId: this.motionGroupId,
            step: isRobotLoadStepError(err) ? err.stepId : "unknown",
            message: makeErrorMessage(err),
            attempts: retry + 1,
          })
          this.settle.reject(err)
          return
        }

        logger.warn(
          `Retrying load of robot "${this.motionGroupId}" after: ${makeErrorMessage(err)}`,
        )
        runInAction(() => {
          this.progress.beginRetry(retry + 1)
        })
        await sleep(retryDelay)
        if (this.isStale(attempt)) return
      }
    }
  }
}

/**
 * Loads one robot of a NOVA cell into a {@link RobotSession}: its
 * description, kinematic model, coordinate systems and live state, with
 * automatic retries. The returned load tells the progress; `await
 * load.ready` gives the session.
 *
 * @param connection - The NOVA instance: its URL, or the app's NOVA client
 * @param motionGroupId - The robot, e.g. "0@ur5e"
 */
export function loadRobotSession(
  connection: NovaConnection,
  motionGroupId: string,
  options: LoadRobotSessionOptions = {},
): RobotSessionLoad {
  return createRobotSessionLoad(createNovaClient(connection), motionGroupId, {
    ...options,
    cellId: options.cellId ?? cellIdOf(connection),
  })
}

/**
 * {@link loadRobotSession} with the library's NOVA client
 *
 * @internal
 */
export function createRobotSessionLoad(
  nova: Nova,
  motionGroupId: string,
  options: LoadRobotSessionOptions = {},
): RobotSessionLoad {
  const cellId = options.cellId ?? "cell"
  const controllerId = options.controllerId ?? motionGroupId.split("@")[1] ?? ""
  return new RobotSessionLoad(
    nova,
    motionGroupId,
    { cellId, controllerId },
    options,
  )
}
