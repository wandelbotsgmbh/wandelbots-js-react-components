import { Add, Remove } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { observer } from "mobx-react-lite"
import { useRef, type ReactNode } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import type { AxisControlComponentColors } from "../../themes/themeTypes"
import { useAnimationFrame } from "../utils/hooks"

type JoggingCartesianAxisControlProps = {
  colors?: AxisControlComponentColors
  label: ReactNode
  getDisplayedValue: () => string
  startJogging: (direction: "-" | "+") => void
  stopJogging: () => void
  disabled?: boolean
} & React.ComponentProps<typeof Stack>

/** A input widget to control an individual cartesian axis */
export const JoggingCartesianAxisControl = externalizeComponent(
  observer(
    ({
      colors,
      label,
      getDisplayedValue,
      startJogging,
      stopJogging,
      disabled,
      ...rest
    }: JoggingCartesianAxisControlProps) => {
      useAnimationFrame(() => {
        const displayValue = getDisplayedValue()
        const element = valueContainerRef.current
        if (!element) return

        element.textContent = displayValue
      })

      const valueContainerRef = useRef<HTMLParagraphElement>(null)

      function onPointerDownMinus(ev: React.PointerEvent) {
        if (disabled) return

        // Stop right click from triggering jog
        if (ev.button === 0) startJogging("-")
      }

      function onPointerDownPlus(ev: React.PointerEvent) {
        if (disabled) return

        if (ev.button === 0) startJogging("+")
      }

      if (!colors) {
        colors = {
          color: "#fff",
          backgroundColor: "#000",
          borderColor: "#000",
          buttonBackgroundColor: "#000",
        }
      }

      return (
        <Stack height="72px" direction="row" justifyContent="center" {...rest}>
          <IconButton
            onPointerDown={onPointerDownMinus}
            onPointerUp={stopJogging}
            onPointerOut={stopJogging}
            size="large"
            sx={{
              width: "55px",
              backgroundColor: colors.buttonBackgroundColor,
              color: colors.color,
              alignContent: "center",
              fontSize: "37px",
              borderRadius: "16px 0px 0px 16px",
              borderLeft: `2px solid ${colors.borderColor ?? "#fff"}`,
              borderBottom: `2px solid ${colors.borderColor ?? "#fff"}`,
              borderTop: `2px solid ${colors.borderColor ?? "#fff"}`,
              ":hover": {
                backgroundColor: colors.buttonBackgroundColor,
              },
            }}
          >
            <Remove />
          </IconButton>

          <Stack
            spacing="6px"
            sx={{
              width: "150px",
              backgroundColor: colors.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
              opacity: "0.9",
            }}
          >
            <Stack
              height="22px"
              direction="row"
              alignItems="center"
              justifyItems="center"
              spacing={1}
              sx={{ userSelect: "none", color: "white" }}
            >
              {label}
            </Stack>
            <Typography
              height="22px"
              sx={{
                fontSize: "15px",
                color: colors.color,
              }}
              ref={valueContainerRef}
            >
              {getDisplayedValue()}
            </Typography>
          </Stack>

          <IconButton
            onPointerDown={onPointerDownPlus}
            onPointerUp={stopJogging}
            onPointerOut={stopJogging}
            size="large"
            sx={{
              width: "55px",
              backgroundColor: colors.buttonBackgroundColor,
              color: colors.color,
              alignContent: "center",
              fontSize: "37px",
              borderRadius: "0px 16px 16px 0px",
              borderRight: `2px solid ${colors.borderColor ?? "#fff"}`,
              borderBottom: `2px solid ${colors.borderColor ?? "#fff"}`,
              borderTop: `2px solid ${colors.borderColor ?? "#fff"}`,
              ":hover": {
                backgroundColor: colors.buttonBackgroundColor,
              },
            }}
          >
            <Add />
          </IconButton>
        </Stack>
      )
    },
  ),
)
