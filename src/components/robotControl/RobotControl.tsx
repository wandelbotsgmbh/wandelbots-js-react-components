import { observer } from "mobx-react-lite"
import { useState } from "react"
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
 *
 * Another session gets a new panel: what the panel holds for a robot (a held
 * jog control, a typed pose, its tab) ends with that robot.
 */
export const RobotControl = observer(function RobotControl({
  session,
  ...props
}: RobotControlProps) {
  const robot = useRobotSessionOf(session)
  // The key of the panel, counted up for every other session. React keeps
  // the state of a component whose props change: the release of a held jog
  // would stop the new robot and leave the old one jogging, and a pose typed
  // for the old robot would be planned for the new one.
  const [shown, setShown] = useState({ robot, panel: 0 })
  const panel = shown.robot === robot ? shown.panel : shown.panel + 1
  if (shown.robot !== robot) {
    setShown({ robot, panel })
  }

  return <RobotControlOf key={panel} session={robot} {...props} />
})

/** The panel of one session, for as long as it is that session's */
const RobotControlOf = observer(function RobotControlOf({
  session,
  disabled,
  gizmoOrientation,
  ...overrides
}: RobotControlProps & { session: RobotSession }) {
  const props = useRobotControlProps(session, { disabled, gizmoOrientation })
  return <RobotControlPanel {...props} {...overrides} />
})
