import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import {
  JoggingJointValueControl,
  JointLimitGizmo,
  type RobotSession,
  robotModelOf,
  useSmoothedMotionState,
  VelocitySlider,
  VelocitySliderLabel,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import { useMemo } from "react"
import { startJogging, stopJogging } from "../connections"
import { cannotJog } from "../jogging"
import {
  FitCamera,
  MotionGroupModel,
  NovaCoordinates,
  Viewport,
  ViewWithSidePanel,
} from "../scene"
import type { PageProps } from "."

/**
 * The robot with JointLimitGizmo (DH parameters, limits and joint positions
 * of the motion group), next to a JoggingJointValueControl per joint and the
 * VelocitySlider.
 */
export function JointLimitsPage({ session }: PageProps) {
  return (
    <ViewWithSidePanel
      view={
        <Viewport>
          <FitCamera>
            {(refit) => (
              <MotionGroupModel session={session} onModelLoaded={refit} />
            )}
          </FitCamera>
          <MotionGroupJointLimits session={session} />
        </Viewport>
      }
      panel={<JointControls session={session} />}
    />
  )
}

/**
 * JointLimitGizmo over the robot, with the same DH parameters and the same
 * smoothed joint positions as the robot. The gizmo draws in NOVA coordinates,
 * inside the mounting of the robot (see the documentation of JointLimitGizmo).
 */
const MotionGroupJointLimits = observer(
  ({ session }: { session: RobotSession }) => {
    const { description } = session
    // Robot smooths the joint positions in the same way
    const smoothed = useSmoothedMotionState(
      session.state.rapidlyChangingMotionState,
    )
    const limits = useMemo(
      () =>
        description.dhParameters.map(
          (_, index) => description.jointLimits[index]?.position ?? null,
        ),
      [description],
    )
    // The mounting in 3D units
    const { mountingPosition, mountingQuaternion } = robotModelOf(session)

    return (
      <group position={mountingPosition} quaternion={mountingQuaternion}>
        <NovaCoordinates>
          <JointLimitGizmo
            dhParameters={description.dhParameters}
            chainOffset={description.kinematicChainOffset}
            limits={limits}
            jointPositions={[...smoothed.joint_position]}
            size={0.12}
          />
        </NovaCoordinates>
      </group>
    )
  },
)

/**
 * The joint jogging of JoggingPanel, built from the public parts. The
 * session's JoggingStore jogs only a robot that may move: activate it with
 * the switch of the top bar.
 */
const JointControls = observer(({ session }: { session: RobotSession }) => {
  const store = session.jogging
  const revolute = store.jointType === JointTypeEnum.RevoluteJoint

  return (
    <Stack gap={3} sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary">
        A JoggingJointValueControl per joint and the VelocitySlider, with a
        JoggingStore of {store.jogger.motionGroupId}. The limits are the auto
        limits of the motion group.
      </Typography>
      <VelocitySlider
        store={store}
        useDegree={revolute}
        velocity={store.velocityInDisplayUnits(revolute)}
        min={store.minVelocityInDisplayUnits(revolute)}
        max={store.maxVelocityInDisplayUnits(revolute)}
        onVelocityChange={store.setVelocityFromSlider}
        disabled={store.isLocked}
        renderValue={(value) => (
          <VelocitySliderLabel
            value={`${value} ${revolute ? "°/s" : "mm/s"}`}
          />
        )}
      />
      {store.jogger.motionStream.joints.map(({ index }) => {
        const limits =
          store.motionGroupDescription.operation_limits.auto_limits?.joints?.[
            index
          ]?.position
        return (
          <Stack key={index} direction="row" alignItems="center" gap={2}>
            <Typography sx={{ width: 24 }} color="text.secondary">
              J{index + 1}
            </Typography>
            <JoggingJointValueControl
              useDegree={revolute}
              lowerLimit={limits?.lower_limit}
              upperLimit={limits?.upper_limit}
              disabled={cannotJog(session)}
              getValue={() =>
                store.jogger.motionStream.rapidlyChangingMotionState
                  .joint_position[index]
              }
              startJogging={(direction) =>
                startJogging(store, { joint: index, direction })
              }
              stopJogging={() => stopJogging(store)}
            />
          </Stack>
        )
      })}
    </Stack>
  )
})
