import { useTheme, type PopoverOrigin } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Trans, useTranslation } from "react-i18next"
import ControllerTypePhysicalIcon from "./icons/controller-type-physical.svg"
import ControllerTypeVirtualIcon from "./icons/controller-type-virtual.svg"
import { IndicatorWithExplanation } from "./IndicatorWithExplanation"

interface ControllerTypeIndicatorProps {
  isVirtual: boolean
  motionGroupId: string
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
}

export const ControllerTypeIndicator = observer(
  ({
    isVirtual,
    motionGroupId,
    anchorOrigin,
    transformOrigin,
  }: ControllerTypeIndicatorProps) => {
    const theme = useTheme()
    const { t } = useTranslation()

    if (isVirtual) {
      return (
        <IndicatorWithExplanation
          id="motion-group-virtual"
          icon={ControllerTypeVirtualIcon}
          color={theme.palette.tertiary.main}
          name={t("SafetyBar.ControllerType.Virtual.lb")}
          explanation={
            <Trans
              i18nKey="SafetyBar.MotionGroup.Virtual.Explanation.lb"
              values={{
                motionGroupId,
              }}
            >
              Motion group <code>{motionGroupId}</code> refers to a virtual
              robot with no physical counterpart. It can be freely manipulated
              without special safety precautions.
            </Trans>
          }
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        />
      )
    }

    return (
      <IndicatorWithExplanation
        id="motion-group-physical"
        icon={ControllerTypePhysicalIcon}
        color={theme.palette.primary.main}
        name={t("SafetyBar.ControllerType.Physical.lb")}
        explanation={
          <Trans
            i18nKey="SafetyBar.MotionGroup.Physical.Explanation.lb"
            values={{
              motionGroupId,
            }}
            components={{ code: <code />, strong: <strong /> }}
          />
        }
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
      />
    )
  },
)
