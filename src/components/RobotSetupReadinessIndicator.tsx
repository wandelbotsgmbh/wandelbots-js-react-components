import { Box, Chip, Typography, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"

/**
 * Enum representing the robot setup readiness state
 */
export enum RobotSetupReadinessState {
  /** Preconditions are not fulfilled for robot operation */
  PRECONDITION_NOT_FULFILLED = "PRECONDITION_NOT_FULFILLED",
  /** Robot is disconnected from the system */
  ROBOT_DISCONNECTED = "ROBOT_DISCONNECTED",
  /** Safety cell is open and robot cannot operate */
  CELL_OPEN = "CELL_OPEN",
  /** Emergency stop is active and robot cannot operate */
  E_STOP = "E_STOP",
  /** Robot is in manual mode and requires manual intervention */
  MANUAL_MODE = "MANUAL_MODE",
  /** Robot is ready for operation */
  READY = "READY",
}

export interface RobotSetupReadinessIndicatorProps {
  /** The current setup readiness state of the robot */
  setupState: RobotSetupReadinessState
  /** Additional CSS class name */
  className?: string
}

/**
 * A state indicator component that displays the current robot setup readiness state.
 *
 * Features:
 * - Shows six states: Precondition not fulfilled, Robot disconnected, Cell open, E-Stop, Manual mode, Ready
 * - Color-coded based on state (ready: tertiary/main, others: error/main)
 * - Rendered as Material-UI filled chip with paper-elevation-11 background
 * - Includes colored circle indicator (8px width)
 * - Localization support via react-i18next
 */
export const RobotSetupReadinessIndicator = externalizeComponent(
  observer(({ setupState, className }: RobotSetupReadinessIndicatorProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const getStateInfo = () => {
      switch (setupState) {
        case RobotSetupReadinessState.READY:
          return {
            label: t("RobotSetupReadinessIndicator.Ready.lb"),
            indicatorColor:
              theme.palette.tertiary?.main || theme.palette.primary.main,
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[11] ||
              theme.palette.background.paper,
            textColor: theme.palette.secondary.contrastText,
          }
        case RobotSetupReadinessState.ROBOT_DISCONNECTED:
          return {
            label: t("RobotSetupReadinessIndicator.RobotDisconnected.lb"),
            indicatorColor: theme.palette.error.main,
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[11] ||
              theme.palette.background.paper,
            textColor: theme.palette.secondary.contrastText,
          }
        case RobotSetupReadinessState.CELL_OPEN:
          return {
            label: t("RobotSetupReadinessIndicator.CellOpen.lb"),
            indicatorColor: theme.palette.error.main,
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[11] ||
              theme.palette.background.paper,
            textColor: theme.palette.secondary.contrastText,
          }
        case RobotSetupReadinessState.E_STOP:
          return {
            label: t("RobotSetupReadinessIndicator.EStop.lb"),
            indicatorColor: theme.palette.error.main,
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[11] ||
              theme.palette.background.paper,
            textColor: theme.palette.secondary.contrastText,
          }
        case RobotSetupReadinessState.MANUAL_MODE:
          return {
            label: t("RobotSetupReadinessIndicator.ManualMode.lb"),
            indicatorColor: theme.palette.error.main,
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[11] ||
              theme.palette.background.paper,
            textColor: theme.palette.secondary.contrastText,
          }
        case RobotSetupReadinessState.PRECONDITION_NOT_FULFILLED:
        default:
          return {
            label: t(
              "RobotSetupReadinessIndicator.PreconditionNotFulfilled.lb",
            ),
            indicatorColor: theme.palette.error.main,
            backgroundColor:
              theme.palette.backgroundPaperElevation?.[11] ||
              theme.palette.background.paper,
            textColor: theme.palette.secondary.contrastText,
          }
      }
    }

    const { label, indicatorColor, backgroundColor, textColor } = getStateInfo()

    return (
      <Chip
        className={className}
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: indicatorColor,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: textColor,
                fontSize: "0.75rem", // Smaller than body2
                lineHeight: 1.2,
              }}
            >
              {label}
            </Typography>
          </Box>
        }
        variant="filled"
        sx={{
          backgroundColor,
          color: theme.palette.getContrastText(backgroundColor),
          fontWeight: 500,
          height: "auto",
          "& .MuiChip-label": {
            paddingX: 1.5,
            paddingY: 0.5,
          },
        }}
      />
    )
  }),
)
