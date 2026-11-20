import {
  CurrentPoseBar,
  type CurrentPoseBarState,
  i18n,
  type JoggingStore,
  type RobotControlPose,
} from "@wandelbots/wandelbots-js-react-components"
import { observer } from "mobx-react-lite"
import { useState } from "react"

/**
 * CurrentPoseBar, wired to a JoggingStore as an app wires it: the pose of a
 * TCP and a frame of the bar's own, the state of the motion stream, and the
 * store's last jog error
 */
export const CurrentPoseBarDemo = observer(
  ({ store }: { store: JoggingStore }) => {
    const [tcpId, setTcpId] = useState(store.selectedTcpId)
    const [frameId, setFrameId] = useState(
      store.coordSystems[0]?.coordinate_system ?? "world",
    )
    const state = store.jogger.motionStream.rapidlyChangingMotionState.execute
      ?.details?.state?.kind as CurrentPoseBarState | undefined
    const error = store.lastJogErrorTranslationKey
      ? i18n.t(store.lastJogErrorTranslationKey)
      : store.lastJogError

    function getCurrentPose(): RobotControlPose | null {
      const pose = store.tcpPoseIn(tcpId, frameId)
      if (!pose?.position || !pose.orientation) return null
      return {
        position: pose.position as RobotControlPose["position"],
        orientation: pose.orientation as RobotControlPose["orientation"],
      }
    }

    return (
      <CurrentPoseBar
        getCurrentPose={getCurrentPose}
        tcp={
          store.tcps.length > 0
            ? {
                options: store.tcps.map((tcp) => ({
                  id: tcp.id,
                  label: tcp.name || tcp.id,
                })),
                value: tcpId,
                onChange: setTcpId,
              }
            : undefined
        }
        frame={{
          options: store.coordSystems.map((frame) => ({
            id: frame.coordinate_system,
            label: frame.name || frame.coordinate_system,
          })),
          value: frameId,
          onChange: setFrameId,
        }}
        state={state}
        error={error}
      />
    )
  },
)
