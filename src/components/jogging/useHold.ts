import {
  type FocusEvent,
  type PointerEvent,
  useCallback,
  useRef,
  useState,
} from "react"
import {
  capturePointer,
  isPointerOn,
  preventContextMenu,
  primaryReleased,
  releasePointer,
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

/**
 * Press-and-hold for a set of controls that move the robot: the motion runs
 * exactly as long as one control is held with a pointer. It stops when the
 * pointer is let go, wherever that happens, and when it leaves the control,
 * as RobotPad's jog buttons do. The keyboard does not move the robot: Space
 * or Enter on a focused control start nothing, and a key pressed during a
 * hold ends it.
 *
 * Only one hold runs at a time; pressing a second control while one is held
 * does nothing. Every way a hold can end (release, leaving the control,
 * cancel, lost pointer capture, a move with the primary button up, blur, a
 * key pressed, the window losing focus, the tab being hidden, becoming
 * disabled, unmount) stops it, and stops it once. The pointer is captured,
 * so its moves and its release reach the control wherever they happen; each
 * move then asks whether the pointer is still on the control. The controls
 * can be any element, e.g. buttons or the handles of a gizmo. The safety
 * rules are shared with the joint slider: see holdSafety.
 */
export function useHold<T>({
  onStart,
  onStop,
  disabled = false,
  isSame,
}: HoldOptions<T>) {
  const heldRef = useRef<T | null>(null)
  const [held, setHeld] = useState<T | null>(null)
  // The pointer that holds, and the element that has its capture
  const holder = useRef<{ pointerId: number; element: Element } | null>(null)

  // The latest callbacks, for the cleanups below
  const latest = useRef({ onStop, isSame })
  latest.current = { onStop, isSame }

  // The hold, its pointer and the capture are recorded before the app is
  // called: a release or a leave ends the hold even if the app fails to start
  const start = useCallback(
    (target: T, pointerId: number, element: Element) => {
      if (disabled || heldRef.current !== null) return
      heldRef.current = target
      holder.current = { pointerId, element }
      setHeld(target)
      capturePointer(element, pointerId)
      onStart(target)
    },
    [disabled, onStart],
  )

  const stop = useCallback((target?: T) => {
    const current = heldRef.current
    if (current === null) return
    if (target !== undefined && !latest.current.isSame(current, target)) return
    const by = holder.current
    heldRef.current = null
    holder.current = null
    setHeld(null)
    if (by) releasePointer(by.element, by.pointerId)
    latest.current.onStop()
  }, [])

  const stopAny = useCallback(() => stop(), [stop])
  useEndHoldWhenUnattended(held !== null, disabled, stopAny)

  /**
   * The handlers of an element that holds `target`. A control made of
   * several elements, e.g. the pieces of a gizmo handle, says with
   * `isControl` which elements are its own: the pointer may move from one to
   * another, and has left the control only when it is over none of them.
   */
  const handlersFor = useCallback(
    (target: T, isControl?: (element: Element) => boolean) => ({
      onPointerDown: (event: PointerEvent<Element>) => {
        if (!startsPointerHold(event)) return
        start(target, event.pointerId, event.currentTarget)
      },
      onPointerMove: (event: PointerEvent<Element>) => {
        if (holder.current?.pointerId !== event.pointerId) return
        if (primaryReleased(event) || !isPointerOn(event, isControl)) {
          stop(target)
        }
      },
      // Only a pointer that could not be captured leaves for the browser
      onPointerLeave: (_event: PointerEvent<Element>) => stop(target),
      onPointerUp: () => stop(target),
      onPointerCancel: () => stop(target),
      onLostPointerCapture: () => stop(target),
      onBlur: (_event: FocusEvent<Element>) => stop(target),
      onContextMenu: preventContextMenu,
    }),
    [start, stop],
  )

  /** Ends the running hold, if any, e.g. when the controls change */
  return { held, handlersFor, stop: stopAny }
}
