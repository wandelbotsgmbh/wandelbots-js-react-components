import {
  Divider,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material"
import {
  degreesToRadians,
  radiansToDegrees,
  XYZ_TO_VECTOR,
} from "@wandelbots/nova-js"
import { observer } from "mobx-react-lite"
import { useTranslation } from "react-i18next"
import XAxisIcon from "../../icons/axis-x.svg"
import YAxisIcon from "../../icons/axis-y.svg"
import ZAxisIcon from "../../icons/axis-z.svg"
import RotationIcon from "../../icons/rotation.svg"
import type { Vector3Simple } from "../../lib/JoggerConnection"
import { useReaction } from "../utils/hooks"
import { JoggingCartesianAxisControl } from "./JoggingCartesianAxisControl"
import { JoggingJointLimitDetector } from "./JoggingJointLimitDetector"
import { JoggingOptions } from "./JoggingOptions"
import type {
  DiscreteIncrementOption,
  JoggingAxis,
  JoggingDirection,
  JoggingStore,
} from "./JoggingStore"
import { JoggingToggleButtonGroup } from "./JoggingToggleButtonGroup"
import { JoggingVelocitySlider } from "./JoggingVelocitySlider"

type JoggingCartesianOpts = {
  axis: JoggingAxis
  motionType: "translate" | "rotate"
  direction: JoggingDirection
}

export const JoggingCartesianTab = observer(
  ({
    store,
    children,
  }: {
    store: JoggingStore
    children?: React.ReactNode
  }) => {
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
            `/controllers/${store.jogger.motionStream.controllerId}/motion-groups/${store.jogger.motionGroupId}/state-stream?tcp=${store.selectedTcpId}`,
          ),
        )
      },
      { fireImmediately: true } as any,
    )

    async function runIncrementalCartesianJog(
      opts: JoggingCartesianOpts,
      increment: DiscreteIncrementOption,
    ) {
      const jogger = await store.activate()

      const tcpPose = jogger.motionStream.rapidlyChangingMotionState.tcp_pose
      const jointPosition = jogger.motionStream.rapidlyChangingMotionState
        .joint_position as Vector3Simple
      if (!tcpPose) return

      await store.withMotionLock(async () => {
        try {
          store.setCurrentIncrementJog({
            axis: opts.axis,
            direction: opts.direction,
          })
          await store.jogger.runIncrementalCartesianMotion({
            currentTcpPose: tcpPose,
            currentJoints: jointPosition,
            coordSystemId: store.activeCoordSystemId,
            velocityInRelevantUnits:
              store.selectedCartesianMotionType === "translate"
                ? store.translationVelocityMmPerSec
                : store.rotationVelocityRadsPerSec,
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
        } finally {
          store.setCurrentIncrementJog(null)
          await store.deactivate()
        }
      })
    }

    async function startCartesianJogging(opts: JoggingCartesianOpts) {
      if (store.isLocked) return

      const jogger = await store.activate()
      if (store.activeDiscreteIncrement) {
        return runIncrementalCartesianJog(opts, store.activeDiscreteIncrement)
      }

      if (opts.motionType === "translate") {
        await store.jogger.translateTCP({
          axis: opts.axis,
          direction: opts.direction,
          velocityMmPerSec: store.translationVelocityMmPerSec,
        })
      } else {
        await store.jogger.rotateTCP({
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

      await store.deactivate()
    }

    function getAxisColors(
      axisId: "X" | "Y" | "Z",
      motionType: "translate" | "rotate",
      theme: Theme,
    ) {
      const axisColors =
        theme.componentsExt?.JoggingPanel?.JoggingCartesian?.Axis

      if (!axisColors) return undefined

      if (motionType === "translate") {
        return axisColors[axisId]
      }

      return axisColors.CustomRotation ?? axisColors[axisId]
    }

    const axisList = [
      {
        id: "x",
        icon: <XAxisIcon />,
        colors: getAxisColors("X", store.selectedCartesianMotionType, theme),
      },
      {
        id: "y",
        icon: <YAxisIcon />,
        colors: getAxisColors("Y", store.selectedCartesianMotionType, theme),
      },
      {
        id: "z",
        icon: <ZAxisIcon />,
        colors: getAxisColors("Z", store.selectedCartesianMotionType, theme),
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
      <Stack flexGrow={1} gap={2} sx={{ padding: "18px 24px" }}>
        <Stack gap={2}>
          <JoggingOptions store={store} />
          <JoggingVelocitySlider store={store} />
          <Divider />
        </Stack>

        <Stack
          //maxWidth="296px"
          marginLeft="auto"
          marginRight="auto"
          gap="24px"
          justifyContent="center"
          sx={{ flexGrow: "1" }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            gap="24px"
            sx={{ flexGrow: 1 }}
          >
            {/* Translate or rotate toggle */}
            <JoggingToggleButtonGroup
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
            </JoggingToggleButtonGroup>

            {/* Cartesian translate jogging */}
            {store.selectedCartesianMotionType === "translate" &&
              axisList.map((axis) => (
                <JoggingCartesianAxisControl
                  key={axis.id}
                  colors={axis.colors}
                  disabled={store.isLocked}
                  activeJoggingDirection={
                    store.incrementJogInProgress?.axis === axis.id
                      ? store.incrementJogInProgress.direction
                      : undefined
                  }
                  label={
                    <>
                      {axis.icon}
                      <Typography
                        sx={{
                          fontSize: "24px",
                          color:
                            axis.colors?.labelColor ??
                            theme.palette.text.primary,
                        }}
                      >
                        {axis.id.toUpperCase()}
                      </Typography>
                    </>
                  }
                  getDisplayedValue={() =>
                    formatMM(
                      store.jogger.motionStream.rapidlyChangingMotionState
                        .tcp_pose?.position?.[XYZ_TO_VECTOR[axis.id]] || 0,
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
                  activeJoggingDirection={
                    store.incrementJogInProgress?.axis === axis.id
                      ? store.incrementJogInProgress.direction
                      : undefined
                  }
                  label={
                    <>
                      <RotationIcon />
                      <Typography
                        sx={{
                          fontSize: "24px",
                          color:
                            axis.colors?.labelColor ??
                            theme.palette.text.primary,
                        }}
                      >
                        {axis.id.toUpperCase()}
                      </Typography>
                    </>
                  }
                  getDisplayedValue={() =>
                    formatDegrees(
                      store.jogger.motionStream.rapidlyChangingMotionState
                        .tcp_pose?.orientation?.[XYZ_TO_VECTOR[axis.id]] || 0,
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

        {/* Show message if joint limits reached */}
        <JoggingJointLimitDetector store={store} />

        {children && <Divider />}

        {/* Custom content */}

        {children}
      </Stack>
    )
  },
)
