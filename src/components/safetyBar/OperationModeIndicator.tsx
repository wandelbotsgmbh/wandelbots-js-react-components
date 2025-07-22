import { useTheme, type PopoverOrigin } from "@mui/material"
import type { RobotControllerStateOperationModeEnum } from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { Trans, useTranslation } from "react-i18next"
import OperationModeAutomaticIcon from "./icons/operation-mode-automatic.svg"
import OperationModeErrorIcon from "./icons/operation-mode-error.svg"
import OperationModeManualIcon from "./icons/operation-mode-manual.svg"
import { IndicatorWithExplanation } from "./IndicatorWithExplanation"

interface OperationModeIndicatorProps {
  operationMode: RobotControllerStateOperationModeEnum
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  compact: boolean
}

export const OperationModeIndicator = observer(
  ({
    operationMode,
    anchorOrigin,
    transformOrigin,
    compact
  }: OperationModeIndicatorProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    switch (operationMode) {
      case "OPERATION_MODE_AUTO":
        return (
          <IndicatorWithExplanation
            id="operation-mode-auto"
            icon={OperationModeAutomaticIcon}
            title={t("SafetyBar.OperationMode.ti")}
            name={t("SafetyBar.OperationMode.Automatic.ti")}
            label={compact ? null : t("SafetyBar.OperationMode.Automatic.ti")}
            color={"rgba(255, 255, 255, 0.57)"}
            explanation={
              <Trans i18nKey="SafetyBar.OperationMode.Auto.Explanation.lb">
                The robot controller is in automatic operation mode. Automated
                movement without manual confirmation is possible in this mode.
              </Trans>
            }
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )
      case "OPERATION_MODE_MANUAL":
      case "OPERATION_MODE_MANUAL_T1":
      case "OPERATION_MODE_MANUAL_T2": {
        return (
          <IndicatorWithExplanation
            id="operation-mode-manual"
            icon={OperationModeManualIcon}
            color={theme.palette.warning.main}
            title={t("SafetyBar.OperationMode.ti")}
            name={t("SafetyBar.OperationMode.Manual.lb")}
            label={compact ? null : t("SafetyBar.OperationMode.Manual.lb")}
            explanation={
              <Trans i18nKey="SafetyBar.OperationMode.Manual.Explanation.lb">
                The robot controller is in manual operation mode. On a physical
                robot, this generally indicates that an enabling switch must be
                held for the robot to move successfully.
              </Trans>
            }
            literalValue={operationMode}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )
      }
      default:
        return (
          <IndicatorWithExplanation
            id="operation-mode-error"
            icon={OperationModeErrorIcon}
            color={theme.palette.warning.main}
            title={t("SafetyBar.OperationMode.ti")}
            name={t("SafetyBar.OperationMode.Error.lb")}
            label={compact ? null : t("SafetyBar.OperationMode.Error.lb")}
            explanation={
              <Trans i18nKey="SafetyBar.OperationMode.Error.Explanation.lb">
                The robot controller has entered an unexpected operation mode.
                Motion group movement may not be possible.
              </Trans>
            }
            literalValue={operationMode}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )
    }
  },
)
