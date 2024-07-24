import {
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Typography,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { JoggingAxisButtonPair } from "./JoggingAxisButtonPair"
import { useActiveRobot } from "./RobotPadContext"
import { degreesToRadians, radiansToDegree } from "@/util/converters"
import { useTranslation } from "react-i18next"
import RotationIcon from "@/icons/rotation.svg"
import XAxisIcon from "@/icons/axis-x.svg"
import YAxisIcon from "@/icons/axis-y.svg"
import ZAxisIcon from "@/icons/axis-z.svg"
import type { JoggingStore, DiscreteIncrementOption } from "./JoggingStore"
import type { MotionGroupJogger } from "./MotionGroupJogger"
import { JoggingOptions } from "./JoggingOptions"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"
import { useReaction } from "@/util/hooks"
import { JoggingCartesianValues } from "./JoggingCartesianValues"
import { JoggingJointLimitDetector } from "./JoggingJointLimitDetector"

type JoggingCartesianOpts = {
  axis: "x" | "y" | "z"
  motionType: "translate" | "rotate"
  direction: "-" | "+"
}

export const JoggingCartesianTab = observer(
  ({ store, jogger }: { store: JoggingStore; jogger: MotionGroupJogger }) => {
    const activeRobot = useActiveRobot()
    const { robotPad } = activeRobot
    const { t } = useTranslation()

    function onMotionTypeChange(
      _event: React.MouseEvent<HTMLElement>,
      newMotionType: string,
    ) {
      if (newMotionType === "translate" || newMotionType === "rotate")
        store.setSelectedCartesianMotionType(newMotionType)
    }

    useReaction(
      () => [store.selectedCoordSystemId, store.selectedTcpId],
      () => {
        store.activeRobot.motionStateSocket.path = `${activeRobot.robotPad.nova.api.config.basePath}/cells/${activeRobot.robotPad.cellId}/motion-groups/${activeRobot.motionGroupId}/state-stream?tcp=${store.selectedTcpId}&response_coordinate_system=${store.selectedCoordSystemId}`
        store.activeRobot.motionStateSocket.reconnect()
      },
      { fireImmediately: true } as any,
    )

    async function runIncrementalCartesianJog(
      opts: JoggingCartesianOpts,
      increment: DiscreteIncrementOption,
    ) {
      const tcpPose = activeRobot.rapidlyChangingMotionState.tcp_pose
      const jointPosition =
        activeRobot.rapidlyChangingMotionState.state.joint_position
      if (!tcpPose) return

      await robotPad.withMotionLock(async () => {
        await jogger.runIncrementalCartesianMotion({
          currentTcpPose: tcpPose,
          currentJoints: jointPosition,
          coordSystemId: store.selectedCoordSystemId,
          velocityInRelevantUnits: store.velocityInCurrentUnits,
          axis: opts.axis,
          direction: opts.direction,
          motion:
            store.selectedCartesianMotionType === "translate"
              ? {
                  type: "translate",
                  distanceMm: increment.mm,
                }
              : {
                  type: "rotate",
                  distanceRads: degreesToRadians(increment.degrees),
                },
        })
      })
    }

    async function startCartesianJogging(opts: JoggingCartesianOpts) {
      if (robotPad.isLocked) return

      if (store.selectedDiscreteIncrement) {
        return runIncrementalCartesianJog(opts, store.selectedDiscreteIncrement)
      }

      await jogger.startCartesianJogging({
        tcpId: store.selectedTcpId,
        coordSystemId: store.selectedCoordSystemId,
        axis: opts.axis,
        direction: opts.direction,
        motion:
          opts.motionType === "translate"
            ? {
                type: "translate",
                velocityMmPerSec: store.translationVelocityMmPerSec,
              }
            : {
                type: "rotate",
                velocityRadsPerSec: store.rotationVelocityRadsPerSec,
              },
      })
    }

    async function stopJogging() {
      if (robotPad.isLocked) return

      if (store.selectedDiscreteIncrement) {
        return
      }

      await jogger.stopJogging()
    }

    const axisList = [
      {
        id: "x",
        color: "#F14D42",
        icon: <XAxisIcon />,
      },
      {
        id: "y",
        color: "#42A705",
        icon: <YAxisIcon />,
      },
      {
        id: "z",
        color: "#0075FF",
        icon: <ZAxisIcon />,
      },
    ] as const

    function formatMM(value: number) {
      return t("General.mm.variable", { amount: value.toFixed(1) })
    }

    function formatDegrees(value: number) {
      return t("General.degree.variable", {
        amount: radiansToDegree(value).toFixed(1),
      })
    }

    return (
      <Stack>
        {/* Jogging options */}
        <JoggingOptions store={store} />

        {/* Velocity slider */}
        <JoggingVelocitySlider store={store} />

        {/* Show Wandelscript string for the current coords */}
        <JoggingCartesianValues />

        {/* Translate or rotate toggle */}
        <Stack alignItems="center" marginTop="1rem">
          <ToggleButtonGroup
            value={store.selectedCartesianMotionType}
            onChange={onMotionTypeChange}
            exclusive
            aria-label={t("Jogging.Cartesian.MotionType.lb")}
            sx={{
              "& > button": {
                borderRadius: "8px",
                textTransform: "none",
                padding: "4px 30px",
              },
            }}
          >
            <ToggleButton value="translate">
              {t("Jogging.Cartesian.Translation.bt")}
            </ToggleButton>
            <ToggleButton value="rotate">
              {t("Jogging.Cartesian.Rotation.bt")}
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack width="80%" maxWidth="296px" margin="auto">
          {/* Cartesian translate jogging */}
          {store.selectedCartesianMotionType === "translate" &&
            axisList.map((axis) => (
              <JoggingAxisButtonPair
                key={axis.id}
                color={axis.color}
                disabled={robotPad.isLocked}
                sx={{
                  marginTop: "12px",
                }}
                label={
                  <>
                    {axis.icon}
                    <Typography
                      sx={{
                        fontSize: "24px",
                        color: "white",
                      }}
                    >
                      {axis.id.toUpperCase()}
                    </Typography>
                  </>
                }
                getDisplayedValue={() =>
                  formatMM(
                    activeRobot.rapidlyChangingMotionState.tcp_pose?.position[
                      axis.id
                    ] || 0,
                  )
                }
                startJogging={(direction: "-" | "+") =>
                  startCartesianJogging({
                    axis: axis.id,
                    motionType: "translate",
                    direction,
                  })
                }
                stopJogging={stopJogging}
              />
            ))}

          {/* Cartesian rotate jogging */}
          {store.selectedCartesianMotionType === "rotate" &&
            axisList.map((axis) => (
              <JoggingAxisButtonPair
                key={axis.id}
                color={axis.color}
                disabled={robotPad.isLocked}
                sx={{
                  marginTop: "12px",
                }}
                label={
                  <>
                    <RotationIcon />
                    <Typography
                      sx={{
                        fontSize: "24px",
                        color: "white",
                      }}
                    >
                      {axis.id.toUpperCase()}
                    </Typography>
                  </>
                }
                getDisplayedValue={() =>
                  formatDegrees(
                    activeRobot.rapidlyChangingMotionState.tcp_pose
                      ?.orientation?.[axis.id] || 0,
                  )
                }
                startJogging={(direction: "-" | "+") =>
                  startCartesianJogging({
                    axis: axis.id,
                    motionType: "rotate",
                    direction,
                  })
                }
                stopJogging={stopJogging}
              />
            ))}
        </Stack>

        {/* Show message if joint limits reached */}
        <JoggingJointLimitDetector />
      </Stack>
    )
  },
)
