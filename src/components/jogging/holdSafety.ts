import { useEffect } from "react"

// The safety rules of every hold-to-move control: the gizmo, the buttons and
// Move to (useHold) and the joint slider (useJointJogHold). A motion must run
// exactly as long as the user holds the control with a pointer, so each rule
// below ends a hold the user can no longer end, or keeps a press from
// starting one it could not. A fix belongs here, so that it reaches every
// control.
//
// A hold ends when the pointer is let go, anywhere, and when it leaves the
// control, as in RobotPad. The keyboard starts no hold: a key only ends one.

/**
 * Whether a pointer press may start a hold: the primary button, and no Ctrl.
 * On macOS a Ctrl+click is a primary press that opens the context menu, and
 * the menu swallows the release.
 */
export function startsPointerHold(event: {
  button: number
  ctrlKey: boolean
}): boolean {
  return event.button === 0 && !event.ctrlKey
}

/**
 * Whether a key press ends a running hold: any new press does, as a key can
 * take the pointer's release away (Cmd, on macOS). Only the auto-repeat of a
 * key that was down before goes on.
 */
export function endsHold(event: { repeat: boolean }): boolean {
  return !event.repeat
}

/**
 * Whether a move of the holding pointer shows that its primary button is up:
 * its release never arrived, or it came while another button stays pressed,
 * when the browser sends no pointerup until the last button is up
 */
export function primaryReleased(event: { buttons: number }): boolean {
  return (event.buttons & 1) === 0
}

/**
 * Takes the capture of a pointer that starts a hold, so that its moves and
 * its release reach the control wherever they happen: a hold ends on a
 * release anywhere, and {@link isPointerOn} needs the moves to see the
 * pointer leave. A touch is captured by the browser anyway.
 */
export function capturePointer(element: Element, pointerId: number) {
  try {
    element.setPointerCapture?.(pointerId)
  } catch {
    // Not a pointer the browser knows, e.g. in tests: its leave still ends
    // the hold, as the browser then says so itself (pointerleave)
  }
}

/**
 * Gives back the capture of a pointer whose hold is over while it is still
 * down, e.g. after it left the control: the control must not go on taking
 * its moves, and showing as hovered
 */
export function releasePointer(element: Element, pointerId: number) {
  try {
    if (element.hasPointerCapture?.(pointerId)) {
      element.releasePointerCapture(pointerId)
    }
  } catch {
    // The pointer is gone already
  }
}

/**
 * Whether the pointer of a move is still on the control that holds it: over
 * an element that `isControl` takes for it, by default the element that
 * handles the move or one inside it. Leaving a control ends its hold, as
 * letting go does.
 *
 * The page is asked what lies under the pointer, as for a press there. A
 * captured pointer gets no pointerleave, and a touch is always captured, so
 * this is what tells for a mouse, a pen and a finger alike; it also holds
 * for a control of any shape, or one that another element covers. Where
 * nothing can be asked (no layout, as in jsdom), the pointer counts as on.
 */
export function isPointerOn(
  event: { clientX: number; clientY: number; currentTarget: Element },
  isControl: (element: Element) => boolean = (element) =>
    event.currentTarget.contains(element),
): boolean {
  // The control's own root: a document only sees the host of a shadow tree
  const root =
    event.currentTarget.getRootNode() as Partial<DocumentOrShadowRoot>
  if (typeof root.elementFromPoint !== "function") return true
  const under = root.elementFromPoint(event.clientX, event.clientY)
  return under !== null && isControl(under)
}

/**
 * As {@link isPointerOn}, for a control that is a plain box and lets the
 * holding pointer stray a little: whether the pointer of a move is within
 * `marginPx` of the element that handles it
 */
export function isPointerWithin(
  event: { clientX: number; clientY: number; currentTarget: Element },
  marginPx: number,
): boolean {
  const box = event.currentTarget.getBoundingClientRect()
  return (
    event.clientX >= box.left - marginPx &&
    event.clientX <= box.right + marginPx &&
    event.clientY >= box.top - marginPx &&
    event.clientY <= box.bottom + marginPx
  )
}

/** The context menu of a control would swallow the release of a hold */
export function preventContextMenu(event: { preventDefault: () => void }) {
  event.preventDefault()
}

/**
 * Ends a hold that the user can no longer end at the control: when the
 * controls become disabled or unmount, and while `holding`, when the window
 * loses focus or the tab is hidden (a release outside the page may never
 * reach the control). `end` must be stable and do nothing when nothing is
 * held.
 */
export function useEndHoldWhenUnattended(
  holding: boolean,
  disabled: boolean,
  end: () => void,
) {
  useEffect(() => {
    if (disabled) end()
  }, [disabled, end])

  useEffect(() => () => end(), [end])

  useEffect(() => {
    if (!holding) return
    const endWhenHidden = () => {
      if (document.visibilityState === "hidden") end()
    }
    window.addEventListener("blur", end)
    document.addEventListener("visibilitychange", endWhenHidden)
    return () => {
      window.removeEventListener("blur", end)
      document.removeEventListener("visibilitychange", endWhenHidden)
    }
  }, [holding, end])
}
