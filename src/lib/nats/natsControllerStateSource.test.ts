import type { RobotControllerState } from "@wandelbots/nova-js/v2"
import { connect } from "nats.ws"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import {
  natsControllerStateSource,
  natsUrlOf,
} from "./natsControllerStateSource"

vi.mock("nats.ws", () => ({ connect: vi.fn() }))

/** A NATS subscription that the test feeds: an async iterable of messages */
function fakeSubscription() {
  const queue: { data: Uint8Array }[] = []
  let wake: (() => void) | undefined
  let done = false
  return {
    unsubscribe: vi.fn(async () => {
      done = true
      wake?.()
    }),
    push(data: string) {
      queue.push({ data: new TextEncoder().encode(data) })
      wake?.()
    },
    async *[Symbol.asyncIterator]() {
      while (!done) {
        const next = queue.shift()
        if (next) {
          yield next
        } else {
          await new Promise<void>((resolve) => {
            wake = resolve
          })
        }
      }
    },
  }
}

/** A NATS connection that stays open until the test closes it */
function fakeConnection() {
  const subscription = fakeSubscription()
  let closedNow: () => void = () => {}
  const closed = new Promise<void>((resolve) => {
    closedNow = resolve
  })
  return {
    subscription,
    subscribe: vi.fn(() => subscription),
    closed: () => closed,
    close: vi.fn(async () => closedNow()),
  }
}

const state = {
  controller: "ur5e",
  safety_state: "SAFETY_STATE_NORMAL",
  operation_mode: "OPERATION_MODE_AUTO",
  mode: "MODE_CONTROL",
  motion_groups: [],
} as unknown as RobotControllerState

let connection: ReturnType<typeof fakeConnection>

beforeEach(() => {
  connection = fakeConnection()
  vi.mocked(connect).mockResolvedValue(connection as never)
})

afterEach(() => {
  vi.mocked(connect).mockReset()
})

describe("natsControllerStateSource", () => {
  test("subscribes to the controller's state on the NATS server", async () => {
    const source = natsControllerStateSource({
      url: "ws://nova:80/api/nats",
      cellId: "cell",
      controllerId: "ur5e",
    })

    await vi.waitFor(() => expect(source.readyState).toBe(1))
    expect(connect).toHaveBeenCalledWith(
      expect.objectContaining({ servers: "ws://nova:80/api/nats" }),
    )
    expect(connection.subscribe).toHaveBeenCalledWith(
      "nova.v2.cells.cell.controllers.ur5e.state",
    )
    await source.close()
  })

  test("gives each NATS message as a message event that parses into the controller state", async () => {
    const source = natsControllerStateSource({
      url: "ws://nova:80/api/nats",
      cellId: "cell",
      controllerId: "ur5e",
    })
    const received: unknown[] = []
    source.addEventListener("message", (event) => received.push(event.data))
    await vi.waitFor(() => expect(source.readyState).toBe(1))

    connection.subscription.push(JSON.stringify(state))

    // NATS sends the controller state itself, not wrapped in a result
    expect(source.parse((await source.firstMessage()).data)).toEqual(state)
    await vi.waitFor(() => expect(received).toHaveLength(1))
    expect(source.parse("not json")).toBeUndefined()
    await source.close()
  })

  test("closes the subscription and the connection", async () => {
    const source = natsControllerStateSource({
      url: "ws://nova:80/api/nats",
      cellId: "cell",
      controllerId: "ur5e",
    })
    await vi.waitFor(() => expect(source.readyState).toBe(1))

    await source.close()

    expect(connection.subscription.unsubscribe).toHaveBeenCalled()
    expect(connection.close).toHaveBeenCalled()
    expect(source.readyState).toBe(3)
  })

  test("names its server without credentials, for error reports", async () => {
    const source = natsControllerStateSource({
      url: "wss://user:secret@nova.example.com:443/api/nats?token=abc",
      cellId: "cell",
      controllerId: "ur5e",
    })

    expect(source.url).not.toContain("secret")
    expect(source.url).not.toContain("abc")
    expect(source.url).toContain("nova.example.com")
    expect(source.url).toContain("nova.v2.cells.cell.controllers.ur5e.state")
    await source.close()
  })
})

// Ported from RobotPad (src/util/getNATSUrl.ts)
describe("natsUrlOf", () => {
  test("is the instance's /api/nats over ws, or wss for https", () => {
    expect(natsUrlOf("http://172.31.12.20")).toBe(
      "ws://172.31.12.20:80/api/nats",
    )
    expect(natsUrlOf("https://nova.example.com")).toBe(
      "wss://nova.example.com:443/api/nats",
    )
    expect(natsUrlOf("https://nova.example.com:8443/some/path")).toBe(
      "wss://nova.example.com:8443/api/nats",
    )
  })

  test("takes the instance of an app's NOVA client", () => {
    expect(natsUrlOf({ config: { instanceUrl: "http://10.0.0.1:8080" } })).toBe(
      "ws://10.0.0.1:8080/api/nats",
    )
  })
})
