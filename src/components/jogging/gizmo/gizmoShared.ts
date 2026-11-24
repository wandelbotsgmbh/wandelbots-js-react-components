import { alpha, type Theme } from "@mui/material/styles"
import type { RefObject } from "react"
import { type Quaternion, Vector3 } from "three"
import { isSameJogHandle, type JogAxis, type JogHandle } from "../jogHandle"
import { cartesianAxisColors } from "../joggingColors"
import type { useJogControls } from "../useJogControls"
import type { JogArcGrabSizes } from "./arcGrabAreas"
import type { JogGrabSizes } from "./arrows"

// The words the gizmo's code uses:
//
// - handle: one jog control, an axis and a direction, e.g. X+ or Rx+
//   (JogHandle). Translating, it is half of an arrow. Rotating, it is an arc.
// - scene: the gizmo's own small 3D drawing, in its canvas (…Scene)
// - handles: the elements laid over the drawing, which take the presses and
//   the keyboard's focus (…Handles). The button of a handle names it, e.g.
//   "Jog X+".
// - overlay: those elements, placed by the scene each time the gizmo turns,
//   without React (GizmoOverlay)
// - view: NOVA's axes as the camera of the app's 3D view sees them
//   (JoggingGizmoOrientation, gizmoView.ts)
// - frame: the axes the robot jogs along, e.g. the world's or the tool's
//   (frameQuaternion)
// - grab area: where a press reaches a handle. A bar along an arrow
//   (arrows.ts). A band along an arc, in two halves, and a circle on the
//   arc's arrowhead (arcGrabAreas.ts).
// - layer: which grab area is on top where two overlap
// - highlight: the tint of a grab area while it is hovered or held

export const UP = new Vector3(0, 1, 0)

/** Length of an arrowhead, in gizmo radii: an arrow is 1 long */
export const ARROW_HEAD_LENGTH = 0.26

/** Radius of an arrowhead's base, in gizmo radii */
export const ARROW_HEAD_RADIUS = 0.1

const AXIS_KEY = { x: "X", y: "Y", z: "Z" } as const

/**
 * The color of an axis: the button color of that axis in the cartesian
 * jogging tab, so a gizmo and the jog buttons always agree
 */
export function axisColor(axis: JogAxis): string {
  return (
    cartesianAxisColors[AXIS_KEY[axis]].buttonBackgroundColor?.default ??
    "currentColor"
  )
}

/** The side of a gizmo, in px, that the measures below are made for */
const REFERENCE_SIZE_PX = 200

/**
 * The px measures of a gizmo `size` px wide, in proportion to it, so that a
 * small gizmo looks like a large one, only smaller: the halo of a held or
 * hovered handle, its grab bar and the room around the gizmo
 */
export function gizmoMeasures(size: number) {
  const scale = size / REFERENCE_SIZE_PX
  return {
    /** Room around the gizmo for the labels, arrowheads and grab bars */
    marginPx: 30 * scale,
    /** Thickness of a handle's grab bar, which shows as its halo */
    gripPx: 30 * scale,
    grab: {
      // The center, where all axes cross, belongs to no handle
      innerPx: 10 * scale,
      // The arrowhead is the obvious thing to grab, so the bar reaches past it
      beyondTipPx: 10 * scale,
      // Shorter, an arrow points within about 13° of the line of sight: its
      // two halves can no longer be told apart
      minTipPx: 16 * scale,
    },
    /** The axis labels, which stay readable on a small gizmo */
    labelFontPx: Math.max(10, 13 * scale),
  }
}

/**
 * The gizmo radius, in px, that fits a `width` × `height` canvas whichever
 * way the gizmo is turned, keeping `marginPx` free for the labels and grab
 * areas around the tips. At least 1, so an unmeasured canvas still draws.
 */
export function fitGizmoRadiusPx(
  width: number,
  height: number,
  marginPx: number,
): number {
  return Math.max(1, Math.min(width, height) / 2 - marginPx)
}

/**
 * The measures that the grab areas of a gizmo `size` px wide are laid out
 * by, with `radiusPx` px per gizmo radius
 */
export function gizmoGrabSizes(size: number, radiusPx: number): JogGrabSizes {
  const { gripPx, grab } = gizmoMeasures(size)
  return { radiusPx, gripPx, headLength: ARROW_HEAD_LENGTH, ...grab }
}

/**
 * The measures that the grab areas of the rotation arcs of a gizmo `size` px
 * wide are laid out by, with `radiusPx` px per gizmo radius
 */
export function gizmoArcGrabSizes(
  size: number,
  radiusPx: number,
): JogArcGrabSizes {
  const { gripPx, grab } = gizmoMeasures(size)
  return {
    radiusPx,
    gripPx,
    beyondTipPx: grab.beyondTipPx,
    headLength: ARROW_HEAD_LENGTH,
  }
}

/**
 * The elements laid over the gizmo, by key. The 3D scene places them every
 * frame the gizmo turns, directly, so that orbiting does not re-render React.
 */
export type GizmoOverlay = Map<string, Element>

/** A ref callback that registers an overlay element under `key` */
export function overlayRef(overlay: RefObject<GizmoOverlay>, key: string) {
  return (node: Element | null) => {
    if (node) overlay.current.set(key, node)
    else overlay.current.delete(key)
  }
}

export const handleKey = (handle: JogHandle) =>
  `${handle.axis}${handle.direction}`

export const labelKey = (axis: JogAxis) => `label:${axis}`

/** A band takes presses in two halves: see JogArcGrabArea */
export const HALVES = [0, 1] as const

export const halfKey = (handle: JogHandle, half: number) =>
  `half:${handleKey(handle)}:${half}`

export const haloKey = (handle: JogHandle) => `halo:${handleKey(handle)}`

export const focusKey = (handle: JogHandle) => `focus:${handleKey(handle)}`

/** A clip path that shows nothing and takes no press */
export const NOWHERE = "polygon(0 0, 0 0, 0 0)"

/** What the 3D half of a gizmo (inside the canvas) gets */
export type GizmoSceneProps = {
  orientation: RefObject<Quaternion | null>
  /** The handle to draw highlighted: held, active or hovered */
  lit: JogHandle | null
  disabled: boolean
  /** Side of the gizmo, in px */
  size: number
  /** Px per gizmo unit */
  radius: number
  overlay: RefObject<GizmoOverlay>
}

/** What the handle half of a gizmo (laid over the canvas) gets */
export type GizmoHandlesProps = {
  /** Whether a handle shows as pressed: held or shown as active */
  isPressed: (handle: JogHandle) => boolean
  /** The handle the pointer is over */
  hovered: JogHandle | null
  disabled: boolean
  size: number
  onHover: (handle: JogHandle | null) => void
  handlersFor: ReturnType<typeof useJogControls>["handlersFor"]
  /** The accessible name of a handle, e.g. "Jog X+" */
  label: (handle: JogHandle) => string
  overlay: RefObject<GizmoOverlay>
}

/**
 * How a handle shows: pressed while it is held or shown as active, lit
 * (highlighted) while it is pressed or hovered
 */
export function handleState(
  handle: JogHandle,
  {
    isPressed,
    hovered,
    disabled,
  }: Pick<GizmoHandlesProps, "isPressed" | "hovered" | "disabled">,
) {
  const pressed = isPressed(handle)
  const lit = !disabled && (pressed || isSameJogHandle(hovered, handle))
  return { pressed, lit }
}

/** The highlight of a handle's grab area, stronger while it is pressed */
export function highlightOf(
  color: string,
  { pressed, lit }: ReturnType<typeof handleState>,
) {
  if (pressed) return alpha(color, 0.25)
  return lit ? alpha(color, 0.12) : "transparent"
}

/** What each element that grabs a handle gets: hover, and press and hold */
export function gripProps(
  handle: JogHandle,
  { onHover, handlersFor }: Pick<GizmoHandlesProps, "onHover" | "handlersFor">,
) {
  return {
    onPointerEnter: () => onHover(handle),
    onPointerLeave: () => onHover(null),
    ...handlersFor(handle),
  }
}

/** The styles of each element that grabs a handle: no browser gesture on it */
export const gripStyle = (disabled: boolean) =>
  ({
    cursor: disabled ? "default" : "pointer",
    touchAction: "none",
    userSelect: "none",
  }) as const

/** The keyboard's focus outline, in the theme's primary color */
export const focusOutline = (theme: Theme) =>
  `2px solid ${theme.palette.primary.main}`
