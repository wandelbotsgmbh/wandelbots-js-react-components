import type { RobotControllerState } from "@wandelbots/nova-js/v2"
import { autorun } from "mobx"
import { afterEach, expect, test, vi } from "vitest"
import { ur5eMotionGroupState } from "../components/jogging/__fixtures__/motionStreamMockData"
import {
  type ControllerStateSource,
  websocketControllerStateSource,
} from "./controllerStateSource"
import { ControllerStateStream } from "./ControllerStateStream"

// Ported from RobotPad (unit/StateStreamStore.test.ts), where this stream
// was the StateStreamStore

const MOTION_GROUP_ID = ur5eMotionGroupState.motion_group

/** Stands in for a source: the same event-based surface, driven by hand */
class FakeSource extends EventTarget implements ControllerStateSource {
  readyState = 1
  url = "ws://mock.example.com/api/nats"
  reconnect = vi.fn()
  close = vi.fn()
  nextMessage = () =>
    new Promise<MessageEvent>((resolve) =>
      this.addEventListener(
        "message",
        (event) => resolve(event as MessageEvent),
        {
          once: true,
        },
      ),
    )
  firstMessage = this.nextMessage
  parse = (data: unknown) => JSON.parse(data as string) as RobotControllerState

  send(state: RobotControllerState) {
    this.dispatchEvent(
      new MessageEvent("message", { data: JSON.stringify(state) }),
    )
  }
}

function controllerState(
  jointPosition: number[],
  flangeOrientation?: number[],
  executionStateKind?: string,
): RobotControllerState {
  const motionGroup = {
    ...ur5eMotionGroupState,
    joint_position: jointPosition,
    ...(flangeOrientation && {
      flange_pose: { position: [1, 2, 3], orientation: flangeOrientation },
    }),
    ...(executionStateKind && {
      execute: {
        kind: "EXECUTE",
        details: {
          kind: "TRAJECTORY",
          trajectory: "some-trajectory",
          location: { value: 0 },
          state: { kind: executionStateKind },
        },
      },
    }),
  }

  return {
    controller: ur5eMotionGroupState.controller,
    safety_state: "SAFETY_STATE_NORMAL",
    operation_mode: "OPERATION_MODE_AUTO",
    mode: "MODE_CONTROL",
    motion_groups: [motionGroup],
  } as unknown as RobotControllerState
}

/**
 * A reading of the robot at rest at `joints` as a real sensor delivers it:
 * every joint and the TCP pose off by a little `noise`.
 */
function noisyReading(joints: number[], noise: number): RobotControllerState {
  const state = controllerState(joints.map((joint) => joint + noise))
  const [motionGroup] = state.motion_groups
  const restingPose = ur5eMotionGroupState.tcp_pose
  if (!motionGroup || !restingPose?.position || !restingPose.orientation) {
    throw new Error("Fixture needs a motion group with a TCP pose")
  }

  motionGroup.tcp_pose = {
    position: restingPose.position.map((value) => value + noise * 500),
    orientation: restingPose.orientation.map((value) => value + noise),
  }
  return state
}

const distance = (a: number[], b: number[]) =>
  Math.hypot(...a.map((value, index) => value - (b[index] ?? 0)))

function makeStream(
  initialJoints: number[],
  options: { isVirtual?: boolean } = { isVirtual: true },
) {
  const source = new FakeSource()
  const onError = vi.fn()
  const stream = new ControllerStateStream(
    source,
    MOTION_GROUP_ID,
    controllerState(initialJoints),
    { ...options, onError },
  )
  return { stream, source, onError }
}

const jointsA = [0, -1.57, -1.57, -1.57, 1.57, -1.57]
const jointsB = [0.2, -1.57, -1.57, -1.57, 1.57, -1.57]
const jointsC = [0.4, -1.57, -1.57, -1.57, 1.57, -1.57]

afterEach(() => {
  vi.useRealTimers()
})

/**
 * The regression this guards, in miniature: consumers subscribe to a *property*
 * of the motion state object they are holding (RobotAnimator keeps it in a ref,
 * LinearAxisAnimator closes over it). Replacing the object instead of updating it
 * silently orphans every one of those subscriptions — the robot 3D model then
 * only gets new joint targets when React happens to re-render it.
 */
test("keeps property subscriptions alive across messages", () => {
  const { stream, source } = makeStream(jointsA)

  const heldMotionState = stream.rapidlyChangingMotionState
  const seen: number[][] = []
  const dispose = autorun(() => {
    seen.push([...heldMotionState.joint_position])
  })

  source.send(controllerState(jointsB))
  source.send(controllerState(jointsC))

  dispose()
  stream.dispose()

  expect(seen).toEqual([jointsA, jointsB, jointsC])
})

test("updates the motion state in place", () => {
  const { stream, source } = makeStream(jointsA)
  const heldMotionState = stream.rapidlyChangingMotionState

  source.send(controllerState(jointsB))

  expect(stream.rapidlyChangingMotionState).toBe(heldMotionState)
  expect([...stream.rapidlyChangingMotionState.joint_position]).toEqual(jointsB)

  stream.dispose()
})

test("skips updates when the robot has not moved", () => {
  const { stream, source } = makeStream(jointsA)
  const heldMotionState = stream.rapidlyChangingMotionState

  let runs = 0
  const dispose = autorun(() => {
    void heldMotionState.joint_position
    runs++
  })

  source.send(controllerState(jointsA))

  dispose()
  stream.dispose()

  // Only the autorun's own initial run: an unchanged pose must not notify
  // anyone, or every observer of the motion state rerenders on every message.
  expect(runs).toBe(1)
})

/**
 * A movement always *ends* with the robot standing still, so every execution
 * state that closes one out (END_OF_TRAJECTORY after a trajectory,
 * PAUSED_BY_USER and then no `execute` at all after a jog) arrives in messages
 * whose joint position is identical to the previous one. Gating those messages
 * on joint motion freezes `execute` at RUNNING for as long as the robot does
 * not move again, and `TrajectoryExecutionStore.start()` then refuses the next
 * pose with "Cannot start trajectory: robot is already running".
 */
test("applies execution state changes while the robot stands still", () => {
  const { stream, source } = makeStream(jointsA)
  const ms = stream.rapidlyChangingMotionState

  // Last message that still carried joint motion: the robot is moving
  source.send(controllerState(jointsB, undefined, "RUNNING"))
  expect((ms.execute?.details as { state: { kind: string } })?.state.kind).toBe(
    "RUNNING",
  )

  // Robot has come to rest; the movement ends without any further joint change
  source.send(controllerState(jointsB, undefined, "END_OF_TRAJECTORY"))
  expect((ms.execute?.details as { state: { kind: string } })?.state.kind).toBe(
    "END_OF_TRAJECTORY",
  )

  // ...and the field disappears entirely once nothing is being executed
  source.send(controllerState(jointsB))
  expect(ms.execute).toBeUndefined()

  stream.dispose()
})

test("leaves unchanged fields untouched so their observers do not fire", () => {
  const { stream, source } = makeStream(jointsA)
  const ms = stream.rapidlyChangingMotionState

  // Identity of a deep observable field is the observable signal: a fresh
  // object is never === the previous one, so reassigning it notifies every
  // observer of that field whether or not the value actually changed.
  const before = {
    joint_limit_reached: ms.joint_limit_reached,
    tcp_pose: ms.tcp_pose,
  }

  // Only the joints moved; everything else in the message is identical
  source.send(controllerState(jointsB))

  expect(ms.joint_limit_reached).toBe(before.joint_limit_reached)
  expect(ms.tcp_pose).toBe(before.tcp_pose)
  // ...while the field that did change is of course updated
  expect([...ms.joint_position]).toEqual(jointsB)

  stream.dispose()
})

test("drops a field the message no longer contains", () => {
  const { stream, source } = makeStream(jointsA)
  const ms = stream.rapidlyChangingMotionState
  expect(ms.tcp_pose).toBeDefined()

  const next = controllerState(jointsB)
  delete (next.motion_groups[0] as { tcp_pose?: unknown }).tcp_pose
  source.send(next)

  // Merging in place must not leave the previous pose behind reading as
  // current; an absent field is absent, as it was when the whole object was
  // replaced
  expect(ms.tcp_pose).toBeUndefined()

  stream.dispose()
})

test("unwraps the flange orientation against the previous pose", () => {
  const { stream, source } = makeStream(jointsA)
  const previous = [
    ...(stream.rapidlyChangingMotionState.flange_pose?.orientation as number[]),
  ]

  // Same physical orientation as the fixture's (~-pi about x) with every sign
  // flipped, which is how the backend expresses it once it crosses the domain
  // boundary. Unwrapping must keep the rotation vector continuous instead of
  // letting it jump by ~2pi, which would spin the model the long way round.
  const flipped = [
    3.1413887753705083, 0.0003197791888075772, -0.000959598168759525,
  ]

  source.send(controllerState(jointsB, flipped))

  const stored = stream.rapidlyChangingMotionState.flange_pose
    ?.orientation as number[]

  // Continuous with the previous pose, not ~2pi away from it like the raw value.
  expect(distance(stored, previous)).toBeLessThan(0.01)
  expect(distance(flipped, previous)).toBeGreaterThan(6)

  stream.dispose()
})

/**
 * The bottom pose field and the joints readout read `readoutState`. The UR on
 * longterm-1 reports joints that jitter by up to ~0.0002 rad while it stands
 * still, so every reading flickered them. Only the readout holds back: the
 * stored state keeps following the stream for everything that plans or saves.
 * Read here as a plain poll outside any reaction, like the jog controls do, so
 * the hold does not depend on which component happens to observe it.
 */
test("its readout holds while a standing robot's sensors jitter", () => {
  const { stream, source } = makeStream(jointsA)
  const shown = new Set([stream.readoutState.joint_position[0]])

  for (const noise of [0.00015, -0.00015, 0.0001, -0.0001]) {
    source.send(noisyReading(jointsA, noise))
    shown.add(stream.readoutState.joint_position[0])
  }

  expect([...shown]).toEqual([jointsA[0]])
  expect(stream.rapidlyChangingMotionState.joint_position[0]).toBeCloseTo(
    (jointsA[0] ?? 0) - 0.0001,
    8,
  )
  stream.dispose()
})

test("its readout follows a slow movement once it adds up", () => {
  const { stream, source } = makeStream(jointsA)
  const resting = stream.readoutState.joint_position[0] ?? 0

  // Far less per message than the noise filter lets through, polled every message
  let offset = 0
  let shown = 0
  for (let message = 0; message < 20; message++) {
    offset += 0.00005
    source.send(noisyReading(jointsA, offset))
    shown = (stream.readoutState.joint_position[0] ?? 0) - resting
  }

  expect(shown).toBeGreaterThan(0)
  expect(offset - shown).toBeLessThanOrEqual(0.0002 + 1e-12)
  stream.dispose()
})

test("its readout applies a TCP switch while the robot stands still", () => {
  const { stream, source } = makeStream(jointsA)
  expect(stream.readoutState.tcp).toBe("Flange")

  const reading = noisyReading(jointsA, 0)
  const [motionGroup] = reading.motion_groups
  if (!motionGroup) throw new Error("Fixture needs a motion group")
  motionGroup.tcp = "Gripper"
  motionGroup.tcp_pose = { position: [0, 0, 100], orientation: [0, 0, 0] }
  source.send(reading)

  expect(stream.readoutState.tcp).toBe("Gripper")
  expect(stream.readoutState.tcp_pose?.position).toEqual([0, 0, 100])
  stream.dispose()
})

test("reports a message without a controller state and keeps it as the last invalid one", () => {
  const { stream, source, onError } = makeStream(jointsA)

  source.dispatchEvent(new MessageEvent("message", { data: '{"nope":1}' }))

  expect(onError).toHaveBeenCalledWith(
    expect.objectContaining({ url: "ws://mock.example.com/api/nats" }),
  )
  expect(stream.lastInvalidStateMessage?.data).toBe('{"nope":1}')
  stream.dispose()
})

test("keeps the safety state and the mode as the controller reports them", () => {
  const { stream, source } = makeStream(jointsA)

  source.send({
    ...controllerState(jointsA),
    safety_state: "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
    mode: "MODE_MONITOR",
  } as unknown as RobotControllerState)

  expect(stream.controllerState.safety_state).toBe(
    "SAFETY_STATE_DEVICE_EMERGENCY_STOP",
  )
  expect(stream.controllerState.mode).toBe("MODE_MONITOR")
  stream.dispose()
})

test("calls the connection critical and reconnects when no state came for 3 s", () => {
  vi.useFakeTimers()
  const { stream, source } = makeStream(jointsA, { isVirtual: false })
  expect(stream.connectionQuality).toBe("good")

  vi.advanceTimersByTime(1500)
  expect(stream.connectionQuality).toBe("struggling")

  vi.advanceTimersByTime(2000)
  expect(stream.connectionQuality).toBe("critical")
  // A socket can stay open as a zombie, e.g. after the wifi dropped
  expect(source.reconnect).toHaveBeenCalled()

  source.send(controllerState(jointsB))
  vi.advanceTimersByTime(500)
  expect(stream.connectionQuality).toBe("good")
  stream.dispose()
})

test("gives a virtual robot more time, as its stream can be slower", () => {
  vi.useFakeTimers()
  const { stream } = makeStream(jointsA, { isVirtual: true })

  vi.advanceTimersByTime(2500)
  expect(stream.connectionQuality).toBe("good")

  vi.advanceTimersByTime(4000)
  expect(stream.connectionQuality).toBe("critical")
  stream.dispose()
})

test("the next motion state is the motion group's in the next message", async () => {
  const { stream, source } = makeStream(jointsA)

  const next = stream.nextMotionState()
  source.send(controllerState(jointsC))

  expect((await next).joint_position).toEqual(jointsC)
  stream.dispose()
})

test("NOVA's websocket source reads the controller state out of its messages", () => {
  const socket = Object.assign(new EventTarget(), {
    readyState: 1,
    url: "ws://nova/api/v2/cells/cell/controllers/ur5e/state-stream",
    firstMessage: vi.fn(),
    nextMessage: vi.fn(),
    reconnect: vi.fn(),
    close: vi.fn(),
  })
  const source = websocketControllerStateSource(socket)
  const state = controllerState(jointsA)

  // NOVA's websocket sends { result: <state> }
  expect(source.parse(JSON.stringify({ result: state }))).toEqual(state)
  expect(source.parse("not json")).toBeUndefined()
  expect(source.url).toBe(socket.url)
  source.reconnect()
  expect(socket.reconnect).toHaveBeenCalled()
})
