import { Stack, MenuItem, InputLabel, Select, useTheme } from "@mui/material"
import { observer } from "mobx-react-lite"
import type { IncrementOptionId, JoggingStore } from "./JoggingStore"
import { useTranslation } from "react-i18next"
import { ThemeSelect } from "../ThemeSelect"

export const JoggingOptions = observer(({ store }: { store: JoggingStore }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      sx={{
        padding: "16px",
        "& label": {
          opacity: 0.7,
          fontSize: "12px",
          marginBottom: "4px",
        },
      }}
    >
      {/* Coordinate system */}
      <Stack width="33%">
        <InputLabel id="jogging-coord-select">{"Coordinate Sys."}</InputLabel>
        <ThemeSelect
          kind="filled"
          labelId="jogging-coord-select"
          value={store.selectedCoordSystemId}
          displayEmpty={true}
          onChange={(event) => {
            store.setSelectedCoordSystemId(event.target.value as string)
          }}
          disabled={store.isLocked}
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
          kind="filled"
          labelId="jogging-tcp-select"
          value={store.selectedTcpId}
          onChange={(event) => {
            store.setSelectedTcpId(event.target.value as string)
          }}
          disabled={store.isLocked}
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
          kind="filled"
          labelId="jogging-increment-select"
          value={store.selectedIncrementId}
          onChange={(event) => {
            store.setSelectedIncrementId(
              event.target.value as IncrementOptionId,
            )
          }}
          disabled={store.isLocked}
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
