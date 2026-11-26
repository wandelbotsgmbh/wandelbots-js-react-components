import {
  JoggingRefusedError,
  type JoggingStore,
  loadRobotSession,
  type RobotSession,
} from "@wandelbots/wandelbots-js-react-components"
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

/**
 * The RobotSession of a motion group, as an app loads it: its jogging
 * settings kept in localStorage, a virtual robot not activated on its own
 */
export function useLoadedSession(
  instance: PlaygroundInstance,
  motionGroupId: string | undefined,
): Loading<RobotSession> {
  return useAsync(
    motionGroupId,
    async (id) => {
      const load = loadRobotSession(instance.nova, id, {
        cellId: instance.cellId,
        storage: localStorage,
        // What fails in the background or in a connected component, e.g. a
        // refused activation: an app shows it, the playground logs it
        onError: (error) => console.error(`${id}: ${error.message}`, error),
      })
      try {
        return await load.ready
      } catch (error) {
        // Closes what the load opened before it failed
        load.dispose()
        throw error
      }
    },
    // Closes the session's connections
    (session) => session.dispose(),
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

/**
 * Jogs while a control is held, with the velocity of the store: the store
 * jogs (startJointJogging, startCartesianJogging), as for every UI that is
 * built on it. So what holds for the library's own panel holds here: the jog
 * command goes out only after NOVA has confirmed the jogging websocket (about
 * 0.1 to 0.5 s), a press that ends before (stopJogging) moves nothing, and
 * the store starts no jog while the robot may not move, e.g. while it is not
 * activated (the top bar has the switch).
 *
 * The store jogs the TCP along its "Move relative to": the frame of the press
 * becomes the store's, which the session keeps in its storage.
 */
export function startJogging(store: JoggingStore, command: JogCommand) {
  if ("joint" in command) {
    follow(store.startJointJogging(command.joint, command.direction))
    return
  }
  if (command.tool) {
    store.setMoveRelativeToSelectedTcp()
  } else {
    store.setMoveRelativeToCoordSystem("world")
  }
  follow(
    store.startCartesianJogging(
      command.rotate ? "rotate" : "translate",
      command.axis,
      command.direction,
    ),
  )
}

/**
 * Ends the press of startJogging: stops the motion and the jogging. A press
 * that starts while the stop is under way (a joint slider turning around
 * calls onJogStop and onJogStart in one event) keeps the jogging connection.
 */
export function stopJogging(store: JoggingStore) {
  follow(store.stopJogging())
}

/**
 * An error of a jog goes to the console instead of being uncaught. A jog
 * that the store refused is none: the pages show their jog controls as off
 * while it would refuse (see cannotJog), and a press that still comes moves
 * nothing.
 */
function follow(jog: Promise<void>) {
  jog.catch((error: unknown) => {
    if (error instanceof JoggingRefusedError) return
    console.error("Jogging failed:", error)
  })
}
