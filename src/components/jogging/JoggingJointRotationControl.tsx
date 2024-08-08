import { IconButton, Slider, Typography, useTheme } from "@mui/material"
import Stack from "@mui/material/Stack"
import { observer, useLocalObservable } from "mobx-react-lite"
import { I18nextProvider, useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { useAnimationFrame } from "../utils/hooks"
import { useState } from "react"
import i18n from "../../i18n/config"
import { throttle } from "lodash-es"

type JoggingJointRotationControlProps = {
  startJogging: (direction: "-" | "+") => void
  stopJogging: () => void
  lowerLimitDegs?: number
  upperLimitDegs?: number
  getValueDegs: () => number | undefined

  disabled?: boolean
} & React.ComponentProps<typeof Stack>

export const JoggingJointRotationControl = observer(
  ({
    startJogging,
    stopJogging,
    lowerLimitDegs,
    upperLimitDegs,
    getValueDegs,
    disabled,
    ...rest
  }: JoggingJointRotationControlProps) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [currentValue, setCurrentValue] = useState<number | undefined>()

    const state = useLocalObservable(() => ({
      activeJoggingDir: null as "-" | "+" | null,

      startJogging(dir: "-" | "+") {
        this.activeJoggingDir = dir
        startJogging(dir)
      },

      stopJogging() {
        this.activeJoggingDir = null
        stopJogging()
      },
    }))

    const updateValue = throttle(() => {
      setCurrentValue(getValueDegs())
    }, 50)

    useAnimationFrame(updateValue)

    function onPointerDownMinus(ev: React.PointerEvent) {
      // Stop right click from triggering jog
      if (ev.button === 0) state.startJogging("-")
    }

    function onPointerDownPlus(ev: React.PointerEvent) {
      if (ev.button === 0) state.startJogging("+")
    }

    function onPointerUp(ev: React.PointerEvent) {
      state.stopJogging()
    }

    function onPointerOut(ev: React.PointerEvent) {
      // Prevent subelements of button from stopping jogging
      if (ev.target !== ev.currentTarget) return

      state.stopJogging()
    }

    function formatDegrees(value: number | undefined, precision = 1) {
      if (value === undefined || isNaN(value)) return ""

      const output = t("General.degree.variable", {
        amount: value.toFixed(precision),
      })

      if (value > 0 && precision === 0) {
        return `+${output}`
      } else {
        return output
      }
    }

    return (
      <I18nextProvider i18n={i18n}>
        <Stack
          height="64px"
          width="100%"
          maxWidth="300px"
          direction="row"
          {...rest}
          sx={{
            "& .MuiIconButton-root": {
              width: "52px",
              color: "white",
              alignContent: "center",
              backgroundColor: "#38445A",
              "&:disabled": {
                opacity: 0.5,
                backgroundColor: "#38445A",
              },
              "& svg": {
                width: "42px",
                height: "42px",
              },
            },
          }}
        >
          <IconButton
            onPointerDown={onPointerDownMinus}
            onPointerUp={onPointerUp}
            onPointerOut={onPointerOut}
            disabled={disabled}
            sx={{
              borderRadius: "16px 0px 0px 16px",
              backgroundColor:
                state.activeJoggingDir === "-" ? "#495975" : undefined,
            }}
          >
            <ChevronLeft />
          </IconButton>

          <Stack
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              borderStyle: "solid",
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: "4px",
              borderBottomWidth: "4px",
              backgroundColor: "#38445A",
              borderColor: "#38445A",
              paddingLeft: "20px",
              paddingRight: "20px",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                position: "relative",
                top: "5px",
                color: "white",
              }}
            >
              {formatDegrees(currentValue)}
            </Typography>

            <Slider
              disabled
              aria-label="Joint position"
              min={lowerLimitDegs}
              max={upperLimitDegs}
              value={currentValue || 0}
              track={false}
              sx={{
                "& .MuiSlider-mark": {
                  display: "none",
                },
                "& .MuiSlider-thumb": {
                  width: "5px",
                  height: "10px",
                  borderRadius: "2px",
                },
                "& .MuiSlider-markLabel": {
                  top: "20px",
                  fontSize: "12px",
                  color: "white",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#1F283A",
                  opacity: 1,
                },
              }}
              marks={
                lowerLimitDegs !== undefined &&
                upperLimitDegs !== undefined && [
                  {
                    value: lowerLimitDegs,
                    label: formatDegrees(lowerLimitDegs, 0),
                  },
                  {
                    value: upperLimitDegs,
                    label: formatDegrees(upperLimitDegs, 0),
                  },
                ]
              }
            />
          </Stack>

          <IconButton
            onPointerDown={onPointerDownPlus}
            onPointerUp={onPointerUp}
            onPointerOut={onPointerOut}
            disabled={disabled}
            sx={{
              borderRadius: "0px 16px 16px 0px",
              backgroundColor:
                state.activeJoggingDir === "+"
                  ? "#495975 !important"
                  : "#38445A",
            }}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      </I18nextProvider>
    )
  },
)
