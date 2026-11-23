import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  CurrentPose,
  JoggingGizmoOrientation,
  RobotControl,
  RobotSessionProvider,
} from "@wandelbots/wandelbots-js-react-components"
import { useRef } from "react"
import type { Quaternion } from "three"
import { FitCamera, MotionGroupModel, Viewport } from "../scene"
import type { PageProps } from "."
import { RobotHeaderDemo } from "./RobotHeaderDemo"

/** The space between the parts and the edges of the 3D view, as in Figma */
const GAP = "12px"
/** The height of CurrentPoseBar, as in Figma */
const BAR_HEIGHT = "54px"

/**
 * The parts put together as in the Figma design: RobotHeader on top, then
 * the robot's 3D view, RobotControlPanel floating at its top right (as
 * RobotPad's flyout) and ending above CurrentPoseBar, which runs along its
 * bottom. Panel and bar are the library's connected components of the
 * session, RobotControl and CurrentPose.
 */
export function LayoutsPage({
  instance,
  session,
  motionGroupIds,
  onMotionGroupChange,
  onPageChange,
}: PageProps) {
  // The camera's orientation for the panel's gizmo
  const orientation = useRef<Quaternion | null>(null)

  return (
    <RobotSessionProvider session={session}>
      <Stack sx={{ position: "absolute", inset: 0 }}>
        <RobotHeaderDemo
          instance={instance}
          session={session}
          motionGroupIds={motionGroupIds}
          onMotionGroupChange={onMotionGroupChange}
          onPageChange={onPageChange}
        />
        <Box sx={{ position: "relative", flex: 1, minHeight: 0 }}>
          <Viewport>
            <FitCamera>
              {(refit) => (
                <MotionGroupModel session={session} onModelLoaded={refit} />
              )}
            </FitCamera>
            {/* Anywhere in the 3D view: it translates NOVA's Z up itself */}
            <JoggingGizmoOrientation target={orientation} />
          </Viewport>

          <Box
            sx={(theme) => ({
              position: "absolute",
              top: GAP,
              right: GAP,
              width: "444px",
              maxWidth: `calc(100% - 2 * ${GAP})`,
              // Down to the bar, with a gap
              maxHeight: `calc(100% - 3 * ${GAP} - ${BAR_HEIGHT})`,
              overflowY: "auto",
              borderRadius: "16px",
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[16],
            })}
          >
            <RobotControl gizmoOrientation={orientation} />
          </Box>
          <Box
            sx={{ position: "absolute", left: GAP, right: GAP, bottom: GAP }}
          >
            <CurrentPose />
          </Box>
        </Box>
      </Stack>
    </RobotSessionProvider>
  )
}
