import { act, createRoot, extend } from "@react-three/fiber"
import {
  type DHParameter,
  JointTypeEnum,
  type MotionGroupState,
} from "@wandelbots/nova-js/v2"
import { observable, runInAction } from "mobx"
import type { ReactNode } from "react"
import * as THREE from "three"
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { ValueInterpolator } from "../utils/interpolation"
import {
  MotionGroupVisualizer,
  MotionGroupVisualizerExact,
} from "./MotionGroupVisualizer"
import {
  SupportedLinearAxis,
  SupportedLinearAxisExact,
} from "./SupportedLinearAxis"
import { SupportedRobot, SupportedRobotExact } from "./SupportedRobot"
import { useFrameSmoothedMotionState } from "./useFrameSmoothedMotionState"

// useGLTF of drei downloads and parses the model file: here, the test gives
// the model at once
const gltf = vi.hoisted(() => ({ model: undefined as unknown }))
vi.mock("@react-three/drei", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@react-three/drei")>()),
  useGLTF: () => gltf.model,
}))

// <Canvas> does this; the test renders with createRoot
extend({ Group: THREE.Group, Mesh: THREE.Mesh })

/**
 * The browser's animation frames, run by hand: a frame runs the callbacks
 * requested before it in the order they were requested, as a browser does,
 * and `performance.now()` is the time of the frame.
 */
const browser = {
  now: 0,
  nextId: 1,
  callbacks: new Map<number, FrameRequestCallback>(),
}

function frameAt(at: number) {
  browser.now = at
  for (const id of [...browser.callbacks.keys()]) {
    const callback = browser.callbacks.get(id)
    // Cancelled by a callback before it
    if (!callback) continue
    browser.callbacks.delete(id)
    callback(at)
  }
}

/** Runs frames every `interval` ms until nothing asks for a frame */
function framesUntilIdle(interval = 8, limit = 2000) {
  let count = 0
  while (browser.callbacks.size > 0) {
    if (++count > limit) throw new Error(`Still drawing after ${limit} frames`)
    frameAt(browser.now + interval)
  }
}

beforeEach(() => {
  browser.now = 0
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true)
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    const id = browser.nextId++
    browser.callbacks.set(id, callback)
    return id
  })
  vi.stubGlobal("cancelAnimationFrame", (id: number) => {
    browser.callbacks.delete(id)
  })
  vi.spyOn(performance, "now").mockImplementation(() => browser.now)
})

const roots: ReturnType<typeof createRoot>[] = []

afterEach(async () => {
  for (const root of roots.splice(0)) {
    await act(async () => root.unmount())
  }
  // R3F's frame loop is shared by its roots: run it out, so that the next
  // test's root starts it again
  framesUntilIdle()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0))

/**
 * Renders into a React Three Fiber root that draws on demand, as RobotCanvas
 * does, without WebGL: each frame R3F draws calls `draw` with the scene
 */
async function renderInCanvas(
  element: ReactNode,
  draw: (scene: THREE.Scene) => void,
) {
  const canvas = document.createElement("canvas")
  const root = createRoot(canvas)
  roots.push(root)
  await root.configure({
    gl: {
      render: (scene: THREE.Scene) => draw(scene),
      setSize: () => {},
      setPixelRatio: () => {},
      domElement: canvas,
    } as unknown as THREE.WebGLRenderer,
    size: { width: 100, height: 100, top: 0, left: 0 },
    frameloop: "demand",
  })
  await act(async () => {
    root.render(element)
    // The model URL resolves, then the model mounts
    await nextTask()
    await nextTask()
  })
  framesUntilIdle()
}

/** A model as drei loads it: nested joints (`_J00`, ...) and a flange */
function modelWithJoints(name: string, jointCount: number) {
  const scene = new THREE.Group()
  let parent: THREE.Object3D = scene
  for (let index = 0; index < jointCount; index++) {
    const joint = new THREE.Group()
    joint.name = `${name}_J0${index}`
    parent.add(joint)
    parent = joint
  }
  const flange = new THREE.Group()
  flange.name = `${name}_FLG`
  parent.add(flange)
  return { scene }
}

function dhParameters(count: number, type: JointTypeEnum): DHParameter[] {
  return Array.from({ length: count }, () => ({
    a: 0,
    d: 0,
    alpha: 0,
    theta: 0,
    reverse_rotation_direction: false,
    type,
  }))
}

/** A motion state as the controller's state stream holds it: observable, changed in place */
function streamedState(joints: number[]): MotionGroupState {
  return observable({
    motion_group: "0@test",
    controller: "test",
    joint_position: joints,
    joint_limit_reached: { limit_reached: joints.map(() => false) },
    standstill: true,
    sequence_number: 0,
    timestamp: "2026-11-24T00:00:00Z",
    description_revision: 0,
  })
}

/** A new message of the stream, at the current time */
function receive(state: MotionGroupState, joints: number[]) {
  runInAction(() => {
    state.joint_position = joints
    state.sequence_number += 1
    state.standstill = false
  })
}

type Visualizer = {
  name: string
  joints: number[]
  /** The model that useGLTF gives */
  model: () => unknown
  render: (state: MotionGroupState) => ReactNode
  /** The value of the first joint that the scene shows, in the joint's unit */
  drawnJoint: (scene: THREE.Scene) => number
}

const robotProps = {
  modelFromController: "TestRobot",
  dhParameters: dhParameters(6, JointTypeEnum.RevoluteJoint),
  getModel: () => Promise.resolve("blob:robot"),
}
const axisProps = {
  modelFromController: "TestAxis",
  dhParameters: dhParameters(1, JointTypeEnum.PrismaticJoint),
  getModel: () => Promise.resolve("blob:axis"),
}

function robotJoint(scene: THREE.Scene) {
  const joint = scene.getObjectByName("robot_J00")
  if (!joint) throw new Error("The robot model is not drawn")
  return joint.rotation.y
}

function axisJoint(scene: THREE.Scene) {
  const joint = scene.getObjectByName("axis_J00")
  if (!joint) throw new Error("The axis model is not drawn")
  // Millimetres, as the motion state gives them
  return joint.position.y * 1000
}

const robot = {
  joints: [0, 0, 0, 0, 0, 0],
  model: () => modelWithJoints("robot", 6),
  drawnJoint: robotJoint,
}
const axis = {
  joints: [0],
  model: () => modelWithJoints("axis", 1),
  drawnJoint: axisJoint,
}

const smoothedVisualizers: Visualizer[] = [
  {
    name: "SupportedRobot",
    ...robot,
    render: (state) => (
      <SupportedRobot {...robotProps} rapidlyChangingMotionState={state} />
    ),
  },
  {
    name: "SupportedLinearAxis",
    ...axis,
    render: (state) => (
      <SupportedLinearAxis {...axisProps} rapidlyChangingMotionState={state} />
    ),
  },
  {
    name: "MotionGroupVisualizer",
    ...robot,
    render: (state) => (
      <MotionGroupVisualizer
        {...robotProps}
        instanceUrl=""
        inverseSolver="TestSolver"
        rapidlyChangingMotionState={state}
      />
    ),
  },
]

const exactVisualizers: Visualizer[] = [
  {
    name: "SupportedRobotExact",
    ...robot,
    render: (state) => (
      <SupportedRobotExact {...robotProps} rapidlyChangingMotionState={state} />
    ),
  },
  {
    name: "SupportedLinearAxisExact",
    ...axis,
    render: (state) => (
      <SupportedLinearAxisExact
        {...axisProps}
        rapidlyChangingMotionState={state}
      />
    ),
  },
  {
    name: "MotionGroupVisualizerExact",
    ...robot,
    render: (state) => (
      <MotionGroupVisualizerExact
        {...robotProps}
        instanceUrl=""
        inverseSolver="TestSolver"
        rapidlyChangingMotionState={state}
      />
    ),
  },
]

type Drawn = { at: number; joint: number }

/** Mounts the visualizer and records the first joint of each drawn frame */
async function mount(visualizer: Visualizer) {
  gltf.model = visualizer.model()
  const state = streamedState(visualizer.joints)
  const drawn: Drawn[] = []
  await renderInCanvas(visualizer.render(state), (scene) => {
    drawn.push({ at: browser.now, joint: visualizer.drawnJoint(scene) })
  })
  return { state, drawn }
}

/** The spring the smoothed visualizers step: its default options */
function referenceSpring(joints: number[]) {
  return new ValueInterpolator(joints)
}

const closeTo = (value: number) => expect.closeTo(value, 9)

describe.each(smoothedVisualizers)("$name", (visualizer) => {
  test("draws in each frame the spring's value at the time of that frame", async () => {
    const { state, drawn } = await mount(visualizer)
    const spring = referenceSpring(visualizer.joints)
    const target = (at: number) => {
      const joints = [...visualizer.joints]
      // Jogging: the first joint moves at a steady speed, so the spring
      // never settles
      joints[0] = (at - 990) * 0.002
      return joints
    }

    // A stream message every 10 ms, frames at uneven intervals between them
    const messages = Array.from({ length: 30 }, (_, index) => 1000 + index * 10)
    const intervals = [8.3, 9.1, 7.6, 8.8, 6.9, 9.4]
    const frames: number[] = []
    for (let at = 1000; frames.length < 30; ) {
      at += intervals[frames.length % intervals.length]
      frames.push(at)
    }

    const expected: Drawn[] = []
    const events = [
      ...messages.map((at) => ({ at, message: true })),
      ...frames.map((at) => ({ at, message: false })),
    ].sort((a, b) => a.at - b.at)
    let lastStep = 1000
    for (const event of events) {
      if (event.message) {
        browser.now = event.at
        receive(state, target(event.at))
        spring.setTarget(target(event.at))
      } else {
        frameAt(event.at)
        spring.update((event.at - lastStep) / 1000)
        lastStep = event.at
        expected.push({ at: event.at, joint: closeTo(spring.getValue(0)) })
      }
    }

    // Each frame drawn, each showing the spring of its own time: never the
    // spring of a frame before it, and never two steps at once
    expect(drawn.filter(({ at }) => at > 1000)).toEqual(expected)
  })

  test("starts the spring when the target arrives, not when the canvas last drew", async () => {
    const { state, drawn } = await mount(visualizer)
    const spring = referenceSpring(visualizer.joints)
    const target = [...visualizer.joints]
    target[0] = 1

    // The canvas has not drawn for seconds when the robot starts to move
    browser.now = 5000
    receive(state, target)
    spring.setTarget(target)
    frameAt(5008)
    spring.update(0.008)

    expect(drawn.at(-1)).toEqual({
      at: 5008,
      joint: closeTo(spring.getValue(0)),
    })
  })
})

describe("the canvas of a smoothed visualizer", () => {
  test("draws while the spring moves and stops once it settled, until the next target", async () => {
    const [visualizer] = smoothedVisualizers
    const { state, drawn } = await mount(visualizer)

    let from = 0
    for (const value of [0.2, -0.1]) {
      const target = [...visualizer.joints]
      target[0] = value
      const start = browser.now + 1000
      browser.now = start
      receive(state, target)

      framesUntilIdle(8)

      const springFrames = framesToSettle(from, value)
      const frames = drawn.filter(({ at }) => at > start)
      // Every frame of the motion is drawn, one after the other. The frame
      // that drew the settled pose may ask for one more, as any change made
      // in R3F's frame loop does; then the canvas rests.
      expect(frames.slice(0, springFrames).map(({ at }) => at)).toEqual(
        Array.from(
          { length: springFrames },
          (_, index) => start + 8 * (index + 1),
        ),
      )
      expect(frames.length).toBeLessThanOrEqual(springFrames + 1)
      expect(frames.at(-1)?.joint).toBe(value)
      expect(browser.callbacks.size).toBe(0)
      from = value
    }
  })

  test("is kept drawing by the spring itself, not only by what the joints change", async () => {
    const state = streamedState([0])
    let smoothed: MotionGroupState | undefined
    function JointReader() {
      smoothed = useFrameSmoothedMotionState(state)
      return null
    }
    const drawn: number[] = []
    await renderInCanvas(<JointReader />, () => {
      drawn.push(smoothed?.joint_position[0] ?? Number.NaN)
    })
    drawn.length = 0

    browser.now = 1000
    receive(state, [0.2])
    framesUntilIdle(8)

    // Nothing here invalidates when the joints change, as the animators do:
    // the spring asks for each frame of its motion, and none after it settled
    expect(drawn).toHaveLength(framesToSettle(0, 0.2))
    expect(drawn.at(-1)).toBe(0.2)
  })
})

/** How many frames of 8 ms the spring needs from one value to another */
function framesToSettle(from: number, to: number) {
  const spring = referenceSpring([from])
  spring.setTarget([to])
  let frames = 1
  while (!spring.update(0.008)) frames++
  return frames
}

describe.each(exactVisualizers)("$name", (visualizer) => {
  test("draws the pose it is given in the next frame, unsmoothed", async () => {
    const { state, drawn } = await mount(visualizer)
    const target = [...visualizer.joints]
    target[0] = 0.5

    browser.now = 1000
    receive(state, target)
    frameAt(1008)

    expect(drawn.at(-1)).toEqual({ at: 1008, joint: closeTo(0.5) })
    framesUntilIdle()
    expect(drawn.at(-1)?.joint).toBeCloseTo(0.5, 9)
  })
})
