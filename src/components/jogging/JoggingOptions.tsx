import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import InputAdornment from "@mui/material/InputAdornment"
import MenuItem from "@mui/material/MenuItem"
import { observer } from "mobx-react-lite"
import { useId } from "react"
import { useTranslation } from "react-i18next"
import AdornedSelect from "../experimental/utils/AdornedSelect"
import {
  ORIENTATION_IDS,
  type IncrementOptionId,
  type JoggingStore,
  type OrientationId,
} from "./JoggingStore"

export const JoggingOptions = observer(
  ({ store, useDegree }: { store: JoggingStore; useDegree: boolean }) => {
    const { t } = useTranslation()
    const componentId = useId()
    const joggingOptions: React.ReactElement[] = []

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

    if (store.showCoordSystemSelect) {
      joggingOptions.push(
        <AdornedSelect
          key="coord"
          labelId={`jogging-coord-select-${componentId}`}
          labelValue={t("Jogging.CoordinateSystem.hlb")}
          value={store.selectedCoordSystemId}
          size="small"
          variant="filled"
          displayEmpty={true}
          onChange={(event) =>
            store.setSelectedCoordSystemId(event.target.value as string)
          }
          disabled={store.isLocked}
        >
          {store.coordSystems.map((cs) => (
            <MenuItem key={cs.coordinate_system} value={cs.coordinate_system}>
              {cs.name && store.coordSystemCountByName[cs.name] > 1
                ? `${cs.name} / ${cs.coordinate_system}`
                : cs.name || cs.coordinate_system}
            </MenuItem>
          ))}
        </AdornedSelect>,
      )
    }

    if (store.showTcpSelect) {
      joggingOptions.push(
        <AdornedSelect
          key="tcp"
          labelId={`jogging-tcp-select-${componentId}`}
          labelValue="TCP"
          value={store.selectedTcpId}
          size="small"
          variant="filled"
          displayEmpty={store.tcpChangeInProgress}
          onChange={(event) => {
            store
              .requestTcpChange(event.target.value as string)
              .catch((err) => {
                console.error("Failed to change TCP:", err)
              })
          }}
          disabled={store.isLocked || store.tcpChangeInProgress}
          endAdornment={
            store.tcpChangeInProgress ? (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            ) : undefined
          }
        >
          {store.tcps.map((tcp) => (
            <MenuItem key={tcp.id} value={tcp.id}>
              {tcp.id}
            </MenuItem>
          ))}
        </AdornedSelect>,
      )
    }

    if (store.showOrientationSelect) {
      joggingOptions.push(
        <AdornedSelect
          key="orientation"
          labelValue={t("Jogging.Cartesian.Orientation.lb")}
          labelId={`orientation-select-${componentId}`}
          value={store.selectedOrientation}
          onChange={(event) =>
            store.setSelectedOrientation(event.target.value as OrientationId)
          }
          disabled={store.isLocked}
        >
          {ORIENTATION_IDS.map((orientationId) => (
            <MenuItem key={orientationId} value={orientationId}>
              {translateOrientation(orientationId)}
            </MenuItem>
          ))}
        </AdornedSelect>,
      )
    }

    if (store.showIncrementSelect) {
      joggingOptions.push(
        <AdornedSelect
          key="increment"
          labelValue={t("Jogging.Increment.hlb")}
          labelId={`jogging-increment-select-${componentId}`}
          size="small"
          variant="filled"
          value={store.activeDiscreteIncrement?.id || "continuous"}
          onChange={(event) =>
            store.setSelectedIncrementId(
              event.target.value as IncrementOptionId,
            )
          }
          disabled={store.isLocked}
        >
          <MenuItem key="continuous" value="continuous">
            {t("Jogging.Increment.Continuous.dd")}
          </MenuItem>

          {store.selectedOrientation === "tool"
            ? null
            : store.discreteIncrementOptions.map((inc) => (
                <MenuItem key={inc.id} value={inc.id}>
                  {useDegree ? `${inc.degrees}°` : `${inc.mm}mm`}
                </MenuItem>
              ))}
        </AdornedSelect>,
      )
    }

    return (
      <Box
        component="div"
        data-testid="jogging-options"
        aria-label="jogging-options"
        sx={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "min-content",
          "& label": { opacity: 0.7, fontSize: "12px", marginBottom: "4px" },
        }}
      >
        {joggingOptions.map((select, idx) => (
          <Box
            // biome-ignore lint/suspicious/noArrayIndexKey: pre-biome code
            key={idx}
            sx={{
              gridColumn:
                joggingOptions.length % 2 === 1 &&
                idx === joggingOptions.length - 1
                  ? "span 2"
                  : "auto",
            }}
          >
            {select}
          </Box>
        ))}
      </Box>
    )
  },
)
