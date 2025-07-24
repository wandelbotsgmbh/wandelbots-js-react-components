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
  private updateCount: number = 0 // Track how many updates have occurred

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
    this.updateCount = 0
  }

  /**
   * Update interpolation using spring physics
   *
   * Call this method every frame for smooth animation. In React Three Fiber,
   * call from within useFrame callback with the provided delta time.
   *
   * @param delta - Time elapsed since last update in seconds (e.g., 1/60 ≈ 0.0167 for 60fps)
   * @returns true when interpolation is complete (all values reached their targets)
   */
  update(delta: number = 1 / 60): boolean {
    let hasChanges = false
    let isComplete = true

    // Increment update counter for initialization smoothing
    this.updateCount++

    // Limit delta to prevent physics instability during large frame drops
    const clampedDelta = Math.min(delta, 1 / 15) // Maximum 66ms frame time allowed

    // Apply gentle ramp-up for the first few frames to prevent initial jumpiness
    // Only apply reduced force for the very first frame to prevent jarring starts
    const initializationFactor =
      this.updateCount === 1
        ? 0.7 // Slightly reduced force only on the very first frame
        : 1

    for (let i = 0; i < this.currentValues.length; i++) {
      const current = this.currentValues[i]
      const target = this.targetValues[i]
      const velocity = this.velocities[i]

      // Calculate spring physics forces
      const displacement = target - current
      const springForce =
        displacement * this.options.tension * initializationFactor
      const dampingForce = velocity * this.options.friction

      // Calculate acceleration from net force (F = ma, assuming mass = 1)
      const acceleration = springForce - dampingForce

      // Integrate physics using Verlet method for numerical stability
      const newVelocity = velocity + acceleration * clampedDelta
      const newValue = current + newVelocity * clampedDelta

      // Determine if this value has settled (close to target with low velocity)
      const isValueComplete =
        Math.abs(displacement) < this.options.threshold &&
        Math.abs(newVelocity) < this.options.threshold * 10

      if (!isValueComplete) {
        isComplete = false
        // Continue spring animation
        this.currentValues[i] = newValue
        this.velocities[i] = newVelocity
        hasChanges = true
      } else {
        // Snap exactly to target when close enough (prevents endless micro-movements)
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
   * Set new target values for the interpolation to move towards
   *
   * Includes smart blending for very rapid target updates (faster than 120fps)
   * to prevent jarring movements when targets change frequently.
   */
  setTarget(newValues: number[]): void {
    const now = performance.now()
    const timeSinceLastUpdate = now - this.targetUpdateTime

    // Store previous target for smooth transitions
    this.previousTargetValues = [...this.targetValues]
    this.targetValues = [...newValues]
    this.targetUpdateTime = now

    // Reset update counter for smooth initialization when target changes
    this.updateCount = 0

    // Apply target blending for extremely rapid updates to prevent jarring jumps
    // Only activates when targets change faster than 120fps (< 8ms between updates)
    // AND this is not the first target being set (avoid blending initial target with initial values)
    const isInitialTargetSet = this.previousTargetValues.every(
      (val, i) => val === this.currentValues[i],
    )

    if (
      timeSinceLastUpdate < 8 &&
      timeSinceLastUpdate > 0 &&
      this.previousTargetValues.length > 0 &&
      !isInitialTargetSet // Don't blend if this is the first meaningful target change
    ) {
      // Blend between previous and new target based on time elapsed
      const blendFactor = Math.min(timeSinceLastUpdate / 8, 1) // 0 to 1 over 8ms

      for (let i = 0; i < this.targetValues.length; i++) {
        const prev = this.previousTargetValues[i] || 0
        const next = newValues[i] || 0

        // Only blend significant changes to avoid unnecessary smoothing
        const change = Math.abs(next - prev)
        if (change > 0.1) {
          this.targetValues[i] = prev + (next - prev) * blendFactor
        }
      }
    }

    // Ensure value and velocity arrays have matching lengths
    while (this.currentValues.length < newValues.length) {
      this.currentValues.push(newValues[this.currentValues.length])
      this.velocities.push(0) // New values start with zero velocity
    }
    if (this.currentValues.length > newValues.length) {
      this.currentValues = this.currentValues.slice(0, newValues.length)
      this.velocities = this.velocities.slice(0, newValues.length)
    }

    // Does not start automatic interpolation - requires manual update() calls
    // This design prevents conflicts when using with React Three Fiber's useFrame
  }

  /**
   * Get a copy of all current interpolated values
   */
  getCurrentValues(): number[] {
    return [...this.currentValues]
  }

  /**
   * Get a single interpolated value by its array index
   */
  getValue(index: number): number {
    return this.currentValues[index] ?? 0
  }

  /**
   * Check if automatic interpolation is currently running
   *
   * This only tracks auto-interpolation started with startAutoInterpolation().
   * Manual update() calls are not tracked by this method.
   */
  isInterpolating(): boolean {
    return this.animationId !== null
  }

  /**
   * Stop automatic interpolation if it's running
   *
   * This cancels the internal animation frame loop but does not affect
   * manual update() calls.
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
    this.updateCount = 0 // Reset update counter
    this.options.onChange(this.currentValues)
  }

  /**
   * Update interpolation options
   */
  updateOptions(newOptions: Partial<InterpolationOptions>): void {
    this.options = { ...this.options, ...newOptions }
  }

  /**
   * Start automatic interpolation with an animation loop
   *
   * This begins a requestAnimationFrame loop that calls update() automatically.
   * For React Three Fiber components, prefer using manual update() calls
   * within useFrame hooks instead.
   */
  startAutoInterpolation(): void {
    this.startInterpolation()
  }

  /**
   * Clean up all resources and stop any running animations
   *
   * This cancels any active animation frames and resets internal state.
   * Call this when the component unmounts or is no longer needed.
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
    // Use delta timing with a fallback for consistent automatic animations
    const isComplete = this.update(1 / 60) // Simulate 60fps for auto-interpolation

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
