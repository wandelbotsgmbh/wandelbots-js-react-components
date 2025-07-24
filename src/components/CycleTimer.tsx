import { Box, Typography, useTheme } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"

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
      const intervalRef = useRef<NodeJS.Timeout | null>(null)

      const startNewCycle = useCallback(
        (maxTimeSeconds: number, elapsedSeconds: number = 0) => {
          console.log(
            `Starting new cycle with ${maxTimeSeconds} seconds (${elapsedSeconds} seconds already elapsed)`,
          )
          setMaxTime(maxTimeSeconds)
          const remainingSeconds = Math.max(0, maxTimeSeconds - elapsedSeconds)
          setRemainingTime(remainingSeconds)
          setIsPausedState(false)

          if (remainingSeconds === 0) {
            console.log("Cycle already completed (elapsed time >= max time)")
            setIsRunning(false)
            // Trigger completion callback immediately if time is already up
            if (onCycleEnd) {
              setTimeout(() => onCycleEnd(), 0)
            }
          } else if (autoStart) {
            console.log("Auto-start enabled, starting timer")
            setIsRunning(true)
          } else {
            console.log("Auto-start disabled, timer set but not started")
          }
        },
        [autoStart, onCycleEnd],
      )

      const pause = useCallback(() => {
        console.log("Pausing timer")
        setIsRunning(false)
        setIsPausedState(true)
      }, [])

      const resume = useCallback(() => {
        if (isPausedState && remainingTime > 0) {
          console.log("Resuming timer")
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
        if (isRunning && remainingTime > 0) {
          intervalRef.current = setInterval(() => {
            setRemainingTime((prev) => {
              if (prev <= 1) {
                setIsRunning(false)
                // Call onCycleEnd when timer reaches zero to notify about completion
                if (onCycleEnd) {
                  setTimeout(() => onCycleEnd(), 0)
                }
                console.log("Cycle completed! Timer reached zero.")
                return 0
              }
              return prev - 1
            })
          }, 1000)
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }

        return () => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
        }
      }, [isRunning, remainingTime, onCycleEnd])

      const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
      }

      const progressValue =
        maxTime > 0 ? ((maxTime - remainingTime) / maxTime) * 100 : 0

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
                sx={{
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
                  `${formatTime(remainingTime)} / ${t("CycleTimer.OfTime.lb", { time: formatTime(maxTime) })}`}
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
            sx={{
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
