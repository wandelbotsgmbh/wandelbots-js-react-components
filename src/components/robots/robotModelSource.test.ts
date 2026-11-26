import type { MotionGroupState } from "@wandelbots/nova-js/v2"
import * as THREE from "three"
import { describe, expect, test } from "vitest"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { robotModelOf } from "./robotModelSource"

const motionState = {
  motion_group: "0@ur5e",
  joint_position: [0, 1, 2, 3, 4, 5],
} as MotionGroupState

/** The parts of a session that robotModelOf reads */
function sessionWith(
  mounting: { position?: number[]; orientation?: number[] } | null,
) {
  return {
    nova: { config: { instanceUrl: "https://nova.example.com" } },
    description: {
      motionGroupModel: "UniversalRobots_UR5e",
      dhParameters: [{ a: 0, d: 162.5, alpha: 0, theta: 0 }],
      mounting,
    },
    state: { rapidlyChangingMotionState: motionState },
  } as unknown as RobotSession
}

describe("robotModelOf", () => {
  test("gives the session's robot: its model, DH parameters, live state and connection", () => {
    const session = sessionWith(null)

    const model = robotModelOf(session)

    expect(model.modelFromController).toBe("UniversalRobots_UR5e")
    expect(model.dhParameters).toBe(session.description.dhParameters)
    // The live state itself, which the stream updates in place: the robot
    // moves without a new render
    expect(model.rapidlyChangingMotionState).toBe(motionState)
    expect(model.nova).toBe(session.nova)
  })

  test("gives the mounting in 3D units: metres and a quaternion", () => {
    const model = robotModelOf(
      sessionWith({
        position: [1000, -500, 250],
        orientation: [0, 0, Math.PI / 2],
      }),
    )

    expect(model.mountingPosition).toEqual([1, -0.5, 0.25])
    const expected = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      Math.PI / 2,
    )
    expect(model.mountingQuaternion?.angleTo(expected)).toBeCloseTo(0)
  })

  test("mounts a robot without a mounting at the origin", () => {
    const model = robotModelOf(sessionWith(null))

    expect(model.mountingPosition).toEqual([0, 0, 0])
    expect(model.mountingQuaternion?.angleTo(new THREE.Quaternion())).toBe(0)
  })
})
