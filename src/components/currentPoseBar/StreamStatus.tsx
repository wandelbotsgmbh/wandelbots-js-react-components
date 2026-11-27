import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import type { CurrentPoseBarState } from "./CurrentPoseBar"

/** Figma shows Ready in green; a pause of the robot's own is a warning */
const STATE_COLORS: Partial<
  Record<CurrentPoseBarState | "KIND_UNKNOWN", string>
> = {
  KIND_UNKNOWN: "success.main",
  RUNNING: "info.main",
  PAUSED_NEAR_COLLISION: "warning.main",
  PAUSED_NEAR_JOINT_LIMIT: "warning.main",
  PAUSED_NEAR_SINGULARITY: "warning.main",
}

/**
 * The state of the robot's motion stream, as RobotPad's StreamStateSection:
 * an error that outlasts its motion comes first, since the state is normal
 * again as soon as the motion stops
 */
export function StreamStatus({
  state,
  error,
}: {
  state: CurrentPoseBarState | null | undefined
  error: string | null | undefined
}) {
  const { t } = useTranslation()
  const kind = state ?? "KIND_UNKNOWN"
  const text = error || t(`Jogging.StreamStateSection.${kind}.lb`)
  const color = error ? "error.main" : (STATE_COLORS[kind] ?? "text.secondary")

  return (
    // A long error is cut off: the whole of it on hover
    <Tooltip title={error ? text : ""} placement="top-end">
      <Stack
        direction="row"
        data-testid={error ? "JOG_ERROR" : kind}
        sx={{ gap: "5px", alignItems: "center", minWidth: 0 }}
      >
        <Box
          sx={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            flexShrink: 0,
            bgcolor: color,
          }}
        />
        <Typography
          variant="caption"
          noWrap
          sx={{ color, letterSpacing: "0.17px" }}
        >
          {text}
        </Typography>
      </Stack>
    </Tooltip>
  )
}
