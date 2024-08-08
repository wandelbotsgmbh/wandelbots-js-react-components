import {
  Stack,
  MenuItem,
  InputLabel,
  Select,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import type { IncrementOptionId, JoggingStore } from "./JoggingStore"
import { useTranslation } from "react-i18next"
import OrientationCoordSysIcon from "../../icons/orientation-coord-system.svg"
import OrientationToolIcon from "../../icons/orientation-tool.svg"

export const JoggingOptions = observer(({ store }: { store: JoggingStore }) => {
  const { t } = useTranslation()

  function onOrientationChange(
    _event: React.MouseEvent<HTMLElement>,
    newOrientation: string,
  ) {
    if (newOrientation === "coordsys" || newOrientation === "tool")
      store.setSelectedOrientation(newOrientation)
  }

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
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
        <Stack width="50%">
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
        <Stack width="50%">
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
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        sx={{
          padding: "16px",
          "& label": {
            opacity: 0.7,
            fontSize: "12px",
            marginBottom: "4px",
          },
        }}
      >
        {/* Orientation */}
        <Stack width="35%">
          <InputLabel id="orientation-select">
            {t("Jogging.Cartesian.Orientation.lb")}
          </InputLabel>
          <ToggleButtonGroup
            value={store.selectedOrientation}
            onChange={onOrientationChange}
            exclusive
            aria-labelledby="orientation-select"
          >
            <ToggleButton value="coordsys">
              <OrientationCoordSysIcon />
            </ToggleButton>
            <ToggleButton value="tool">
              <OrientationToolIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* Increment selection */}
        <Stack width="65%">
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
    </>
  )
})
