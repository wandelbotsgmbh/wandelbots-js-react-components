import Box from "@mui/material/Box"
import { Canvas } from "@react-three/fiber"
import { type RefObject, useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Quaternion } from "three"
import { externalizeComponent } from "../../../externalizeComponent"
import {
  type JogAxis,
  type JogDirection,
  type JogHandle,
  jogHandleName,
} from "../jogHandle"
import { useHoldToJog } from "../useHoldToJog"
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
 *
 * @beta
 */
export type JoggingGizmoProps = {
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
  /**
   * Whether the handles move the robot along the axes (arrows) or turn it
   * about them (arcs). Defaults to `"translate"`. A jog that runs when it
   * changes stops.
   */
  motion?: "translate" | "rotate"
  /**
   * A handle was pressed: jog along `axis` (or about it, in `"rotate"`
   * motion) until `onJogStop`
   */
  onJogStart: (axis: JogAxis, direction: JogDirection) => void
  /** The held handle was let go */
  onJogStop: () => void
  /** Shows a handle as pressed while it is not held, e.g. a running step */
  activeHandle?: JogHandle | null
  disabled?: boolean
  /** Side of the square the gizmo takes, in px. Defaults to 200. */
  size?: number
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
 * To translate, each axis is an arrow with a handle per direction, grabbed
 * anywhere along its half of the axis. To rotate, each axis has a circle
 * about it with an arc per direction, whose arrowhead shows the way it
 * turns, grabbed anywhere along the arc. A handle is held to jog.
 *
 * The gizmo is drawn in 3D; the handles are laid over it as buttons, so it
 * works from the keyboard and tests can find a handle by its name. It draws
 * only when it turns or its state changes, not every frame.
 *
 * @beta
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
  }: JoggingGizmoProps) => {
    const { t } = useTranslation()
    const hasOrientation = useHasOrientation(orientation)
    const disabled = disabledByApp || !hasOrientation
    const jogFrame = useJogFrameInView(orientation, frameQuaternion)
    const { held, handlersFor, stop } = useHoldToJog({
      onJogStart,
      onJogStop,
      disabled,
    })
    const [hovered, setHovered] = useState<JogHandle | null>(null)

    // A held handle belongs to the motion it was pressed in: a translation
    // must not go on as a rotation
    // biome-ignore lint/correctness/useExhaustiveDependencies: motion is the trigger
    useEffect(() => {
      stop()
      setHovered(null)
    }, [motion, stop])

    const Scene = motion === "rotate" ? RotationScene : TranslationScene
    const Handles = motion === "rotate" ? RotationHandles : TranslationHandles
    const overlay = useRef<GizmoOverlay>(new Map())
    const radius = fitGizmoRadiusPx(size, size, gizmoMeasures(size).marginPx)

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
          camera={{ position: [0, 0, 10], zoom: radius, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true }}
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
          held={held}
          activeHandle={activeHandle}
          hovered={hovered}
          disabled={disabled}
          size={size}
          onHover={setHovered}
          handlersFor={handlersFor}
          label={(handle) =>
            t("Jogging.Handle.lb", { handle: jogHandleName(handle, motion) })
          }
          overlay={overlay}
        />
      </Box>
    )
  },
)
