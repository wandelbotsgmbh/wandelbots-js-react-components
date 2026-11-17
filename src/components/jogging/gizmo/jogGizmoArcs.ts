import { type Quaternion, Vector3 } from "three"
import {
  JOG_AXES,
  JOG_DIRECTIONS,
  type JogAxis,
  type JogDirection,
} from "../jogHandle"
import { UNIT_VECTOR } from "./jogGizmoProjection"

// The rotation gizmo draws a circle about each axis and an arc per direction
// on it, with an arrowhead the way the arc turns, as the teaching app does

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

/** The px measures that {@link arcGrabAreasOf} lays the grab areas out by */
export type JogArcGrabSizes = {
  /** Px per gizmo radius */
  radiusPx: number
  /** Width of the band along an arc, and diameter of its arrowhead's circle */
  gripPx: number
  /** How far the band reaches past both ends of the arc as drawn */
  beyondTipPx: number
  /** Length of an arrowhead, in gizmo radii: it reaches half of it past the arc */
  headLength: number
}

/** Where a rotation handle can be grabbed: a band along its arc and a circle on its arrowhead */
export type JogArcGrabArea = {
  /**
   * The whole band, as a polygon in px from the gizmo center, y pointing
   * down: where the handle shows as hovered or held
   */
  band: { x: number; y: number }[]
  /**
   * The band in its two halves, which take the presses, each with a layer of
   * its own: the X and Y arcs of a direction meet halfway, right above or
   * below the center, and which of them is nearer flips there
   */
  halves: { polygon: { x: number; y: number }[]; layer: number }[]
  /** Center of the arrowhead's circle, in px from the gizmo center */
  head: { x: number; y: number }
  /** Where grab areas overlap, the one with the higher layer is on top */
  headLayer: number
}

type Point = { x: number; y: number; depth: number }

/** The nearest point to (x, y) on the line through `line`, with its depth */
function nearestOn(line: readonly Point[], x: number, y: number) {
  let best = { distance: Number.POSITIVE_INFINITY, depth: 0 }
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1]
    const b = line[i]
    const length2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2
    const t =
      length2 === 0
        ? 0
        : Math.min(
            1,
            Math.max(
              0,
              ((x - a.x) * (b.x - a.x) + (y - a.y) * (b.y - a.y)) / length2,
            ),
          )
    const distance = Math.hypot(
      x - (a.x + t * (b.x - a.x)),
      y - (a.y + t * (b.y - a.y)),
    )
    if (distance < best.distance) {
      best = { distance, depth: a.depth + t * (b.depth - a.depth) }
    }
  }
  return best
}

/**
 * The layers of pieces of arcs, from 1 at the bottom: where pieces of two
 * arcs come within a grip of each other, the one drawn nearer there lies on
 * top. Should that go round in a circle, the piece farther on average goes
 * below first.
 */
function layersOf(
  pieces: readonly { arc: number; line: readonly Point[] }[],
  gripPx: number,
) {
  const n = pieces.length
  // above[i][j]: piece i lies on top of piece j
  const above = pieces.map(() => new Array<boolean>(n).fill(false))
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (pieces[i].arc === pieces[j].arc) continue
      let nearer = 0
      for (const p of pieces[i].line) {
        const q = nearestOn(pieces[j].line, p.x, p.y)
        if (q.distance < gripPx) nearer += p.depth - q.depth
      }
      if (nearer > 0) above[i][j] = true
      else if (nearer < 0) above[j][i] = true
    }
  }

  const meanDepth = pieces.map(
    ({ line }) => line.reduce((sum, p) => sum + p.depth, 0) / line.length,
  )
  const byMeanDepth = (a: number, b: number) => meanDepth[a] - meanDepth[b]
  const layers = new Array<number>(n).fill(0)
  const remaining = new Set(pieces.keys())
  for (let layer = 1; remaining.size > 0; layer++) {
    const left = [...remaining]
    // A piece that lies on top of none of the others left can go below them
    const free = left.filter((i) => !left.some((j) => above[i][j]))
    const next = (free.length > 0 ? free : left).sort(byMeanDepth)[0]
    layers[next] = layer
    remaining.delete(next)
  }
  return layers
}

/** How many steps a round end of a band is drawn in */
const ROUND_END_STEPS = 8

/**
 * `line` with its last point moved `by` px along it: out past it, straight
 * on, when `by` is positive, and back in along it when negative
 */
function movedEnd(line: readonly Point[], by: number): Point[] {
  const moved = [...line]
  if (by >= 0) {
    const end = moved[moved.length - 1]
    const before = moved[moved.length - 2]
    const length = Math.hypot(end.x - before.x, end.y - before.y) || 1
    moved.push({
      x: end.x + ((end.x - before.x) / length) * by,
      y: end.y + ((end.y - before.y) / length) * by,
      depth: end.depth,
    })
    return moved
  }
  let left = -by
  while (moved.length > 2) {
    const end = moved[moved.length - 1]
    const before = moved[moved.length - 2]
    const length = Math.hypot(end.x - before.x, end.y - before.y)
    if (length > left) {
      const t = left / length
      moved[moved.length - 1] = {
        x: end.x + (before.x - end.x) * t,
        y: end.y + (before.y - end.y) * t,
        depth: end.depth + (before.depth - end.depth) * t,
      }
      return moved
    }
    left -= length
    moved.pop()
  }
  return moved
}

/** `line` with its first point moved `by` px along it, as {@link movedEnd} */
const movedStart = (line: readonly Point[], by: number) =>
  movedEnd([...line].reverse(), by).reverse()

/**
 * A band `width` wide around the line through `line`, with round ends about
 * the ends of the line, as the bars of the translation gizmo have. Gives the
 * polygon of the part of the band between two points of the line; only the
 * ends of the line are round.
 */
function bandAround(line: readonly { x: number; y: number }[], width: number) {
  const half = width / 2
  const left: { x: number; y: number }[] = []
  const right: { x: number; y: number }[] = []
  const normals: { x: number; y: number }[] = []
  let normal = { x: 0, y: 0 }
  for (const [i, p] of line.entries()) {
    const before = line[Math.max(0, i - 1)]
    const after = line[Math.min(line.length - 1, i + 1)]
    const tx = after.x - before.x
    const ty = after.y - before.y
    const length = Math.hypot(tx, ty)
    // Where the line stands still, keep the last normal
    if (length > 1e-9) normal = { x: -ty / length, y: tx / length }
    normals.push(normal)
    left.push({ x: p.x + normal.x * half, y: p.y + normal.y * half })
    right.push({ x: p.x - normal.x * half, y: p.y - normal.y * half })
  }

  /** Half a circle about point `i`, from one edge to the other, forward or back */
  const roundEnd = (i: number, forward: boolean) => {
    const n = normals[i]
    // Along the line, toward its last point
    const t = { x: n.y, y: -n.x }
    const sign = forward ? 1 : -1
    return Array.from({ length: ROUND_END_STEPS - 1 }, (_, k) => {
      const angle = (Math.PI * (k + 1)) / ROUND_END_STEPS
      const c = Math.cos(angle) * sign
      const s = Math.sin(angle) * sign
      return {
        x: line[i].x + (n.x * c + t.x * s) * half,
        y: line[i].y + (n.y * c + t.y * s) * half,
      }
    })
  }

  return (from: number, to: number) => [
    ...left.slice(from, to + 1),
    ...(to === line.length - 1 ? roundEnd(to, true) : []),
    ...right.slice(from, to + 1).reverse(),
    ...(from === 0 ? roundEnd(from, false) : []),
  ]
}

/**
 * The two halves of a line of `count` points, split at point `middle`. They
 * overlap by a point each way, so that no seam lies between them.
 */
function halvesOf(count: number, middle: number) {
  return [
    { from: 0, to: Math.min(count - 1, middle + 1) },
    { from: Math.max(0, middle - 1), to: count - 1 },
  ]
}

/**
 * Where each of `arcs` can be grabbed, in the same order: a band along the
 * arc, from its start to past its arrowhead, and a circle on the arrowhead.
 * `null` where a press could not tell which way the handle turns. So a press
 * turns the way the arc drawn there points, never another one:
 *
 * - An axis seen (almost) edge on, where the near and far sides of its circle
 *   lie within a grip of each other, draws its arcs over each other with
 *   their arrowheads pointing the same way: neither is grabbed.
 * - Where two arcs come within a grip of each other, the one drawn nearer
 *   there lies on top.
 * - An arrowhead is the obvious thing to grab: its circle lies above every
 *   band, also where another arc passes over it. Of two arrowheads drawn
 *   over each other, the nearer lies on top.
 */
export function arcGrabAreasOf(
  arcs: readonly ProjectedJogArc[],
  { radiusPx, gripPx, beyondTipPx, headLength }: JogArcGrabSizes,
): (JogArcGrabArea | null)[] {
  const half = gripPx / 2
  // Room past the ends of the arc as drawn, as the bars of the translation
  // gizmo have past their tips: past the tip of the arrowhead, which reaches
  // half its length past the arc, and before the other end. The round ends
  // of the band lie half a grip in from where it reaches.
  const pastHead = (headLength / 2) * radiusPx + beyondTipPx - half
  const beforeTail = beyondTipPx - half
  const arcLines = arcs.map((arc) => {
    const line = arc.points.map((p) => ({
      x: p.x * radiusPx,
      y: p.y * radiusPx,
      depth: p.depth,
    }))
    const middle = line[line.length >> 1]
    const moved =
      arc.direction === "+"
        ? movedStart(movedEnd(line, pastHead), beforeTail)
        : movedEnd(movedStart(line, pastHead), beforeTail)
    return { line: moved, middle: moved.indexOf(middle) }
  })
  const lines = arcLines.map(({ line }) => line)
  const grabbed = arcs.map(
    (arc) => 2 * ARC_RADIUS * radiusPx * arc.openness >= gripPx,
  )

  const pieces = lines.flatMap((line, arc) =>
    grabbed[arc]
      ? halvesOf(line.length, arcLines[arc].middle).map(({ from, to }) => ({
          arc,
          from,
          to,
          line: line.slice(from, to + 1),
        }))
      : [],
  )
  const layers = layersOf(pieces, gripPx)
  // The arrowheads above all bands, the nearest at the top
  const farToNear = arcs
    .map((_, i) => i)
    .sort((a, b) => arcs[a].head.depth - arcs[b].head.depth)

  return arcs.map((arc, i) => {
    if (!grabbed[i]) return null
    const polygon = bandAround(lines[i], gripPx)
    const own = pieces.flatMap((piece, k) =>
      piece.arc === i ? [{ ...piece, layer: layers[k] }] : [],
    )
    return {
      band: polygon(0, lines[i].length - 1),
      halves: own.map(({ from, to, layer }) => ({
        polygon: polygon(from, to),
        layer,
      })),
      head: { x: arc.head.x * radiusPx, y: arc.head.y * radiusPx },
      headLayer: pieces.length + 1 + farToNear.indexOf(i),
    }
  })
}
