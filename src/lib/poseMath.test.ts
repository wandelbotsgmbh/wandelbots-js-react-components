import { Quaternion, Vector3 } from "three"
import { describe, expect, test, vi } from "vitest"
import {
  EDGE_QUATERNIONS,
  EDGE_ROTATION_VECTORS,
  randomFrame,
  randomPosition,
  randomQuaternion,
  randomRotationVector,
  seededRandom,
} from "./__fixtures__/randomPoses"
import { Pose3 } from "./Pose3"
import {
  composePoses,
  dotVectors,
  invertPose,
  multiplyQuaternions,
  normalizeVector,
  type PlainPose,
  poseOf,
  poseOfFrame,
  type Quat,
  quaternionOfAxisAngle,
  quaternionOfOrientation,
  rotateVector,
  rotationVectorOfQuaternion,
  scaleVector,
  type Vec3,
  vectorAlongAxis,
  vectorLength,
} from "./poseMath"
import {
  parseRotationToQuaternion,
  quaternionToRotationVector,
} from "./rotation"

// three.js is the oracle: /3d computes the same poses on three.js objects
// (Pose3, rotation.ts), as the session's code did before it took plain
// numbers. A robot must get the same numbers from both, so every comparison
// is exact: `toEqual` tells even 0 from -0. The random numbers repeat on
// every run.

const RUNS = 3000

const numbersOfQuaternion = (q: Quat) => [q.x, q.y, q.z, q.w]
/** A pose as its numbers: the position, then the quaternion */
const numbersOfPose = (pose: PlainPose | Pose3) => [
  ...pose.position,
  ...numbersOfQuaternion(pose.quaternion),
]

/** Runs `check` with the delicate values first, then with random ones */
function forEachOf<T>(
  edges: readonly T[],
  random: () => T,
  check: (value: T) => void,
) {
  for (const edge of edges) check(edge)
  for (let run = 0; run < RUNS; run++) check(random())
}

describe("vectors, as three.js computes them", () => {
  const random = seededRandom(11)
  const vector = () =>
    (random() < 0.5
      ? randomPosition(random)
      : randomRotationVector(random)) as Vec3

  test("length, direction, scaling and dot product", () => {
    forEachOf(EDGE_ROTATION_VECTORS as Vec3[], vector, (v) => {
      const other = vector()
      const scalar = (random() - 0.5) * 100
      const message = JSON.stringify({ v, other, scalar })

      expect(vectorLength(v), message).toEqual(new Vector3(...v).length())
      expect(normalizeVector(v), message).toEqual([
        ...new Vector3(...v).normalize(),
      ])
      expect(scaleVector(v, scalar), message).toEqual([
        ...new Vector3(...v).multiplyScalar(scalar),
      ])
      expect(dotVectors(v, other), message).toEqual(
        new Vector3(...v).dot(new Vector3(...other)),
      )
    })
  })

  test("a vector along one axis", () => {
    expect(vectorAlongAxis("x", 2.5)).toEqual([2.5, 0, 0])
    expect(vectorAlongAxis("y", -1)).toEqual([0, -1, 0])
    expect(vectorAlongAxis("z", 0)).toEqual([0, 0, 0])
  })

  test("a vector turned by a quaternion, also one that is not of length 1", () => {
    forEachOf(
      EDGE_QUATERNIONS,
      () => randomQuaternion(random),
      (q) => {
        const v = vector()
        const quaternion = parseRotationToQuaternion(q, "QUATERNION")

        expect(rotateVector(v, quaternion), JSON.stringify({ v, q })).toEqual([
          ...new Vector3(...v).applyQuaternion(quaternion),
        ])
      },
    )
  })
})

describe("quaternions, as three.js computes them", () => {
  const random = seededRandom(12)
  const quaternion = () =>
    parseRotationToQuaternion(randomQuaternion(random), "QUATERNION")
  const edges = EDGE_QUATERNIONS.map((q) =>
    parseRotationToQuaternion(q, "QUATERNION"),
  )

  test("of an axis and an angle", () => {
    for (let run = 0; run < RUNS; run++) {
      // The axis of a step jog: a main axis, or one turned by a coordinate
      // system, which is not exactly of length 1
      const axis = rotateVector(
        vectorAlongAxis((["x", "y", "z"] as const)[run % 3] ?? "x", 1),
        quaternion(),
      )
      const angle = (random() - 0.5) * 4 * Math.PI

      expect(
        numbersOfQuaternion(quaternionOfAxisAngle(axis, angle)),
        JSON.stringify({ axis, angle }),
      ).toEqual(
        numbersOfQuaternion(
          new Quaternion().setFromAxisAngle(new Vector3(...axis), angle),
        ),
      )
    }
  })

  test("the product of two", () => {
    forEachOf(edges, quaternion, (a) => {
      const b = quaternion()
      const message = JSON.stringify({ a, b })

      expect(numbersOfQuaternion(multiplyQuaternions(a, b)), message).toEqual(
        numbersOfQuaternion(a.clone().multiply(b)),
      )
      expect(numbersOfQuaternion(multiplyQuaternions(b, a)), message).toEqual(
        numbersOfQuaternion(b.clone().multiply(a)),
      )
    })
  })

  test("as a rotation vector, also from one that is not of length 1", () => {
    forEachOf(edges, quaternion, (q) => {
      expect(rotationVectorOfQuaternion(q), JSON.stringify(q)).toEqual([
        ...quaternionToRotationVector(q),
      ])
    })
  })
})

describe("NOVA's orientations, as rotation.ts reads them with three.js", () => {
  const random = seededRandom(13)

  test("a rotation vector: any angle, none, tiny, a half turn and beyond", () => {
    forEachOf(
      EDGE_ROTATION_VECTORS,
      () => randomRotationVector(random),
      (rotationVector) => {
        expect(
          numbersOfQuaternion(
            quaternionOfOrientation(rotationVector, "ROTATION_VECTOR"),
          ),
          JSON.stringify(rotationVector),
        ).toEqual(
          numbersOfQuaternion(
            parseRotationToQuaternion(rotationVector, "ROTATION_VECTOR"),
          ),
        )
      },
    )
  })

  test("a rotation vector and back", () => {
    forEachOf(
      EDGE_ROTATION_VECTORS,
      () => randomRotationVector(random),
      (rotationVector) => {
        expect(
          rotationVectorOfQuaternion(
            quaternionOfOrientation(rotationVector, "ROTATION_VECTOR"),
          ),
          JSON.stringify(rotationVector),
        ).toEqual([
          ...quaternionToRotationVector(
            parseRotationToQuaternion(rotationVector, "ROTATION_VECTOR"),
          ),
        ])
      },
    )
  })

  test("a quaternion is taken as it is, also when it is not of length 1 or misses entries", () => {
    forEachOf(
      EDGE_QUATERNIONS,
      () => randomQuaternion(random),
      (q) => {
        expect(
          numbersOfQuaternion(quaternionOfOrientation(q, "QUATERNION")),
          JSON.stringify(q),
        ).toEqual(
          numbersOfQuaternion(parseRotationToQuaternion(q, "QUATERNION")),
        )
      },
    )
  })

  test("a rotation vector with less than 3 values is an error", () => {
    for (const tooShort of [[], [0.1], [0.1, 0.2]]) {
      const error = (parse: () => unknown) => {
        try {
          parse()
        } catch (thrown) {
          return (thrown as Error).message
        }
        return "no error"
      }

      expect(
        error(() => quaternionOfOrientation(tooShort, "ROTATION_VECTOR")),
      ).toBe(
        error(() => parseRotationToQuaternion(tooShort, "ROTATION_VECTOR")),
      )
      expect(
        error(() => quaternionOfOrientation(tooShort, "ROTATION_VECTOR")),
      ).toContain("Invalid rotation vector length")
    }
  })

  test("another type, or none, warns and gives no rotation", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const warningsOf = (parse: () => Quat) => {
      warn.mockClear()
      return {
        quaternion: numbersOfQuaternion(parse()),
        warned: warn.mock.calls,
      }
    }

    for (const [orientation, type] of [
      [[0.1, 0.2, 0.3], "EULER_ANGLES_EXTRINSIC_XYZ"],
      [[0.1, 0.2, 0.3], undefined],
      [undefined, "ROTATION_VECTOR"],
      [undefined, "QUATERNION"],
    ] as const) {
      const plain = warningsOf(() => quaternionOfOrientation(orientation, type))
      const three = warningsOf(() =>
        parseRotationToQuaternion(orientation?.slice(), type),
      )

      expect(plain).toEqual(three)
      expect(plain.quaternion).toEqual([0, 0, 0, 1])
      expect(plain.warned).toHaveLength(1)
    }
  })
})

describe("poses, as Pose3 computes them with three.js", () => {
  const random = seededRandom(14)
  const frame = () => ({ position: [0, 0, 0], ...randomFrame(random) })
  const pose = () => ({
    position: random() < 0.1 ? undefined : randomPosition(random),
    orientation: random() < 0.1 ? undefined : randomRotationVector(random),
  })
  const edgePoses = EDGE_ROTATION_VECTORS.map((orientation) => ({
    position: [100, -200, 300],
    orientation,
  }))
  const edgeFrames = [
    ...EDGE_ROTATION_VECTORS.map((orientation) => ({
      position: [100, -200, 300],
      orientation,
      orientation_type: "ROTATION_VECTOR" as const,
    })),
    ...EDGE_QUATERNIONS.map((orientation) => ({
      position: [100, -200, 300],
      orientation,
      orientation_type: "QUATERNION" as const,
    })),
  ]

  test("of a NOVA pose", () => {
    forEachOf(edgePoses, pose, (apiPose) => {
      expect(numbersOfPose(poseOf(apiPose)), JSON.stringify(apiPose)).toEqual(
        numbersOfPose(Pose3.fromPose(apiPose)),
      )
    })
  })

  test("of a coordinate system and of a TCP", () => {
    forEachOf(edgeFrames, frame, (apiFrame) => {
      const message = JSON.stringify(apiFrame)

      expect(numbersOfPose(poseOfFrame(apiFrame)), message).toEqual(
        numbersOfPose(
          Pose3.fromCoordinateSystem({ coordinate_system: "a", ...apiFrame }),
        ),
      )
      expect(numbersOfPose(poseOfFrame(apiFrame)), message).toEqual(
        numbersOfPose(Pose3.fromRobotTcp(apiFrame)),
      )
    })
  })

  test("one after the other, and the inverse", () => {
    forEachOf(edgeFrames, frame, (first) => {
      const second = frame()
      const message = JSON.stringify({ first, second })
      const plain = [poseOfFrame(first), poseOfFrame(second)] as const
      const three = [
        Pose3.fromRobotTcp(first),
        Pose3.fromRobotTcp(second),
      ] as const

      expect(numbersOfPose(composePoses(...plain)), message).toEqual(
        numbersOfPose(three[0].multiply(three[1])),
      )
      expect(numbersOfPose(invertPose(plain[0])), message).toEqual(
        numbersOfPose(three[0].inverse()),
      )
      // As a pose is brought into another coordinate system
      expect(
        numbersOfPose(composePoses(invertPose(plain[0]), plain[1])),
        message,
      ).toEqual(numbersOfPose(three[0].inverse().multiply(three[1])))
    })
  })

  test("a pose is not changed by the math on it", () => {
    const first = poseOfFrame({
      position: [1, 2, 3],
      orientation: [0.1, 0.2, 0.3],
      orientation_type: "ROTATION_VECTOR",
    })
    const before = numbersOfPose(first)

    composePoses(first, invertPose(first))
    rotateVector(first.position, first.quaternion)
    rotationVectorOfQuaternion(first.quaternion)

    expect(numbersOfPose(first)).toEqual(before)
  })
})
