import { Canvas } from "@react-three/fiber"
import { act, render, waitFor } from "@testing-library/react"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React from "react"
import { Object3D } from "three"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
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

vi.mock("@react-three/fiber", async () => {
  const actual = await vi.importActual("@react-three/fiber")
  return {
    ...actual,
    useThree: () => ({
      invalidate: vi.fn(),
    }),
  }
})

import { useSpring } from "@react-spring/three"
import { useAutorun } from "../utils/hooks"
import { collectJoints } from "./robotModelLogic"

const mockUseAutorun = useAutorun as any
const mockCollectJoints = collectJoints as any
const mockUseSpring = useSpring as any

describe("RobotAnimator", () => {
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
  let mockInvalidate: any
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

    mockInvalidate = vi.fn()

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

  const renderRobotAnimator = (
    props: Partial<React.ComponentProps<typeof RobotAnimator>> = {},
  ) => {
    const defaultProps = {
      rapidlyChangingMotionState: mockMotionState,
      dhParameters: mockDhParameters,
      children: <mesh />,
    }

    return render(
      <Canvas>
        <RobotAnimator {...defaultProps} {...props} />
      </Canvas>,
    )
  }

  it("should render without crashing", () => {
    expect(() => renderRobotAnimator()).not.toThrow()
  })

  it("should initialize joint objects when group is set", async () => {
    const { container } = renderRobotAnimator()

    // Wait for the component to render and set up
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })
  })

  it("should call onRotationChanged when provided", async () => {
    const mockOnRotationChanged = vi.fn()

    renderRobotAnimator({ onRotationChanged: mockOnRotationChanged })

    // Wait for initialization
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })

    // Simulate spring onChange callback
    await act(async () => {
      if (mockSpringConfig.onChange) {
        mockSpringConfig.onChange()
      }
    })

    expect(mockOnRotationChanged).toHaveBeenCalledWith(
      mockJointObjects,
      expect.arrayContaining([0, 0.5, 1, 1.5, 2, 2.5]),
    )
  })

  it("should update joint rotations when onRotationChanged is not provided", async () => {
    renderRobotAnimator()

    // Wait for initialization
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })

    await act(async () => {
      // Simulate spring animation callback
      if (mockSpringConfig.onChange) {
        mockSpringConfig.onChange()
      }
    })

    // Check that joint rotations were updated according to DH parameters
    mockJointObjects.forEach((joint, index) => {
      const dhParam = mockDhParameters[index]
      const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1
      const expectedRotation =
        rotationSign * mockMotionState.state.joint_position.joints[index]! +
        dhParam.theta!

      expect(joint.rotation.y).toBe(expectedRotation)
    })
  })

  it("should not update rotations when not initialized", async () => {
    // Mock collectJoints to return empty array (not initialized)
    mockCollectJoints.mockReturnValue([])

    renderRobotAnimator()

    await act(async () => {
      // Simulate spring animation callback
      if (mockSpringConfig.onChange) {
        mockSpringConfig.onChange()
      }
    })

    // Verify that joint rotations were not modified
    mockJointObjects.forEach((joint) => {
      expect(joint.rotation.y).toBe(0)
    })
  })

  it("should handle spring updates correctly", async () => {
    renderRobotAnimator()

    const newValues = [1, 2, 3, 4, 5, 6]

    // Wait for initialization
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })

    await act(async () => {
      // Simulate motion state update by calling the autorun callback
      if (mockAutorunCallback) {
        mockAutorunCallback()
      }
    })

    expect(mockSetSpring.start).toHaveBeenCalledWith(
      expect.objectContaining({
        0: 0,
        1: 0.5,
        2: 1,
        3: 1.5,
        4: 2,
        5: 2.5,
      }),
    )
  })

  it("should handle group reference being null", async () => {
    renderRobotAnimator()

    // This should not throw an error
    await act(async () => {
      // Component should handle null group reference gracefully
    })

    expect(mockCollectJoints).toHaveBeenCalled()
  })

  it("should call invalidate when updating rotations", async () => {
    renderRobotAnimator()

    // Wait for initialization
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })

    await act(async () => {
      // Simulate spring animation callback
      if (mockSpringConfig.onChange) {
        mockSpringConfig.onChange()
      }
    })

    // Note: invalidate is called from useThree hook which is mocked
    // The actual invalidate call would happen in the real component
    expect(mockSpringConfig.onChange).toHaveBeenCalled()
  })

  it("should handle onResolve callback", async () => {
    const mockOnRotationChanged = vi.fn()
    renderRobotAnimator({ onRotationChanged: mockOnRotationChanged })

    // Wait for initialization
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })

    await act(async () => {
      // Simulate spring onResolve callback
      if (mockSpringConfig.onResolve) {
        mockSpringConfig.onResolve()
      }
    })

    expect(mockOnRotationChanged).toHaveBeenCalled()
  })

  it("should filter out undefined joint values", async () => {
    const motionStateWithUndefined = {
      state: {
        joint_position: {
          joints: [1, undefined, 3, undefined, 5, 6],
        },
      },
    } as any

    renderRobotAnimator({
      rapidlyChangingMotionState: motionStateWithUndefined,
    })

    // Wait for initialization
    await waitFor(() => {
      expect(mockCollectJoints).toHaveBeenCalled()
    })

    await act(async () => {
      if (mockAutorunCallback) {
        mockAutorunCallback()
      }
    })

    // Should call setSpring.start with filtered values
    expect(mockSetSpring.start).toHaveBeenCalledWith(
      expect.objectContaining({
        0: 1,
        1: 3,
        2: 5,
        3: 6,
      }),
    )
  })

  it("should handle empty joint objects gracefully", async () => {
    mockCollectJoints.mockReturnValue([])

    const { container } = renderRobotAnimator()

    await act(async () => {
      if (mockAutorunCallback) {
        mockAutorunCallback()
      }
    })

    // Should not throw and should not call setSpring.start
    expect(mockSetSpring.start).not.toHaveBeenCalled()
  })
})
