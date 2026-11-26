import { type DHParameter, JointTypeEnum } from "@wandelbots/nova-js/v2"
import { Euler, Matrix4, Object3D, Quaternion, Vector3 } from "three"
import { describe, expect, it } from "vitest"
import { MODEL_ROTATION } from "./modelRotation"
import {
  chainOffsetRestFrame,
  isRootPrismaticJoint,
  prismaticJointRestFrame,
} from "./robotModelLogic"

/**
 * ABB_IRT710 — a catalog linear axis, and representative of every other one
 * (Yaskawa_RECTY, KUKA_KL1500_3 are authored identically). Its rail runs along
 * model +X with model +Y up, and its `_J00` node carries the motion group's
 * `kinematic_chain_offset` — [1022.19, 0, 530] mm with orientation Ry(90°) in
 * Nova's frame, which is the node's translation [1.02219, 0.53, 0] and
 * Rz(-90°) in the Y-up model frame. The flange hangs off that node, undoing
 * the offset rotation.
 *
 * So the carriage travels along **world X** at a fixed height of 530 mm, and
 * the joint value translates the joint node along its *own* +Y axis, which
 * Rz(-90°) points along model +X.
 */
type ChainOffset = { position: number[]; orientation: number[] }

const IRT710_CHAIN_OFFSET: ChainOffset = {
  position: [1022.19, 0, 530],
  orientation: [0, Math.PI / 2, 0],
}
const JOINT_NODE_TRANSLATION = new Vector3(1.02219, 0.53, 0)
const JOINT_NODE_ROTATION = new Euler(0, 0, -Math.PI / 2)
const FLANGE_NODE_ROTATION = new Euler(0, 0, Math.PI / 2)

const PRISMATIC_ROW: DHParameter = {
  a: 0,
  alpha: 0,
  d: 0,
  theta: 0,
  reverse_rotation_direction: false,
  type: JointTypeEnum.PrismaticJoint,
}
const IRT710: DHParameter[] = [PRISMATIC_ROW]

function jointNode(name: string) {
  const node = new Object3D()
  node.name = name
  return node
}

/** The `_J00` node as the ABB_IRT710 export authors it. */
function authoredJointNode() {
  const node = jointNode("ABB_IRT710_J00")
  node.position.copy(JOINT_NODE_TRANSLATION)
  node.quaternion.setFromEuler(JOINT_NODE_ROTATION)
  return node
}

/**
 * The flange as the app actually renders it, at joint value `q` (meters): the
 * display rotation from `Robot3DCanvas`, the joint node as `GenericRobot`
 * renders it (the chain offset hoisted into a static `_REST` parent and the
 * joint node itself left at the identity), and the joint value as
 * `LinearAxisAnimator` writes it — onto the joint node's `position.y`.
 *
 * `chainOffset` defaults to what the controller publishes for this axis; pass
 * `null` to render the axis as a motion group without an offset.
 */
function renderedFlange(
  q: number,
  chainOffset: ChainOffset | null = IRT710_CHAIN_OFFSET,
): Object3D {
  const world = new Object3D()
  world.rotation.copy(MODEL_ROTATION)

  const authored = authoredJointNode()
  const joint = jointNode(authored.name)

  if (isRootPrismaticJoint(authored, IRT710)) {
    const rest = chainOffsetRestFrame(chainOffset)
    const restGroup = new Object3D()
    restGroup.name = `${authored.name}_REST`
    restGroup.position.copy(rest.position)
    restGroup.quaternion.copy(rest.quaternion)
    restGroup.add(joint)
    world.add(restGroup)
  } else {
    joint.position.copy(authored.position)
    joint.quaternion.copy(authored.quaternion)
    world.add(joint)
  }

  joint.position.y = q

  const flange = new Object3D()
  flange.name = "ABB_IRT710_FLG"
  flange.quaternion.setFromEuler(FLANGE_NODE_ROTATION)
  joint.add(flange)

  world.updateMatrixWorld(true)
  return flange
}

function worldPosition(node: Object3D) {
  return new Vector3().setFromMatrixPosition(node.matrixWorld)
}

function expectPosition(actual: Vector3, [x, y, z]: [number, number, number]) {
  expect(actual.x).toBeCloseTo(x, 5)
  expect(actual.y).toBeCloseTo(y, 5)
  expect(actual.z).toBeCloseTo(z, 5)
}

describe("MODEL_ROTATION", () => {
  it("brings the Y-up authored model into Nova's Z-up frame", () => {
    const up = new Vector3(0, 1, 0).applyEuler(MODEL_ROTATION)
    const depth = new Vector3(0, 0, 1).applyEuler(MODEL_ROTATION)
    const along = new Vector3(1, 0, 0).applyEuler(MODEL_ROTATION)

    expectPosition(up, [0, 0, 1])
    expectPosition(depth, [0, -1, 0])
    expectPosition(along, [1, 0, 0])
  })
})

describe("chainOffsetRestFrame", () => {
  /**
   * The ABB_IRT710 export bakes the offset into its `ABB_IRT710_J00` node, and
   * Yaskawa_RECTY does the same. Reproducing those authored values from the
   * published offset is what lets the same code path also place an export that
   * leaves the node at identity.
   */
  it("reproduces the transform the export bakes into J00", () => {
    const { position, quaternion } = chainOffsetRestFrame(IRT710_CHAIN_OFFSET)

    expectPosition(position, [
      JOINT_NODE_TRANSLATION.x,
      JOINT_NODE_TRANSLATION.y,
      JOINT_NODE_TRANSLATION.z,
    ])
    // Rz(-90°) — the rotation the export authored on that node.
    expect(
      quaternion.angleTo(new Quaternion().setFromEuler(JOINT_NODE_ROTATION)),
    ).toBeLessThan(1e-6)
  })

  it("is identity for a motion group without an offset", () => {
    const { position, quaternion } = chainOffsetRestFrame(null)

    expectPosition(position, [0, 0, 0])
    expect(
      new Matrix4().makeRotationFromQuaternion(quaternion).elements,
    ).toEqual(new Matrix4().elements)
  })
})

describe("linear axis display frames", () => {
  /**
   * Regression: the linear axis used to be displayed with an extra spin about
   * its travel axis, which stood the whole rail upright once catalog models
   * started carrying the chain offset on their joint node.
   */
  it("lays the rail down along world X", () => {
    const zero = worldPosition(renderedFlange(0))
    const travelled = worldPosition(renderedFlange(1))

    expectPosition(travelled.clone().sub(zero), [1, 0, 0])
  })

  it("puts the flange at the kinematic chain offset at joint value 0", () => {
    expectPosition(worldPosition(renderedFlange(0)), [1.02219, 0, 0.53])
  })

  /**
   * The pose RobotPad reads back from the controller for this axis at
   * 710.1 mm: (1732.3, 0, 530) mm, orientation zero.
   *
   * A rendered node's world transform is its Nova transform followed by the
   * Y-up basis change (the model's own frames stay Y-up inside the display
   * rotation), so the node's Nova orientation is its world orientation with
   * {@link MODEL_ROTATION} taken back off.
   */
  it("matches the controller's TCP pose at a jogged joint value", () => {
    const flange = renderedFlange(0.7101)

    expectPosition(worldPosition(flange), [1.73229, 0, 0.53])

    const novaOrientation = flange
      .getWorldQuaternion(new Quaternion())
      .multiply(new Quaternion().setFromEuler(MODEL_ROTATION).invert())
    expect(novaOrientation.angleTo(new Quaternion())).toBeLessThan(1e-6)
  })

  /**
   * The published offset, not the one the export baked in, is what places the
   * rail — so an export that leaves `_J00` at identity lands in the same spot,
   * and a motion group without an offset travels along the base Z axis.
   */
  it("travels along the base Z axis when there is no offset", () => {
    expectPosition(worldPosition(renderedFlange(0.25, null)), [0, 0, 0.25])
  })

  /**
   * The other two catalog axes, each measured against the `flange_pose` the
   * instance reports for the same joint value — the model is only in the right
   * place if the two agree. Millimeters throughout, as the API publishes them.
   */
  const controllerAnchors: [
    label: string,
    chainOffset: ChainOffset,
    jointValueMm: number,
    flangeMm: [number, number, number],
  ][] = [
    [
      "KUKA KL1500_3",
      { position: [1510.6, 0, 507], orientation: [0, Math.PI / 2, 0] },
      -134.10125732421875,
      [1376.499, 0, 507],
    ],
    [
      "Yaskawa RECTY",
      { position: [761.5, 0, 446.1], orientation: [0, Math.PI / 2, 0] },
      454.3496398925781,
      [1215.85, 0, 446.1],
    ],
  ]

  it.each(
    controllerAnchors,
  )("places the %s flange where the controller reports it", (_label, chainOffset, jointValueMm, flangeMm) => {
    const flange = renderedFlange(jointValueMm / 1000, chainOffset)
    const world = worldPosition(flange).multiplyScalar(1000)

    expect(world.x).toBeCloseTo(flangeMm[0], 3)
    expect(world.y).toBeCloseTo(flangeMm[1], 3)
    expect(world.z).toBeCloseTo(flangeMm[2], 3)
  })
})

describe("isRootPrismaticJoint", () => {
  const prismatic = PRISMATIC_ROW
  const revolute: DHParameter = { ...prismatic, type: undefined }

  it("matches the first joint of a prismatic chain", () => {
    expect(
      isRootPrismaticJoint(jointNode("KUKA_KL1500_3_J00"), [prismatic]),
    ).toBe(true)
  })

  it("ignores joints further down the chain", () => {
    expect(
      isRootPrismaticJoint(jointNode("SOME_ROBOT_J01"), [prismatic, prismatic]),
    ).toBe(false)
  })

  it("ignores revolute robots, whose models carry the offset themselves", () => {
    expect(
      isRootPrismaticJoint(jointNode("UNIVERSALROBOTS_UR5E_J00"), [revolute]),
    ).toBe(false)
  })

  it("ignores non-joint nodes", () => {
    expect(isRootPrismaticJoint(jointNode("link_0"), [prismatic])).toBe(false)
  })
})

describe("prismaticJointRestFrame", () => {
  it("hoists the authored transform of a prismatic joint node", () => {
    const rest = prismaticJointRestFrame(authoredJointNode(), IRT710)
    if (!rest) throw new Error("expected a prismatic joint rest frame")

    expectPosition(rest.position, [1.02219, 0.53, 0])
    expect(
      rest.quaternion.angleTo(
        new Quaternion().setFromEuler(JOINT_NODE_ROTATION),
      ),
    ).toBeLessThan(1e-6)
  })

  it.each([
    ["a non-joint node", "ABB_IRT710_link_1", IRT710],
    [
      "a revolute joint",
      "ABB_IRT710_J00",
      [{ theta: 0, type: JointTypeEnum.RevoluteJoint }] as DHParameter[],
    ],
    ["an index the DH chain does not cover", "ABB_IRT710_J03", IRT710],
    ["a missing DH chain", "ABB_IRT710_J00", [] as DHParameter[]],
  ])("leaves %s untouched", (_label, name, dhParameters) => {
    const node = authoredJointNode()
    node.name = name

    expect(prismaticJointRestFrame(node, dhParameters)).toBeNull()
  })
})
