import { Button, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { observer } from "mobx-react-lite"
import { useRef, type ReactNode } from "react"
import { useAnimationFrame } from "../utils/hooks"

type JoggingCartesianAxisControlProps = {
  color?: string
  label: ReactNode
  getDisplayedValue: () => string
  startJogging: (direction: "-" | "+") => void
  stopJogging: () => void
  disabled?: boolean
} & React.ComponentProps<typeof Stack>

export const JoggingCartesianAxisControl = observer(
  ({
    color,
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

    color = color || "#F14D42"

    function onPointerDownMinus(ev: React.PointerEvent) {
      // Stop right click from triggering jog
      if (ev.button === 0) startJogging("-")
    }

    function onPointerDownPlus(ev: React.PointerEvent) {
      if (ev.button === 0) startJogging("+")
    }

    return (
      <Stack height="72px" direction="row" {...rest}>
        <Button
          onPointerDown={onPointerDownMinus}
          onPointerUp={stopJogging}
          onPointerOut={stopJogging}
          disabled={disabled}
          sx={{
            width: "105px",
            backgroundColor: color,
            color: "white",
            alignContent: "center",
            fontSize: "37px",
            borderRadius: "16px 0px 0px 16px",

            ":hover": {
              color: "white",
              backgroundColor: color,
            },
          }}
        >
          {"-"}
        </Button>

        <Stack
          spacing="6px"
          sx={{
            width: "184px",
            backgroundColor: color,
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
              color: "white",
            }}
            ref={valueContainerRef}
          >
            {getDisplayedValue()}
          </Typography>
        </Stack>

        <Button
          onPointerDown={onPointerDownPlus}
          onPointerUp={stopJogging}
          onPointerOut={stopJogging}
          disabled={disabled}
          sx={{
            width: "105px",
            backgroundColor: color,
            color: "white",
            alignContent: "center",
            fontSize: "37px",
            borderRadius: "0px 16px 16px 0px",

            ":hover": {
              color: "white",
              backgroundColor: color,
            },
          }}
        >
          {"+"}
        </Button>
      </Stack>
    )
  },
)
