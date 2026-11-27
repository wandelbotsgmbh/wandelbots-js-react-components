import { Quaternion } from "three"
import { describe, expect, it } from "vitest"
import { about, expectTip, tipOf } from "./__fixtures__/helpers"
import { seenFrom, VIEWS } from "./__fixtures__/views"
import {
  grabAreasOf,
  type JogGrabSizes,
  type ProjectedJogHandle,
  projectJogHandles,
} from "./arrows"
import { fitGizmoRadiusPx, gizmoGrabSizes, gizmoMeasures } from "./gizmoShared"

describe("projectJogHandles", () => {
  it("draws an unturned frame as the camera sees it: X right, Y up, Z at the viewer", () => {
    const q = new Quaternion()

    expectTip(q, "x+", 1, 0)
    expectTip(q, "x-", -1, 0)
    expectTip(q, "y+", 0, -1)
    expectTip(q, "z+", 0, 0)
    expect(tipOf(q, "z+").depth).toBeGreaterThan(tipOf(q, "z-").depth)
  })

  it("turns the handles with the frame", () => {
    // X turned a quarter turn about Z points where Y was: up on screen
    expectTip(about([0, 0, 1], 90), "x+", 0, -1)
  })
})

describe("grabAreasOf", () => {
  const sizes: JogGrabSizes = {
    radiusPx: 100,
    gripPx: 30,
    innerPx: 12,
    beyondTipPx: 8,
    minTipPx: 16,
    headLength: 0.26,
  }
  const nameOf = (h: ProjectedJogHandle) => `${h.axis}${h.direction}`

  function areasOf(q: Quaternion, measures = sizes) {
    const handles = projectJogHandles(q)
    const areas = grabAreasOf(handles, measures)
    return {
      handles,
      areas,
      area: (name: string) =>
        areas[handles.findIndex((h) => nameOf(h) === name)],
    }
  }

  /**
   * The handle a press at (x, y) px from the center reaches, as the browser
   * picks among the bars laid over the gizmo: the highest layer wins
   */
  function pressAt(
    { handles, areas }: ReturnType<typeof areasOf>,
    x: number,
    y: number,
    measures = sizes,
  ) {
    let reached: string | null = null
    let layer = Number.NEGATIVE_INFINITY
    areas.forEach((area, i) => {
      if (!area) return
      const dx = Math.cos(area.angle)
      const dy = Math.sin(area.angle)
      const along = (x - area.x) * dx + (y - area.y) * dy
      const across = (y - area.y) * dx - (x - area.x) * dy
      const inside =
        along >= 0 &&
        along <= area.length &&
        Math.abs(across) <= measures.gripPx / 2
      if (inside && area.layer >= layer) {
        reached = nameOf(handles[i])
        layer = area.layer
      }
    })
    return reached
  }

  it("covers the handle's half of the axis, from beside the center to past the tip", () => {
    const area = areasOf(new Quaternion()).area("x+")

    expect(area?.x).toBeCloseTo(12)
    expect(area?.y).toBeCloseTo(0)
    expect(area?.length).toBeCloseTo(96)
    expect(area?.angle).toBeCloseTo(0)
  })

  it("points the way its half of the axis points on screen", () => {
    const { area } = areasOf(new Quaternion())
    // Y is up on screen, where screen y grows downward
    expect(area("y+")?.x).toBeCloseTo(0)
    expect(area("y+")?.y).toBeCloseTo(-12)
    expect(area("y+")?.angle).toBeCloseTo(-Math.PI / 2)
    expect(Math.abs(area("x-")?.angle ?? 0)).toBeCloseTo(Math.PI)
  })

  it("gets shorter as its axis turns toward the viewer", () => {
    // X turned 60° toward the viewer shows at half its length. Turned about
    // X too, so that no other arrow points the same way on screen.
    const area = areasOf(
      about([0, 1, 0], -60).multiply(about([1, 0, 0], 45)),
    ).area("x+")

    expect(area?.length).toBeCloseTo(50 - 12 + 8)
  })

  it("gives an axis pointing at the viewer no grab area: its two halves cannot be told apart", () => {
    const { area } = areasOf(new Quaternion())

    expect(area("z+")).toBeNull()
    expect(area("z-")).toBeNull()
  })

  it("gives the farther of two arrowheads drawn over each other no grab area", () => {
    // From the front, 40° up: Y+ points away and up on screen, Z+ up, and
    // their arrowheads overlap
    const { area } = areasOf(seenFrom(-90, 40))

    expect(area("y+")).toBeNull()
    expect(area("z+")).not.toBeNull()
  })

  it("never reaches across the center, whichever way the camera looks", () => {
    const crossing: string[] = []
    for (const [azimuth, elevation] of VIEWS) {
      const { handles, areas } = areasOf(seenFrom(azimuth, elevation))
      areas.forEach((area, i) => {
        if (!area) return
        const start =
          area.x * Math.cos(area.angle) + area.y * Math.sin(area.angle)
        if (start < sizes.innerPx - 1e-9) {
          crossing.push(`${nameOf(handles[i])} at ${azimuth}°/${elevation}°`)
        }
      })
    }

    expect(crossing.slice(0, 10)).toEqual([])
  })

  it("jogs along the arrow whose arrowhead is pressed, whichever way the camera looks", () => {
    // The measures of a gizmo of the default size
    const measures = gizmoGrabSizes(
      200,
      fitGizmoRadiusPx(200, 200, gizmoMeasures(200).marginPx),
    )
    const wrong: string[] = []
    for (const [azimuth, elevation] of VIEWS) {
      const layout = areasOf(seenFrom(azimuth, elevation), measures)
      layout.handles.forEach((handle, i) => {
        if (!layout.areas[i]) return
        for (const along of [0.74, 0.8, 0.87, 0.94, 1]) {
          const reached = pressAt(
            layout,
            handle.x * measures.radiusPx * along,
            handle.y * measures.radiusPx * along,
            measures,
          )
          if (reached !== nameOf(handle)) {
            wrong.push(
              `${nameOf(handle)} at ${azimuth}°/${elevation}° jogs ${reached}`,
            )
            return
          }
        }
      })
    }

    expect(wrong.slice(0, 10)).toEqual([])
  })
})
