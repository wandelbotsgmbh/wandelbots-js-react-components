import React from "react"
import * as THREE from "three"

/**
 * Smooth value interpolation utility for animating between values
 * even with rapid updates. Uses THREE.MathUtils.lerp for optimized interpolation.
 *
 * Follows React Three Fiber best practices:
 * - Uses frame deltas for refresh-rate independence
 * - Avoids object creation in animation loops
 * - Direct mutation for performance
 *
 * @example
 * ```tsx
 * // Basic usage with spring-like animation (similar to react-spring)
 * const interpolator = new ValueInterpolator([0, 0, 0], {
 *   alpha: 0.1, // Interpolation alpha (0-1, frame-rate independent)
 *   easing: 'spring', // Spring-like animation with slight overshoot
 *   onChange: (values) => {
 *     // Update your objects with interpolated values
 *     robot.joints.forEach((joint, i) => {
 *       joint.rotation.y = values[i]
 *     })
 *   }
 * })
 *
 * // Different easing options:
 * // 'linear' - smooth linear interpolation
 * // 'spring' - spring-like with overshoot (similar to react-spring)
 * // 'easeOut' - smooth deceleration
 * // 'easeInOut' - smooth acceleration and deceleration
 *
 * // Set new target values
 * interpolator.setTarget([1.5, -0.8, 2.1])
 *
 * // React hook usage with useFrame
 * function MyComponent() {
 *   const [interpolator] = useInterpolation([0, 0, 0], {
 *     alpha: 0.1,
 *     easing: 'spring'
 *   })
 *
 *   useFrame((state, delta) => {
 *     // Frame-rate independent updates
 *     interpolator.update(delta)
 *   })
 *
 *   useEffect(() => {
 *     interpolator.setTarget([1, 2, 3])
 *   }, [])
 *
 *   return <mesh position={interpolator.getCurrentValues()} />
 * }
 * ```
 */

export type EasingFunction = "linear" | "spring" | "easeOut" | "easeInOut"

export interface InterpolationOptions {
  /** Interpolation alpha factor (0-1, frame-rate independent) */
  alpha?: number
  /** Minimum threshold to consider interpolation complete */
  threshold?: number
  /** Easing function to use for interpolation */
  easing?: EasingFunction
  /** Callback when values change during interpolation */
  onChange?: (values: number[]) => void
  /** Callback when interpolation reaches target values */
  onComplete?: (values: number[]) => void
}

export class ValueInterpolator {
  private currentValues: number[] = []
  private targetValues: number[] = []
  private animationId: number | null = null
  private options: Required<InterpolationOptions>

  constructor(
    initialValues: number[] = [],
    options: InterpolationOptions = {},
  ) {
    this.options = {
      alpha: 0.1,
      threshold: 0.001,
      easing: "spring",
      onChange: () => {},
      onComplete: () => {},
      ...options,
    }

    this.currentValues = [...initialValues]
    this.targetValues = [...initialValues]
  }

  /**
   * Update interpolation (call this in useFrame for frame-rate independence)
   * @param delta - Frame delta time for smooth animation
   */
  update(delta: number = 1 / 60): boolean {
    let hasChanges = false
    let isComplete = true

    for (let i = 0; i < this.currentValues.length; i++) {
      const current = this.currentValues[i]
      const target = this.targetValues[i]
      const diff = Math.abs(target - current)

      if (diff > this.options.threshold) {
        isComplete = false
        // Frame-rate independent interpolation using delta
        const newValue = this.applyEasing(
          current,
          target,
          this.options.alpha,
          delta,
        )
        this.currentValues[i] = newValue
        hasChanges = true
      } else if (current !== target) {
        // Snap to target if within threshold
        this.currentValues[i] = target
        hasChanges = true
      }
    }

    if (hasChanges) {
      this.options.onChange(this.currentValues)
    }

    if (isComplete) {
      this.options.onComplete(this.currentValues)
    }

    return isComplete
  }

  /**
   * Set new target values to interpolate towards
   */
  setTarget(newValues: number[]): void {
    this.targetValues = [...newValues]

    // Ensure currentValues array has the same length
    while (this.currentValues.length < newValues.length) {
      this.currentValues.push(newValues[this.currentValues.length])
    }
    if (this.currentValues.length > newValues.length) {
      this.currentValues = this.currentValues.slice(0, newValues.length)
    }

    this.startInterpolation()
  }

  /**
   * Get the current interpolated values
   */
  getCurrentValues(): number[] {
    return [...this.currentValues]
  }

  /**
   * Get a specific interpolated value by index
   */
  getValue(index: number): number {
    return this.currentValues[index] ?? 0
  }

  /**
   * Check if interpolation is currently active
   */
  isInterpolating(): boolean {
    return this.animationId !== null
  }

  /**
   * Stop the current interpolation
   */
  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  /**
   * Instantly set values without interpolation
   */
  setImmediate(values: number[]): void {
    this.stop()
    this.currentValues = [...values]
    this.targetValues = [...values]
    this.options.onChange(this.currentValues)
  }

  /**
   * Update interpolation options
   */
  updateOptions(newOptions: Partial<InterpolationOptions>): void {
    this.options = { ...this.options, ...newOptions }
  }

  /**
   * Destroy the interpolator and clean up resources
   */
  destroy(): void {
    this.stop()
  }

  /**
   * Apply easing function to the interpolation with frame-rate independence
   */
  private applyEasing(
    current: number,
    target: number,
    alpha: number,
    delta: number = 1,
  ): number {
    // Adjust alpha based on delta for frame-rate independence
    // Standard 60fps frame time is ~0.0167, so normalize to that
    const frameRateAdjustedAlpha = Math.min(alpha * (delta * 60), 1)

    switch (this.options.easing) {
      case "linear":
        return THREE.MathUtils.lerp(current, target, frameRateAdjustedAlpha)

      case "spring":
        // Spring easing with frame-rate independence
        const springAlpha = Math.min(frameRateAdjustedAlpha * 1.5, 0.8)
        return THREE.MathUtils.lerp(current, target, springAlpha)

      case "easeOut":
        // Ease out cubic for smooth deceleration
        const t = Math.min(frameRateAdjustedAlpha * 2, 1)
        const easedT = 1 - Math.pow(1 - t, 3)
        return THREE.MathUtils.lerp(current, target, easedT)

      case "easeInOut":
        // Ease in-out for smooth acceleration and deceleration
        const t2 = Math.min(frameRateAdjustedAlpha * 2, 1)
        const easedT2 =
          t2 < 0.5 ? 4 * t2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 3) / 2
        return THREE.MathUtils.lerp(current, target, easedT2)

      default:
        return THREE.MathUtils.lerp(current, target, frameRateAdjustedAlpha)
    }
  }

  private startInterpolation(): void {
    if (this.animationId !== null) {
      return // Already interpolating
    }

    this.animate()
  }

  private animate = (): void => {
    let hasChanges = false
    let isComplete = true

    for (let i = 0; i < this.currentValues.length; i++) {
      const current = this.currentValues[i]
      const target = this.targetValues[i]
      const diff = Math.abs(target - current)

      if (diff > this.options.threshold) {
        isComplete = false
        const newValue = this.applyEasing(current, target, this.options.alpha)
        this.currentValues[i] = newValue
        hasChanges = true
      } else if (current !== target) {
        // Snap to target if within threshold
        this.currentValues[i] = target
        hasChanges = true
      }
    }

    if (hasChanges) {
      this.options.onChange(this.currentValues)
    }

    if (isComplete) {
      this.animationId = null
      this.options.onComplete(this.currentValues)
    } else {
      this.animationId = requestAnimationFrame(this.animate)
    }
  }
}

/**
 * React hook for using the ValueInterpolator with useFrame
 *
 * @example
 * ```tsx
 * function AnimatedMesh() {
 *   const [interpolator] = useInterpolation([0, 0, 0], { alpha: 0.1 })
 *   const meshRef = useRef()
 *
 *   useFrame((state, delta) => {
 *     if (interpolator.update(delta)) {
 *       // Animation complete
 *     }
 *     // Apply current values directly to mesh
 *     const [x, y, z] = interpolator.getCurrentValues()
 *     meshRef.current.position.set(x, y, z)
 *   })
 *
 *   return <mesh ref={meshRef} />
 * }
 * ```
 */
export function useInterpolation(
  initialValues: number[] = [],
  options: InterpolationOptions = {},
): [ValueInterpolator] {
  const interpolatorRef = React.useRef<ValueInterpolator | null>(null)

  // Initialize interpolator
  if (!interpolatorRef.current) {
    interpolatorRef.current = new ValueInterpolator(initialValues, options)
  }

  // Update options when they change
  React.useEffect(() => {
    interpolatorRef.current?.updateOptions(options)
  }, [options])

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      interpolatorRef.current?.destroy()
    }
  }, [])

  return [interpolatorRef.current!]
}
