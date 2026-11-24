import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  CurrentPose,
  JoggingGizmoOrientation,
  RobotControl,
  RobotSessionProvider,
  RobotView,
} from "@wandelbots/wandelbots-js-react-components"
import { useRef, useState } from "react"
import type { Quaternion } from "three"
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
 * bottom. View, panel and bar are the library's connected components of
 * the session: RobotView, RobotControl and CurrentPose. The page places
 * them; they do not know where they are.
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
  const [modelDrawn, setModelDrawn] = useState(false)

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
          {/* The robot's 3D view fills the box. data-model-drawn turns "true"
              when the robot's model is drawn: the e2e tests wait for it. */}
          <Box
            data-testid="viewport"
            data-model-drawn={modelDrawn}
            sx={{ position: "absolute", inset: 0 }}
          >
            <RobotView onModelDrawn={() => setModelDrawn(true)}>
              {/* Anywhere in the 3D view: it takes the camera's up */}
              <JoggingGizmoOrientation target={orientation} />
            </RobotView>
          </Box>

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
