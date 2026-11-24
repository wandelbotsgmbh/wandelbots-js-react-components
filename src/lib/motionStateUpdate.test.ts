import { Vector3 } from "three"
import { describe, expect, test } from "vitest"
import {
  EDGE_ROTATION_VECTORS,
  randomRotationVector,
  seededRandom,
} from "./__fixtures__/randomPoses"
import type { Vector3Simple } from "./JoggerConnection"
import {
  jointValuesEqual,
  jointValuesUnchanged,
  poseEqual,
  unwrapRotationVector,
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

describe("unwrapRotationVector", () => {
  test("keeps the rotation, with the axis and angle next to the current ones", () => {
    // Nearly a half turn about +Z, then a little past it: NOVA reports the
    // second one about -Z
    const current: Vector3Simple = [0, 0, Math.PI - 0.1]
    const next: Vector3Simple = [0, 0, -(Math.PI - 0.1)]

    const unwrapped = unwrapRotationVector(next, current)

    expect(unwrapped[0]).toBeCloseTo(0)
    expect(unwrapped[1]).toBeCloseTo(0)
    expect(unwrapped[2]).toBeCloseTo(Math.PI + 0.1)
  })

  /** The unwrapped rotation vector, computed with three.js objects */
  function threeUnwrapRotationVector(
    newRotationVectorApi: Vector3Simple,
    currentRotationVectorApi: Vector3Simple,
  ): Vector3Simple {
    const currentRotationVector = new Vector3(...currentRotationVectorApi)
    const newRotationVector = new Vector3(...newRotationVectorApi)

    const currentAngle = currentRotationVector.length()
    const currentAxis = currentRotationVector.normalize()

    let newAngle = newRotationVector.length()
    let newAxis = newRotationVector.normalize()

    if (newAxis.dot(currentAxis) < 0) {
      newAngle = -newAngle
      newAxis = newAxis.multiplyScalar(-1.0)
    }

    let angleDifference = newAngle - currentAngle
    angleDifference -=
      2.0 * Math.PI * Math.floor((angleDifference + Math.PI) / (2.0 * Math.PI))

    newAngle = currentAngle + angleDifference

    return [...newAxis.multiplyScalar(newAngle)] as Vector3Simple
  }

  // The orientation that an app shows and that the 3D view draws. It was
  // computed with three.js objects before the code took plain numbers: the
  // numbers must be the same to the last bit.
  test("gives the same numbers as with three.js objects", () => {
    const random = seededRandom(5)
    const rotationVector = () =>
      (random() < 0.2
        ? EDGE_ROTATION_VECTORS[
            Math.floor(random() * EDGE_ROTATION_VECTORS.length)
          ]
        : randomRotationVector(random)) as Vector3Simple

    for (let run = 0; run < 5000; run++) {
      const current = rotationVector()
      // Half of them a small step on from the current one, as a stream has it
      const next =
        random() < 0.5
          ? (current.map(
              (value) => value + (random() - 0.5) * 0.02,
            ) as Vector3Simple)
          : rotationVector()

      expect(
        unwrapRotationVector(next, current),
        JSON.stringify({ next, current }),
      ).toEqual(threeUnwrapRotationVector(next, current))
    }
  })
})
