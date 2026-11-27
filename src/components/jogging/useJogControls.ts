import { useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  isSameJogHandle,
  type JogAxis,
  type JogDirection,
  type JogHandle,
  jogHandleName,
} from "./jogHandle"
import { useHold } from "./useHold"

/**
 * The props that every set of jog controls takes (JoggingGizmo,
 * JoggingButtons), so an app wires them the same way and can show both
 */
export type JogControlsProps = {
  /**
   * Whether the controls move the robot along the axes or turn it about
   * them. Defaults to `"translate"`. A jog that runs when it changes stops.
   */
  motion?: "translate" | "rotate"
  /**
   * A control was pressed: jog along `axis` (or about it, in `"rotate"`
   * motion) until `onJogStop`
   */
  onJogStart: (axis: JogAxis, direction: JogDirection) => void
  /** The held control was let go */
  onJogStop: () => void
  /** Shows a control as pressed while it is not held, e.g. a running step */
  activeHandle?: JogHandle | null
  disabled?: boolean
}

/**
 * Hold-to-jog for a set of jog controls, one per jog handle (e.g. X+): see
 * {@link useHold} for how a hold starts and ends. A change of the motion also
 * ends it: a translation must not go on as a rotation.
 */
export function useJogControls({
  motion = "translate",
  onJogStart,
  onJogStop,
  activeHandle,
  disabled = false,
}: JogControlsProps) {
  const { t } = useTranslation()
  const onStart = useCallback(
    (handle: JogHandle) => onJogStart(handle.axis, handle.direction),
    [onJogStart],
  )
  const { held, handlersFor, stop } = useHold<JogHandle>({
    onStart,
    onStop: onJogStop,
    disabled,
    isSame: isSameJogHandle,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: motion is the trigger
  useEffect(() => {
    stop()
  }, [motion, stop])

  return {
    held,
    handlersFor,
    /** The accessible name of a control, e.g. "Jog X+", or "Jog Rx+" rotating */
    label: (handle: JogHandle) =>
      t("Jogging.Handle.lb", { handle: jogHandleName(handle, motion) }),
    /** Whether a control shows as pressed: while it is held or shown as active */
    isPressed: (handle: JogHandle) =>
      isSameJogHandle(held, handle) || isSameJogHandle(activeHandle, handle),
  }
}
