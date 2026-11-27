import { observer } from "mobx-react-lite"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { CurrentPoseBar, type CurrentPoseBarProps } from "./CurrentPoseBar"
import { useCurrentPoseProps } from "./useCurrentPoseProps"

/** The robot, and any prop of `CurrentPoseBar` to replace the session's */
export type CurrentPoseProps = Partial<CurrentPoseBarProps> & {
  /** The robot whose current pose the bar shows */
  session: RobotSession
}

/**
 * The current pose bar of a robot session, ready to use: the TCP's current
 * pose in a TCP and a coordinate system of the bar's own, which start as the
 * ones of the session's jogging (its TCP and "Values relative to"), the
 * state of the motion stream, and the last jog error. Any prop of
 * `CurrentPoseBar` given here replaces the session's.
 *
 * ```tsx
 * <CurrentPose session={session} sx={{ m: 1 }} />
 * ```
 */
export const CurrentPose = observer(function CurrentPose({
  session,
  ...overrides
}: CurrentPoseProps) {
  const props = useCurrentPoseProps(session)
  return <CurrentPoseBar {...props} {...overrides} />
})
