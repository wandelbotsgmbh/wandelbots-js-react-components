// TODO implement this as part of theme?

import { useThemeColors } from "../themes/wbTheme"
import { Select, type SxProps } from "@mui/material"
import { defaultsDeep } from "lodash-es"

type ThemeSelectProps = {
  kind: "filled" | "outlined" | "text"
} & React.ComponentProps<typeof Select>

export const ThemeSelect = ({ kind, sx, ...rest }: ThemeSelectProps) => {
  const colors = useThemeColors()

  let style: SxProps = defaultsDeep(sx, {
    backgroundColor: colors.selectBackground,
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
