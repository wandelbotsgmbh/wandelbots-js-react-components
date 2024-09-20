import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material"
import { degreesToRadians, radiansToDegrees } from "@wandelbots/wandelbots-js"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import XAxisIcon from "../../icons/axis-x.svg"
import YAxisIcon from "../../icons/axis-y.svg"
import ZAxisIcon from "../../icons/axis-z.svg"
import RotationIcon from "../../icons/rotation.svg"
import { useReaction } from "../utils/hooks"
import { JoggingCartesianAxisControl } from "./JoggingCartesianAxisControl"
import { JoggingCartesianValues } from "./JoggingCartesianValues"
import { JoggingJointLimitDetector } from "./JoggingJointLimitDetector"
import { JoggingOptions } from "./JoggingOptions"
import type { DiscreteIncrementOption, JoggingStore } from "./JoggingStore"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"

type JoggingCartesianOpts = {
  axis: "x" | "y" | "z"
  motionType: "translate" | "rotate"
  direction: "-" | "+"
}

export const JoggingCartesianTab = observer(
  ({ store }: { store: JoggingStore }) => {
    const { t } = useTranslation()
    const theme = useTheme()

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

      await store.withMotionLock(async () => {
        await store.jogger.runIncrementalCartesianMotion({
          currentTcpPose: tcpPose,
          currentJoints: jointPosition,
          coordSystemId: store.activeCoordSystemId,
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
      if (store.isLocked) return

      if (store.activeDiscreteIncrement) {
        return runIncrementalCartesianJog(opts, store.activeDiscreteIncrement)
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

      if (store.activeDiscreteIncrement) {
        return
      }

      await store.jogger.stop()
    }

    const axisList = [
      {
        id: "x",
        colors: theme.componentsExt?.JoggingCartesian?.Axis?.X,
        icon: <XAxisIcon />,
      },
      {
        id: "y",
        colors: theme.componentsExt?.JoggingCartesian?.Axis?.Y,
        icon: <YAxisIcon />,
      },
      {
        id: "z",
        colors: theme.componentsExt?.JoggingCartesian?.Axis?.Z,
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
        {/* Show Wandelscript string for the current coords */}
        <JoggingCartesianValues store={store} />

        {/* Jogging options */}
        <JoggingOptions store={store} />

        <Stack width="80%" maxWidth="296px" margin="auto" marginTop="16px">
          {/* Translate or rotate toggle */}
          <ToggleButtonGroup
            value={store.selectedCartesianMotionType}
            onChange={onMotionTypeChange}
            exclusive
            aria-label={t("Jogging.Cartesian.MotionType.lb")}
            sx={{ justifyContent: "center" }}
          >
            <ToggleButton value="translate">
              {t("Jogging.Cartesian.Translation.bt")}
            </ToggleButton>
            <ToggleButton value="rotate">
              {t("Jogging.Cartesian.Rotation.bt")}
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Cartesian translate jogging */}

          <Stack gap="10px" marginTop="10px">
            {store.selectedCartesianMotionType === "translate" &&
              axisList.map((axis) => (
                <JoggingCartesianAxisControl
                  key={axis.id}
                  colors={axis.colors}
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
                  colors={axis.colors}
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
        </Stack>

        {/* Velocity slider */}
        <JoggingVelocitySlider store={store} />

        {/* Show message if joint limits reached */}
        <JoggingJointLimitDetector store={store} />
      </Stack>
    )
  },
)
