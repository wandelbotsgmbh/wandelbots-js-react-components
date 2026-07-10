import type { Pose } from "@wandelbots/nova-js/v2"
import { Quaternion, Vector3 } from "three"
import { describe, expect, test } from "vitest"
import {
  computeIncrementalTargetPose,
  quaternionFromRotationVector,
  rotationVectorFromQuaternion,
} from "./incrementalCartesianMotion"

const HALF_PI = Math.PI / 2

/**
 * The rotation math that shipped before tool-frame increments were supported.
 * Used to prove the refactored coordsys path is behaviourally unchanged.
 * (Rotation-vector concatenation, world/base frame.)
 */
function legacyCoordsysRotate(
  orientation: number[],
  axis: "x" | "y" | "z",
  distanceRads: number,
  direction: "-" | "+",
): number[] {
  const currentRotationVector = new Vector3(
    orientation[0],
    orientation[1],
    orientation[2],
  )
  const currentRotationRad = currentRotationVector.length()
  const currentRotationDirection = currentRotationVector.clone().normalize()

  const differenceRotationRad = distanceRads * (direction === "-" ? -1 : 1)
  const differenceRotationDirection = new Vector3(0, 0, 0)
  differenceRotationDirection[axis] = 1

  const f1 =
    Math.cos(0.5 * differenceRotationRad) * Math.cos(0.5 * currentRotationRad)
  const f2 =
    Math.sin(0.5 * differenceRotationRad) * Math.sin(0.5 * currentRotationRad)
  const f3 =
    Math.sin(0.5 * differenceRotationRad) * Math.cos(0.5 * currentRotationRad)
  const f4 =
    Math.cos(0.5 * differenceRotationRad) * Math.sin(0.5 * currentRotationRad)

  const dotProduct = differenceRotationDirection.dot(currentRotationDirection)
  const crossProduct = differenceRotationDirection
    .clone()
    .cross(currentRotationDirection)

  const newRotationRad = 2 * Math.acos(f1 - f2 * dotProduct)
  const f5 = newRotationRad / Math.sin(0.5 * newRotationRad)

  return [
    ...new Vector3()
      .addScaledVector(crossProduct, f2)
      .addScaledVector(differenceRotationDirection, f3)
      .addScaledVector(currentRotationDirection, f4)
      .multiplyScalar(f5),
  ]
}

/** Compare two rotation vectors by the rotation they represent (double-cover safe). */
function expectSameRotation(a: number[], b: number[]) {
  const qa = quaternionFromRotationVector(a)
  const qb = quaternionFromRotationVector(b)
  // angle between the two rotations should be ~0
  const angle = qa.angleTo(qb)
  expect(angle).toBeCloseTo(0, 6)
}

function poseAt(position: number[], orientation: number[]): Pose {
  return { position, orientation }
}

/** Read the orientation off a result, asserting it is present. */
function orientationOf(result: { orientation?: number[] }): number[] {
  if (!result.orientation) {
    throw new Error("Expected result to have an orientation")
  }
  return result.orientation
}

describe("rotation vector <-> quaternion round trip", () => {
  test("identity", () => {
    expect(rotationVectorFromQuaternion(new Quaternion())).toEqual([0, 0, 0])
    expect(
      quaternionFromRotationVector([0, 0, 0]).equals(new Quaternion()),
    ).toBe(true)
  })

  test("round trips arbitrary rotations", () => {
    for (const v of [
      [HALF_PI, 0, 0],
      [0, 0.3, 0],
      [0.1, -0.2, 0.7],
      [Math.PI, 0, 0],
    ]) {
      const back = rotationVectorFromQuaternion(quaternionFromRotationVector(v))
      expectSameRotation(back, v)
    }
  })
})

describe("coordsys translate (unchanged behaviour)", () => {
  test("adds distance along the base axis", () => {
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([100, 200, 300], [0, 0, 0]),
      axis: "x",
      direction: "+",
      motion: { type: "translate", distanceMm: 10 },
      useToolCoordinateSystem: false,
    })
    expect(result.position).toEqual([110, 200, 300])
    expect(result.orientation).toEqual([0, 0, 0])
  })

  test("negative direction subtracts", () => {
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([100, 200, 300], [HALF_PI, 0, 0]),
      axis: "z",
      direction: "-",
      motion: { type: "translate", distanceMm: 5 },
      useToolCoordinateSystem: false,
    })
    // Orientation must not affect coordsys translation
    expect(result.position).toEqual([100, 200, 295])
  })
})

describe("tool translate", () => {
  test("with identity orientation behaves like coordsys", () => {
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([0, 0, 0], [0, 0, 0]),
      axis: "x",
      direction: "+",
      motion: { type: "translate", distanceMm: 10 },
      useToolCoordinateSystem: true,
    })
    expect(result.position?.[0]).toBeCloseTo(10)
    expect(result.position?.[1]).toBeCloseTo(0)
    expect(result.position?.[2]).toBeCloseTo(0)
  })

  test("rotated tool translates along the rotated axis", () => {
    // Tool rotated +90° about base Z: tool X points along base +Y.
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([0, 0, 0], [0, 0, HALF_PI]),
      axis: "x",
      direction: "+",
      motion: { type: "translate", distanceMm: 10 },
      useToolCoordinateSystem: true,
    })
    expect(result.position?.[0]).toBeCloseTo(0)
    expect(result.position?.[1]).toBeCloseTo(10)
    expect(result.position?.[2]).toBeCloseTo(0)
  })
})

describe("coordsys rotate (equivalent to legacy formula)", () => {
  const cases: {
    orientation: number[]
    axis: "x" | "y" | "z"
    distanceRads: number
    direction: "-" | "+"
  }[] = [
    { orientation: [0, 0, 0], axis: "x", distanceRads: 0.5, direction: "+" },
    {
      orientation: [0, 0, HALF_PI],
      axis: "x",
      distanceRads: 0.3,
      direction: "+",
    },
    {
      orientation: [0.1, 0.2, 0.3],
      axis: "y",
      distanceRads: 0.4,
      direction: "-",
    },
    {
      orientation: [HALF_PI, 0, 0],
      axis: "z",
      distanceRads: 0.2,
      direction: "+",
    },
  ]

  for (const c of cases) {
    test(`matches legacy for ${JSON.stringify(c)}`, () => {
      const result = computeIncrementalTargetPose({
        currentTcpPose: poseAt([1, 2, 3], c.orientation),
        axis: c.axis,
        direction: c.direction,
        motion: { type: "rotate", distanceRads: c.distanceRads },
        useToolCoordinateSystem: false,
      })
      const legacy = legacyCoordsysRotate(
        c.orientation,
        c.axis,
        c.distanceRads,
        c.direction,
      )
      expectSameRotation(orientationOf(result), legacy)
      // position untouched by rotation
      expect(result.position).toEqual([1, 2, 3])
    })
  }
})

describe("tool rotate (intrinsic)", () => {
  test("with identity orientation behaves like coordsys", () => {
    const tool = computeIncrementalTargetPose({
      currentTcpPose: poseAt([0, 0, 0], [0, 0, 0]),
      axis: "z",
      direction: "+",
      motion: { type: "rotate", distanceRads: 0.5 },
      useToolCoordinateSystem: true,
    })
    expectSameRotation(orientationOf(tool), [0, 0, 0.5])
  })

  test("rotates about the tool's own axis, not the base axis", () => {
    // Tool rotated +90° about base Z (tool X = base +Y).
    // Rotating +90° about *tool* X should carry tool Z (=base Z) onto base X.
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([0, 0, 0], [0, 0, HALF_PI]),
      axis: "x",
      direction: "+",
      motion: { type: "rotate", distanceRads: HALF_PI },
      useToolCoordinateSystem: true,
    })

    const targetOrientation = quaternionFromRotationVector(
      orientationOf(result),
    )
    const toolZInBase = new Vector3(0, 0, 1).applyQuaternion(targetOrientation)
    expect(toolZInBase.x).toBeCloseTo(1)
    expect(toolZInBase.y).toBeCloseTo(0)
    expect(toolZInBase.z).toBeCloseTo(0)
  })

  test("tool and coordsys rotation differ when the tool is tilted", () => {
    const currentTcpPose = poseAt([0, 0, 0], [0, 0, HALF_PI])
    const common = {
      currentTcpPose,
      axis: "x" as const,
      direction: "+" as const,
      motion: { type: "rotate" as const, distanceRads: HALF_PI },
    }
    const tool = computeIncrementalTargetPose({
      ...common,
      useToolCoordinateSystem: true,
    })
    const coordsys = computeIncrementalTargetPose({
      ...common,
      useToolCoordinateSystem: false,
    })
    const angle = quaternionFromRotationVector(orientationOf(tool)).angleTo(
      quaternionFromRotationVector(orientationOf(coordsys)),
    )
    expect(angle).toBeGreaterThan(0.1)
  })
})
