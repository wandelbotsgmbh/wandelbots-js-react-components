import { useThree } from "@react-three/fiber"
import { useCallback, useEffect, useRef } from "react"

/**
 * Hook to temporarily boost render frequency when needed.
 * Useful when a new motion group appears or during critical animations.
 *
 * @param trigger - Value that triggers the render boost when changed (pass null for manual control only)
 * @param duration - How long to boost rendering (ms), default 2000ms
 * @param interval - Render interval during boost (ms), default 200ms
 * @returns startBoost and stopBoost functions for manual control
 */
export function useRenderBoost(
  trigger: unknown,
  duration = 2000,
  interval = 200,
) {
  const { invalidate } = useThree()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopBoost = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const startBoost = useCallback(() => {
    // Clear any existing boost
    stopBoost()

    // Start high-frequency rendering
    intervalRef.current = setInterval(() => {
      invalidate()
    }, interval)

    // Stop after duration
    timeoutRef.current = setTimeout(() => {
      stopBoost()
      invalidate() // One final render
    }, duration)
  }, [duration, interval, invalidate, stopBoost])

  // Auto-trigger when trigger value changes (unless trigger is null)
  useEffect(() => {
    if (trigger !== null) {
      startBoost()
    }

    // Cleanup on unmount
    return () => {
      stopBoost()
    }
  }, [trigger, startBoost, stopBoost])

  return { startBoost, stopBoost }
}
