import type { RefObject } from "react"
import { type Quaternion, Vector3 } from "three"
import type { JogAxis, JogHandle } from "../jogHandle"
import { cartesianAxisColors } from "../joggingColors"
import type { useHoldToJog } from "../useHoldToJog"
import type { JogGrabSizes } from "./jogGizmoProjection"

export const UP = new Vector3(0, 1, 0)

/** Length of an arrowhead, in gizmo radii: an arrow is 1 long */
export const ARROW_HEAD_LENGTH = 0.26

export const handleKey = (handle: JogHandle) =>
  `${handle.axis}${handle.direction}`

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
 * The measures that the grab areas of a gizmo `size` px wide are laid out
 * by, with `radiusPx` px per gizmo radius
 */
export function gizmoGrabSizes(size: number, radiusPx: number): JogGrabSizes {
  const { gripPx, grab } = gizmoMeasures(size)
  return { radiusPx, gripPx, headLength: ARROW_HEAD_LENGTH, ...grab }
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
  held: JogHandle | null
  activeHandle?: JogHandle | null
  disabled: boolean
  size: number
  onHover: (handle: JogHandle | null) => void
  handlersFor: ReturnType<typeof useHoldToJog>["handlersFor"]
  /** The accessible name of a handle, e.g. "Jog X+" */
  label: (handle: JogHandle) => string
  overlay: RefObject<GizmoOverlay>
}
