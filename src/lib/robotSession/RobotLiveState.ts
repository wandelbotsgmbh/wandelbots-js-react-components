import { makeAutoObservable } from "mobx"
import type { JoggingStore } from "../../components/jogging/JoggingStore"
import {
  type ControllerStateStream,
  MOTION_DELTA_THRESHOLD,
} from "../ControllerStateStream"
import { jointValuesEqual, type MotionStateReadout } from "../motionStateUpdate"
import {
  deriveSelectedTcpPose,
  type TcpReferencedPose,
} from "../PoseTransformer"
import type { RobotDescription } from "./RobotDescription"
import type { RobotPose } from "./robotPose"

// From RobotPad's ActiveRobotStore: the robot's live state and its poses

const isVector3 = (value: unknown): value is [number, number, number] =>
  Array.isArray(value) &&
  value.length === 3 &&
  value.every((n) => typeof n === "number")

/** How close the robot must be to a pose to be at it (RobotPad's tolerances) */
const AT_POSE_JOINT_THRESHOLD = 0.001
const AT_POSE_POSITION_THRESHOLD_MM = 0.5
const AT_POSE_ORIENTATION_THRESHOLD_RAD = 0.01 // ~0.57°

const valuesClose = (
  a: readonly number[] | undefined,
  b: readonly number[] | undefined,
  threshold: number,
) => Boolean(a && b && jointValuesEqual([...a], [...b], threshold))

/**
 * A robot's live state: its controller's state and its motion state as they
 * come, and its TCP pose in the TCP and coordinate system that the jogging
 * store has selected
 */
export class RobotLiveState {
  /** @internal The session makes it, see RobotSession */
  constructor(
    /** The stream the state comes from */
    readonly stream: ControllerStateStream,
    private readonly description: RobotDescription,
    private readonly jogging: JoggingStore,
  ) {
    makeAutoObservable<this, "description" | "jogging">(
      this,
      { stream: false, description: false, jogging: false },
      { autoBind: true },
    )
  }

  /** Safety state, operation mode and mode of the controller */
  get controllerState() {
    return this.stream.controllerState
  }

  /**
   * The motion state as the last message had it: one object for the whole
   * session, updated in place (see {@link ControllerStateStream})
   */
  get rapidlyChangingMotionState() {
    return this.stream.rapidlyChangingMotionState
  }

  /** What readouts show: it holds while the joints only jitter */
  get readoutState(): MotionStateReadout {
    return this.stream.readoutState
  }

  /** The joints readouts show, from {@link RobotLiveState.readoutState} */
  get jointPose() {
    return this.stream.readoutState.joint_position
  }

  get connectionQuality() {
    return this.stream.connectionQuality
  }

  get lastValidStateMessage() {
    return this.stream.lastValidStateMessage
  }

  get lastInvalidStateMessage() {
    return this.stream.lastInvalidStateMessage
  }

  /** The TCP pose as NOVA reports it, in its own TCP and coordinate system */
  get measuredTcpPoseReference(): TcpReferencedPose {
    return this.tcpPoseReferenceOf(this.rapidlyChangingMotionState)
  }

  /**
   * The measured TCP pose in the TCP and coordinate system that the jogging
   * store has selected: what a stored or typed pose uses
   */
  get displayedTcpPoseReference(): TcpReferencedPose {
    return this.inSelectedFrame(this.measuredTcpPoseReference)
  }

  /** The pose readouts show, from {@link RobotLiveState.readoutState}, in the selected frame */
  get displayedTcpPose() {
    return this.inSelectedFrame(this.tcpPoseReferenceOf(this.readoutState)).pose
  }

  /**
   * Whether the robot stands at a pose: its joints within 0.001, or its TCP
   * within 0.5 mm and 0.01 rad of the pose in the pose's TCP and coordinate
   * system. Not at a pose of a TCP or coordinate system it does not know.
   */
  isAt(pose: RobotPose): boolean {
    if (pose.type === "joint") {
      return valuesClose(
        pose.joints,
        this.rapidlyChangingMotionState.joint_position,
        AT_POSE_JOINT_THRESHOLD,
      )
    }

    try {
      const current = deriveSelectedTcpPose({
        inputPose: this.measuredTcpPoseReference,
        selectedTcpId: pose.tcpPose.tcpId,
        selectedCoordinateSystemId: pose.tcpPose.coordSystemId,
        tcpOffsetsById: this.description.tcpOffsetsById,
        coordinateSystems: this.jogging.coordSystems,
      })
      return (
        valuesClose(
          pose.tcpPose.pose.position,
          current.pose.position,
          AT_POSE_POSITION_THRESHOLD_MM,
        ) &&
        valuesClose(
          pose.tcpPose.pose.orientation,
          current.pose.orientation,
          AT_POSE_ORIENTATION_THRESHOLD_RAD,
        )
      )
    } catch {
      return false
    }
  }

  /** The motion state in the stream's next message */
  nextMotionState() {
    return this.stream.nextMotionState()
  }

  /** Resolves once two messages in a row show the joints standing still */
  async waitUntilStopped() {
    let previous = await this.stream.nextMotionState()
    let next = await this.stream.nextMotionState()

    while (
      !jointValuesEqual(
        previous.joint_position,
        next.joint_position,
        MOTION_DELTA_THRESHOLD,
      )
    ) {
      previous = next
      next = await this.stream.nextMotionState()
    }
  }

  private tcpPoseReferenceOf(
    motionState: MotionStateReadout,
  ): TcpReferencedPose {
    const position = motionState.tcp_pose?.position
    const orientation = motionState.tcp_pose?.orientation

    if (!position || !isVector3(position)) {
      throw new Error(
        `Invalid current TCP pose position for motion group ${this.stream.motionGroupId}`,
      )
    }

    if (!orientation || !isVector3(orientation)) {
      throw new Error(
        `Invalid current TCP pose orientation for motion group ${this.stream.motionGroupId}`,
      )
    }

    return {
      pose: { position, orientation },
      tcpId: motionState.tcp ?? "",
      coordinateSystemId: motionState.coordinate_system ?? "world",
    }
  }

  private inSelectedFrame(reference: TcpReferencedPose): TcpReferencedPose {
    return deriveSelectedTcpPose({
      inputPose: reference,
      selectedTcpId: this.jogging.selectedTcpId,
      selectedCoordinateSystemId: this.jogging.selectedCoordSystemId,
      tcpOffsetsById: this.description.tcpOffsetsById,
      coordinateSystems: this.jogging.coordSystems,
    })
  }
}
