import type { DHParameter } from "@wandelbots/nova-js/v2"
import { Euler, Object3D, Quaternion, Vector3 } from "three"
import { describe, expect, it } from "vitest"
import { MODEL_ROTATION } from "./modelRotation"
import {
  chainOffsetRestFrame,
  jointRestFrame,
  revoluteJointRestFrame,
} from "./robotModelLogic"

const Y_AXIS = new Vector3(0, 1, 0)

/** The rotation the animators write into a joint node: `rotation.y = θ ± q`. */
function drive(restFrame: Quaternion, dh: DHParameter, jointValue: number) {
  const sign = dh.reverse_rotation_direction ? -1 : 1
  return restFrame
    .clone()
    .multiply(
      new Quaternion().setFromAxisAngle(
        Y_AXIS,
        sign * jointValue + (dh.theta ?? 0),
      ),
    )
}

/** What the joint node's authored rest pose says the result must be. */
function expected(rest: Quaternion, dh: DHParameter, jointValue: number) {
  const sign = dh.reverse_rotation_direction ? -1 : 1
  return rest
    .clone()
    .multiply(new Quaternion().setFromAxisAngle(Y_AXIS, sign * jointValue))
}

function degreesBetween(a: Quaternion, b: Quaternion) {
  return (a.angleTo(b) * 180) / Math.PI
}

describe("jointRestFrame", () => {
  /**
   * MANUS_RIGHT_ARM_J00 — the first catalog node whose authored rest rotation
   * is oblique (Euler XYZ = -0.02°, -75.00°, 103.52°). Overwriting the node's
   * Euler-Y, as the animators used to do, both destroys the -75° rest and
   * turns the jog into a rotation about the *parent* Y axis.
   */
  const manusJ00Rest = new Quaternion(
    -0.4782082140445709,
    -0.37669721245765686,
    0.6231732368469238,
    0.4909901022911072,
  )
  const manusJ00Dh: DHParameter = {
    theta: 0,
    reverse_rotation_direction: false,
  } as DHParameter

  it("reproduces the authored rest pose at joint value 0", () => {
    const frame = jointRestFrame(manusJ00Rest, manusJ00Dh.theta ?? 0)

    expect(
      degreesBetween(drive(frame, manusJ00Dh, 0), manusJ00Rest),
    ).toBeLessThan(1e-4)
  })

  it.each([
    0,
    0.3,
    -1.2,
    Math.PI,
  ])("drives the joint about its own axis (q = %s)", (q) => {
    const frame = jointRestFrame(manusJ00Rest, manusJ00Dh.theta ?? 0)

    expect(
      degreesBetween(
        drive(frame, manusJ00Dh, q),
        expected(manusJ00Rest, manusJ00Dh, q),
      ),
    ).toBeLessThan(1e-4)
  })

  it("rotates joint 0 about the shoulder axis, not the parent's Y axis", () => {
    const frame = jointRestFrame(manusJ00Rest, manusJ00Dh.theta ?? 0)

    const delta = drive(frame, manusJ00Dh, 0.5).multiply(
      drive(frame, manusJ00Dh, 0).invert(),
    )
    const axis = new Vector3(delta.x, delta.y, delta.z).normalize()

    // The node's own +Y expressed in the parent frame.
    expect(axis.x).toBeCloseTo(-0.252, 3)
    expect(axis.y).toBeCloseTo(-0.234, 3)
    expect(axis.z).toBeCloseTo(-0.939, 3)
  })

  /**
   * KUKA_KR6R700_SIXX_J02 — representative of the existing catalog, whose
   * joint nodes carry their DH `theta` in the rest rotation's Euler-Y and
   * nothing in Euler-Z. These already render correctly and must not move.
   */
  it("leaves a catalog joint node unchanged", () => {
    const rest = new Quaternion().setFromEuler(new Euler(0, -Math.PI / 2, 0))
    const dh = {
      theta: -Math.PI / 2,
      reverse_rotation_direction: false,
    } as DHParameter

    const frame = jointRestFrame(rest, dh.theta ?? 0)

    for (const q of [0, 0.4, -0.9]) {
      // Identical to what overwriting `rotation.y` produced for this node.
      const previous = new Quaternion().setFromEuler(
        new Euler(0, (dh.theta ?? 0) + q, 0),
      )
      expect(degreesBetween(drive(frame, dh, q), previous)).toBeLessThan(1e-4)
    }
  })

  it("honours reverse_rotation_direction", () => {
    const dh = {
      theta: 0,
      reverse_rotation_direction: true,
    } as DHParameter
    const frame = jointRestFrame(manusJ00Rest, dh.theta ?? 0)

    expect(
      degreesBetween(drive(frame, dh, 0.7), expected(manusJ00Rest, dh, 0.7)),
    ).toBeLessThan(1e-4)
  })
})

describe("revoluteJointRestFrame", () => {
  const revolute = {
    theta: 0.25,
    reverse_rotation_direction: false,
    type: "REVOLUTE_JOINT",
  } as DHParameter
  const prismatic = {
    theta: 0.25,
    reverse_rotation_direction: false,
    type: "PRISMATIC_JOINT",
  } as DHParameter

  function node(name: string) {
    const object = new Object3D()
    object.name = name
    object.quaternion.setFromEuler(new Euler(Math.PI / 2, 0, 1.8))
    return object
  }

  it("hoists the rest rotation of a revolute joint", () => {
    const result = revoluteJointRestFrame(node("ROBOT_J00"), [revolute])
    if (!result) throw new Error("expected a revolute joint rest frame")

    expect(result.theta).toBe(0.25)
    expect(
      degreesBetween(
        result.frame
          .clone()
          .multiply(new Quaternion().setFromAxisAngle(Y_AXIS, result.theta)),
        node("ROBOT_J00").quaternion,
      ),
    ).toBeLessThan(1e-4)
  })

  it("uses the kinematic chain offset for the root revolute joint", () => {
    const chainOffset = chainOffsetRestFrame({
      position: [0, 0, 592],
      orientation: [1.2091995761561452, 1.2091995761561452, 1.2091995761561452],
    })

    const result = revoluteJointRestFrame(
      node("KUKA_DKP500_2_J00"),
      [revolute],
      chainOffset,
    )
    if (!result) throw new Error("expected a revolute joint rest frame")

    expect(result.position.distanceTo(chainOffset.position)).toBeLessThan(1e-6)
    expect(
      degreesBetween(
        result.frame
          .clone()
          .multiply(new Quaternion().setFromAxisAngle(Y_AXIS, result.theta)),
        chainOffset.quaternion,
      ),
    ).toBeLessThan(1e-4)
  })

  it("rotates DKP500 link_1 around X by 90 degrees", () => {
    const chainOffset = chainOffsetRestFrame({
      position: [0, 0, 592],
      orientation: [1.2091995761561452, 1.2091995761561452, 1.2091995761561452],
    })
    const world = new Object3D()
    world.rotation.copy(MODEL_ROTATION)
    const chain = new Object3D()
    chain.quaternion.copy(chainOffset.quaternion)
    world.add(chain)
    const link = new Object3D()
    link.rotation.y = -Math.PI / 2
    chain.add(link)
    world.updateMatrixWorld(true)

    const rotation = new Euler().setFromQuaternion(
      link.getWorldQuaternion(new Quaternion()),
      "XYZ",
    )
    expect(rotation.x).toBeCloseTo(Math.PI / 2, 6)
  })

  /**
   * `DHParameter.type` is optional, and an absent one means a revolute joint —
   * the API schema declares that default and the rest of the app reads it that
   * way (`RobotDescription.jointType`, `MotionGroupVisualizer`,
   * `computeLinkFrames`).
   * Requiring the field would silently disable the hoist for every controller
   * whose serializer drops default-valued fields.
   */
  it("hoists a joint whose DH row omits the optional type", () => {
    const untyped = {
      theta: 0.25,
      reverse_rotation_direction: false,
    } as DHParameter

    const result = revoluteJointRestFrame(node("ROBOT_J00"), [untyped])
    if (!result) throw new Error("expected a revolute joint rest frame")

    expect(result.theta).toBe(0.25)
    expect(
      degreesBetween(
        result.frame
          .clone()
          .multiply(new Quaternion().setFromAxisAngle(Y_AXIS, result.theta)),
        node("ROBOT_J00").quaternion,
      ),
    ).toBeLessThan(1e-4)
  })

  it.each([
    ["a non-joint node", "ROBOT_link_1", [revolute]],
    ["a prismatic joint", "ROBOT_J00", [prismatic]],
    ["an index the DH chain does not cover", "ROBOT_J03", [revolute]],
    ["a missing DH chain", "ROBOT_J00", []],
  ])("leaves %s untouched", (_label, name, dhParameters) => {
    expect(revoluteJointRestFrame(node(name), dhParameters)).toBeNull()
  })
})
