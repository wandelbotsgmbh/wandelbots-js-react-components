import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useRef,
  useState,
} from "react"
import {
  endsHold,
  preventContextMenu,
  primaryReleased,
  startsKeyHold,
  startsPointerHold,
  useEndHoldWhenUnattended,
} from "./holdSafety"

export type HoldOptions<T> = {
  /** A control was pressed: act on `target` until `onStop` */
  onStart: (target: T) => void
  onStop: () => void
  disabled?: boolean
  /** Whether two targets are the same control */
  isSame: (a: T, b: T) => boolean
}

const isActivationKey = (key: string) => key === " " || key === "Enter"

/**
 * Press-and-hold for a set of controls that move the robot: the motion runs
 * exactly as long as one control is held, by pointer or by Space/Enter.
 *
 * Only one runs at a time; pressing a second control while one is held does
 * nothing. Every way a hold can end (release, cancel, lost pointer capture,
 * a move with the primary button up, blur, another key pressed, the window
 * losing focus, the tab being hidden, becoming disabled, unmount) stops it,
 * and stops it once. Pointer capture keeps a drag off the control from
 * leaving the robot moving. The controls can be any element, e.g. buttons or
 * the handles of a gizmo. The safety rules are shared with the joint slider:
 * see holdSafety.
 */
export function useHold<T>({
  onStart,
  onStop,
  disabled = false,
  isSame,
}: HoldOptions<T>) {
  const heldRef = useRef<T | null>(null)
  const [held, setHeld] = useState<T | null>(null)
  // The pointer that holds, or null for a key hold
  const heldPointer = useRef<number | null>(null)

  // The latest callbacks, for the cleanups below
  const latest = useRef({ onStop, isSame })
  latest.current = { onStop, isSame }

  const start = useCallback(
    (target: T) => {
      if (disabled || heldRef.current !== null) return false
      heldRef.current = target
      setHeld(target)
      onStart(target)
      return true
    },
    [disabled, onStart],
  )

  const stop = useCallback((target?: T) => {
    const current = heldRef.current
    if (current === null) return
    if (target !== undefined && !latest.current.isSame(current, target)) return
    heldRef.current = null
    heldPointer.current = null
    setHeld(null)
    latest.current.onStop()
  }, [])

  const stopAny = useCallback(() => stop(), [stop])
  useEndHoldWhenUnattended(held !== null, disabled, stopAny)

  const handlersFor = useCallback(
    (target: T) => ({
      onPointerDown: (event: PointerEvent<Element>) => {
        if (!startsPointerHold(event)) return
        if (start(target)) {
          heldPointer.current = event.pointerId
          event.currentTarget.setPointerCapture?.(event.pointerId)
        }
      },
      onPointerMove: (event: PointerEvent<Element>) => {
        if (heldPointer.current === event.pointerId && primaryReleased(event)) {
          stop(target)
        }
      },
      onPointerUp: () => stop(target),
      onPointerCancel: () => stop(target),
      onLostPointerCapture: () => stop(target),
      onKeyDown: (event: KeyboardEvent<Element>) => {
        const isActivation = isActivationKey(event.key)
        if (isActivation) event.preventDefault()
        if (heldRef.current !== null) {
          if (endsHold(event)) stop()
        } else if (isActivation && startsKeyHold(event)) {
          start(target)
        }
      },
      onKeyUp: (event: KeyboardEvent<Element>) => {
        if (isActivationKey(event.key)) stop(target)
      },
      onBlur: (_event: FocusEvent<Element>) => stop(target),
      onContextMenu: preventContextMenu,
    }),
    [start, stop],
  )

  /** Ends the running hold, if any, e.g. when the controls change */
  return { held, handlersFor, stop: stopAny }
}
