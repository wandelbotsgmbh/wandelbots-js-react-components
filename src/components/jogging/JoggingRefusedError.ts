import type { RobotNotMoveableReason } from "../../lib/robotSession/RobotSafety"

/**
 * Why a jogging store starts no jog now, as a code an app can translate: the
 * reason of the store's owner that the robot may not move (see
 * `JoggingStoreOptions.notMoveableReason`), "blocked" after NOVA refused the
 * jogging connection because another client jogs (see
 * `JoggingStore.blocked`, until `JoggingStore.unblock`), or "locked" while
 * the store is locked (see `JoggingStore.isLocked`)
 */
export type JoggingRefusedReason =
  | RobotNotMoveableReason
  | { code: "blocked" }
  | { code: "locked" }

function refusalText(reason: JoggingRefusedReason) {
  switch (reason.code) {
    case "locked":
      return "jogging is locked"
    case "blocked":
      return "another client holds the jogging connection"
    case "disconnected":
      return "the robot's live state stopped coming"
    case "safety_state":
      return `the safety state is ${reason.value}`
    case "operation_mode":
      return `the operation mode is ${reason.value}`
    case "deactivated":
      return "the robot is not activated"
  }
}

/**
 * A jog that a jogging store did not start, because the robot may not move
 * now or the store is locked: nothing was sent to the robot. `reason` says
 * why. Also what else needs the jogging connection and did not get it: a
 * TCP change, or handing the robot to jogging.
 */
export class JoggingRefusedError extends Error {
  /** Why the jog did not start: `reason.code` is for the app to translate */
  readonly reason: JoggingRefusedReason

  /** @internal The jogging store makes it, see JoggingStore */
  constructor(reason: JoggingRefusedReason) {
    super(`Jogging refused: ${refusalText(reason)}`)
    this.name = "JoggingRefusedError"
    this.reason = reason
  }
}
