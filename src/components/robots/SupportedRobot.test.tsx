import { act, createRoot, extend } from "@react-three/fiber"
import {
  type DHParameter,
  JointTypeEnum,
  type MotionGroupState,
  Nova,
} from "@wandelbots/nova-js/v2"
import type { ReactNode } from "react"
import * as THREE from "three"
import { afterEach, describe, expect, test, vi } from "vitest"
import type { ConnectedMotionGroup } from "../../lib/ConnectedMotionGroup"
import { LinearAxis } from "./LinearAxis"
import { Robot } from "./Robot"
import { SupportedLinearAxisExact } from "./SupportedLinearAxis"
import { SupportedRobotExact } from "./SupportedRobot"

// useGLTF of drei downloads and parses the model file: here, the test gives
// the model
const gltf = vi.hoisted(() => ({
  load: (_url: string): unknown => undefined,
}))
vi.mock("@react-three/drei", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@react-three/drei")>()),
  useGLTF: (url: string) => gltf.load(url),
}))

// <Canvas> does this; the test renders with createRoot
extend({
  Group: THREE.Group,
  Mesh: THREE.Mesh,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  SphereGeometry: THREE.SphereGeometry,
})

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

/** useGLTF suspends (as during a download) until `finish()` */
function modelDownload(model: unknown) {
  let done = false
  let resolve = () => {}
  const downloaded = new Promise<void>((r) => {
    resolve = r
  })
  return {
    load: () => {
      if (!done) throw downloaded
      return model
    },
    finish: () => {
      done = true
      resolve()
    },
  }
}

function standstill(joints: number[]): MotionGroupState {
  return {
    motion_group: "0@test",
    controller: "test",
    joint_position: joints,
    joint_limit_reached: { limit_reached: joints.map(() => false) },
    standstill: true,
    sequence_number: 0,
    timestamp: "2026-11-03T00:00:00Z",
    description_revision: 0,
  }
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

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0))

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
  // biome-ignore lint/style/noNonNullAssertion: set in act
  return store!.getState().scene
}

const roots: ReturnType<typeof createRoot>[] = []

/** Renders a new element into the root of the last renderInCanvas */
async function rerender(element: ReactNode) {
  const root = roots[roots.length - 1]
  await act(async () => {
    root.render(element)
    await nextTask()
  })
}

afterEach(async () => {
  for (const root of roots.splice(0)) {
    await act(async () => root.unmount())
  }
})

describe("postModelRender", () => {
  test("runs when the loaded robot model shows the joint positions", async () => {
    const joints = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
    const download = modelDownload(modelWithJoints("robot", 6))
    gltf.load = download.load
    const jointsAtPostModelRender: number[][] = []
    let scene: THREE.Scene | undefined
    const postModelRender = vi.fn(() => {
      jointsAtPostModelRender.push(
        joints.map(
          (_, index) =>
            scene?.getObjectByName(`robot_J0${index}`)?.rotation.y ?? NaN,
        ),
      )
    })

    scene = await renderInCanvas(
      <SupportedRobotExact
        modelFromController="TestRobot"
        dhParameters={dhParameters(6, JointTypeEnum.RevoluteJoint)}
        rapidlyChangingMotionState={standstill(joints)}
        getModel={() => Promise.resolve("blob:robot")}
        postModelRender={postModelRender}
      />,
    )
    // The model URL is known: the model "downloads"
    await act(async () => {
      download.finish()
      await nextTask()
    })

    expect(postModelRender).toHaveBeenCalledTimes(1)
    expect(jointsAtPostModelRender[0]).toEqual(joints)
  })

  test("runs when the loaded linear axis model shows the joint position", async () => {
    const download = modelDownload(modelWithJoints("axis", 1))
    gltf.load = download.load
    const positionsAtPostModelRender: number[] = []
    let scene: THREE.Scene | undefined
    const postModelRender = vi.fn(() => {
      positionsAtPostModelRender.push(
        scene?.getObjectByName("axis_J00")?.position.y ?? NaN,
      )
    })

    scene = await renderInCanvas(
      <SupportedLinearAxisExact
        modelFromController="TestAxis"
        dhParameters={dhParameters(1, JointTypeEnum.PrismaticJoint)}
        rapidlyChangingMotionState={standstill([250])}
        getModel={() => Promise.resolve("blob:axis")}
        postModelRender={postModelRender}
      />,
    )
    await act(async () => {
      download.finish()
      await nextTask()
    })

    expect(postModelRender).toHaveBeenCalledTimes(1)
    // Millimetres in the motion state, metres in the scene
    expect(positionsAtPostModelRender[0]).toBe(0.25)
  })
})

describe("the model of Robot", () => {
  test("comes from the instance of its ConnectedMotionGroup, with the client of the connection", async () => {
    const nova = new Nova({
      instanceUrl: "https://mock.example.com",
      accessToken: "token-of-the-app",
    })
    const downloadModel = vi
      .spyOn(nova.api.motionGroupModels, "getMotionGroupGlbModel")
      .mockResolvedValue(new File([], "robot.glb"))
    const createObjectURL = URL.createObjectURL
    URL.createObjectURL = vi.fn(() => "blob:robot-of-the-connection")
    gltf.load = () => modelWithJoints("robot", 6)
    const motionGroup = {
      nova,
      modelFromController: "Robot_Of_The_Connection",
      dhParameters: dhParameters(6, JointTypeEnum.RevoluteJoint),
      rapidlyChangingMotionState: standstill([0, 0, 0, 0, 0, 0]),
      mountingPosition: [0, 0, 0],
      mountingQuaternion: new THREE.Quaternion(),
    } as unknown as ConnectedMotionGroup

    try {
      await renderInCanvas(<Robot connectedMotionGroup={motionGroup} />)

      expect(downloadModel).toHaveBeenCalledWith("Robot_Of_The_Connection", {
        responseType: "blob",
      })
    } finally {
      URL.createObjectURL = createObjectURL
    }
  })
})

describe("the model of a linear axis", () => {
  // A failed download leaves the cache of defaultGetModel: a call at every
  // render would start a new download at every render
  test("SupportedLinearAxisExact asks getModel once, not at every render", async () => {
    gltf.load = () => modelWithJoints("axis", 1)
    const getModel = vi.fn(() => Promise.resolve("blob:axis"))
    const axis = (position: number) => (
      <SupportedLinearAxisExact
        modelFromController="TestAxis"
        dhParameters={dhParameters(1, JointTypeEnum.PrismaticJoint)}
        rapidlyChangingMotionState={standstill([position])}
        getModel={getModel}
      />
    )

    await renderInCanvas(axis(100))
    await rerender(axis(200))

    expect(getModel).toHaveBeenCalledTimes(1)
  })

  test("LinearAxis asks getModel once, not at every render", async () => {
    gltf.load = () => modelWithJoints("axis", 1)
    const getModel = vi.fn(() => Promise.resolve("blob:axis"))
    const axis = (position: number) => {
      const motionGroup = {
        modelFromController: "TestAxis",
        dhParameters: dhParameters(1, JointTypeEnum.PrismaticJoint),
        rapidlyChangingMotionState: standstill([position]),
        mountingPosition: [0, 0, 0],
        mountingQuaternion: new THREE.Quaternion(),
      } as unknown as ConnectedMotionGroup
      return (
        <LinearAxis connectedMotionGroup={motionGroup} getModel={getModel} />
      )
    }

    await renderInCanvas(axis(100))
    await rerender(axis(200))

    expect(getModel).toHaveBeenCalledTimes(1)
  })
})
