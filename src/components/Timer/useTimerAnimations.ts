import { useCallback, useRef, useState } from "react"
import type { TimerAnimationState } from "./types"

export const useTimerAnimations = () => {
  const [animationState, setAnimationState] = useState<TimerAnimationState>({
    showPauseAnimation: false,
    showErrorAnimation: false,
    showMainText: true,
  })

  // Refs for managing timeouts
  const pauseAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const errorAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  const triggerFadeTransition = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      showMainText: false,
    }))

    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }

    fadeTimeoutRef.current = setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        showMainText: true,
      }))
    }, 200)
  }, [])

  const setInitialAnimationState = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
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
  }, [])

  return {
    animationState,
    triggerPauseAnimation,
    triggerErrorAnimation,
    clearErrorAnimation,
    triggerFadeTransition,
    setInitialAnimationState,
    cleanup,
  }
}
