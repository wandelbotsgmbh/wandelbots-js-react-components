import type { RobotSession } from "../lib/robotSession/RobotSession"
import type { SafetyBarProps } from "./SafetyBar"

// Ported from RobotPad (src/RobotPadAppBar.tsx)

/**
 * @internal The robot's safety state, operation mode and controller type,
 * as SafetyBar shows them for its `session`. It reads the session's MobX
 * state, so only an `observer` may call it: any other component keeps what
 * it read at its last render, e.g. no emergency stop after one was pressed.
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
