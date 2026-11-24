import { act, advance, createRoot, extend } from "@react-three/fiber"
import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import { observable, runInAction } from "mobx"
import type { ReactNode } from "react"
import * as THREE from "three"
import { afterEach, describe, expect, it, vi } from "vitest"
import { JoggingAxes } from "./JoggingAxes"

// drei's axes need WebGL: here a group that tells which axes it draws
vi.mock("@react-three/drei", () => ({
  PivotControls: (props: { children?: ReactNode; opacity?: number }) => (
    <group name="axes" userData={{ opacity: props.opacity }}>
      {props.children}
    </group>
  ),
}))

// <Canvas> does this; the test renders with createRoot
extend({ Group: THREE.Group })

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0))

const roots: ReturnType<typeof createRoot>[] = []

/** Renders into a React Three Fiber root without WebGL (nothing is drawn) */
async function renderInCanvas(element: ReactNode) {
  const canvas = document.createElement("canvas")
  const root = createRoot(canvas)
  await root.configure({
    gl: {
      render: () => {},
      setSize: () => {},
      setPixelRatio: () => {},
      domElement: canvas,
    } as unknown as THREE.WebGLRenderer,
    size: { width: 100, height: 100, top: 0, left: 0 },
    frameloop: "never",
  })
  let store: ReturnType<typeof root.render> | undefined
  await act(async () => {
    store = root.render(element)
    await nextTask()
  })
  roots.push(root)
  const state = store?.getState()
  if (!state) throw new Error("No scene")
  let time = state.clock.elapsedTime
  return {
    scene: state.scene,
    rerender: async (next: ReactNode) => {
      await act(async () => {
        root.render(next)
        await nextTask()
      })
    },
    /** Draws the frames of `seconds` at 60 frames per second */
    play: (seconds: number) => {
      for (let frame = 0; frame < seconds * 60; frame++) {
        time += 1 / 60
        advance(time, true, state)
      }
    },
  }
}

afterEach(async () => {
  for (const root of roots.splice(0)) {
    await act(async () => root.unmount())
  }
})

function motionState(flangeX: number) {
  return {
    joint_position: [0, 0, 0, 0, 0, 0],
    flange_pose: { position: [flangeX, 0, 300], orientation: [0, 0, 0] },
  } as unknown as MotionGroupState
}

/** Where the TCP's axes are, in m: the second of the two */
function tcpAxesPosition(scene: THREE.Object3D) {
  const axes: THREE.Object3D[] = []
  scene.traverse((object) => {
    if (object.name === "axes") axes.push(object)
  })
  scene.updateMatrixWorld(true)
  const tcpAxes = axes[1]
  if (!tcpAxes) throw new Error("No TCP axes")
  return tcpAxes
    .getWorldPosition(new THREE.Vector3())
    .toArray()
    .map((v) => Math.round(v * 1000) / 1000 || 0)
}

describe("JoggingAxes", () => {
  it("moves the TCP's axes with the flange, as a MobX store changes it in place", async () => {
    const state = observable(motionState(400))
    const { scene, play } = await renderInCanvas(
      <JoggingAxes rapidlyChangingMotionState={state} orientation="tool" />,
    )
    play(0.1)
    expect(tcpAxesPosition(scene)).toEqual([0.4, 0, 0.3])

    runInAction(() => {
      if (state.flange_pose?.position) state.flange_pose.position[0] = 500
    })
    play(2)

    expect(tcpAxesPosition(scene)).toEqual([0.5, 0, 0.3])
  })

  it("moves the TCP's axes with the flange of a new motion state", async () => {
    const { scene, rerender, play } = await renderInCanvas(
      <JoggingAxes
        rapidlyChangingMotionState={motionState(400)}
        orientation="tool"
      />,
    )

    await rerender(
      <JoggingAxes
        rapidlyChangingMotionState={motionState(600)}
        orientation="tool"
      />,
    )
    play(2)

    expect(tcpAxesPosition(scene)).toEqual([0.6, 0, 0.3])
  })

  it("puts the TCP's axes at the TCP's offset from the flange, in the flange's frame", async () => {
    // The flange faces down, as a robot's flange over a table does
    const state = motionState(400)
    if (state.flange_pose) state.flange_pose.orientation = [Math.PI, 0, 0]
    const { scene, play } = await renderInCanvas(
      <JoggingAxes
        rapidlyChangingMotionState={state}
        tcpOffset={{ position: [0, 0, 150], orientation: [0, 0, 0] }}
        orientation="tool"
      />,
    )
    play(0.1)

    expect(tcpAxesPosition(scene)).toEqual([0.4, 0, 0.15])
  })
})
