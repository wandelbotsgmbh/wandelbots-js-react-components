import Alert from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import {
  ConnectionWarning,
  CurrentPose,
  RobotControl,
  RobotHeader,
} from "@wandelbots/wandelbots-js-react-components"
import { useLoadedSession } from "../connections"
import type { PageProps } from "."

/**
 * The parts of a robot session, each given the session of the top bar's
 * motion group: the header, the Robot control panel and the current pose
 * bar. The panel jogs with buttons here; with a 3D view, the app gives it
 * the camera through `gizmoOrientation`.
 */
export function SessionPartsPage({ instance, motionGroup }: PageProps) {
  const { value: session, error } = useLoadedSession(
    instance,
    motionGroup.motionGroupId,
  )

  if (error) {
    return <Alert severity="error">{String(error)}</Alert>
  }
  if (!session) {
    return <CircularProgress aria-label="Loading the robot session" />
  }

  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Each part takes the session:{" "}
        <code>{"<RobotHeader session={…} />"}</code>,{" "}
        <code>{"<RobotControl session={…} />"}</code> and{" "}
        <code>{"<CurrentPose session={…} />"}</code>. The app places them.
      </Typography>
      <RobotHeader
        appName="Session parts"
        session={session}
        actions={<ConnectionWarning session={session} />}
      />
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack sx={{ width: 444, flexShrink: 0 }}>
          <RobotControl session={session} />
        </Stack>
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <CurrentPose session={session} />
        </Stack>
      </Stack>
    </Stack>
  )
}
