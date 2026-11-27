import { describe, expect, it } from "vitest"
import { fitGizmoRadiusPx, gizmoMeasures } from "./gizmoShared"

describe("gizmoMeasures", () => {
  it("keeps a gizmo in proportion: at half the size, the halo and the room around it are half as large", () => {
    const large = gizmoMeasures(200)
    const small = gizmoMeasures(100)

    expect(small.marginPx).toBeCloseTo(large.marginPx / 2)
    expect(small.gripPx).toBeCloseTo(large.gripPx / 2)
    expect(small.grab.innerPx).toBeCloseTo(large.grab.innerPx / 2)
    expect(small.grab.beyondTipPx).toBeCloseTo(large.grab.beyondTipPx / 2)
    expect(small.grab.minTipPx).toBeCloseTo(large.grab.minTipPx / 2)
  })
})

describe("fitGizmoRadiusPx", () => {
  it("fits the gizmo into the shorter side of its canvas, leaving the margin free", () => {
    expect(fitGizmoRadiusPx(300, 200, 20)).toBe(80)
    expect(fitGizmoRadiusPx(200, 300, 20)).toBe(80)
  })

  it("stays drawable in a canvas not measured yet", () => {
    expect(fitGizmoRadiusPx(0, 0, 20)).toBeGreaterThan(0)
  })
})
