import { Box, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { AnimationState, TimerState } from "./types"
import { formatTime } from "./utils"

interface SmallVariantProps {
  timerState: TimerState
  animationState: AnimationState
  hasError: boolean
  compact: boolean
  className?: string
}

export const SmallVariant = ({
  timerState,
  animationState,
  hasError,
  compact,
  className,
}: SmallVariantProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { currentState, remainingTime, maxTime } = timerState
  const {
    showErrorAnimation,
    showPauseAnimation,
    showPulsatingText,
    pulsatingFinished,
  } = animationState

  // Simple text-only mode for compact variant in certain states
  if (compact && (currentState === "countup" || currentState === "idle")) {
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
              ? "0:00"
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
        gap: 1,
      }}
    >
      {/* Animated progress ring icon */}
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
              strokeDashoffset={`${2 * Math.PI * 8 * (1 - (currentState === "idle" ? 0 : timerState.currentProgress) / 100)}`}
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
              ? "rgba(255, 255, 255, 0.7)"
              : currentState === "measured"
                ? pulsatingFinished
                  ? theme.palette.text.secondary
                  : showPulsatingText
                    ? theme.palette.success.main
                    : theme.palette.text.secondary
                : theme.palette.text.primary,
          fontSize: currentState === "idle" ? "12px" : "14px",
          lineHeight: currentState === "idle" ? "166%" : "normal",
          letterSpacing: currentState === "idle" ? "0.17px" : "normal",
          transition: "color 0.8s ease-in-out, font-size 0.3s ease-out",
        }}
      >
        {hasError
          ? t("CycleTimer.Error.lb", "Error")
          : currentState === "idle"
            ? t("CycleTimer.WaitingForCycle.lb", "Waiting for program cycle")
            : currentState === "measuring"
              ? compact
                ? `${formatTime(remainingTime)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
                : `${formatTime(remainingTime)} / ${t("CycleTimer.Measuring.lb", "measuring...")}`
              : currentState === "measured"
                ? compact
                  ? `${formatTime(remainingTime)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
                  : `${formatTime(remainingTime)} / ${t("CycleTimer.Determined.lb", "determined")}`
                : currentState === "countdown" && maxTime !== null
                  ? compact
                    ? `${formatTime(remainingTime)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
                    : `${formatTime(remainingTime)} / ${t("CycleTimer.Time.lb", { time: formatTime(maxTime) })}`
                  : formatTime(remainingTime)}
      </Typography>
    </Box>
  )
}
