import type { Pose } from "@wandelbots/nova-js/v2"
import { Quaternion, Vector3 } from "three"
import { describe, expect, test } from "vitest"
import {
  EDGE_ROTATION_VECTORS,
  randomFrame,
  randomPosition,
  randomRotationVector,
  seededRandom,
} from "./__fixtures__/randomPoses"
import {
  computeIncrementalTargetPose,
  type IncrementalMotion,
} from "./incrementalCartesianMotion"
import { Pose3 } from "./Pose3"
import {
  parseRotationToQuaternion,
  quaternionToRotationVector,
} from "./rotation"

// Ported from RobotPad (unit/incrementalCartesianMotion.test.ts)

const HALF_PI = Math.PI / 2

/** Rotation vector (axis * angle, rads) -> quaternion, as used for API poses. */
function quaternionFromRotationVector(rotationVector: number[]): Quaternion {
  return parseRotationToQuaternion(rotationVector, "ROTATION_VECTOR")
}

/** Quaternion -> rotation vector (axis * angle, rads). */
function rotationVectorFromQuaternion(quaternion: Quaternion): number[] {
  return [...quaternionToRotationVector(quaternion)]
}

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

describe("coordinate system axes (move relative to a coordinate system)", () => {
  // Rotated +90° about world Z: its X axis points along world +Y
  const rotatedAboutZ = quaternionFromRotationVector([0, 0, HALF_PI])

  test("translates along the coordinate system's axis", () => {
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([100, 200, 300], [0, 0, 0]),
      axis: "x",
      direction: "+",
      motion: { type: "translate", distanceMm: 10 },
      useToolCoordinateSystem: false,
      coordinateSystemRotation: rotatedAboutZ,
    })
    expect(result.position?.[0]).toBeCloseTo(100)
    expect(result.position?.[1]).toBeCloseTo(210)
    expect(result.position?.[2]).toBeCloseTo(300)
  })

  test("rotates about the coordinate system's axis", () => {
    // +90° about the coordinate system's X (= world +Y) carries the TCP's Z
    // (= world Z) onto world X
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([0, 0, 0], [0, 0, 0]),
      axis: "x",
      direction: "+",
      motion: { type: "rotate", distanceRads: HALF_PI },
      useToolCoordinateSystem: false,
      coordinateSystemRotation: rotatedAboutZ,
    })

    const tcpZ = new Vector3(0, 0, 1).applyQuaternion(
      quaternionFromRotationVector(orientationOf(result)),
    )
    expect(tcpZ.x).toBeCloseTo(1)
    expect(tcpZ.y).toBeCloseTo(0)
    expect(tcpZ.z).toBeCloseTo(0)
    expect(result.position).toEqual([0, 0, 0])
  })

  test("is ignored in tool orientation", () => {
    const result = computeIncrementalTargetPose({
      currentTcpPose: poseAt([0, 0, 0], [0, 0, 0]),
      axis: "x",
      direction: "+",
      motion: { type: "translate", distanceMm: 10 },
      useToolCoordinateSystem: true,
      coordinateSystemRotation: rotatedAboutZ,
    })
    expect(result.position?.[0]).toBeCloseTo(10)
    expect(result.position?.[1]).toBeCloseTo(0)
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

// The target of a step jog goes to the planner as it is computed here. It was
// computed with three.js objects before the code took plain numbers: the
// numbers must be the same to the last bit.
describe("the same numbers as with three.js objects", () => {
  type StepJog = Parameters<typeof computeIncrementalTargetPose>[0] & {
    currentTcpPose: { position: number[]; orientation: number[] }
    coordinateSystemRotation?: Quaternion
  }

  /** The target pose of a step jog, computed with three.js objects */
  function threeTargetPose({
    currentTcpPose,
    axis,
    direction,
    motion,
    useToolCoordinateSystem,
    coordinateSystemRotation,
  }: StepJog): { position?: number[]; orientation?: number[] } {
    const sign = direction === "-" ? -1 : 1
    const alongAxis = (length: number) => {
      const vector = new Vector3()
      vector[axis] = length
      return vector
    }
    const currentOrientation = () =>
      parseRotationToQuaternion(currentTcpPose.orientation, "ROTATION_VECTOR")

    if (motion.type === "translate") {
      const displacement = alongAxis(motion.distanceMm * sign)
      if (useToolCoordinateSystem) {
        displacement.applyQuaternion(currentOrientation())
      } else if (coordinateSystemRotation) {
        displacement.applyQuaternion(coordinateSystemRotation)
      }
      return {
        position: [
          (currentTcpPose.position[0] ?? 0) + displacement.x,
          (currentTcpPose.position[1] ?? 0) + displacement.y,
          (currentTcpPose.position[2] ?? 0) + displacement.z,
        ],
        orientation: currentTcpPose.orientation,
      }
    }

    const rotationAxis = alongAxis(1)
    if (!useToolCoordinateSystem && coordinateSystemRotation) {
      rotationAxis.applyQuaternion(coordinateSystemRotation)
    }
    const deltaRotation = new Quaternion().setFromAxisAngle(
      rotationAxis,
      motion.distanceRads * sign,
    )
    const targetOrientation = useToolCoordinateSystem
      ? currentOrientation().multiply(deltaRotation)
      : deltaRotation.multiply(currentOrientation())
    return {
      position: currentTcpPose.position,
      orientation: [...quaternionToRotationVector(targetOrientation)],
    }
  }

  const pick = <T>(random: () => number, values: readonly T[]): T =>
    values[Math.floor(random() * values.length)] as T

  /** Step sizes of the jogging panel, a half and a full turn, and no step */
  const DISTANCES_MM = [0.1, 1, 5, 10, 0]
  const DISTANCES_RADS = [
    (0.1 * Math.PI) / 180,
    (1 * Math.PI) / 180,
    (5 * Math.PI) / 180,
    Math.PI,
    2 * Math.PI,
    0,
  ]

  function randomStepJog(random: () => number): StepJog {
    const motion: IncrementalMotion =
      random() < 0.5
        ? {
            type: "translate",
            distanceMm:
              random() < 0.5 ? pick(random, DISTANCES_MM) : random() * 500,
          }
        : {
            type: "rotate",
            distanceRads:
              random() < 0.5
                ? pick(random, DISTANCES_RADS)
                : random() * 2 * Math.PI,
          }
    return {
      currentTcpPose: {
        position: randomPosition(random),
        orientation:
          random() < 0.2
            ? pick(random, EDGE_ROTATION_VECTORS)
            : randomRotationVector(random),
      },
      axis: pick(random, ["x", "y", "z"] as const),
      direction: pick(random, ["-", "+"] as const),
      motion,
      useToolCoordinateSystem: random() < 0.4,
      // As the jogger gives it: the rotation of its coordinate system
      coordinateSystemRotation:
        random() < 0.3
          ? undefined
          : Pose3.fromCoordinateSystem({
              coordinate_system: "random",
              ...randomFrame(random),
            }).quaternion,
    }
  }

  test("for every kind of step, in tool, world and coordinate system orientation", () => {
    const random = seededRandom(4)
    for (let run = 0; run < 5000; run++) {
      const stepJog = randomStepJog(random)
      expect(
        computeIncrementalTargetPose(stepJog),
        JSON.stringify(stepJog),
      ).toEqual(threeTargetPose(stepJog))
    }
  })
})
