import { Quaternion } from "three"
import { describe, expect, it } from "vitest"
import { arcName, arcOf } from "./__fixtures__/helpers"
import { seenFrom, VIEWS } from "./__fixtures__/views"
import {
  ARC_BASIS,
  ARC_RADIUS,
  arcAngles,
  type ProjectedJogArc,
  projectJogArcs,
} from "./arcs"
import { UNIT_VECTOR } from "./gizmoView"

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
          wrong.push(`${arcName(arc)} at ${azimuth}°/${elevation}°`)
        }
      }
    }

    expect(wrong.slice(0, 10)).toEqual([])
  })
})
