import {
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Typography,
} from "@mui/material"
import { observer } from "mobx-react-lite"
import { JoggingCartesianAxisControl } from "./JoggingCartesianAxisControl"
import { radiansToDegrees } from "@wandelbots/wandelbots-js"
import { useTranslation } from "react-i18next"
import RotationIcon from "../../icons/rotation.svg"
import XAxisIcon from "../../icons/axis-x.svg"
import YAxisIcon from "../../icons/axis-y.svg"
import ZAxisIcon from "../../icons/axis-z.svg"
import type { JoggingStore, DiscreteIncrementOption } from "./JoggingStore"
import { JoggingOptions } from "./JoggingOptions"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"
import { useReaction } from "../utils/hooks"
import { JoggingCartesianValues } from "./JoggingCartesianValues"
import { JoggingJointLimitDetector } from "./JoggingJointLimitDetector"

type JoggingCartesianOpts = {
  axis: "x" | "y" | "z"
  motionType: "translate" | "rotate"
  direction: "-" | "+"
}

export const JoggingCartesianTab = observer(
  ({ store }: { store: JoggingStore }) => {
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
        store.jogger.motionStream.motionStateSocket.changeUrl(
          store.jogger.nova.makeWebsocketURL(
            `/motion-groups/${store.jogger.motionGroupId}/state-stream?tcp=${store.selectedTcpId}&response_coordinate_system=${store.selectedCoordSystemId}`,
          ),
        )
      },
      { fireImmediately: true } as any,
    )

    async function runIncrementalCartesianJog(
      opts: JoggingCartesianOpts,
      increment: DiscreteIncrementOption,
    ) {
      const tcpPose =
        store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose
      const jointPosition =
        store.jogger.motionStream.rapidlyChangingMotionState.state
          .joint_position
      if (!tcpPose) return

      // await robotPad.withMotionLock(async () => {
      //   await jogger.runIncrementalCartesianMotion({
      //     currentTcpPose: tcpPose,
      //     currentJoints: jointPosition,
      //     coordSystemId: store.selectedCoordSystemId,
      //     velocityInRelevantUnits: store.velocityInCurrentUnits,
      //     axis: opts.axis,
      //     direction: opts.direction,
      //     motion:
      //       store.selectedCartesianMotionType === "translate"
      //         ? {
      //             type: "translate",
      //             distanceMm: increment.mm,
      //           }
      //         : {
      //             type: "rotate",
      //             distanceRads: degreesToRadians(increment.degrees),
      //           },
      //   })
      // })
    }

    async function startCartesianJogging(opts: JoggingCartesianOpts) {
      if (store.isLocked) return

      if (store.selectedDiscreteIncrement) {
        return runIncrementalCartesianJog(opts, store.selectedDiscreteIncrement)
      }

      if (opts.motionType === "translate") {
        await store.jogger.startTCPTranslation({
          axis: opts.axis,
          direction: opts.direction,
          velocityMmPerSec: store.translationVelocityMmPerSec,
        })
      } else {
        await store.jogger.startTCPRotation({
          axis: opts.axis,
          direction: opts.direction,
          velocityRadsPerSec: store.rotationVelocityRadsPerSec,
        })
      }
    }

    async function stopJogging() {
      if (store.isLocked) return

      if (store.selectedDiscreteIncrement) {
        return
      }

      await store.jogger.stop()
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
        amount: radiansToDegrees(value).toFixed(1),
      })
    }

    return (
      <Stack>
        {/* Jogging options */}
        <JoggingOptions store={store} />

        {/* Show Wandelscript string for the current coords */}
        <JoggingCartesianValues store={store} />

        <Stack width="80%" maxWidth="296px" margin="auto">
          {/* Translate or rotate toggle */}
          <ToggleButtonGroup
            value={store.selectedCartesianMotionType}
            onChange={onMotionTypeChange}
            exclusive
            aria-label={t("Jogging.Cartesian.MotionType.lb")}
          >
            <ToggleButton value="translate">
              {t("Jogging.Cartesian.Translation.bt")}
            </ToggleButton>
            <ToggleButton value="rotate">
              {t("Jogging.Cartesian.Rotation.bt")}
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Cartesian translate jogging */}
          {store.selectedCartesianMotionType === "translate" &&
            axisList.map((axis) => (
              <JoggingCartesianAxisControl
                key={axis.id}
                color={axis.color}
                disabled={store.isLocked}
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
                    store.jogger.motionStream.rapidlyChangingMotionState
                      .tcp_pose?.position[axis.id] || 0,
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
              <JoggingCartesianAxisControl
                key={axis.id}
                color={axis.color}
                disabled={store.isLocked}
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
                    store.jogger.motionStream.rapidlyChangingMotionState
                      .tcp_pose?.orientation?.[axis.id] || 0,
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

        {/* Velocity slider */}
        <JoggingVelocitySlider store={store} />

        {/* Show message if joint limits reached */}
        <JoggingJointLimitDetector store={store} />
      </Stack>
    )
  },
)
