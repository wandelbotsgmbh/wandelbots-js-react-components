import { useCallback, useRef, useState } from "react"
import type { AnimationState } from "./types"

export const useAnimations = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    showPauseAnimation: false,
    showErrorAnimation: false,
    showPulsatingText: false,
    pulsatingFinished: false,
    showLabels: true,
    showMainText: true,
    showIdlePulsating: false,
    idleDotsCount: 0,
  })

  // Refs for managing timeouts and intervals
  const pauseAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const errorAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulsatingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulseCountRef = useRef<number>(0)
  const idlePulsatingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const idleDotsIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const triggerPauseAnimation = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, showPauseAnimation: true }))

    if (pauseAnimationTimeoutRef.current) {
      clearTimeout(pauseAnimationTimeoutRef.current)
    }

    pauseAnimationTimeoutRef.current = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, showPauseAnimation: false }))
    }, 800)
  }, [])

  const triggerErrorAnimation = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, showErrorAnimation: true }))

    if (errorAnimationTimeoutRef.current) {
      clearTimeout(errorAnimationTimeoutRef.current)
    }

    errorAnimationTimeoutRef.current = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, showErrorAnimation: false }))
    }, 600)
  }, [])

  const clearErrorAnimation = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, showErrorAnimation: false }))
    if (errorAnimationTimeoutRef.current) {
      clearTimeout(errorAnimationTimeoutRef.current)
    }
  }, [])

  const startPulsatingAnimation = useCallback((onComplete?: () => void) => {
    pulseCountRef.current = 0
    // Start with fade to success color
    setAnimationState((prev) => ({
      ...prev,
      showPulsatingText: true,
      pulsatingFinished: false,
    }))

    // After initial success color fade, start slow pulsating like idle
    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        pulsatingFinished: true, // This will keep the success color and start slow pulsating
      }))

      // Start slow pulsating animation similar to idle
      pulsatingIntervalRef.current = setInterval(() => {
        setAnimationState((prev) => ({
          ...prev,
          showPulsatingText: !prev.showPulsatingText,
        }))
      }, 2000) // Same slow timing as idle pulsating

      if (onComplete) {
        onComplete()
      }
    }, 800) // Initial success color display duration
  }, [])

  const stopPulsatingAnimation = useCallback(() => {
    if (pulsatingIntervalRef.current) {
      clearInterval(pulsatingIntervalRef.current)
      pulsatingIntervalRef.current = null
    }
    // Reset all pulsating states to ensure colors are reset
    setAnimationState((prev) => ({
      ...prev,
      showPulsatingText: false,
      pulsatingFinished: false,
    }))
    pulseCountRef.current = 0
  }, [])

  const startIdleAnimations = useCallback(() => {
    // Start pulsating animation for the text
    setAnimationState((prev) => ({
      ...prev,
      showIdlePulsating: true,
    }))

    idlePulsatingIntervalRef.current = setInterval(() => {
      setAnimationState((prev) => ({
        ...prev,
        showIdlePulsating: !prev.showIdlePulsating,
      }))
    }, 2000) // Slower pulsate every 2 seconds

    // Start animated dots
    idleDotsIntervalRef.current = setInterval(() => {
      setAnimationState((prev) => ({
        ...prev,
        idleDotsCount: (prev.idleDotsCount + 1) % 4, // Cycle through 0, 1, 2, 3
      }))
    }, 800) // Change dots every 800ms
  }, [])

  const stopIdleAnimations = useCallback(() => {
    if (idlePulsatingIntervalRef.current) {
      clearInterval(idlePulsatingIntervalRef.current)
      idlePulsatingIntervalRef.current = null
    }
    if (idleDotsIntervalRef.current) {
      clearInterval(idleDotsIntervalRef.current)
      idleDotsIntervalRef.current = null
    }
    setAnimationState((prev) => ({
      ...prev,
      showIdlePulsating: false,
      idleDotsCount: 0,
    }))
  }, [])

  const triggerFadeTransition = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      showLabels: false,
      showMainText: false,
    }))

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        showLabels: true,
        showMainText: true,
      }))
    }, 200)
  }, [])

  const setInitialAnimationState = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      showLabels: true,
      showMainText: true,
    }))
  }, [])

  // Cleanup function
  const cleanup = useCallback(() => {
    if (pauseAnimationTimeoutRef.current) {
      clearTimeout(pauseAnimationTimeoutRef.current)
    }
    if (errorAnimationTimeoutRef.current) {
      clearTimeout(errorAnimationTimeoutRef.current)
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }
    if (pulsatingIntervalRef.current) {
      clearInterval(pulsatingIntervalRef.current)
    }
    if (idlePulsatingIntervalRef.current) {
      clearInterval(idlePulsatingIntervalRef.current)
    }
    if (idleDotsIntervalRef.current) {
      clearInterval(idleDotsIntervalRef.current)
    }
  }, [])

  return {
    animationState,
    triggerPauseAnimation,
    triggerErrorAnimation,
    clearErrorAnimation,
    startPulsatingAnimation,
    stopPulsatingAnimation,
    startIdleAnimations,
    stopIdleAnimations,
    triggerFadeTransition,
    setInitialAnimationState,
    cleanup,
  }
}
