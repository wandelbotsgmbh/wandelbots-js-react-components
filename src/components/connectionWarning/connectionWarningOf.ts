import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { ConnectionWarningState } from "./ConnectionWarning"

// Ported from RobotPad (src/safetyBar/ConnectionWarningIndicator.tsx)

/**
 * @internal How well the live state of a session's robot arrives, as
 * ConnectionWarning shows it for its `session`. It reads the session's MobX
 * state, so only an `observer` may call it: any other component keeps what
 * it read at its last render, e.g. no warning after the live state stopped.
 */
export function connectionWarningOf(
  session: RobotSession,
): ConnectionWarningState {
  const { connectionQuality, lastValidStateMessage, lastInvalidStateMessage } =
    session.state
  return {
    quality: connectionQuality,
    lastMessageAt: lastValidStateMessage.receivedAt,
    lastInvalidMessage: lastInvalidStateMessage,
  }
}
