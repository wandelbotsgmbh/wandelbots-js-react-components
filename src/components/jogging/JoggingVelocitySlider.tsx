import { observer, useLocalObservable } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { VelocitySlider, VelocitySliderLabel } from "../VelocitySlider"
import type { JoggingStore } from "./JoggingStore"

export const JoggingVelocitySlider = observer(
  ({ store }: { store: JoggingStore }) => {
    const { t } = useTranslation()

    const state = useLocalObservable(() => ({
      get valueLabelFormat() {
        if (store.currentMotionType === "translate") {
          return (value: number) =>
            `v = ${t("Jogging.Cartesian.Translation.velocityMmPerSec.lb", { amount: value })}`
        } else {
          return (value: number) =>
            `ω = ${t("Jogging.Cartesian.Rotation.velocityDegPerSec.lb", { amount: value })}`
        }
      },
    }))

    return (
      <VelocitySlider
        velocity={store.velocityInCurrentUnits}
        min={store.minVelocityInCurrentUnits}
        max={store.maxVelocityInCurrentUnits}
        onVelocityChange={store.setVelocityFromSlider}
        disabled={store.isLocked}
        renderValue={(value) => (
          <VelocitySliderLabel
            value={state.valueLabelFormat(value)}
            sx={{
              minWidth: "111px",
              span: {
                transform: "translateY(-1.5px)",
              },
            }}
          />
        )}
      />
    )
  },
)
