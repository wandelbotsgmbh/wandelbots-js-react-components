import type { AutoReconnectingWebsocket } from "@wandelbots/nova-js"
import { makeErrorMessage } from "@wandelbots/nova-js"
import type {
  CoordinateSystem,
  KinematicModel,
  MotionGroupDescription,
  MotionGroupState,
  Nova,
  RobotControllerConfiguration,
  RobotControllerState,
} from "@wandelbots/nova-js/v2"
import { tryParseJson } from "../../components/utils/converters"
import type { ControllerStateSource } from "../controllerStateSource"
import {
  getMotionGroupModelResource,
  resolveMotionGroupModelName,
} from "../motionGroupModelResources"
import {
  type RobotLoadProgress,
  RobotLoadStepError,
  type RobotLoadStepId,
} from "./RobotLoadProgress"

// Ported from RobotPad (src/robotLoad/loadRobotResources.ts)

/**
 * How long to wait for the first message on a stream before treating the
 * robot as unreachable. Without this the load waits forever: NATS reconnects
 * indefinitely and never rejects, so a controller that never publishes state
 * left the user staring at a spinner.
 */
export const SOCKET_FIRST_MESSAGE_TIMEOUT_MS = 10_000

/** Everything a robot session needs fetched before it can show a robot */
export type RobotLoadResources = {
  motionGroupDescription: MotionGroupDescription
  controllerConfiguration: RobotControllerConfiguration
  kinematicModel: KinematicModel
  /** Model holding this robot's data; a custom copy when its serial number has one */
  motionGroupModelName: string
  coordinateSystems: CoordinateSystem[]
  /** Controller state as fetched over HTTP, used to seed the motion stream */
  controllerState: RobotControllerState
  motionGroupState: MotionGroupState
  initialMotionState: MotionGroupState
  motionStateSocket: AutoReconnectingWebsocket
  /** Where the controller's live state comes from */
  stateSource: ControllerStateSource
  /** First controller state from {@link stateSource} */
  initialControllerState: RobotControllerState
  /** Release the streams opened during the load */
  dispose(): void
}

export type LoadRobotResourcesOptions = {
  nova: Nova
  cellId: string
  controllerId: string
  motionGroupId: string
  progress: RobotLoadProgress
  /** Opens the source of the controller's live state */
  createStateSource: (options: {
    cellId: string
    controllerId: string
  }) => ControllerStateSource
  /** Returns true once a newer load has superseded this one */
  isStale?: () => boolean
  socketTimeoutMs?: number
}

/** Rejects if the given promise has not settled within `ms` */
async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  // On timeout the race is settled but `promise` lives on, and the websocket
  // one rejects on any later socket error. Mark it handled so that rejection
  // does not surface as an unhandled one after we have moved on.
  promise.catch(() => {})
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error(message)), ms)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Loads every piece of data and every stream needed to bring up a robot,
 * reporting each step to {@link RobotLoadProgress} as it goes. Each piece is
 * fetched exactly once.
 *
 * Resolves to null when a newer load superseded this one. Throws a
 * {@link RobotLoadStepError} when a step fails, after cleaning up anything it
 * already opened.
 *
 * @internal
 */
export async function loadRobotResources({
  nova,
  cellId,
  controllerId,
  motionGroupId,
  progress,
  createStateSource,
  isStale = () => false,
  socketTimeoutMs = SOCKET_FIRST_MESSAGE_TIMEOUT_MS,
}: LoadRobotResourcesOptions): Promise<RobotLoadResources | null> {
  let motionStateSocket: AutoReconnectingWebsocket | undefined
  let stateSource: ControllerStateSource | undefined
  /**
   * Set once the streams have been handed to the caller, which then owns them.
   * Until then this function is responsible for closing whatever it opened, on
   * every exit path — a stale check between two steps is just as much of an
   * abandoned load as a thrown error.
   */
  let handedOver = false

  function disposeStreams() {
    motionStateSocket?.dispose()
    stateSource?.close()
  }

  async function step<T>(
    id: RobotLoadStepId,
    url: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    progress.startStep(id, url)
    try {
      const result = await fn()
      progress.succeedStep(id)
      return result
    } catch (err) {
      progress.failStep(id, err)
      throw new RobotLoadStepError(id, err, makeErrorMessage(err))
    }
  }

  try {
    if (isStale()) return null

    const motionGroupPath = `/cells/${cellId}/controllers/${controllerId}/motion-groups/${motionGroupId}`
    const controllerPath = `/cells/${cellId}/controllers/${controllerId}`

    const motionGroupDescription = await step(
      "motionGroupDescription",
      `${motionGroupPath}/description`,
      () =>
        nova.api.motionGroup.getMotionGroupDescription(
          cellId,
          controllerId,
          motionGroupId,
        ),
    )
    if (isStale()) return null

    const { configuration: controllerConfiguration } = await step(
      "controllerConfiguration",
      controllerPath,
      () => nova.api.controller.getRobotController(cellId, controllerId),
    )
    if (isStale()) return null

    const lookup = {
      model: motionGroupDescription.motion_group_model,
      serialNumber: motionGroupDescription.serial_number,
    }
    const serialQuery = lookup.serialNumber
      ? `?serial_number=${encodeURIComponent(lookup.serialNumber)}`
      : ""
    const kinematicModel = await step(
      "kinematicModel",
      `/experimental/motion-group-models/${encodeURIComponent(lookup.model)}/kinematic${serialQuery}`,
      () =>
        getMotionGroupModelResource<KinematicModel>(
          nova,
          lookup.model,
          lookup.serialNumber,
          "kinematic",
          (url) => progress.updateStepUrl("kinematicModel", url),
        ),
    )
    if (isStale()) return null

    const motionGroupModelName = await step(
      "motionGroupModel",
      `/experimental/motion-group-models/${encodeURIComponent(lookup.model)}/description${serialQuery}`,
      () =>
        resolveMotionGroupModelName(
          nova,
          lookup.model,
          lookup.serialNumber,
          (url) => progress.updateStepUrl("motionGroupModel", url),
        ),
    )
    if (isStale()) return null

    const coordinateSystems = await step(
      "coordinateSystems",
      `${controllerPath}/coordinate-systems?orientation_type=ROTATION_VECTOR`,
      async () =>
        (await nova.api.controller.listCoordinateSystems(
          cellId,
          controllerId,
          "ROTATION_VECTOR",
        )) ?? [],
    )
    if (isStale()) return null

    const { controllerState, motionGroupState } = await step(
      "controllerState",
      `${controllerPath}/state`,
      async () => {
        const state = await nova.api.controller.getCurrentRobotControllerState(
          cellId,
          controllerId,
        )
        const motionGroup = state?.motion_groups.find(
          (mg: MotionGroupState) => mg.motion_group === motionGroupId,
        )
        if (!state || !motionGroup) {
          throw new Error(
            `Controller ${controllerId} or motion group ${motionGroupId} not found`,
          )
        }
        return { controllerState: state, motionGroupState: motionGroup }
      },
    )
    if (isStale()) return null

    const stateStreamPath = `${motionGroupPath}/state-stream`
    const { socket, initialMotionState } = await step(
      "motionStateStream",
      stateStreamPath,
      async () => {
        const openedSocket = nova.openReconnectingWebsocket(stateStreamPath)
        motionStateSocket = openedSocket
        const firstMessage = await withTimeout(
          openedSocket.firstMessage(),
          socketTimeoutMs,
          `No motion state received from ${stateStreamPath} within ${socketTimeoutMs / 1000}s`,
        )
        const state = (
          tryParseJson(firstMessage.data) as
            | { result?: MotionGroupState }
            | undefined
        )?.result
        if (!state) {
          throw new Error(
            `Unable to parse initial motion state message ${firstMessage.data}`,
          )
        }
        return { socket: openedSocket, initialMotionState: state }
      },
    )
    if (isStale()) return null

    const { source, initialControllerState } = await step(
      "controllerStateStream",
      `${controllerPath}/state`,
      async () => {
        const openedSource = createStateSource({ cellId, controllerId })
        stateSource = openedSource
        // Where the source really connects, e.g. a NATS subject
        progress.updateStepUrl("controllerStateStream", openedSource.url)
        const firstMessage = await withTimeout(
          openedSource.firstMessage(),
          socketTimeoutMs,
          `No controller state received from ${openedSource.url} within ${socketTimeoutMs / 1000}s`,
        )
        const state = openedSource.parse(firstMessage.data)
        if (!state) {
          throw new Error(
            `Unable to parse initial controller state message ${firstMessage.data}`,
          )
        }
        // A controller that is still starting up publishes state that does not
        // describe this motion group yet. That is a transient worth retrying,
        // so catch it here rather than letting ControllerStateStream's
        // constructor throw it later, where it is neither retried nor tied to
        // a step.
        if (
          !state.motion_groups?.some((mg) => mg.motion_group === motionGroupId)
        ) {
          throw new Error(
            `Controller state from ${openedSource.url} does not list motion group ${motionGroupId} yet`,
          )
        }
        return { source: openedSource, initialControllerState: state }
      },
    )

    if (isStale()) return null

    handedOver = true
    return {
      motionGroupDescription,
      controllerConfiguration,
      kinematicModel,
      motionGroupModelName,
      coordinateSystems,
      controllerState,
      motionGroupState,
      initialMotionState,
      motionStateSocket: socket,
      stateSource: source,
      initialControllerState,
      dispose: disposeStreams,
    }
  } finally {
    if (!handedOver) disposeStreams()
  }
}
