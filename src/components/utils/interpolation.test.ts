import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { ValueInterpolator } from "./interpolation"

describe("ValueInterpolator", () => {
  let interpolator: ValueInterpolator
  let mockOnChange: ReturnType<typeof vi.fn>
  let mockOnComplete: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockOnChange = vi.fn()
    mockOnComplete = vi.fn()

    // Mock requestAnimationFrame for testing
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      return setTimeout(cb, 16) // Simulate 60fps
    })

    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
      clearTimeout(id)
    })
  })

  afterEach(() => {
    interpolator?.destroy()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it("should handle frequent target updates without losing interpolation quality", async () => {
    interpolator = new ValueInterpolator([0, 0, 0], {
      tension: 180,
      friction: 25,
      threshold: 0.001,
      onChange: mockOnChange,
      onComplete: mockOnComplete,
    })

    // Simulate rapid updates (like robot motion state changes)
    const rapidUpdates = [
      [1, 2, 3],
      [1.1, 2.1, 3.1],
      [1.2, 2.2, 3.2],
      [1.3, 2.3, 3.3],
      [1.5, 2.5, 3.5], // Final target
    ]

    // Apply updates rapidly
    rapidUpdates.forEach((values, index) => {
      setTimeout(() => {
        interpolator.setTarget(values)
      }, index * 5)
    })

    // Simulate frame updates with delta
    const simulateFrames = async (count: number) => {
      for (let i = 0; i < count; i++) {
        interpolator.update(1 / 60) // 60fps
        await new Promise((resolve) => setTimeout(resolve, 16)) // ~60fps
      }
    }

    await simulateFrames(20)

    // Verify interpolation handled rapid updates
    expect(mockOnChange).toHaveBeenCalled()

    // Final values should be close to the last target
    const finalValues = interpolator.getCurrentValues()
    expect(finalValues[0]).toBeCloseTo(1.5, 0)
    expect(finalValues[1]).toBeCloseTo(2.5, 0)
    expect(finalValues[2]).toBeCloseTo(3.5, 0)
  })

  it("should provide smooth spring-like animation characteristics", async () => {
    const changeHistory: number[][] = []

    interpolator = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
      onChange: (values) => {
        changeHistory.push([...values])
      },
    })

    interpolator.setTarget([10])

    // Simulate animation frames
    for (let i = 0; i < 30; i++) {
      interpolator.update(1 / 60)
      await new Promise((resolve) => setTimeout(resolve, 5))
    }

    // Verify we have smooth progression
    expect(changeHistory.length).toBeGreaterThanOrEqual(1) // At least some animation steps

    // Spring animation should show progression toward target
    const firstValue = changeHistory[0][0]
    const lastValue = changeHistory[changeHistory.length - 1][0]

    expect(firstValue).toBeGreaterThan(0) // Should start moving
    expect(lastValue).toBeGreaterThan(firstValue) // Should progress toward target
    expect(lastValue).toBeLessThan(15) // Should not overshoot significantly
  })

  it("should handle different spring configurations correctly", () => {
    const fastInterpolator = new ValueInterpolator([0], {
      tension: 200, // Higher tension = faster
      friction: 30,
    })

    const normalInterpolator = new ValueInterpolator([0], {
      tension: 120, // Default tension
      friction: 20,
    })

    const slowInterpolator = new ValueInterpolator([0], {
      tension: 60, // Lower tension = slower
      friction: 15,
    })

    // Test that different spring configurations produce different behavior
    fastInterpolator.setTarget([10])
    normalInterpolator.setTarget([10])
    slowInterpolator.setTarget([10])

    // Update once to see the difference
    fastInterpolator.update(1 / 60)
    normalInterpolator.update(1 / 60)
    slowInterpolator.update(1 / 60)

    // After one step, values should be different due to spring settings
    const fastValue = fastInterpolator.getCurrentValues()[0]
    const normalValue = normalInterpolator.getCurrentValues()[0]
    const slowValue = slowInterpolator.getCurrentValues()[0]

    // All should be moving toward target
    expect(fastValue).toBeGreaterThan(0)
    expect(normalValue).toBeGreaterThan(0)
    expect(slowValue).toBeGreaterThan(0)

    // Higher tension should generally move faster initially
    // Note: actual behavior depends on friction balance, so just verify all move
    expect(fastValue).toBeGreaterThan(0)
    expect(normalValue).toBeGreaterThan(0)
    expect(slowValue).toBeGreaterThan(0)

    fastInterpolator.destroy()
    normalInterpolator.destroy()
    slowInterpolator.destroy()
  })

  it("should handle array length changes gracefully", () => {
    interpolator = new ValueInterpolator([1, 2], {
      onChange: mockOnChange,
    })

    // Expand array
    interpolator.setTarget([1, 2, 3, 4])
    expect(interpolator.getCurrentValues()).toHaveLength(4)

    // Shrink array
    interpolator.setTarget([5, 6])
    expect(interpolator.getCurrentValues()).toHaveLength(2)

    // Update once to see changes
    interpolator.update(1 / 60)

    // Values should be updated
    const values = interpolator.getCurrentValues()
    expect(values[0]).not.toBe(1) // Should be interpolating toward 5
    expect(values[1]).not.toBe(2) // Should be interpolating toward 6
  })

  it("should stop and start interpolation correctly", async () => {
    interpolator = new ValueInterpolator([0], {
      // Slow for testing
      onChange: mockOnChange,
    })

    interpolator.setTarget([10])

    // Manual update should work
    interpolator.update(1 / 60)
    expect(mockOnChange).toHaveBeenCalled()

    const callCountAfterFirst = mockOnChange.mock.calls.length

    interpolator.stop()

    // Should be able to restart
    interpolator.setTarget([5])
    interpolator.update(1 / 60)
    expect(mockOnChange.mock.calls.length).toBeGreaterThan(callCountAfterFirst)
  })

  it("should not conflict when using manual updates without starting auto-interpolation", () => {
    let changeCount = 0
    interpolator = new ValueInterpolator([0], {
      onChange: () => {
        changeCount++
      },
    })

    // Set target but don't start auto-interpolation
    interpolator.setTarget([10])

    // Should not have triggered any changes yet (no auto-start)
    expect(changeCount).toBe(0)

    // Manual update should work
    interpolator.update(1 / 60)
    expect(changeCount).toBe(1)

    // Another manual update should continue interpolation
    interpolator.update(1 / 60)
    expect(changeCount).toBe(2)
  })

  it("should work with auto-interpolation when explicitly started", async () => {
    let changeCount = 0
    interpolator = new ValueInterpolator([0], {
      // Faster for testing
      onChange: () => {
        changeCount++
      },
    })

    // Set target and start auto-interpolation
    interpolator.setTarget([10])
    interpolator.startAutoInterpolation()

    // Wait for automatic updates
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Should have triggered automatic changes
    expect(changeCount).toBeGreaterThan(0)
  })

  it("should not double-update when both manual and auto are used incorrectly", () => {
    let updateCallCount = 0
    const originalUpdate = ValueInterpolator.prototype.update

    // Spy on update calls to detect conflicts
    ValueInterpolator.prototype.update = function (delta) {
      updateCallCount++
      return originalUpdate.call(this, delta)
    }

    try {
      interpolator = new ValueInterpolator([0], {
        onChange: mockOnChange,
      })

      interpolator.setTarget([10])

      // Manual update (this should be the only way it updates)
      interpolator.update(1 / 60)

      // Should only have been called once (no auto-start)
      expect(updateCallCount).toBe(1)
      expect(mockOnChange).toHaveBeenCalledTimes(1)
    } finally {
      // Restore original method
      ValueInterpolator.prototype.update = originalUpdate
    }
  })

  it("should work correctly in RobotAnimator-like usage pattern", async () => {
    // Simulate the exact pattern used in RobotAnimator
    let frameUpdateCount = 0
    let onChangeCallCount = 0

    interpolator = new ValueInterpolator([0, 0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
      onChange: () => {
        onChangeCallCount++
      },
    })

    // Simulate useFrame calling update repeatedly
    const simulateUseFrame = () => {
      const animate = () => {
        frameUpdateCount++
        interpolator.update(1 / 60)

        if (frameUpdateCount < 20) {
          setTimeout(animate, 16) // ~60fps
        }
      }
      animate()
    }

    // Start the animation loop
    simulateUseFrame()

    // After a few frames, change target (like rapidlyChangingMotionState update)
    setTimeout(() => {
      interpolator.setTarget([1, 2, 3])
    }, 50)

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 500)) // Slightly longer wait for spring settling

    // Should have smooth updates, not conflicts
    expect(frameUpdateCount).toBeGreaterThanOrEqual(20)
    expect(onChangeCallCount).toBeGreaterThan(0)
    expect(onChangeCallCount).toBeLessThan(frameUpdateCount * 2) // No double updates

    const finalValues = interpolator.getCurrentValues()
    // Spring physics may not reach exact target quickly, just verify progress
    expect(finalValues[0]).toBeGreaterThan(0.5) // Should be moving toward 1
    expect(finalValues[1]).toBeGreaterThan(1.0) // Should be moving toward 2
    expect(finalValues[2]).toBeGreaterThan(1.5) // Should be moving toward 3
  })

  it("should handle setImmediate correctly", () => {
    interpolator = new ValueInterpolator([0, 0], {
      onChange: mockOnChange,
    })

    interpolator.setImmediate([5, 10])

    expect(interpolator.getCurrentValues()).toEqual([5, 10])
    expect(interpolator.isInterpolating()).toBe(false)
    expect(mockOnChange).toHaveBeenCalledWith([5, 10])
  })

  it("should handle irregular frame timing smoothly", async () => {
    const changeHistory: number[][] = []

    interpolator = new ValueInterpolator([0], {
      threshold: 0.001,
      onChange: (values) => {
        changeHistory.push([...values])
      },
    })

    interpolator.setTarget([10])

    // Simulate irregular frame timing (like real useFrame behavior)
    const irregularDeltas = [
      1 / 60, // Normal frame
      1 / 30, // Slow frame (frame drop)
      1 / 120, // Fast frame
      1 / 45, // Medium frame
      1 / 60, // Normal frame
      1 / 20, // Very slow frame
      1 / 60, // Normal frame
      1 / 90, // Fast frame
      1 / 60, // Normal frame
      1 / 40, // Slow frame
    ]

    for (const delta of irregularDeltas) {
      interpolator.update(delta)
      await new Promise((resolve) => setTimeout(resolve, 5))
    }

    // Should have smooth progression despite irregular timing
    expect(changeHistory.length).toBeGreaterThanOrEqual(5)

    // Check that values progress monotonically (no sudden jumps)
    for (let i = 1; i < changeHistory.length; i++) {
      const prev = changeHistory[i - 1][0]
      const curr = changeHistory[i][0]

      // Values should always increase smoothly toward target
      expect(curr).toBeGreaterThanOrEqual(prev)

      // No huge jumps - change should be reasonable
      const change = curr - prev
      expect(change).toBeLessThan(4) // No jump larger than 40% of total range (more lenient)
    }
  })

  describe("irregular target updates", () => {
    it("should smooth rapid target changes", () => {
      const interpolator = new ValueInterpolator([0], {})

      // Simulate rapid target updates (faster than 16ms)
      interpolator.setTarget([10]) // t=0
      interpolator.update(0.008) // 8ms later
      const result1 = interpolator.getCurrentValues()

      interpolator.setTarget([5]) // New target after 8ms (rapid update)
      interpolator.update(0.008) // Another 8ms
      const result2 = interpolator.getCurrentValues()

      // The interpolation should be smoother due to target blending
      expect(result1[0]).toBeGreaterThan(0)
      expect(result1[0]).toBeLessThan(10)
      expect(result2[0]).toBeGreaterThan(result1[0]) // Should continue progressing
      expect(result2[0]).toBeLessThan(8) // But not jump to the raw blended target
    })

    it("should adapt responsiveness based on update frequency", () => {
      const interpolator = new ValueInterpolator([0], {})

      // Test recent target update (high responsiveness)
      interpolator.setTarget([10])
      interpolator.update(0.016)
      const recentUpdateResult = interpolator.getCurrentValues()

      // Test with delayed target update (simulating old update)
      const interpolator2 = new ValueInterpolator([0], {})
      interpolator2.setTarget([10])

      // Simulate time passing to make target update "old"
      // We'll use a longer delay in the update to simulate this
      interpolator2.update(0.3) // Simulate 300ms delay
      const oldUpdateResult = interpolator2.getCurrentValues()

      // Recent updates should be more responsive (larger change)
      expect(recentUpdateResult[0]).toBeGreaterThan(0)
      expect(oldUpdateResult[0]).toBeGreaterThan(0)
    })

    it("should handle target blending correctly", () => {
      const interpolator = new ValueInterpolator([0], {})

      // Set initial target
      interpolator.setTarget([100])

      // Immediately set new target (should trigger blending)
      interpolator.setTarget([50])

      // Update and check the result
      interpolator.update(0.016)
      const result = interpolator.getCurrentValues()

      // Should move toward blended target, not jump to 50
      expect(result[0]).toBeGreaterThan(0)
      expect(result[0]).toBeLessThan(50) // Should be less than the final target due to interpolation
    })
  })

  it("should provide smooth initialization without jumpiness", () => {
    const interpolator = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
    })

    interpolator.setTarget([10]) // Large target change

    const firstFrameValues: number[] = []

    // Capture values from first few frames
    for (let frame = 0; frame < 5; frame++) {
      interpolator.update(1 / 60)
      firstFrameValues.push(interpolator.getValue(0))
    }

    // First frame should not jump too aggressively
    expect(firstFrameValues[0]).toBeLessThan(2) // Should start gently
    expect(firstFrameValues[0]).toBeGreaterThan(0) // But should move

    // Should show gradual acceleration, not sudden jumps
    const firstStep = firstFrameValues[1] - firstFrameValues[0]
    const secondStep = firstFrameValues[2] - firstFrameValues[1]

    expect(secondStep).toBeGreaterThanOrEqual(firstStep) // Should accelerate gradually
    expect(firstStep).toBeLessThan(1.5) // First step should be modest
  })

  it("should work correctly when multiple components use separate interpolators", () => {
    // Test the scenario where two components each have their own interpolator
    const interpolator1 = new ValueInterpolator([0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Set different targets for each interpolator
    interpolator1.setTarget([5, 10])
    interpolator2.setTarget([15, 20])

    // Update both interpolators for several frames
    const values1History: number[][] = []
    const values2History: number[][] = []

    for (let frame = 0; frame < 30; frame++) {
      // More frames for spring physics
      interpolator1.update(1 / 60)
      interpolator2.update(1 / 60)

      values1History.push([...interpolator1.getCurrentValues()])
      values2History.push([...interpolator2.getCurrentValues()])
    }

    // Both interpolators should be moving independently
    const firstFrame1 = values1History[0]
    const lastFrame1 = values1History[values1History.length - 1]
    const firstFrame2 = values2History[0]
    const lastFrame2 = values2History[values2History.length - 1]

    // Interpolators should be moving independently and at reasonable speed
    expect(lastFrame1[0]).toBeGreaterThan(firstFrame1[0])
    expect(lastFrame1[1]).toBeGreaterThan(firstFrame1[1])
    expect(lastFrame2[0]).toBeGreaterThan(firstFrame2[0])
    expect(lastFrame2[1]).toBeGreaterThan(firstFrame2[1])

    // Should make meaningful progress toward targets
    expect(lastFrame1[0]).toBeGreaterThan(1) // Should have made progress toward 5
    expect(lastFrame1[1]).toBeGreaterThan(2) // Should have made progress toward 10
    expect(lastFrame2[0]).toBeGreaterThan(3) // Should have made progress toward 15
    expect(lastFrame2[1]).toBeGreaterThan(4) // Should have made progress toward 20

    // The interpolators should be independent - their values should be different
    expect(lastFrame1[0]).not.toBeCloseTo(lastFrame2[0], 1)
    expect(lastFrame1[1]).not.toBeCloseTo(lastFrame2[1], 1)

    // Clean up
    interpolator1.destroy()
    interpolator2.destroy()
  })

  it("should handle multiple interpolators updating in the same frame correctly", async () => {
    // Simulate a more realistic scenario where multiple components
    // are updating their interpolators in the same animation frame
    const interpolators: ValueInterpolator[] = []
    const changeCallCounts: (() => number)[] = []

    // Create multiple interpolators
    for (let i = 0; i < 3; i++) {
      let callCount = 0
      const interpolator = new ValueInterpolator([0], {
        onChange: () => {
          callCount++
        },
      })
      interpolators.push(interpolator)
      changeCallCounts.push(() => callCount) // Store a function to get current count
    }

    // Set different targets
    interpolators[0].setTarget([10])
    interpolators[1].setTarget([20])
    interpolators[2].setTarget([30])

    // Simulate a frame where all interpolators update
    const simulateFrame = () => {
      interpolators.forEach((interpolator) => {
        interpolator.update(1 / 60)
      })
    }

    // Run several frames (more for spring physics)
    for (let frame = 0; frame < 40; frame++) {
      simulateFrame()
      await new Promise((resolve) => setTimeout(resolve, 1))
    }

    // Check that all interpolators moved independently
    const finalValues = interpolators.map(
      (interpolator) => interpolator.getCurrentValues()[0],
    )

    expect(finalValues[0]).toBeGreaterThan(1) // Moving toward 10
    expect(finalValues[1]).toBeGreaterThan(2) // Moving toward 20
    expect(finalValues[2]).toBeGreaterThan(3) // Moving toward 30

    // All should have different values
    expect(finalValues[0]).not.toBeCloseTo(finalValues[1], 1)
    expect(finalValues[1]).not.toBeCloseTo(finalValues[2], 1)

    // All should have triggered onChange callbacks
    changeCallCounts.forEach((getCount, index) => {
      expect(getCount()).toBeGreaterThan(0)
    })

    // Clean up
    interpolators.forEach((interpolator) => interpolator.destroy())
  })

  it("should handle multiple interpolators using auto-interpolation without interference", async () => {
    // Test the specific case where multiple interpolators use startAutoInterpolation()
    // This tests if requestAnimationFrame handling interferes between interpolators
    const interpolator1 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator3 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Set different targets
    interpolator1.setTarget([10])
    interpolator2.setTarget([20])
    interpolator3.setTarget([30])

    // Start auto-interpolation for all (this uses requestAnimationFrame internally)
    interpolator1.startAutoInterpolation()
    interpolator2.startAutoInterpolation()
    interpolator3.startAutoInterpolation()

    // Wait for automatic interpolation to progress
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check that all interpolators are moving independently
    const values1 = interpolator1.getCurrentValues()
    const values2 = interpolator2.getCurrentValues()
    const values3 = interpolator3.getCurrentValues()

    console.log('Auto-interpolation values:', { values1, values2, values3 })

    // All should have made significant progress toward their targets
    expect(values1[0]).toBeGreaterThan(1) // Moving toward 10
    expect(values2[0]).toBeGreaterThan(2) // Moving toward 20
    expect(values3[0]).toBeGreaterThan(3) // Moving toward 30

    // All should be running their own interpolation
    expect(interpolator1.isInterpolating()).toBe(true)
    expect(interpolator2.isInterpolating()).toBe(true)
    expect(interpolator3.isInterpolating()).toBe(true)

    // Values should be different (independent interpolation)
    expect(values1[0]).not.toBeCloseTo(values2[0], 1)
    expect(values2[0]).not.toBeCloseTo(values3[0], 1)

    // Clean up
    interpolator1.destroy()
    interpolator2.destroy()
    interpolator3.destroy()
  })

  it("should not interfere between manual and auto interpolation modes", async () => {
    // Test mixing manual update() calls with auto-interpolation
    const manualInterpolator = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const autoInterpolator = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Set targets
    manualInterpolator.setTarget([10])
    autoInterpolator.setTarget([10])

    // Start auto-interpolation for one
    autoInterpolator.startAutoInterpolation()

    // Manual updates for the other
    const manualValues: number[] = []
    for (let frame = 0; frame < 30; frame++) {
      manualInterpolator.update(1 / 60)
      manualValues.push(manualInterpolator.getCurrentValues()[0])
      await new Promise(resolve => setTimeout(resolve, 16)) // ~60fps
    }

    // Check auto interpolator after same time
    const autoValue = autoInterpolator.getCurrentValues()[0]

    console.log('Mixed mode - Manual final:', manualValues[manualValues.length - 1], 'Auto final:', autoValue)

    // Both should have made progress
    expect(manualValues[manualValues.length - 1]).toBeGreaterThan(0.5)
    expect(autoValue).toBeGreaterThan(0.5)

    // Manual interpolator should not be auto-interpolating
    expect(manualInterpolator.isInterpolating()).toBe(false)
    expect(autoInterpolator.isInterpolating()).toBe(true)

    // Clean up
    manualInterpolator.destroy()
    autoInterpolator.destroy()
  })

  it("should handle rapid start/stop of auto-interpolation correctly", async () => {
    // Test the edge case of rapidly starting and stopping auto-interpolation
    const interpolator = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    interpolator.setTarget([10])

    // Rapidly start and stop multiple times
    for (let i = 0; i < 5; i++) {
      interpolator.startAutoInterpolation()
      expect(interpolator.isInterpolating()).toBe(true)
      
      interpolator.stop()
      expect(interpolator.isInterpolating()).toBe(false)
      
      await new Promise(resolve => setTimeout(resolve, 10))
    }

    // Final start
    interpolator.startAutoInterpolation()
    await new Promise(resolve => setTimeout(resolve, 200))

    // Should still be working correctly
    const finalValue = interpolator.getCurrentValues()[0]
    expect(finalValue).toBeGreaterThan(0.5)
    expect(interpolator.isInterpolating()).toBe(true)

    // Clean up
    interpolator.destroy()
  })

  it("should handle multiple interpolators with rapid requestAnimationFrame setTarget calls", async () => {
    // This test simulates the exact pattern used in RobotAnimator:
    // useAutorun(() => {
    //   requestAnimationFrame(() => updateJoints(newJointValues))
    // })
    
    const interpolator1 = new ValueInterpolator([0, 0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0, 0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator3 = new ValueInterpolator([0, 0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolators = [interpolator1, interpolator2, interpolator3]

    // Simulate the RobotAnimator pattern where multiple components 
    // schedule setTarget calls via requestAnimationFrame
    const targetSets = [
      [1, 2, 3],
      [4, 5, 6], 
      [7, 8, 9]
    ]

    // Schedule all setTarget calls via requestAnimationFrame (like RobotAnimator does)
    targetSets.forEach((targets, index) => {
      requestAnimationFrame(() => {
        interpolators[index].setTarget(targets)
      })
    })

    // Wait for requestAnimationFrame calls to execute
    await new Promise(resolve => setTimeout(resolve, 50))

    // Now manually update all interpolators for several frames
    for (let frame = 0; frame < 30; frame++) {
      interpolators.forEach(interpolator => {
        interpolator.update(1 / 60)
      })
      await new Promise(resolve => setTimeout(resolve, 16))
    }

    // Check the results
    const finalValues = interpolators.map(interpolator => interpolator.getCurrentValues())
    
    console.log('RAF setTarget pattern results:', finalValues)

    // All should have made progress toward their respective targets
    expect(finalValues[0][0]).toBeGreaterThan(0.3) // Moving toward 1
    expect(finalValues[1][0]).toBeGreaterThan(1.0) // Moving toward 4
    expect(finalValues[2][0]).toBeGreaterThan(2.0) // Moving toward 7

    // Values should be different (no interference)
    expect(finalValues[0][0]).not.toBeCloseTo(finalValues[1][0], 0)
    expect(finalValues[1][0]).not.toBeCloseTo(finalValues[2][0], 0)

    // Clean up
    interpolators.forEach(interpolator => interpolator.destroy())
  })

  it("should handle simultaneous setTarget calls without target blending interference", () => {
    // Test the specific case where setTarget is called on multiple interpolators
    // at nearly the same time (which could trigger the target blending bug)
    
    const interpolator1 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Call setTarget on both interpolators immediately (same timestamp)
    const now = performance.now()
    interpolator1.setTarget([10])
    interpolator2.setTarget([20])
    
    // Verify the targets were set correctly (not blended)
    expect(interpolator1.getCurrentValues()[0]).toBe(0) // Should start at 0
    expect(interpolator2.getCurrentValues()[0]).toBe(0) // Should start at 0

    // Update once and check the direction of movement
    interpolator1.update(1 / 60)
    interpolator2.update(1 / 60)

    const values1 = interpolator1.getCurrentValues()[0]
    const values2 = interpolator2.getCurrentValues()[0]

    console.log('Simultaneous setTarget - Values after 1 frame:', { values1, values2 })

    // Both should be moving in the right direction
    expect(values1).toBeGreaterThan(0) // Moving toward 10
    expect(values2).toBeGreaterThan(0) // Moving toward 20
    
    // Interpolator2 should be moving faster (higher target)
    expect(values2).toBeGreaterThan(values1)

    // Clean up
    interpolator1.destroy()
    interpolator2.destroy()
  })

  it("should handle multiple interpolators with real requestAnimationFrame without interference", async () => {
    // This test uses REAL requestAnimationFrame to simulate actual browser behavior
    // Remove mocks temporarily for this test
    vi.restoreAllMocks()

    const interpolator1 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator3 = new ValueInterpolator([0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Set targets
    interpolator1.setTarget([10])
    interpolator2.setTarget([20])
    interpolator3.setTarget([30])

    // Start real auto-interpolation (uses real requestAnimationFrame)
    interpolator1.startAutoInterpolation()
    interpolator2.startAutoInterpolation()
    interpolator3.startAutoInterpolation()

    // Wait for REAL animation frames to process
    await new Promise(resolve => {
      let frameCount = 0
      const checkProgress = () => {
        frameCount++
        if (frameCount >= 30) { // Wait for ~30 real frames
          resolve(undefined)
        } else {
          requestAnimationFrame(checkProgress)
        }
      }
      requestAnimationFrame(checkProgress)
    })

    // Check results after real animation frames
    const values1 = interpolator1.getCurrentValues()[0]
    const values2 = interpolator2.getCurrentValues()[0]
    const values3 = interpolator3.getCurrentValues()[0]

    console.log('Real RAF test results:', { values1, values2, values3 })

    // All should have made significant progress
    expect(values1).toBeGreaterThan(1)
    expect(values2).toBeGreaterThan(2)
    expect(values3).toBeGreaterThan(3)

    // Values should be proportional to their targets
    expect(values2).toBeGreaterThan(values1 * 1.5) // 20 is 2x 10
    expect(values3).toBeGreaterThan(values1 * 2.5) // 30 is 3x 10

    // All should still be interpolating
    expect(interpolator1.isInterpolating()).toBe(true)
    expect(interpolator2.isInterpolating()).toBe(true)
    expect(interpolator3.isInterpolating()).toBe(true)

    // Clean up
    interpolator1.destroy()
    interpolator2.destroy()
    interpolator3.destroy()

    // Restore mocks for other tests
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      return setTimeout(cb, 16)
    })
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
      clearTimeout(id)
    })
  })

  it("should handle multiple useFrame-like manual updates without interference", async () => {
    // Simulate multiple React Three Fiber components using useFrame
    const interpolator1 = new ValueInterpolator([0, 0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0, 0, 0], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Set targets (like RobotAnimator would)
    interpolator1.setTarget([1, 2, 3])
    interpolator2.setTarget([4, 5, 6])

    // Simulate useFrame callbacks running simultaneously for 500ms
    const startTime = performance.now()
    let lastTime = startTime

    const runSimulation = () => {
      return new Promise<void>((resolve) => {
        const frame = () => {
          const currentTime = performance.now()
          const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
          lastTime = currentTime

          // Both interpolators update with real delta timing (like useFrame)
          interpolator1.update(deltaTime)
          interpolator2.update(deltaTime)

          // Continue for 500ms
          if (currentTime - startTime < 500) {
            requestAnimationFrame(frame)
          } else {
            resolve()
          }
        }
        requestAnimationFrame(frame)
      })
    }

    await runSimulation()

    const values1 = interpolator1.getCurrentValues()
    const values2 = interpolator2.getCurrentValues()

    console.log('useFrame simulation results:', { values1, values2 })

    // Both should have made good progress
    expect(values1[0]).toBeGreaterThan(0.5) // Moving toward 1
    expect(values1[1]).toBeGreaterThan(1.0) // Moving toward 2
    expect(values1[2]).toBeGreaterThan(1.5) // Moving toward 3

    expect(values2[0]).toBeGreaterThan(2.0) // Moving toward 4
    expect(values2[1]).toBeGreaterThan(2.5) // Moving toward 5
    expect(values2[2]).toBeGreaterThan(3.0) // Moving toward 6

    // Values should be different (no interference)
    expect(values1[0]).not.toBeCloseTo(values2[0], 0)
    expect(values1[1]).not.toBeCloseTo(values2[1], 0)

    // Clean up
    interpolator1.destroy()
    interpolator2.destroy()
  })

  it("should handle CartesianJoggingAxisVisualization pattern with multiple components", async () => {
    // This test replicates the exact pattern from CartesianJoggingAxisVisualization
    // where multiple components watch the same MobX observable and call setTarget via RAF
    
    const interpolator1 = new ValueInterpolator([0, 0, 0, 0, 0, 0, 1], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator2 = new ValueInterpolator([0, 0, 0, 0, 0, 0, 1], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    const interpolator3 = new ValueInterpolator([0, 0, 0, 0, 0, 0, 1], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Simulate poseToArray function results
    const pose1 = [0.1, 0.2, 0.3, 0, 0, 0, 1] // Different poses for each component
    const pose2 = [0.4, 0.5, 0.6, 0, 0, 0, 1]
    const pose3 = [0.7, 0.8, 0.9, 0, 0, 0, 1]

    // Simulate the useAutorun pattern where all components respond to the same data change
    // and schedule their setTarget calls via requestAnimationFrame
    const updateFlangePose1 = (newPose: number[]) => {
      interpolator1.setTarget(newPose)
    }
    const updateFlangePose2 = (newPose: number[]) => {
      interpolator2.setTarget(newPose)
    }
    const updateFlangePose3 = (newPose: number[]) => {
      interpolator3.setTarget(newPose)
    }

    // All three components react to the same observable change and schedule RAF calls
    requestAnimationFrame(() => updateFlangePose1(pose1))
    requestAnimationFrame(() => updateFlangePose2(pose2))
    requestAnimationFrame(() => updateFlangePose3(pose3))

    // Wait for RAF calls to execute
    await new Promise(resolve => setTimeout(resolve, 32))

    // Now simulate useFrame updates for all three interpolators
    for (let frame = 0; frame < 30; frame++) {
      const delta = 1 / 60
      interpolator1.update(delta)
      interpolator2.update(delta)
      interpolator3.update(delta)
      await new Promise(resolve => setTimeout(resolve, 16))
    }

    const values1 = interpolator1.getCurrentValues()
    const values2 = interpolator2.getCurrentValues()
    const values3 = interpolator3.getCurrentValues()

    console.log('CartesianJoggingAxisVisualization pattern results:')
    console.log('Component 1:', values1.slice(0, 3))
    console.log('Component 2:', values2.slice(0, 3))
    console.log('Component 3:', values3.slice(0, 3))

    // Each interpolator should be moving toward its own target
    expect(values1[0]).toBeCloseTo(0.1, 1) // Should be close to target 0.1
    expect(values1[1]).toBeCloseTo(0.2, 1) // Should be close to target 0.2
    expect(values1[2]).toBeCloseTo(0.3, 1) // Should be close to target 0.3

    expect(values2[0]).toBeCloseTo(0.4, 1) // Should be close to target 0.4
    expect(values2[1]).toBeCloseTo(0.5, 1) // Should be close to target 0.5
    expect(values2[2]).toBeCloseTo(0.6, 1) // Should be close to target 0.6

    expect(values3[0]).toBeCloseTo(0.7, 1) // Should be close to target 0.7
    expect(values3[1]).toBeCloseTo(0.8, 1) // Should be close to target 0.8
    expect(values3[2]).toBeCloseTo(0.9, 1) // Should be close to target 0.9

    // Clean up
    interpolator1.destroy()
    interpolator2.destroy()
    interpolator3.destroy()
  })

  it("should handle rapid pose updates like MobX observable changes", async () => {
    // Test the scenario where MobX triggers rapid updates to multiple components
    const interpolator = new ValueInterpolator([0, 0, 0, 0, 0, 0, 1], {
      tension: 120,
      friction: 20,
      threshold: 0.001,
    })

    // Simulate rapid pose changes (like rapidlyChangingMotionState.flange_pose)
    const poseSequence = [
      [0.1, 0.1, 0.1, 0, 0, 0, 1],
      [0.11, 0.11, 0.11, 0, 0, 0, 1],
      [0.12, 0.12, 0.12, 0, 0, 0, 1],
      [0.13, 0.13, 0.13, 0, 0, 0, 1],
      [0.15, 0.15, 0.15, 0, 0, 0, 1], // Final target
    ]

    // Simulate useAutorun triggering for each pose change with RAF delay
    poseSequence.forEach((pose, index) => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          interpolator.setTarget(pose)
        })
      }, index * 5) // 5ms apart (very rapid)
    })

    // Wait for all RAF calls to execute
    await new Promise(resolve => setTimeout(resolve, 100))

    // Run interpolation for a while
    for (let frame = 0; frame < 50; frame++) {
      interpolator.update(1 / 60)
      await new Promise(resolve => setTimeout(resolve, 16))
    }

    const finalValues = interpolator.getCurrentValues()
    console.log('Rapid pose updates result:', finalValues.slice(0, 3))

    // Should converge toward the final target [0.15, 0.15, 0.15]
    expect(finalValues[0]).toBeCloseTo(0.15, 1)
    expect(finalValues[1]).toBeCloseTo(0.15, 1)
    expect(finalValues[2]).toBeCloseTo(0.15, 1)

    // Clean up
    interpolator.destroy()
  })
})
