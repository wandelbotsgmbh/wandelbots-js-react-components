import { type Matrix4, Vector3 } from "three"
import { describe, expect, it } from "vitest"
import { jointFrames } from "./jointLimitFrames"

function expectVector(actual: Vector3, expected: number[]) {
  actual.toArray().forEach((value, index) => {
    expect(value).toBeCloseTo(expected[index], 10)
  })
}

function origin(frame: Matrix4) {
  return new Vector3().setFromMatrixPosition(frame)
}

function axis(frame: Matrix4, direction: Vector3) {
  return direction.transformDirection(frame)
}

describe("jointFrames", () => {
  it("returns independent pre-step frames and defaults to zero positions", () => {
    const frames = jointFrames([{ a: 1000, d: 250 }, {}])
    expectVector(origin(frames[0]), [0, 0, 0])
    expectVector(origin(frames[1]), [1, 0, 0.25])
    expect(frames[0]).not.toBe(frames[1])
  })

  it("applies a translated, rotation-vector chain offset before DH steps", () => {
    const frames = jointFrames([{ a: 500 }, {}], {
      position: [1000, 2000, 3000],
      orientation: [0, 0, Math.PI / 2],
    })
    expectVector(origin(frames[0]), [1, 2, 3])
    expectVector(origin(frames[1]), [1, 2.5, 3])
    expectVector(axis(frames[0], new Vector3(1, 0, 0)), [0, 1, 0])
  })

  it("interprets offset orientation as an axis-angle vector, not Euler angles", () => {
    const diagonalAngle = Math.PI / Math.sqrt(2)
    const [frame] = jointFrames([{}], {
      orientation: [diagonalAngle, diagonalAngle, 0],
    })
    expectVector(axis(frame, new Vector3(1, 0, 0)), [0, 1, 0])
    expectVector(axis(frame, new Vector3(0, 0, 1)), [0, 0, -1])
  })

  it("advances standard DH in Rz Tz Tx Rx order with millimetre lengths", () => {
    const frames = jointFrames([
      { theta: Math.PI / 2, a: 1000, d: 2000, alpha: Math.PI / 2 },
      {},
    ])
    expectVector(origin(frames[1]), [0, 1, 2])
    expectVector(axis(frames[1], new Vector3(0, 0, 1)), [1, 0, 0])
  })

  it("adds live revolute radians to theta only after capturing its own frame", () => {
    const frames = jointFrames(
      [{ theta: Math.PI / 4, a: 1000 }, { a: 500 }, {}],
      null,
      [Math.PI / 4, Math.PI / 2],
    )
    expectVector(axis(frames[0], new Vector3(1, 0, 0)), [1, 0, 0])
    expectVector(origin(frames[1]), [0, 1, 0])
    expectVector(axis(frames[1], new Vector3(1, 0, 0)), [0, 1, 0])
    expectVector(origin(frames[2]), [-0.5, 1, 0])
  })

  it("reverses the live revolute position without reversing fixed theta", () => {
    const frames = jointFrames(
      [{ theta: Math.PI / 4, a: 1000, reverse_rotation_direction: true }, {}],
      null,
      [Math.PI / 4],
    )
    expectVector(origin(frames[1]), [1, 0, 0])
  })

  it.each([
    false,
    true,
  ])("adds signed prismatic millimetres to d with reversed=%s", (reversed) => {
    const frames = jointFrames(
      [
        {
          type: "PRISMATIC_JOINT",
          theta: Math.PI / 2,
          a: 500,
          d: 1000,
          reverse_rotation_direction: reversed,
        },
        {},
      ],
      null,
      [250],
    )
    expectVector(origin(frames[0]), [0, 0, 0])
    expectVector(origin(frames[1]), [0, 0.5, reversed ? 0.75 : 1.25])
    expectVector(axis(frames[1], new Vector3(1, 0, 0)), [0, 1, 0])
  })

  it("moves a prismatic joint along the upstream tilted Z axis", () => {
    const frames = jointFrames(
      [{ alpha: Math.PI / 2 }, { type: "PRISMATIC_JOINT" }, {}],
      null,
      [0, 500],
    )
    expectVector(origin(frames[2]), [0, -0.5, 0])
  })

  it("accepts missing DH fields, missing offsets, and partial positions", () => {
    const frames = jointFrames(
      [
        {
          alpha: undefined,
          theta: undefined,
          a: undefined,
          d: undefined,
          type: undefined,
          reverse_rotation_direction: undefined,
        },
        {},
        {},
      ],
      { position: undefined, orientation: undefined },
      [Math.PI / 2],
    )
    expectVector(origin(frames[2]), [0, 0, 0])
    expectVector(axis(frames[2], new Vector3(1, 0, 0)), [0, 1, 0])
    expect(jointFrames([])).toEqual([])
  })
})
