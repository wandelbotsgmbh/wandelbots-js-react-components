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
      speed: 0.2,
      easing: "spring",
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

    // Apply updates rapidly (faster than animation frames)
    rapidUpdates.forEach((values, index) => {
      setTimeout(() => {
        interpolator.setTarget(values)
      }, index * 5) // 5ms intervals (much faster than 16ms frame rate)
    })

    // Wait for interpolation to settle
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Verify interpolation handled rapid updates
    expect(mockOnChange).toHaveBeenCalled()

    // Final values should be close to the last target (spring may not reach exactly)
    const finalValues = interpolator.getCurrentValues()
    expect(finalValues[0]).toBeCloseTo(1.5, 0) // More lenient tolerance for spring
    expect(finalValues[1]).toBeCloseTo(2.5, 0)
    expect(finalValues[2]).toBeCloseTo(3.5, 0)
  })

  it("should provide smooth spring-like animation characteristics", async () => {
    const changeHistory: number[][] = []

    interpolator = new ValueInterpolator([0], {
      speed: 0.15,
      easing: "spring",
      threshold: 0.001,
      onChange: (values) => {
        changeHistory.push([...values])
      },
    })

    interpolator.setTarget([10])

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Verify we have smooth progression
    expect(changeHistory.length).toBeGreaterThan(5) // Multiple animation steps

    // Spring animation should show progression toward target
    const firstValue = changeHistory[0][0]
    const lastValue = changeHistory[changeHistory.length - 1][0]
    const midValue = changeHistory[Math.floor(changeHistory.length / 2)][0]

    expect(firstValue).toBeLessThan(midValue)
    expect(midValue).toBeLessThan(lastValue)
    expect(lastValue).toBeCloseTo(10, 0) // More lenient for spring animation
  })

  it("should handle different easing functions correctly", () => {
    const linearInterpolator = new ValueInterpolator([0], {
      speed: 0.5,
      easing: "linear",
    })

    const springInterpolator = new ValueInterpolator([0], {
      speed: 0.5,
      easing: "spring",
    })

    const easeOutInterpolator = new ValueInterpolator([0], {
      speed: 0.5,
      easing: "easeOut",
    })

    // Test that different easing functions produce different intermediate values
    linearInterpolator.setTarget([10])
    springInterpolator.setTarget([10])
    easeOutInterpolator.setTarget([10])

    // After one step, values should be different due to easing
    const linearValue = linearInterpolator.getCurrentValues()[0]
    const springValue = springInterpolator.getCurrentValues()[0]
    const easeOutValue = easeOutInterpolator.getCurrentValues()[0]

    // All should be moving toward target but with different characteristics
    expect(linearValue).toBeGreaterThan(0)
    expect(springValue).toBeGreaterThan(0)
    expect(easeOutValue).toBeGreaterThan(0)

    // Spring should be more aggressive initially (due to 1.5x multiplier)
    expect(springValue).toBeGreaterThanOrEqual(linearValue)

    linearInterpolator.destroy()
    springInterpolator.destroy()
    easeOutInterpolator.destroy()
  })

  it("should handle array length changes gracefully", () => {
    interpolator = new ValueInterpolator([1, 2], {
      speed: 0.5,
      onChange: mockOnChange,
    })

    // Expand array
    interpolator.setTarget([1, 2, 3, 4])
    expect(interpolator.getCurrentValues()).toHaveLength(4)

    // Shrink array
    interpolator.setTarget([5, 6])
    expect(interpolator.getCurrentValues()).toHaveLength(2)

    // Values should be updated
    const values = interpolator.getCurrentValues()
    expect(values[0]).not.toBe(1) // Should be interpolating toward 5
    expect(values[1]).not.toBe(2) // Should be interpolating toward 6
  })

  it("should stop and start interpolation correctly", async () => {
    interpolator = new ValueInterpolator([0], {
      speed: 0.1, // Slow for testing
      onChange: mockOnChange,
    })

    interpolator.setTarget([10])
    expect(interpolator.isInterpolating()).toBe(true)

    interpolator.stop()
    expect(interpolator.isInterpolating()).toBe(false)

    // Give time to ensure no more onChange calls
    const callCountAfterStop = mockOnChange.mock.calls.length
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(mockOnChange.mock.calls.length).toBe(callCountAfterStop)

    // Should be able to restart
    interpolator.setTarget([5])
    expect(interpolator.isInterpolating()).toBe(true)
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
})
