import Box from "@mui/material/Box"
import { Canvas } from "@react-three/fiber"
import { type RefObject, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import type { Quaternion } from "three"
import { externalizeComponent } from "../../../externalizeComponent"
import {
  type JogAxis,
  type JogDirection,
  type JogHandle,
  jogHandleName,
} from "../jogHandle"
import { useHoldToJog } from "../useHoldToJog"
import { type GizmoOverlay, gizmoMeasures } from "./gizmoShared"
import { TranslationHandles, TranslationScene } from "./gizmoTranslation"
import { fitGizmoRadiusPx } from "./jogGizmoProjection"

/**
 * Props of {@link JoggingGizmo}
 *
 * @beta
 */
export type JoggingGizmoProps = {
  /**
   * The jog frame as the camera sees it, read every frame. Fill it with a
   * {@link JoggingGizmoOrientation} inside the app's 3D scene. Start it
   * empty (`useRef<Quaternion | null>(null)`): until a first orientation
   * arrives, the gizmo stays disabled rather than point its arrows a way the
   * 3D view does not.
   */
  orientation: RefObject<Quaternion | null>
  /** A handle was pressed: jog until `onJogStop` */
  onJogStart: (axis: JogAxis, direction: JogDirection) => void
  /** The held handle was let go */
  onJogStop: () => void
  /** Shows a handle as pressed while it is not held, e.g. a running step */
  activeHandle?: JogHandle | null
  disabled?: boolean
  /** Side of the square the gizmo takes, in px. Defaults to 200. */
  size?: number
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
 * Each axis is an arrow with a handle per direction, grabbed anywhere along
 * its half of the axis and held to jog.
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
    onJogStart,
    onJogStop,
    activeHandle,
    disabled: disabledByApp = false,
    size = 200,
  }: JoggingGizmoProps) => {
    const { t } = useTranslation()
    const hasOrientation = useHasOrientation(orientation)
    const disabled = disabledByApp || !hasOrientation
    const { held, handlersFor } = useHoldToJog({
      onJogStart,
      onJogStop,
      disabled,
    })
    const [hovered, setHovered] = useState<JogHandle | null>(null)
    const overlay = useRef<GizmoOverlay>(new Map())
    const radius = fitGizmoRadiusPx(size, size, gizmoMeasures(size).marginPx)

    return (
      <Box
        data-testid="jogging-gizmo"
        sx={{ position: "relative", width: size, height: size, flexShrink: 0 }}
      >
        <Canvas
          orthographic
          flat
          frameloop="demand"
          camera={{ position: [0, 0, 10], zoom: radius, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <TranslationScene
            orientation={orientation}
            lit={held ?? activeHandle ?? hovered}
            disabled={disabled}
            size={size}
            radius={radius}
            overlay={overlay}
          />
        </Canvas>

        <TranslationHandles
          held={held}
          activeHandle={activeHandle}
          disabled={disabled}
          size={size}
          onHover={setHovered}
          handlersFor={handlersFor}
          label={(handle) =>
            t("Jogging.Handle.lb", { handle: jogHandleName(handle) })
          }
          overlay={overlay}
        />
      </Box>
    )
  },
)
