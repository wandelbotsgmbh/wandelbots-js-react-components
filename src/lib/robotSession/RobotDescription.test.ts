import type {
  KinematicModel,
  MotionGroupDescription,
  RobotControllerConfiguration,
} from "@wandelbots/nova-js/v2"
import { describe, expect, test } from "vitest"
import { RobotDescription } from "./RobotDescription"

function descriptionWith(
  dhParameters: MotionGroupDescription["dh_parameters"],
) {
  return new RobotDescription(
    {
      motion_group_model: "UniversalRobots_UR5e",
      dh_parameters: dhParameters,
      operation_limits: {},
    } as MotionGroupDescription,
    { kind: "VirtualController" } as RobotControllerConfiguration,
    {} as KinematicModel,
    "UniversalRobots_UR5e",
    [],
  )
}

describe("RobotDescription.dhParameters", () => {
  // NOVA's API v2 leaves out values that are 0, as ConnectedMotionGroup
  // knew: the robots draw from complete parameters
  test("fills the values NOVA leaves out with 0", () => {
    const description = descriptionWith([
      { type: "REVOLUTE_JOINT", d: 162.5, alpha: Math.PI / 2 },
      { type: "REVOLUTE_JOINT", a: -425 },
    ])

    expect(description.dhParameters).toEqual([
      {
        type: "REVOLUTE_JOINT",
        a: 0,
        d: 162.5,
        alpha: Math.PI / 2,
        theta: 0,
        reverse_rotation_direction: false,
      },
      {
        type: "REVOLUTE_JOINT",
        a: -425,
        d: 0,
        alpha: 0,
        theta: 0,
        reverse_rotation_direction: false,
      },
    ])
  })

  test("is one list: a memo or effect that depends on it runs once", () => {
    const description = descriptionWith([{ type: "REVOLUTE_JOINT", a: 1 }])

    expect(description.dhParameters).toBe(description.dhParameters)
  })

  test("is empty for a motion group without DH parameters", () => {
    expect(descriptionWith(undefined).dhParameters).toEqual([])
  })
})
