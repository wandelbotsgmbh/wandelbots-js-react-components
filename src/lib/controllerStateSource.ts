import type { AutoReconnectingWebsocket } from "@wandelbots/nova-js"
import type { RobotControllerState } from "@wandelbots/nova-js/v2"
import { tryParseJson } from "../components/utils/json"
import {
  cellIdOf,
  createNovaClient,
  type NovaConnection,
} from "./novaConnection"

/**
 * Where a robot's live controller state comes from: NOVA's websocket (what
 * `loadRobotSession` opens without a `stateSource`), NATS
 * (`natsControllerStateSource` of `/nats`), or a source of the app's own.
 * It works like a WebSocket that reconnects itself: the session's
 * `ControllerStateStream` listens to its messages and asks it to reconnect
 * when they stop coming.
 */
export type ControllerStateSource = {
  /** Where it connects, for error reports */
  readonly url: string
  /** 1 (`WebSocket.OPEN`) while it is connected */
  readonly readyState: number
  addEventListener(
    type: "message",
    listener: (event: MessageEvent) => void,
  ): void
  removeEventListener(
    type: "message",
    listener: (event: MessageEvent) => void,
  ): void
  /** Resolves with the first message, also when it came already */
  firstMessage(): Promise<MessageEvent>
  /** Resolves with the next message */
  nextMessage(): Promise<MessageEvent>
  reconnect(): void
  close(): void
  /** The controller state that a message's data holds, if any */
  parse(data: unknown): RobotControllerState | undefined
}

/** The part of a nova-js reconnecting websocket that a source uses */
type StateSocket = Pick<
  AutoReconnectingWebsocket,
  "url" | "readyState" | "firstMessage" | "nextMessage" | "reconnect" | "close"
> &
  Pick<ControllerStateSource, "addEventListener" | "removeEventListener">

/**
 * A controller state source on a websocket of NOVA, which sends
 * `{ result: <controller state> }`
 *
 * @internal
 */
export function websocketControllerStateSource(
  socket: StateSocket,
): ControllerStateSource {
  return {
    get url() {
      return socket.url
    },
    get readyState() {
      return socket.readyState
    },
    addEventListener: (type, listener) =>
      socket.addEventListener(type, listener),
    removeEventListener: (type, listener) =>
      socket.removeEventListener(type, listener),
    firstMessage: () => socket.firstMessage(),
    nextMessage: () => socket.nextMessage(),
    reconnect: () => socket.reconnect(),
    close: () => socket.close(),
    parse: (data) =>
      (tryParseJson(data) as { result?: RobotControllerState } | undefined)
        ?.result,
  }
}

/**
 * The live state of a controller from NOVA's websocket
 * (`/cells/{cell}/controllers/{controller}/state-stream`): safety state,
 * operation mode, mode, and the state of each of its motion groups
 */
export function controllerStateWebsocket(
  connection: NovaConnection,
  {
    controllerId,
    cellId,
    responseRateMs,
  }: {
    controllerId: string
    /** Defaults to the cell of an older nova-js client, or "cell" */
    cellId?: string
    /** How often NOVA sends the state, in ms; NOVA's own default without it */
    responseRateMs?: number
  },
): ControllerStateSource {
  const nova = createNovaClient(connection)
  const cell = cellId ?? cellIdOf(connection) ?? "cell"
  const query =
    responseRateMs === undefined ? "" : `?response_rate=${responseRateMs}`
  return websocketControllerStateSource(
    nova.openReconnectingWebsocket(
      `/cells/${cell}/controllers/${controllerId}/state-stream${query}`,
    ),
  )
}
