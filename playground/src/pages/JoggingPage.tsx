import FormControlLabel from "@mui/material/FormControlLabel"
import Stack from "@mui/material/Stack"
import Switch from "@mui/material/Switch"
import Typography from "@mui/material/Typography"
import { SecondaryButton } from "@wandelbots/mui"
import type { Pose } from "@wandelbots/nova-js/v2"
import {
  type ConnectedMotionGroup,
  JoggingPanel,
  MotionGroupVisualizer,
  MotionGroupVisualizerExact,
  poseEqual,
  TrajectoryRenderer,
} from "@wandelbots/wandelbots-js-react-components"
import { observable, reaction, toJS } from "mobx"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useEffect, useMemo, useState } from "react"
import { useAsync } from "../connections"
import { FitCamera, ViewPanel, Viewport, ViewWithSidePanel } from "../scene"
import type { PageProps } from "."

/** The recorded TCP path keeps at most this number of points */
const MAX_TCP_PATH_POINTS = 1000

/**
 * The start page: the 3D view of the motion group with the TCP path that it
 * moved, and the JoggingPanel on the right side (layout as in RobotPad).
 */
export function JoggingPage({ instance, motionGroup }: PageProps) {
  const [exact, setExact] = useState(false)
  const tcpPath = useTcpPath(motionGroup)
  // MotionGroupVisualizer needs the inverse solver of the kinematic model to
  // tell a robot from a linear axis or a turntable
  const kinematics = useAsync(motionGroup.modelFromController, (model) =>
    instance.nova.api.motionGroupModels.getMotionGroupKinematicModel(model),
  )
  const dhParameters = useMemo(
    () => motionGroup.dhParameters ?? [],
    [motionGroup],
  )
  const Visualizer = exact ? MotionGroupVisualizerExact : MotionGroupVisualizer

  const view = (
    <>
      <Viewport>
        {kinematics.value && (
          <FitCamera>
            {(refit) => (
              <Visualizer
                instanceUrl={instance.url}
                getModel={instance.getModel}
                modelFromController={motionGroup.modelFromController}
                rapidlyChangingMotionState={
                  motionGroup.rapidlyChangingMotionState
                }
                dhParameters={dhParameters}
                inverseSolver={kinematics.value?.inverse_solver}
                chainOffsetPosition={motionGroup.mountingPosition}
                chainOffsetQuaternion={motionGroup.mountingQuaternion}
                postModelRender={refit}
              />
            )}
          </FitCamera>
        )}
        <RecordedTcpPath tcpPath={tcpPath} />
      </Viewport>
      <ViewPanel>
        <FormControlLabel
          control={
            <Switch
              checked={exact}
              onChange={(event) => setExact(event.target.checked)}
            />
          }
          label="Exact (MotionGroupVisualizerExact, no smoothing)"
        />
        <TcpPathControls tcpPath={tcpPath} />
        {kinematics.error !== undefined && (
          <Typography variant="body2" color="error">
            No kinematic model of {motionGroup.modelFromController}:{" "}
            {String(kinematics.error)}
          </Typography>
        )}
      </ViewPanel>
    </>
  )

  return (
    <ViewWithSidePanel
      view={view}
      panel={
        <JoggingPanel
          nova={instance.nova}
          motionGroupId={motionGroup.motionGroupId}
          cellId={instance.cellId}
          sx={{ height: "100%" }}
        />
      }
    />
  )
}

type TcpPath = {
  points: Pose[]
  add(pose: Pose): void
  clear(): void
}

/** Records the TCP poses of the motion state while the robot moves */
function useTcpPath(motionGroup: ConnectedMotionGroup): TcpPath {
  const tcpPath = useLocalObservable<TcpPath>(
    () => ({
      points: [],
      add(pose) {
        const last = this.points[this.points.length - 1]
        // Only a pose that differs by more than about 1 mm
        if (last && poseEqual(last, pose, 1)) return
        this.points = [...this.points, pose].slice(-MAX_TCP_PATH_POINTS)
      },
      clear() {
        this.points = []
      },
    }),
    { points: observable.ref },
  )

  useEffect(
    () =>
      reaction(
        () => motionGroup.rapidlyChangingMotionState.tcp_pose,
        (pose) => {
          if (pose?.position) tcpPath.add(toJS(pose))
        },
      ),
    [motionGroup, tcpPath],
  )

  return tcpPath
}

const RecordedTcpPath = observer(({ tcpPath }: { tcpPath: TcpPath }) => (
  <TrajectoryRenderer trajectory={tcpPath.points} />
))

const TcpPathControls = observer(({ tcpPath }: { tcpPath: TcpPath }) => (
  <Stack direction="row" alignItems="center" gap={2}>
    <Typography variant="body2" color="text.secondary">
      TCP path (TrajectoryRenderer): {tcpPath.points.length} of at most{" "}
      {MAX_TCP_PATH_POINTS} points
    </Typography>
    <SecondaryButton
      size="small"
      onClick={tcpPath.clear}
      disabled={tcpPath.points.length === 0}
    >
      Clear
    </SecondaryButton>
  </Stack>
))
