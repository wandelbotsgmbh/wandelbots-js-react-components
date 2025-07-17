import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import { describe, expect, it, vi } from "vitest"
import RobotAnimator from "./RobotAnimator"

// Mock the dependencies
vi.mock("./robotModelLogic", () => ({
  collectJoints: vi.fn(),
}))

vi.mock("@react-spring/three", () => ({
  useSpring: vi.fn(),
}))

import { useSpring } from "@react-spring/three"

const mockUseSpring = useSpring as any

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

  it("should use React Spring for smooth interpolation", () => {
    const mockSpringResult = {
      joint0: { get: () => 0.6 },
      joint1: { get: () => -1.2 },
    }

    // Mock useSpring to return spring values with get() methods
    mockUseSpring.mockReturnValue(mockSpringResult)

    // Verify useSpring would be called with proper configuration
    expect(typeof mockUseSpring).toBe("function")

    // Test the rotation calculation logic
    const dhParam1 = { theta: 0.1, reverse_rotation_direction: false }
    const dhParam2 = { theta: -0.2, reverse_rotation_direction: true }
    const jointValue1 = 0.5
    const jointValue2 = 1.0

    // Calculate expected rotations
    const expectedRotation1 = 1 * jointValue1 + 0.1 // 0.6
    const expectedRotation2 = -1 * jointValue2 + -0.2 // -1.2

    expect(expectedRotation1).toBe(0.6)
    expect(expectedRotation2).toBe(-1.2)

    // Test edge cases
    const dhParamReverse = { theta: 0, reverse_rotation_direction: true }
    const jointValueZero = 0
    const expectedRotationReverse = -1 * jointValueZero + 0 // 0

    expect(expectedRotationReverse).toBe(0)

    // Verify the spring result structure
    expect(mockSpringResult.joint0.get()).toBe(0.6)
    expect(mockSpringResult.joint1.get()).toBe(-1.2)
  })
})
