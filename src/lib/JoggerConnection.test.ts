import { Nova } from "@wandelbots/nova-js/v2"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { delay } from "../components/utils/errorHandling"
import {
  JoggerConnection,
  type JoggerConnectionOptions,
} from "./JoggerConnection"
import { MotionStreamConnection } from "./MotionStreamConnection"
import { jointValuesEqual } from "./motionStateUpdate"

// Notes:
// - In mock mode, no joint comparison takes place (always successful)
// - To test with real (virtual or physical) instance, set an INSTANCE_URL

const INSTANCE_URL = undefined // This could be read from ENV in future
const MOCK = !INSTANCE_URL

test("jog a robot somewhat", async () => {
  const nova = new Nova({
    instanceUrl: MOCK ? "https://mock.example.com" : INSTANCE_URL,
  })

  // Find a virtual robot we can jog
  const controllerNames = await nova.api.controller.listRobotControllers("cell")
  const firstControllerName = controllerNames[0]

  if (!firstControllerName) {
    throw new Error("No robot controllers found on instance")
  }

  const controllerConfig = await nova.api.controller.getRobotController(
    "cell",
    firstControllerName,
  )
  const controllerState =
    await nova.api.controller.getCurrentRobotControllerState(
      "cell",
      firstControllerName,
    )
  console.log("verify, got controller config and state", {
    controllerConfig,
    controllerState,
  })

  if (!controllerConfig || !controllerState) {
    throw new Error(
      `Could not get controller config and state for ${firstControllerName}`,
    )
  }

  if (controllerConfig.configuration.kind !== "VirtualController") {
    throw new Error(
      `Controller ${firstControllerName} is not a VirtualController, it's a ${controllerConfig.configuration.kind}`,
    )
  }

  if (controllerState.last_error?.[0]) {
    throw new Error(
      `Controller ${firstControllerName} has error: ${controllerState.last_error[0]}`,
    )
  }

  const virtualMotionGroup = controllerState.motion_groups[0]

  if (!virtualMotionGroup) {
    throw new Error(
      `Could not find a joggable motion group. Saw controller: ${firstControllerName}`,
    )
  }

  const jogger = await JoggerConnection.open(
    nova,
    virtualMotionGroup.motion_group,
  )

  function getJoints() {
    return jogger.motionStream.rapidlyChangingMotionState.joint_position
  }

  let joints = getJoints()

  await jogger.setJoggingMode("jogging")

  await jogger.rotateJoints({
    joint: 0,
    direction: "+",
    velocityValue: 0.1,
    velocityUnit: "rad/s",
  })

  await delay(500)
  await jogger.stop()

  if (!MOCK) {
    // Only verify joint movement in non-mock mode
    await expect.poll(() => getJoints()[0]).toBeGreaterThan(joints[0] + 0.01)
    expect(getJoints()[1]).toBeCloseTo(joints[1])
  }

  joints = getJoints()

  await jogger.rotateJoints({
    joint: 0,
    direction: "-",
    velocityValue: 0.1,
    velocityUnit: "rad/s",
  })
  await delay(500)
  await jogger.stop()

  await expect.poll(() => getJoints()[0]).toBeLessThan(joints[0] + 0.01)
  expect(getJoints()[1]).toBeCloseTo(joints[1])

  if (MOCK) {
    return
  }

  // Wait for motion to stop
  await vi.waitUntil(
    async () => {
      const joints = getJoints()
      await jogger.motionStream.motionStateSocket.nextMessage()
      return jointValuesEqual(joints, getJoints(), 0.0001)
    },
    {
      timeout: 3000,
    },
  )
})

describe("the motion stream of a jogger", () => {
  const nova = () => new Nova({ instanceUrl: "https://mock.example.com" })

  test("dispose() closes the motion stream that open() opened", async () => {
    const jogger = await JoggerConnection.open(nova(), "0@mock-ur5e")
    const disposeStream = vi.spyOn(jogger.motionStream, "dispose")

    await jogger.dispose()

    expect(disposeStream).toHaveBeenCalled()
  })

  test("a change of the jogging mode keeps the motion stream open", async () => {
    const jogger = await JoggerConnection.open(nova(), "0@mock-ur5e")
    const disposeStream = vi.spyOn(jogger.motionStream, "dispose")

    await jogger.setJoggingMode("jogging")
    await jogger.setJoggingMode("off")

    expect(disposeStream).not.toHaveBeenCalled()
    await jogger.dispose()
  })

  test("a motion stream given to the constructor stays open", async () => {
    const motionStream = await MotionStreamConnection.open(
      nova(),
      "0@mock-ur5e",
    )
    const disposeStream = vi.spyOn(motionStream, "dispose")
    const jogger = new JoggerConnection(motionStream)

    await jogger.dispose()

    expect(disposeStream).not.toHaveBeenCalled()
    motionStream.dispose()
  })
})

/** A jogging websocket that answers only when the test says so */
class FakeJoggingSocket extends EventTarget {
  disposed = false
  sendJson = vi.fn()

  dispose() {
    this.disposed = true
  }

  async closed() {}

  receive(result: { kind: string; message?: string }) {
    this.dispatchEvent(
      new MessageEvent("message", { data: JSON.stringify({ result }) }),
    )
  }
}

/** A jogger whose jogging websockets are FakeJoggingSockets */
function joggerWithFakeSockets(options?: JoggerConnectionOptions) {
  const sockets: FakeJoggingSocket[] = []
  const motionStream = {
    nova: {
      openReconnectingWebsocket: () => {
        const socket = new FakeJoggingSocket()
        sockets.push(socket)
        return socket
      },
    },
    cellId: "cell",
    controllerId: "ur5e",
    motionGroupId: "0@ur5e",
    motionGroup: { tcp: "Flange" },
    description: {},
    joints: [0, 1, 2, 3, 4, 5].map((index) => ({ index })),
    dispose: vi.fn(),
  } as unknown as MotionStreamConnection
  return { jogger: new JoggerConnection(motionStream, options), sockets }
}

describe("the initialization of the jogging websocket", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("resolves when NOVA confirms it", async () => {
    const { jogger, sockets } = joggerWithFakeSockets()
    const initialized = jogger.setJoggingMode("jogging")

    sockets[0].receive({ kind: "INITIALIZE_RECEIVED" })

    await expect(initialized).resolves.toBeUndefined()
    expect(vi.getTimerCount()).toBe(0)
  })

  test("ends without an error and without a timer when the jogging stops before", async () => {
    const { jogger } = joggerWithFakeSockets()
    const initialized = jogger.setJoggingMode("jogging")

    // The button was released before NOVA answered
    await jogger.setJoggingMode("off")

    expect(vi.getTimerCount()).toBe(0)
    await expect(initialized).resolves.toBeUndefined()
  })

  test("ends when the jogger is disposed before", async () => {
    const { jogger } = joggerWithFakeSockets()
    const initialized = jogger.setJoggingMode("jogging")

    await jogger.dispose()

    expect(vi.getTimerCount()).toBe(0)
    await expect(initialized).resolves.toBeUndefined()
  })

  test("rejects after the timeout in milliseconds", async () => {
    const { jogger } = joggerWithFakeSockets({ timeout: 2000 })
    const initialized = jogger.setJoggingMode("jogging")
    const rejected = expect(initialized).rejects.toThrow(
      "Jogging initialization timeout after 2000 ms",
    )

    vi.advanceTimersByTime(2000)

    await rejected
  })

  test("ends once when the connection is blocked by another client", async () => {
    const onBlocked = vi.fn()
    const { jogger, sockets } = joggerWithFakeSockets()
    jogger.onBlocked = onBlocked
    const initialized = jogger.setJoggingMode("jogging")

    sockets[0].receive({
      kind: "MOTION_ERROR",
      message:
        "Movement request rejected. Another client is currently executing a 'Jogging' motion!",
    })
    vi.advanceTimersByTime(10_000)

    await expect(initialized).resolves.toBeUndefined()
    expect(onBlocked).toHaveBeenCalledTimes(1)
    expect(sockets[0].disposed).toBe(true)
  })
})
