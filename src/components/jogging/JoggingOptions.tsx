import { Stack, MenuItem, InputLabel } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ThemeSelect } from "@/components/ThemeSelect"
import type { IncrementOptionId, JoggingStore } from "./JoggingStore"
import { useTranslation } from "react-i18next"
import { useThemeColors } from "@/theme"

export const JoggingOptions = observer(({ store }: { store: JoggingStore }) => {
  const { robotPad } = store.activeRobot
  const { t } = useTranslation()
  const colors = useThemeColors()

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      sx={{
        padding: "16px",
        "& label": {
          color: colors.textSubtle,
          fontSize: "12px",
          marginBottom: "4px",
        },
      }}
    >
      {/* Coordinate system */}
      <Stack width="33%">
        <InputLabel id="jogging-coord-select">{"Coordinate Sys."}</InputLabel>
        <ThemeSelect
          labelId="jogging-coord-select"
          value={store.selectedCoordSystemId}
          displayEmpty={true}
          kind="filled"
          onChange={(event) => {
            store.setSelectedCoordSystemId(event.target.value as string)
          }}
          disabled={robotPad.isLocked}
        >
          {store.coordSystems.map((cs) => (
            <MenuItem key={cs.coordinate_system} value={cs.coordinate_system}>
              {cs.name || cs.coordinate_system}
            </MenuItem>
          ))}
        </ThemeSelect>
      </Stack>

      {/* TCP selection */}
      <Stack width="33%">
        <InputLabel id="jogging-tcp-select">TCP</InputLabel>
        <ThemeSelect
          labelId="jogging-tcp-select"
          value={store.selectedTcpId}
          kind="filled"
          onChange={(event) => {
            store.setSelectedTcpId(event.target.value as string)
          }}
          disabled={robotPad.isLocked}
        >
          {store.tcps.map((tcp) => (
            <MenuItem key={tcp.id} value={tcp.id}>
              {tcp.id}
            </MenuItem>
          ))}
        </ThemeSelect>
      </Stack>

      {/* Increment selection */}
      <Stack width="33%">
        <InputLabel id="jogging-increment-select">{"Increment"}</InputLabel>
        <ThemeSelect
          labelId="jogging-increment-select"
          value={store.selectedIncrementId}
          kind="filled"
          onChange={(event) => {
            store.setSelectedIncrementId(
              event.target.value as IncrementOptionId,
            )
          }}
          disabled={robotPad.isLocked}
        >
          <MenuItem key="continuous" value="continuous">
            {t("Jogging.Increment.Continuous.dd")}
          </MenuItem>

          {store.discreteIncrementOptions.map((inc) => (
            <MenuItem key={inc.id} value={inc.id}>
              {store.currentMotionType === "translate"
                ? `${inc.mm}mm`
                : `${inc.degrees}°`}
            </MenuItem>
          ))}
        </ThemeSelect>
      </Stack>
    </Stack>
  )
})
