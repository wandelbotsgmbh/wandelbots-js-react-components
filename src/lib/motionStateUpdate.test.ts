import { describe, expect, test } from "vitest"
import { poseEqual } from "./motionStateUpdate"

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
