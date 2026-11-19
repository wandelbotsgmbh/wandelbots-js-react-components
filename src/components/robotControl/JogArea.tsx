import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { Jog } from "@wandelbots/icons/Jog"
import { ViewModuleFilled } from "@wandelbots/icons/ViewModuleFilled"
import type { RefObject } from "react"
import { useTranslation } from "react-i18next"
import type { Quaternion } from "three"
import { JoggingGizmo } from "../jogging/gizmo/JoggingGizmo"
import { JoggingButtons } from "../jogging/JoggingButtons"
import type { JogControlsProps } from "../jogging/useJogControls"
import type { JogMode } from "./JogModeToggle"

/** Which jog controls the jog area shows */
export type JogView = "gizmo" | "buttons"

type JogAreaProps = {
  view: JogView
  onViewChange: (view: JogView) => void
  mode: JogMode
  /** The props of the gizmo or the buttons, whichever is shown */
  controls: JogControlsProps
  /** Without it, there is no gizmo: the buttons, and no switch */
  gizmoOrientation?: RefObject<Quaternion | null>
  gizmoFrameQuaternion?: Quaternion | (() => Quaternion)
}

/**
 * Where the jog controls go: the gizmo or the buttons, a switch between the
 * two in the corner, and a hint saying how to jog with what is shown
 */
export function JogArea({
  view,
  onViewChange,
  mode,
  controls,
  gizmoOrientation,
  gizmoFrameQuaternion,
}: JogAreaProps) {
  const { t } = useTranslation()
  const showsGizmo = view === "gizmo" && gizmoOrientation !== undefined

  const hint = showsGizmo
    ? mode === "increment"
      ? t("RobotControl.JogArea.Hint.ClickHandle.lb")
      : t("RobotControl.JogArea.Hint.HoldHandle.lb")
    : mode === "increment"
      ? t("RobotControl.JogArea.Hint.ClickButton.lb")
      : t("RobotControl.JogArea.Hint.HoldButton.lb")
  const switchLabel = showsGizmo
    ? t("RobotControl.JogArea.ShowButtons.bt")
    : t("RobotControl.JogArea.ShowGizmo.bt")

  return (
    <Stack
      data-testid="jog-area"
      sx={{ position: "relative", alignItems: "center", gap: "16px" }}
    >
      {gizmoOrientation && (
        <Tooltip title={switchLabel} placement="left">
          <IconButton
            aria-label={switchLabel}
            onClick={() => onViewChange(showsGizmo ? "buttons" : "gizmo")}
            size="small"
            sx={(theme) => ({
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
              borderRadius: "8px",
              border: `1px solid ${theme.palette.divider}`,
              background: theme.palette.backgroundPaperElevation?.[11],
            })}
          >
            {showsGizmo ? <ViewModuleFilled /> : <Jog />}
          </IconButton>
        </Tooltip>
      )}

      {showsGizmo ? (
        <JoggingGizmo
          {...controls}
          orientation={gizmoOrientation}
          frameQuaternion={gizmoFrameQuaternion}
          size={180}
        />
      ) : (
        <JoggingButtons {...controls} />
      )}

      <Typography variant="body2" color="text.secondary" textAlign="center">
        {hint}
      </Typography>
    </Stack>
  )
}
