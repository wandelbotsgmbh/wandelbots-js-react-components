import type { CoordinateSystem } from "@wandelbots/nova-js/v2"
import { Vector3 } from "three"
import { describe, expect, test } from "vitest"
import { Pose3 } from "./Pose3"
import {
  resolveCoordinateSystemInWorld,
  transformPoseToCoordinateSystem,
} from "./PoseTransformer"

const world: CoordinateSystem = {
  coordinate_system: "world",
  name: "world",
  reference_coordinate_system: "",
  position: [0, 0, 0],
  orientation: [0, 0, 0],
  orientation_type: "ROTATION_VECTOR",
}

/** At world [500, 0, 0], rotated +90° about Z: its X axis is world +Y */
const rotated: CoordinateSystem = {
  ...world,
  coordinate_system: "rotated-90-z",
  name: "Rotated 90° Z",
  position: [500, 0, 0],
  orientation: [0, 0, Math.PI / 2],
}

function expectVectorCloseTo(actual: number[], expected: number[]) {
  expect(actual).toHaveLength(expected.length)
  expected.forEach((value, index) => {
    expect(actual[index]).toBeCloseTo(value)
  })
}

describe("resolveCoordinateSystemInWorld", () => {
  // Ported from RobotPad (unit/PoseTransformer.test.ts)
  test("resolves a coordinate system defined relative to another one into world", () => {
    const parent: CoordinateSystem = {
      ...world,
      coordinate_system: "parent",
      name: "Parent",
      position: [100, 0, 0],
      orientation: [0, 0, Math.PI / 2],
    }
    const child: CoordinateSystem = {
      ...world,
      coordinate_system: "child",
      name: "Child",
      reference_coordinate_system: "parent",
      position: [10, 0, 0],
      orientation: [0, 0, Math.PI / 2],
    }

    const resolved = Pose3.fromCoordinateSystem(
      resolveCoordinateSystemInWorld("child", [world, parent, child]),
    )

    expect(resolved.position.x).toBeCloseTo(100)
    expect(resolved.position.y).toBeCloseTo(10)
    expect(resolved.position.z).toBeCloseTo(0)
    // 90° about Z on top of the parent's 90° about Z
    const xAxis = new Vector3(1, 0, 0).applyQuaternion(resolved.quaternion)
    expect(xAxis.x).toBeCloseTo(-1)
    expect(xAxis.y).toBeCloseTo(0)
    expect(xAxis.z).toBeCloseTo(0)
  })

  test("finds a coordinate system by its id without the controller suffix, and the other way round", () => {
    const onController = { ...rotated, coordinate_system: "baseOnkuka" }

    expect(
      resolveCoordinateSystemInWorld("rotated-90-zOnkuka", [world, rotated])
        .coordinate_system,
    ).toBe("rotated-90-z")
    expect(
      resolveCoordinateSystemInWorld("base", [world, onController])
        .coordinate_system,
    ).toBe("baseOnkuka")
  })

  test("always knows world, also when the list does not name it", () => {
    const world = resolveCoordinateSystemInWorld("world", [])
    expect(world.position).toEqual([0, 0, 0])
    expect(world.orientation).toEqual([0, 0, 0])
    expect(resolveCoordinateSystemInWorld("", []).coordinate_system).toBe(
      "world",
    )
  })

  test("names the known coordinate systems for an unknown one", () => {
    expect(() =>
      resolveCoordinateSystemInWorld("missing", [world, rotated]),
    ).toThrow("Known coordinate systems are: world, rotated-90-z")
  })
})

describe("transformPoseToCoordinateSystem", () => {
  test("expresses a pose of world in a rotated coordinate system", () => {
    const transformed = transformPoseToCoordinateSystem(
      {
        pose: { position: [491.93, -133.28, 487.43], orientation: [0, 0, 0] },
        coordinateSystemId: "world",
      },
      "rotated-90-z",
      [world, rotated],
    )

    expect(transformed.coordinateSystemId).toBe("rotated-90-z")
    expectVectorCloseTo(transformed.pose.position, [
      -133.28,
      500 - 491.93,
      487.43,
    ])
    // Aligned with world, i.e. rotated -90° about the frame's Z
    expectVectorCloseTo(transformed.pose.orientation, [0, 0, -Math.PI / 2])
  })

  test("expresses a pose of a rotated coordinate system in world", () => {
    const transformed = transformPoseToCoordinateSystem(
      {
        pose: { position: [10, 0, 0], orientation: [0, 0, 0] },
        coordinateSystemId: "rotated-90-z",
      },
      "world",
      [world, rotated],
    )

    expectVectorCloseTo(transformed.pose.position, [500, 10, 0])
    expectVectorCloseTo(transformed.pose.orientation, [0, 0, Math.PI / 2])
  })

  test("keeps a pose that is in the coordinate system already", () => {
    const inputPose = {
      pose: { position: [1, 2, 3], orientation: [0, 0, 0] },
      coordinateSystemId: "rotated-90-z",
    }

    expect(
      transformPoseToCoordinateSystem(inputPose, "rotated-90-z", [
        world,
        rotated,
      ]),
    ).toBe(inputPose)
  })
})
