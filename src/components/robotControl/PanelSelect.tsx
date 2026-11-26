import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { AdornedSelect } from "@wandelbots/mui"
import { useId } from "react"
import type { RobotControlOption } from "./robotControlTypes"

type SelectProps = {
  label: string
  options: RobotControlOption[]
  value: string
  onChange: (id: string) => void
  disabled: boolean
}

/** The label of the chosen option: the select would show its id */
function labelOf(options: RobotControlOption[], id: unknown): string {
  return options.find((option) => option.id === id)?.label ?? String(id)
}

function menuItems(options: RobotControlOption[]) {
  return options.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.label}
    </MenuItem>
  ))
}

/** A select of the panel with its label inside, e.g. the TCP */
export function PanelSelect({
  label,
  options,
  value,
  onChange,
  disabled,
}: SelectProps) {
  // AdornedSelect would make the label's id from its text: the same for the
  // TCP select of two panels on one page
  const labelId = useId()

  return (
    <AdornedSelect
      label={label}
      labelId={labelId}
      value={value}
      disabled={disabled}
      renderValue={(id) => labelOf(options, id)}
      onChange={(event) => onChange(String(event.target.value))}
    >
      {menuItems(options)}
    </AdornedSelect>
  )
}

/** A select with its label to the left of it, e.g. the step size */
export function InlineSelect({
  label,
  options,
  value,
  onChange,
  disabled,
}: SelectProps) {
  const labelId = useId()

  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}
    >
      <Typography id={labelId} variant="body2" color="text.secondary">
        {label}
      </Typography>
      {/* The right column of the two selects above, 12 px apart */}
      <Box sx={{ width: "calc((100% - 12px) / 2)", flexShrink: 0 }}>
        <AdornedSelect
          labelId={labelId}
          adornedSize="small"
          value={value}
          disabled={disabled}
          renderValue={(id) => labelOf(options, id)}
          onChange={(event) => onChange(String(event.target.value))}
        >
          {menuItems(options)}
        </AdornedSelect>
      </Box>
    </Stack>
  )
}
