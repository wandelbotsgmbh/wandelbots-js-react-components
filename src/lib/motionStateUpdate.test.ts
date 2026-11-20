import { describe, expect, test } from "vitest"
import {
  jointValuesEqual,
  jointValuesUnchanged,
  poseEqual,
} from "./motionStateUpdate"

describe("poseEqual", async () => {
  test("returns true for identical poses", () => {
    const pose1 = {
      position: [0, 0, 0],
      orientation: [0, 0, 0],
    }
    const pose2 = {
      position: [0, 0, 0],
      orientation: [0, 0, 0],
    }
    expect(poseEqual(pose1, pose2, 0.001)).toBe(true)
  })

  test("returns false for different poses", () => {
    const pose1 = {
      position: [0, 0, 0],
      orientation: [0, 0, 0],
    }
    const pose2 = {
      position: [1, 1, 1],
      orientation: [1, 1, 1],
    }
    expect(poseEqual(pose1, pose2, 0.001)).toBe(false)
  })
})

describe("joint values", () => {
  test("are not equal when the number of joints differs", () => {
    expect(jointValuesEqual([0, 0, 0], [0, 0], 0.001)).toBe(false)
    expect(jointValuesEqual([0, 0], [0.0005, 0], 0.001)).toBe(true)
    expect(jointValuesEqual([0, 0], [0.002, 0], 0.001)).toBe(false)
  })

  test("count as unchanged for the motion stream when the number of joints differs: another motion group", () => {
    expect(jointValuesUnchanged([0, 0, 0], [0, 0], 0.001)).toBe(true)
    expect(jointValuesUnchanged([0, 0], [0.002, 0], 0.001)).toBe(false)
  })
})
