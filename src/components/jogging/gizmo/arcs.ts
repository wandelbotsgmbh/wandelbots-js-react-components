import { type Quaternion, Vector3 } from "three"
import {
  JOG_AXES,
  JOG_DIRECTIONS,
  type JogAxis,
  type JogDirection,
} from "../jogHandle"
import { UNIT_VECTOR } from "./gizmoView"

// The rotation gizmo draws a circle about each axis and an arc per direction
// on it, with an arrowhead the way the arc turns, as the teaching app does.
// Where each arc can be pressed is in arcGrabAreas.ts.

/** Radius of the circles, in gizmo radii: an arrow of the translation gizmo is 1 long */
export const ARC_RADIUS = 0.8

/** Where the + arc starts on its circle, in radians */
export const ARC_START = 0.45

/** How far an arc reaches around its circle, in radians */
export const ARC_SWEEP = 2.25

/**
 * The plane of each axis's circle: angle 0 lies along the first vector, a
 * quarter turn along the second. Their cross product is the axis, so a
 * growing angle turns the positive way about it (right-hand rule).
 */
export const ARC_BASIS: Record<JogAxis, readonly [Vector3, Vector3]> = {
  x: [new Vector3(0, 1, 0), new Vector3(0, 0, 1)],
  y: [new Vector3(-1, 0, 0), new Vector3(0, 0, 1)],
  z: [new Vector3(1, 0, 0), new Vector3(0, 1, 0)],
}

/**
 * Where the arc of `direction` starts and ends on its circle, and where its
 * arrowhead sits, in radians. The − arc is the + arc half a turn on, with its
 * arrowhead at its start, pointing back: the two arrowheads sit beside each
 * other and point apart.
 */
export function arcAngles(direction: JogDirection) {
  const start = direction === "+" ? ARC_START : ARC_START + Math.PI
  const end = start + ARC_SWEEP
  return { start, end, head: direction === "+" ? end : start }
}

/** A rotation handle's arc where the gizmo draws it */
export type ProjectedJogArc = {
  axis: JogAxis
  direction: JogDirection
  /**
   * Points along the arc from its start to its end: in gizmo radii from the
   * center, y pointing down as on screen, depth toward the viewer
   */
  points: { x: number; y: number; depth: number }[]
  /** The arrowhead, and the way it points on screen (a unit vector, or 0 when it points at the viewer) */
  head: { x: number; y: number; depth: number; dx: number; dy: number }
  /** How open the circle looks: 1 seen face on, 0 edge on */
  openness: number
}

const point = new Vector3()

const tangent = new Vector3()

const axisSeen = new Vector3()

/**
 * Where the arcs of a gizmo turned by `frameInCamera` appear, each with
 * `samples` + 1 points
 */
export function projectJogArcs(
  frameInCamera: Quaternion,
  samples = 24,
): ProjectedJogArc[] {
  const arcs: ProjectedJogArc[] = []
  for (const axis of JOG_AXES) {
    const [u, v] = ARC_BASIS[axis]
    const at = (angle: number) =>
      point
        .copy(u)
        .multiplyScalar(Math.cos(angle) * ARC_RADIUS)
        .addScaledVector(v, Math.sin(angle) * ARC_RADIUS)
        .applyQuaternion(frameInCamera)
    const openness = Math.abs(
      axisSeen.copy(UNIT_VECTOR[axis]).applyQuaternion(frameInCamera).z,
    )

    for (const direction of JOG_DIRECTIONS) {
      const { start, end, head } = arcAngles(direction)
      const points = []
      for (let i = 0; i <= samples; i++) {
        const p = at(start + ((end - start) * i) / samples)
        // `+ 0` folds -0 into 0
        points.push({ x: p.x + 0, y: -p.y + 0, depth: p.z })
      }

      const h = at(head)
      const headPoint = { x: h.x + 0, y: -h.y + 0, depth: h.z }
      // The way the arc turns at its arrowhead: along the circle, backward
      // for the − arc
      const sign = direction === "+" ? 1 : -1
      tangent
        .copy(u)
        .multiplyScalar(-Math.sin(head) * sign)
        .addScaledVector(v, Math.cos(head) * sign)
        .applyQuaternion(frameInCamera)
      const length = Math.hypot(tangent.x, tangent.y)
      const dx = length > 1e-9 ? tangent.x / length : 0
      const dy = length > 1e-9 ? -tangent.y / length : 0

      arcs.push({
        axis,
        direction,
        points,
        head: { ...headPoint, dx: dx + 0, dy: dy + 0 },
        openness,
      })
    }
  }
  return arcs
}
