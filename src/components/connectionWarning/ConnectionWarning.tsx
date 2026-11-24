import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { WifiOff } from "@wandelbots/icons/WifiOff"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import { timeAgo } from "./timeAgo"

// Ported from RobotPad (src/safetyBar/ConnectionWarningIndicator.tsx)

/** How well a robot's live state arrives */
export type ConnectionQuality = "good" | "struggling" | "critical"

export type ConnectionWarningProps = {
  /** How well the robot's live state arrives; "critical" shows the warning */
  quality: ConnectionQuality
  /** When the last usable message of the live state arrived, in ms */
  lastMessageAt: number
  /** The last message that could not be used, shown if it came later */
  lastInvalidMessage?: { receivedAt: number; data: unknown } | null
}

/** The current time, again every second while `active` */
function useNow(active: boolean) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    if (!active) return
    setNow(Date.now())
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [active])
  return now
}

/**
 * A warning in a robot app's header that the robot's live state stopped
 * arriving: an icon, and in its tooltip when the last update came and the
 * last message that could not be used. Shows nothing while the live state
 * arrives. For a robot session, in an `observer`: `<ConnectionWarning
 * {...connectionWarningOf(session)} />`.
 */
export const ConnectionWarning = externalizeComponent(
  function ConnectionWarning({
    quality,
    lastMessageAt,
    lastInvalidMessage,
  }: ConnectionWarningProps) {
    const { t, i18n } = useTranslation()
    const critical = quality === "critical"
    const now = useNow(critical)

    // A late message is no warning yet
    if (!critical) return null

    const ago = (time: number) => timeAgo(time, now, i18n.language)
    const invalid =
      lastInvalidMessage && lastInvalidMessage.receivedAt > lastMessageAt
        ? lastInvalidMessage
        : null

    return (
      <Tooltip
        placement="bottom-end"
        slotProps={{
          popper: {
            sx: {
              [`& .${tooltipClasses.tooltip}`]: {
                maxWidth: "340px",
                padding: 0,
                maxHeight: "80vh",
                overflowY: "auto",
                borderRadius: "10px",
                border: 1,
                borderColor: "divider",
              },
            },
          },
        }}
        title={
          <Paper elevation={8} sx={{ padding: "14px" }}>
            <Typography fontSize="14px">
              {t("ConnectionWarning.LastUpdate.lb", {
                time: ago(lastMessageAt),
              })}
            </Typography>
            {invalid && (
              <Typography fontSize="14px" marginTop="1rem">
                {t("ConnectionWarning.ErrorState.lb", {
                  time: ago(invalid.receivedAt),
                })}
                {/* The message as it came */}
                <pre
                  style={{
                    fontSize: "12px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    margin: "4px 0 0",
                  }}
                >
                  {String(invalid.data)}
                </pre>
              </Typography>
            )}
          </Paper>
        }
      >
        {/* A span holds the tooltip's ref and the label; the icon draws in
            its color */}
        <Box
          component="span"
          role="img"
          aria-label={t("ConnectionWarning.Interrupted.ti")}
          sx={{
            display: "inline-flex",
            cursor: "pointer",
            color: "error.main",
          }}
        >
          <WifiOff size={20} />
        </Box>
      </Tooltip>
    )
  },
)
