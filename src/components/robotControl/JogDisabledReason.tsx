import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { SecondaryButton } from "@wandelbots/mui"
import { useTranslation } from "react-i18next"

type JogDisabledReasonProps = {
  /** The reason, in the user's language */
  text: string
  /** Shows Try again under the reason: the user can end it */
  onRetry?: () => void
  /** The panel is disabled: Try again is off as every control */
  disabled: boolean
}

/**
 * Why jogging is off, where a jog tab else says how to jog, and Try again
 * for a reason that the user can end. A status, so a screen reader says it
 * when it changes, e.g. at an emergency stop.
 */
export function JogDisabledReason({
  text,
  onRetry,
  disabled,
}: JogDisabledReasonProps) {
  const { t } = useTranslation()

  return (
    <Stack
      data-testid="jog-disabled-reason"
      sx={{ alignItems: "center", gap: "8px" }}
    >
      <Typography
        role="status"
        variant="body2"
        color="text.secondary"
        textAlign="center"
      >
        {text}
      </Typography>
      {onRetry && (
        <SecondaryButton size="small" onClick={onRetry} disabled={disabled}>
          {t("RobotControl.JogDisabled.Retry.bt")}
        </SecondaryButton>
      )}
    </Stack>
  )
}
