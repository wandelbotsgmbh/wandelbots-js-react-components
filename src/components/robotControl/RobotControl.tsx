import { observer } from "mobx-react-lite"
import { useState } from "react"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import {
  RobotControlPanel,
  type RobotControlPanelProps,
} from "./RobotControlPanel"
import {
  type RobotControlOptions,
  useRobotControlProps,
} from "./useRobotControlProps"

/**
 * The robot, the app's lock and its 3D view's camera, and any prop of
 * `RobotControlPanel` to replace the session's
 */
export type RobotControlProps = RobotControlOptions &
  Partial<RobotControlPanelProps> & {
    /** The robot the panel jogs and moves */
    session: RobotSession
  }

/**
 * The Robot control panel of a robot session, ready to use. Translate and
 * Rotate jog the TCP (continuously or by the steps of its jogging store),
 * Joint jogs the joints, and Move to plans the pose or the joint values typed
 * in it and moves along the planned trajectory while held. The tab, jog mode,
 * step size and velocities are the jogging store's, so the session's storage
 * keeps them.
 *
 * Jogging is off while the robot may not move (`session.safety.canBeMoved`),
 * while a trajectory moves it and while another client jogs it; the panel
 * says which. `disabled` is only the app's lock. Any prop of
 * `RobotControlPanel` given here replaces the session's, e.g. the app's own
 * Move to:
 *
 * ```tsx
 * <RobotControl session={session} disabled={appLocked} onClose={closeFlyout} />
 * ```
 *
 * Another session gets a new panel: what the panel holds for a robot (a held
 * jog control, a typed pose, its tab) ends with that robot.
 */
export const RobotControl = observer(function RobotControl({
  session,
  ...props
}: RobotControlProps) {
  // The key of the panel, counted up for every other session. React keeps
  // the state of a component whose props change: the release of a held jog
  // would stop the new robot and leave the old one jogging, and a pose typed
  // for the old robot would be planned for the new one.
  const [shown, setShown] = useState({ robot: session, panel: 0 })
  const panel = shown.robot === session ? shown.panel : shown.panel + 1
  if (shown.robot !== session) {
    setShown({ robot: session, panel })
  }

  return <RobotControlOf key={panel} session={session} {...props} />
})

/** The panel of one session, for as long as it is that session's */
const RobotControlOf = observer(function RobotControlOf({
  session,
  disabled,
  gizmoOrientation,
  ...overrides
}: RobotControlProps) {
  const props = useRobotControlProps(session, { disabled, gizmoOrientation })
  return <RobotControlPanel {...props} {...overrides} />
})
