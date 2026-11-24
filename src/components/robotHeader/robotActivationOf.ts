import { RobotModeChangeError } from "../../lib/robotSession/RobotActivation"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { RobotHeaderActivation } from "./RobotHeader"

// Ported from RobotPad (src/RobotPadAppBar.tsx). A plain function, not a
// hook: an app shows its header also while no robot is loaded, as
// `activation={session && robotActivationOf(session)}`

/**
 * The robot's activation switch, as `RobotHeader`'s `activation` takes it:
 * the controller's mode, not switchable while NOVA would refuse it (e.g. at
 * an emergency stop). A refused change goes to the session's `onError`.
 *
 * It reads the session's MobX state when it is called and returns plain
 * props, so the component that calls it must be an `observer` (of
 * mobx-react-lite): any other keeps what it read at its last render, e.g.
 * the old mode after the switch was toggled.
 */
export function robotActivationOf(
  session: RobotSession,
): RobotHeaderActivation {
  return {
    state: session.activation.state,
    disabled: !session.safety.canBeActive,
    onToggle: () => {
      session.activation.toggle().catch((error: unknown) => {
        session.reportError({
          kind: "mode",
          message: error instanceof Error ? error.message : String(error),
          url: error instanceof RobotModeChangeError ? error.url : undefined,
          cause: error,
        })
      })
    },
  }
}
