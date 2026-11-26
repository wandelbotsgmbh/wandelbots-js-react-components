import { act, createRoot, extend } from "@react-three/fiber"
import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import { createRef, type ReactNode } from "react"
import * as THREE from "three"
import { afterEach, describe, expect, it, vi } from "vitest"
import { MODEL_ROTATION } from "../robots/modelRotation"
import type { RobotModelSource } from "../robots/robotModelSource"
import { RobotSceneView } from "./RobotSceneView"

// The robot as a group that tells what it was given: its model is tested
// with the robots
vi.mock("../robots/MotionGroupVisualizer", () => {
  const drawn = (name: string) =>
    function Drawn(props: {
      rapidlyChangingMotionState: MotionGroupState
      transparentColor?: string
    }) {
      return (
        <group
          name={props.transparentColor ? "ghost" : name}
          userData={{ joints: props.rapidlyChangingMotionState.joint_position }}
        />
      )
    }
  return {
    MotionGroupVisualizer: drawn("robot"),
    MotionGroupVisualizerExact: drawn("robot (exact)"),
  }
})
// Its light needs WebGL
vi.mock("../3d-viewport/PresetEnvironment", () => ({
  PresetEnvironment: () => null,
}))

// <Canvas> does this; the test renders with createRoot
extend({ Group: THREE.Group, DirectionalLight: THREE.DirectionalLight })

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

/** A robot mounted 1 m along NOVA's X and turned 90° about NOVA's Z */
const robot: RobotModelSource = {
  modelFromController: "UniversalRobots_UR5e",
  dhParameters: [{}],
  inverseSolver: "UR",
  rapidlyChangingMotionState: {
    joint_position: [0, 0, 0, 0, 0, 0],
  } as unknown as MotionGroupState,
  mountingPosition: [1, 0, 0],
  mountingQuaternion: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    Math.PI / 2,
  ),
}

function objectNamed(scene: THREE.Object3D, name: string) {
  const object = scene.getObjectByName(name)
  if (!object) throw new Error(`Nothing named "${name}" is drawn`)
  return object
}

/** Whether the object is visible, as its parents decide it too */
function isShown(object: THREE.Object3D | null): boolean {
  return !object || (object.visible && isShown(object.parent))
}

describe("RobotSceneView", () => {
  it("draws the robot at its mounting, turned from its model's Y up to NOVA's Z up, and the app's parts in NOVA's frame", async () => {
    const robotRef = createRef<THREE.Group>()
    const { scene } = await renderInCanvas(
      <RobotSceneView robot={robot} robotRef={robotRef}>
        <group name="app's part" />
      </RobotSceneView>,
    )
    scene.updateMatrixWorld(true)

    const model = objectNamed(scene, "robot")
    const position = model.getWorldPosition(new THREE.Vector3())
    expect(position.toArray().map((v) => +v.toFixed(6))).toEqual([1, 0, 0])
    const turned = robot.mountingQuaternion
      ?.clone()
      .multiply(new THREE.Quaternion().setFromEuler(MODEL_ROTATION))
    if (!turned) throw new Error("No mounting")
    expect(
      model.getWorldQuaternion(new THREE.Quaternion()).angleTo(turned),
    ).toBeCloseTo(0)

    // The app gets the group at the mounting, and draws its parts in NOVA's
    // frame, not the robot's
    expect(robotRef.current?.getObjectByName("robot")).toBe(model)
    const appPart = objectNamed(scene, "app's part")
    expect(appPart.getWorldPosition(new THREE.Vector3()).length()).toBe(0)
    expect(
      appPart
        .getWorldQuaternion(new THREE.Quaternion())
        .angleTo(new THREE.Quaternion()),
    ).toBeCloseTo(0)
  })

  it("draws the ghost of a planned motion at the robot's mounting, also while the robot is hidden", async () => {
    const { scene, rerender } = await renderInCanvas(
      <RobotSceneView robot={robot} />,
    )
    expect(scene.getObjectByName("ghost")).toBeUndefined()

    const planned = [0.5, -0.2, 0.3, 0, 0.1, 0]
    await rerender(
      <RobotSceneView
        robot={robot}
        plannedJoints={planned}
        robotVisible={false}
      />,
    )
    scene.updateMatrixWorld(true)

    const ghost = objectNamed(scene, "ghost")
    expect(ghost.userData.joints).toEqual(planned)
    expect(
      ghost
        .getWorldPosition(new THREE.Vector3())
        .toArray()
        .map((v) => +v.toFixed(6)),
    ).toEqual([1, 0, 0])
    expect(isShown(ghost)).toBe(true)
    expect(isShown(objectNamed(scene, "robot"))).toBe(false)
  })
})
