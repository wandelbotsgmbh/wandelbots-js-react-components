import { Box, Fade, Typography } from "@mui/material"
import { Gauge } from "@mui/x-charts"
import { useTheme } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import type { TimerState, TimerAnimationState } from "./types"
import { formatTime } from "./utils"

interface TimerDefaultVariantProps {
  timerState: TimerState
  animationState: TimerAnimationState
  hasError: boolean
  className?: string
}

export const TimerDefaultVariant = ({
  timerState,
  animationState,
  hasError,
  className,
}: TimerDefaultVariantProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { elapsedTime, currentProgress } = timerState
  const { showErrorAnimation, showPauseAnimation, showMainText } = animationState

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
        value={currentProgress}
        valueMin={0}
        valueMax={100}
        innerRadius="85%"
        outerRadius="100%"
        margin={0}
        skipAnimation={true}
        text={() => ""}
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
            fill: "#171927",
            stroke: "transparent",
            strokeWidth: 0,
            transition:
              "fill 0.5s ease-out, stroke 0.5s ease-out, stroke-width 0.5s ease-out",
          },
          [`& .MuiGauge-valueText`]: {
            display: "none",
          },
          [`& .MuiGauge-text`]: {
            display: "none",
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
          width: 225,
          height: 225,
          borderRadius: "50%",
          backgroundColor: "#292B3F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 1,
          transition: "background-color 0.5s ease-out",
        }}
      >
        {/* Main display */}
        <Box
          sx={{
            position: "relative",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 0.5,
          }}
        >
          {/* Error text */}
          <Fade in={showMainText && hasError} timeout={200}>
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                fontSize: "16px",
                fontWeight: 500,
                color: theme.palette.error.light,
              }}
            >
              {t("timer.error")}
            </Typography>
          </Fade>

          {/* Timer display */}
          <Fade in={showMainText && !hasError} timeout={300}>
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                fontSize: "48px",
                fontWeight: 500,
                color: theme.palette.text.primary,
                lineHeight: 1,
                letterSpacing: "-0.5px",
              }}
            >
              {formatTime(elapsedTime)}
            </Typography>
          </Fade>
        </Box>
      </Box>
    </Box>
  )
}
