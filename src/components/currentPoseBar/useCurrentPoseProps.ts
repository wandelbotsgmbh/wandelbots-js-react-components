import { useState } from "react"
import { useTranslation } from "react-i18next"
import { i18n } from "../../i18n/config"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { coordSystemLabel } from "../jogging/coordSystemLabel"
import type { RobotControlPose } from "../robotControl/RobotControlPanel"
import type { CurrentPoseBarProps, CurrentPoseBarState } from "./CurrentPoseBar"

// Ported from RobotPad (src/jogging/RobotPoseBar.tsx)

/**
 * The props of `CurrentPoseBar` for a robot of a session: the TCP's current
 * pose in a TCP and a coordinate system of the bar's own, which start as the
 * ones of the session's jogging (its TCP and "Values relative to"), the
 * state of the motion stream, and the last jog error.
 *
 * `<CurrentPose />` is the bar with these props. An app that wants to change
 * a part takes the props and overrides it:
 *
 * ```tsx
 * <CurrentPoseBar {...useCurrentPoseProps(session)} sx={{ m: 1 }} />
 * ```
 */
export function useCurrentPoseProps(
  session: RobotSession,
): CurrentPoseBarProps {
  const store = session.jogging
  const { t } = useTranslation(undefined, { i18n })

  // The bar's own TCP and frame (not the panel's): they start as the
  // panel's TCP and "Values relative to"
  const [tcpId, setTcpId] = useState(store.selectedTcpId)
  const [frameId, setFrameId] = useState(store.selectedCoordSystemId)
  // One that the robot does not have: the panel's again
  const tcp = store.tcpsById[tcpId] ? tcpId : store.selectedTcpId
  const frame = store.coordSystemsById[frameId]
    ? frameId
    : store.selectedCoordSystemId

  const state = store.jogger.motionStream.rapidlyChangingMotionState.execute
    ?.details?.state?.kind as CurrentPoseBarState | undefined
  const error = store.lastJogErrorTranslationKey
    ? t(store.lastJogErrorTranslationKey)
    : store.lastJogError

  function getCurrentPose(): RobotControlPose | null {
    const pose = store.tcpPoseIn(tcp, frame)
    if (!pose?.position || !pose.orientation) return null
    return {
      position: pose.position as RobotControlPose["position"],
      orientation: pose.orientation as RobotControlPose["orientation"],
    }
  }

  return {
    getCurrentPose,
    tcp:
      store.tcps.length > 0
        ? {
            // As the Robot control panel names them
            options: store.tcps.map((item) => ({
              id: item.id,
              label: item.id,
            })),
            value: tcp,
            onChange: setTcpId,
          }
        : undefined,
    frame: {
      options: store.coordSystems.map((cs) => ({
        id: cs.coordinate_system,
        label: coordSystemLabel(store, cs),
      })),
      value: frame,
      onChange: setFrameId,
    },
    state,
    error,
  }
}
