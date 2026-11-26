import { useTheme } from "@mui/material/styles"
import type { PopoverOrigin } from "@mui/material/Popover"
import { observer } from "mobx-react-lite"
import { useId } from "react"
import { Trans, useTranslation } from "react-i18next"
import ControllerTypePhysicalIcon from "./icons/controller-type-physical.svg"
import ControllerTypeVirtualIcon from "./icons/controller-type-virtual.svg"
import { IndicatorWithExplanation } from "./IndicatorWithExplanation"

interface ControllerTypeIndicatorProps {
  isVirtual: boolean
  motionGroupId: string
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  compact: boolean
}

export const ControllerTypeIndicator = observer(
  ({
    isVirtual,
    motionGroupId,
    anchorOrigin,
    transformOrigin,
    compact,
  }: ControllerTypeIndicatorProps) => {
    const theme = useTheme()
    const componentId = useId()
    const { t } = useTranslation()
    /** The indicator's name: what it shows, and the type it shows */
    const named = (type: string) =>
      `${t("SafetyBar.ControllerType.ti")}: ${type}`

    if (isVirtual) {
      return (
        <IndicatorWithExplanation
          id={`motion-group-virtual-${componentId}`}
          testId="controller-type-indicator"
          accessibleName={named(t("SafetyBar.ControllerType.Virtual.lb"))}
          icon={ControllerTypeVirtualIcon}
          // tertiary is a colour of the Nova theme; an app without it
          // gets the secondary colour of its own theme
          color={theme.palette.tertiary?.main ?? theme.palette.secondary.main}
          name={t("SafetyBar.ControllerType.Virtual.lb")}
          label={compact ? null : t("SafetyBar.ControllerType.Virtual.lb")}
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
        id={`motion-group-physical-${componentId}`}
        testId="controller-type-indicator"
        accessibleName={named(t("SafetyBar.ControllerType.Physical.lb"))}
        icon={ControllerTypePhysicalIcon}
        color={theme.palette.primary.main}
        name={t("SafetyBar.ControllerType.Physical.lb")}
        label={compact ? null : t("SafetyBar.ControllerType.Physical.lb")}
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

export default ControllerTypeIndicator
