import type { RobotControllerState } from "@wandelbots/nova-js/v2"
import { connect, type NatsConnection, type Subscription } from "nats.ws"
import { tryParseJson } from "../../components/utils/converters"
import type { ConnectionLogger } from "../connectionLogger"
import type { ControllerStateSource } from "../controllerStateSource"
import type { NovaConnection } from "../novaConnection"

// Ported from RobotPad (src/util/NatsClient.ts, src/util/getNATSUrl.ts)

/** The `WebSocket.readyState` values, also where there is no WebSocket */
const CONNECTING = 0
const OPEN = 1
const CLOSED = 3

/** A URL without credentials and query, where a token can ride */
function withoutCredentials(url: string): string {
  try {
    const parsed = new URL(url)
    parsed.username = ""
    parsed.password = ""
    parsed.search = ""
    return parsed.toString()
  } catch {
    return url.split("?")[0] ?? url
  }
}

/**
 * A subscription to one NATS subject that behaves like a WebSocket that
 * reconnects itself: a "message" event per NATS message, with the message's
 * data as text
 */
class NatsSubscription extends EventTarget {
  private nc: NatsConnection | null = null
  private subscription: Subscription | null = null
  private reconnectAttempts = 0
  private reconnectDelay = 1000
  private readonly maxReconnectDelay = 30000
  private isManuallyClosing = false
  private receivedFirstMessage?: MessageEvent

  readyState = CONNECTING

  constructor(
    private readonly natsUrl: string,
    readonly subject: string,
    private readonly logger: ConnectionLogger,
  ) {
    super()
    void this.connect()
  }

  /** The server and the subject, without credentials */
  get url(): string {
    return `${withoutCredentials(this.natsUrl)} (subject: ${this.subject})`
  }

  private async connect() {
    try {
      this.logger.info("Connecting to NATS", {
        url: withoutCredentials(this.natsUrl),
      })
      this.readyState = CONNECTING

      this.nc = await connect({
        servers: this.natsUrl,
        maxReconnectAttempts: -1,
        reconnectTimeWait: this.reconnectDelay,
      })

      // close() can only close what already exists, so a close during the
      // handshake above leaves this connection to us to clean up
      if (this.isManuallyClosing) {
        this.logger.info("NATS connection closed while still connecting")
        const nc = this.nc
        this.nc = null
        this.readyState = CLOSED
        await nc.close()
        return
      }

      this.logger.info("Connected to NATS, subscribing to subject", {
        subject: this.subject,
      })
      this.readyState = OPEN
      this.reconnectAttempts = 0
      this.reconnectDelay = 1000

      this.subscribe()

      const nc = this.nc
      void (async () => {
        await nc.closed()
        this.logger.info("NATS connection closed")
        this.readyState = CLOSED
        if (!this.isManuallyClosing) {
          this.attemptReconnect()
        }
      })()
    } catch (error) {
      this.logger.warn("Failed to connect to NATS", error)
      this.readyState = CLOSED

      if (!this.isManuallyClosing) {
        this.attemptReconnect()
      }
    }
  }

  private subscribe() {
    if (!this.nc) {
      throw new Error("NATS connection not established")
    }

    const subscription = this.nc.subscribe(this.subject)
    this.subscription = subscription

    void (async () => {
      for await (const message of subscription) {
        const event = new MessageEvent("message", {
          data: new TextDecoder().decode(message.data),
        })
        this.receivedFirstMessage ??= event
        this.dispatchEvent(event)
      }
    })()
  }

  private attemptReconnect() {
    if (this.isManuallyClosing) {
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(
      this.reconnectDelay * 2 ** (this.reconnectAttempts - 1),
      this.maxReconnectDelay,
    )

    this.logger.debug("Attempting to reconnect to NATS", {
      attempt: this.reconnectAttempts,
      delayMs: delay,
    })

    setTimeout(() => {
      void this.connect()
    }, delay)
  }

  /** Connects again, unless it is connected */
  reconnect() {
    if (this.readyState === OPEN && this.nc) {
      // Already connected, just reset reconnect parameters
      this.reconnectAttempts = 0
      this.reconnectDelay = 1000
      return
    }

    void this.close()
    this.isManuallyClosing = false
    void this.connect()
  }

  async close() {
    this.isManuallyClosing = true

    if (this.subscription) {
      await this.subscription.unsubscribe()
      this.subscription = null
    }

    if (this.nc) {
      await this.nc.close()
      this.nc = null
    }

    this.readyState = CLOSED
  }

  nextMessage(): Promise<MessageEvent> {
    return new Promise((resolve) => {
      const onMessage = (event: Event) => {
        this.removeEventListener("message", onMessage)
        resolve(event as MessageEvent)
      }
      this.addEventListener("message", onMessage)
    })
  }

  firstMessage(): Promise<MessageEvent> {
    return this.receivedFirstMessage
      ? Promise.resolve(this.receivedFirstMessage)
      : this.nextMessage()
  }
}

/** What {@link natsControllerStateSource} connects to */
export type NatsControllerStateSourceOptions = {
  /** The websocket URL of the NATS server, e.g. from {@link natsUrlOf} */
  url: string
  /** The NOVA cell; defaults to "cell" */
  cellId?: string
  controllerId: string
  /** Where the connection logs. Defaults to the console. */
  logger?: ConnectionLogger
}

/**
 * The live state of a controller from NOVA's NATS server, on the subject
 * `nova.v2.cells.{cell}.controllers.{controller}.state`. NATS sends the state
 * as it changes, without the response rate of the websocket.
 *
 * Needs the optional peer dependency `nats.ws`.
 */
export function natsControllerStateSource(
  options: NatsControllerStateSourceOptions,
): ControllerStateSource {
  const subject = `nova.v2.cells.${options.cellId ?? "cell"}.controllers.${options.controllerId}.state`
  const subscription = new NatsSubscription(
    options.url,
    subject,
    options.logger ?? console,
  )

  return {
    get url() {
      return subscription.url
    },
    get readyState() {
      return subscription.readyState
    },
    addEventListener: (type, listener) =>
      subscription.addEventListener(type, listener as EventListener),
    removeEventListener: (type, listener) =>
      subscription.removeEventListener(type, listener as EventListener),
    firstMessage: () => subscription.firstMessage(),
    nextMessage: () => subscription.nextMessage(),
    reconnect: () => subscription.reconnect(),
    close: () => subscription.close(),
    // NATS sends the controller state itself, not wrapped in a result
    parse: (data) => tryParseJson(data) as RobotControllerState | undefined,
  }
}

/**
 * The websocket URL of a NOVA instance's NATS server: `/api/nats` on its
 * host, over wss for https and ws for http. A relative instance URL is read
 * against the page's origin.
 */
export function natsUrlOf(connection: NovaConnection): string {
  const instanceUrl =
    typeof connection === "string" ? connection : connection.config.instanceUrl

  let resolved: URL
  try {
    resolved =
      typeof window !== "undefined"
        ? new URL(instanceUrl, window.location.origin)
        : new URL(instanceUrl)
  } catch {
    throw new Error(`Invalid NOVA instance URL for NATS: ${instanceUrl}`)
  }

  const secure = resolved.protocol === "https:"
  const port = resolved.port || (secure ? "443" : "80")
  return `${secure ? "wss:" : "ws:"}//${resolved.hostname}:${port}/api/nats`
}
