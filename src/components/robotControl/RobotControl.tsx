import { observer } from "mobx-react-lite"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { useRobotSessionOf } from "../robotSession/RobotSessionProvider"
import {
  RobotControlPanel,
  type RobotControlPanelProps,
} from "./RobotControlPanel"
import {
  type RobotControlOptions,
  useRobotControlProps,
} from "./useRobotControlProps"

/**
 * The robot (`session`, else the provider's), the app's lock and its 3D
 * view's camera, and any prop of `RobotControlPanel` to replace the session's
 */
export type RobotControlProps = RobotControlOptions &
  Partial<RobotControlPanelProps> & {
    /** The robot; else the one of the nearest `RobotSessionProvider` */
    session?: RobotSession
  }

/**
 * The Robot control panel of a robot session, ready to use: jogging, the
 * joints and Move to, wired as {@link useRobotControlProps} describes. Any
 * prop of `RobotControlPanel` given here replaces the session's.
 *
 * ```tsx
 * <RobotSessionProvider session={session}>
 *   <RobotControl disabled={appLocked} onClose={closeFlyout} />
 * </RobotSessionProvider>
 * ```
 */
export const RobotControl = observer(function RobotControl({
  session,
  disabled,
  gizmoOrientation,
  ...overrides
}: RobotControlProps) {
  const robot = useRobotSessionOf(session)
  const props = useRobotControlProps(robot, { disabled, gizmoOrientation })
  return <RobotControlPanel {...props} {...overrides} />
})
