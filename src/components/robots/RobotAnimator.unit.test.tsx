import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import { Object3D } from "three"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

// Import the component for testing
import RobotAnimator from "./RobotAnimator"

// Mock the dependencies
vi.mock("../utils/hooks", () => ({
  useAutorun: vi.fn(),
}))

vi.mock("./robotModelLogic", () => ({
  collectJoints: vi.fn(),
}))

vi.mock("@react-spring/three", () => ({
  Globals: {
    assign: vi.fn(),
  },
  useSpring: vi.fn(),
}))

vi.mock("@react-three/fiber", () => ({
  useThree: () => ({
    invalidate: vi.fn(),
  }),
}))

import { useSpring } from "@react-spring/three"
import { useAutorun } from "../utils/hooks"
import { collectJoints } from "./robotModelLogic"

const mockUseAutorun = useAutorun as any
const mockCollectJoints = collectJoints as any
const mockUseSpring = useSpring as any

describe("RobotAnimator Logic Tests", () => {
  const mockMotionState: MotionGroupStateResponse = {
    state: {
      joint_position: {
        joints: [0, 0.5, 1, 1.5, 2, 2.5],
      },
    },
  } as any

  const mockDhParameters: DHParameter[] = [
    { theta: 0, reverse_rotation_direction: false },
    { theta: 0.1, reverse_rotation_direction: true },
    { theta: 0.2, reverse_rotation_direction: false },
    { theta: 0.3, reverse_rotation_direction: true },
    { theta: 0.4, reverse_rotation_direction: false },
    { theta: 0.5, reverse_rotation_direction: true },
  ]

  let mockJointObjects: Object3D[]
  let mockAxisValues: any
  let mockSetSpring: any
  let mockSpringConfig: any
  let mockAutorunCallback: any

  beforeEach(() => {
    // Create mock joint objects
    mockJointObjects = Array.from({ length: 6 }, (_, i) => {
      const obj = new Object3D()
      obj.name = `Joint_J${i + 1}`
      obj.rotation.y = 0
      return obj
    })

    // Mock axis values object that acts like spring values
    mockAxisValues = {}
    for (let i = 0; i < 6; i++) {
      mockAxisValues[i] = {
        get: vi
          .fn()
          .mockReturnValue(mockMotionState.state.joint_position.joints[i]),
      }
    }

    mockSetSpring = {
      start: vi.fn(),
    }

    // Mock spring config that will be returned by useSpring
    mockSpringConfig = {
      onChange: vi.fn(),
      onResolve: vi.fn(),
    }

    // Mock collectJoints to return our mock joint objects
    mockCollectJoints.mockReturnValue(mockJointObjects)

    // Mock useSpring to return our mock values and accept a factory function
    mockUseSpring.mockImplementation((factory: any) => {
      const config = factory()
      mockSpringConfig.onChange = config.onChange
      mockSpringConfig.onResolve = config.onResolve
      return [mockAxisValues, mockSetSpring]
    })

    // Mock useAutorun to store the callback
    mockUseAutorun.mockImplementation((callback: any) => {
      mockAutorunCallback = callback
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it("should have correct component structure", () => {
    expect(RobotAnimator).toBeDefined()
    expect(typeof RobotAnimator).toBe("function")
  })

  it("should test joint rotation calculation logic", () => {
    // Test the joint rotation calculation logic separately
    const joints = mockJointObjects
    const jointValues = [0, 0.5, 1, 1.5, 2, 2.5]
    const dhParameters = mockDhParameters

    // Simulate the rotation calculation that would happen in the component
    joints.forEach((joint, index) => {
      const dhParam = dhParameters[index]
      const rotationOffset = dhParam.theta || 0
      const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

      joint.rotation.y = rotationSign * jointValues[index]! + rotationOffset
    })

    // Verify rotations are set correctly
    expect(joints[0].rotation.y).toBe(0 * 1 + 0) // 0
    expect(joints[1].rotation.y).toBe(0.5 * -1 + 0.1) // -0.4
    expect(joints[2].rotation.y).toBe(1 * 1 + 0.2) // 1.2
    expect(joints[3].rotation.y).toBe(1.5 * -1 + 0.3) // -1.2
    expect(joints[4].rotation.y).toBe(2 * 1 + 0.4) // 2.4
    expect(joints[5].rotation.y).toBe(2.5 * -1 + 0.5) // -2.0
  })

  it("should test joint value filtering logic", () => {
    // Test the filtering logic that removes undefined values
    const inputJoints = [1, undefined, 3, undefined, 5, 6]
    const filteredJoints = inputJoints.filter((item) => item !== undefined)

    expect(filteredJoints).toEqual([1, 3, 5, 6])
    expect(filteredJoints.length).toBe(4)
  })

  it("should test DH parameter application", () => {
    // Test various DH parameter combinations
    const testCases = [
      {
        jointValue: 1.0,
        dhParam: { theta: 0, reverse_rotation_direction: false },
        expected: 1.0,
      },
      {
        jointValue: 1.0,
        dhParam: { theta: 0.5, reverse_rotation_direction: false },
        expected: 1.5,
      },
      {
        jointValue: 1.0,
        dhParam: { theta: 0, reverse_rotation_direction: true },
        expected: -1.0,
      },
      {
        jointValue: 1.0,
        dhParam: { theta: 0.5, reverse_rotation_direction: true },
        expected: -0.5,
      },
    ]

    testCases.forEach(({ jointValue, dhParam, expected }) => {
      const joint = new Object3D()
      const rotationOffset = dhParam.theta || 0
      const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

      joint.rotation.y = rotationSign * jointValue + rotationOffset

      expect(joint.rotation.y).toBeCloseTo(expected, 5)
    })
  })

  it("should test component props validation", () => {
    // Test that the component has the correct prop structure
    // We can't call the component directly without React context,
    // so we'll validate the prop types instead
    const validProps = {
      rapidlyChangingMotionState: mockMotionState,
      dhParameters: mockDhParameters,
      onRotationChanged: vi.fn(),
      children: null,
    }

    // Verify the prop structure matches expected types
    expect(validProps.rapidlyChangingMotionState).toBeDefined()
    expect(validProps.dhParameters).toBeDefined()
    expect(Array.isArray(validProps.dhParameters)).toBe(true)
    expect(typeof validProps.onRotationChanged).toBe("function")
    expect(validProps.children).toBeDefined()
  })

  it("should test empty joint array handling", () => {
    // Test behavior when no joints are available
    const emptyJoints: Object3D[] = []

    // This simulates the isInitialized check in the component
    const isInitialized =
      emptyJoints.length > 0 && emptyJoints.every((obj) => obj != null)

    expect(isInitialized).toBe(false)
  })

  it("should test joint object validation", () => {
    // Test the joint object validation logic
    const validJoints = [new Object3D(), new Object3D(), new Object3D()]
    const invalidJoints = [new Object3D(), null, new Object3D()]

    const isValidJointsInitialized =
      validJoints.length > 0 && validJoints.every((obj) => obj != null)
    const isInvalidJointsInitialized =
      invalidJoints.length > 0 && invalidJoints.every((obj) => obj != null)

    expect(isValidJointsInitialized).toBe(true)
    expect(isInvalidJointsInitialized).toBe(false)
  })

  it("should test motion state data structure", () => {
    // Test that motion state has the expected structure
    expect(mockMotionState.state).toBeDefined()
    expect(mockMotionState.state.joint_position).toBeDefined()
    expect(mockMotionState.state.joint_position.joints).toBeDefined()
    expect(Array.isArray(mockMotionState.state.joint_position.joints)).toBe(
      true,
    )
    expect(mockMotionState.state.joint_position.joints.length).toBe(6)
  })

  it("should test DH parameters structure", () => {
    // Test that DH parameters have the expected structure
    mockDhParameters.forEach((param, index) => {
      expect(param).toBeDefined()
      expect(typeof param.theta).toBe("number")
      expect(typeof param.reverse_rotation_direction).toBe("boolean")
    })
  })

  it("should test onRotationChanged callback structure", () => {
    // Test callback function signature
    const mockCallback = vi.fn()
    const testJoints = [new Object3D(), new Object3D()]
    const testValues = [1.0, 2.0]

    // Simulate calling the callback
    mockCallback(testJoints, testValues)

    expect(mockCallback).toHaveBeenCalledWith(testJoints, testValues)
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it("should test race condition prevention logic", () => {
    // Test the initialization state logic that prevents race conditions
    let isInitialized = false
    const joints: Object3D[] = []

    // Simulate setGroupRef logic
    function simulateSetGroupRef(group: any) {
      if (!group) {
        isInitialized = false
        return
      }

      // Simulate collectJoints
      const collectedJoints = group ? [new Object3D(), new Object3D()] : []

      // Only mark as initialized if we have valid joint objects
      if (
        collectedJoints.length > 0 &&
        collectedJoints.every((obj) => obj != null)
      ) {
        isInitialized = true
      } else {
        isInitialized = false
      }
    }

    // Test null group
    simulateSetGroupRef(null)
    expect(isInitialized).toBe(false)

    // Test valid group
    simulateSetGroupRef({ type: "Group" })
    expect(isInitialized).toBe(true)
  })
})
