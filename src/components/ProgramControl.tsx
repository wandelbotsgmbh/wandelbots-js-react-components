import { Pause, PlayArrow, Stop } from "@mui/icons-material"
import { Box, Button, Typography, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"

export enum ProgramState {
  IDLE = "idle",
  PREPARING = "preparing",
  STARTING = "starting",
  RUNNING = "running",
  PAUSING = "pausing",
  PAUSED = "paused",
  STOPPING = "stopping",
  COMPLETED = "completed",
  FAILED = "failed",
  STOPPED = "stopped",
  ERROR = "error",
}

export interface ProgramControlProps {
  /** The current state of the program control */
  state: ProgramState
  /** Callback fired when the run/resume button is clicked */
  onRun: () => void
  /** Callback fired when the pause button is clicked (only available in 'with_pause' variant) */
  onPause?: () => void
  /** Callback fired when the stop button is clicked */
  onStop: () => void
  /**
   * Function to reset the component from 'stopping' state back to 'idle'.
   * This must be called manually by the user when requiresManualReset is true.
   */
  onReset?: () => void
  /**
   * When true, the component will stay in 'stopping' state until onReset is called manually.
   * When false (default), auto-resets to 'idle' after 2 seconds.
   */
  requiresManualReset?: boolean
  /**
   * Variant of the component:
   * - 'with_pause': Shows run/pause/stop buttons (default)
   * - 'without_pause': Shows only run/stop buttons
   */
  variant?: "with_pause" | "without_pause"
  /** Additional CSS class name */
  className?: string
}

interface ButtonConfig {
  enabled: boolean
  label: string
  color: string
  onClick: () => void
}

/**
 * A control component for program execution with run, pause, and stop functionality.
 *
 * Features:
 * - State machine with idle, preparing, starting, running, pausing, paused, stopping, completed, failed, stopped, and error states
 * - Two variants: with_pause (3 buttons) and without_pause (2 buttons)
 * - Optional manual reset functionality
 * - Responsive design with 110px circular buttons
 * - Material-UI theming integration
 */
export const ProgramControl = externalizeComponent(
  observer(
    ({
      state,
      onRun,
      onPause,
      onStop,
      onReset,
      requiresManualReset = false,
      variant = "with_pause",
      className,
    }: ProgramControlProps) => {
      const theme = useTheme()
      const { t } = useTranslation()

      const getButtonConfigs = (): ButtonConfig[] => {
        const baseConfigs: Record<string, ButtonConfig> = {
          run: {
            enabled:
              state === ProgramState.IDLE ||
              state === ProgramState.STOPPED ||
              state === ProgramState.PAUSED ||
              state === ProgramState.COMPLETED ||
              state === ProgramState.FAILED ||
              state === ProgramState.ERROR,
            label:
              state === ProgramState.PAUSED
                ? t("ProgramControl.Resume.bt")
                : state === ProgramState.ERROR || state === ProgramState.FAILED
                  ? t("ProgramControl.Retry.bt")
                  : t("ProgramControl.Start.bt"),
            color: theme.palette.success.main,
            onClick: onRun,
          },
          pause: {
            enabled: state === ProgramState.RUNNING,
            label: t("ProgramControl.Pause.bt"),
            color: "#FFFFFF33",
            onClick: onPause || (() => {}),
          },
          stop: {
            enabled:
              state === ProgramState.PREPARING ||
              state === ProgramState.STARTING ||
              state === ProgramState.RUNNING ||
              state === ProgramState.PAUSING ||
              state === ProgramState.PAUSED,
            label: t("ProgramControl.Stop.bt"),
            color: theme.palette.error.main,
            onClick: onStop,
          },
        }

        if (variant === "without_pause") {
          return [baseConfigs.run, baseConfigs.stop]
        }

        return [baseConfigs.run, baseConfigs.pause, baseConfigs.stop]
      }

      const getButtonIcon = (index: number) => {
        const iconProps = { sx: { fontSize: "55px" } }

        if (variant === "without_pause") {
          return index === 0 ? (
            <PlayArrow {...iconProps} />
          ) : (
            <Stop {...iconProps} />
          )
        }

        switch (index) {
          case 0:
            return <PlayArrow {...iconProps} />
          case 1:
            return <Pause {...iconProps} />
          case 2:
            return <Stop {...iconProps} />
          default:
            return null
        }
      }

      const buttonConfigs = getButtonConfigs()

      return (
        <Box
          className={className}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "40px",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {buttonConfigs.map((config, index) => (
              <Box
                key={config.label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  disabled={
                    !config.enabled ||
                    state === ProgramState.PREPARING ||
                    state === ProgramState.STARTING ||
                    state === ProgramState.PAUSING ||
                    (state === ProgramState.STOPPING && !requiresManualReset)
                  }
                  onClick={config.onClick}
                  sx={{
                    width: "88px",
                    height: "88px",
                    borderRadius: "88px",
                    backgroundColor: config.color,
                    opacity:
                      config.enabled &&
                      state !== ProgramState.PREPARING &&
                      state !== ProgramState.STARTING &&
                      state !== ProgramState.PAUSING &&
                      !(state === ProgramState.STOPPING && !requiresManualReset)
                        ? 1
                        : 0.3,
                    "&:hover": {
                      backgroundColor: config.color,
                      opacity:
                        config.enabled &&
                        state !== ProgramState.PREPARING &&
                        state !== ProgramState.STARTING &&
                        state !== ProgramState.PAUSING &&
                        !(
                          state === ProgramState.STOPPING &&
                          !requiresManualReset
                        )
                          ? 0.8
                          : 0.3,
                    },
                    "&:disabled": {
                      backgroundColor: config.color,
                      opacity: 0.3,
                    },
                    minWidth: "88px",
                    flexShrink: 0,
                  }}
                >
                  {getButtonIcon(index)}
                </Button>

                <Typography
                  variant="body1"
                  sx={{
                    color:
                      config.enabled &&
                      state !== ProgramState.PREPARING &&
                      state !== ProgramState.STARTING &&
                      state !== ProgramState.PAUSING &&
                      !(state === ProgramState.STOPPING && !requiresManualReset)
                        ? config.color
                        : theme.palette.text.disabled,
                    textAlign: "center",
                    opacity:
                      config.enabled &&
                      state !== ProgramState.PREPARING &&
                      state !== ProgramState.STARTING &&
                      state !== ProgramState.PAUSING &&
                      !(state === ProgramState.STOPPING && !requiresManualReset)
                        ? 1
                        : 0.3,
                  }}
                >
                  {config.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )
    },
  ),
)
