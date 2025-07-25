import { Box, Typography, useTheme } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"
import { useInterpolation } from "./utils/interpolation"

export interface CycleTimerProps {
  /**
   * Callback that receives the timer control functions:
   * - `startNewCycle(maxTimeSeconds, elapsedSeconds?)` - Start a new timer cycle
   * - `pause()` - Pause the countdown while preserving remaining time
   * - `resume()` - Resume countdown from where it was paused
   * - `isPaused()` - Check current pause state
   */
  onCycleComplete: (controls: {
    startNewCycle: (maxTimeSeconds: number, elapsedSeconds?: number) => void
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
}

/**
 * A circular gauge timer component that shows the remaining time of a cycle
 *
 * Features:
 * - Circular gauge with 264px diameter and 40px thickness
 * - Shows remaining time prominently in the center (60px font)
 * - Displays "remaining time" label at top and total time at bottom
 * - Automatically counts down and triggers callback when reaching zero
 * - Full timer control: start, pause, resume functionality
 * - Support for starting with elapsed time (resume mid-cycle)
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
 *
 * Usage:
 * ```tsx
 * <CycleTimer
 *   onCycleComplete={(controls) => {
 *     // Start a 5-minute cycle
 *     controls.startNewCycle(300)
 *
 *     // Or start a 5-minute cycle with 2 minutes already elapsed
 *     controls.startNewCycle(300, 120)
 *
 *     // Pause the timer
 *     controls.pause()
 *
 *     // Resume the timer
 *     controls.resume()
 *
 *     // Check if paused
 *     const paused = controls.isPaused()
 *   }}
 *   onCycleEnd={() => console.log('Cycle completed!')}
 * />
 * ```
 *
 * Control Functions:
 * - `startNewCycle(maxTimeSeconds, elapsedSeconds?)` - Start a new timer cycle
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
    }: CycleTimerProps) => {
      const theme = useTheme()
      const { t } = useTranslation()
      const [remainingTime, setRemainingTime] = useState(0)
      const [maxTime, setMaxTime] = useState(0)
      const [isRunning, setIsRunning] = useState(false)
      const [isPausedState, setIsPausedState] = useState(false)
      const [currentProgress, setCurrentProgress] = useState(0)
      const animationRef = useRef<number | null>(null)
      const startTimeRef = useRef<number | null>(null)
      const pausedTimeRef = useRef<number>(0)

      // Spring-based interpolator for smooth gauge progress animations
      // Uses physics simulation to create natural, smooth transitions between progress values
      const [progressInterpolator] = useInterpolation([0], {
        tension: 80, // Higher values = faster, more responsive animations
        friction: 18, // Higher values = more damping, less bouncy animations
        onChange: ([progress]) => {
          setCurrentProgress(progress)
        },
      })

      const startNewCycle = useCallback(
        (maxTimeSeconds: number, elapsedSeconds: number = 0) => {
          setMaxTime(maxTimeSeconds)
          const remainingSeconds = Math.max(0, maxTimeSeconds - elapsedSeconds)
          setRemainingTime(remainingSeconds)
          setIsPausedState(false)
          pausedTimeRef.current = 0

          // Animate progress smoothly to starting position
          // For new cycles (no elapsed time), animate from current position to 0%
          // For resumed cycles, animate to the appropriate progress percentage
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
          const exactProgress = Math.min(100, (totalElapsed / maxTime) * 100)
          progressInterpolator.setTarget([exactProgress])
        }
        setIsRunning(false)
        setIsPausedState(true)
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
            if (startTimeRef.current && maxTime > 0) {
              const now = Date.now()
              const elapsed =
                (now - startTimeRef.current + pausedTimeRef.current) / 1000
              const remaining = Math.max(0, maxTime - elapsed)

              // Update remaining time based on timestamp calculation
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

      // Keep interpolator synchronized with static progress when timer is stopped
      // Ensures correct visual state when component initializes or timer stops
      useEffect(() => {
        if (!isRunning && !isPausedState && maxTime > 0) {
          const staticProgress = ((maxTime - remainingTime) / maxTime) * 100
          progressInterpolator.setTarget([staticProgress])
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
              gap: 0.125, // Minimal gap - 1px
            }}
          >
            {/* Animated progress gauge icon */}
            <Box
              sx={{
                position: "relative",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                overflow: "visible",
              }}
            >
              <Gauge
                width={40}
                height={40}
                value={progressValue}
                valueMin={0}
                valueMax={100}
                innerRadius="70%"
                outerRadius="95%"
                skipAnimation={true}
                sx={{
                  opacity: isPausedState ? 0.6 : 1,
                  transition: "opacity 0.2s ease",
                  [`& .MuiGauge-valueArc`]: {
                    fill: theme.palette.success.main,
                  },
                  [`& .MuiGauge-referenceArc`]: {
                    fill: theme.palette.success.main,
                    opacity: 0.3,
                  },
                  [`& .MuiGauge-valueText`]: {
                    display: "none",
                  },
                  [`& .MuiGauge-text`]: {
                    display: "none",
                  },
                  [`& text`]: {
                    display: "none",
                  },
                  // Hide any inner circle elements that might flash
                  [`& .MuiGauge-referenceArcBackground`]: {
                    display: "none",
                  },
                  [`& .MuiGauge-valueArcBackground`]: {
                    display: "none",
                  },
                  [`& circle`]: {
                    display: "none",
                  },
                }}
              />

              {/* Inner circle overlay to prevent flashing */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.background?.paper || "white",
                  pointerEvents: "none",
                }}
              />
            </Box>

            {/* Timer text display */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                fontSize: "14px",
              }}
            >
              {compact
                ? // Compact mode: show only remaining time
                  formatTime(remainingTime)
                : // Full mode: show "remaining / of total min." format
                  `${formatTime(remainingTime)} / ${t("CycleTimer.Time.lb", { time: formatTime(maxTime) })}`}
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
              opacity: isPausedState ? 0.6 : 1,
              transition: "opacity 0.2s ease",
              [`& .MuiGauge-valueArc`]: {
                fill: theme.palette.success.main,
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
            {/* "remaining time" label */}
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: theme.palette.text.secondary,
                marginBottom: 0.5,
              }}
            >
              {t("CycleTimer.RemainingTime.lb")}
            </Typography>

            {/* Main timer display */}
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

            {/* Total time display */}
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: theme.palette.text.secondary,
              }}
            >
              {t("CycleTimer.OfTime.lb", { time: formatTime(maxTime) })}
            </Typography>
          </Box>
        </Box>
      )
    },
  ),
)
