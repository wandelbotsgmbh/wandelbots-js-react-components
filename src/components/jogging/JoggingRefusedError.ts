import type { RobotNotMoveableReason } from "../../lib/robotSession/RobotSafety"

/**
 * Why a jogging store starts no jog now, as a code an app can translate: the
 * reason of the store's owner that the robot may not move (see
 * `JoggingStoreOptions.notMoveableReason`), or "locked" while the store is
 * locked (see `JoggingStore.isLocked`)
 */
export type JoggingRefusedReason = RobotNotMoveableReason | { code: "locked" }

function refusalText(reason: JoggingRefusedReason) {
  switch (reason.code) {
    case "locked":
      return "jogging is locked"
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
 * why.
 */
export class JoggingRefusedError extends Error {
  /** @internal The jogging store makes it, see JoggingStore */
  constructor(readonly reason: JoggingRefusedReason) {
    super(`Jogging refused: ${refusalText(reason)}`)
    this.name = "JoggingRefusedError"
  }
}
