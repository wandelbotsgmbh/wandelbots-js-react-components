import { Stack, MenuItem, InputLabel, Select } from "@mui/material"
import { observer } from "mobx-react-lite"
import type { IncrementOptionId, JoggingStore } from "./JoggingStore"
import { useTranslation } from "react-i18next"
import { useThemeColors } from "../../themes/wbTheme"

export const JoggingOptions = observer(({ store }: { store: JoggingStore }) => {
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
        <Select
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
        </Select>
      </Stack>

      {/* TCP selection */}
      <Stack width="33%">
        <InputLabel id="jogging-tcp-select">TCP</InputLabel>
        <Select
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
        </Select>
      </Stack>

      {/* Increment selection */}
      <Stack width="33%">
        <InputLabel id="jogging-increment-select">{"Increment"}</InputLabel>
        <Select
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
        </Select>
      </Stack>
    </Stack>
  )
})
