import { Stack, Tooltip, Typography, useTheme } from "@mui/material"
import { forwardRef, useEffect, useState } from "react"

export const CopyableText = forwardRef(
  (
    {
      label,
      value,
    }: {
      label?: string
      value: string
    },
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const theme = useTheme()
    const [tooltipOpen, setTooltipOpen] = useState(false)

    async function onCopyText(): Promise<boolean> {
      if (!ref || !("current" in ref)) {
        console.warn("No copy target found")
        return false
      }
      try {
        await navigator.clipboard.writeText(value)
        console.log("Copied!")
        setTooltipOpen(true)
        return true
      } catch (err) {
        // Direct clipboard copy is not available in non-secure contexts
        console.error(err)

        // Let's fall back to selecting the text so the user can manually copy easily
        const selection = window.getSelection()!
        const range = document.createRange()
        range.selectNodeContents(ref.current as any)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      return false
    }

    useEffect(() => {
      if (!tooltipOpen) {
        return
      }
      const timeoutId = setTimeout(() => setTooltipOpen(false), 3000)
      return () => {
        timeoutId ? clearTimeout(timeoutId) : {}
      }
    }, [tooltipOpen])

    return (
      <Tooltip open={tooltipOpen} title="Copied!">
        <Stack
          justifyContent="center"
          sx={{
            height: "100%",
            boxSizing: "border-box",
            padding: "6px 12px",
            background: theme.palette.backgroundPaperElevation?.[8],
            borderRadius: "10px",
            minWidth: "0",
            cursor: "pointer",
          }}
          onClick={() => onCopyText()}
        >
          <Typography
            ref={ref}
            align="center"
            sx={{
              pointerEvents: "none",
              fontSize: "12px",
              color: theme.palette.text.primary,
              whiteSpace: "nowrap",
              minWidth: 0,
              textOverflow: "ellipsis",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {value}
          </Typography>
        </Stack>
      </Tooltip>
    )
  },
)
