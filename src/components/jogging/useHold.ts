import {
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

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
 * blur, the window losing focus, the tab being hidden, becoming disabled,
 * unmount) stops it, and stops it once. Pointer capture keeps a drag off the
 * control from leaving the robot moving. The controls can be any element,
 * e.g. buttons or the handles of a gizmo.
 */
export function useHold<T>({
  onStart,
  onStop,
  disabled = false,
  isSame,
}: HoldOptions<T>) {
  const heldRef = useRef<T | null>(null)
  const [held, setHeld] = useState<T | null>(null)

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
    setHeld(null)
    latest.current.onStop()
  }, [])

  useEffect(() => {
    if (disabled) stop()
  }, [disabled, stop])

  useEffect(() => () => stop(), [stop])

  // A release outside the page never reaches the control: switching to
  // another app or tab mid-hold must not leave the robot moving
  const isHolding = held !== null
  useEffect(() => {
    if (!isHolding) return
    const stopHold = () => stop()
    const stopWhenHidden = () => {
      if (document.visibilityState === "hidden") stop()
    }
    window.addEventListener("blur", stopHold)
    document.addEventListener("visibilitychange", stopWhenHidden)
    return () => {
      window.removeEventListener("blur", stopHold)
      document.removeEventListener("visibilitychange", stopWhenHidden)
    }
  }, [isHolding, stop])

  const handlersFor = useCallback(
    (target: T) => ({
      onPointerDown: (event: PointerEvent<Element>) => {
        if (event.button !== 0) return
        if (start(target)) {
          event.currentTarget.setPointerCapture?.(event.pointerId)
        }
      },
      onPointerUp: () => stop(target),
      onPointerCancel: () => stop(target),
      onLostPointerCapture: () => stop(target),
      onKeyDown: (event: KeyboardEvent<Element>) => {
        if (!isActivationKey(event.key)) return
        event.preventDefault()
        if (!event.repeat) start(target)
      },
      onKeyUp: (event: KeyboardEvent<Element>) => {
        if (isActivationKey(event.key)) stop(target)
      },
      onBlur: (_event: FocusEvent<Element>) => stop(target),
    }),
    [start, stop],
  )

  /** Ends the running hold, if any, e.g. when the controls change */
  const stopHeld = useCallback(() => stop(), [stop])

  return { held, handlersFor, stop: stopHeld }
}
