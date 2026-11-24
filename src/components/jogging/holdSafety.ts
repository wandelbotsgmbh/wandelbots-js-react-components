import { useEffect } from "react"

// The safety rules of every hold-to-jog control: the gizmo and the buttons
// (useHold) and the joint slider (useJointJogHold). A motion must run exactly
// as long as the user holds the control, so each rule below ends a hold the
// user can no longer end, or keeps a press from starting one it could not.
// A fix belongs here, so that it reaches every control.

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
 * Whether a key press may start a hold: not an auto-repeat, and no Cmd.
 * macOS sends no key release for a key released while Cmd is held.
 */
export function startsKeyHold(event: {
  repeat: boolean
  metaKey: boolean
}): boolean {
  return !event.repeat && !event.metaKey
}

/**
 * Whether a key press ends a running hold: any new press does, as a key can
 * take the release away (Cmd, on macOS). Only an auto-repeat goes on: of the
 * key that holds, or of a key that was down before a pointer's press.
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

/** The context menu of a control would swallow the release of a hold */
export function preventContextMenu(event: { preventDefault: () => void }) {
  event.preventDefault()
}

/**
 * Ends a hold that the user can no longer end at the control: when the
 * controls become disabled or unmount, and while `holding`, when the window
 * loses focus or the tab is hidden (a release outside the page never reaches
 * the control). `end` must be stable and do nothing when nothing is held.
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
