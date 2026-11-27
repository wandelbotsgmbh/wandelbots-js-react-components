import { act, createRoot, extend } from "@react-three/fiber"
import {
  type DHParameter,
  JointTypeEnum,
  type MotionGroupState,
} from "@wandelbots/nova-js/v2"
import type { ReactNode } from "react"
import * as THREE from "three"
import { afterEach, describe, expect, it } from "vitest"
import LinearAxisAnimator from "./LinearAxisAnimator"

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
  const scene = store?.getState().scene
  if (!scene) throw new Error("No scene")
  return {
    scene,
    rerender: async (next: ReactNode) => {
      await act(async () => {
        root.render(next)
        await nextTask()
      })
    },
  }
}

afterEach(async () => {
  for (const root of roots.splice(0)) {
    await act(async () => root.unmount())
  }
})

const row = (type: JointTypeEnum): DHParameter => ({
  a: 0,
  d: 0,
  alpha: 0,
  theta: 0,
  reverse_rotation_direction: false,
  type,
})

/** A plain motion state, as an app passes one that is no MobX store */
const state = (joints: number[]) =>
  ({ joint_position: joints }) as unknown as MotionGroupState

/** A linear axis carrying a revolute joint: the first row decides the type */
const MIXED_CHAIN = [
  row(JointTypeEnum.PrismaticJoint),
  row(JointTypeEnum.RevoluteJoint),
]

const axis = (joints: number[]) => (
  <LinearAxisAnimator
    rapidlyChangingMotionState={state(joints)}
    dhParameters={MIXED_CHAIN}
  >
    <group name="axis_J00" />
    <group name="axis_J01" />
  </LinearAxisAnimator>
)

describe("LinearAxisAnimator", () => {
  it("slides the carriage along its axis, in metres", async () => {
    const { scene } = await renderInCanvas(axis([250, 0]))

    expect(scene.getObjectByName("axis_J00")?.position.y).toBe(0.25)
  })

  it("follows a new plain motion state, not only a MobX store", async () => {
    const { scene, rerender } = await renderInCanvas(axis([250, 0]))

    await rerender(axis([500, 0]))

    expect(scene.getObjectByName("axis_J00")?.position.y).toBe(0.5)
  })

  // A revolute joint of the chain is drawn at its rest pose: sliding it
  // would move the link along its own axis
  it("slides only the prismatic joints of a mixed chain", async () => {
    const { scene } = await renderInCanvas(axis([250, 1.5]))

    expect(scene.getObjectByName("axis_J01")?.position.y).toBe(0)
  })
})
