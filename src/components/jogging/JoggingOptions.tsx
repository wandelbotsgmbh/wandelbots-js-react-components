import {
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import OrientationCoordSysIcon from "../../icons/orientation-coord-system.svg"
import OrientationToolIcon from "../../icons/orientation-tool.svg"
import type { IncrementOptionId, JoggingStore } from "./JoggingStore"

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
          padding: "6px 16px",
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
            size="small"
            variant="filled"
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
            size="small"
            variant="filled"
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
          padding: "6px 16px",
          "& label": {
            opacity: 0.7,
            fontSize: "12px",
            marginBottom: "4px",
          },
        }}
      >
        {/* Orientation */}
        <Stack width="50%">
          <InputLabel id="orientation-select">
            {t("Jogging.Cartesian.Orientation.lb")}
          </InputLabel>
          <ToggleButtonGroup
            value={store.selectedOrientation}
            onChange={onOrientationChange}
            exclusive
            aria-labelledby="orientation-select"
            disabled={store.isLocked}
          >
            <ToggleButton value="coordsys" sx={{ flexGrow: 1 }}>
              <OrientationCoordSysIcon />
            </ToggleButton>
            <ToggleButton value="tool" sx={{ flexGrow: 1 }}>
              <OrientationToolIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* Increment selection */}
        <Stack width="50%">
          <InputLabel id="jogging-increment-select">{"Increment"}</InputLabel>
          <Select
            labelId="jogging-increment-select"
            size="small"
            variant="filled"
            value={store.activeDiscreteIncrement?.id || "continuous"}
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

            {store.selectedOrientation === "tool"
              ? null
              : store.discreteIncrementOptions.map((inc) => (
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
