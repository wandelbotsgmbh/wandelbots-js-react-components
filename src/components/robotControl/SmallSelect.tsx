import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import { AdornedSelect } from "@wandelbots/mui"
import { memo } from "react"
import type {
  RobotControlOption,
  RobotControlSelect,
} from "./robotControlTypes"

/** The same options: the same ids and labels in the same order */
function sameOptions(a: RobotControlOption[], b: RobotControlOption[]) {
  return (
    a.length === b.length &&
    a.every(
      (option, i) => option.id === b[i]?.id && option.label === b[i]?.label,
    )
  )
}

type SmallSelectProps = RobotControlSelect & {
  /** The id of the element that names the select */
  labelId: string
  width: string
}

/**
 * The select of Figma's bars (CurrentPoseBar, RobotHeader): 36 px high, its
 * value as input/value (14 px), smaller than the design system's small
 * select (41 px). It renders again only for other options or another value:
 * an open menu measures its place on every render, and an app may render on
 * every update of the robot.
 */
export const SmallSelect = memo(
  function SmallSelect({
    labelId,
    width,
    options,
    value,
    onChange,
  }: SmallSelectProps) {
    return (
      <Box sx={{ width, flexShrink: 0 }}>
        <AdornedSelect
          labelId={labelId}
          adornedSize="small"
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
    )
  },
  (a, b) =>
    a.labelId === b.labelId &&
    a.width === b.width &&
    a.value === b.value &&
    a.onChange === b.onChange &&
    sameOptions(a.options, b.options),
)
