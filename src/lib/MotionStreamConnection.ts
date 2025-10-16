import { AutoReconnectingWebsocket, tryParseJson } from "@wandelbots/nova-js"
import type {
  MotionGroupDescription,
  MotionGroupState,
  NovaClient,
  RobotControllerState,
  Vector3Simple,
} from "@wandelbots/nova-js/v2"
import { makeAutoObservable, runInAction } from "mobx"
import { Vector3 } from "three"
import { jointValuesEqual, tcpMotionEqual } from "./motionStateUpdate"

const MOTION_DELTA_THRESHOLD = 0.0001

function unwrapRotationVector(
  newRotationVectorApi: Vector3Simple,
  currentRotationVectorApi: Vector3Simple,
): Vector3Simple {
  const currentRotationVector = new Vector3(
    currentRotationVectorApi[0],
    currentRotationVectorApi[1],
    currentRotationVectorApi[2],
  )

  const newRotationVector = new Vector3(
    newRotationVectorApi[0],
    newRotationVectorApi[1],
    newRotationVectorApi[2],
  )

  const currentAngle = currentRotationVector.length()
  const currentAxis = currentRotationVector.normalize()

  let newAngle = newRotationVector.length()
  let newAxis = newRotationVector.normalize()

  // Align rotation axes
  if (newAxis.dot(currentAxis) < 0) {
    newAngle = -newAngle
    newAxis = newAxis.multiplyScalar(-1.0)
  }

  // Shift rotation angle close to previous one to extend domain of rotation angles beyond [0, pi]
  // - this simplifies interpolation and prevents abruptly changing signs of the rotation angles
  let angleDifference = newAngle - currentAngle
  angleDifference -=
    2.0 * Math.PI * Math.floor((angleDifference + Math.PI) / (2.0 * Math.PI))

  newAngle = currentAngle + angleDifference

  return [...newAxis.multiplyScalar(newAngle)] as Vector3Simple
}

/**
 * Store representing the current state of a connected motion group.
 */
export class MotionStreamConnection {
  static async open(nova: NovaClient, motionGroupId: string) {
    const [_motionGroupIndex, controllerId] = motionGroupId.split("@") as [
      string,
      string,
    ]

    const controller =
      await nova.api.controller.getCurrentRobotControllerState(controllerId)
    const motionGroup = controller?.motion_groups.find(
      (mg) => mg.motion_group === motionGroupId,
    )
    if (!controller || !motionGroup) {
      throw new Error(
        `Controller ${controllerId} or motion group ${motionGroupId} not found`,
      )
    }

    const motionStateSocket = nova.openReconnectingWebsocket(
      `/controllers/${controllerId}/motion-groups/${motionGroupId}/state-stream`,
    )

    // Wait for the first message to get the initial state
    const firstMessage = await motionStateSocket.firstMessage()
    const initialMotionState = tryParseJson(firstMessage.data)
      ?.result as MotionGroupState

    if (!initialMotionState) {
      throw new Error(
        `Unable to parse initial motion state message ${firstMessage.data}`,
      )
    }

    console.log(
      `Connected motion state websocket to motion group ${motionGroup.motion_group}. Initial state:\n  `,
      initialMotionState,
    )

    // Get the motion group description for later usage in jogging
    const description = await nova.api.motionGroup.getMotionGroupDescription(
      controllerId,
      motionGroup.motion_group,
    )

    return new MotionStreamConnection(
      nova,
      controller,
      motionGroup,
      description,
      initialMotionState,
      motionStateSocket,
    )
  }

  // Not mobx-observable as this changes very fast; should be observed
  // using animation frames
  rapidlyChangingMotionState: MotionGroupState

  constructor(
    readonly nova: NovaClient,
    readonly controller: RobotControllerState,
    readonly motionGroup: MotionGroupState,
    readonly description: MotionGroupDescription,
    readonly initialMotionState: MotionGroupState,
    readonly motionStateSocket: AutoReconnectingWebsocket,
  ) {
    this.rapidlyChangingMotionState = initialMotionState

    motionStateSocket.addEventListener("message", (event) => {
      const latestMotionState = tryParseJson(event.data)?.result as
        | MotionGroupState
        | undefined

      if (!latestMotionState) {
        throw new Error(
          `Failed to get motion state for ${this.motionGroupId}: ${event.data}`,
        )
      }

      // handle joint position changes
      if (
        !jointValuesEqual(
          this.rapidlyChangingMotionState.joint_position,
          latestMotionState.joint_position,
          MOTION_DELTA_THRESHOLD,
        )
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState = latestMotionState
        })
      }

      // handle tcp pose changes
      if (
        !tcpMotionEqual(
          this.rapidlyChangingMotionState,
          latestMotionState,
          MOTION_DELTA_THRESHOLD,
        )
      ) {
        runInAction(() => {
          if (this.rapidlyChangingMotionState.tcp_pose == null) {
            this.rapidlyChangingMotionState.tcp_pose =
              latestMotionState.tcp_pose
          } else if (
            latestMotionState.tcp_pose?.orientation &&
            latestMotionState.tcp_pose?.position &&
            this.rapidlyChangingMotionState.tcp_pose?.orientation
          ) {
            this.rapidlyChangingMotionState.tcp_pose = {
              position: latestMotionState.tcp_pose.position,
              orientation: unwrapRotationVector(
                latestMotionState.tcp_pose.orientation as Vector3Simple,
                this.rapidlyChangingMotionState.tcp_pose
                  .orientation as Vector3Simple,
              ),
            }
          } else {
            console.warn(
              "Received incomplete tcp_pose, ignoring",
              latestMotionState.tcp_pose,
            )
          }
        })
      }

      // handle standstill changes
      if (
        this.rapidlyChangingMotionState.standstill !==
        latestMotionState.standstill
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.standstill =
            latestMotionState.standstill
        })
      }
    })
    makeAutoObservable(this)
  }

  get motionGroupId() {
    return this.motionGroup.motion_group
  }

  get controllerId() {
    return this.controller.controller
  }

  get wandelscriptIdentifier() {
    const num = this.motionGroupId.split("@")[0]
    return `${this.controllerId.replace(/-/g, "_")}_${num}`
  }

  get joints() {
    return this.initialMotionState.joint_position.map((_, i) => {
      return {
        index: i,
      }
    })
  }

  dispose() {
    this.motionStateSocket.close()
  }
}
