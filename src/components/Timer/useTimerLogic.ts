import { useCallback, useEffect, useRef, useState } from "react"
import { useInterpolation } from "../utils/interpolation"
import type { TimerState } from "./types"

interface UseTimerLogicProps {
  autoStart: boolean
  hasError: boolean
  onPauseAnimation: () => void
  onErrorAnimation: () => void
  onClearErrorAnimation: () => void
}

export const useTimerLogic = ({
  autoStart,
  hasError,
  onPauseAnimation,
  onErrorAnimation,
  onClearErrorAnimation,
}: UseTimerLogicProps) => {
  const [timerState, setTimerState] = useState<TimerState>({
    elapsedTime: 0,
    isRunning: false,
    isPausedState: false,
    currentProgress: 0,
    wasRunningBeforeError: false,
  })

  // Timer-related refs
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number>(0)
  const lastProgressRef = useRef<number>(0)

  // Spring-based interpolator for smooth gauge progress animations
  const [progressInterpolator] = useInterpolation([0], {
    tension: 80,
    friction: 18,
    onChange: ([progress]) => {
      setTimerState((prev) => ({ ...prev, currentProgress: progress }))
    },
  })

  const start = useCallback(
    (elapsedSeconds: number = 0) => {
      const initialProgress = ((elapsedSeconds / 60) % 1) * 100
      setTimerState((prev) => ({
        ...prev,
        elapsedTime: elapsedSeconds,
        isPausedState: false,
        currentProgress: initialProgress,
      }))
      pausedTimeRef.current = 0
      lastProgressRef.current = initialProgress

      progressInterpolator.setImmediate([initialProgress])

      if (autoStart) {
        startTimeRef.current = Date.now() - elapsedSeconds * 1000
        setTimerState((prev) => ({ ...prev, isRunning: true }))
      } else {
        startTimeRef.current = null
      }
    },
    [autoStart, progressInterpolator],
  )

  const pause = useCallback(() => {
    if (startTimeRef.current && timerState.isRunning) {
      const now = Date.now()
      const totalElapsed = (now - startTimeRef.current) / 1000 + pausedTimeRef.current
      const currentProgress = ((totalElapsed / 60) % 1) * 100
      progressInterpolator.setTarget([currentProgress])
      
      setTimerState((prev) => ({
        ...prev,
        elapsedTime: Math.floor(totalElapsed),
      }))
    }

    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      isPausedState: true,
    }))
    onPauseAnimation()
  }, [
    timerState.isRunning,
    progressInterpolator,
    onPauseAnimation,
  ])

  const resume = useCallback(() => {
    if (timerState.isPausedState) {
      pausedTimeRef.current = timerState.elapsedTime
      startTimeRef.current = Date.now()
      setTimerState((prev) => ({
        ...prev,
        isRunning: true,
        isPausedState: false,
      }))
    }
  }, [timerState.isPausedState, timerState.elapsedTime])

  const reset = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      elapsedTime: 0,
      isRunning: false,
      isPausedState: false,
      currentProgress: 0,
    }))
    pausedTimeRef.current = 0
    startTimeRef.current = null
    lastProgressRef.current = 0
    progressInterpolator.setImmediate([0])
  }, [progressInterpolator])

  const isPaused = useCallback(() => {
    return timerState.isPausedState
  }, [timerState.isPausedState])

  // Handle error state changes
  useEffect(() => {
    if (hasError) {
      if (timerState.isRunning) {
        setTimerState((prev) => ({ ...prev, wasRunningBeforeError: true }))
        pause()
      }
      onErrorAnimation()
    } else {
      if (timerState.wasRunningBeforeError && !timerState.isRunning) {
        setTimerState((prev) => ({ ...prev, wasRunningBeforeError: false }))
        resume()
      }
      onClearErrorAnimation()
    }
  }, [
    hasError,
    timerState.isRunning,
    timerState.wasRunningBeforeError,
    pause,
    resume,
    onErrorAnimation,
    onClearErrorAnimation,
  ])

  // Main timer loop
  useEffect(() => {
    if (timerState.isRunning) {
      const updateTimer = () => {
        if (startTimeRef.current) {
          const now = Date.now()
          const totalElapsed = (now - startTimeRef.current) / 1000 + pausedTimeRef.current
          const currentProgress = ((totalElapsed / 60) % 1) * 100

          setTimerState((prev) => ({
            ...prev,
            elapsedTime: Math.floor(totalElapsed),
          }))

          // Only update progress interpolator if progress changed significantly
          const progressDiff = Math.abs(currentProgress - lastProgressRef.current)
          if (progressDiff > 0.1) {
            progressInterpolator.setTarget([currentProgress])
            lastProgressRef.current = currentProgress
          }
        }
        animationRef.current = requestAnimationFrame(updateTimer)
      }
      animationRef.current = requestAnimationFrame(updateTimer)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [timerState.isRunning, progressInterpolator])

  // Interpolation animation loop
  useEffect(() => {
    let interpolationAnimationId: number | null = null

    const animateInterpolation = () => {
      progressInterpolator.update()
      interpolationAnimationId = requestAnimationFrame(animateInterpolation)
    }

    interpolationAnimationId = requestAnimationFrame(animateInterpolation)

    return () => {
      if (interpolationAnimationId) {
        cancelAnimationFrame(interpolationAnimationId)
      }
    }
  }, [progressInterpolator])

  return {
    timerState,
    controls: {
      start,
      pause,
      resume,
      reset,
      isPaused,
    },
  }
}
