import { makeErrorMessage } from "@wandelbots/nova-js"
import type {
  MotionGroupState,
  RobotControllerState,
} from "@wandelbots/nova-js/v2"
import { isEqual } from "lodash-es"
import { computed, makeAutoObservable } from "mobx"
import type { ControllerStateSource } from "./controllerStateSource"
import {
  jointValuesEqual,
  type MotionStateReadout,
  readoutOf,
  readoutsEqual,
  unwrapRotationVector,
} from "./motionStateUpdate"

// Ported from RobotPad (src/util/StateStreamStore.ts)

/** Joints that moved less than this (rad, or mm) count as standing still */
export const MOTION_DELTA_THRESHOLD = 0.0001

/**
 * The fields that are the whole reason a standstill message is skipped: the
 * pose, load and velocity readings jitter in their last decimals even while the
 * robot physically stands still, and the two bookkeeping fields are new on every
 * message of a ~134/s stream. Writing them notifies their observers — the 3D
 * animators above all — that often for no visible change.
 *
 * Every other field of a motion state is discrete state that changes on its own
 * schedule, so it has to get through whether or not the robot is moving. See
 * {@link ControllerStateStream} (handleMessage).
 */
const STANDSTILL_NOISE_FIELDS: ReadonlySet<string> = new Set([
  "timestamp",
  "sequence_number",
  "joint_position",
  "joint_torque",
  "joint_current",
  "flange_pose",
  "tcp_pose",
  "flange_velocity",
  "tcp_velocity",
])

/** `WebSocket.OPEN`, also where there is no WebSocket (Node) */
const OPEN = 1

const isVector3 = (value: unknown): value is [number, number, number] =>
  Array.isArray(value) &&
  value.length === 3 &&
  value.every((n) => typeof n === "number")

/** A message from the source that the stream could not use */
export type ControllerStateStreamError = {
  message: string
  /** The source's URL */
  url?: string
}

/** What the session gives a {@link ControllerStateStream} besides its source */
export type ControllerStateStreamOptions = {
  /**
   * A virtual robot: its stream can come more slowly, depending on the speed
   * of the simulation, so the stream waits longer before it calls the
   * connection struggling (3 s instead of 1 s) or critical (6 s instead of 3 s)
   */
  isVirtual?: boolean
  /** Reports a message that the stream could not use */
  onError?: (error: ControllerStateStreamError) => void
  /**
   * Reconnect the source when the window gets the focus back, e.g. after the
   * computer slept. Defaults to true where there is a window.
   */
  reconnectOnFocus?: boolean
}

/**
 * The live state of one motion group and its controller, from a
 * {@link ControllerStateSource}: the safety state, operation mode and mode of
 * the controller, and the motion group's state, updated in place as the
 * messages come. Tells how good the connection is, and reconnects the source
 * when its messages stop.
 */
export class ControllerStateStream {
  /**
   * The motion group's state as the last message had it. It stays the same
   * object for as long as the stream lives, updated field by field, so that
   * observers of one of its fields keep working. While the robot stands
   * still, the jittering pose readings are not written.
   */
  rapidlyChangingMotionState: MotionGroupState
  /**
   * The last message that changed the controller's safety state, operation
   * mode or mode, and when it came
   */
  lastValidStateMessage: {
    receivedAt: number
    data: RobotControllerState
  }
  /** Non-observable timestamp for connection quality tracking only */
  private lastMessageReceivedAt: number = Date.now()
  /** The last message that held no state of the motion group, if any */
  lastInvalidStateMessage: {
    receivedAt: number
    data: unknown
  } | null = null
  /**
   * How the messages come: "struggling" after 1 s without one (3 s for a
   * virtual robot), "critical" after 3 s (6 s), when the source is reconnected
   */
  connectionQuality: "good" | "struggling" | "critical" = "good"
  private readonly connectionQualityInterval: ReturnType<typeof setInterval>
  private readonly isVirtual: boolean
  private readonly onError?: (error: ControllerStateStreamError) => void
  private readonly reconnectsOnFocus: boolean

  /**
   * @internal The session makes it from its `stateSource`, see
   * `RobotSession` and `loadRobotSession`
   */
  constructor(
    /** Where the controller state comes from; its owner closes it */
    readonly source: ControllerStateSource,
    /** The motion group whose state the stream keeps */
    readonly motionGroupId: string,
    initialControllerState: RobotControllerState,
    options: ControllerStateStreamOptions = {},
  ) {
    const initialMotionState = initialControllerState.motion_groups.find(
      (mg) => mg.motion_group === motionGroupId,
    )

    if (!initialMotionState) {
      throw new Error(
        `Motion group ${motionGroupId} not found in initial controller state`,
      )
    }

    this.isVirtual = options.isVirtual ?? false
    this.onError = options.onError
    this.reconnectsOnFocus =
      (options.reconnectOnFocus ?? true) && typeof window !== "undefined"
    this.rapidlyChangingMotionState = initialMotionState
    this.lastValidStateMessage = {
      receivedAt: Date.now(),
      data: initialControllerState,
    }

    makeAutoObservable<
      this,
      | "lastMessageReceivedAt"
      | "connectionQualityInterval"
      | "isVirtual"
      | "onError"
      | "reconnectsOnFocus"
    >(
      this,
      {
        source: false,
        lastMessageReceivedAt: false,
        connectionQualityInterval: false,
        isVirtual: false,
        onError: false,
        reconnectsOnFocus: false,
        // keepAlive: a computed nobody observes is recomputed on every read
        // without consulting `equals`, so the hold would depend on a component
        // happening to observe the readout at the time.
        readoutState: computed({ equals: readoutsEqual, keepAlive: true }),
      },
      { autoBind: true },
    )

    this.source.addEventListener("message", this.handleMessage)
    this.connectionQualityInterval = setInterval(
      this.updateConnectionQuality,
      500,
    )
    if (this.reconnectsOnFocus) {
      window.addEventListener("focus", this.handleWindowFocus)
    }
  }

  /** The controller's state as of the last message that changed it */
  get controllerState() {
    return this.lastValidStateMessage.data
  }

  /**
   * What pose and joint readouts show. Holds the previous reading while the
   * joints only jitter (less than 0.0002 rad), and while the TCP and the
   * coordinate system stay; kept alive so it also holds for untracked reads.
   */
  get readoutState(): MotionStateReadout {
    return readoutOf(this.rapidlyChangingMotionState)
  }

  /** The motion group's state in the next message of the source */
  async nextMotionState(): Promise<MotionGroupState> {
    const event = await this.source.nextMessage()
    const motionState = this.source
      .parse(event.data)
      ?.motion_groups?.find((mg) => mg.motion_group === this.motionGroupId)

    if (!motionState) {
      throw new Error(
        `Failed to get motion state for ${this.motionGroupId}: ${event.data}`,
      )
    }

    return motionState
  }

  private setLastInvalidStateMessage(data: unknown) {
    this.lastInvalidStateMessage = {
      receivedAt: Date.now(),
      data,
    }
  }

  private setLastValidStateMessage(data: RobotControllerState) {
    this.lastValidStateMessage = {
      receivedAt: Date.now(),
      data,
    }
  }

  /**
   * Merge the latest motion state onto the existing object instead of replacing
   * it, so this stream owns exactly one live motion state object for the whole
   * time it is connected.
   *
   * Consumers subscribe to *properties* of the object they are holding — the 3D
   * animators keep it in a ref and read `joint_position` inside a MobX
   * reaction. Replacing the object leaves those reactions subscribed to an
   * orphan that never changes again, so the robot model stopped getting joint
   * targets from the stream and only moved when React happened to re-render it
   * (~5 updates/s against a ~134/s stream).
   *
   * Only fields whose value actually changed are written. A blanket
   * `Object.assign` puts a fresh object into every nested field, and MobX
   * compares with `===`, so each of `flange_pose`, `tcp_pose` and
   * `joint_limit_reached` would notify its observers on every message of a
   * ~134/s stream even while standing still. This mirrors how
   * MotionStreamConnection guards each of its own field writes.
   *
   * Fields the message does not carry are removed rather than left behind: a
   * merge must not make a stale pose read as the current one, which replacing
   * the whole object never did.
   *
   * Runs as a MobX action (see `makeAutoObservable` with `autoBind` above), so
   * the per-field writes notify observers once, as a single batch.
   *
   * `skipFields` leaves the named fields exactly as they are — neither updated
   * nor removed — which is how a standstill message updates the discrete state
   * without churning the jittery pose readings.
   */
  private updateRapidlyChangingMotionState(
    motionState: MotionGroupState,
    skipFields?: ReadonlySet<string>,
  ) {
    const current = this.rapidlyChangingMotionState as unknown as Record<
      string,
      unknown
    >
    const next = motionState as unknown as Record<string, unknown>

    for (const key of Object.keys(next)) {
      if (skipFields?.has(key)) continue
      if (!isEqual(current[key], next[key])) {
        current[key] = next[key]
      }
    }

    for (const key of Object.keys(current)) {
      if (skipFields?.has(key)) continue
      if (!(key in next)) {
        delete current[key]
      }
    }
  }

  private setConnectionQuality(
    connectionQuality: "good" | "struggling" | "critical",
  ) {
    this.connectionQuality = connectionQuality
  }

  private handleWindowFocus() {
    this.source.reconnect()
  }

  private updateConnectionQuality() {
    const timeSinceLastValidState = Date.now() - this.lastMessageReceivedAt

    // Virtual robots can have external joint streams that
    // cause websocket messages to be sent out more slowly
    // depending on the speed of the simulation
    const strugglingTimeout = this.isVirtual ? 3000 : 1000
    const criticalTimeout = this.isVirtual ? 6000 : 3000

    if (timeSinceLastValidState > criticalTimeout) {
      if (this.source.readyState === OPEN) {
        // From testing with toggling wifi the websocket will stay in a zombie open
        // state by default-- need to tell it to reconnect
        this.source.reconnect()
      }

      this.setConnectionQuality("critical")
      return
    }

    if (timeSinceLastValidState > strugglingTimeout) {
      this.setConnectionQuality("struggling")
      return
    }

    this.setConnectionQuality("good")
  }

  /**
   * Stops listening to the source; the source's owner closes it. The
   * connection is critical from then on: no state comes any more, and the
   * last one is not the robot's now (a robot that may move, for whatever
   * still reads it).
   */
  dispose() {
    this.source.removeEventListener("message", this.handleMessage)
    clearInterval(this.connectionQualityInterval)
    if (this.reconnectsOnFocus) {
      window.removeEventListener("focus", this.handleWindowFocus)
    }
    this.setConnectionQuality("critical")
  }

  private handleMessage(event: MessageEvent) {
    const data = this.source.parse(event.data)

    if (!data?.motion_groups) {
      this.onError?.({
        message: makeErrorMessage(event.data),
        url: this.source.url,
      })
      this.setLastInvalidStateMessage(event.data)
      return
    }

    // Only update the observable controller state when non-motion fields change
    // to avoid triggering rerenders of safety/operation mode observers on every message
    this.lastMessageReceivedAt = Date.now()
    const prev = this.lastValidStateMessage.data
    if (
      prev.safety_state !== data.safety_state ||
      prev.operation_mode !== data.operation_mode ||
      prev.mode !== data.mode
    ) {
      this.setLastValidStateMessage(data)
    }

    const newMotionState = data.motion_groups.find(
      (mg) => mg.motion_group === this.motionGroupId,
    )

    if (!newMotionState) {
      this.onError?.({
        message: `Motion group ${this.motionGroupId} not found in controller state: ${JSON.stringify(event.data)}`,
        url: this.source.url,
      })
      this.setLastInvalidStateMessage(event.data)
      return
    }

    const hasJointsMoved = !jointValuesEqual(
      this.rapidlyChangingMotionState.joint_position,
      newMotionState.joint_position,
      MOTION_DELTA_THRESHOLD,
    )

    const hasTcpChanged =
      this.rapidlyChangingMotionState.tcp !== newMotionState.tcp

    // The robot is standing still, so its pose readings carry nothing but
    // jitter: writing them would rerender the 3D canvas and the pose panels on
    // every message of a ~134/s stream for no visible change. The rest of the
    // message still has to be applied. `execute` above all: a movement always
    // *ends* with the robot at rest, so the state that closes one out
    // (END_OF_TRAJECTORY after a trajectory, PAUSED_BY_USER and then no
    // `execute` at all after a jog) only ever arrives in messages that carry no
    // joint motion. Dropping those left `execute` frozen at RUNNING until the
    // robot happened to move again, and `TrajectoryExecutionStore.start()` then
    // refused the next pose with "Cannot start trajectory: robot is already
    // running".
    if (!hasJointsMoved && !hasTcpChanged) {
      this.updateRapidlyChangingMotionState(
        newMotionState,
        STANDSTILL_NOISE_FIELDS,
      )
      return
    }

    const oldFlangePose = this.rapidlyChangingMotionState.flange_pose
    const newFlangePose = newMotionState.flange_pose

    if (
      newFlangePose?.orientation == null ||
      !isVector3(newFlangePose.orientation)
    ) {
      const newFlangePoseOrientation = newFlangePose?.orientation
      throw new Error(
        `Invalid newFlangePose.orientation: expected [number, number, number] (got ${
          newFlangePoseOrientation == null
            ? "null"
            : newFlangePoseOrientation.length
        })`,
      )
    }

    if (
      oldFlangePose?.orientation == null ||
      !isVector3(oldFlangePose.orientation)
    ) {
      const oldFlangePoseOrientation = oldFlangePose?.orientation
      throw new Error(
        `Invalid oldFlangePose.orientation: expected [number, number, number] (got ${
          oldFlangePoseOrientation == null
            ? "null"
            : oldFlangePoseOrientation.length
        })`,
      )
    }

    newFlangePose.orientation = unwrapRotationVector(
      newFlangePose.orientation,
      oldFlangePose.orientation,
    )

    this.updateRapidlyChangingMotionState(newMotionState)
  }
}
