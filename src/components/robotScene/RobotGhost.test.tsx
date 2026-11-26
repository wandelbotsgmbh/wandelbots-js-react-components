import { act, createRoot, extend } from "@react-three/fiber"
import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import { createRef, type ReactNode, type Ref } from "react"
import * as THREE from "three"
import { afterEach, describe, expect, it, vi } from "vitest"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { MODEL_ROTATION } from "../robots/modelRotation"
import type { RobotModelSource } from "../robots/robotModelSource"
import { RobotGhost } from "./RobotGhost"

// The robot as a group that tells what it was given: its model and its ghost
// style are tested with the robots (SupportedRobot.test.tsx)
vi.mock("../robots/MotionGroupVisualizer", () => ({
  MotionGroupVisualizerExact: (props: {
    rapidlyChangingMotionState: MotionGroupState
    modelFromController: string
    transparentColor?: string
    transparentOpacity?: number
    flangeRef?: Ref<THREE.Group>
  }) => (
    <group
      name="ghost"
      userData={{
        joints: props.rapidlyChangingMotionState.joint_position,
        model: props.modelFromController,
        color: props.transparentColor,
        opacity: props.transparentOpacity,
      }}
    >
      <group name="flange" ref={props.flangeRef} />
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
  const scene = store?.getState().scene
  if (!scene) throw new Error("No scene")
  scene.updateMatrixWorld(true)
  return scene
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

const rounded = (vector: THREE.Vector3) =>
  vector.toArray().map((value) => +value.toFixed(6))

function ghosts(scene: THREE.Object3D) {
  const found: THREE.Object3D[] = []
  scene.traverse((object) => {
    if (object.name === "ghost") found.push(object)
  })
  return found
}

describe("RobotGhost", () => {
  it("draws the robot at the given joints in its colour and opacity, at the robot's mounting, turned from its model's Y up to NOVA's Z up", async () => {
    const joints = [0.5, -0.2, 0.3, 0, 0.1, 0]
    const scene = await renderInCanvas(
      <RobotGhost
        robot={robot}
        joints={joints}
        color="#ff0000"
        opacity={0.5}
      />,
    )

    const [ghost] = ghosts(scene)
    if (!ghost) throw new Error("No ghost is drawn")
    expect(ghost.userData).toEqual({
      joints,
      model: "UniversalRobots_UR5e",
      color: "#ff0000",
      opacity: 0.5,
    })
    expect(rounded(ghost.getWorldPosition(new THREE.Vector3()))).toEqual([
      1, 0, 0,
    ])
    const turned = robot.mountingQuaternion
      ?.clone()
      .multiply(new THREE.Quaternion().setFromEuler(MODEL_ROTATION))
    if (!turned) throw new Error("No mounting")
    expect(
      ghost.getWorldQuaternion(new THREE.Quaternion()).angleTo(turned),
    ).toBeCloseTo(0)
  })

  it("draws as many ghosts of one robot as the app gives, each its own", async () => {
    const scene = await renderInCanvas(
      <>
        <RobotGhost robot={robot} joints={[0, 0, 0, 0, 0, 0]} color="blue" />
        <RobotGhost
          robot={robot}
          joints={[1, 1, 1, 1, 1, 1]}
          color="grey"
          opacity={0.6}
        />
      </>,
    )

    expect(
      ghosts(scene).map(({ userData }) => [
        userData.color,
        userData.opacity,
        userData.joints[0],
      ]),
    ).toEqual([
      ["blue", undefined, 0],
      ["grey", 0.6, 1],
    ])
  })

  it("draws the robot of a session", async () => {
    const session = {
      nova: undefined,
      description: {
        motionGroupModel: "FANUC_CRX25iA",
        dhParameters: [{}],
        inverseSolver: "FANUC",
        mounting: { position: [0, 2000, 0], orientation: [0, 0, 0] },
      },
      state: { rapidlyChangingMotionState: robot.rapidlyChangingMotionState },
    } as unknown as RobotSession

    const scene = await renderInCanvas(
      <RobotGhost session={session} joints={[0.2]} color="#00ff00" />,
    )

    const [ghost] = ghosts(scene)
    expect(ghost?.userData.model).toBe("FANUC_CRX25iA")
    expect(ghost?.userData.joints).toEqual([0.2])
    // The mounting in millimetres, the scene in metres
    expect(
      ghost && rounded(ghost.getWorldPosition(new THREE.Vector3())),
    ).toEqual([0, 2, 0])
  })

  it("gives the app its flange, to draw a part of its own there", async () => {
    const flange = createRef<THREE.Group>()
    const scene = await renderInCanvas(
      <RobotGhost
        robot={robot}
        joints={[0, 0, 0, 0, 0, 0]}
        color="#00ff00"
        flangeRef={flange}
      />,
    )

    expect(flange.current).toBe(scene.getObjectByName("flange"))
  })

  it("draws nothing for a robot without DH parameters", async () => {
    const scene = await renderInCanvas(
      <RobotGhost
        robot={{ ...robot, dhParameters: undefined }}
        joints={[0]}
        color="#00ff00"
      />,
    )

    expect(ghosts(scene)).toEqual([])
  })
})
