import { Euler, Quaternion, Vector3 } from "three"
import { describe, expect, it } from "vitest"
import {
  EULER_CONVENTIONS,
  type EulerConvention,
  quaternionToEuler,
  rotationVectorToQuaternion,
} from "./orientation"

// The pose of the Figma design of the bar, with its quaternion and its Euler
// angles (extrinsic XYZ) as Figma shows them
// biome-ignore lint/suspicious/noApproximativeNumericConstant: Figma's Rx, not ln(10)
const FIGMA_ROTATION_VECTOR: [number, number, number] = [-2.303, -2.492, -2.181]

const AXES = {
  X: new Vector3(1, 0, 0),
  Y: new Vector3(0, 1, 0),
  Z: new Vector3(0, 0, 1),
} as const

function parse(convention: EulerConvention) {
  const [, , kind, sequence] = convention.split("_")
  return {
    intrinsic: kind === "INTRINSIC",
    axes: [...(sequence ?? "")] as (keyof typeof AXES)[],
  }
}

/**
 * The rotation of Euler angles, built independently of the code under test:
 * intrinsic angles turn about the moving axes (R = R1 R2 R3), extrinsic
 * angles about the fixed ones (R = R3 R2 R1)
 */
function fromEuler(angles: number[], convention: EulerConvention): Quaternion {
  const { intrinsic, axes } = parse(convention)
  const turns = axes.map((axis, i) =>
    new Quaternion().setFromAxisAngle(AXES[axis], angles[i] ?? 0),
  )
  const result = new Quaternion()
  for (const turn of intrinsic ? turns : turns.reverse()) result.multiply(turn)
  return result
}

function sameRotation(a: Quaternion, b: Quaternion) {
  // q and -q are the same rotation
  return Math.abs(a.dot(b)) > 1 - 1e-9
}

function quaternionOf(rotationVector: [number, number, number]) {
  const [x, y, z, w] = rotationVectorToQuaternion(rotationVector)
  return new Quaternion(x, y, z, w)
}

/** Rotations spread over all directions and angles, the same on every run */
const ROTATIONS: [number, number, number][] = Array.from(
  { length: 60 },
  (_, i) => {
    const angle = ((i * 37) % 60) * (Math.PI / 30) - Math.PI + 0.01
    const axis = new Vector3(
      Math.sin(i * 1.3),
      Math.cos(i * 0.7),
      Math.sin(i * 2.1 + 1),
    ).normalize()
    return axis.multiplyScalar(angle).toArray() as [number, number, number]
  },
)

describe("rotationVectorToQuaternion", () => {
  it("gives the quaternion [x, y, z, w] that Figma shows for its pose", () => {
    const q = rotationVectorToQuaternion(FIGMA_ROTATION_VECTOR)
    expect(q.map((v) => Number(v.toFixed(3)))).toEqual([
      -0.515, -0.557, -0.488, -0.431,
    ])
  })

  it("gives no turn for a zero vector", () => {
    expect(rotationVectorToQuaternion([0, 0, 0])).toEqual([0, 0, 0, 1])
  })
})

describe("quaternionToEuler", () => {
  it("gives the extrinsic XYZ angles that Figma shows for its pose", () => {
    const angles = quaternionToEuler(
      rotationVectorToQuaternion(FIGMA_ROTATION_VECTOR),
      "EULER_ANGLES_EXTRINSIC_XYZ",
    )
    expect(angles.map((v) => Number(v.toFixed(3)))).toEqual([
      1.723, -0.022, 1.668,
    ])
  })

  it("knows all 24 conventions of NOVA", () => {
    expect(EULER_CONVENTIONS).toHaveLength(24)
    expect(new Set(EULER_CONVENTIONS).size).toBe(24)
  })

  it.each(
    EULER_CONVENTIONS,
  )("gives angles that turn back into the same rotation: %s", (convention) => {
    for (const rotationVector of ROTATIONS) {
      const q = quaternionOf(rotationVector)
      const angles = quaternionToEuler(
        rotationVectorToQuaternion(rotationVector),
        convention,
      )
      expect(sameRotation(fromEuler(angles, convention), q)).toBe(true)
      for (const angle of angles) {
        expect(Math.abs(angle)).toBeLessThanOrEqual(Math.PI + 1e-12)
      }
    }
  })

  it.each(
    EULER_CONVENTIONS,
  )("still gives the rotation in gimbal lock: %s", (convention) => {
    const { axes } = parse(convention)
    const proper = axes[0] === axes[2]
    // The middle angle where the first and the last axis line up
    for (const middle of proper ? [0, Math.PI] : [Math.PI / 2, -Math.PI / 2]) {
      const locked = fromEuler([0.4, middle, -0.9], convention)
      const angles = quaternionToEuler(
        [locked.x, locked.y, locked.z, locked.w],
        convention,
      )
      expect(sameRotation(fromEuler(angles, convention), locked)).toBe(true)
    }
  })

  it("agrees with three.js for the intrinsic orders it knows", () => {
    for (const order of ["XYZ", "YXZ", "ZXY", "ZYX", "YZX", "XZY"] as const) {
      for (const rotationVector of ROTATIONS) {
        const q = quaternionOf(rotationVector)
        const euler = new Euler().setFromQuaternion(q, order)
        const expected = [...order].map(
          (axis) => euler[axis.toLowerCase() as "x" | "y" | "z"],
        )
        const angles = quaternionToEuler(
          rotationVectorToQuaternion(rotationVector),
          `EULER_ANGLES_INTRINSIC_${order}`,
        )
        // Away from gimbal lock the angles are unique
        if (Math.abs(Math.abs(expected[1] ?? 0) - Math.PI / 2) > 1e-3) {
          angles.forEach((angle, i) => {
            expect(angle).toBeCloseTo(expected[i] ?? Number.NaN, 9)
          })
        }
      }
    }
  })
})
