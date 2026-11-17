import { useCallback } from "react"
import {
  isSameJogHandle,
  type JogAxis,
  type JogDirection,
  type JogHandle,
} from "./jogHandle"
import { useHold } from "./useHold"

export type HoldToJogOptions = {
  onJogStart: (axis: JogAxis, direction: JogDirection) => void
  onJogStop: () => void
  disabled?: boolean
}

/**
 * Hold-to-jog for a set of jog controls, one per jog handle (e.g. +X): see
 * {@link useHold} for how a hold starts and ends
 */
export function useHoldToJog({
  onJogStart,
  onJogStop,
  disabled = false,
}: HoldToJogOptions) {
  const onStart = useCallback(
    (handle: JogHandle) => onJogStart(handle.axis, handle.direction),
    [onJogStart],
  )
  return useHold<JogHandle>({
    onStart,
    onStop: onJogStop,
    disabled,
    isSame: isSameJogHandle,
  })
}
