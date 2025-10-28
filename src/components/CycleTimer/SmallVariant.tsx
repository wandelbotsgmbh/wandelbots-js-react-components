import { Box, Typography, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import type { AnimationState, TimerState } from "./types"
import { formatTimeLocalized } from "./utils"

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
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const { currentState, remainingTime, maxTime } = timerState
  const {
    showErrorAnimation,
    showPauseAnimation,
    showPulsatingText,
    pulsatingFinished,
    showIdlePulsating,
    idleDotsCount,
  } = animationState

  // Simple text-only mode for compact variant in certain states
  if (compact && currentState === "idle") {
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
              ? "0s"
              : formatTimeLocalized(remainingTime, i18n.language)}
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
      {!(currentState === "idle" && compact) && (
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
                    ? showPulsatingText || pulsatingFinished
                      ? theme.palette.success.main
                      : theme.palette.text.secondary
                    : theme.palette.success.main
              }
              strokeWidth="2"
              opacity={
                currentState === "measured" && pulsatingFinished
                  ? showPulsatingText
                    ? 1
                    : 0.6
                  : 0.3
              }
              style={{
                transition: "stroke 0.8s ease-in-out, opacity 2s ease-in-out",
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
                    ? showPulsatingText || pulsatingFinished
                      ? theme.palette.success.main
                      : theme.palette.text.secondary
                    : theme.palette.success.main
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 8}`}
              strokeDashoffset={`${2 * Math.PI * 8 * (1 - (currentState === "idle" ? 0 : timerState.currentProgress) / 100)}`}
              style={{
                opacity:
                  currentState === "measured" && pulsatingFinished
                    ? showPulsatingText
                      ? 1
                      : 0.6
                    : 1,
                transition:
                  "stroke-dashoffset 0.1s ease-out, stroke 0.8s ease-in-out, opacity 2s ease-in-out",
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
                ? showPulsatingText || pulsatingFinished
                  ? theme.palette.success.main
                  : theme.palette.text.secondary
                : theme.palette.text.primary,
          fontSize: "14px",
          lineHeight: "normal",
          letterSpacing: "normal",
          opacity:
            currentState === "idle"
              ? showIdlePulsating
                ? 1
                : 0.6
              : currentState === "measured" && pulsatingFinished
                ? showPulsatingText
                  ? 1
                  : 0.6
                : 1,
          transition:
            "color 0.8s ease-in-out, font-size 0.3s ease-out, opacity 2s ease-in-out",
        }}
      >
        {hasError ? (
          t("CycleTimer.Error.lb", "Error")
        ) : currentState === "idle" ? (
          <>
            <span>
              {t("CycleTimer.WaitingForCycle.lb", "Waiting for program cycle")}
            </span>
            <span
              style={{
                display: "inline-block",
                width: "18px",
                textAlign: "left",
              }}
            >
              {".".repeat(idleDotsCount)}
            </span>
          </>
        ) : currentState === "measuring" ? (
          compact ? (
            `${formatTimeLocalized(remainingTime, i18n.language)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
          ) : (
            `${formatTimeLocalized(remainingTime, i18n.language)} / ${t("CycleTimer.Measuring.lb", "measuring...")}`
          )
        ) : currentState === "measured" ? (
          compact ? (
            `${formatTimeLocalized(remainingTime, i18n.language)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
          ) : (
            `${formatTimeLocalized(remainingTime, i18n.language)} / ${t("CycleTimer.Determined.lb", "determined")}`
          )
        ) : currentState === "countdown" && maxTime !== null ? (
          compact ? (
            `${formatTimeLocalized(remainingTime, i18n.language)} ${t("CycleTimer.Time.lb", { time: "" }).replace(/\s*$/, "")}`
          ) : (
            `${formatTimeLocalized(remainingTime, i18n.language)} / ${t("CycleTimer.Time.lb", { time: formatTimeLocalized(maxTime, i18n.language) })}`
          )
        ) : (
          formatTimeLocalized(remainingTime, i18n.language)
        )}
      </Typography>
    </Box>
  )
}
