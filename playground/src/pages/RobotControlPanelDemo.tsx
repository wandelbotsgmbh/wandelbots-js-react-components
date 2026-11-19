import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  type ConnectedMotionGroup,
  JoggingGizmoOrientation,
  type JoggingStore,
  RobotControlPanel,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import type { Quaternion } from "three"
import { jogStep, startJogging, stopJogging } from "../connections"
import { cannotJog, useToolFrame } from "../jogging"
import { FitCamera, MotionGroupModel, Viewport } from "../scene"

const toRadians = (degrees: number) => (degrees * Math.PI) / 180
const toDegrees = (radians: number) => (radians * 180) / Math.PI

/** The step sizes of JoggingPanel's Increment mode, in NOVA's units */
const STEPS = {
  translate: [0.1, 1, 5, 10],
  rotate: [0.05, 0.5, 2.5, 5].map(toRadians),
}

/**
 * The whole RobotControlPanel, wired to a JoggingStore as an app wires it,
 * next to a 3D view of the motion group whose camera the gizmo follows
 */
export const RobotControlPanelDemo = observer(
  ({
    store,
    motionGroup,
  }: {
    store: JoggingStore
    motionGroup: ConnectedMotionGroup
  }) => {
    const orientation = useRef<Quaternion | null>(null)
    const toolFrame = useToolFrame(store)
    const tool = store.selectedOrientation === "tool"

    return (
      <Stack direction="row" gap={3} flexWrap="wrap" alignItems="flex-start">
        <Box
          sx={{
            position: "relative",
            width: 260,
            height: 260,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Viewport>
            <FitCamera>
              {(refit) => (
                <MotionGroupModel
                  motionGroup={motionGroup}
                  onModelLoaded={refit}
                />
              )}
            </FitCamera>
            {/* Anywhere in the 3D view: it translates NOVA's Z up itself */}
            <JoggingGizmoOrientation target={orientation} />
          </Viewport>
        </Box>

        <RobotControlPanel
          sx={{ width: 444, maxWidth: "100%" }}
          disabled={cannotJog(store)}
          gizmoOrientation={orientation}
          gizmoFrameQuaternion={tool ? toolFrame : undefined}
          tcp={
            store.tcps.length > 0
              ? {
                  options: store.tcps.map((tcp) => ({
                    id: tcp.id,
                    label: tcp.id,
                  })),
                  value: store.selectedTcpId,
                  onChange: (id) =>
                    store.requestTcpChange(id).catch((error) => {
                      console.error("Changing the TCP failed:", error)
                    }),
                }
              : undefined
          }
          jogFrame={{
            options: [
              { id: "coordsys", label: "World" },
              { id: "tool", label: "Tool" },
            ],
            value: store.selectedOrientation,
            onChange: (id) =>
              store.setSelectedOrientation(id === "tool" ? "tool" : "coordsys"),
          }}
          velocity={{
            translate: {
              value: store.translationVelocityMmPerSec,
              min: store.minTranslationVelocityMmPerSec,
              max: store.maxTranslationVelocityMmPerSec,
            },
            rotate: {
              value: store.rotationVelocityRadsPerSec,
              min: toRadians(store.minRotationVelocityDegPerSec),
              max: toRadians(store.maxRotationVelocityDegPerSec),
            },
          }}
          onVelocityChange={(motion, value) =>
            motion === "rotate"
              ? store.setVelocityFromSlider(toDegrees(value), true)
              : store.setVelocityFromSlider(value, false)
          }
          onJogStart={(motion, axis, direction) =>
            startJogging(store, {
              axis,
              direction,
              rotate: motion === "rotate",
              tool,
            })
          }
          onJogStop={() => stopJogging(store)}
          // A step runs along the world's axes only, as in JoggingPanel
          increments={
            tool
              ? undefined
              : {
                  steps: STEPS,
                  onStep: (motion, axis, direction, distance) =>
                    jogStep(store, {
                      axis,
                      direction,
                      rotate: motion === "rotate",
                      distance,
                    }),
                  running: store.incrementJogInProgress,
                }
          }
        />
      </Stack>
    )
  },
)
