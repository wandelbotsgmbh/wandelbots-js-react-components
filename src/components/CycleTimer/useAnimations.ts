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
  })

  // Refs for managing timeouts and intervals
  const pauseAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const errorAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulsatingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pulseCountRef = useRef<number>(0)

  const triggerPauseAnimation = useCallback(() => {
    setAnimationState(prev => ({ ...prev, showPauseAnimation: true }))
    
    if (pauseAnimationTimeoutRef.current) {
      clearTimeout(pauseAnimationTimeoutRef.current)
    }
    
    pauseAnimationTimeoutRef.current = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, showPauseAnimation: false }))
    }, 800)
  }, [])

  const triggerErrorAnimation = useCallback(() => {
    setAnimationState(prev => ({ ...prev, showErrorAnimation: true }))
    
    if (errorAnimationTimeoutRef.current) {
      clearTimeout(errorAnimationTimeoutRef.current)
    }
    
    errorAnimationTimeoutRef.current = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, showErrorAnimation: false }))
    }, 600)
  }, [])

  const clearErrorAnimation = useCallback(() => {
    setAnimationState(prev => ({ ...prev, showErrorAnimation: false }))
    if (errorAnimationTimeoutRef.current) {
      clearTimeout(errorAnimationTimeoutRef.current)
    }
  }, [])

  const startPulsatingAnimation = useCallback((onComplete?: () => void) => {
    pulseCountRef.current = 0
    setAnimationState(prev => ({ 
      ...prev, 
      showPulsatingText: true,
      pulsatingFinished: false 
    }))

    pulsatingIntervalRef.current = setInterval(() => {
      pulseCountRef.current += 1

      if (pulseCountRef.current >= 8) {
        // 4 complete cycles (on->off->on->off = 8 state changes)
        if (pulsatingIntervalRef.current) {
          clearInterval(pulsatingIntervalRef.current)
          pulsatingIntervalRef.current = null
        }
        setAnimationState(prev => ({
          ...prev,
          showPulsatingText: false,
          pulsatingFinished: true
        }))
        if (onComplete) {
          onComplete()
        }
      } else {
        setAnimationState(prev => ({ 
          ...prev, 
          showPulsatingText: !prev.showPulsatingText 
        }))
      }
    }, 800)
  }, [])

  const stopPulsatingAnimation = useCallback(() => {
    if (pulsatingIntervalRef.current) {
      clearInterval(pulsatingIntervalRef.current)
      pulsatingIntervalRef.current = null
    }
    setAnimationState(prev => ({
      ...prev,
      showPulsatingText: false,
      pulsatingFinished: false
    }))
    pulseCountRef.current = 0
  }, [])

  const triggerFadeTransition = useCallback(() => {
    setAnimationState(prev => ({ 
      ...prev, 
      showLabels: false, 
      showMainText: false 
    }))
    
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current)
    }
    
    fadeTimeoutRef.current = setTimeout(() => {
      setAnimationState(prev => ({ 
        ...prev, 
        showLabels: true, 
        showMainText: true 
      }))
    }, 200)
  }, [])

  const setInitialAnimationState = useCallback(() => {
    setAnimationState(prev => ({ 
      ...prev, 
      showLabels: true, 
      showMainText: true 
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
  }, [])

  return {
    animationState,
    triggerPauseAnimation,
    triggerErrorAnimation,
    clearErrorAnimation,
    startPulsatingAnimation,
    stopPulsatingAnimation,
    triggerFadeTransition,
    setInitialAnimationState,
    cleanup,
  }
}
