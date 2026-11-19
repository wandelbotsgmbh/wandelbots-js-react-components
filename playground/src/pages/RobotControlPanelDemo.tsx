import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import {
  type ConnectedMotionGroup,
  JoggingGizmoOrientation,
  type JoggingStore,
  RobotControlPanel,
} from "@wandelbots/wandelbots-js-react-components"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import { observer } from "mobx-react-lite"
import { useRef } from "react"
import type { Quaternion } from "three"
import { jogStep, startJogging, stopJogging } from "../connections"
import type { PlaygroundInstance } from "../instance"
import { cannotJog, useToolFrame } from "../jogging"
import { useMoveTo } from "../moveTo"
import { FitCamera, MotionGroupModel, Viewport } from "../scene"

const toRadians = (degrees: number) => (degrees * Math.PI) / 180
const toDegrees = (radians: number) => (radians * 180) / Math.PI

/** The joints of a six-axis robot arm, as the design names them */
const SIX_AXIS_NAMES = [
  "Base",
  "Shoulder",
  "Elbow",
  "Forearm",
  "Wrist",
  "Flange",
]

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
    instance,
    store,
    motionGroup,
  }: {
    instance: PlaygroundInstance
    store: JoggingStore
    motionGroup: ConnectedMotionGroup
  }) => {
    const orientation = useRef<Quaternion | null>(null)
    const toolFrame = useToolFrame(store)
    const tool = store.selectedOrientation === "tool"
    const moveTo = useMoveTo(instance.nova, instance.cellId, store)
    // A prismatic joint (a linear axis) is in mm, and jogs in mm/s
    const linear = store.jointType !== JointTypeEnum.RevoluteJoint
    const jointValues =
      store.jogger.motionStream.rapidlyChangingMotionState.joint_position
    const jointLimits =
      store.motionGroupDescription.operation_limits.auto_limits?.joints
    const translateVelocity = {
      value: store.translationVelocityMmPerSec,
      min: store.minTranslationVelocityMmPerSec,
      max: store.maxTranslationVelocityMmPerSec,
    }
    const rotateVelocity = {
      value: store.rotationVelocityRadsPerSec,
      min: toRadians(store.minRotationVelocityDegPerSec),
      max: toRadians(store.maxRotationVelocityDegPerSec),
    }
    const setVelocity = (rotate: boolean, value: number) =>
      rotate
        ? store.setVelocityFromSlider(toDegrees(value), true)
        : store.setVelocityFromSlider(value, false)

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
              // As RobotPad names the tool's frame
              { id: "tool", label: "Selected TCP" },
            ],
            value: store.selectedOrientation,
            onChange: (id) =>
              store.setSelectedOrientation(id === "tool" ? "tool" : "coordsys"),
          }}
          velocity={{ translate: translateVelocity, rotate: rotateVelocity }}
          onVelocityChange={(motion, value) =>
            setVelocity(motion === "rotate", value)
          }
          // Jogging takes the robot from a Move to session
          onJogStart={(motion, axis, direction) => {
            moveTo.release()
            startJogging(store, {
              axis,
              direction,
              rotate: motion === "rotate",
              tool,
            })
          }}
          onJogStop={() => stopJogging(store)}
          // A step runs along the world's axes only, as in JoggingPanel
          increments={
            tool
              ? undefined
              : {
                  steps: STEPS,
                  onStep: (motion, axis, direction, distance) => {
                    moveTo.release()
                    jogStep(store, {
                      axis,
                      direction,
                      rotate: motion === "rotate",
                      distance,
                    })
                  },
                  running: store.incrementJogInProgress,
                }
          }
          // A joint jogs with the store's rotation velocity (rad/s), or its
          // translation velocity (mm/s) when it is a linear axis
          joints={{
            joints: jointValues.map((value, index) => ({
              value,
              min: jointLimits?.[index]?.position?.lower_limit,
              max: jointLimits?.[index]?.position?.upper_limit,
              name:
                jointValues.length === SIX_AXIS_NAMES.length && !linear
                  ? SIX_AXIS_NAMES[index]
                  : undefined,
            })),
            linear,
            velocity: linear ? translateVelocity : rotateVelocity,
            onVelocityChange: (value) => setVelocity(!linear, value),
            onJogStart: (joint, direction) => {
              moveTo.release()
              startJogging(store, { joint, direction })
            },
            onJogStop: () => stopJogging(store),
          }}
          // Move to along a planned trajectory: see useMoveTo
          moveTo={{
            getCurrentPose: moveTo.getCurrentPose,
            frame: {
              options: [{ id: "world", label: "World" }],
              value: "world",
              onChange: () => {},
            },
            onTargetChange: moveTo.onTargetChange,
            planning: moveTo.planning,
            error: moveTo.error,
            onMoveStart: moveTo.onMoveStart,
            onMoveStop: moveTo.onMoveStop,
          }}
        />
      </Stack>
    )
  },
)
