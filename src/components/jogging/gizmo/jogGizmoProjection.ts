import { Quaternion, Vector3 } from "three"
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

/** Where a handle can be grabbed: a bar along its half of the axis */
export type JogGrabArea = {
  /** Start of the bar, in px from the gizmo center, y pointing down */
  x: number
  y: number
  /** Length of the bar in px */
  length: number
  /** Direction of the bar on screen, in radians, y pointing down */
  angle: number
}

/**
 * The bar a handle can be grabbed along: its half of the axis, from `innerPx`
 * out from the center (which no handle owns) to `beyondTipPx` past the tip.
 * An axis pointing at the viewer has no length on screen, so its handle keeps
 * a bar of `minLengthPx` centered on the tip.
 */
export function grabAreaOf(
  handle: ProjectedJogHandle,
  sizes: {
    radiusPx: number
    innerPx: number
    beyondTipPx: number
    minLengthPx: number
  },
): JogGrabArea {
  const { radiusPx, innerPx, beyondTipPx, minLengthPx } = sizes
  const extent = Math.hypot(handle.x, handle.y)
  const angle = extent > 1e-6 ? Math.atan2(handle.y, handle.x) : 0
  const dx = Math.cos(angle)
  const dy = Math.sin(angle)
  const end = extent * radiusPx + beyondTipPx

  if (end - innerPx >= minLengthPx) {
    return { x: dx * innerPx, y: dy * innerPx, length: end - innerPx, angle }
  }

  const tipX = handle.x * radiusPx
  const tipY = handle.y * radiusPx
  return {
    x: tipX - (dx * minLengthPx) / 2,
    y: tipY - (dy * minLengthPx) / 2,
    length: minLengthPx,
    angle,
  }
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
