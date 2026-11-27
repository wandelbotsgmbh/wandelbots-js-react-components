import { describe, expect, it } from "vitest"
import {
  getDefaultTranslationVelocityMmPerSec,
  T1_MAX_TCP_VELOCITY_MM_PER_SEC,
} from "./joggingVelocity"

// Ported from RobotPad (unit/defaultTranslationVelocity.test.ts)

/** A limit set that only carries a TCP velocity limit in mm/s */
function tcpLimit(velocity: number) {
  return { tcp: { velocity } }
}

describe("getDefaultTranslationVelocityMmPerSec", () => {
  it("caps the T1 max at 250 mm/s", () => {
    expect(T1_MAX_TCP_VELOCITY_MM_PER_SEC).toBe(250)
  })

  it("is 25 mm/s when the robot reports no manual limits", () => {
    expect(getDefaultTranslationVelocityMmPerSec(undefined)).toBe(25)
    expect(getDefaultTranslationVelocityMmPerSec({})).toBe(25)
    expect(
      getDefaultTranslationVelocityMmPerSec({ manual_t1_limits: {} }),
    ).toBe(25)
  })

  it("is 25 mm/s when the T1 limit is 250 mm/s or higher", () => {
    for (const velocity of [250, 1000, 5000]) {
      expect(
        getDefaultTranslationVelocityMmPerSec({
          manual_t1_limits: tcpLimit(velocity),
        }),
      ).toBe(25)
    }
  })

  it("is 10% of a T1 limit below 250 mm/s", () => {
    expect(
      getDefaultTranslationVelocityMmPerSec({
        manual_t1_limits: tcpLimit(100),
      }),
    ).toBe(10)
  })

  it("uses the generic manual limit when it is lower than the T1 limit", () => {
    // e.g. Yaskawa: no separate T1 mode, reduced speed reported as manual_limits
    expect(
      getDefaultTranslationVelocityMmPerSec({
        manual_t1_limits: tcpLimit(1500),
        manual_limits: tcpLimit(249),
      }),
    ).toBe(24.9)
  })

  it("ignores automatic and T2 limits", () => {
    expect(
      getDefaultTranslationVelocityMmPerSec({
        auto_limits: tcpLimit(100),
        manual_t2_limits: tcpLimit(100),
      }),
    ).toBe(25)
  })

  it("ignores zero, negative and non-numeric limits", () => {
    for (const velocity of [0, -10, Number.NaN]) {
      expect(
        getDefaultTranslationVelocityMmPerSec({
          manual_t1_limits: tcpLimit(velocity),
        }),
      ).toBe(25)
    }
  })
})
