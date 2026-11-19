import Tooltip from "@mui/material/Tooltip"
import { PrimaryButton } from "@wandelbots/mui"
import { useTranslation } from "react-i18next"
import { useHold } from "../jogging/useHold"

const MOVE = "move" as const

/**
 * The Move to button: the robot moves while it is held and stops when it is
 * let go, however the hold ends (the safety rules of every hold-to-jog
 * control, see useHold)
 */
export function HoldToMoveButton({
  onMoveStart,
  onMoveStop,
  disabled,
  disabledReason,
  loading,
}: {
  onMoveStart: () => void
  onMoveStop: () => void
  disabled: boolean
  /** Why the robot cannot move, shown over the disabled button */
  disabledReason?: string
  /** While the move is planned: the button cannot be held meanwhile */
  loading: boolean
}) {
  const { t } = useTranslation()
  const { held, handlersFor } = useHold<typeof MOVE>({
    onStart: onMoveStart,
    onStop: onMoveStop,
    disabled: disabled || loading,
    isSame: () => true,
  })

  // A button that cannot move says why, or nothing; never "hold to move"
  const hint = disabled
    ? (disabledReason ?? "")
    : t("RobotControl.MoveTo.HoldToMove.lb")

  return (
    <Tooltip title={hint} placement="top">
      {/* A disabled button gets no pointer events; the span still shows why */}
      <span style={{ display: "block" }}>
        <PrimaryButton
          fullWidth
          disabled={disabled}
          loading={loading}
          aria-pressed={held !== null}
          {...handlersFor(MOVE)}
          sx={{ touchAction: "none", userSelect: "none" }}
        >
          {t("RobotControl.MoveTo.MoveToPose.bt")}
        </PrimaryButton>
      </span>
    </Tooltip>
  )
}
