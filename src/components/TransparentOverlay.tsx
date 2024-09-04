import { Stack } from "@mui/material"
import React from "react"

export const TransparentOverlay = (
  props: React.ComponentProps<typeof Stack>,
) => {
  return (
    <Stack
      position="absolute"
      left={0}
      top={0}
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        zIndex: 100,
      }}
      {...props}
    />
  )
}
