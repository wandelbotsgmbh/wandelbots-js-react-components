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

// Ported from RobotPad (unit/Pose3.test.ts)
test("the inverse of the inverse of a pose is the pose", () => {
  const pose = Pose3.fromCoordinateSystem({
    coordinate_system: "test",
    position: [1, 2, 3],
    orientation: [0, 1.2, 0],
    orientation_type: "ROTATION_VECTOR",
  })

  const doubleInverse = pose.inverse().inverse()
  expect(doubleInverse.position.x).toBeCloseTo(pose.position.x)
  expect(doubleInverse.position.y).toBeCloseTo(pose.position.y)
  expect(doubleInverse.position.z).toBeCloseTo(pose.position.z)
})

test("a pose times its inverse moves nothing", () => {
  const pose = Pose3.fromPose({
    position: [100, -20, 300],
    orientation: [0.3, -1.1, 0.4],
  })

  const none = pose.multiply(pose.inverse())
  expect(none.position.length()).toBeCloseTo(0)
  expect(none.orientation.length()).toBeCloseTo(0)
})
