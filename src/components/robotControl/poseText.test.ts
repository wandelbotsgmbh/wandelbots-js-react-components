import { describe, expect, it } from "vitest"
import {
  jointsToText,
  parseJointsText,
  parsePoseText,
  poseToText,
} from "./poseText"

// The same rules as robot-pad's typed target pose (unit/poseParsing.test.ts),
// so a pose copied in one app parses the same in the other

describe("poseToText", () => {
  it("writes a pose as robot-pad's copy button does: mm to 0.1, rad to 0.0001", () => {
    expect(
      poseToText({
        position: [539.94, 0, 895],
        orientation: [-2.34567, -0.04, 0.8],
      }),
    ).toBe("(539.9, 0, 895, -2.3457, -0.04, 0.8)")
  })

  it("writes 0 for what a NOVA pose leaves out", () => {
    expect(poseToText({ position: [1, 2, 3] })).toBe("(1, 2, 3, 0, 0, 0)")
  })

  it("rounds to the precision asked for", () => {
    expect(
      poseToText(
        { position: [1.234, 0, 0], orientation: [0.123456, 0, 0] },
        { positionPrecision: 2, rotationPrecision: 2 },
      ),
    ).toBe("(1.23, 0, 0, 0.12, 0, 0)")
  })
})

// Ported from RobotPad (unit/poseParsing.test.ts, parseJointPoseInput)
describe("jointsToText and parseJointsText", () => {
  it("parses what jointsToText writes", () => {
    const text = jointsToText([1.2215, -0.5, 0.0002, -1.5708, 0.75, 3.1])

    expect(text).toBe("[1.2215, -0.5, 0.0002, -1.5708, 0.75, 3.1]")
    expect(parseJointsText(text, 6)).toEqual([
      1.2215, -0.5, 0.0002, -1.5708, 0.75, 3.1,
    ])
  })

  it("accepts values without brackets", () => {
    expect(parseJointsText("1, 2, 3, 4, 5, 6", 6)).toEqual([1, 2, 3, 4, 5, 6])
  })

  it("respects the expected joint count", () => {
    expect(parseJointsText("[1, 2, 3, 4]", 4)).toEqual([1, 2, 3, 4])
    expect(parseJointsText("[1, 2, 3, 4]", 6)).toBeNull()
    expect(parseJointsText("[1, 2, 3, 4, 5, 6]", 4)).toBeNull()
  })

  it("rejects the cartesian bracket style", () => {
    expect(parseJointsText("(1, 2, 3, 4, 5, 6)", 6)).toBeNull()
  })

  it("rejects malformed input", () => {
    expect(parseJointsText("[1, 2 3, 4, 5, 6]", 6)).toBeNull()
    expect(parseJointsText("[1, 2, x, 4, 5, 6]", 6)).toBeNull()
    expect(parseJointsText("", 6)).toBeNull()
  })
})

describe("parsePoseText", () => {
  it("parses what poseToText writes", () => {
    const pose = {
      position: [-221.9, -607.5, -139.2] as [number, number, number],
      orientation: [-2.3032, -2.4923, -2.6396] as [number, number, number],
    }

    expect(parsePoseText(poseToText(pose))).toEqual(pose)
  })

  it("accepts values without parentheses", () => {
    expect(parsePoseText("1, 2, 3, 0.1, 0.2, 0.3")).toEqual({
      position: [1, 2, 3],
      orientation: [0.1, 0.2, 0.3],
    })
  })

  it("tolerates irregular whitespace", () => {
    expect(parsePoseText("  ( 1,2 ,  3,0.1,0.2,0.3 )  ")).toEqual({
      position: [1, 2, 3],
      orientation: [0.1, 0.2, 0.3],
    })
  })

  it("accepts scientific notation and leading plus signs", () => {
    expect(parsePoseText("(1e2, +2, -3.5, 0, 0, 1.2e-4)")).toEqual({
      position: [100, 2, -3.5],
      orientation: [0, 0, 0.00012],
    })
  })

  it("rejects a forgotten comma between values", () => {
    expect(
      parsePoseText("(-110, -400, -120 -2.3032, -2.4923, -2.6396)"),
    ).toBeNull()
  })

  it("rejects wrong value counts", () => {
    expect(parsePoseText("(1, 2, 3)")).toBeNull()
    expect(parsePoseText("(1, 2, 3, 4, 5, 6, 7)")).toBeNull()
  })

  it("rejects non-numeric input", () => {
    expect(parsePoseText("(1, 2, three, 4, 5, 6)")).toBeNull()
    expect(parsePoseText("(1, 2, NaN, 4, 5, 6)")).toBeNull()
    expect(parsePoseText("(1, 2, Infinity, 4, 5, 6)")).toBeNull()
  })

  it("rejects a long run of digits at once", () => {
    // A pasted blob: checking one value must not go over its digits again
    // and again (seconds for 50,000 of them)
    const started = performance.now()
    expect(parsePoseText(`${"1".repeat(50_000)}x, 0, 0, 0, 0, 0`)).toBeNull()
    expect(performance.now() - started).toBeLessThan(500)
  })

  it("rejects empty entries and trailing commas", () => {
    expect(parsePoseText("(1, 2, , 4, 5, 6)")).toBeNull()
    expect(parsePoseText("(1, 2, 3, 4, 5, 6,)")).toBeNull()
  })

  it("rejects unbalanced parentheses", () => {
    expect(parsePoseText("(1, 2, 3, 4, 5, 6")).toBeNull()
    expect(parsePoseText("1, 2, 3, 4, 5, 6)")).toBeNull()
  })

  it("rejects the joint bracket style", () => {
    expect(parsePoseText("[1, 2, 3, 4, 5, 6]")).toBeNull()
  })

  it("rejects empty input", () => {
    expect(parsePoseText("")).toBeNull()
    expect(parsePoseText("()")).toBeNull()
    expect(parsePoseText("   ")).toBeNull()
  })
})
