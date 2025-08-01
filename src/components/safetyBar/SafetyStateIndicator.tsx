import { useTheme, type PopoverOrigin } from "@mui/material"
import type { RobotControllerStateSafetyStateEnum } from "@wandelbots/nova-js/v1"
import { observer } from "mobx-react-lite"
import { Trans, useTranslation } from "react-i18next"
import { assertUnreachable } from "../utils/errorHandling"
import SafetyStateErrorIcon from "./icons/safety-state-error.svg"
import SafetyStateEstopIcon from "./icons/safety-state-estop.svg"
import SafetyStateManualActionRequiredIcon from "./icons/safety-state-manual-action-required.svg"
import SafetyStateNormalIcon from "./icons/safety-state-normal.svg"
import SafetyStateStopIcon from "./icons/safety-state-stop.svg"
import { IndicatorWithExplanation } from "./IndicatorWithExplanation"

interface SafetyStateIndicatorProps {
  safetyState: RobotControllerStateSafetyStateEnum
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  compact: boolean
}

export const SafetyStateIndicator = observer(
  ({
    safetyState,
    anchorOrigin,
    transformOrigin,
    compact,
  }: SafetyStateIndicatorProps) => {
    const { t } = useTranslation()
    const theme = useTheme()

    switch (safetyState) {
      // Normal state, robot can move
      case "SAFETY_STATE_NORMAL":
        return (
          <IndicatorWithExplanation
            id="safety-state-normal"
            title={t("SafetyBar.SafetyState.ti")}
            name={t("SafetyBar.SafetyState.Normal.lb")}
            label={compact ? null : t("SafetyBar.SafetyState.Normal.lb")}
            icon={SafetyStateNormalIcon}
            color={theme.palette.text.secondary}
            explanation={
              <Trans i18nKey="SafetyBar.SafetyState.Normal.Explanation.lb">
                The robot controller is in a normal safety state. Movement is
                not prevented by this state.
              </Trans>
            }
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )

      // Estop
      case "SAFETY_STATE_DEVICE_EMERGENCY_STOP":
      case "SAFETY_STATE_ROBOT_EMERGENCY_STOP":
        return (
          <IndicatorWithExplanation
            id="safety-state-estop"
            title={t("SafetyBar.SafetyState.ti")}
            name={t("SafetyBar.SafetyState.Estop.lb")}
            label={compact ? null : t("SafetyBar.SafetyState.Estop.lb")}
            icon={SafetyStateEstopIcon}
            color={theme.palette.error.main}
            explanation={
              <Trans i18nKey="SafetyBar.StopState.Estop.Explanation.lb">
                An emergency stop of the robot controller has been triggered.
                Movement of the robot is no longer possible until the estop is
                released.
              </Trans>
            }
            literalValue={safetyState}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )

      // General stop
      case "SAFETY_STATE_STOP_0":
      case "SAFETY_STATE_STOP_1":
      case "SAFETY_STATE_STOP_2":
      case "SAFETY_STATE_PROTECTIVE_STOP":
      case "SAFETY_STATE_STOP":
        return (
          <IndicatorWithExplanation
            id="safety-state-stop"
            icon={SafetyStateStopIcon}
            title={t("SafetyBar.SafetyState.ti")}
            name={t("SafetyBar.SafetyState.Stop.lb")}
            label={compact ? null : t("SafetyBar.SafetyState.Stop.lb")}
            color={theme.palette.warning.main}
            explanation={
              <Trans i18nKey="SafetyBar.SafetyState.Stop.Explanation.lb">
                The robot controller has entered a stop state. Movement is no
                longer possible until the stop state is resolved.
              </Trans>
            }
            literalValue={safetyState}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )

      // Manual action required
      case "SAFETY_STATE_REDUCED":
      case "SAFETY_STATE_MASTERING":
      case "SAFETY_STATE_CONFIRM_SAFETY":
      case "SAFETY_STATE_OPERATOR_SAFETY":
      case "SAFETY_STATE_RECOVERY":
      case "SAFETY_STATE_VIOLATION":
        return (
          <IndicatorWithExplanation
            id="safety-state-manual-action-required"
            icon={SafetyStateManualActionRequiredIcon}
            color={theme.palette.warning.main}
            title={t("SafetyBar.SafetyState.ti")}
            name={t("SafetyBar.SafetyState.ManualActionRequired.lb")}
            label={
              compact
                ? null
                : t("SafetyBar.SafetyState.ManualActionRequired.lb")
            }
            explanation={
              <Trans i18nKey="SafetyBar.SafetyState.ManualActionRequired.Explanation.lb">
                The robot controller has entered a safety state requiring manual
                action to resolve.
              </Trans>
            }
            literalValue={safetyState}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )

      // Error
      case "SAFETY_STATE_UNKNOWN":
      case "SAFETY_STATE_FAULT":
        return (
          <IndicatorWithExplanation
            id="safety-state-error"
            icon={SafetyStateErrorIcon}
            color={theme.palette.error.main}
            title={t("SafetyBar.SafetyState.ti")}
            name={t("SafetyBar.SafetyState.Error.lb")}
            label={compact ? null : t("SafetyBar.SafetyState.Error.lb")}
            explanation={
              <Trans i18nKey="SafetyBar.SafetyState.Error.Explanation.lb">
                The robot controller has entered an unexpected safety state.
              </Trans>
            }
            literalValue={safetyState}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          />
        )
      default:
        assertUnreachable(safetyState, `Unknown safety state ${safetyState}`)
    }
  },
)
