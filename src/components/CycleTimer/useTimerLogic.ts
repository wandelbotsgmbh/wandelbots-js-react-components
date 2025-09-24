import { useCallback, useEffect, useRef, useState } from "react"
import { useInterpolation } from "../utils/interpolation"
import type { TimerState } from "./types"
import { calculateExactProgress } from "./utils"

interface UseTimerLogicProps {
  autoStart: boolean
  onCycleEnd?: () => void
  onMeasuringComplete?: () => void
  hasError: boolean
  onPauseAnimation: () => void
  onErrorAnimation: () => void
  onClearErrorAnimation: () => void
  onStartPulsating: (onComplete?: () => void) => void
}

export const useTimerLogic = ({
  autoStart,
  onCycleEnd,
  onMeasuringComplete,
  hasError,
  onPauseAnimation,
  onErrorAnimation,
  onClearErrorAnimation,
  onStartPulsating,
}: UseTimerLogicProps) => {
  const [timerState, setTimerState] = useState<TimerState>({
    currentState: "idle",
    remainingTime: 0,
    maxTime: null,
    isRunning: false,
    isPausedState: false,
    currentProgress: 0,
    wasRunningBeforeError: false,
  })

  // Timer-related refs
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number>(0)

  // Spring-based interpolator for smooth gauge progress animations
  const [progressInterpolator] = useInterpolation([0], {
    tension: 80,
    friction: 18,
    onChange: ([progress]) => {
      setTimerState((prev) => ({ ...prev, currentProgress: progress }))
    },
  })

  const setIdle = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      currentState: "idle",
      maxTime: null,
      // Don't reset remainingTime - keep the last value
      isRunning: false,
      isPausedState: false,
      currentProgress: 0, // Reset progress to 0 for gauge
    }))
    pausedTimeRef.current = 0
    startTimeRef.current = null
    progressInterpolator.setImmediate([0]) // Use setImmediate for instant reset
  }, [progressInterpolator])

  const startMeasuring = useCallback(
    (elapsedSeconds: number = 0) => {
      const initialProgress = ((elapsedSeconds / 60) % 1) * 100
      setTimerState((prev) => ({
        ...prev,
        currentState: "measuring",
        maxTime: null,
        remainingTime: elapsedSeconds,
        isPausedState: false,
        currentProgress: initialProgress, // Immediately set progress
      }))
      pausedTimeRef.current = 0

      progressInterpolator.setImmediate([initialProgress]) // Use setImmediate for instant reset

      if (autoStart) {
        startTimeRef.current = Date.now() - elapsedSeconds * 1000
        setTimerState((prev) => ({ ...prev, isRunning: true }))
      } else {
        startTimeRef.current = null
      }
    },
    [autoStart, progressInterpolator],
  )

  const startNewCycle = useCallback(
    (maxTimeSeconds: number, elapsedSeconds: number = 0) => {
      // Stop any running timer first to prevent conflicts
      setTimerState((prev) => ({ ...prev, isRunning: false }))
      startTimeRef.current = null

      setTimerState((prev) => ({
        ...prev,
        currentState: "countdown",
        maxTime: maxTimeSeconds,
        isPausedState: false,
      }))
      pausedTimeRef.current = 0

      // Count-down mode
      const remainingSeconds = Math.max(0, maxTimeSeconds - elapsedSeconds)
      const initialProgress =
        elapsedSeconds > 0 ? (elapsedSeconds / maxTimeSeconds) * 100 : 0

      setTimerState((prev) => ({
        ...prev,
        remainingTime: remainingSeconds,
        currentProgress: initialProgress, // Immediately set progress
      }))

      progressInterpolator.setImmediate([initialProgress]) // Use setImmediate for instant reset

      if (remainingSeconds === 0) {
        setTimerState((prev) => ({ ...prev, isRunning: false }))
        startTimeRef.current = null
        if (onCycleEnd) {
          queueMicrotask(() => onCycleEnd())
        }
      } else if (autoStart) {
        setTimeout(() => {
          startTimeRef.current = Date.now() - elapsedSeconds * 1000
          setTimerState((prev) => ({ ...prev, isRunning: true }))
        }, 0)
      } else {
        startTimeRef.current = null
      }
    },
    [autoStart, onCycleEnd, progressInterpolator],
  )

  const completeMeasuring = useCallback(() => {
    // Always trigger completion regardless of current state
    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      currentState: "measured",
    }))
    startTimeRef.current = null

    onStartPulsating(() => {
      if (onMeasuringComplete) {
        onMeasuringComplete()
      }
    })
  }, [onStartPulsating, onMeasuringComplete])

  const pause = useCallback(() => {
    if (startTimeRef.current && timerState.isRunning) {
      const now = Date.now()
      const additionalElapsed = now - startTimeRef.current
      pausedTimeRef.current += additionalElapsed

      const totalElapsed = pausedTimeRef.current / 1000
      const exactProgress = calculateExactProgress(
        timerState.currentState,
        totalElapsed,
        timerState.maxTime,
      )
      progressInterpolator.setTarget([exactProgress])
    }

    setTimerState((prev) => ({
      ...prev,
      isRunning: false,
      isPausedState: true,
    }))
    onPauseAnimation()
  }, [
    timerState.isRunning,
    timerState.currentState,
    timerState.maxTime,
    progressInterpolator,
    onPauseAnimation,
  ])

  const resume = useCallback(() => {
    if (
      timerState.isPausedState &&
      (timerState.remainingTime > 0 || timerState.currentState !== "countdown")
    ) {
      startTimeRef.current = Date.now()
      setTimerState((prev) => ({
        ...prev,
        isRunning: true,
        isPausedState: false,
      }))
    }
  }, [
    timerState.isPausedState,
    timerState.remainingTime,
    timerState.currentState,
  ])

  const isPaused = useCallback(() => {
    return timerState.isPausedState
  }, [timerState.isPausedState])

  // Handle error state changes
  useEffect(() => {
    if (hasError) {
      if (timerState.isRunning && !timerState.isPausedState) {
        setTimerState((prev) => ({ ...prev, wasRunningBeforeError: true }))
        pause()
      }
      onErrorAnimation()
    } else {
      if (timerState.wasRunningBeforeError && timerState.isPausedState) {
        setTimerState((prev) => ({ ...prev, wasRunningBeforeError: false }))
        resume()
      }
      onClearErrorAnimation()
    }
  }, [
    hasError,
    timerState.isRunning,
    timerState.isPausedState,
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
          const elapsed =
            (now - startTimeRef.current + pausedTimeRef.current) / 1000

          if (
            timerState.currentState === "countdown" &&
            timerState.maxTime !== null
          ) {
            const remaining = Math.max(0, timerState.maxTime - elapsed)
            setTimerState((prev) => ({
              ...prev,
              remainingTime: Math.ceil(remaining),
            }))

            const progress = Math.min(100, (elapsed / timerState.maxTime) * 100)
            progressInterpolator.setTarget([progress])

            if (remaining <= 0) {
              setTimerState((prev) => ({
                ...prev,
                isRunning: false,
                remainingTime: 0,
              }))
              startTimeRef.current = null
              progressInterpolator.setTarget([100])
              if (onCycleEnd) {
                queueMicrotask(() => onCycleEnd())
              }
              return
            }
          } else if (timerState.currentState === "measuring") {
            setTimerState((prev) => ({
              ...prev,
              remainingTime: Math.floor(elapsed),
            }))
            const progress = ((elapsed / 60) % 1) * 100
            progressInterpolator.setTarget([progress])
          }

          if (timerState.isRunning) {
            animationRef.current = requestAnimationFrame(updateTimer)
          }
        }
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
      }
    }
  }, [
    timerState.isRunning,
    onCycleEnd,
    timerState.currentState,
    timerState.maxTime,
    progressInterpolator,
  ])

  // Interpolation animation loop
  useEffect(() => {
    let interpolationAnimationId: number | null = null

    const animateInterpolation = () => {
      progressInterpolator.update(1 / 60)
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
      startNewCycle,
      startMeasuring,
      setIdle,
      completeMeasuring,
      pause,
      resume,
      isPaused,
    },
  }
}
