import { describe, expect, it } from "vitest"
import { gizmoMeasures } from "./gizmoShared"

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

  it("keeps the axis labels readable on a small gizmo", () => {
    expect(gizmoMeasures(60).labelFontPx).toBeGreaterThanOrEqual(10)
  })
})
