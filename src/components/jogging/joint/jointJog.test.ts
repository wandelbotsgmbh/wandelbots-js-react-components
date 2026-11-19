import { describe, expect, it } from "vitest"
import {
  directionToward,
  formatJointLimit,
  formatJointValue,
  fractionOf,
  hasReachedGoal,
  jointSliderRange,
  jointUnit,
  valueAt,
  zeroFraction,
} from "./jointJog"

const RANGE = { min: -2, max: 2 }

describe("jointSliderRange", () => {
  it("spans a joint's limits", () => {
    expect(jointSliderRange({ min: -1, max: 3 })).toEqual({
      min: -1,
      max: 3,
    })
  })

  it("spans a full turn for a revolute joint without limits", () => {
    expect(jointSliderRange({})).toEqual({
      min: -Math.PI,
      max: Math.PI,
    })
  })

  it("has no range for a linear axis without limits: nothing to place it in", () => {
    expect(jointSliderRange({ linear: true })).toBeNull()
  })

  it("ignores limits that span nothing", () => {
    expect(jointSliderRange({ min: 1, max: 1 })).toEqual({
      min: -Math.PI,
      max: Math.PI,
    })
  })
})

describe("fractionOf and valueAt", () => {
  it("place a value along the track and back", () => {
    expect(fractionOf(1, RANGE)).toBe(0.75)
    expect(valueAt(0.75, RANGE)).toBe(1)
  })

  it("clamp to the ends, so a goal past an end is the limit", () => {
    expect(fractionOf(5, RANGE)).toBe(1)
    expect(valueAt(-0.2, RANGE)).toBe(-2)
  })
})

describe("zeroFraction", () => {
  it("places the joint's zero on the track", () => {
    expect(zeroFraction({ min: -1, max: 3 })).toBe(0.25)
  })

  it("has no zero mark when zero lies outside the limits", () => {
    expect(zeroFraction({ min: 0.5, max: 3 })).toBeNull()
  })
})

describe("directionToward", () => {
  it("jogs toward the goal", () => {
    expect(directionToward(0, 1, 0.1)).toBe("+")
    expect(directionToward(0, -1, 0.1)).toBe("-")
  })

  it("does not jog to a goal within the deadband: the joint is there", () => {
    expect(directionToward(0, 0.05, 0.1)).toBeNull()
  })
})

describe("hasReachedGoal", () => {
  it("is reached at the goal or past it, as a jog overshoots before it stops", () => {
    expect(hasReachedGoal(1, 1, "+")).toBe(true)
    expect(hasReachedGoal(1.1, 1, "+")).toBe(true)
    expect(hasReachedGoal(0.9, 1, "+")).toBe(false)
    expect(hasReachedGoal(-1.1, -1, "-")).toBe(true)
  })
})

describe("jointUnit", () => {
  it("shows a linear axis in mm, a revolute joint in the angle unit", () => {
    expect(jointUnit(true, "deg")).toBe("mm")
    expect(jointUnit(false, "deg")).toBe("deg")
    expect(jointUnit(false, "rad")).toBe("rad")
  })
})

describe("formatJointValue", () => {
  it("shows radians in degrees, radians or a linear axis in mm", () => {
    expect(formatJointValue(Math.PI / 4, "deg")).toBe("45.0°")
    expect(formatJointValue(1.23456, "rad")).toBe("1.235 rad")
    expect(formatJointValue(12.34, "mm")).toBe("12.3 mm")
  })

  it("never shows -0.0", () => {
    expect(formatJointValue(-0.0001, "deg")).toBe("0.0°")
  })
})

describe("formatJointLimit", () => {
  it("shows a limit whole, with its sign, as the design does: -185° … +185°", () => {
    expect(formatJointLimit((185 * Math.PI) / 180, "deg")).toBe("+185°")
    expect(formatJointLimit((-185 * Math.PI) / 180, "deg")).toBe("-185°")
    expect(formatJointLimit(0, "deg")).toBe("0°")
    expect(formatJointLimit(-500, "mm")).toBe("-500 mm")
  })
})
