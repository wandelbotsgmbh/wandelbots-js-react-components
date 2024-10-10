import { Box, MenuItem } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import AdornedSelect from "../../experimental/utils/AdornedSelect"
import {
  ORIENTATION_IDS,
  type IncrementOptionId,
  type JoggingStore,
  type OrientationId,
} from "./JoggingStore"

export const JoggingOptions = observer(({ store }: { store: JoggingStore }) => {
  const { t } = useTranslation()

  function translateOrientation(orientation: OrientationId): string {
    switch (orientation) {
      case "coordsys":
        return t("Jogging.Orientation.coordsys")
      case "tool":
        return t("Jogging.Orientation.tool")
      default:
        return orientation
    }
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "min-height min-height",
        "& label": {
          opacity: 0.7,
          fontSize: "12px",
          marginBottom: "4px",
        },
      }}
    >
      {/* Coordinate system */}
      <AdornedSelect
        labelId="jogging-coord-select"
        labelValue={"Coordinate Sys."}
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
            {/* Distinguish coordinate systems with the same name */}
            {cs.name && store.coordSystemCountByName[cs.name] > 1
              ? `${cs.name} / ${cs.coordinate_system}`
              : cs.name || cs.coordinate_system}
          </MenuItem>
        ))}
      </AdornedSelect>

      {/* TCP selection */}

      <AdornedSelect
        labelId="jogging-tcp-select"
        labelValue="TCP"
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
      </AdornedSelect>

      {/* Orientation */}
      <AdornedSelect
        labelValue={t("Jogging.Cartesian.Orientation.lb")}
        id="orientation-select"
        labelId="orientation-select"
        value={store.selectedOrientation}
        onChange={(event) => {
          store.setSelectedOrientation(event.target.value as OrientationId)
        }}
        disabled={store.isLocked}
      >
        {ORIENTATION_IDS.map((orientationId) => (
          <MenuItem key={orientationId} value={orientationId}>
            {translateOrientation(orientationId)}
          </MenuItem>
        ))}
      </AdornedSelect>

      {/* Increment selection */}
      <AdornedSelect
        labelValue={"Increment"}
        labelId="jogging-increment-select"
        size="small"
        variant="filled"
        value={store.activeDiscreteIncrement?.id || "continuous"}
        onChange={(event) => {
          store.setSelectedIncrementId(event.target.value as IncrementOptionId)
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
      </AdornedSelect>
    </Box>
  )
})
