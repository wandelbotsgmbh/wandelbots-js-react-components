import { describe, expect, it } from "vitest"
import { isAtPose } from "./atPose"
import type { RobotControlPose } from "./RobotControlPanel"

const TARGET: RobotControlPose = {
  position: [500, -400, 600],
  orientation: [1.7565, -1.7543, 0.7327],
}

const moved = (
  position: [number, number, number],
  orientation: [number, number, number] = TARGET.orientation,
): RobotControlPose => ({ position, orientation })

describe("isAtPose", () => {
  it("counts a TCP within half a millimeter and a hundredth of a radian as there, as RobotPad does", () => {
    expect(isAtPose(TARGET, TARGET)).toBe(true)
    expect(isAtPose(moved([500.4, -400, 600]), TARGET)).toBe(true)
    expect(isAtPose(moved([500.6, -400, 600]), TARGET)).toBe(false)
    expect(
      isAtPose(moved([500, -400, 600], [1.762, -1.7543, 0.7327]), TARGET),
    ).toBe(true)
    expect(
      isAtPose(moved([500, -400, 600], [1.7765, -1.7543, 0.7327]), TARGET),
    ).toBe(false)
  })

  it("compares orientations, not rotation vectors: a turn by π about z is a turn by -π", () => {
    const halfTurn = moved([0, 0, 0], [0, 0, Math.PI])
    expect(isAtPose(moved([0, 0, 0], [0, 0, -Math.PI]), halfTurn)).toBe(true)
    // A turn by more than π, as typed, is the shorter turn back
    expect(
      isAtPose(
        moved([0, 0, 0], [0, 0, Math.PI - 0.2]),
        moved([0, 0, 0], [0, 0, -Math.PI - 0.2]),
      ),
    ).toBe(true)
  })

  it("knows no pose for a TCP without one", () => {
    expect(isAtPose(null, TARGET)).toBe(false)
  })
})
