import { Stack, Typography, useTheme } from "@mui/material"
import { forwardRef } from "react"

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
    return (
      <Stack
        justifyContent="center"
        sx={{
          height: "100%",
          boxSizing: "border-box",
          padding: "6px 12px",
          background: theme.palette.backgroundPaperElevation?.[8],
          borderRadius: "10px",
          minWidth: "0",
        }}
      >
        <Typography
          ref={ref}
          align="center"
          sx={{
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
    )
  },
)
