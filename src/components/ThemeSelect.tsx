// TODO implement this as part of theme?

import { Select, useTheme, type SxProps } from "@mui/material"
import { defaultsDeep } from "lodash-es"

type ThemeSelectProps = {
  kind: "filled" | "outlined" | "text"
} & React.ComponentProps<typeof Select>

export const ThemeSelect = ({ kind, sx, ...rest }: ThemeSelectProps) => {
  const theme = useTheme()

  let style: SxProps = defaultsDeep(sx, {
    backgroundColor: theme.palette.background.default,
    borderRadius: "10px",
    borderStyle: "none",
    color: "currentColor",
    "& > div": {
      padding: "4px 16px",
    },
    "& fieldset": {
      border: "none",
    },
  })

  if (kind === "outlined") {
    style = defaultsDeep(
      {
        backgroundColor: "transparent",
      },
      style,
    )
  } else if (kind === "text") {
    style = defaultsDeep(
      {
        backgroundColor: "transparent",

        "& .MuiSvgIcon-root": {
          borderStyle: "none",
          color: "inherit",
        },
      },
      style,
    )
  }

  return <Select sx={style} {...rest} />
}
