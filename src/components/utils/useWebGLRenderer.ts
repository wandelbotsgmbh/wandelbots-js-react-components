import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { WebGLRenderer, type WebGLRendererParameters } from "three"
import { isWebGLAvailable } from "./webglSupport"

/** Where it was found that the browser cannot draw 3D */
export type WebGLUnavailableContext = "preflight" | "renderer"

/** Options of {@link useWebGLRenderer} */
export type WebGLRendererOptions = {
  /** Whether edges are smoothed */
  antialias?: boolean
  /**
   * Called when the canvas loses its WebGL context while it is shown (not
   * when it is removed, which loses it too)
   */
  onContextLost?: () => void
  /**
   * Called once when the browser cannot draw 3D: found before the canvas
   * mounts ("preflight"), or when its renderer cannot be made ("renderer")
   */
  onWebGLUnavailable?: (context: WebGLUnavailableContext) => void
}

/**
 * The renderer of a React Three Fiber `<Canvas>` (its `gl` prop) that does
 * not leave the canvas loading forever when the browser cannot draw 3D:
 * `unavailable` says whether to show something else instead of the canvas.
 *
 * three.js' `WebGLRenderer` throws when the browser cannot make a WebGL
 * context, inside React Three Fiber's async setup, where no React error
 * boundary catches it. So the browser is checked before the canvas mounts,
 * and a renderer that still cannot be made sets `unavailable` too.
 */
export function useWebGLRenderer({
  antialias = true,
  onContextLost,
  onWebGLUnavailable,
}: WebGLRendererOptions = {}) {
  const webglAvailable = useMemo(() => isWebGLAvailable(), [])
  const [rendererFailed, setRendererFailed] = useState(false)
  const unavailable: WebGLUnavailableContext | null = !webglAvailable
    ? "preflight"
    : rendererFailed
      ? "renderer"
      : null

  // The callbacks as they are now, for the renderer's listeners
  const callbacks = useRef({ onContextLost, onWebGLUnavailable })
  callbacks.current = { onContextLost, onWebGLUnavailable }

  useEffect(() => {
    if (unavailable) callbacks.current.onWebGLUnavailable?.(unavailable)
  }, [unavailable])

  // Removing the canvas loses its context too: no loss to report
  const shown = useRef(true)
  useEffect(() => {
    shown.current = true
    return () => {
      shown.current = false
    }
  }, [])

  const makeRenderer = useCallback(
    (defaults: WebGLRendererParameters) => {
      let renderer: WebGLRenderer
      try {
        renderer = new WebGLRenderer({ ...defaults, antialias, alpha: true })
      } catch (error) {
        // The context can still fail here, though the check passed (lost
        // between the two, say)
        console.warn("Failed to create WebGL renderer", error)
        setRendererFailed(true)
        throw error
      }
      renderer.domElement.addEventListener("webglcontextlost", (event) => {
        event.preventDefault()
        if (shown.current) callbacks.current.onContextLost?.()
      })
      return renderer
    },
    [antialias],
  )

  return { unavailable, makeRenderer }
}
