import Typography from "@mui/material/Typography"

/**
 * Why jogging is off, where a jog tab else says how to jog. A status, so a
 * screen reader says it when it changes, e.g. at an emergency stop.
 */
export function JogDisabledReason({ text }: { text: string }) {
  return (
    <Typography
      data-testid="jog-disabled-reason"
      role="status"
      variant="body2"
      color="text.secondary"
      textAlign="center"
    >
      {text}
    </Typography>
  )
}
