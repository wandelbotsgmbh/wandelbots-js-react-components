import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import { observer } from "mobx-react-lite"
import { useId } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { useOptionalRobotSessionOf } from "../robotSession/RobotSessionProvider"
import type { RobotHeaderActivation } from "./RobotHeader"
import { robotActivationOf } from "./robotActivationOf"

/**
 * The activation switch of a robot session (`session`, else the
 * provider's). Without a robot, e.g. while none is loaded, nothing.
 */
export type ActivationSwitchOfSessionProps = {
  session: RobotSession | undefined
}

/**
 * Whether the robot is activated (its controller in control mode), as
 * RobotPad's ServoActivationToggle: on while active or deactivating, off and
 * waiting while it changes, with a spinner. Given a robot session, it
 * switches the robot's controller and is off while NOVA would refuse it; a
 * refused mode change goes to the session's `onError`:
 * `<ActivationSwitch session={session} />`. RobotHeader has it already.
 */
export const ActivationSwitch = externalizeComponent(
  observer(function ActivationSwitch(
    props: RobotHeaderActivation | ActivationSwitchOfSessionProps,
  ) {
    const robot = useOptionalRobotSessionOf(
      "session" in props ? props.session : undefined,
    )
    const activation =
      "session" in props ? robot && robotActivationOf(robot) : props
    if (!activation) return null
    return <ActivationSwitchView {...activation} />
  }),
)

function ActivationSwitchView({
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
