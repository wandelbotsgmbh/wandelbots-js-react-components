import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import { useId } from "react"
import { useTranslation } from "react-i18next"
import type { RobotHeaderActivation } from "./RobotHeader"

/**
 * Whether the robot is activated (its controller in control mode), as
 * RobotPad's ServoActivationToggle: on while active or deactivating, off and
 * waiting while it changes, with a spinner
 */
export function ActivationSwitch({
  state,
  disabled = false,
  onToggle,
}: RobotHeaderActivation) {
  const { t } = useTranslation()
  const labelId = useId()
  const changing = state === "activating" || state === "deactivating"
  // The keys of the states, listed for the translation check:
  // SafetyBar.ActivationToggle.Activate.bt, …Activating.bt, …Activated.bt,
  // …Deactivating.bt
  const label = {
    inactive: t("SafetyBar.ActivationToggle.Activate.bt"),
    activating: t("SafetyBar.ActivationToggle.Activating.bt"),
    active: t("SafetyBar.ActivationToggle.Activated.bt"),
    deactivating: t("SafetyBar.ActivationToggle.Deactivating.bt"),
  }[state]

  return (
    <Stack
      direction="row"
      data-testid="robot-activation"
      sx={{ gap: "4px", alignItems: "center" }}
    >
      <Switch
        size="small"
        checked={state === "active" || state === "deactivating"}
        disabled={changing || disabled}
        onChange={() => onToggle()}
        // A switch to screen readers, named by its label
        slotProps={{ input: { role: "switch", "aria-labelledby": labelId } }}
      />
      <Typography
        id={labelId}
        variant="body2"
        color="text.secondary"
        noWrap
        sx={{ letterSpacing: "0.17px" }}
      >
        {label}
      </Typography>
      {changing && <CircularProgress size={16} />}
    </Stack>
  )
}
