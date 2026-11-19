import { useCallback, useEffect, useRef, useState } from "react"
import type { JogDirection } from "../jogHandle"
import { directionToward, hasReachedGoal } from "./jointJog"

/** A held joint slider: its goal, and which way the joint jogs to it (null: there) */
export type JointHold = {
  goal: number
  direction: JogDirection | null
  /** What holds it: a pointer (by its id) or an arrow key (by its key) */
  by: { pointer: number } | { key: string }
}

export type JointJogHoldOptions = {
  /** The joint's live value */
  value: number
  onJogStart: (direction: JogDirection) => void
  onJogStop: () => void
  disabled: boolean
}

/**
 * Holding a joint slider: the joint jogs toward the goal while the slider is
 * held, and stops when it gets there (still held: a new goal jogs it on) or
 * when the hold ends. One hold at a time: a second pointer or key is ignored.
 *
 * Every way a hold can end without a release reaching the slider stops it:
 * becoming disabled, the window losing focus, the tab being hidden, unmount.
 */
export function useJointJogHold({
  value,
  onJogStart,
  onJogStop,
  disabled,
}: JointJogHoldOptions) {
  const holdRef = useRef<JointHold | null>(null)
  const [hold, setHoldState] = useState<JointHold | null>(null)
  const setHold = useCallback((next: JointHold | null) => {
    holdRef.current = next
    setHoldState(next)
  }, [])

  // The latest value and callbacks, for the handlers and cleanups below
  const latest = useRef({ value, onJogStart, onJogStop })
  latest.current = { value, onJogStart, onJogStop }

  /** Heads for `goal`: starts, turns around or stops the joint */
  const steer = useCallback(
    (held: JointHold, goal: number, deadband: number) => {
      const wanted = directionToward(latest.current.value, goal, deadband)
      if (held.direction && held.direction !== wanted) {
        latest.current.onJogStop()
      }
      if (wanted && wanted !== held.direction) {
        latest.current.onJogStart(wanted)
      }
      setHold({ ...held, goal, direction: wanted })
    },
    [setHold],
  )

  /** Starts a hold toward `goal`; false if the slider cannot be held now */
  const begin = useCallback(
    (goal: number, deadband: number, by: JointHold["by"]): boolean => {
      if (disabled || holdRef.current) return false
      steer({ goal, direction: null, by }, goal, deadband)
      return true
    },
    [disabled, steer],
  )

  /** Moves the goal of the running hold, if any */
  const moveGoal = useCallback(
    (goal: number, deadband: number) => {
      const held = holdRef.current
      if (held) steer(held, goal, deadband)
    },
    [steer],
  )

  /** Ends the hold, if any, and stops the joint if it jogs */
  const end = useCallback(() => {
    const held = holdRef.current
    if (!held) return
    setHold(null)
    if (held.direction) latest.current.onJogStop()
  }, [setHold])

  // Arrived: stop, but stay held, so a new goal jogs the joint on
  useEffect(() => {
    const held = holdRef.current
    if (held?.direction && hasReachedGoal(value, held.goal, held.direction)) {
      latest.current.onJogStop()
      setHold({ ...held, direction: null })
    }
  }, [value, setHold])

  useEffect(() => {
    if (disabled) end()
  }, [disabled, end])

  useEffect(() => () => end(), [end])

  // A release outside the page never reaches the slider: switching to another
  // app or tab mid-hold must not leave the joint moving
  const isHolding = hold !== null
  useEffect(() => {
    if (!isHolding) return
    const endWhenHidden = () => {
      if (document.visibilityState === "hidden") end()
    }
    window.addEventListener("blur", end)
    document.addEventListener("visibilitychange", endWhenHidden)
    return () => {
      window.removeEventListener("blur", end)
      document.removeEventListener("visibilitychange", endWhenHidden)
    }
  }, [isHolding, end])

  return { hold, begin, moveGoal, end }
}
