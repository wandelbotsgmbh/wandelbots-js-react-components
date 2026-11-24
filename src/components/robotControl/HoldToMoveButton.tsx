import Tooltip from "@mui/material/Tooltip"
import { NorthEastFilled } from "@wandelbots/icons/NorthEastFilled"
import { PrimaryButton } from "@wandelbots/mui"
import { type RefObject, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHold } from "../jogging/useHold"
import type { RobotControlMoveState } from "./RobotControlPanel"

const MOVE = "move" as const
/** As RobotPad: a shorter click never moves the robot */
const HOLD_BEFORE_MOVE_MS = 200

type HoldToMoveButtonProps = {
  state: RobotControlMoveState
  /** A target the app could plan */
  ready: boolean
  /** The TCP stands at the target */
  atPose: boolean
  disabled: boolean
  onMoveStart: () => void
  onMoveStop: () => void
  /** Gets the function that ends a hold, e.g. before the target goes */
  stopRef?: RefObject<(() => void) | null>
}

/**
 * The Move to button, as RobotPad's: held with a pointer for 200 ms while
 * the move is planned, it starts it, and the release pauses it, as does the
 * pointer leaving the button. The keyboard does not move the robot. It says
 * Moving… and Stopping…, and cannot move to the pose the TCP stands at.
 * Every other way a hold ends stops the move as well (the safety rules of
 * every hold-to-move control, see useHold). At the target the hold goes on,
 * as in RobotPad, until the release or the leave: the hold sits on the
 * wrapper, which keeps the pointer while the button turns off.
 */
export function HoldToMoveButton({
  state,
  ready,
  atPose,
  disabled,
  onMoveStart,
  onMoveStop,
  stopRef,
}: HoldToMoveButtonProps) {
  const { t } = useTranslation()
  const [holding, setHolding] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const started = useRef(false)
  const latest = useRef({ onMoveStart, onMoveStop })
  latest.current = { onMoveStart, onMoveStop }

  const planned = state === "planned"
  const running = planned || state === "moving"
  const { handlersFor, stop } = useHold<typeof MOVE>({
    onStart: () => {
      setHolding(true)
      timer.current = setTimeout(() => {
        timer.current = undefined
        started.current = true
        latest.current.onMoveStart()
      }, HOLD_BEFORE_MOVE_MS)
    },
    onStop: () => {
      setHolding(false)
      clearTimeout(timer.current)
      timer.current = undefined
      if (started.current) {
        started.current = false
        latest.current.onMoveStop()
      }
    },
    disabled: holding
      ? disabled || !ready || !running
      : disabled || !ready || atPose || !planned,
    isSame: () => true,
  })

  if (stopRef) stopRef.current = stop

  useEffect(() => () => clearTimeout(timer.current), [])

  const label =
    state === "moving"
      ? t("RobotControl.MoveTo.Moving.bt")
      : state === "stopping"
        ? t("RobotControl.MoveTo.Stopping.bt")
        : t("RobotControl.MoveTo.MoveTo.bt")

  return (
    <Tooltip
      title={
        atPose
          ? t("RobotControl.MoveTo.AtPose.lb")
          : t("RobotControl.MoveTo.HoldToMove.lb")
      }
      placement="top"
    >
      <span
        {...handlersFor(MOVE)}
        style={{
          display: "block",
          flexGrow: 1,
          touchAction: "none",
          userSelect: "none",
        }}
      >
        <PrimaryButton
          fullWidth
          disabled={disabled || !ready || atPose || !running}
          loading={state === "planning" || state === "stopping"}
          loadingPosition="start"
          startIcon={<NorthEastFilled />}
          aria-pressed={holding}
        >
          {label}
        </PrimaryButton>
      </span>
    </Tooltip>
  )
}
