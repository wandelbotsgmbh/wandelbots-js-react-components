import { Quaternion, Vector3 } from "three"
import { describe, expect, it } from "vitest"
import { seenFrom, VIEWS } from "./__fixtures__/views"
import { gizmoArcGrabSizes, gizmoMeasures } from "./gizmoShared"
import {
  ARC_BASIS,
  ARC_RADIUS,
  arcAngles,
  arcGrabAreasOf,
  type JogArcGrabArea,
  type JogArcGrabSizes,
  type ProjectedJogArc,
  projectJogArcs,
} from "./jogGizmoArcs"
import { fitGizmoRadiusPx, UNIT_VECTOR } from "./jogGizmoProjection"

const about = (axis: [number, number, number], degrees: number) =>
  new Quaternion().setFromAxisAngle(
    new Vector3(...axis),
    (degrees * Math.PI) / 180,
  )

const nameOf = (arc: ProjectedJogArc) => `${arc.axis}${arc.direction}`

function arcOf(arcs: ProjectedJogArc[], name: string) {
  const arc = arcs.find((a) => nameOf(a) === name)
  if (!arc) throw new Error(`no arc ${name}`)
  return arc
}

describe("projectJogArcs", () => {
  it("draws each axis's arcs on a circle about it: seen along Z, Z's circle is round and X's and Y's are lines", () => {
    const arcs = projectJogArcs(new Quaternion())

    for (const name of ["z+", "z-"]) {
      const arc = arcOf(arcs, name)
      expect(arc.openness).toBeCloseTo(1)
      for (const p of arc.points) {
        expect(Math.hypot(p.x, p.y)).toBeCloseTo(ARC_RADIUS)
        expect(p.depth).toBeCloseTo(0)
      }
    }
    for (const name of ["x+", "x-"]) {
      const arc = arcOf(arcs, name)
      expect(arc.openness).toBeCloseTo(0)
      for (const p of arc.points) expect(p.x).toBeCloseTo(0)
    }
  })

  it("turns the + arc counterclockwise as seen from the tip of its axis, the − arc clockwise (right-hand rule)", () => {
    // Seen along Z, from its tip
    const arcs = projectJogArcs(new Quaternion())
    // Screen y grows downward, so a counterclockwise turn has a negative
    // cross product of where the arrowhead is and where it points
    const turn = ({ head }: ProjectedJogArc) =>
      head.x * head.dy - head.y * head.dx

    expect(turn(arcOf(arcs, "z+"))).toBeLessThan(0)
    expect(turn(arcOf(arcs, "z-"))).toBeGreaterThan(0)
  })

  it("points each arrowhead the way its rotation moves it on screen, whichever way the camera looks", () => {
    const wrong: string[] = []
    const step = 1e-4
    for (const [azimuth, elevation] of VIEWS) {
      const q = seenFrom(azimuth, elevation)
      for (const arc of projectJogArcs(q)) {
        // The arrowhead's point, turned a little about the axis the way the
        // handle turns
        const [u, v] = ARC_BASIS[arc.axis]
        const angle = arcAngles(arc.direction).head
        const point = u
          .clone()
          .multiplyScalar(Math.cos(angle) * ARC_RADIUS)
          .addScaledVector(v, Math.sin(angle) * ARC_RADIUS)
        const turned = point
          .clone()
          .applyQuaternion(
            new Quaternion().setFromAxisAngle(
              UNIT_VECTOR[arc.axis],
              arc.direction === "+" ? step : -step,
            ),
          )
        const from = point.applyQuaternion(q)
        const to = turned.applyQuaternion(q)
        const dx = to.x - from.x
        const dy = -(to.y - from.y)
        const length = Math.hypot(dx, dy)
        // Moving (almost) straight at the viewer: no way on screen to check
        if (length < 0.05 * step) continue
        const agreement = (dx * arc.head.dx + dy * arc.head.dy) / length
        if (agreement < Math.cos((0.5 * Math.PI) / 180)) {
          wrong.push(`${nameOf(arc)} at ${azimuth}°/${elevation}°`)
        }
      }
    }

    expect(wrong.slice(0, 10)).toEqual([])
  })
})

describe("arcGrabAreasOf", () => {
  const sizes: JogArcGrabSizes = {
    radiusPx: 100,
    gripPx: 30,
    beyondTipPx: 8,
    headLength: 0.26,
  }

  function layoutOf(q: Quaternion, measures = sizes, samples?: number) {
    const arcs = projectJogArcs(q, samples)
    const areas = arcGrabAreasOf(arcs, measures)
    return {
      arcs,
      areas,
      area: (name: string) => areas[arcs.findIndex((a) => nameOf(a) === name)],
    }
  }

  /** Whether (x, y) lies in `polygon`, by the nonzero rule of CSS */
  function inPolygon(
    polygon: { x: number; y: number }[],
    x: number,
    y: number,
  ) {
    let winding = 0
    for (const [i, a] of polygon.entries()) {
      const b = polygon[(i + 1) % polygon.length]
      const side = (b.x - a.x) * (y - a.y) - (x - a.x) * (b.y - a.y)
      if (a.y <= y && b.y > y && side > 0) winding++
      else if (a.y > y && b.y <= y && side < 0) winding--
    }
    return winding !== 0
  }

  /** Whether (x, y) lies in a half of the band of `area`, which take the presses */
  const inBand = (area: JogArcGrabArea, x: number, y: number) =>
    area.halves.some(({ polygon }) => inPolygon(polygon, x, y))

  /**
   * The handle a press at (x, y) px from the center reaches, as the browser
   * picks among the bands and arrowhead circles laid over the gizmo: the
   * highest layer wins
   */
  function pressAt(
    { arcs, areas }: ReturnType<typeof layoutOf>,
    x: number,
    y: number,
    measures = sizes,
  ) {
    let reached: string | null = null
    let layer = Number.NEGATIVE_INFINITY
    areas.forEach((area, i) => {
      if (!area) return
      const onHead =
        Math.hypot(x - area.head.x, y - area.head.y) <= measures.gripPx / 2
      if (onHead && area.headLayer > layer) {
        reached = nameOf(arcs[i])
        layer = area.headLayer
      }
      for (const half of area.halves) {
        if (half.layer > layer && inPolygon(half.polygon, x, y)) {
          reached = nameOf(arcs[i])
          layer = half.layer
        }
      }
    })
    return reached
  }

  /** Distance from (x, y) to the line through an arc's points, in px */
  function distanceToArc(arc: ProjectedJogArc, x: number, y: number, px = 1) {
    let nearest = Number.POSITIVE_INFINITY
    for (let i = 1; i < arc.points.length; i++) {
      const a = arc.points[i - 1]
      const b = arc.points[i]
      const ax = a.x * px
      const ay = a.y * px
      const bx = b.x * px
      const by = b.y * px
      const length2 = (bx - ax) ** 2 + (by - ay) ** 2
      const t =
        length2 === 0
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                ((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / length2,
              ),
            )
      nearest = Math.min(
        nearest,
        Math.hypot(x - (ax + t * (bx - ax)), y - (ay + t * (by - ay))),
      )
    }
    return nearest
  }

  /** The measures of a gizmo of the default size */
  const DEFAULT_SIZES = gizmoArcGrabSizes(
    200,
    fitGizmoRadiusPx(200, 200, gizmoMeasures(200).marginPx),
  )

  it("lays a band a grip wide along the arc, with room past both ends as the translation bars have past their tips", () => {
    // Seen along Z, Z's circle is round: a point at `angle` on it lies at
    // (cos, -sin) times its radius on screen
    const area = layoutOf(new Quaternion()).area("z+")
    if (!area) throw new Error("no grab area")
    const r = ARC_RADIUS * sizes.radiusPx
    const at = (angle: number, radius = r): [number, number] => [
      Math.cos(angle) * radius,
      -Math.sin(angle) * radius,
    ]
    const { start, end } = arcAngles("+")
    const middle = (start + end) / 2

    expect(inBand(area, ...at(middle))).toBe(true)
    expect(inBand(area, ...at(middle, r + 13))).toBe(true)
    expect(inBand(area, ...at(middle, r - 13))).toBe(true)
    expect(inBand(area, ...at(middle, r + 17))).toBe(false)
    expect(inBand(area, ...at(middle, r - 17))).toBe(false)
    // 8 px of room before the start of the arc, with a round end: its corner
    // lies outside
    expect(inBand(area, ...at(start - 4 / r))).toBe(true)
    expect(inBand(area, ...at(start - 12 / r))).toBe(false)
    expect(inBand(area, ...at(start - 8 / r, r + 13))).toBe(false)
    // 8 px of room past the tip of the arrowhead, which sits at the end of a
    // + arc and reaches 13 px past its center (half its length)
    const [hx, hy] = at(end)
    const { dx, dy } = layoutOf(new Quaternion()).arcs.find(
      (a) => nameOf(a) === "z+",
    )?.head ?? { dx: 0, dy: 0 }
    expect(inBand(area, hx + dx * 18, hy + dy * 18)).toBe(true)
    expect(inBand(area, hx + dx * 25, hy + dy * 25)).toBe(false)
  })

  it("shows the whole band where its halves take presses, so a highlight covers it once", () => {
    const area = layoutOf(seenFrom(30, 25)).area("z+")
    if (!area) throw new Error("no grab area")
    const { band, halves } = area

    for (let x = -100; x <= 100; x += 4) {
      for (let y = -100; y <= 100; y += 4) {
        const inHalf = halves.some(({ polygon }) => inPolygon(polygon, x, y))
        expect(inPolygon(band, x, y)).toBe(inHalf)
      }
    }
  })

  it("puts the arrowhead's grab circle on the arrowhead", () => {
    const { arcs, area } = layoutOf(new Quaternion())
    const head = arcOf(arcs, "z-").head

    expect(area("z-")?.head.x).toBeCloseTo(head.x * sizes.radiusPx)
    expect(area("z-")?.head.y).toBeCloseTo(head.y * sizes.radiusPx)
  })

  it("gives an axis seen edge on no grab areas: which way its arcs turn cannot be seen", () => {
    const { area } = layoutOf(new Quaternion())

    for (const name of ["x+", "x-", "y+", "y-"]) {
      expect(area(name)).toBeNull()
    }
    expect(area("z+")).not.toBeNull()
    expect(area("z-")).not.toBeNull()
  })

  it("grabs an axis's arcs again once its circle is open enough to tell its two sides apart", () => {
    // X turned toward the viewer, so its circle opens: by 7° its two sides
    // are still within a grip of each other, by 15° they are not
    expect(layoutOf(about([0, 1, 0], -7)).area("x+")).toBeNull()
    expect(layoutOf(about([0, 1, 0], -15)).area("x+")).not.toBeNull()
  })

  it("turns the handle whose arrowhead is pressed, also where another arc passes over it, whichever way the camera looks", () => {
    const wrong: string[] = []
    let covered = 0
    for (const [azimuth, elevation] of VIEWS) {
      const layout = layoutOf(seenFrom(azimuth, elevation), DEFAULT_SIZES)
      layout.areas.forEach((area, i) => {
        if (!area) return
        const { x, y } = area.head
        // Two arrowheads drawn over each other: the nearer one takes it
        const crowded = layout.areas.some(
          (other, j) =>
            other &&
            j !== i &&
            Math.hypot(other.head.x - x, other.head.y - y) <
              DEFAULT_SIZES.gripPx,
        )
        if (crowded) return
        const underArc = layout.areas.some(
          (other, j) =>
            other &&
            j !== i &&
            distanceToArc(layout.arcs[j], x, y, DEFAULT_SIZES.radiusPx) <
              DEFAULT_SIZES.gripPx / 2,
        )
        if (underArc) covered++
        const reached = pressAt(layout, x, y, DEFAULT_SIZES)
        if (reached !== nameOf(layout.arcs[i])) {
          wrong.push(
            `${nameOf(layout.arcs[i])} at ${azimuth}°/${elevation}° turns ${reached}`,
          )
        }
      })
    }

    // The sweep has to find arrowheads under arcs, or it checks only the easy case
    expect(covered).toBeGreaterThan(50)
    expect(wrong.slice(0, 10)).toEqual([])
  })

  it("turns the handle whose arc is pressed, wherever no other handle's band lies", () => {
    const wrong: string[] = []
    const { radiusPx, gripPx } = DEFAULT_SIZES
    for (const [azimuth, elevation] of VIEWS) {
      const layout = layoutOf(seenFrom(azimuth, elevation), DEFAULT_SIZES)
      layout.areas.forEach((area, i) => {
        if (!area) return
        const { points } = layout.arcs[i]
        for (const k of [2, points.length >> 2, points.length >> 1]) {
          const x = points[k].x * radiusPx
          const y = points[k].y * radiusPx
          const crowded = layout.areas.some(
            (other, j) =>
              other &&
              j !== i &&
              (inBand(other, x, y) ||
                Math.hypot(other.head.x - x, other.head.y - y) <
                  gripPx / 2 + 1),
          )
          if (crowded) continue
          const reached = pressAt(layout, x, y, DEFAULT_SIZES)
          if (reached !== nameOf(layout.arcs[i])) {
            wrong.push(
              `${nameOf(layout.arcs[i])} at ${azimuth}°/${elevation}° turns ${reached}`,
            )
            return
          }
        }
      })
    }

    expect(wrong.slice(0, 10)).toEqual([])
  })

  it("gives a press where two arcs cross to the one drawn nearer there, whichever way the camera looks", () => {
    const wrong: string[] = []
    let crossings = 0
    const { radiusPx, gripPx } = DEFAULT_SIZES
    for (const [azimuth, elevation] of VIEWS) {
      const layout = layoutOf(seenFrom(azimuth, elevation), DEFAULT_SIZES, 96)
      const { arcs, areas } = layout
      for (const [i, a] of arcs.entries()) {
        if (!areas[i]) continue
        for (const [j, b] of arcs.entries()) {
          if (j <= i || !areas[j] || a.axis === b.axis) continue
          // An arc's ends lie on the edge of its band: a press there is
          // half outside it
          const ends = [a, b].flatMap(({ points }) => [
            points[0],
            points[points.length - 1],
          ])
          for (const p of a.points) {
            const x = p.x * radiusPx
            const y = p.y * radiusPx
            if (distanceToArc(b, x, y, radiusPx) > 1) continue
            const atAnEnd = ends.some(
              (end) =>
                Math.hypot(end.x * radiusPx - x, end.y * radiusPx - y) < 2,
            )
            if (atAnEnd) continue
            // The point of b drawn there, and how near it is
            const q = b.points.reduce((best, c) =>
              Math.hypot(c.x * radiusPx - x, c.y * radiusPx - y) <
              Math.hypot(best.x * radiusPx - x, best.y * radiusPx - y)
                ? c
                : best,
            )
            // Too close to tell which is nearer, or crowded by more arcs
            if (Math.abs(p.depth - q.depth) < 0.1) continue
            const crowded = areas.some(
              (other, k) =>
                other &&
                k !== i &&
                k !== j &&
                distanceToArc(arcs[k], x, y, radiusPx) < gripPx,
            )
            const nearHead = areas.some(
              (other) =>
                other &&
                Math.hypot(other.head.x - x, other.head.y - y) < gripPx,
            )
            if (crowded || nearHead) continue
            crossings++
            const nearer = p.depth > q.depth ? a : b
            const reached = pressAt(layout, x, y, DEFAULT_SIZES)
            if (reached !== nameOf(nearer)) {
              wrong.push(
                `${nameOf(a)} × ${nameOf(b)} at ${azimuth}°/${elevation}° turns ${reached} (${x.toFixed(1)},${y.toFixed(1)} ${p.depth.toFixed(2)}/${q.depth.toFixed(2)})`,
              )
            }
          }
        }
      }
    }

    // The sweep has to find crossings, or it checks nothing
    expect(crossings).toBeGreaterThan(100)
    expect(wrong.slice(0, 10)).toEqual([])
  })
})
