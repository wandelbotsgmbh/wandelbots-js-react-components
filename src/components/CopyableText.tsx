import { Chip, InputLabel, useTheme } from "@mui/material"
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
    ref: React.ForwardedRef<HTMLPreElement>,
  ) => {
    return (
      <>
        {label && <InputLabel>{label}</InputLabel>}
        <Chip
          ref={ref}
          sx={{
            fontSize: "14px",
            opacity: 0.8,
          }}
          value={value}
        />
      </>
    )
  },
)
