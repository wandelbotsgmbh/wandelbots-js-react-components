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
 * const Warning = observer(({ session }: { session: RobotSession }) => (
 *   <ConnectionWarning {...connectionWarningOf(session)} />
 * ))
 * ```
 *
 * It reads the session's MobX state when it is called and returns plain
 * props, so the component that calls it must be an `observer` (of
 * mobx-react-lite): any other keeps what it read at its last render, e.g.
 * no warning after the live state stopped.
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
