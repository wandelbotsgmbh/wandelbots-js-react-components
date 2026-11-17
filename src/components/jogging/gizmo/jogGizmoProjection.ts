import { type Object3D, Quaternion, Vector3 } from "three"
import {
  JOG_AXES,
  JOG_DIRECTIONS,
  type JogAxis,
  type JogDirection,
} from "../jogHandle"

/** A jog handle where the gizmo draws it */
export type ProjectedJogHandle = {
  axis: JogAxis
  direction: JogDirection
  /** Screen position of the arrow tip, in gizmo radii from the center */
  x: number
  /** Like `x`, pointing down as on screen */
  y: number
  /** Toward the viewer is positive; nearer handles are drawn on top */
  depth: number
}

/** The unit vector along each axis */
export const UNIT_VECTOR: Record<JogAxis, Vector3> = {
  x: new Vector3(1, 0, 0),
  y: new Vector3(0, 1, 0),
  z: new Vector3(0, 0, 1),
}

/**
 * The jog frame as the camera sees it, `camera⁻¹ · frame`: what turns the
 * gizmo so that the handle pointing right on screen moves the robot right on
 * screen.
 *
 * Both are world orientations, so this works whichever axis is up in the
 * scene.
 */
export function jogFrameInCamera(
  cameraWorldQuaternion: Quaternion,
  frameWorldQuaternion: Quaternion,
  target = new Quaternion(),
): Quaternion {
  return target
    .copy(cameraWorldQuaternion)
    .invert()
    .multiply(frameWorldQuaternion)
}

const cameraWorld = new Quaternion()
const frameWorld = new Quaternion()

/**
 * The jog frame as `camera` sees it, for a `frame` given in the coordinates
 * of `anchor`, the place in the scene where it sits. In a group that turns
 * NOVA's Z up into the scene's Y up, an unturned `frame` is NOVA's world
 * frame, as the robot there has it.
 */
export function jogFrameSeenBy(
  camera: Object3D,
  anchor: Object3D,
  frame: Quaternion,
  target = new Quaternion(),
): Quaternion {
  camera.getWorldQuaternion(cameraWorld)
  anchor.getWorldQuaternion(frameWorld).multiply(frame)
  return jogFrameInCamera(cameraWorld, frameWorld, target)
}

/**
 * Where the six handles of a gizmo turned by `frameInCamera` appear. three.js
 * cameras look down −Z with +Y up, so a view-space vector lands on screen at
 * (x, −y); z only decides what is in front.
 */
export function projectJogHandles(
  frameInCamera: Quaternion,
): ProjectedJogHandle[] {
  const handles: ProjectedJogHandle[] = []
  for (const axis of JOG_AXES) {
    for (const direction of JOG_DIRECTIONS) {
      const tip = UNIT_VECTOR[axis]
        .clone()
        .multiplyScalar(direction === "+" ? 1 : -1)
        .applyQuaternion(frameInCamera)
      // `+ 0` folds -0 into 0
      handles.push({
        axis,
        direction,
        x: tip.x + 0,
        y: -tip.y + 0,
        depth: tip.z,
      })
    }
  }
  return handles
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

/** Where a handle can be grabbed: a bar along its arrow */
export type JogGrabArea = {
  /** Start of the bar, in px from the gizmo center, y pointing down */
  x: number
  y: number
  /** Length of the bar in px */
  length: number
  /** Direction of the bar on screen, in radians, y pointing down */
  angle: number
  /** Where two bars overlap, the one with the higher layer is on top */
  layer: number
}

/** The px measures that {@link grabAreasOf} lays the grab areas out by */
export type JogGrabSizes = {
  /** Px per gizmo radius: the length on screen of an arrow across the screen */
  radiusPx: number
  /** Thickness of a grab bar */
  gripPx: number
  /** The center, which no handle owns, reaches this far out */
  innerPx: number
  /** How far a bar reaches past its arrow's tip */
  beyondTipPx: number
  /** An arrow shorter than this on screen points too nearly at or away from the viewer to grab */
  minTipPx: number
  /** The arrowhead's share of an arrow's length */
  headLength: number
}

/**
 * Where each of `handles` can be grabbed, in the same order: a bar along its
 * arrow, from beside the center to past the tip, or `null` where a press
 * could not tell it from another handle. So a press jogs along the arrow that
 * is drawn there, never along another one:
 *
 * - The center belongs to no handle, and no bar reaches across it.
 * - An arrow shorter than `minTipPx` on screen points (almost) at or away
 *   from the viewer, where its two halves look the same: neither is grabbed.
 * - Two arrows that point the same way on screen share the line: the shorter
 *   bar ends and the longer begins halfway between the shorter tip and the
 *   longer arrowhead, so each arrowhead stays on its own bar. Where the two
 *   arrowheads are drawn over each other, only the nearer is grabbed.
 * - Where bars still overlap, close to the center, the nearer handle is on
 *   top.
 */
export function grabAreasOf(
  handles: readonly ProjectedJogHandle[],
  sizes: JogGrabSizes,
): (JogGrabArea | null)[] {
  const { radiusPx, gripPx, innerPx, beyondTipPx, minTipPx, headLength } = sizes
  const bars = handles.map((handle) => {
    const tip = Math.hypot(handle.x, handle.y) * radiusPx
    return {
      tip,
      angle: Math.atan2(handle.y, handle.x),
      start: innerPx,
      end: tip + beyondTipPx,
      depth: handle.depth,
      grabbed: tip >= minTipPx,
    }
  })

  for (const [i, a] of bars.entries()) {
    for (const b of bars.slice(i + 1)) {
      if (!a.grabbed || !b.grabbed) continue
      const [shorter, longer] = a.tip <= b.tip ? [a, b] : [b, a]
      const between = a.angle - b.angle
      // Only arrows on the same side whose bars overlap around the shorter
      // arrowhead share a line
      const apartAtShorterTip = shorter.tip * Math.abs(Math.sin(between))
      if (Math.cos(between) <= 0 || apartAtShorterTip >= gripPx) continue

      const longerHead = longer.tip * (1 - headLength)
      if (shorter.tip > longerHead) {
        // The arrowheads are drawn over each other
        const farther = a.depth < b.depth ? a : b
        farther.grabbed = false
      } else {
        const split = (shorter.tip + longerHead) / 2
        shorter.end = Math.min(shorter.end, split)
        longer.start = Math.max(longer.start, split)
      }
    }
  }

  // Nearer on top: the layer is the rank by depth
  const nearToFar = bars.map((_, i) => i)
  nearToFar.sort((i, j) => bars[i].depth - bars[j].depth)
  const layers = new Map(nearToFar.map((index, rank) => [index, rank + 1]))

  return bars.map((bar, i) => {
    if (!bar.grabbed || bar.end <= bar.start) return null
    return {
      x: Math.cos(bar.angle) * bar.start,
      y: Math.sin(bar.angle) * bar.start,
      length: bar.end - bar.start,
      angle: bar.angle,
      layer: layers.get(i) ?? 0,
    }
  })
}

/**
 * Below this, two rotations count as the same: about a sixtieth of a degree,
 * far under what shows on screen and far over float noise
 */
const SAME_ROTATION_EPSILON = 1e-8

/**
 * Whether `next` is a different rotation from `previous`, so the gizmo has to
 * be drawn anew. A camera orientation computed afresh each frame differs in
 * its last digits without turning, and a quaternion and its negation are the
 * same rotation, so this compares rotations, not numbers.
 */
export function hasTurned(
  previous: Quaternion | null,
  next: Quaternion,
): boolean {
  if (!previous) return true
  return Math.abs(previous.dot(next)) < 1 - SAME_ROTATION_EPSILON
}
