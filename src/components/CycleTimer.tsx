import { Box, Fade, Typography, useTheme } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"
import { useInterpolation } from "./utils/interpolation"

export type CycleTimerState =
  | "idle" // Initial state showing "Waiting for program cycle"
  | "measuring" // Counting up without max time, showing "Cycle Time" / "measuring..."
  | "measured" // Completed measuring state showing "Cycle Time" / "determined" with pulsating green text
  | "countdown" // Counting down with max time
  | "countup" // Simple count up without special text
  | "success" // Brief success state after cycle completion

export interface CycleTimerProps {
  /**
   * Callback that receives the timer control functions:
   * - `startNewCycle(maxTimeSeconds?, elapsedSeconds?)` - Start a new timer cycle (if maxTimeSeconds is omitted, runs as count-up timer)
   * - `startMeasuring(elapsedSeconds?)` - Start measuring mode (count up with "measuring..." text)
   * - `startCountUp(elapsedSeconds?)` - Start simple count up without special text
   * - `setIdle()` - Set to idle state showing "Waiting for program cycle"
   * - `completeMeasuring()` - Complete the measuring cycle and trigger success animation
   * - `pause()` - Pause the countdown while preserving remaining time
   * - `resume()` - Resume countdown from where it was paused
   * - `isPaused()` - Check current pause state
   */
  onCycleComplete: (controls: {
    startNewCycle: (maxTimeSeconds?: number, elapsedSeconds?: number) => void
    startMeasuring: (elapsedSeconds?: number) => void
    startCountUp: (elapsedSeconds?: number) => void
    setIdle: () => void
    completeMeasuring: () => void
    pause: () => void
    resume: () => void
    isPaused: () => boolean
  }) => void
  /** Callback fired when a cycle actually completes (reaches zero) */
  onCycleEnd?: () => void
  /** Callback fired when measuring cycle completes */
  onMeasuringComplete?: () => void
  /** Whether the timer should start automatically when maxTime is set */
  autoStart?: boolean
  /** Visual variant of the timer */
  variant?: "default" | "small"
  /** For small variant: whether to show remaining time details (compact hides them) */
  compact?: boolean
  /** Additional CSS classes */
  className?: string
  /** Whether the timer is in an error state (pauses timer and shows error styling) */
  hasError?: boolean
}

/**
 * A circular gauge timer component that shows the remaining time of a cycle or counts up
 *
 * Features:
 * - Custom SVG circular gauge with 264px diameter and 40px thickness
 * - Multiple states: idle, measuring, measured, countdown, countup, success
 * - Idle state: shows "Waiting for program cycle" with transparent inner circle
 * - Measuring state: counts up with "Cycle Time" / "measuring..." labels
 * - Measured state: shows final time with "Cycle Time" / "determined" labels in pulsating green
 * - Countdown mode: shows remaining time prominently, counts down to zero
 * - Count-up mode: shows elapsed time without special labels
 * - Success state: brief green flash after cycle completion
 * - Displays appropriate labels based on state
 * - Automatically counts down/up and triggers callback when reaching zero (countdown only)
 * - Full timer control: start, pause, resume functionality
 * - Support for starting with elapsed time (resume mid-cycle)
 * - Error state support: pauses timer and shows error styling (red color)
 * - Smooth fade transitions between different text states
 * - Pulsating text animation for completed measuring state
 * - Fully localized with i18next
 * - Material-UI theming integration
 * - Small variant with animated progress icon (gauge border only) next to text or simple text-only mode
 *
 * @param onCycleComplete - Callback that receives timer control functions
 * @param onCycleEnd - Optional callback fired when a cycle actually completes (reaches zero)
 * @param onMeasuringComplete - Optional callback fired when measuring cycle completes
 * @param autoStart - Whether to start timer automatically (default: true)
 * @param variant - Visual variant: "default" (large gauge) or "small" (animated icon with text)
 * @param compact - For small variant: whether to hide remaining time details
 * @param className - Additional CSS classes
 * @param hasError - Whether the timer is in an error state (pauses timer and shows error styling)
 *
 * Usage:
 * ```tsx
 * // Idle state
 * <CycleTimer
 *   onCycleComplete={(controls) => {
 *     controls.setIdle()
 *   }}
 * />
 *
 * // Measuring mode (count up with measuring text)
 * <CycleTimer
 *   onCycleComplete={(controls) => {
 *     controls.startMeasuring()
 *   }}
 *   onMeasuringComplete={() => console.log('Measuring completed!')}
 * />
 *
 * // Count-down timer (with max time)
 * <CycleTimer
 *   onCycleComplete={(controls) => {
 *     // Start a 5-minute countdown cycle
 *     controls.startNewCycle(300)
 *
 *     // Or start a 5-minute cycle with 2 minutes already elapsed
 *     controls.startNewCycle(300, 120)
 *   }}
 *   onCycleEnd={() => console.log('Cycle completed!')}
 * />
 *
 * // Simple count-up timer (no special text)
 * <CycleTimer
 *   onCycleComplete={(controls) => {
 *     controls.startCountUp()
 *   }}
 * />
 * ```
 *
 * Control Functions:
 * - `startNewCycle(maxTimeSeconds?, elapsedSeconds?)` - Start a new timer cycle (omit maxTimeSeconds for count-up mode)
 * - `startMeasuring(elapsedSeconds?)` - Start measuring mode (count up with "measuring..." text)
 * - `startCountUp(elapsedSeconds?)` - Start simple count up without special text
 * - `setIdle()` - Set to idle state showing "Waiting for program cycle"
 * - `completeMeasuring()` - Complete the measuring cycle and trigger success animation
 * - `pause()` - Pause the countdown while preserving remaining time
 * - `resume()` - Resume countdown from where it was paused
 * - `isPaused()` - Check current pause state
 */
export const CycleTimer = externalizeComponent(
  observer(
    ({
      onCycleComplete,
      onCycleEnd,
      onMeasuringComplete,
      autoStart = true,
      variant = "default",
      compact = false,
      className,
      hasError = false,
    }: CycleTimerProps) => {
      const theme = useTheme()
      const { t } = useTranslation()
      const [remainingTime, setRemainingTime] = useState(0)
      const [maxTime, setMaxTime] = useState<number | null>(null)
      const [currentState, setCurrentState] = useState<CycleTimerState>("idle")
      const [isRunning, setIsRunning] = useState(false)
      const [isPausedState, setIsPausedState] = useState(false)
      const [currentProgress, setCurrentProgress] = useState(0)
      const animationRef = useRef<number | null>(null)
      const startTimeRef = useRef<number | null>(null)
      const pausedTimeRef = useRef<number>(0)
      const [wasRunningBeforeError, setWasRunningBeforeError] = useState(false)

      // Brief animation states for pause, error, and success visual feedback
      const [showPauseAnimation, setShowPauseAnimation] = useState(false)
      const [showErrorAnimation, setShowErrorAnimation] = useState(false)
      const [showPulsatingText, setShowPulsatingText] = useState(false)
      const [pulsatingFinished, setPulsatingFinished] = useState(false)
      const pauseAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
      const errorAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
      const pulsatingIntervalRef = useRef<NodeJS.Timeout | null>(null)
      const pulseCountRef = useRef<number>(0)

      // Track state changes for fade transitions
      const [showLabels, setShowLabels] = useState(true)
      const [showMainText, setShowMainText] = useState(true)
      const prevStateRef = useRef<CycleTimerState | undefined>(undefined)
      const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

      // Spring-based interpolator for smooth gauge progress animations
      // Uses physics simulation to create natural, smooth transitions between progress values
      const [progressInterpolator] = useInterpolation([0], {
        tension: 80, // Higher values = faster, more responsive animations
        friction: 18, // Higher values = more damping, less bouncy animations
        onChange: ([progress]) => {
          setCurrentProgress(progress)
        },
      })

      // Handle state changes with fade transitions for labels
      useEffect(() => {
        const prevState = prevStateRef.current

        // Check if state actually changed (not just first render)
        if (prevStateRef.current !== undefined && prevState !== currentState) {
          // Stop pulsating animation if leaving measured state
          if (prevState === "measured" && pulsatingIntervalRef.current) {
            clearInterval(pulsatingIntervalRef.current)
            pulsatingIntervalRef.current = null
            setShowPulsatingText(false)
            setPulsatingFinished(false)
            pulseCountRef.current = 0
          }

          // State changed - trigger fade out, then fade in after delay
          setShowLabels(false)
          setShowMainText(false)

          // Clear any existing timeout
          if (fadeTimeoutRef.current) {
            clearTimeout(fadeTimeoutRef.current)
          }

          // Fade back in after the fade out completes
          fadeTimeoutRef.current = setTimeout(() => {
            setShowLabels(true)
            setShowMainText(true)
          }, 200) // 200ms delay to allow fade out to complete
        } else {
          // No state change or first time - set initial state
          setShowLabels(true)
          setShowMainText(true)
        }

        prevStateRef.current = currentState
      }, [currentState])

      const setIdle = useCallback(() => {
        setCurrentState("idle")
        setMaxTime(null)
        setRemainingTime(0)
        setIsRunning(false)
        setIsPausedState(false)
        pausedTimeRef.current = 0
        startTimeRef.current = null
        progressInterpolator.setTarget([0])
      }, [progressInterpolator])

      const startMeasuring = useCallback(
        (elapsedSeconds: number = 0) => {
          setCurrentState("measuring")
          setMaxTime(null)
          setRemainingTime(elapsedSeconds)
          setIsPausedState(false)
          pausedTimeRef.current = 0

          // For measuring mode, progress is based on minute steps
          const initialProgress = ((elapsedSeconds / 60) % 1) * 100
          progressInterpolator.setTarget([initialProgress])

          if (autoStart) {
            startTimeRef.current = Date.now() - elapsedSeconds * 1000
            setIsRunning(true)
          } else {
            startTimeRef.current = null
          }
        },
        [autoStart, progressInterpolator],
      )

      const startCountUp = useCallback(
        (elapsedSeconds: number = 0) => {
          setCurrentState("countup")
          setMaxTime(null)
          setRemainingTime(elapsedSeconds)
          setIsPausedState(false)
          pausedTimeRef.current = 0

          // For count-up mode, progress is based on minute steps
          const initialProgress = ((elapsedSeconds / 60) % 1) * 100
          progressInterpolator.setTarget([initialProgress])

          if (autoStart) {
            startTimeRef.current = Date.now() - elapsedSeconds * 1000
            setIsRunning(true)
          } else {
            startTimeRef.current = null
          }
        },
        [autoStart, progressInterpolator],
      )

      const startNewCycle = useCallback(
        (maxTimeSeconds?: number, elapsedSeconds: number = 0) => {
          // Stop any running timer first to prevent conflicts
          setIsRunning(false)
          startTimeRef.current = null

          setCurrentState(
            maxTimeSeconds !== undefined ? "countdown" : "countup",
          )
          setMaxTime(maxTimeSeconds ?? null)
          setIsPausedState(false)
          pausedTimeRef.current = 0

          if (maxTimeSeconds !== undefined) {
            // Count-down mode: set remaining time
            const remainingSeconds = Math.max(
              0,
              maxTimeSeconds - elapsedSeconds,
            )
            setRemainingTime(remainingSeconds)

            // Immediately set interpolator to correct position to prevent animation conflicts
            const initialProgress =
              elapsedSeconds > 0 ? (elapsedSeconds / maxTimeSeconds) * 100 : 0

            // Force immediate update without animation for rapid state changes
            progressInterpolator.setTarget([initialProgress])
            progressInterpolator.update(1) // Force immediate sync

            if (remainingSeconds === 0) {
              setIsRunning(false)
              startTimeRef.current = null
              // Trigger completion callback immediately if time is already up
              if (onCycleEnd) {
                setTimeout(() => onCycleEnd(), 0)
              }
            } else if (autoStart) {
              // Use setTimeout to ensure state updates are processed before starting
              setTimeout(() => {
                startTimeRef.current = Date.now() - elapsedSeconds * 1000
                setIsRunning(true)
              }, 0)
            } else {
              startTimeRef.current = null
            }
          } else {
            // Count-up mode: start from elapsed time
            setRemainingTime(elapsedSeconds)

            // For count-up mode, progress is based on minute steps
            const initialProgress = ((elapsedSeconds / 60) % 1) * 100
            progressInterpolator.setTarget([initialProgress])
            progressInterpolator.update(1) // Force immediate sync

            if (autoStart) {
              setTimeout(() => {
                startTimeRef.current = Date.now() - elapsedSeconds * 1000
                setIsRunning(true)
              }, 0)
            } else {
              startTimeRef.current = null
            }
          }
        },
        [autoStart, onCycleEnd, progressInterpolator],
      )

      // Add a function to manually complete measuring (can be called externally)
      const completeMeasuring = useCallback(() => {
        if (currentState === "measuring") {
          setIsRunning(false)
          startTimeRef.current = null
          setCurrentState("measured")

          // Reset pulse state
          pulseCountRef.current = 0
          setPulsatingFinished(false)
          setShowPulsatingText(true) // Start with green

          // Start pulsating animation for exactly 4 pulses
          pulsatingIntervalRef.current = setInterval(() => {
            pulseCountRef.current += 1

            if (pulseCountRef.current >= 8) {
              // 4 complete cycles (on->off->on->off = 8 state changes)
              // Stop pulsating and set to secondary color
              if (pulsatingIntervalRef.current) {
                clearInterval(pulsatingIntervalRef.current)
                pulsatingIntervalRef.current = null
              }
              setShowPulsatingText(false) // End in secondary color
              setPulsatingFinished(true)
            } else {
              setShowPulsatingText((prev) => !prev)
            }
          }, 800) // Slower pulse to allow for smooth interpolation

          // Call the completion callback immediately
          if (onMeasuringComplete) {
            onMeasuringComplete()
          }
        }
      }, [currentState, onMeasuringComplete])

      const pause = useCallback(() => {
        if (startTimeRef.current && isRunning) {
          const now = Date.now()
          const additionalElapsed = now - startTimeRef.current
          pausedTimeRef.current += additionalElapsed

          // Calculate exact progress position and smoothly animate to it when pausing
          // This ensures the visual progress matches the actual elapsed time
          const totalElapsed = pausedTimeRef.current / 1000

          if (currentState === "countdown" && maxTime !== null) {
            // Count-down mode
            const exactProgress = Math.min(100, (totalElapsed / maxTime) * 100)
            progressInterpolator.setTarget([exactProgress])
          } else if (
            currentState === "measuring" ||
            currentState === "countup"
          ) {
            // Count-up modes: progress based on minute steps
            const exactProgress = ((totalElapsed / 60) % 1) * 100
            progressInterpolator.setTarget([exactProgress])
          }
        }
        setIsRunning(false)
        setIsPausedState(true)

        // Trigger brief pause animation
        setShowPauseAnimation(true)

        // Clear any existing timeout
        if (pauseAnimationTimeoutRef.current) {
          clearTimeout(pauseAnimationTimeoutRef.current)
        }

        // Reset animation after longer duration
        pauseAnimationTimeoutRef.current = setTimeout(() => {
          setShowPauseAnimation(false)
        }, 800) // 800ms smooth animation
      }, [isRunning, currentState, maxTime, progressInterpolator])

      const resume = useCallback(() => {
        if (
          isPausedState &&
          (remainingTime > 0 || currentState !== "countdown")
        ) {
          startTimeRef.current = Date.now()
          setIsRunning(true)
          setIsPausedState(false)
        }
      }, [isPausedState, remainingTime, currentState])

      const isPaused = useCallback(() => {
        return isPausedState
      }, [isPausedState])

      // Call onCycleComplete immediately to provide the timer control functions
      useEffect(() => {
        let isMounted = true
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            onCycleComplete({
              startNewCycle,
              startMeasuring,
              startCountUp,
              setIdle,
              pause,
              resume,
              isPaused,
              completeMeasuring,
            })
          }
        }, 0)

        return () => {
          isMounted = false
          clearTimeout(timeoutId)
        }
      }, [
        onCycleComplete,
        startNewCycle,
        startMeasuring,
        startCountUp,
        setIdle,
        pause,
        resume,
        isPaused,
        completeMeasuring,
      ])

      // Handle error state changes
      useEffect(() => {
        if (hasError) {
          // Error occurred - pause timer if running and remember state
          if (isRunning && !isPausedState) {
            setWasRunningBeforeError(true)
            pause()
          }

          // Trigger brief error animation
          setShowErrorAnimation(true)

          // Clear any existing timeout
          if (errorAnimationTimeoutRef.current) {
            clearTimeout(errorAnimationTimeoutRef.current)
          }

          // Reset animation after longer duration
          errorAnimationTimeoutRef.current = setTimeout(() => {
            setShowErrorAnimation(false)
          }, 600) // 600ms smooth animation
        } else {
          // Error resolved - resume if was running before error
          if (wasRunningBeforeError && isPausedState) {
            setWasRunningBeforeError(false)
            resume()
          }

          // Clear error animation if error is resolved
          setShowErrorAnimation(false)
          if (errorAnimationTimeoutRef.current) {
            clearTimeout(errorAnimationTimeoutRef.current)
          }
        }
      }, [
        hasError,
        isRunning,
        isPausedState,
        wasRunningBeforeError,
        pause,
        resume,
      ])

      useEffect(() => {
        if (isRunning) {
          // Single animation frame loop that handles both time updates and progress
          const updateTimer = () => {
            if (startTimeRef.current) {
              const now = Date.now()
              const elapsed =
                (now - startTimeRef.current + pausedTimeRef.current) / 1000

              if (currentState === "countdown" && maxTime !== null) {
                // Count-down mode
                const remaining = Math.max(0, maxTime - elapsed)
                setRemainingTime(Math.ceil(remaining))

                // Smoothly animate progress based on elapsed time for fluid visual feedback
                const progress = Math.min(100, (elapsed / maxTime) * 100)
                progressInterpolator.setTarget([progress])

                if (remaining <= 0) {
                  setIsRunning(false)
                  startTimeRef.current = null
                  setRemainingTime(0)
                  // Animate to 100% completion with smooth spring transition
                  progressInterpolator.setTarget([100])
                  // Call onCycleEnd when timer reaches zero to notify about completion
                  if (onCycleEnd) {
                    setTimeout(() => onCycleEnd(), 0)
                  }
                  return
                }
              } else if (currentState === "measuring") {
                // Measuring mode: count up with special handling
                setRemainingTime(Math.floor(elapsed))

                // For measuring mode, progress completes every minute (0-100% per minute)
                const progress = ((elapsed / 60) % 1) * 100
                progressInterpolator.setTarget([progress])
              } else if (currentState === "countup") {
                // Count-up mode: simple count up
                setRemainingTime(Math.floor(elapsed))

                // For count-up mode, progress completes every minute (0-100% per minute)
                const progress = ((elapsed / 60) % 1) * 100
                progressInterpolator.setTarget([progress])
              }

              // Continue animation loop while running
              if (isRunning) {
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
      }, [isRunning, onCycleEnd, currentState, maxTime, progressInterpolator])

      // Dedicated animation loop for spring physics interpolation
      // Runs at 60fps to ensure smooth progress animations independent of timer updates
      useEffect(() => {
        let interpolationAnimationId: number | null = null

        const animateInterpolation = () => {
          progressInterpolator.update(1 / 60) // 60fps interpolation
          interpolationAnimationId = requestAnimationFrame(animateInterpolation)
        }

        interpolationAnimationId = requestAnimationFrame(animateInterpolation)

        return () => {
          if (interpolationAnimationId) {
            cancelAnimationFrame(interpolationAnimationId)
          }
        }
      }, [progressInterpolator])

      // Cleanup animation timeouts on unmount
      useEffect(() => {
        return () => {
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
        }
      }, [])

      // Keep interpolator synchronized with static progress when timer is stopped
      // Ensures correct visual state when component initializes or timer stops
      useEffect(() => {
        // Only sync when truly stopped (not when rapidly switching cycles)
        if (!isRunning && !isPausedState && startTimeRef.current === null) {
          if (currentState === "countdown" && maxTime !== null && maxTime > 0) {
            // Count-down mode
            const staticProgress = ((maxTime - remainingTime) / maxTime) * 100
            progressInterpolator.setTarget([staticProgress])
          } else if (
            currentState === "measuring" ||
            currentState === "countup"
          ) {
            // Count-up modes
            const staticProgress = ((remainingTime / 60) % 1) * 100
            progressInterpolator.setTarget([staticProgress])
          } else if (currentState === "idle") {
            // Idle state - no progress
            progressInterpolator.setTarget([0])
          }
        }
      }, [
        isRunning,
        isPausedState,
        currentState,
        maxTime,
        remainingTime,
        progressInterpolator,
      ])

      const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
      }

      // Use interpolated progress value for smooth gauge animations
      const progressValue = currentProgress

      // Small variant: horizontal layout with gauge icon and text or simple text-only
      if (variant === "small") {
        // Simple text-only mode for compact variant in certain states
        if (
          compact &&
          (currentState === "countup" || currentState === "idle")
        ) {
          return (
            <Box
              className={className}
              sx={{
                display: "flex",
                alignItems: "center",
                m: 0,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: hasError
                    ? theme.palette.error.light
                    : theme.palette.text.primary,
                  fontSize: "14px",
                  transition: "color 0.5s ease-out",
                }}
              >
                {hasError
                  ? t("CycleTimer.Error.lb", "Error")
                  : currentState === "idle"
                    ? "0:00" // Simple counter display for idle state
                    : formatTime(remainingTime)}
              </Typography>
            </Box>
          )
        }

        return (
          <Box
            className={className}
            sx={{
              display: "flex",
              alignItems: "center",
              m: 0,
              gap: 1, // 8px gap between circle and text
            }}
          >
            {/* Animated progress ring icon - hidden for simple count-up and idle in compact mode */}
            {!(
              currentState === "countup" ||
              (currentState === "idle" && compact)
            ) && (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: showPauseAnimation || showErrorAnimation ? 0.6 : 1,
                  transition: "opacity 0.5s ease-out",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  style={{ transform: "rotate(-90deg)" }}
                  role="img"
                  aria-label="Timer progress"
                >
                  {/* Background ring */}
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke={
                      hasError
                        ? theme.palette.error.light
                        : currentState === "measured"
                          ? pulsatingFinished
                            ? theme.palette.text.secondary
                            : showPulsatingText
                              ? theme.palette.success.main
                              : theme.palette.text.secondary
                          : theme.palette.success.main
                    }
                    strokeWidth="2"
                    opacity={0.3}
                    style={{
                      transition: "stroke 0.8s ease-in-out",
                    }}
                  />
                  {/* Progress ring */}
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke={
                      hasError
                        ? theme.palette.error.light
                        : currentState === "measured"
                          ? pulsatingFinished
                            ? theme.palette.text.secondary
                            : showPulsatingText
                              ? theme.palette.success.main
                              : theme.palette.text.secondary
                          : theme.palette.success.main
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 8}`}
                    strokeDashoffset={`${2 * Math.PI * 8 * (1 - (currentState === "idle" ? 0 : progressValue) / 100)}`}
                    style={{
                      transition:
                        "stroke-dashoffset 0.1s ease-out, stroke 0.8s ease-in-out",
                    }}
                  />
                </svg>
              </Box>
            )}

            {/* Timer text display */}
            <Typography
              variant="body2"
              sx={{
                color: hasError
                  ? theme.palette.error.light
                  : currentState === "idle"
                    ? "rgba(255, 255, 255, 0.7)" // Secondary color for idle state
                    : currentState === "measured"
                      ? pulsatingFinished
                        ? theme.palette.text.secondary
                        : showPulsatingText
                          ? theme.palette.success.main
                          : theme.palette.text.secondary
                      : theme.palette.text.primary,
                fontSize: currentState === "idle" ? "12px" : "14px", // Smaller font for idle state
                lineHeight: currentState === "idle" ? "166%" : "normal", // Match CSS line-height
                letterSpacing: currentState === "idle" ? "0.17px" : "normal", // Match CSS letter-spacing
                transition: "color 0.8s ease-in-out, font-size 0.3s ease-out", // Match pulsing transition
              }}
            >
              {hasError
                ? t("CycleTimer.Error.lb", "Error")
                : currentState === "idle"
                  ? t(
                      "CycleTimer.WaitingForCycle.lb",
                      "Waiting for program cycle",
                    )
                  : currentState === "measuring"
                    ? compact
                      ? `${formatTime(remainingTime)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
                      : `${formatTime(remainingTime)} / ${t("CycleTimer.Measuring.lb", "measuring...")}`
                    : currentState === "measured"
                      ? compact
                        ? `${formatTime(remainingTime)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
                        : `${formatTime(remainingTime)} / ${t("CycleTimer.Determined.lb", "determined")}`
                      : currentState === "countdown" && maxTime !== null
                        ? // Count-down mode: show remaining time
                          compact
                          ? // Compact mode: show remaining time with "min." suffix
                            `${formatTime(remainingTime)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
                          : // Full mode: show "remaining / of total min." format
                            `${formatTime(remainingTime)} / ${t("CycleTimer.Time.lb", { time: formatTime(maxTime) })}`
                        : // Count-up mode: show elapsed time only
                          formatTime(remainingTime)}
            </Typography>
          </Box>
        )
      }

      // Default variant: large circular gauge with centered content
      return (
        <Box
          className={className}
          sx={{
            position: "relative",
            width: 264,
            height: 264,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Gauge
            width={264}
            height={264}
            value={currentState === "idle" ? 0 : progressValue}
            valueMin={0}
            valueMax={100}
            innerRadius={currentState === "idle" ? "75%" : "76%"}
            outerRadius="90%"
            skipAnimation={true}
            text={() => ""} // Hide the gauge text for all states since we handle it ourselves
            sx={{
              opacity: showPauseAnimation || showErrorAnimation ? 0.6 : 1,
              transition: "opacity 0.5s ease-out",
              [`& .MuiGauge-valueArc`]: {
                fill: hasError
                  ? theme.palette.error.light
                  : theme.palette.success.main,
                transition: "fill 0.5s ease-out",
              },
              [`& .MuiGauge-referenceArc`]: {
                fill: currentState === "idle" ? "#292B3F" : "white",
                stroke: currentState === "idle" ? "#181927" : "transparent",
                strokeWidth: currentState === "idle" ? 2 : 0,
                transition:
                  "fill 0.5s ease-out, stroke 0.5s ease-out, stroke-width 0.5s ease-out",
              },
              // Hide any gauge text elements
              [`& .MuiGauge-valueText`]: {
                display: "none",
              },
              [`& .MuiGauge-text`]: {
                display: "none",
              },
            }}
          />

          {/* Center content overlay with timer information */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 200, // 71% of 264 = ~187px inner radius
              height: 200, // 71% of 264 = ~187px inner radius
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,
              transition: "background-color 0.5s ease-out",
            }}
          >
            {/* Top label - context-sensitive based on state */}
            <Box
              sx={{
                height: "16px", // Fixed height to prevent layout shift
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0.5,
              }}
            >
              <Fade
                in={
                  showLabels &&
                  !hasError &&
                  currentState !== "idle" &&
                  currentState !== "countup" &&
                  !(currentState === "success") // Fade out during success state
                }
                timeout={200}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    color:
                      currentState === "measured"
                        ? pulsatingFinished
                          ? theme.palette.text.secondary // Secondary color after pulsating finishes
                          : showPulsatingText
                            ? theme.palette.success.main
                            : theme.palette.text.secondary // Secondary color during pulse (not white)
                        : theme.palette.text.secondary,
                    transition: "color 0.8s ease-in-out", // Longer, smoother interpolation
                  }}
                >
                  {currentState === "measuring"
                    ? t("CycleTimer.CycleTime.lb", "Cycle Time")
                    : currentState === "measured"
                      ? t("CycleTimer.CycleTime.lb", "Cycle Time")
                      : currentState === "countdown"
                        ? t("CycleTimer.RemainingTime.lb", "Remaining Time")
                        : ""}
                </Typography>
              </Fade>
            </Box>

            {/* Main display - switches between different states */}
            <Box
              sx={{
                position: "relative",
                height: "48px", // Fixed height to prevent layout shift
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0.5,
              }}
            >
              {/* Idle state text - smaller, single line, secondary color */}
              <Fade
                in={showMainText && currentState === "idle" && !hasError}
                timeout={200}
              >
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "rgba(255, 255, 255, 0.7)", // Secondary color as specified
                    lineHeight: "166%", // 20px line height as specified
                    letterSpacing: "0.17px",
                    textAlign: "center",
                    width: "150px", // Width as specified in CSS
                    height: "20px", // Height as specified
                  }}
                >
                  {t(
                    "CycleTimer.WaitingForCycle.lb",
                    "Waiting for program cycle",
                  )}
                </Typography>
              </Fade>

              {/* Error text */}
              <Fade in={showMainText && hasError} timeout={200}>
                <Typography
                  variant="h3"
                  sx={{
                    position: "absolute",
                    fontSize: "40px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    lineHeight: "116.7%",
                  }}
                >
                  {t("CycleTimer.Error.lb", "Error")}
                </Typography>
              </Fade>

              {/* Normal timer text */}
              <Fade
                in={
                  showMainText &&
                  !hasError &&
                  currentState !== "idle" &&
                  !(currentState === "success")
                }
                timeout={200}
              >
                <Typography
                  variant="h1"
                  sx={{
                    position: "absolute",
                    fontSize: "48px",
                    fontWeight: 500,
                    color:
                      currentState === "measured"
                        ? theme.palette.text.primary // Keep white in measured state
                        : theme.palette.text.primary,
                    lineHeight: 1,
                    transition: "color 0.5s ease-out",
                  }}
                >
                  {formatTime(remainingTime)}
                </Typography>
              </Fade>
            </Box>

            {/* Bottom label - context-sensitive based on state */}
            <Box
              sx={{
                height: "16px", // Fixed height to prevent layout shift
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fade
                in={
                  showLabels &&
                  !hasError &&
                  currentState !== "idle" &&
                  currentState !== "countup" &&
                  !(currentState === "success") // Fade out during success state
                }
                timeout={200}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    color:
                      currentState === "measured"
                        ? pulsatingFinished
                          ? theme.palette.text.secondary // Secondary color after pulsating finishes
                          : showPulsatingText
                            ? theme.palette.success.main
                            : theme.palette.text.secondary // Secondary color during pulse (not white)
                        : theme.palette.text.secondary,
                    transition: "color 0.8s ease-in-out", // Longer, smoother interpolation
                  }}
                >
                  {currentState === "measuring"
                    ? t("CycleTimer.Measuring.lb", "measuring...")
                    : currentState === "measured"
                      ? t("CycleTimer.Determined.lb", "determined")
                      : currentState === "countdown" && maxTime !== null
                        ? t("CycleTimer.OfTime.lb", {
                            time: formatTime(maxTime),
                          })
                        : ""}
                </Typography>
              </Fade>
            </Box>
          </Box>
        </Box>
      )
    },
  ),
)
