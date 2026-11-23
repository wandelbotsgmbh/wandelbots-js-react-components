import {
  type IReactionDisposer,
  makeAutoObservable,
  reaction,
  runInAction,
} from "mobx"
import type { JoggingStore } from "../../components/jogging/JoggingStore"
import {
  jointsToText,
  parseJointsText,
  parsePoseText,
  poseToText,
} from "../../components/robotControl/poseText"
import type { ConnectionLogger } from "../connectionLogger"
import { planErrorTranslationKey } from "../planErrorTranslation"
import type { TrajectoryExecutionStore } from "../TrajectoryExecutionStore"
import type { RobotLiveState } from "./RobotLiveState"
import { type RobotPose, trajectoryTargetOf } from "./robotPose"

// Ported from RobotPad (src/jogging/TargetPoseStore.ts)

/**
 * A typed-in target pose that has been confirmed by the user. While one is
 * staged it replaces the live pose in the pose field, and -- if planning
 * succeeded -- can be driven to with Move to, stored, or discarded again.
 */
export type StagedTargetPose = {
  pose: RobotPose
  displayString: string
  /**
   * Translation key of the planning failure for this pose, or null if the
   * plan succeeded and the trajectory is ready to execute
   */
  errorKey: string | null
}

/** What the target pose reads of its session */
type TargetPoseParts = {
  motionGroupId: string
  state: Pick<
    RobotLiveState,
    "jointPose" | "displayedTcpPose" | "displayedTcpPoseReference" | "isAt"
  >
  jogging: Pick<JoggingStore, "selectedTabId">
  trajectory: Pick<
    TrajectoryExecutionStore,
    "planTrajectory" | "stopAndReset" | "trajectoryState" | "executionState"
  >
  /** Why the robot may not move now, or null: a typed pose plans nothing then */
  notMoveableReason: () => unknown
}

/**
 * A typed-in target pose of a robot (RB-3805): lets the user type in a
 * cartesian pose or joint configuration, validates it, and stages it by
 * planning a trajectory to it, so Move to can drive there. The text is read
 * like the displayed pose it replaces: in the selected TCP and coordinate
 * system, or as the joints on the joint tab.
 */
export class RobotTargetPose {
  /** True while the field is an input the user is typing into */
  editing = false

  /** Current contents of the input while editing */
  draft = ""

  /** True while a confirmed pose is being planned against the backend */
  confirming = false

  staged: StagedTargetPose | null = null

  /**
   * Runs before a confirmed pose is planned, e.g. to release another flow
   * that holds the trajectory (RobotPad: a selected saved pose)
   */
  onBeforePlan?: () => Promise<void>

  /**
   * True once the staged pose's trajectory has actually driven the robot.
   * Tells "the robot moved here and arrived" apart from "this pose was typed
   * for where the robot already stands", which must stay staged.
   */
  private moveStarted = false

  private readonly disposers: IReactionDisposer[] = []

  /** @internal The session makes it, see RobotSession */
  constructor(
    private readonly robot: TargetPoseParts,
    private readonly logger: ConnectionLogger,
  ) {
    makeAutoObservable<this, "robot" | "logger" | "disposers">(
      this,
      { robot: false, logger: false, disposers: false, onBeforePlan: false },
      { autoBind: true },
    )

    // The staged pose belongs to the tab it was typed on -- a cartesian
    // string is meaningless on the joints tab and vice versa.
    this.disposers.push(
      reaction(
        () => this.robot.jogging.selectedTabId,
        () => {
          if (this.editing || this.staged) {
            void this.resetToLive()
          }
        },
      ),
    )

    // A finished typed-pose move must restore the live readout as well as
    // release the execution session. Otherwise the field keeps showing the
    // completed target during later jogs, or the still-open session prevents
    // jogging with "already used for 'ExecuteTrajectory'". Only reset after
    // completion: a move paused short of the target still needs its staged
    // target to resume.
    this.disposers.push(
      reaction(
        () => ({
          trajectoryState: this.robot.trajectory.trajectoryState,
          executionState: this.robot.trajectory.executionState,
          isRobotAtStagedPose: this.isRobotAtStagedPose,
        }),
        ({ trajectoryState, executionState, isRobotAtStagedPose }) => {
          if (!this.stagedPose) return

          if (trajectoryState === "moving") {
            this.moveStarted = true
            return
          }

          // Releasing Move to on arrival pauses the trajectory a hair before
          // its end, so no completed-trajectory report ever arrives -- the
          // execution state goes to a user pause, or straight back to none.
          // The robot standing on the target after a move is the reliable
          // signal that it is over.
          const arrived =
            executionState === "END_OF_TRAJECTORY" ||
            (this.moveStarted &&
              isRobotAtStagedPose &&
              trajectoryState !== "stopping")

          if (arrived) {
            void this.resetToLive()
          }
        },
      ),
    )
  }

  dispose() {
    for (const dispose of this.disposers) {
      dispose()
    }
  }

  get phase(): "view" | "editing" | "staged" | "error" {
    if (this.editing) return "editing"
    if (this.staged) return this.staged.errorKey ? "error" : "staged"
    return "view"
  }

  private get isJointTab() {
    return this.robot.jogging.selectedTabId === "joint"
  }

  /** The live pose as text: the joints on the joint tab, else the TCP pose */
  get liveDisplayString() {
    if (this.isJointTab) {
      return jointsToText(this.robot.state.jointPose)
    }
    return poseToText(this.robot.state.displayedTcpPose)
  }

  /** What the field shows outside of edit mode: staged value or live pose */
  get displayString() {
    return this.staged?.displayString ?? this.liveDisplayString
  }

  /** Parsed form of the draft, or null while it is not a valid pose */
  private get parsedDraft(): RobotPose | null {
    const { state, motionGroupId } = this.robot

    if (this.isJointTab) {
      const joints = parseJointsText(this.draft, state.jointPose.length)
      if (!joints) return null
      return { type: "joint", motionGroupId, joints }
    }

    const parsed = parsePoseText(this.draft)
    if (!parsed) return null

    // The typed values are read in the currently displayed coordinate system
    // and TCP, exactly like the displayed pose they replace.
    const reference = state.displayedTcpPoseReference
    return {
      type: "cartesian",
      motionGroupId,
      tcpPose: {
        pose: { position: parsed.position, orientation: parsed.orientation },
        coordSystemId: reference.coordinateSystemId,
        tcpId: reference.tcpId,
      },
    }
  }

  get draftValid() {
    return this.parsedDraft !== null
  }

  beginEdit() {
    this.draft = this.displayString
    this.editing = true
  }

  setDraft(text: string) {
    this.draft = text
  }

  cancelEdit() {
    this.editing = false
    this.draft = ""
  }

  /**
   * Validates the typed pose against the backend by planning a trajectory to
   * it. On success the trajectory is left initialized on the execution
   * socket, so Move to is armed immediately; on a planner rejection the pose
   * stays staged with the failure explanation. Does nothing while the robot
   * may not move.
   */
  async confirmEdit() {
    const pose = this.parsedDraft
    if (!pose || this.confirming) return

    // Confirming plans a motion, which needs a robot that may move at all.
    // Refusing here keeps the planner from rejecting the request for a
    // reason that has nothing to do with the typed coordinates.
    if (this.robot.notMoveableReason()) return

    const displayString =
      pose.type === "joint"
        ? jointsToText(pose.joints)
        : poseToText(pose.tcpPose.pose)

    this.confirming = true
    try {
      await this.onBeforePlan?.()

      const result = await this.robot.trajectory.planTrajectory(
        trajectoryTargetOf(pose),
      )

      runInAction(() => {
        this.staged = {
          pose,
          displayString,
          errorKey: result.ok
            ? null
            : planErrorTranslationKey(result.errorFeedbackName),
        }
        this.editing = false
        this.draft = ""
      })
    } catch (err) {
      // Transport-level failure (connection loss etc.), not a planner verdict
      this.logger.warn("Failed to plan trajectory to typed pose", err)
      runInAction(() => {
        this.staged = {
          pose,
          displayString,
          errorKey: "Jogging.TargetPose.Error.PlanningFailed.lb",
        }
        this.editing = false
        this.draft = ""
      })
    } finally {
      runInAction(() => {
        this.confirming = false
      })
    }
  }

  /** Discards the staged pose and shows the live pose again */
  async resetToLive() {
    const hadPlannedTrajectory = this.staged !== null && !this.staged.errorKey
    this.staged = null
    this.moveStarted = false
    this.editing = false
    this.draft = ""

    if (hadPlannedTrajectory) {
      await this.robot.trajectory.stopAndReset()
    }
  }

  /**
   * Drops the staged pose and the edit without touching the trajectory: for
   * when another flow has just planned its own (RobotPad: a saved pose that
   * the user selected)
   */
  clear() {
    this.editing = false
    this.staged = null
  }

  /** The staged pose, if it is valid to store or move to */
  get stagedPose(): RobotPose | null {
    if (!this.staged || this.staged.errorKey) return null
    return this.staged.pose
  }

  /** True when the robot has arrived at (or already was at) the staged pose */
  get isRobotAtStagedPose(): boolean {
    if (!this.stagedPose) return false
    return this.robot.state.isAt(this.stagedPose)
  }
}
