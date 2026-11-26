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
import { defaultGetModel } from "./robotModelLogic"
import { SupportedLinearAxisExact } from "./SupportedLinearAxis"
import { SupportedRobotExact } from "./SupportedRobot"

// The robots' default model download, counted: it downloads as it is
vi.mock("./robotModelLogic", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./robotModelLogic")>()
  return { ...actual, defaultGetModel: vi.fn(actual.defaultGetModel) }
})

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

describe("transparentColor", () => {
  /** A model with a mesh on its first joint, in a material of its own */
  function modelWithMesh(name: string, jointCount: number) {
    const model = modelWithJoints(name, jointCount)
    const material = new THREE.MeshStandardMaterial({ color: "#808080" })
    const link = new THREE.Mesh(new THREE.SphereGeometry(0.1), material)
    link.name = `${name}_link`
    model.scene.getObjectByName(`${name}_J00`)?.add(link)
    return { model, material }
  }

  /** The meshes that draw a colour: shown, with a material that writes it */
  function coloredMeshes(scene: THREE.Object3D) {
    const meshes: THREE.Mesh<THREE.BufferGeometry, THREE.Material>[] = []
    scene.traverseVisible((object) => {
      if (
        object instanceof THREE.Mesh &&
        object.material instanceof THREE.Material &&
        object.material.colorWrite
      ) {
        meshes.push(object)
      }
    })
    return meshes
  }

  test.each([
    {
      name: "robot",
      draw: (color: string) => (
        <SupportedRobotExact
          modelFromController="TestRobot"
          dhParameters={dhParameters(2, JointTypeEnum.RevoluteJoint)}
          rapidlyChangingMotionState={standstill([0, 0])}
          getModel={() => Promise.resolve("blob:robot")}
          transparentColor={color}
        />
      ),
    },
    {
      name: "axis",
      draw: (color: string) => (
        <SupportedLinearAxisExact
          modelFromController="TestAxis"
          dhParameters={dhParameters(1, JointTypeEnum.PrismaticJoint)}
          rapidlyChangingMotionState={standstill([0])}
          getModel={() => Promise.resolve("blob:axis")}
          transparentColor={color}
        />
      ),
    },
  ])("draws the $name as a see-through ghost once its model has loaded, and leaves its model's materials to the other robots", async ({
    name,
    draw,
  }) => {
    const { model, material } = modelWithMesh(name, name === "axis" ? 1 : 2)
    const download = modelDownload(model)
    gltf.load = download.load

    const scene = await renderInCanvas(draw("#00ff00"))
    await act(async () => {
      download.finish()
      await nextTask()
    })

    const colored = coloredMeshes(scene)
    expect(colored).toHaveLength(1)
    expect(colored[0]?.material.transparent).toBe(true)
    expect(
      (colored[0]?.material as THREE.MeshStandardMaterial).color.getHexString(),
    ).toBe("00ff00")
    // Every robot drawn from the same model file shares the model's materials
    expect(material.colorWrite).toBe(true)
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

describe("Robot and LinearAxis with a plain motionGroup", () => {
  /** A NOVA client whose model download gives a file */
  function novaWithModels() {
    const nova = new Nova({ instanceUrl: "https://mock.example.com" })
    const downloadModel = vi
      .spyOn(nova.api.motionGroupModels, "getMotionGroupGlbModel")
      .mockResolvedValue(new File([], "model.glb"))
    return { nova, downloadModel }
  }

  const createObjectURL = URL.createObjectURL
  afterEach(() => {
    URL.createObjectURL = createObjectURL
    vi.mocked(defaultGetModel).mockClear()
  })

  test("Robot draws it, with the model downloaded from its connection", async () => {
    const { nova, downloadModel } = novaWithModels()
    URL.createObjectURL = vi.fn(() => "blob:plain-robot")
    gltf.load = () => modelWithJoints("robot", 6)

    // The app's own data: no ConnectedMotionGroup, no session
    await renderInCanvas(
      <Robot
        motionGroup={{
          nova,
          modelFromController: "Plain_Robot",
          dhParameters: dhParameters(6, JointTypeEnum.RevoluteJoint),
          rapidlyChangingMotionState: standstill([0, 0, 0, 0, 0, 0]),
        }}
      />,
    )

    expect(downloadModel).toHaveBeenCalledWith("Plain_Robot", {
      responseType: "blob",
    })
  })

  // RobotScene passes `robotModelOf(session)`, as an app may its own data: a new object at
  // every render, of the same robot. A failed download leaves the cache, so
  // asking again at every render would download again at every render.
  test.each([
    ["Robot", Robot, "Every_Render_Robot", 6, JointTypeEnum.RevoluteJoint],
    [
      "LinearAxis",
      LinearAxis,
      "Every_Render_Axis",
      1,
      JointTypeEnum.PrismaticJoint,
    ],
  ] as const)("%s asks for its model once when every render gives a new object", async (_, Component, model, joints, type) => {
    const { nova } = novaWithModels()
    URL.createObjectURL = vi.fn(() => "blob:every-render")
    gltf.load = () => modelWithJoints("robot", joints)
    const robot = (position: number) => (
      <Component
        motionGroup={{
          nova,
          modelFromController: model,
          dhParameters: dhParameters(joints, type),
          rapidlyChangingMotionState: standstill(
            Array.from({ length: joints }, () => position),
          ),
        }}
      />
    )

    await renderInCanvas(robot(0.1))
    await rerender(robot(0.2))

    expect(defaultGetModel).toHaveBeenCalledTimes(1)
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

describe("the joints' rest frames", () => {
  // The animator writes `rotation.y = theta + q` onto a joint node. That
  // replaces the node's Euler Y: for a joint authored at an oblique rest
  // rotation, it only turns the joint about its own axis once the rest
  // rotation lives in a parent of its own (ported from RobotPad)
  it("turn a joint about its own axis from its authored rest pose", async () => {
    const model = modelWithJoints("robot", 1)
    const joint = model.scene.getObjectByName("robot_J00")
    joint?.rotation.set(Math.PI / 2, 0, 0)
    gltf.load = () => model
    const theta = 0.3
    const q = 0.5

    const scene = await renderInCanvas(
      <SupportedRobotExact
        modelFromController="Oblique_Robot"
        dhParameters={[
          { ...dhParameters(1, JointTypeEnum.RevoluteJoint)[0], theta },
        ]}
        rapidlyChangingMotionState={standstill([q])}
        getModel={() => Promise.resolve("blob:oblique")}
      />,
    )
    await act(async () => {
      await nextTask()
    })

    const drawn = scene.getObjectByName("robot_J00")
    expect(scene.getObjectByName("robot_J00_REST")).toBeDefined()
    const expected = new THREE.Quaternion()
      .setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))
      .multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), q),
      )
    expect(
      drawn?.getWorldQuaternion(new THREE.Quaternion()).angleTo(expected),
    ).toBeCloseTo(0)
  })
})
