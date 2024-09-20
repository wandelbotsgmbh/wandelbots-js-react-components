import { Stack } from "@mui/material"
import { omit } from "lodash-es"
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
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(2px)",
        zIndex: 100,
        ...(props.sx || {}),
      }}
      {...omit(props, "sx")}
    />
  )
}
