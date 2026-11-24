import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { SafetyBarProps } from "../../SafetyBar/SafetyBar"

// Ported from RobotPad (src/RobotPadAppBar.tsx). A plain function, not a
// hook: an app shows its header also while no robot is loaded, as
// `safety={session && robotSafetyOf(session)}`

/**
 * The robot's safety state, operation mode and controller type, as
 * `RobotHeader`'s `safety` or `SafetyBar` take them:
 *
 * ```tsx
 * const RobotSafety = observer(({ session }: { session: RobotSession }) => (
 *   <SafetyBar {...robotSafetyOf(session)} />
 * ))
 * ```
 *
 * It reads the session's MobX state when it is called and returns plain
 * props, so the component that calls it must be an `observer` (of
 * mobx-react-lite): any other keeps what it read at its last render, e.g.
 * no emergency stop after one was pressed.
 */
export function robotSafetyOf(
  session: RobotSession,
): Pick<
  SafetyBarProps,
  "isVirtual" | "motionGroupId" | "operationMode" | "safetyState"
> {
  const { controllerState } = session.state
  return {
    isVirtual: session.description.isVirtual,
    motionGroupId: session.motionGroupId,
    operationMode: controllerState.operation_mode,
    safetyState: controllerState.safety_state,
  }
}
