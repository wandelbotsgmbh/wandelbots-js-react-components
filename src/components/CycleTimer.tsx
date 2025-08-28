import { Box, Fade, Typography, useTheme } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"
import { useInterpolation } from "./utils/interpolation"

export interface CycleTimerProps {
  /**
   * Callback that receives the timer control functions:
   * - `startNewCycle(maxTimeSeconds?, elapsedSeconds?)` - Start a new timer cycle (if maxTimeSeconds is omitted, runs as count-up timer)
   * - `pause()` - Pause the countdown while preserving remaining time
   * - `resume()` - Resume countdown from where it was paused
   * - `isPaused()` - Check current pause state
   */
  onCycleComplete: (controls: {
    startNewCycle: (maxTimeSeconds?: number, elapsedSeconds?: number) => void
    pause: () => void
    resume: () => void
    isPaused: () => boolean
  }) => void
  /** Callback fired when a cycle actually completes (reaches zero) */
  onCycleEnd?: () => void
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
 * - Circular gauge with 264px diameter and 40px thickness
 * - Two modes: count-down (with max time) or count-up (without max time)
 * - Count-down mode: shows remaining time prominently, counts down to zero
 * - Count-up mode: shows elapsed time, gauge progresses in minute steps
 * - Displays appropriate labels based on mode
 * - Automatically counts down/up and triggers callback when reaching zero (count-down only)
 * - Full timer control: start, pause, resume functionality
 * - Support for starting with elapsed time (resume mid-cycle)
 * - Error state support: pauses timer and shows error styling (red color)
 * - Smooth spring-based progress animations for all state transitions
 * - Fully localized with i18next
 * - Material-UI theming integration
 * - Small variant with animated progress icon (gauge border only) next to text
 *
 * @param onCycleComplete - Callback that receives timer control functions
 * @param onCycleEnd - Optional callback fired when a cycle actually completes (reaches zero)
 * @param autoStart - Whether to start timer automatically (default: true)
 * @param variant - Visual variant: "default" (large gauge) or "small" (animated icon with text)
 * @param compact - For small variant: whether to hide remaining time details
 * @param className - Additional CSS classes
 * @param hasError - Whether the timer is in an error state (pauses timer and shows error styling)
 *
 * Usage:
 * ```tsx
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
 * // Count-up timer (no max time)
 * <CycleTimer
 *   onCycleComplete={(controls) => {
 *     // Start count-up timer
 *     controls.startNewCycle()
 *
 *     // Or start count-up timer with some elapsed time
 *     controls.startNewCycle(undefined, 120)
 *   }}
 * />
 *
 * // Timer with error state
 * <CycleTimer
 *   hasError={errorCondition}
 *   onCycleComplete={(controls) => {
 *     controls.startNewCycle(300)
 *   }}
 * />
 * ```
 *
 * Control Functions:
 * - `startNewCycle(maxTimeSeconds?, elapsedSeconds?)` - Start a new timer cycle (omit maxTimeSeconds for count-up mode)
 * - `pause()` - Pause the countdown while preserving remaining time
 * - `resume()` - Resume countdown from where it was paused
 * - `isPaused()` - Check current pause state
 */
export const CycleTimer = externalizeComponent(
  observer(
    ({
      onCycleComplete,
      onCycleEnd,
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
      const [isRunning, setIsRunning] = useState(false)
      const [isPausedState, setIsPausedState] = useState(false)
      const [currentProgress, setCurrentProgress] = useState(0)
      const animationRef = useRef<number | null>(null)
      const startTimeRef = useRef<number | null>(null)
      const pausedTimeRef = useRef<number>(0)
      const [wasRunningBeforeError, setWasRunningBeforeError] = useState(false)

      // Brief animation states for pause and error visual feedback
      const [showPauseAnimation, setShowPauseAnimation] = useState(false)
      const [showErrorAnimation, setShowErrorAnimation] = useState(false)
      const pauseAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
      const errorAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

      // Track mode changes for fade transitions
      const [showLabels, setShowLabels] = useState(true)
      const prevMaxTimeRef = useRef<number | null | undefined>(undefined)

      // Spring-based interpolator for smooth gauge progress animations
      // Uses physics simulation to create natural, smooth transitions between progress values
      const [progressInterpolator] = useInterpolation([0], {
        tension: 80, // Higher values = faster, more responsive animations
        friction: 18, // Higher values = more damping, less bouncy animations
        onChange: ([progress]) => {
          setCurrentProgress(progress)
        },
      })

      // Handle mode changes with fade transitions for labels only
      useEffect(() => {
        const currentIsCountUp = maxTime === null
        const prevMaxTime = prevMaxTimeRef.current
        const prevIsCountUp = prevMaxTime === null

        // Check if mode actually changed (not just first render)
        if (
          prevMaxTimeRef.current !== undefined &&
          prevIsCountUp !== currentIsCountUp
        ) {
          // Mode changed - labels will fade based on the Fade component conditions
          // We just need to ensure showLabels is true so Fade can control visibility
          setShowLabels(true)
        } else {
          // No mode change or first time - set initial state
          setShowLabels(true)
        }

        prevMaxTimeRef.current = maxTime
      }, [maxTime])

      const startNewCycle = useCallback(
        (maxTimeSeconds?: number, elapsedSeconds: number = 0) => {
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

            // Animate progress smoothly to starting position
            const initialProgress =
              elapsedSeconds > 0 ? (elapsedSeconds / maxTimeSeconds) * 100 : 0
            if (elapsedSeconds === 0) {
              progressInterpolator.setTarget([0])
            } else {
              progressInterpolator.setTarget([initialProgress])
            }

            if (remainingSeconds === 0) {
              setIsRunning(false)
              startTimeRef.current = null
              // Trigger completion callback immediately if time is already up
              if (onCycleEnd) {
                setTimeout(() => onCycleEnd(), 0)
              }
            } else if (autoStart) {
              startTimeRef.current = Date.now() - elapsedSeconds * 1000
              setIsRunning(true)
            } else {
              startTimeRef.current = null
            }
          } else {
            // Count-up mode: start from elapsed time
            setRemainingTime(elapsedSeconds)

            // For count-up mode, progress is based on minute steps
            const initialProgress = ((elapsedSeconds / 60) % 1) * 100
            progressInterpolator.setTarget([initialProgress])

            if (autoStart) {
              startTimeRef.current = Date.now() - elapsedSeconds * 1000
              setIsRunning(true)
            } else {
              startTimeRef.current = null
            }
          }
        },
        [autoStart, onCycleEnd, progressInterpolator],
      )

      const pause = useCallback(() => {
        if (startTimeRef.current && isRunning) {
          const now = Date.now()
          const additionalElapsed = now - startTimeRef.current
          pausedTimeRef.current += additionalElapsed

          // Calculate exact progress position and smoothly animate to it when pausing
          // This ensures the visual progress matches the actual elapsed time
          const totalElapsed = pausedTimeRef.current / 1000

          if (maxTime !== null) {
            // Count-down mode
            const exactProgress = Math.min(100, (totalElapsed / maxTime) * 100)
            progressInterpolator.setTarget([exactProgress])
          } else {
            // Count-up mode: progress based on minute steps
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
      }, [isRunning, maxTime, progressInterpolator])

      const resume = useCallback(() => {
        if (isPausedState && remainingTime > 0) {
          startTimeRef.current = Date.now()
          setIsRunning(true)
          setIsPausedState(false)
        }
      }, [isPausedState, remainingTime])

      const isPaused = useCallback(() => {
        return isPausedState
      }, [isPausedState])

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

      // Call onCycleComplete immediately to provide the timer control functions
      useEffect(() => {
        let isMounted = true
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            onCycleComplete({
              startNewCycle,
              pause,
              resume,
              isPaused,
            })
          }
        }, 0)

        return () => {
          isMounted = false
          clearTimeout(timeoutId)
        }
      }, [onCycleComplete, startNewCycle, pause, resume, isPaused])

      useEffect(() => {
        if (isRunning) {
          // Single animation frame loop that handles both time updates and progress
          const updateTimer = () => {
            if (startTimeRef.current) {
              const now = Date.now()
              const elapsed =
                (now - startTimeRef.current + pausedTimeRef.current) / 1000

              if (maxTime !== null) {
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
              } else {
                // Count-up mode
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
      }, [isRunning, onCycleEnd, maxTime, progressInterpolator])

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
        }
      }, [])

      // Keep interpolator synchronized with static progress when timer is stopped
      // Ensures correct visual state when component initializes or timer stops
      useEffect(() => {
        if (!isRunning && !isPausedState) {
          if (maxTime !== null && maxTime > 0) {
            // Count-down mode
            const staticProgress = ((maxTime - remainingTime) / maxTime) * 100
            progressInterpolator.setTarget([staticProgress])
          } else if (maxTime === null) {
            // Count-up mode
            const staticProgress = ((remainingTime / 60) % 1) * 100
            progressInterpolator.setTarget([staticProgress])
          }
        }
      }, [
        isRunning,
        isPausedState,
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

      // Small variant: horizontal layout with gauge icon and text
      if (variant === "small") {
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
            {/* Animated progress ring icon */}
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
                      : theme.palette.success.main
                  }
                  strokeWidth="2"
                  opacity={0.3}
                  style={{
                    transition: "stroke 0.5s ease-out",
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
                      : theme.palette.success.main
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 8}`}
                  strokeDashoffset={`${2 * Math.PI * 8 * (1 - progressValue / 100)}`}
                  style={{
                    transition:
                      "stroke-dashoffset 0.1s ease-out, stroke 0.5s ease-out",
                  }}
                />
              </svg>
            </Box>

            {/* Timer text display */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "14px",
              }}
            >
              {maxTime !== null
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
            value={progressValue}
            valueMin={0}
            valueMax={100}
            innerRadius="71%"
            outerRadius="90%"
            skipAnimation={true}
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
                fill: "white",
                stroke: "transparent",
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
              width: 187, // 71% of 264 = ~187px inner radius
              height: 187,
              borderRadius: "50%",
              backgroundColor: theme.palette.backgroundPaperElevation?.[8],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,
            }}
          >
            {/* "remaining time" label - always reserves space to prevent layout shift */}
            <Box
              sx={{
                height: "16px", // Fixed height to prevent layout shift
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 0.5,
              }}
            >
              <Fade in={showLabels && maxTime !== null} timeout={300}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {t("CycleTimer.RemainingTime.lb")}
                </Typography>
              </Fade>
            </Box>

            {/* Main timer display - never fades, always visible */}
            <Typography
              variant="h1"
              sx={{
                fontSize: "48px",
                fontWeight: 500,
                color: theme.palette.text.primary,
                lineHeight: 1,
                marginBottom: 0.5,
              }}
            >
              {formatTime(remainingTime)}
            </Typography>

            {/* Total time display - always reserves space to prevent layout shift */}
            <Box
              sx={{
                height: "16px", // Fixed height to prevent layout shift
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fade in={showLabels && maxTime !== null} timeout={300}>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "12px",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {maxTime !== null
                    ? t("CycleTimer.OfTime.lb", { time: formatTime(maxTime) })
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
