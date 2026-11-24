import { Nova } from "@wandelbots/nova-js/v2"
import { Vector3 } from "three"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { delay } from "../components/utils/errorHandling"
import { randomFrame, seededRandom } from "./__fixtures__/randomPoses"
import {
  JoggerConnection,
  type JoggerConnectionOptions,
} from "./JoggerConnection"
import { MotionStreamConnection } from "./MotionStreamConnection"
import { jointValuesEqual } from "./motionStateUpdate"
import { Pose3 } from "./Pose3"

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

describe("continuous jogging of the TCP", () => {
  /** Turned by 90° about world Z: its X axis points along world +Y */
  const turnedCoordinateSystem = {
    coordinate_system: "turned",
    position: [0, 0, 0],
    orientation: [0, 0, Math.PI / 2],
    orientation_type: "ROTATION_VECTOR" as const,
  }

  /** A jogger whose jogging websocket NOVA has confirmed */
  async function joggingJogger(options?: JoggerConnectionOptions) {
    const { jogger, sockets } = joggerWithFakeSockets(options)
    const initialized = jogger.setJoggingMode("jogging")
    sockets[0].receive({ kind: "INITIALIZE_RECEIVED" })
    await initialized
    return { jogger, socket: sockets[0] }
  }

  function lastRequest(socket: FakeJoggingSocket) {
    return socket.sendJson.mock.lastCall?.[0] as {
      translation: number[]
      rotation: number[]
      use_tool_coordinate_system: boolean
    }
  }

  test("moves along the axes of the coordinate system", async () => {
    const { jogger, socket } = await joggingJogger({
      coordinateSystem: turnedCoordinateSystem,
    })

    await jogger.translateTCP({
      axis: "x",
      direction: "+",
      velocityMmPerSec: 10,
    })

    const request = lastRequest(socket)
    expect(request.translation[0]).toBeCloseTo(0)
    expect(request.translation[1]).toBeCloseTo(10)
    expect(request.translation[2]).toBeCloseTo(0)
    expect(request.rotation).toEqual([0, 0, 0])
    expect(request.use_tool_coordinate_system).toBe(false)
  })

  test("rotates about the axes of the coordinate system", async () => {
    const { jogger, socket } = await joggingJogger({
      coordinateSystem: turnedCoordinateSystem,
    })

    await jogger.rotateTCP({
      axis: "x",
      direction: "-",
      velocityRadsPerSec: 0.5,
    })

    const request = lastRequest(socket)
    expect(request.rotation[0]).toBeCloseTo(0)
    expect(request.rotation[1]).toBeCloseTo(-0.5)
    expect(request.rotation[2]).toBeCloseTo(0)
    expect(request.translation).toEqual([0, 0, 0])
  })

  test("in tool orientation moves along the tool's axes, not the coordinate system's", async () => {
    const { jogger, socket } = await joggingJogger({
      coordinateSystem: turnedCoordinateSystem,
      orientation: "tool",
    })

    await jogger.translateTCP({
      axis: "x",
      direction: "+",
      velocityMmPerSec: 10,
    })

    expect(lastRequest(socket).translation).toEqual([10, 0, 0])
    expect(lastRequest(socket).use_tool_coordinate_system).toBe(true)
  })

  test("setOptions() changes the coordinate system, and back to world", async () => {
    const { jogger, sockets } = joggerWithFakeSockets({ mode: "jogging" })
    /** Sets the options, and NOVA confirms the new jogging websocket */
    const setOptions = async (options: JoggerConnectionOptions) => {
      const reinitialized = jogger.setOptions(options)
      sockets.at(-1)?.receive({ kind: "INITIALIZE_RECEIVED" })
      await reinitialized
    }
    /** Jogs along x, and returns what the jogger sent */
    const move = async () => {
      await jogger.translateTCP({
        axis: "x",
        direction: "+",
        velocityMmPerSec: 10,
      })
      return lastRequest(sockets.at(-1) as FakeJoggingSocket).translation
    }

    await setOptions({ coordinateSystem: turnedCoordinateSystem })
    expect((await move())[1]).toBeCloseTo(10)

    await setOptions({ coordinateSystem: undefined })
    expect(await move()).toEqual([10, 0, 0])
  })

  // The velocity goes to the robot as it is computed here. It was computed
  // with three.js objects before the jogger took plain numbers: the numbers
  // must be the same to the last bit.
  test("sends the same velocities as with three.js objects", async () => {
    const random = seededRandom(6)
    const { jogger, sockets } = joggerWithFakeSockets({ mode: "jogging" })

    for (let run = 0; run < 200; run++) {
      const coordinateSystem = {
        coordinate_system: "random",
        ...randomFrame(random),
      }
      const reinitialized = jogger.setOptions({ coordinateSystem })
      const socket = sockets[sockets.length - 1] as FakeJoggingSocket
      socket.receive({ kind: "INITIALIZE_RECEIVED" })
      await reinitialized

      const axis = (["x", "y", "z"] as const)[Math.floor(random() * 3)] ?? "x"
      const direction = random() < 0.5 ? "-" : "+"
      const velocity = random() * 250
      const expected = new Vector3()
      expected[axis] = direction === "-" ? -velocity : velocity
      expected.applyQuaternion(
        Pose3.fromCoordinateSystem(coordinateSystem).quaternion,
      )

      await jogger.translateTCP({ axis, direction, velocityMmPerSec: velocity })
      expect(
        lastRequest(socket).translation,
        JSON.stringify({ coordinateSystem, axis, direction, velocity }),
      ).toEqual([...expected])

      await jogger.rotateTCP({ axis, direction, velocityRadsPerSec: velocity })
      expect(
        lastRequest(socket).rotation,
        JSON.stringify({ coordinateSystem, axis, direction, velocity }),
      ).toEqual([...expected])
    }
  })
})

test("open() gives the jogger's logger to the motion stream it opens", async () => {
  const logger = { info: vi.fn(), debug: vi.fn(), warn: vi.fn() }
  const jogger = await JoggerConnection.open(
    new Nova({ instanceUrl: "https://mock.example.com" }),
    "0@mock-ur5e",
    { logger },
  )

  expect(logger.info).toHaveBeenCalledWith(
    "Connected motion state websocket to motion group",
    expect.anything(),
  )
  await jogger.dispose()
})
