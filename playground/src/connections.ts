import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import {
  ConnectedMotionGroup,
  JoggerConnection,
  JoggingStore,
  type Vector3Simple,
} from "@wandelbots/wandelbots-js-react-components"
import { when } from "mobx"
import { useEffect, useState } from "react"
import type { PlaygroundInstance } from "./instance"

/** The result of a load: the value or the error, neither while it loads */
export type Loading<T> = { value?: T; error?: unknown }

/**
 * Loads a value for a key, and loads again when the key changes. `close`
 * (if given) closes the value when the key changes or the component
 * unmounts, for example the websockets of a connection.
 */
export function useAsync<T>(
  key: string | undefined,
  load: (key: string) => Promise<T>,
  close?: (value: T) => void,
): Loading<T> {
  const [state, setState] = useState<{ key?: string } & Loading<T>>({})

  // biome-ignore lint/correctness/useExhaustiveDependencies: loads again only for a new key
  useEffect(() => {
    if (key === undefined) return
    let closed = false
    let loaded: { value: T } | undefined

    load(key).then(
      (value) => {
        if (closed) {
          close?.(value)
          return
        }
        loaded = { value }
        setState({ key, value })
      },
      (error) => {
        if (!closed) setState({ key, error })
      },
    )

    return () => {
      closed = true
      if (loaded) close?.(loaded.value)
    }
  }, [key])

  return state.key === key ? state : {}
}

/** All motion groups of the cell, for example ["0@ur5e"] */
export async function listMotionGroupIds({
  nova,
  cellId,
}: PlaygroundInstance): Promise<string[]> {
  const controllers = await nova.api.controller.listRobotControllers(cellId)
  const states = await Promise.all(
    controllers.map((controller) =>
      nova.api.controller
        .getCurrentRobotControllerState(cellId, controller)
        .catch((error) => {
          // For example a virtual robot that still starts
          console.warn(`No state of the controller ${controller}`, error)
          return undefined
        }),
    ),
  )
  return states.flatMap(
    (state) => state?.motion_groups.map((group) => group.motion_group) ?? [],
  )
}

/** The ConnectedMotionGroup of a motion group, as an app connects it */
export function useConnectedMotionGroup(
  instance: PlaygroundInstance,
  motionGroupId: string | undefined,
): Loading<ConnectedMotionGroup> {
  return useAsync(
    motionGroupId,
    (id) =>
      ConnectedMotionGroup.connect(instance.nova, id, {
        cellId: instance.cellId,
      }),
    (motionGroup) => motionGroup.dispose(),
  )
}

/**
 * A JoggingStore of a motion group, opened as JoggingPanel does it:
 * `JoggerConnection.open`, then `JoggingStore.loadFor`.
 */
export function useJoggingStore(
  instance: PlaygroundInstance,
  motionGroupId: string,
): Loading<JoggingStore> {
  return useAsync(
    motionGroupId,
    async (id) => {
      const jogger = await JoggerConnection.open(instance.nova, id, {
        cellId: instance.cellId,
      })
      try {
        return await JoggingStore.loadFor(jogger)
      } catch (error) {
        // Also closes the motion stream that open() opened
        jogger.dispose()
        throw error
      }
    },
    // Closes the jogger with its motion stream
    (store) => store.dispose(),
  )
}

/**
 * What a jog button moves: a joint, or the TCP along an axis or about it, of
 * the world frame or (with `tool`) of the tool
 */
export type JogCommand =
  | { joint: number; direction: "-" | "+" }
  | {
      axis: "x" | "y" | "z"
      direction: "-" | "+"
      rotate?: boolean
      tool?: boolean
    }

/** The number of the last press per store (see startJogging) */
const jogPresses = new WeakMap<JoggingStore, number>()

function nextJogPress(store: JoggingStore) {
  const press = (jogPresses.get(store) ?? 0) + 1
  jogPresses.set(store, press)
  return press
}

/**
 * Jogs while a button is pressed, with the velocity of the store, as the
 * tabs of JoggingPanel do: the jog command goes out only after NOVA has
 * confirmed the jogging websocket (about 0.1 to 0.5 s). A press that ends
 * before (stopJogging) moves nothing, and an error goes to the console
 * instead of being uncaught.
 */
export async function startJogging(store: JoggingStore, command: JogCommand) {
  const press = nextJogPress(store)
  try {
    // Not store.activate(): with an increment selected in JoggingPanel (saved
    // in localStorage), it would open a trajectory instead of jogging
    await store.jogger.setJoggingMode("jogging")

    // The button was released (or another one pressed) while the jogging
    // websocket opened: this press moves nothing
    if (press !== jogPresses.get(store)) return

    if ("joint" in command) {
      // A prismatic joint (a linear axis) moves in mm/s
      const revolute = store.jointType === JointTypeEnum.RevoluteJoint
      await store.jogger.rotateJoints({
        joint: command.joint,
        direction: command.direction,
        velocityUnit: revolute ? "rad/s" : "mm/s",
        velocityValue: revolute
          ? store.rotationVelocityRadsPerSec
          : store.translationVelocityMmPerSec,
      })
    } else {
      // The jogger reads it at each request: with "tool", NOVA moves along
      // the tool's axes
      store.jogger.orientation = command.tool ? "tool" : "coordsys"
      if (command.rotate) {
        await store.jogger.rotateTCP({
          axis: command.axis,
          direction: command.direction,
          velocityRadsPerSec: store.rotationVelocityRadsPerSec,
        })
      } else {
        await store.jogger.translateTCP({
          axis: command.axis,
          direction: command.direction,
          velocityMmPerSec: store.translationVelocityMmPerSec,
        })
      }
    }
  } catch (error) {
    console.error("Jogging failed:", error)
  }
}

/**
 * Ends the press of startJogging: stops the motion and the jogging. A press
 * that starts while the stop is under way (a joint slider turning around
 * calls onJogStop and onJogStart in one event) keeps the jogging connection.
 */
export async function stopJogging(store: JoggingStore) {
  const press = nextJogPress(store)
  await store.jogger.stop()
  if (press !== jogPresses.get(store)) return
  await store.deactivate()
}

/**
 * Jogs the TCP one step along an axis of the world frame, or about it, as
 * the Increment mode of JoggingPanel does: a short trajectory, with the
 * velocity of the store. The store is locked while it runs, and its
 * `incrementJogInProgress` names the handle. An error goes to the console.
 */
export async function jogStep(
  store: JoggingStore,
  step: {
    axis: "x" | "y" | "z"
    direction: "-" | "+"
    rotate: boolean
    /** In mm, or in rad with `rotate` */
    distance: number
  },
) {
  const state = store.jogger.motionStream.rapidlyChangingMotionState
  const tcpPose = state.tcp_pose
  if (!tcpPose || store.isLocked) return

  await store.withMotionLock(async () => {
    try {
      store.setCurrentIncrementJog({
        axis: step.axis,
        direction: step.direction,
      })
      await store.jogger.setJoggingMode("trajectory")
      await store.jogger.runIncrementalCartesianMotion({
        currentTcpPose: tcpPose,
        currentJoints: state.joint_position as Vector3Simple,
        coordSystemId: "world",
        velocityInRelevantUnits: step.rotate
          ? store.rotationVelocityRadsPerSec
          : store.translationVelocityMmPerSec,
        axis: step.axis,
        direction: step.direction,
        motion: step.rotate
          ? { type: "rotate", distanceRads: step.distance }
          : { type: "translate", distanceMm: step.distance },
      })
      // It returns once the trajectory is sent: wait until the robot has
      // moved and stands still again, so that the store stays locked (the
      // handle shown pressed) while the step runs, and steps do not overlap
      const motion = store.jogger.motionStream
      await when(() => !motion.rapidlyChangingMotionState.standstill, {
        timeout: 2000,
      }).catch(() => {
        // a tiny step may be over before this looks
      })
      await when(() => motion.rapidlyChangingMotionState.standstill, {
        timeout: 60_000,
      })
    } catch (error) {
      console.error("Jogging a step failed:", error)
    } finally {
      store.setCurrentIncrementJog(null)
      await store.deactivate()
    }
  })
}
