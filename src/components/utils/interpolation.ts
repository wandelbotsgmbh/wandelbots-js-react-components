import React from "react"
import * as THREE from "three"

/**
 * Smooth value interpolation utility for animating between values
 * even with rapid updates. Uses THREE.MathUtils.lerp for optimized interpolation.
 *
 * @example
 * ```tsx
 * // Basic usage with spring-like animation (similar to react-spring)
 * const interpolator = new ValueInterpolator([0, 0, 0], {
 *   speed: 0.1, // Interpolation speed (0-1)
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
 * // React hook usage
 * function MyComponent() {
 *   const [interpolator, currentValues] = useInterpolation([0, 0, 0], {
 *     speed: 0.15,
 *     easing: 'spring',
 *     onChange: (values) => console.log('Values updated:', values)
 *   })
 *
 *   useEffect(() => {
 *     interpolator.setTarget([1, 2, 3])
 *   }, [])
 *
 *   return <div>Current values: {currentValues.join(', ')}</div>
 * }
 * ```
 */

export type EasingFunction = "linear" | "spring" | "easeOut" | "easeInOut"

export interface InterpolationOptions {
  /** Interpolation speed factor (0-1, where 1 is instant) */
  speed?: number
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
      speed: 0.1,
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
   * Apply easing function to the interpolation
   */
  private applyEasing(current: number, target: number, speed: number): number {
    switch (this.options.easing) {
      case "linear":
        return THREE.MathUtils.lerp(current, target, speed)

      case "spring":
        // Improved spring-like easing with better convergence
        const diff = target - current
        // Use a modified approach that maintains spring feel but ensures convergence
        const springAlpha = Math.min(speed * 1.5, 0.8) // Cap to prevent overshooting too much
        return THREE.MathUtils.lerp(current, target, springAlpha)

      case "easeOut":
        // Ease out cubic for smooth deceleration
        const t = Math.min(speed * 2, 1)
        const easedT = 1 - Math.pow(1 - t, 3)
        return THREE.MathUtils.lerp(current, target, easedT)

      case "easeInOut":
        // Ease in-out for smooth acceleration and deceleration
        const t2 = Math.min(speed * 2, 1)
        const easedT2 =
          t2 < 0.5 ? 4 * t2 * t2 * t2 : 1 - Math.pow(-2 * t2 + 2, 3) / 2
        return THREE.MathUtils.lerp(current, target, easedT2)

      default:
        return THREE.MathUtils.lerp(current, target, speed)
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
        const newValue = this.applyEasing(current, target, this.options.speed)
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
 * React hook for using the ValueInterpolator
 */
export function useInterpolation(
  initialValues: number[] = [],
  options: InterpolationOptions = {},
): [ValueInterpolator, number[]] {
  const interpolatorRef = React.useRef<ValueInterpolator | null>(null)
  const [currentValues, setCurrentValues] =
    React.useState<number[]>(initialValues)

  // Initialize interpolator
  if (!interpolatorRef.current) {
    interpolatorRef.current = new ValueInterpolator(initialValues, {
      ...options,
      onChange: (values) => {
        setCurrentValues([...values])
        options.onChange?.(values)
      },
    })
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

  return [interpolatorRef.current!, currentValues]
}
