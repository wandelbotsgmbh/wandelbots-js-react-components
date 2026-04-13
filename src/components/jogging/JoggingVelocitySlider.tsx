import { observer} from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { VelocitySlider, VelocitySliderLabel } from "../VelocitySlider"
import type { JoggingStore } from "./JoggingStore"

export const JoggingVelocitySlider = observer(
  ({
     store,
     useDegree,
   }: {
    store: JoggingStore
    useDegree: boolean
  }) => {

    const { t } = useTranslation()

    function valueLabelFormat(value: number, useDegree: boolean): string {
      return useDegree
        ? `ω = ${t("Jogging.Cartesian.Rotation.velocityDegPerSec.lb", { amount: value })}`
        : `v = ${t("Jogging.Cartesian.Translation.velocityMmPerSec.lb", { amount: value })}`
    }


    return (
      <VelocitySlider
        store={store}
        velocity={store.velocityInDisplayUnits(useDegree)}
        min={store.minVelocityInDisplayUnits(useDegree)}
        max={store.maxVelocityInDisplayUnits(useDegree)}
        onVelocityChange={store.setVelocityFromSlider}
        useDegree={useDegree}
        disabled={store.isLocked}
        renderValue={(value) => (
          <VelocitySliderLabel
            value={valueLabelFormat(value, useDegree)}
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
