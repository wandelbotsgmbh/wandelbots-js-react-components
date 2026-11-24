import { act, render, screen } from "@testing-library/react"
import { type ReactNode, useEffect } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { RobotCanvas } from "./RobotCanvas"

// The browser's WebGL, as the test sets it: jsdom has none
const webgl = vi.hoisted(() => ({
  available: false,
  /** Whether the renderer can be made, after the check said yes */
  rendererFails: false,
  /** The canvas of the last renderer made */
  canvas: undefined as HTMLCanvasElement | undefined,
}))

vi.mock("./webglSupport", () => ({
  isWebGLAvailable: () => webgl.available,
}))

vi.mock("three", async (importOriginal) => ({
  ...(await importOriginal<typeof import("three")>()),
  WebGLRenderer: class {
    domElement: HTMLCanvasElement
    constructor() {
      if (webgl.rendererFails) throw new Error("Error creating WebGL context.")
      this.domElement = document.createElement("canvas")
      webgl.canvas = this.domElement
    }
  },
}))

// React Three Fiber's <Canvas> as far as RobotCanvas needs it: it makes its
// renderer with the `gl` it is given, after mounting (the 3D content needs a
// real canvas and is left out)
vi.mock("@react-three/fiber", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@react-three/fiber")>()),
  Canvas: function FakeCanvas({
    gl,
  }: {
    gl: (defaults: { canvas: HTMLCanvasElement }) => unknown
    children?: ReactNode
  }) {
    useEffect(() => {
      try {
        gl({ canvas: document.createElement("canvas") })
      } catch {
        // React Three Fiber's setup rejects; nothing catches it
      }
    }, [gl])
    return <canvas data-testid="r3f-canvas" />
  },
}))

afterEach(() => {
  webgl.available = false
  webgl.rendererFails = false
  webgl.canvas = undefined
})

describe("RobotCanvas", () => {
  it("says that the 3D view is not available, and tells the app, when the browser has no WebGL", () => {
    const onWebGLUnavailable = vi.fn()

    render(<RobotCanvas onWebGLUnavailable={onWebGLUnavailable} />)

    expect(screen.getByText("3D view not available")).toBeVisible()
    expect(screen.getByRole("button", { name: "Reload" })).toBeVisible()
    expect(screen.queryByTestId("r3f-canvas")).toBeNull()
    expect(onWebGLUnavailable).toHaveBeenCalledExactlyOnceWith("preflight")
  })

  it("says that the 3D view is not available when its renderer cannot be made, instead of loading forever", async () => {
    webgl.available = true
    webgl.rendererFails = true
    const onWebGLUnavailable = vi.fn()

    render(<RobotCanvas onWebGLUnavailable={onWebGLUnavailable} />)

    expect(await screen.findByText("3D view not available")).toBeVisible()
    expect(onWebGLUnavailable).toHaveBeenCalledExactlyOnceWith("renderer")
  })

  it("tells the app when the WebGL context is lost while the view is shown, not when the view is removed", () => {
    webgl.available = true
    const onContextLost = vi.fn()

    const { unmount } = render(<RobotCanvas onContextLost={onContextLost} />)
    const canvas = webgl.canvas
    if (!canvas) throw new Error("No renderer was made")

    act(() => {
      canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }))
    })
    expect(onContextLost).toHaveBeenCalledTimes(1)

    // Removing the canvas loses its context too: that is no loss to report
    unmount()
    canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true }))
    expect(onContextLost).toHaveBeenCalledTimes(1)
  })
})
