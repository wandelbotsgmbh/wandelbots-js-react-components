import {
  type AutoReconnectingWebsocket,
  tryParseJson,
} from "@wandelbots/nova-js"
import type {
  MotionGroupDescription,
  MotionGroupState,
  Nova,
  RobotControllerState,
} from "@wandelbots/nova-js/v2"
import { computed, makeAutoObservable, runInAction } from "mobx"
import type { ConnectionLogger } from "./connectionLogger"
import type { Vector3Simple } from "./JoggerConnection"
import {
  jointValuesUnchanged,
  type MotionStateReadout,
  readoutOf,
  readoutsEqual,
  tcpMotionEqual,
  unwrapRotationVector,
} from "./motionStateUpdate"
import {
  cellIdOf,
  createNovaClient,
  type NovaConnection,
} from "./novaConnection"

const MOTION_DELTA_THRESHOLD = 0.0001

/**
 * Store representing the current state of a connected motion group.
 */
export type MotionStreamConnectionOptions = {
  /** Cell id on the Nova instance. Defaults to "cell". */
  cellId?: string
  /** Where the stream logs. Defaults to the console. */
  logger?: ConnectionLogger
}

export class MotionStreamConnection {
  static async open(
    connection: NovaConnection,
    motionGroupId: string,
    options: MotionStreamConnectionOptions = {},
  ) {
    const nova = createNovaClient(connection)
    const cellId = options.cellId ?? cellIdOf(connection) ?? "cell"
    const [_motionGroupIndex, controllerId] = motionGroupId.split("@") as [
      string,
      string,
    ]

    const controller = await nova.api.controller.getCurrentRobotControllerState(
      cellId,
      controllerId,
    )
    const motionGroup = controller?.motion_groups.find(
      (mg: MotionGroupState) => mg.motion_group === motionGroupId,
    )
    if (!controller || !motionGroup) {
      throw new Error(
        `Controller ${controllerId} or motion group ${motionGroupId} not found`,
      )
    }

    const motionStateSocket = nova.openReconnectingWebsocket(
      `/cells/${cellId}/controllers/${controllerId}/motion-groups/${motionGroupId}/state-stream`,
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

    const logger = options.logger ?? console
    logger.info("Connected motion state websocket to motion group", {
      motionGroup: motionGroup.motion_group,
      initialMotionState,
    })

    // Get the motion group description for later usage in jogging
    const description = await nova.api.motionGroup.getMotionGroupDescription(
      cellId,
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
      cellId,
      { logger },
    )
  }

  // Not mobx-observable as this changes very fast; should be observed
  // using animation frames
  rapidlyChangingMotionState: MotionGroupState

  /**
   * The library's own NOVA client (see `createNovaClient`)
   * @internal
   */
  readonly nova: Nova

  private readonly logger: ConnectionLogger

  constructor(
    connection: NovaConnection,
    readonly controller: RobotControllerState,
    readonly motionGroup: MotionGroupState,
    readonly description: MotionGroupDescription,
    readonly initialMotionState: MotionGroupState,
    readonly motionStateSocket: AutoReconnectingWebsocket,
    readonly cellId: string = "cell",
    options: Pick<MotionStreamConnectionOptions, "logger"> = {},
  ) {
    this.nova = createNovaClient(connection)
    this.logger = options.logger ?? console
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
            // Happens per message during motion, and is not actionable
            this.logger.debug("Received incomplete tcp_pose, ignoring", {
              tcpPose: latestMotionState.tcp_pose,
            })
          }
        })
      }

      // handle joint position changes. After the pose: the readout switches
      // on the joints, so it has to find the matching pose already stored.
      if (
        !jointValuesUnchanged(
          this.rapidlyChangingMotionState.joint_position,
          latestMotionState.joint_position,
          MOTION_DELTA_THRESHOLD,
        )
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.joint_position =
            latestMotionState.joint_position
        })
      }

      // handle active TCP changes (tcp is a string identifier, not a pose)
      if (
        latestMotionState.tcp !== undefined &&
        this.rapidlyChangingMotionState.tcp !== latestMotionState.tcp
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.tcp = latestMotionState.tcp
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

      // handle joint limit changes
      const currentLimits =
        this.rapidlyChangingMotionState.joint_limit_reached.limit_reached
      const newLimits = latestMotionState.joint_limit_reached.limit_reached
      if (currentLimits.some((v, i) => v !== newLimits[i])) {
        runInAction(() => {
          this.rapidlyChangingMotionState.joint_limit_reached =
            latestMotionState.joint_limit_reached
        })
      }

      // handle execute state changes
      if (
        this.rapidlyChangingMotionState.execute !== latestMotionState.execute
      ) {
        runInAction(() => {
          this.rapidlyChangingMotionState.execute = latestMotionState.execute
        })
      }
    })
    makeAutoObservable<this, "logger">(this, {
      logger: false,
      // keepAlive: pose readouts poll it from requestAnimationFrame, which
      // MobX does not track, and a computed nobody observes is recomputed on
      // every read without consulting `equals`
      readoutState: computed({ equals: readoutsEqual, keepAlive: true }),
    })
  }

  /**
   * What pose readouts show (joints, TCP pose): it holds the previous reading
   * while the joints only jitter (less than 0.0002 rad), and while the TCP and
   * the coordinate system stay. Kept alive, so it also holds for untracked
   * reads, e.g. from requestAnimationFrame.
   */
  get readoutState(): MotionStateReadout {
    return readoutOf(this.rapidlyChangingMotionState)
  }

  get motionGroupId() {
    return this.motionGroup.motion_group
  }

  get controllerId() {
    return this.controller.controller
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

export default MotionStreamConnection
