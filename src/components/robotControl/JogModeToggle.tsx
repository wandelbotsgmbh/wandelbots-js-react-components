import { styled } from "@mui/material/styles"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useTranslation } from "react-i18next"

/** Jogging while a control is held, or one step per press */
export type JogMode = "continuous" | "increment"

const ModeGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: "4px",
  "& .MuiToggleButton-root": {
    border: "none",
    borderRadius: "8px",
    padding: "6px 16px",
    textTransform: "none",
    fontSize: "14px",
    color: theme.palette.text.secondary,
  },
  "& .MuiToggleButton-root.Mui-selected": {
    color: theme.palette.text.primary,
    background: theme.palette.backgroundPaperElevation?.[11],
  },
}))

/** Continuous or Increment jogging: one of the two is always selected */
export function JogModeToggle({
  value,
  onChange,
  disabled,
}: {
  value: JogMode
  onChange: (value: JogMode) => void
  disabled: boolean
}) {
  const { t } = useTranslation()

  return (
    <ModeGroup
      exclusive
      value={value}
      disabled={disabled}
      aria-label={t("RobotControl.JogMode.lb")}
      onChange={(_event, next: JogMode | null) => {
        // Pressing the selected mode again would select none
        if (next !== null) onChange(next)
      }}
    >
      <ToggleButton value="continuous">
        {t("RobotControl.JogMode.Continuous.bt")}
      </ToggleButton>
      <ToggleButton value="increment">
        {t("RobotControl.JogMode.Increment.bt")}
      </ToggleButton>
    </ModeGroup>
  )
}
