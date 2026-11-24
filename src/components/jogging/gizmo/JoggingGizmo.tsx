import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Canvas } from "@react-three/fiber"
import { type RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Quaternion } from "three"
import { externalizeComponent } from "../../../externalizeComponent"
import {
  useWebGLRenderer,
  type WebGLUnavailableContext,
} from "../../utils/useWebGLRenderer"
import type { JogHandle } from "../jogHandle"
import { type JogControlsProps, useJogControls } from "../useJogControls"
import {
  fitGizmoRadiusPx,
  type GizmoOverlay,
  gizmoMeasures,
} from "./gizmoShared"
import { jogFrameInView } from "./gizmoView"
import { RotationHandles } from "./RotationHandles"
import { RotationScene } from "./RotationScene"
import { TranslationHandles } from "./TranslationHandles"
import { TranslationScene } from "./TranslationScene"

/**
 * Props of {@link JoggingGizmo}
 */
export type JoggingGizmoProps = JogControlsProps & {
  /**
   * NOVA's axes as the camera of the app's 3D view sees them, read every
   * animation frame. Fill it with a {@link JoggingGizmoOrientation} inside
   * the app's 3D scene. Start it empty (`useRef<Quaternion | null>(null)`):
   * until a first orientation arrives, the gizmo stays disabled rather than
   * point its arrows a way the 3D view does not.
   */
  orientation: RefObject<Quaternion | null>
  /**
   * Orientation of the frame the handles jog along, in NOVA's coordinates
   * (those of the group that {@link JoggingGizmoOrientation} sits in).
   * Defaults to NOVA's world frame.
   *
   * A frame that turns, such as the tool's, can be a function: the gizmo
   * calls it every animation frame, so it turns with the tool without
   * re-rendering React.
   */
  frameQuaternion?: Quaternion | (() => Quaternion)
  /** Side of the square the gizmo takes, in px. Defaults to 200. */
  size?: number
  /**
   * Called when the browser cannot draw the gizmo (no WebGL), which then
   * says so instead of offering handles nobody sees: jog with
   * `JoggingButtons` then
   */
  onWebGLUnavailable?: (context: WebGLUnavailableContext) => void
}

const WORLD = new Quaternion()

/**
 * The jog frame as the camera sees it: `orientation` turned to the frame,
 * worked out anew each time it is read, so a frame that turns is followed
 */
function useJogFrameInView(
  orientation: RefObject<Quaternion | null>,
  frameQuaternion: Quaternion | (() => Quaternion) = WORLD,
): RefObject<Quaternion | null> {
  const frame = useRef(frameQuaternion)
  frame.current = frameQuaternion
  return useMemo(() => {
    const seen = new Quaternion()
    return {
      get current() {
        const view = orientation.current
        if (!view) return null
        const f = frame.current
        return jogFrameInView(view, typeof f === "function" ? f() : f, seen)
      },
    }
  }, [orientation])
}

/** How long the gizmo waits for its first orientation before it says so, in ms */
const ORIENTATION_WARNING_MS = 3000

/**
 * Whether `orientation` holds an orientation yet. Looks once per animation
 * frame until it does, which re-renders once; warns if none arrives.
 */
function useHasOrientation(orientation: RefObject<Quaternion | null>) {
  const [has, setHas] = useState(() => orientation.current !== null)

  useEffect(() => {
    if (has) return
    let frame = requestAnimationFrame(function check() {
      if (orientation.current !== null) setHas(true)
      else frame = requestAnimationFrame(check)
    })
    const warning = setTimeout(() => {
      if (orientation.current === null) {
        console.warn(
          "JoggingGizmo has no orientation, so it stays disabled. Put a JoggingGizmoOrientation with the same ref into the app's 3D scene.",
        )
      }
    }, ORIENTATION_WARNING_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(warning)
    }
  }, [has, orientation])

  return has
}

/**
 * Jogging by a gizmo drawn in the jog frame's axes as the camera sees them:
 * the handle that points right on screen moves the robot right on screen, and
 * orbiting the scene turns the gizmo with it.
 *
 * `motion` picks the handles. To translate, each axis is an arrow with a
 * handle per direction, grabbed anywhere along its half of the axis. To rotate, each axis has a circle
 * about it with an arc per direction, whose arrowhead shows the way it
 * turns, grabbed anywhere along the arc. A handle is held to jog.
 *
 * The gizmo is drawn in 3D; the handles are laid over it as buttons, so it
 * works from the keyboard and tests can find a handle by its name. It draws
 * only when it turns or its state changes, not every frame.
 */
export const JoggingGizmo = externalizeComponent(
  ({
    orientation,
    frameQuaternion,
    motion = "translate",
    onJogStart,
    onJogStop,
    activeHandle,
    disabled: disabledByApp = false,
    size = 200,
    onWebGLUnavailable,
  }: JoggingGizmoProps) => {
    const { t } = useTranslation()
    const { unavailable, makeRenderer } = useWebGLRenderer({
      onWebGLUnavailable,
    })
    const hasOrientation = useHasOrientation(orientation)
    const disabled = disabledByApp || !hasOrientation
    const jogFrame = useJogFrameInView(orientation, frameQuaternion)
    const { held, handlersFor, label, isPressed } = useJogControls({
      motion,
      onJogStart,
      onJogStop,
      activeHandle,
      disabled,
    })
    const [hovered, setHovered] = useState<JogHandle | null>(null)

    // The handles of the other motion are other elements
    // biome-ignore lint/correctness/useExhaustiveDependencies: motion is the trigger
    useEffect(() => setHovered(null), [motion])

    const Scene = motion === "rotate" ? RotationScene : TranslationScene
    const Handles = motion === "rotate" ? RotationHandles : TranslationHandles
    const overlay = useRef<GizmoOverlay>(new Map())
    const radius = fitGizmoRadiusPx(size, size, gizmoMeasures(size).marginPx)

    if (unavailable) {
      // The handles lie over the drawn gizmo: without it, nobody sees them
      return (
        <Box
          data-testid="jogging-gizmo-unavailable"
          sx={{
            width: size,
            height: size,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("JoggingGizmo.WebGLUnavailable.lb")}
          </Typography>
        </Box>
      )
    }

    return (
      <Box
        data-testid="jogging-gizmo"
        sx={{
          position: "relative",
          width: size,
          height: size,
          flexShrink: 0,
          // Keeps the z-indexes of the handles inside the gizmo: without it,
          // they would lie over the app's own elements that cover the gizmo
          // (e.g. a sticky header), and a press there would jog
          isolation: "isolate",
        }}
      >
        <Canvas
          orthographic
          flat
          frameloop="demand"
          // Up is set: an app that makes Z the default up (RobotPad does)
          // must not turn the gizmo's own camera
          camera={{
            position: [0, 0, 10],
            up: [0, 1, 0],
            zoom: radius,
            near: 0.1,
            far: 100,
          }}
          gl={makeRenderer}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <Scene
            orientation={jogFrame}
            lit={held ?? activeHandle ?? hovered}
            disabled={disabled}
            size={size}
            radius={radius}
            overlay={overlay}
          />
        </Canvas>

        <Handles
          isPressed={isPressed}
          hovered={hovered}
          disabled={disabled}
          size={size}
          onHover={setHovered}
          handlersFor={handlersFor}
          label={label}
          overlay={overlay}
        />
      </Box>
    )
  },
)
