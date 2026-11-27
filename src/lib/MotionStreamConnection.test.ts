import type { AutoReconnectingWebsocket } from "@wandelbots/nova-js"
import {
  type MotionGroupDescription,
  type MotionGroupState,
  Nova,
  type RobotControllerState,
} from "@wandelbots/nova-js/v2"
import { autorun } from "mobx"
import { expect, test, vi } from "vitest"
import { ur5eMotionGroupState } from "../components/jogging/__fixtures__/motionStreamMockData"
import type { ConnectionLogger } from "./connectionLogger"
import { MotionStreamConnection } from "./MotionStreamConnection"

test("motion stream", async () => {
  const nova = new Nova({
    instanceUrl: "https://mock.example.com",
  })

  const motionStream = await MotionStreamConnection.open(nova, "0@mock-ur5e")
  expect(motionStream.joints.length).toBe(6)

  // Test changing the url (e.g. changing response_rate)
  motionStream.motionStateSocket.changeUrl(
    nova.makeWebsocketURL(
      "/cells/cell/motion-groups/0@mock-ur5e/state-stream?response_rate=100",
    ),
  )

  await motionStream.motionStateSocket.firstMessage()

  expect(motionStream.motionStateSocket.url).toBe(
    "wss://mock.example.com/api/v2/cells/cell/motion-groups/0@mock-ur5e/state-stream?response_rate=100",
  )
})

// A client of another nova-js version (here: the shape of the cell-scoped
// NovaClient of nova-js 3): the library connects with its own client
test("motion stream with a client of another nova-js version", async () => {
  const otherClient = {
    config: { instanceUrl: "https://mock.example.com", cellId: "cell" },
    accessToken: null,
  }

  const motionStream = await MotionStreamConnection.open(
    otherClient,
    "0@mock-ur5e",
  )
  expect(motionStream.joints.length).toBe(6)
  expect(motionStream.nova).toBeInstanceOf(Nova)
  expect(motionStream.nova).not.toBe(otherClient)
})

/** Stands in for the state-stream websocket, driven by hand */
class FakeMotionStateSocket extends EventTarget {
  send(state: MotionGroupState) {
    this.dispatchEvent(
      new MessageEvent("message", { data: JSON.stringify({ result: state }) }),
    )
  }
}

function makeMotionStream(logger?: ConnectionLogger) {
  const socket = new FakeMotionStateSocket()
  const motionStream = new MotionStreamConnection(
    "https://mock.example.com",
    {} as RobotControllerState,
    ur5eMotionGroupState,
    {} as MotionGroupDescription,
    structuredClone(ur5eMotionGroupState),
    socket as unknown as AutoReconnectingWebsocket,
    "cell",
    { logger },
  )
  return { motionStream, socket }
}

/**
 * A reading of the fixture robot at rest as a real sensor delivers it: every
 * joint and the TCP pose off by a little `noise`
 */
function noisyReading(noise: number): MotionGroupState {
  const reading = structuredClone(ur5eMotionGroupState)
  reading.joint_position = reading.joint_position.map((joint) => joint + noise)
  reading.tcp_pose = {
    position: reading.tcp_pose?.position?.map((value) => value + noise * 500),
    orientation: reading.tcp_pose?.orientation?.map((value) => value + noise),
  }
  return reading
}

/**
 * Pose readouts poll `readoutState` from a requestAnimationFrame loop, outside
 * any MobX reaction, so these tests read it the same way. A real robot's
 * sensors jitter while it stands still (a UR by ~0.2 mm), and every pose that
 * differed at all flickered 2-decimal readouts. Only the readout holds back:
 * the stored state, which step jogs plan from, keeps following the stream.
 * (Ported from RobotPad.)
 */
test("motion stream readout holds while a standing robot's sensors jitter", () => {
  const { motionStream, socket } = makeMotionStream()
  const shown = new Set([motionStream.readoutState.joint_position[0]])

  for (const noise of [0.00015, -0.00015, 0.0001, -0.0001]) {
    socket.send(noisyReading(noise))
    shown.add(motionStream.readoutState.joint_position[0])
  }

  expect([...shown]).toEqual([ur5eMotionGroupState.joint_position[0]])
  expect(motionStream.rapidlyChangingMotionState.joint_position[0]).toBeCloseTo(
    (ur5eMotionGroupState.joint_position[0] ?? 0) - 0.0001,
    8,
  )
})

/**
 * A reaction that observes the readout must get the new pose together with
 * the new joints: the readout switches on the joints, and the stream writes
 * each field in its own action, so the pose has to be stored first
 */
test("motion stream readout shows the new pose together with the new joints", () => {
  const { motionStream, socket } = makeMotionStream()
  let notified = motionStream.readoutState
  const dispose = autorun(() => {
    notified = motionStream.readoutState
  })

  const reading = noisyReading(0.001)
  socket.send(reading)

  expect(notified.joint_position).toEqual(reading.joint_position)
  expect(notified.tcp_pose?.position).toEqual(reading.tcp_pose?.position)
  dispose()
})

test("motion stream readout follows a slow movement once it adds up", () => {
  const { motionStream, socket } = makeMotionStream()
  const resting = motionStream.readoutState.joint_position[0] ?? 0

  // Far less per message than the noise filter lets through, polled every message
  let offset = 0
  let shown = 0
  for (let message = 0; message < 20; message++) {
    offset += 0.00005
    socket.send(noisyReading(offset))
    shown = (motionStream.readoutState.joint_position[0] ?? 0) - resting
  }

  expect(shown).toBeGreaterThan(0)
  expect(offset - shown).toBeLessThanOrEqual(0.0002 + 1e-12)
})

test("motion stream readout applies a TCP switch while the robot stands still", () => {
  const { motionStream, socket } = makeMotionStream()
  expect(motionStream.readoutState.tcp).toBe("Flange")

  // Switching the TCP moves the reported pose without any joint motion
  const reading = noisyReading(0)
  reading.tcp = "Gripper"
  reading.tcp_pose = { position: [0, 0, 100], orientation: [0, 0, 0] }
  socket.send(reading)

  expect(motionStream.readoutState.tcp).toBe("Gripper")
  expect(motionStream.readoutState.tcp_pose?.position).toEqual([0, 0, 100])
})

test("motion stream reports an incomplete pose to the app's logger as a debug line, not as a warning per message", () => {
  const logger = { info: vi.fn(), debug: vi.fn(), warn: vi.fn() }
  const consoleWarn = vi.spyOn(console, "warn").mockImplementation(() => {})
  const { socket } = makeMotionStream(logger)

  const reading = noisyReading(0.001)
  reading.tcp_pose = { position: [1, 2, 3] }
  socket.send(reading)

  expect(logger.debug).toHaveBeenCalledTimes(1)
  expect(logger.warn).not.toHaveBeenCalled()
  expect(consoleWarn).not.toHaveBeenCalled()
  consoleWarn.mockRestore()
})
