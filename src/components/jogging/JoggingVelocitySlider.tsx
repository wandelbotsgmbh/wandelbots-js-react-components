import { Stack } from "@mui/material"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import { VelocitySlider } from "../VelocitySlider"
import type { JoggingStore } from "./JoggingStore"

export const JoggingVelocitySlider = observer(
  ({ store }: { store: JoggingStore }) => {
    const { t } = useTranslation()

    const state = useLocalObservable(() => ({
      get valueLabelFormat() {
        if (store.currentMotionType === "translate") {
          return (value: number) =>
            `v=${t("Jogging.Cartesian.Translation.velocityMmPerSec.lb", { amount: value })}`
        } else {
          return (value: number) =>
            `v=${t("Jogging.Cartesian.Rotation.velocityDegPerSec.lb", { amount: value })}`
        }
      },
    }))

    return (
      <Stack
        sx={{
          margin: "0px 20px",
          marginBottom: "6px",
        }}
      >
        <Stack sx={{ width: "380px", maxWidth: "90%", margin: "auto" }}>
          <VelocitySlider
            velocity={store.velocityInCurrentUnits}
            min={store.minVelocityInCurrentUnits}
            max={store.maxVelocityInCurrentUnits}
            onVelocityChange={store.setVelocityFromSlider}
            disabled={store.isLocked}
            valueLabelFormat={state.valueLabelFormat}
          />
        </Stack>
      </Stack>
    )
  },
)
