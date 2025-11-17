import { Chip, Typography, useTheme } from "@mui/material"
import type { OperationMode, SafetyStateType } from "@wandelbots/nova-js/v2"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../externalizeComponent"
import { ProgramState } from "./ProgramControl"

export interface ProgramStateIndicatorProps {
  /** The current state of the program */
  programState: ProgramState
  /** The current safety state of the robot controller */
  safetyState: SafetyStateType
  /** The current operation mode of the robot controller */
  operationMode: OperationMode
  /** Additional CSS class name */
  className?: string
}

/**
 * A state indicator component that displays the current program execution state
 * combined with robot controller safety and operation mode states.
 *
 * Features:
 * - Combines program state with safety and operation mode states
 * - Color-coded based on state severity (success, warning, error)
 * - Rendered as Material-UI filled chip
 * - Localization support via react-i18next
 */
export const ProgramStateIndicator = externalizeComponent(
  observer(
    ({
      programState,
      safetyState,
      operationMode,
      className,
    }: ProgramStateIndicatorProps) => {
      const theme = useTheme()
      const { t } = useTranslation()

      const getStateInfo = () => {
        // First check for emergency stop or critical safety states
        if (
          safetyState === "SAFETY_STATE_DEVICE_EMERGENCY_STOP" ||
          safetyState === "SAFETY_STATE_ROBOT_EMERGENCY_STOP" ||
          safetyState === "SAFETY_STATE_STOP_0" ||
          safetyState === "SAFETY_STATE_STOP_1" ||
          safetyState === "SAFETY_STATE_STOP_2" ||
          safetyState === "SAFETY_STATE_PROTECTIVE_STOP" ||
          safetyState === "SAFETY_STATE_STOP" ||
          safetyState === "SAFETY_STATE_REDUCED" ||
          safetyState === "SAFETY_STATE_MASTERING" ||
          safetyState === "SAFETY_STATE_CONFIRM_SAFETY" ||
          safetyState === "SAFETY_STATE_OPERATOR_SAFETY" ||
          safetyState === "SAFETY_STATE_RECOVERY" ||
          safetyState === "SAFETY_STATE_VIOLATION"
        ) {
          return {
            label: t("ProgramStateIndicator.EStop.lb"),
            color: theme.palette.error.main,
          }
        }

        // Check for error states
        if (
          safetyState === "SAFETY_STATE_UNKNOWN" ||
          safetyState === "SAFETY_STATE_FAULT"
        ) {
          return {
            label: t("ProgramStateIndicator.Error.lb"),
            color: theme.palette.error.main,
          }
        }

        // For normal safety states, check program state
        if (safetyState === "SAFETY_STATE_NORMAL") {
          switch (programState) {
            case ProgramState.PREPARING:
              return {
                label: t("ProgramStateIndicator.Preparing.lb"),
                color: theme.palette.warning.main,
              }
            case ProgramState.STARTING:
              return {
                label: t("ProgramStateIndicator.Starting.lb"),
                color: theme.palette.warning.main,
              }
            case ProgramState.RUNNING:
              return {
                label: t("ProgramStateIndicator.Running.lb"),
                color: theme.palette.success.main,
              }
            case ProgramState.PAUSING:
              return {
                label: t("ProgramStateIndicator.Pausing.lb"),
                color: theme.palette.warning.main,
              }
            case ProgramState.PAUSED:
              return {
                label: t("ProgramStateIndicator.Paused.lb"),
                color: theme.palette.grey[600],
              }
            case ProgramState.STOPPING:
              return {
                label: t("ProgramStateIndicator.Stopping.lb"),
                color: theme.palette.warning.main,
              }
            case ProgramState.COMPLETED:
              return {
                label: t("ProgramStateIndicator.Completed.lb"),
                color: theme.palette.success.main,
              }
            case ProgramState.FAILED:
              return {
                label: t("ProgramStateIndicator.Failed.lb"),
                color: theme.palette.error.main,
              }
            case ProgramState.STOPPED:
              return {
                label: t("ProgramStateIndicator.Stopped.lb"),
                color: theme.palette.warning.main,
              }
            case ProgramState.ERROR:
              return {
                label: t("ProgramStateIndicator.Error.lb"),
                color: theme.palette.error.main,
              }
            case ProgramState.IDLE:
            default:
              return {
                label: t("ProgramStateIndicator.Ready.lb"),
                color: theme.palette.success.main,
              }
          }
        }

        // Default fallback
        return {
          label: t("ProgramStateIndicator.Idle.lb"),
          color: theme.palette.grey[600],
        }
      }

      const { label, color } = getStateInfo()

      // Add operation mode suffix if not automatic
      const getOperationModeText = () => {
        switch (operationMode) {
          case "OPERATION_MODE_AUTO":
            return t("ProgramStateIndicator.Auto.lb")
          case "OPERATION_MODE_MANUAL":
            return t("ProgramStateIndicator.Manual.lb")
          case "OPERATION_MODE_MANUAL_T1":
            return t("ProgramStateIndicator.ManualT1.lb")
          case "OPERATION_MODE_MANUAL_T2":
            return t("ProgramStateIndicator.ManualT2.lb")
          default:
            return t("ProgramStateIndicator.Auto.lb") // Default to Auto for unknown modes
        }
      }

      const fullLabel = `${label} / ${getOperationModeText()}`

      return (
        <Chip
          className={className}
          label={
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.75rem", // Smaller than body2
                lineHeight: 1.2,
              }}
            >
              {fullLabel}
            </Typography>
          }
          variant="filled"
          sx={{
            backgroundColor: color,
            color: theme.palette.getContrastText(color),
            fontWeight: 500,
            height: "auto",
            "& .MuiChip-label": {
              paddingX: 1.5,
              paddingY: 0.5,
            },
          }}
        />
      )
    },
  ),
)
