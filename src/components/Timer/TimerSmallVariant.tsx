import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import type { TimerState, TimerAnimationState } from "./types"
import { formatTime } from "./utils"

interface TimerSmallVariantProps {
  timerState: TimerState
  animationState: TimerAnimationState
  hasError: boolean
  compact: boolean
  className?: string
}

export const TimerSmallVariant = ({
  timerState,
  animationState,
  hasError,
  compact,
  className,
}: TimerSmallVariantProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { elapsedTime, currentProgress } = timerState
  const { showErrorAnimation, showPauseAnimation } = animationState

  // Simple text-only mode for compact variant
  if (compact) {
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
          {hasError ? t("timer.error") : formatTime(elapsedTime)}
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
              transition: "stroke 0.8s ease-in-out, opacity 2s ease-in-out",
            }}
          />
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
            strokeDashoffset={`${2 * Math.PI * 8 * (1 - currentProgress / 100)}`}
            style={{
              transition:
                "stroke-dashoffset 0.1s ease-out, stroke 0.8s ease-in-out, opacity 2s ease-in-out",
            }}
          />
        </svg>
      </Box>

      {/* Timer text display */}
      <Typography
        variant="body2"
        sx={{
          color: hasError
            ? theme.palette.error.light
            : theme.palette.text.primary,
          fontSize: "14px",
          lineHeight: "normal",
          letterSpacing: "normal",
          transition:
            "color 0.8s ease-in-out, font-size 0.3s ease-out, opacity 2s ease-in-out",
        }}
      >
        {hasError ? t("timer.error") : formatTime(elapsedTime)}
      </Typography>
    </Box>
  )
}
