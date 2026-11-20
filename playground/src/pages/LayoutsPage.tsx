import Box from "@mui/material/Box"
import {
  JoggingGizmoOrientation,
  LoadingCover,
} from "@wandelbots/wandelbots-js-react-components"
import { useRef } from "react"
import type { Quaternion } from "three"
import { useJoggingStore } from "../connections"
import { FitCamera, MotionGroupModel, Viewport } from "../scene"
import type { PageProps } from "."
import { CurrentPoseBarDemo } from "./CurrentPoseBarDemo"
import { RobotControlPanelDemo } from "./RobotControlPanelDemo"

/** The space between the parts and the edges of the 3D view, as in Figma */
const GAP = "12px"
/** The height of CurrentPoseBar, as in Figma */
const BAR_HEIGHT = "54px"

/**
 * The parts put together as in the Figma design: the robot's 3D view fills
 * the page, RobotControlPanel floats at its top right (as RobotPad's flyout)
 * and ends above CurrentPoseBar, which runs along its bottom. Both are wired
 * to the JoggingStore of the motion group.
 */
export function LayoutsPage({ instance, motionGroup }: PageProps) {
  const jogging = useJoggingStore(instance, motionGroup.motionGroupId)
  const store = jogging.value
  // The camera's orientation for the panel's gizmo
  const orientation = useRef<Quaternion | null>(null)

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Viewport>
        <FitCamera>
          {(refit) => (
            <MotionGroupModel motionGroup={motionGroup} onModelLoaded={refit} />
          )}
        </FitCamera>
        {/* Anywhere in the 3D view: it translates NOVA's Z up itself */}
        <JoggingGizmoOrientation target={orientation} />
      </Viewport>

      {store ? (
        <>
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
            <RobotControlPanelDemo
              instance={instance}
              store={store}
              gizmoOrientation={orientation}
            />
          </Box>
          <Box
            sx={{ position: "absolute", left: GAP, right: GAP, bottom: GAP }}
          >
            <CurrentPoseBarDemo store={store} />
          </Box>
        </>
      ) : (
        <LoadingCover message="Loading jogging" error={jogging.error} />
      )}
    </Box>
  )
}
