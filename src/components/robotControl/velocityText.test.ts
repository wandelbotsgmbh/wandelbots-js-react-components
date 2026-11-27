import { describe, expect, it } from "vitest"
import { parseVelocityText } from "./velocityText"

// Ported from RobotPad (unit/velocityInput.test.ts)

describe("parseVelocityText", () => {
  it("accepts whole numbers and decimals inside the range", () => {
    expect(parseVelocityText("25", 1, 250)).toEqual({
      kind: "valid",
      value: 25,
    })
    expect(parseVelocityText("24.9", 1, 250)).toEqual({
      kind: "valid",
      value: 24.9,
    })
    expect(parseVelocityText(" 30 ", 1, 250)).toEqual({
      kind: "valid",
      value: 30,
    })
  })

  it("accepts a comma as decimal separator", () => {
    expect(parseVelocityText("12,5", 1, 250)).toEqual({
      kind: "valid",
      value: 12.5,
    })
  })

  it("includes the range bounds", () => {
    expect(parseVelocityText("1", 1, 250)).toEqual({ kind: "valid", value: 1 })
    expect(parseVelocityText("250", 1, 250)).toEqual({
      kind: "valid",
      value: 250,
    })
  })

  it("reports values outside the range instead of clamping them", () => {
    for (const text of ["999", "0.5", "-5"]) {
      expect(parseVelocityText(text, 1, 250)).toEqual({ kind: "outOfRange" })
    }
  })

  it("reports text that is not a plain number", () => {
    for (const text of ["abc", "25 mm/s", "1e3", "1.2.3", "12,5,1", "."]) {
      expect(parseVelocityText(text, 1, 250)).toEqual({ kind: "notANumber" })
    }
  })

  it("reports an empty field separately", () => {
    expect(parseVelocityText("", 1, 250)).toEqual({ kind: "empty" })
    expect(parseVelocityText("   ", 1, 250)).toEqual({ kind: "empty" })
  })
})
