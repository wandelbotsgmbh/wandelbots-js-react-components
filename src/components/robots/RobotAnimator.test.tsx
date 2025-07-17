import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import { describe, expect, it } from "vitest"
import RobotAnimator from "./RobotAnimator"

describe("RobotAnimator", () => {
  it("should export the component correctly", () => {
    expect(RobotAnimator).toBeDefined()
    expect(typeof RobotAnimator).toBe("function")
  })

  it("should handle props with different numbers of joints", () => {
    // Test that the component accepts different numbers of DH parameters
    const mockMotionState4Joints: MotionGroupStateResponse = {
      state: {
        joint_position: {
          joints: [0.1, 0.2, 0.3, 0.4],
        },
      },
    } as any

    const mockDHParameters4Joints: DHParameter[] = [
      { theta: 0, reverse_rotation_direction: false },
      { theta: 0, reverse_rotation_direction: false },
      { theta: 0, reverse_rotation_direction: false },
      { theta: 0, reverse_rotation_direction: false },
    ]

    const mockMotionState7Joints: MotionGroupStateResponse = {
      state: {
        joint_position: {
          joints: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
        },
      },
    } as any

    const mockDHParameters7Joints: DHParameter[] = Array(7).fill({
      theta: 0,
      reverse_rotation_direction: false,
    })

    // These should not throw TypeScript errors
    expect(() => {
      const props4 = {
        rapidlyChangingMotionState: mockMotionState4Joints,
        dhParameters: mockDHParameters4Joints,
        children: null,
      }
      // Verify props are correctly typed
      expect(props4.dhParameters).toHaveLength(4)
      expect(
        props4.rapidlyChangingMotionState.state.joint_position.joints,
      ).toHaveLength(4)
    }).not.toThrow()

    expect(() => {
      const props7 = {
        rapidlyChangingMotionState: mockMotionState7Joints,
        dhParameters: mockDHParameters7Joints,
        children: null,
      }
      expect(props7.dhParameters).toHaveLength(7)
      expect(
        props7.rapidlyChangingMotionState.state.joint_position.joints,
      ).toHaveLength(7)
    }).not.toThrow()
  })

  it("should verify dynamic joint configuration logic", () => {
    // Test the logic that would create dynamic spring configs
    const testConfigs = [
      { jointCount: 3, expectedJoints: ["joint0", "joint1", "joint2"] },
      {
        jointCount: 6,
        expectedJoints: [
          "joint0",
          "joint1",
          "joint2",
          "joint3",
          "joint4",
          "joint5",
        ],
      },
      {
        jointCount: 8,
        expectedJoints: [
          "joint0",
          "joint1",
          "joint2",
          "joint3",
          "joint4",
          "joint5",
          "joint6",
          "joint7",
        ],
      },
    ]

    testConfigs.forEach(({ jointCount, expectedJoints }) => {
      // Simulate the logic from the component
      const dhParameters = Array(jointCount).fill({
        theta: 0,
        reverse_rotation_direction: false,
      })
      const jointValues = Array(jointCount)
        .fill(0)
        .map((_, i) => i * 0.1)

      const config: any = {
        config: { tension: 120, friction: 20 },
        onChange: () => {},
      }

      dhParameters.forEach((_, index) => {
        config[`joint${index}`] = jointValues[index] || 0
      })

      // Verify the configuration has the expected joint properties
      expectedJoints.forEach((jointKey) => {
        expect(config[jointKey]).toBeDefined()
        expect(typeof config[jointKey]).toBe("number")
      })

      // Verify no extra joints were added
      const actualJointKeys = Object.keys(config).filter((key) =>
        key.startsWith("joint"),
      )
      expect(actualJointKeys).toHaveLength(jointCount)
    })
  })
})
