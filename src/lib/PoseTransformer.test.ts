import type { CoordinateSystem } from "@wandelbots/nova-js/v2"
import { Vector3 } from "three"
import { describe, expect, test } from "vitest"
import {
  EDGE_ROTATION_VECTORS,
  type RandomFrame,
  randomFrame,
  randomPosition,
  randomRotationVector,
  seededRandom,
} from "./__fixtures__/randomPoses"
import { Pose3 } from "./Pose3"
import {
  deriveSelectedTcpPose,
  resolveCoordinateSystemInWorld,
  transformPoseToCoordinateSystem,
  transformPoseToTcp,
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

  test("keeps what else the pose carries, such as its TCP", () => {
    const transformed = transformPoseToCoordinateSystem(
      {
        pose: { position: [10, 0, 0], orientation: [0, 0, 0] },
        tcpId: "tool",
        coordinateSystemId: "rotated-90-z",
      },
      "world",
      [world, rotated],
    )

    expect(transformed.tcpId).toBe("tool")
  })
})

describe("deriveSelectedTcpPose", () => {
  /** The flange, and a tool 100 mm out along the flange's Z */
  const tcpOffsetsById = {
    Flange: { name: "Default-Flange", pose: {} },
    tool: { name: "Tool", pose: { position: [0, 0, 100] } },
  }
  const flangePose = {
    pose: { position: [500, 0, 300], orientation: [0, 0, 0] },
    tcpId: "Flange",
    coordinateSystemId: "world",
  }

  test("is the pose of the selected TCP", () => {
    const derived = deriveSelectedTcpPose({
      inputPose: flangePose,
      selectedTcpId: "tool",
      tcpOffsetsById,
      coordinateSystems: [world],
    })

    expect(derived.tcpId).toBe("tool")
    expect(derived.coordinateSystemId).toBe("world")
    expectVectorCloseTo(derived.pose.position, [500, 0, 400])
    expectVectorCloseTo(derived.pose.orientation, [0, 0, 0])
  })

  test("in the selected coordinate system", () => {
    const derived = deriveSelectedTcpPose({
      inputPose: flangePose,
      selectedTcpId: "tool",
      selectedCoordinateSystemId: "rotated-90-z",
      tcpOffsetsById,
      coordinateSystems: [world, rotated],
    })

    expect(derived.tcpId).toBe("tool")
    expect(derived.coordinateSystemId).toBe("rotated-90-z")
    // World [500, 0, 400] is the frame's origin, raised by 400
    expectVectorCloseTo(derived.pose.position, [0, 0, 400])
  })

  test("is the pose as it is when nothing is selected", () => {
    expect(
      deriveSelectedTcpPose({
        inputPose: flangePose,
        tcpOffsetsById,
        coordinateSystems: [world],
      }),
    ).toBe(flangePose)
  })

  test("names the known TCPs for an unknown one", () => {
    expect(() =>
      deriveSelectedTcpPose({
        inputPose: flangePose,
        selectedTcpId: "missing",
        tcpOffsetsById,
        coordinateSystems: [world],
      }),
    ).toThrow("Known TCPs are: Flange, tool")
  })
})

// Ported from RobotPad (unit/PoseTransformer.test.ts)
describe("transformPoseToTcp", () => {
  test("turns a TCP's pose into the flange's (regression RPS-1590)", () => {
    const flangePose = transformPoseToTcp(
      {
        position: [445.8445870131073, 8.543116867448944, -102.44259543449492],
        orientation: [
          -2.2200715682868584, -2.2204911643877585, -0.000058320795199238045,
        ],
      },
      {
        id: "tcp_frame_3",
        name: "",
        position: [15.04, 0, 159],
        orientation: [0, -0.785, 0],
        orientation_type: "ROTATION_VECTOR",
      },
      {
        id: "Flange",
        name: "Default-Flange",
        position: [0, 0, 0],
        orientation: [0, 0, 0],
        orientation_type: "ROTATION_VECTOR",
      },
    )

    expectVectorCloseTo(
      flangePose.position,
      [445.9832385471837, -114.6019304795401, -0.7446127128109623],
    )
    expectVectorCloseTo(
      flangePose.orientation,
      [-1.7593623643757612, -1.7588689904693675, -0.728395574353933],
    )
  })

  test("turns it back into the TCP's pose", () => {
    const tool = {
      id: "tool",
      position: [10, 20, 150],
      orientation: [0.3, -0.2, 0.1],
    }
    const flange = { id: "Flange", position: [0, 0, 0], orientation: [0, 0, 0] }
    const pose = { position: [400, -100, 300], orientation: [3, 0.1, -0.2] }

    const back = transformPoseToTcp(
      transformPoseToTcp(pose, tool, flange),
      flange,
      tool,
    )

    expectVectorCloseTo(back.position, pose.position)
    expectVectorCloseTo(back.orientation, pose.orientation)
  })
})

// The transformer gives a robot its Move to targets and an app the poses it
// shows. Pose3 computes the same on three.js objects, as the transformer did
// before it took plain numbers: the numbers must be the same to the last bit.
describe("the same numbers as the pose math on three.js objects (Pose3)", () => {
  const RUNS = 2000

  const coordinateSystemOf = (
    id: string,
    reference: string,
    frame: RandomFrame,
  ): CoordinateSystem => ({
    coordinate_system: id,
    reference_coordinate_system: reference,
    ...frame,
  })

  /** A frame's pose in world, as the transformer keeps it: a rotation vector */
  function inWorld(frame: RandomFrame, referenceInWorld: RandomFrame) {
    const combined = Pose3.fromCoordinateSystem(
      coordinateSystemOf("reference", "", referenceInWorld),
    ).multiply(
      Pose3.fromCoordinateSystem(coordinateSystemOf("frame", "", frame)),
    )
    return {
      position: [...combined.position],
      orientation: [...combined.orientation],
      orientation_type: "ROTATION_VECTOR" as const,
    }
  }

  /** Coordinate systems a, b and c: a is in world, b in a, c in b */
  function randomChain(random: () => number) {
    const a = randomFrame(random)
    const b = randomFrame(random)
    const c = randomFrame(random)
    const bInWorld = inWorld(b, a)
    return {
      coordinateSystems: [
        world,
        coordinateSystemOf("a", "", a),
        coordinateSystemOf("b", "a", b),
        coordinateSystemOf("c", "b", c),
      ],
      inWorld: {
        world,
        a,
        b: bInWorld,
        c: inWorld(c, bInWorld),
      } as Record<string, RandomFrame>,
    }
  }

  const randomPose = (random: () => number) => ({
    position: randomPosition(random),
    orientation:
      random() < 0.2
        ? (EDGE_ROTATION_VECTORS[
            Math.floor(random() * EDGE_ROTATION_VECTORS.length)
          ] as number[])
        : randomRotationVector(random),
  })

  test("a coordinate system in world, through the coordinate systems it refers to", () => {
    const random = seededRandom(1)
    for (let run = 0; run < RUNS; run++) {
      const chain = randomChain(random)
      for (const id of ["a", "b", "c"]) {
        const resolved = resolveCoordinateSystemInWorld(
          id,
          chain.coordinateSystems,
        )
        const expected = chain.inWorld[id] as RandomFrame
        expect(
          {
            position: resolved.position,
            orientation: resolved.orientation,
            orientation_type: resolved.orientation_type,
          },
          JSON.stringify(chain.coordinateSystems),
        ).toEqual({
          position: expected.position,
          orientation: expected.orientation,
          orientation_type: expected.orientation_type,
        })
      }
    }
  })

  test("a pose in another coordinate system", () => {
    const random = seededRandom(2)
    const ids = ["world", "a", "b", "c"]
    for (let run = 0; run < RUNS; run++) {
      const chain = randomChain(random)
      const pose = randomPose(random)
      const from = ids[Math.floor(random() * ids.length)] as string
      const to = ids.filter((id) => id !== from)[
        Math.floor(random() * (ids.length - 1))
      ] as string

      const transformed = transformPoseToCoordinateSystem(
        { pose, coordinateSystemId: from },
        to,
        chain.coordinateSystems,
      )

      const expected = Pose3.fromCoordinateSystem(
        coordinateSystemOf(to, "", chain.inWorld[to] as RandomFrame),
      )
        .inverse()
        .multiply(
          Pose3.fromCoordinateSystem(
            coordinateSystemOf(from, "", chain.inWorld[from] as RandomFrame),
          ).multiply(Pose3.fromPose(pose)),
        )
      expect(
        transformed.pose,
        JSON.stringify({ pose, from, to, chain: chain.coordinateSystems }),
      ).toEqual({
        position: [...expected.position],
        orientation: [...expected.orientation],
      })
    }
  })

  test("a TCP's pose as the pose of another TCP", () => {
    const random = seededRandom(3)
    const randomTcp = () => ({ position: [0, 0, 0], ...randomFrame(random) })
    for (let run = 0; run < RUNS; run++) {
      const pose = randomPose(random)
      const poseTcp = randomTcp()
      const targetTcp = randomTcp()

      const transformed = transformPoseToTcp(pose, poseTcp, targetTcp)

      const expected = Pose3.fromPose(pose)
        .multiply(Pose3.fromRobotTcp(poseTcp).inverse())
        .multiply(Pose3.fromRobotTcp(targetTcp))
      expect(transformed, JSON.stringify({ pose, poseTcp, targetTcp })).toEqual(
        {
          position: [...expected.position],
          orientation: [...expected.orientation],
        },
      )
    }
  })
})
