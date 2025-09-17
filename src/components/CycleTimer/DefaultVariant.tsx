import { Box, Fade, Typography, useTheme } from "@mui/material"
import { Gauge } from "@mui/x-charts/Gauge"
import { useTranslation } from "react-i18next"
import type { AnimationState, TimerState } from "./types"
import { formatTime } from "./utils"

interface DefaultVariantProps {
  timerState: TimerState
  animationState: AnimationState
  hasError: boolean
  className?: string
}

export const DefaultVariant = ({
  timerState,
  animationState,
  hasError,
  className,
}: DefaultVariantProps) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { currentState, remainingTime, maxTime, currentProgress } = timerState
  const {
    showErrorAnimation,
    showPauseAnimation,
    showPulsatingText,
    pulsatingFinished,
    showLabels,
    showMainText,
    showIdlePulsating,
    idleDotsCount,
  } = animationState

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
        value={currentState === "idle" ? 0 : currentProgress}
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
            fill: currentState === "idle" ? "#171927" : "#171927",
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
        {/* Top label */}
        <Box
          sx={{
            height: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 1,
          }}
        >
          <Fade
            in={
              showLabels &&
              !hasError &&
              currentState !== "idle" &&
              currentState !== "success"
            }
            timeout={300}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color:
                  currentState === "measured"
                    ? showPulsatingText || pulsatingFinished
                      ? theme.palette.success.main
                      : theme.palette.text.secondary
                    : theme.palette.text.secondary,
                transition: "color 0.8s ease-in-out",
              }}
            >
              <span
                style={{
                  opacity:
                    currentState === "measured" && pulsatingFinished
                      ? showPulsatingText
                        ? 1
                        : 0.6
                      : 1,
                  transition: "opacity 2s ease-in-out",
                }}
              >
                {currentState === "measuring"
                  ? t("CycleTimer.CycleTime.lb", "Cycle Time")
                  : currentState === "measured"
                    ? t("CycleTimer.CycleTime.lb", "Cycle Time")
                    : currentState === "countdown"
                      ? t("CycleTimer.RemainingTime.lb", "Remaining Time")
                      : ""}
              </span>
            </Typography>
          </Fade>
        </Box>

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
          {/* Idle state text */}
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
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: "166%",
                letterSpacing: "0.17px",
                textAlign: "center",
                width: "200px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  opacity: showIdlePulsating ? 1 : 0.6,
                  transition: "opacity 2s ease-in-out",
                }}
              >
                {t(
                  "CycleTimer.WaitingForCycle.lb",
                  "Waiting for program cycle",
                )}
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "18px",
                  textAlign: "left",
                  opacity: showIdlePulsating ? 1 : 0.6,
                  transition: "opacity 2s ease-in-out",
                }}
              >
                {".".repeat(idleDotsCount)}
              </span>
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
              currentState !== "success"
            }
            timeout={300}
          >
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                fontSize: "48px",
                fontWeight: 500,
                color: theme.palette.text.primary,
                lineHeight: 1,
                transition: "color 0.8s ease-in-out",
              }}
            >
              <span
                style={{
                  opacity: 1,
                  transition: "opacity 2s ease-in-out",
                }}
              >
                {formatTime(remainingTime)}
              </span>
            </Typography>
          </Fade>
        </Box>

        {/* Bottom label */}
        <Box
          sx={{
            height: "16px",
            display: "flex",
            marginTop: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade
            in={
              showLabels &&
              !hasError &&
              currentState !== "idle" &&
              currentState !== "success"
            }
            timeout={300}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
                color:
                  currentState === "measured"
                    ? showPulsatingText || pulsatingFinished
                      ? theme.palette.success.main
                      : theme.palette.text.secondary
                    : theme.palette.text.secondary,
                transition: "color 0.8s ease-in-out",
              }}
            >
              <span
                style={{
                  opacity:
                    currentState === "measured" && pulsatingFinished
                      ? showPulsatingText
                        ? 1
                        : 0.6
                      : 1,
                  transition: "opacity 2s ease-in-out",
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
              </span>
            </Typography>
          </Fade>
        </Box>
      </Box>
    </Box>
  )
}
