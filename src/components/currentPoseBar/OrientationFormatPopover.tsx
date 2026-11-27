import Divider from "@mui/material/Divider"
import ListSubheader from "@mui/material/ListSubheader"
import MenuItem from "@mui/material/MenuItem"
import Popover from "@mui/material/Popover"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { AdornedSelect } from "@wandelbots/mui"
import { memo, useId } from "react"
import { useTranslation } from "react-i18next"
import { PanelSelect } from "../robotControl/PanelSelect"
import type { OrientationFormat } from "./CurrentPoseBar"
import {
  EULER_CONVENTIONS,
  type EulerConvention,
  parseEulerConvention,
} from "./orientation"

type OrientationFormatPopoverProps = {
  /** The bar: the popover opens above it, at its left */
  anchor: HTMLElement | null
  open: boolean
  onClose: () => void
  format: OrientationFormat
  onChange: (format: OrientationFormat) => void
}

/**
 * The heading of a group of Euler conventions. The select gives each child
 * an option's role and click handler; the heading takes neither, and the
 * menu passes over it when it focuses its first item.
 */
function ConventionGroupHeading({ children }: { children: string }) {
  return <ListSubheader>{children}</ListSubheader>
}
ConventionGroupHeading.muiSkipListHighlight = true

/** The Euler convention, the intrinsic ones and the extrinsic ones under a heading each */
function EulerConventionSelect({
  value,
  onChange,
}: {
  value: EulerConvention
  onChange: (convention: EulerConvention) => void
}) {
  const { t } = useTranslation()
  const labelId = useId()

  const conventionLabel = (convention: EulerConvention) => {
    const { intrinsic, axes } = parseEulerConvention(convention)
    return t(
      intrinsic
        ? "CurrentPose.EulerConvention.Intrinsic.lb"
        : "CurrentPose.EulerConvention.Extrinsic.lb",
      { axes: axes.join("") },
    )
  }
  const group = (intrinsic: boolean) =>
    EULER_CONVENTIONS.filter(
      (convention) => parseEulerConvention(convention).intrinsic === intrinsic,
    ).map((convention) => (
      <MenuItem key={convention} value={convention}>
        {parseEulerConvention(convention).axes.join("")}
      </MenuItem>
    ))

  return (
    <AdornedSelect
      label={t("CurrentPose.EulerConvention.lb")}
      labelId={labelId}
      value={value}
      // The menu's items show the axes only, under their group's heading
      renderValue={(convention) =>
        conventionLabel(convention as EulerConvention)
      }
      onChange={(event) => onChange(event.target.value as EulerConvention)}
    >
      <ConventionGroupHeading>
        {t("CurrentPose.EulerConvention.Intrinsic.hlb")}
      </ConventionGroupHeading>
      {group(true)}
      <ConventionGroupHeading>
        {t("CurrentPose.EulerConvention.Extrinsic.hlb")}
      </ConventionGroupHeading>
      {group(false)}
    </AdornedSelect>
  )
}

/**
 * Orientation format: how the bar shows the orientation. The angle unit is
 * for a rotation vector and Euler angles; the convention for Euler angles.
 * It renders again only when it opens, closes or shows another format: an
 * open menu measures its place on every render, and the bar renders on every
 * render of the app.
 */
export const OrientationFormatPopover = memo(
  OrientationFormatPopoverContent,
  (a, b) =>
    a.anchor === b.anchor &&
    a.open === b.open &&
    a.onClose === b.onClose &&
    a.onChange === b.onChange &&
    a.format.type === b.format.type &&
    a.format.angleUnit === b.format.angleUnit &&
    a.format.eulerConvention === b.format.eulerConvention,
)

function OrientationFormatPopoverContent({
  anchor,
  open,
  onClose,
  format,
  onChange,
}: OrientationFormatPopoverProps) {
  const { t } = useTranslation()
  const title = t("CurrentPose.OrientationFormat.ti")
  const change = (next: Partial<OrientationFormat>) =>
    onChange({ ...format, ...next })

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      slotProps={{
        paper: {
          role: "dialog",
          "aria-label": title,
          sx: (theme) => ({
            width: "264px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            borderRadius: "10px",
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.backgroundPaperElevation?.[2],
            backgroundImage: "none",
            boxShadow: theme.shadows[16],
          }),
        },
      }}
    >
      <Typography variant="subtitle2" color="text.primary">
        {title}
      </Typography>
      <Divider />
      <Stack sx={{ gap: "8px" }}>
        <PanelSelect
          label={t("CurrentPose.Format.lb")}
          options={[
            {
              id: "rotationVector",
              label: t("CurrentPose.Format.RotationVector.lb"),
            },
            {
              id: "eulerAngles",
              label: t("CurrentPose.Format.EulerAngles.lb"),
            },
            { id: "quaternion", label: t("CurrentPose.Format.Quaternion.lb") },
          ]}
          value={format.type}
          onChange={(type) =>
            change({ type: type as OrientationFormat["type"] })
          }
          disabled={false}
        />
        {format.type !== "quaternion" && (
          <PanelSelect
            label={t("CurrentPose.AngleUnit.lb")}
            options={[
              { id: "rad", label: t("CurrentPose.AngleUnit.Radians.lb") },
              { id: "deg", label: t("CurrentPose.AngleUnit.Degrees.lb") },
            ]}
            value={format.angleUnit}
            onChange={(angleUnit) =>
              change({ angleUnit: angleUnit as OrientationFormat["angleUnit"] })
            }
            disabled={false}
          />
        )}
        {format.type === "eulerAngles" && (
          <EulerConventionSelect
            value={format.eulerConvention}
            onChange={(eulerConvention) => change({ eulerConvention })}
          />
        )}
      </Stack>
    </Popover>
  )
}
