import { observer } from "mobx-react-lite"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { useRobotSessionOf } from "../robotSession/RobotSessionProvider"
import { CurrentPoseBar, type CurrentPoseBarProps } from "./CurrentPoseBar"
import { useCurrentPoseProps } from "./useCurrentPoseProps"

/**
 * The robot (`session`, else the provider's), and any prop of
 * `CurrentPoseBar` to replace the session's
 */
export type CurrentPoseProps = Partial<CurrentPoseBarProps> & {
  /** The robot; else the one of the nearest `RobotSessionProvider` */
  session?: RobotSession
}

/**
 * The current pose bar of a robot session, ready to use: the TCP's pose,
 * the state of the motion stream and the last jog error, wired as
 * {@link useCurrentPoseProps} describes. Any prop of `CurrentPoseBar` given
 * here replaces the session's.
 *
 * ```tsx
 * <RobotSessionProvider session={session}>
 *   <CurrentPose />
 * </RobotSessionProvider>
 * ```
 */
export const CurrentPose = observer(function CurrentPose({
  session,
  ...overrides
}: CurrentPoseProps) {
  const robot = useRobotSessionOf(session)
  const props = useCurrentPoseProps(robot)
  return <CurrentPoseBar {...props} {...overrides} />
})
