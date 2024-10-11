import { IconButton, Typography, useTheme } from "@mui/material"
import Stack from "@mui/material/Stack"
import { observer } from "mobx-react-lite"
import React, { useRef, useState, type ReactNode } from "react"
import { externalizeComponent } from "../../externalizeComponent"
import JogMinus from "../../icons/jog-minus.svg"
import JogPlus from "../../icons/jog-plus.svg"
import type { AxisControlComponentColors } from "../../themes/themeTypes"
import { useAnimationFrame } from "../utils/hooks"

type Direction = "+" | "-"

type JoggingCartesianAxisControlProps = {
  colors?: AxisControlComponentColors
  label: ReactNode
  getDisplayedValue: () => string
  startJogging: (direction: Direction) => void
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
      const theme = useTheme()
      const [borderColor, setBorderColor] = useState(colors?.borderColor)

      const valueContainerRef = useRef<HTMLParagraphElement>(null)

      if (!colors) {
        colors = {
          color: "#fff",
          backgroundColor: "#000",
          borderColor: "#000",
          buttonBackgroundColor: {
            disabled: "#000",
            default: "#000",
            hovered: "#000",
            pressed: "#000",
          },
        }
      }

      const SxAxisControlButton = {
        width: "55px",
        backgroundColor: colors.buttonBackgroundColor?.default,
        color: colors.color,
        alignContent: "center",
        fontSize: "37px",
        "&:hover": {
          backgroundColor: colors.buttonBackgroundColor?.hovered,
        },
        "&:active": {
          backgroundColor: colors.buttonBackgroundColor?.pressed,
        },
        ":disabled": {
          backgroundColor: colors.buttonBackgroundColor?.disabled,
          "svg path": { fill: theme.palette.action.disabled },
        },
      }

      function onPointerDown(ev: React.PointerEvent, direction: Direction) {
        if (disabled) {
          return
        }
        setBorderColor(colors?.buttonBackgroundColor?.pressed)
        if (ev.button === 0) {
          startJogging(direction)
        }
      }

      function onPointerUpOrOut() {
        setBorderColor(colors?.borderColor)
        stopJogging()
      }

      return (
        <Stack height="64px" direction="row" justifyContent="center" {...rest}>
          <IconButton
            disabled={disabled}
            disableRipple
            onPointerDown={(ev: React.PointerEvent) => onPointerDown(ev, "-")}
            onPointerUp={onPointerUpOrOut}
            onPointerOut={onPointerUpOrOut}
            size="large"
            sx={{
              ...SxAxisControlButton,
              borderRadius: "16px 0px 0px 16px",
              borderLeft: `2px solid ${borderColor ?? "#fff"}`,
              borderBottom: `2px solid ${borderColor ?? "#fff"}`,
              borderTop: `2px solid ${borderColor ?? "#fff"}`,
            }}
          >
            <JogMinus />
          </IconButton>

          <Stack
            spacing="6px"
            sx={{
              width: "150px",
              backgroundColor: colors.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
              opacity: "0.9",
              borderBottom: `2px solid ${borderColor ?? "#fff"}`,
              borderTop: `2px solid ${borderColor ?? "#fff"}`,
            }}
          >
            <Stack
              height="22px"
              direction="row"
              alignItems="center"
              justifyItems="center"
              spacing={1}
              sx={{
                userSelect: "none",
                color: colors.color,
                ".MuiTypography-root": {
                  fontWeight: 700,
                  ...(disabled ? { color: theme.palette.action.disabled } : {}),
                },
                ...(disabled
                  ? { "svg path": { fill: theme.palette.action.disabled } }
                  : {}),
              }}
            >
              {label}
            </Stack>
            <Typography
              height="22px"
              sx={{
                fontSize: "15px",
                color: disabled ? theme.palette.action.disabled : colors.color,
                fontWeight: 700,
              }}
              ref={valueContainerRef}
            >
              {getDisplayedValue()}
            </Typography>
          </Stack>

          <IconButton
            disableRipple
            disabled={disabled}
            onPointerDown={(ev: React.PointerEvent) => onPointerDown(ev, "+")}
            onPointerUp={onPointerUpOrOut}
            onPointerOut={onPointerUpOrOut}
            size="large"
            sx={{
              ...SxAxisControlButton,
              borderRadius: "0px 16px 16px 0px",
              borderRight: `2px solid ${borderColor ?? "#fff"}`,
              borderBottom: `2px solid ${borderColor ?? "#fff"}`,
              borderTop: `2px solid ${borderColor ?? "#fff"}`,
            }}
          >
            <JogPlus />
          </IconButton>
        </Stack>
      )
    },
  ),
)
