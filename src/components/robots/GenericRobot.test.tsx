import { act, createRoot, extend } from "@react-three/fiber"
import type { ReactNode } from "react"
import * as THREE from "three"
import { afterEach, describe, expect, test, vi } from "vitest"
import { GenericRobot } from "./GenericRobot"

// useGLTF of drei downloads, parses and caches the model file: here, the
// test gives the cached model
const gltf = vi.hoisted(() => ({
  load: (_url: string): unknown => undefined,
}))
vi.mock("@react-three/drei", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@react-three/drei")>()),
  useGLTF: (url: string) => gltf.load(url),
}))

// <Canvas> does this; the test renders with createRoot
extend({ Group: THREE.Group, Mesh: THREE.Mesh })

/**
 * A model as drei caches it: a joint with a textured mesh, and a flange.
 * `disposed` lists what was disposed: a renderer that drew a part frees its
 * copy of it then, and lets go of the part.
 */
function cachedModel() {
  const disposed: string[] = []
  const texture = new THREE.Texture()
  const material = new THREE.MeshStandardMaterial({ map: texture })
  const geometry = new THREE.BoxGeometry()
  texture.addEventListener("dispose", () => disposed.push("texture"))
  material.addEventListener("dispose", () => disposed.push("material"))
  geometry.addEventListener("dispose", () => disposed.push("geometry"))

  const scene = new THREE.Group()
  const joint = new THREE.Group()
  joint.name = "robot_J00"
  const flange = new THREE.Group()
  flange.name = "robot_FLG"
  scene.add(joint)
  joint.add(new THREE.Mesh(geometry, material), flange)
  return { model: { scene }, disposed }
}

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
  await act(async () => {
    root.render(element)
    await nextTask()
  })
  roots.push(root)
  return root
}

afterEach(async () => {
  for (const root of roots.splice(0)) {
    await act(async () => root.unmount())
  }
})

describe("GenericRobot", () => {
  test("frees the renderer's copy of the cached model when it unmounts", async () => {
    // Else each renderer that drew the model stays in memory with its
    // canvas and the page around it: the cache keeps the model forever
    const { model, disposed } = cachedModel()
    gltf.load = () => model

    const root = await renderInCanvas(<GenericRobot modelURL="blob:robot" />)
    expect(disposed).toEqual([])

    await act(async () => {
      root.unmount()
      await nextTask()
    })
    roots.splice(roots.indexOf(root), 1)
    expect(disposed.sort()).toEqual(["geometry", "material", "texture"])
  })

  test("frees the copy of the model it showed before another one", async () => {
    const first = cachedModel()
    const second = cachedModel()
    gltf.load = (url) => (url === "blob:first" ? first.model : second.model)

    const root = await renderInCanvas(<GenericRobot modelURL="blob:first" />)
    await act(async () => {
      root.render(<GenericRobot modelURL="blob:second" />)
      await nextTask()
    })

    expect(first.disposed.sort()).toEqual(["geometry", "material", "texture"])
    expect(second.disposed).toEqual([])
  })
})
