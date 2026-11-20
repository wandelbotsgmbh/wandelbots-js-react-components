import { expect, test } from "vitest"
import { Pose3 } from "./Pose3"

// Ported from RobotPad (unit/Pose3.test.ts)
test("Pose3 of a coordinate system", () => {
  const pose = Pose3.fromCoordinateSystem({
    coordinate_system: "test",
    position: [1, 2, 3],
    orientation: [0, 1.2, 0],
    orientation_type: "ROTATION_VECTOR",
  })

  expect(pose.position.x).toBeCloseTo(1)
  expect(pose.position.y).toBeCloseTo(2)
  expect(pose.position.z).toBeCloseTo(3)
  expect(pose.orientation.x).toBeCloseTo(0)
  expect(pose.orientation.y).toBeCloseTo(1.2)
  expect(pose.orientation.z).toBeCloseTo(0)
})
