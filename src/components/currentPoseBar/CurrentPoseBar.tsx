import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import type { SxProps, Theme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { ContentCopyFilled } from "@wandelbots/icons/ContentCopyFilled"
import { Settings } from "@wandelbots/icons/Settings"
import { AdornedSelect } from "@wandelbots/mui"
import type {
  JoggingDetailsState,
  TrajectoryDetailsState,
} from "@wandelbots/nova-js/v2"
import { memo, useCallback, useId, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import { poseToText } from "../robotControl/poseText"
import type {
  RobotControlOption,
  RobotControlPose,
  RobotControlSelect,
} from "../robotControl/RobotControlPanel"
import { useCopyText } from "../robotControl/useCopyText"
import { useEveryFrame } from "../robotControl/useEveryFrame"
import type { EulerConvention } from "./orientation"
import { OrientationFormatPopover } from "./OrientationFormatPopover"
import {
  DEFAULT_ORIENTATION_FORMAT,
  type PoseValue,
  poseValues,
} from "./poseValues"
import { StreamStatus } from "./StreamStatus"

export type { EulerConvention } from "./orientation"

/** How the bar shows the orientation of the pose */
export type OrientationFormat = {
  type: "rotationVector" | "eulerAngles" | "quaternion"
  /** The unit of a rotation vector and of Euler angles */
  angleUnit: "rad" | "deg"
  /** The convention of Euler angles; kept while another type is shown */
  eulerConvention: EulerConvention
}

/**
 * What the robot's motion stream reports: NOVA's
 * `execute.details.state.kind` of a jog or a trajectory
 */
export type CurrentPoseBarState =
  | JoggingDetailsState["kind"]
  | TrajectoryDetailsState["kind"]

/** What the app gives CurrentPoseBar: the pose, its TCP and frame, the state */
export type CurrentPoseBarProps = {
  /**
   * The TCP's pose relative to the frame, both chosen in the bar: position
   * in mm, orientation as a rotation vector in rad. Read on every frame;
   * null while unknown.
   */
  getCurrentPose: () => RobotControlPose | null
  /** The TCP whose pose the bar shows; the bar's own, not the panel's */
  tcp?: RobotControlSelect
  /** The coordinate system the pose is relative to */
  frame?: RobotControlSelect
  /** The state of the motion stream; none is "Ready" */
  state?: CurrentPoseBarState | null
  /**
   * An error that outlasts the motion that caused it, e.g. a jog stopped
   * near a collision; shown instead of the state
   */
  error?: string | null
  /** The orientation format, if the app keeps it; else the bar keeps its own */
  orientationFormat?: OrientationFormat
  onOrientationFormatChange?: (format: OrientationFormat) => void
  sx?: SxProps<Theme>
}

/** Figma's body3: the caption with less letter spacing */
const BODY3 = { letterSpacing: "0.17px" } as const

/** Figma's colors of the value labels: X, Y and Z in the theme's colors */
const LABEL_COLORS: Record<PoseValue["kind"], string> = {
  x: "error.main",
  y: "success.main",
  z: "info.main",
  orientation: "grey.600",
}

function Label({ children, id }: { children: string; id?: string }) {
  return (
    <Typography
      id={id}
      variant="caption"
      color="text.secondary"
      noWrap
      sx={BODY3}
    >
      {children}
    </Typography>
  )
}

/** The same options: the same ids and labels in the same order */
function sameOptions(a: RobotControlOption[], b: RobotControlOption[]) {
  return (
    a.length === b.length &&
    a.every(
      (option, i) => option.id === b[i]?.id && option.label === b[i]?.label,
    )
  )
}

/**
 * A select of the bar with its label to the left, e.g. the TCP. It renders
 * again only for other options or another value: an open menu measures its
 * place on every render, and an app may render on every update of the robot.
 */
const BarSelect = memo(
  function BarSelect({
    label,
    options,
    value,
    onChange,
  }: RobotControlSelect & { label: string }) {
    const labelId = useId()
    return (
      <Stack direction="row" sx={{ gap: "8px", alignItems: "center" }}>
        <Label id={labelId}>{label}</Label>
        <Box sx={{ width: "172px", flexShrink: 0 }}>
          <AdornedSelect
            labelId={labelId}
            adornedSize="small"
            // Figma's select of the bar: 36 px high, its value as input/value
            // (14 px), smaller than the design system's small select (41 px)
            sx={{
              // Two classes: the small select sets its padding with two too
              "& .MuiInputBase-input.MuiSelect-select": {
                // 36 px with the 1 px border of the select
                paddingY: "5px",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                minHeight: "24px",
              },
            }}
            value={value}
            renderValue={(id) =>
              options.find((option) => option.id === id)?.label ?? String(id)
            }
            onChange={(event) => onChange(String(event.target.value))}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </AdornedSelect>
        </Box>
      </Stack>
    )
  },
  (a, b) =>
    a.label === b.label &&
    a.value === b.value &&
    a.onChange === b.onChange &&
    sameOptions(a.options, b.options),
)

const BarDivider = () => (
  <Divider orientation="vertical" flexItem={false} sx={{ height: "16px" }} />
)

/**
 * The bar under the 3D view: the TCP's current pose in a TCP and frame of
 * its own, a button to copy it, the orientation format, and the state of
 * the robot's motion stream
 */
export const CurrentPoseBar = externalizeComponent(
  ({
    getCurrentPose,
    tcp,
    frame,
    state,
    error,
    orientationFormat: appFormat,
    onOrientationFormatChange,
    sx,
  }: CurrentPoseBarProps) => {
    const { t } = useTranslation()
    const bar = useRef<HTMLDivElement>(null)
    const [ownFormat, setOwnFormat] = useState(DEFAULT_ORIENTATION_FORMAT)
    const format = appFormat ?? ownFormat
    // The bar while Orientation format is open: the popover opens above it
    const [formatAnchor, setFormatAnchor] = useState<HTMLElement | null>(null)
    const { copied, copy } = useCopyText()

    // The pose as text on every frame: it renders only when the pose changes,
    // and a new format shows at once
    const poseJson = useEveryFrame(() => JSON.stringify(getCurrentPose()), true)
    const pose = JSON.parse(poseJson) as RobotControlPose | null
    const values = poseValues(pose, format)

    // The app's latest functions, called through functions of the bar's own
    // that stay the same: the selects and the popover render again only for
    // what they show
    const latest = useRef({ tcp, frame, onOrientationFormatChange })
    latest.current = { tcp, frame, onOrientationFormatChange }
    const changeTcp = useCallback(
      (id: string) => latest.current.tcp?.onChange(id),
      [],
    )
    const changeFrame = useCallback(
      (id: string) => latest.current.frame?.onChange(id),
      [],
    )
    const changeFormat = useCallback((next: OrientationFormat) => {
      setOwnFormat(next)
      latest.current.onOrientationFormatChange?.(next)
    }, [])
    const closeFormat = useCallback(() => setFormatAnchor(null), [])

    function copyPose() {
      // The pose as Move to reads it, whatever the format shown
      const current = getCurrentPose()
      if (current) void copy(poseToText(current))
    }

    return (
      <Stack
        ref={bar}
        direction="row"
        data-testid="current-pose-bar"
        sx={[
          (theme) => ({
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "8px 16px",
            minHeight: "54px",
            boxSizing: "border-box",
            borderRadius: "10px",
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.backgroundPaperElevation?.[2],
            boxShadow: theme.shadows[16],
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Stack
          direction="row"
          sx={{ gap: "12px", alignItems: "center", minWidth: 0 }}
        >
          <Label>{t("CurrentPose.Title.lb")}</Label>
          <IconButton
            aria-label={t("CurrentPose.OrientationFormat.ti")}
            aria-haspopup="dialog"
            aria-expanded={formatAnchor !== null}
            onClick={() => setFormatAnchor(bar.current)}
            // The 24 px icon of Figma, with a larger area to click
            sx={{ padding: "3px", margin: "-3px", color: "text.secondary" }}
          >
            <Settings />
          </IconButton>
          {tcp && (
            <>
              <BarDivider />
              <BarSelect
                label={t("RobotControl.Tcp.lb")}
                options={tcp.options}
                value={tcp.value}
                onChange={changeTcp}
              />
            </>
          )}
          {frame && (
            <>
              <BarDivider />
              <BarSelect
                label={t("CurrentPose.RelativeTo.lb")}
                options={frame.options}
                value={frame.value}
                onChange={changeFrame}
              />
            </>
          )}
          <BarDivider />
          <Stack
            direction="row"
            data-testid="current-pose-values"
            sx={{
              gap: "12px",
              alignItems: "center",
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            {values.map(({ label, value, kind }, i) => (
              <Stack
                // biome-ignore lint/suspicious/noArrayIndexKey: a fixed order; ZXZ has Rz twice
                key={i}
                direction="row"
                sx={{ gap: kind === "orientation" ? "1px" : "2px" }}
              >
                <Typography
                  variant="caption"
                  sx={{ ...BODY3, color: LABEL_COLORS[kind] }}
                >
                  {label}
                </Typography>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    ...BODY3,
                    color: "text.secondary",
                    // Digits of one width: the values don't jump while jogging
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {value}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Tooltip
            title={t("CurrentPose.Copied.lb")}
            open={copied}
            disableHoverListener
            placement="top"
          >
            <span>
              <IconButton
                aria-label={t("CurrentPose.Copy.bt")}
                onClick={copyPose}
                disabled={!pose}
                sx={{
                  width: "30px",
                  height: "30px",
                  padding: "5px",
                  borderRadius: "10px",
                  color: "text.secondary",
                  "& svg": { width: "20px", height: "20px" },
                }}
              >
                <ContentCopyFilled />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        <StreamStatus state={state} error={error} />

        <OrientationFormatPopover
          anchor={formatAnchor}
          open={formatAnchor !== null}
          onClose={closeFormat}
          format={format}
          onChange={changeFormat}
        />
      </Stack>
    )
  },
)
