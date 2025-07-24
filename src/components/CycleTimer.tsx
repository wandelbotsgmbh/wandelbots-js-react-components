import { Box, Typography, useTheme } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import { observer } from "mobx-react-lite"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"

export interface CycleTimerProps {
  /** Callback that receives the startNewCycle function for controlling the timer */
  onCycleComplete: (startNewCycle: (maxTimeSeconds: number) => void) => void
  /** Callback fired when a cycle actually completes (reaches zero) */
  onCycleEnd?: () => void
  /** Whether the timer should start automatically when maxTime is set */
  autoStart?: boolean
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
 * - Fully localized with i18next
 * - Material-UI theming integration
 *
 * @param onCycleComplete - Callback that receives the startNewCycle function for controlling the timer
 * @param onCycleEnd - Optional callback fired when a cycle actually completes (reaches zero)
 * @param autoStart - Whether to start timer automatically (default: true)
 * @param className - Additional CSS classes
 */
export const CycleTimer = externalizeComponent(
  observer(
    ({
      onCycleComplete,
      onCycleEnd,
      autoStart = true,
      className,
    }: CycleTimerProps) => {
      const theme = useTheme()
      const { t } = useTranslation()
      const [remainingTime, setRemainingTime] = useState(0)
      const [maxTime, setMaxTime] = useState(0)
      const [isRunning, setIsRunning] = useState(false)
      const intervalRef = useRef<NodeJS.Timeout | null>(null)

      const startNewCycle = useCallback(
        (maxTimeSeconds: number) => {
          console.log(`Starting new cycle with ${maxTimeSeconds} seconds`)
          setMaxTime(maxTimeSeconds)
          setRemainingTime(maxTimeSeconds)
          if (autoStart) {
            console.log("Auto-start enabled, starting timer")
            setIsRunning(true)
          } else {
            console.log("Auto-start disabled, timer set but not started")
          }
        },
        [autoStart],
      )

      // Call onCycleComplete immediately to provide the startNewCycle function
      useEffect(() => {
        let isMounted = true
        const timeoutId = setTimeout(() => {
          if (isMounted) {
            onCycleComplete(startNewCycle)
          }
        }, 0)

        return () => {
          isMounted = false
          clearTimeout(timeoutId)
        }
      }, [onCycleComplete, startNewCycle])

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

          {/* Center content overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 187, // 71% of 264 = ~187px inner radius
              height: 187,
              borderRadius: "50%",
              backgroundColor: theme.palette.backgroundPaperElevation?.[8], // background/paper-elevation-8
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

            {/* Total time at bottom */}
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color: theme.palette.text.secondary,
              }}
            >
              {t("CycleTimer.Of.lb")} {formatTime(maxTime)}{" "}
              {t("CycleTimer.Min.lb")}
            </Typography>
          </Box>
        </Box>
      )
    },
  ),
)
