import { Stack, Divider, Typography } from "@mui/material"
import { observer, useLocalObservable } from "mobx-react-lite"
import type { JoggingStore } from "./JoggingStore"
import { VelocitySlider } from "./VelocitySlider"
import { useTranslation } from "react-i18next"

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
      <Stack>
        <Divider />
        <Stack
          sx={{
            margin: "0px 20px",
            marginTop: "0.8rem",
            marginBottom: "0.8rem",
          }}
        >
          <Stack sx={{ width: "380px", maxWidth: "90%", margin: "auto" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {t("Jogging.Velocity.lb")}
            </Typography>
            <VelocitySlider
              velocity={store.velocityInCurrentUnits}
              min={store.minVelocityInCurrentUnits}
              max={store.maxVelocityInCurrentUnits}
              onVelocityChange={store.setVelocityFromSlider}
              disabled={store.activeRobot.robotPad.isLocked}
              valueLabelFormat={state.valueLabelFormat}
            />
          </Stack>
        </Stack>
        <Divider />
      </Stack>
    )
  },
)
