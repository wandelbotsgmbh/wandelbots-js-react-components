import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { ConnectionWarningProps } from "./ConnectionWarning"

// Ported from RobotPad (src/safetyBar/ConnectionWarningIndicator.tsx). A
// plain function, not a hook, as robotSafetyOf: for a header that also shows
// while no robot is loaded

/**
 * How well the live state of a session's robot arrives, as
 * `ConnectionWarning` takes it:
 *
 * ```tsx
 * <ConnectionWarning {...connectionWarningOf(session)} />
 * ```
 */
export function connectionWarningOf(
  session: RobotSession,
): ConnectionWarningProps {
  const { connectionQuality, lastValidStateMessage, lastInvalidStateMessage } =
    session.state
  return {
    quality: connectionQuality,
    lastMessageAt: lastValidStateMessage.receivedAt,
    lastInvalidMessage: lastInvalidStateMessage,
  }
}
