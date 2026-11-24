import Box from "@mui/material/Box"
import { type SxProps, type Theme, useTheme } from "@mui/material/styles"
import { Grid, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { WebGLRenderer, type WebGLRendererParameters } from "three"
import { externalizeComponent } from "../../externalizeComponent"
import { isWebGLAvailable } from "./webglSupport"
import { WebGLUnavailable } from "./WebGLUnavailable"

/** Props of {@link RobotCanvas} */
export type RobotCanvasProps = {
  /**
   * What the camera orbits around, in NOVA's coordinates (m): the robot's
   * base, say. The origin if left out.
   */
  orbitTarget?: [number, number, number]
  /**
   * Whether edges are smoothed. Turn it off where it makes the WebGL context
   * fragile: iOS Safari.
   */
  antialias?: boolean
  /**
   * Called when the canvas loses its WebGL context while it is shown (not
   * when it is removed, which loses it too). iOS Safari does not give it
   * back: reload the page there.
   */
  onContextLost?: () => void
  /**
   * Called when the browser cannot draw 3D, and the view says so instead:
   * found before the canvas mounts ("preflight"), or when its renderer
   * cannot be made ("renderer")
   */
  onWebGLUnavailable?: (context: "preflight" | "renderer") => void
  /** The scene, in NOVA's coordinates: Z up, in metres */
  children?: ReactNode
  /** The style of the box the view fills, which fills its parent */
  sx?: SxProps<Theme>
}

// The camera looks at the robot from the front right, from above
const CAMERA = {
  position: [3.3246, -3.6538, 3.2033] as [number, number, number],
  fov: 25,
  // NOVA's Z is up
  up: [0, 0, 1] as [number, number, number],
}
const ORIGIN: [number, number, number] = [0, 0, 0]
const GRID_ARGS: [number, number] = [100, 100]
// The grid lies in drei's XZ plane: turned into NOVA's floor, the XY plane
const GRID_ROTATION: [number, number, number] = [Math.PI / 2, 0, 0]

/**
 * A 3D view for a robot cell, prop-only: a React Three Fiber canvas in
 * NOVA's coordinates (Z up, m), with a floor grid and a camera that orbits
 * `orbitTarget`. It fills its parent, wherever the app puts it. When the
 * browser cannot draw 3D, it says so (and tells `onWebGLUnavailable`)
 * instead of loading forever.
 *
 * {@link RobotView} shows a robot session in it.
 */
export const RobotCanvas = externalizeComponent(function RobotCanvas({
  orbitTarget = ORIGIN,
  antialias = true,
  onContextLost,
  onWebGLUnavailable,
  children,
  sx,
}: RobotCanvasProps) {
  const theme = useTheme()
  const webglAvailable = useMemo(() => isWebGLAvailable(), [])
  const [rendererFailed, setRendererFailed] = useState(false)
  const unavailable = !webglAvailable
    ? "preflight"
    : rendererFailed
      ? "renderer"
      : null

  // The app's callbacks, as they are now, for the renderer's listeners
  const callbacks = useRef({ onContextLost, onWebGLUnavailable })
  callbacks.current = { onContextLost, onWebGLUnavailable }

  useEffect(() => {
    if (unavailable) callbacks.current.onWebGLUnavailable?.(unavailable)
  }, [unavailable])

  // Removing the canvas loses its context too: no loss to tell the app of
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
        // between the two, say): show that instead of loading forever
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

  const background = theme.palette.backgroundPaperElevation?.[1] ?? "#fff"
  const gridColor = theme.palette.backgroundPaperElevation?.[5]

  return (
    <Box
      sx={[
        {
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {unavailable ? (
        <WebGLUnavailable />
      ) : (
        <Canvas
          gl={makeRenderer}
          frameloop="demand"
          flat
          shadows
          camera={CAMERA}
          resize={{ debounce: 0, scroll: false }}
        >
          <color attach="background" args={[background]} />
          <Grid
            position={ORIGIN}
            rotation={GRID_ROTATION}
            args={GRID_ARGS}
            cellSize={0}
            cellThickness={0.5}
            cellColor="#ffffff"
            sectionSize={0.5}
            sectionThickness={0.5}
            sectionColor={gridColor}
            fadeDistance={21}
            fadeStrength={2}
            followCamera={false}
            infiniteGrid
          />
          <OrbitControls makeDefault target={orbitTarget} />
          {children}
        </Canvas>
      )}
    </Box>
  )
})
