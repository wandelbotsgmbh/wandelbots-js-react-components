import React from "react"

/**
 * Smooth value interpolation utility using spring physics with tension and friction.
 * Designed for React Three Fiber applications with smooth, natural animations.
 *
 * Features:
 * - Spring physics with configurable tension and friction
 * - Frame-rate independent using delta timing
 * - Handles irregular frame timing and rapid target updates
 * - Manual update() calls for useFrame integration (no automatic RAF loop)
 * - Direct mutation for performance
 *
 * @example
 * ```tsx
 * // Basic spring animation
 * const interpolator = new ValueInterpolator([0, 0, 0], {
 *   tension: 120, // Higher = faster, stiffer spring (default: 120)
 *   friction: 20, // Higher = more damping, less oscillation (default: 20)
 *   onChange: (values) => {
 *     robot.joints.forEach((joint, i) => {
 *       joint.rotation.y = values[i]
 *     })
 *   }
 * })
 *
 * interpolator.setTarget([1.5, -0.8, 2.1])
 *
 * // React Three Fiber usage
 * function MyComponent() {
 *   const [interpolator] = useInterpolation([0, 0, 0])
 *
 *   useFrame((state, delta) => {
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

export interface InterpolationOptions {
  /** Spring tension (higher = faster, stiffer spring) - default: 120 */
  tension?: number
  /** Spring friction (higher = more damping, less oscillation) - default: 20 */
  friction?: number
  /** Minimum threshold to consider interpolation complete - default: 0.001 */
  threshold?: number
  /** Callback when values change during interpolation */
  onChange?: (values: number[]) => void
  /** Callback when interpolation reaches target values */
  onComplete?: (values: number[]) => void
}

export class ValueInterpolator {
  private currentValues: number[] = []
  private targetValues: number[] = []
  private previousTargetValues: number[] = []
  private targetUpdateTime: number = 0
  private animationId: number | null = null
  private options: Required<InterpolationOptions>

  // Spring physics state
  private velocities: number[] = []

  constructor(
    initialValues: number[] = [],
    options: InterpolationOptions = {},
  ) {
    this.options = {
      tension: 120,
      friction: 20,
      threshold: 0.001,
      onChange: () => {},
      onComplete: () => {},
      ...options,
    }

    this.currentValues = [...initialValues]
    this.targetValues = [...initialValues]
    this.previousTargetValues = [...initialValues]
    this.velocities = new Array(initialValues.length).fill(0)
    this.targetUpdateTime = performance.now()
  }

  /**
   * Update interpolation using spring physics (call this in useFrame for frame-rate independence)
   * @param delta - Frame delta time for smooth animation
   */
  update(delta: number = 1 / 60): boolean {
    let hasChanges = false
    let isComplete = true

    // Clamp delta to prevent instability from large frame drops
    const clampedDelta = Math.min(delta, 1 / 15) // Max 66ms frame time

    for (let i = 0; i < this.currentValues.length; i++) {
      const current = this.currentValues[i]
      const target = this.targetValues[i]
      const velocity = this.velocities[i]

      // Spring physics calculation
      const displacement = target - current
      const springForce = displacement * this.options.tension
      const dampingForce = velocity * this.options.friction

      // Net force and acceleration
      const acceleration = springForce - dampingForce

      // Update velocity and position using Verlet integration for stability
      const newVelocity = velocity + acceleration * clampedDelta
      const newValue = current + newVelocity * clampedDelta

      // Check if we're close enough to target and velocity is low enough
      const isValueComplete =
        Math.abs(displacement) < this.options.threshold &&
        Math.abs(newVelocity) < this.options.threshold * 10

      if (!isValueComplete) {
        isComplete = false
        this.currentValues[i] = newValue
        this.velocities[i] = newVelocity
        hasChanges = true
      } else {
        // Snap to target when close enough
        if (this.currentValues[i] !== target) {
          this.currentValues[i] = target
          this.velocities[i] = 0
          hasChanges = true
        }
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
   * Handles irregular target updates smoothly by considering update frequency
   */
  setTarget(newValues: number[]): void {
    const now = performance.now()
    const timeSinceLastUpdate = now - this.targetUpdateTime

    // Store previous target for smooth transitions
    this.previousTargetValues = [...this.targetValues]
    this.targetValues = [...newValues]
    this.targetUpdateTime = now

    // Only apply blending for extremely rapid updates (< 8ms, roughly faster than 120fps)
    // This helps with irregular robot data but doesn't interfere with normal usage
    if (
      timeSinceLastUpdate < 8 &&
      timeSinceLastUpdate > 0 &&
      this.previousTargetValues.length > 0
    ) {
      // Very conservative blending - only smooth the most jarring rapid updates
      const blendFactor = Math.min(timeSinceLastUpdate / 8, 1) // 0-1 based on 8ms window

      for (let i = 0; i < this.targetValues.length; i++) {
        const prev = this.previousTargetValues[i] || 0
        const next = newValues[i] || 0

        // Only blend if the change is significant (> 10% of the range)
        const change = Math.abs(next - prev)
        if (change > 0.1) {
          this.targetValues[i] = prev + (next - prev) * blendFactor
        }
      }
    }

    // Ensure arrays have the same length
    while (this.currentValues.length < newValues.length) {
      this.currentValues.push(newValues[this.currentValues.length])
      this.velocities.push(0) // Initialize velocity for new values
    }
    if (this.currentValues.length > newValues.length) {
      this.currentValues = this.currentValues.slice(0, newValues.length)
      this.velocities = this.velocities.slice(0, newValues.length)
    }

    // Don't auto-start interpolation - let manual update() calls handle it
    // This prevents conflicts with useFrame() calls
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
    this.previousTargetValues = [...values]
    this.velocities = new Array(values.length).fill(0) // Reset velocities
    this.targetUpdateTime = performance.now()
    this.options.onChange(this.currentValues)
  }

  /**
   * Update interpolation options
   */
  updateOptions(newOptions: Partial<InterpolationOptions>): void {
    this.options = { ...this.options, ...newOptions }
  }

  /**
   * Start automatic interpolation (use when not calling update() manually)
   */
  startAutoInterpolation(): void {
    this.startInterpolation()
  }

  /**
   * Destroy the interpolator and clean up resources
   */
  destroy(): void {
    this.stop()
  }

  private startInterpolation(): void {
    if (this.animationId !== null) {
      return // Already interpolating
    }

    this.animate()
  }

  private animate = (): void => {
    // Use the main update method which now handles spring physics
    const isComplete = this.update(1 / 60) // Default 60fps for auto-interpolation

    if (!isComplete) {
      this.animationId = requestAnimationFrame(this.animate)
    } else {
      this.animationId = null
    }
  }
}

/**
 * React hook for using the ValueInterpolator with useFrame
 *
 * This hook creates a ValueInterpolator that uses spring physics for smooth,
 * natural animations. Call interpolator.update(delta) in your useFrame callback.
 *
 * @example
 * ```tsx
 * function AnimatedMesh() {
 *   const [interpolator] = useInterpolation([0, 0, 0], {
 *     tension: 120, // Higher = faster spring
 *     friction: 20  // Higher = more damping
 *   })
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
