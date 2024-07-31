import { IconButton, Slider, Typography } from "@mui/material"
import Stack from "@mui/material/Stack"
import { observer, useLocalObservable } from "mobx-react-lite"
import { I18nextProvider, useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { useAnimationFrame } from "../utils/hooks"
import { useState } from "react"
import i18n from '../../i18n/config';

type JoggingJointRotationControlProps = {
  startJogging: (direction: "-" | "+") => void
  stopJogging: () => void
  lowerLimitDegs?: number
  upperLimitDegs?: number
  getValueDegs: () => number|undefined

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
    const { t } = useTranslation()
    const [currentValue, setCurrentValue] = useState<number|undefined>()

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

    useAnimationFrame(() => {
      setCurrentValue(getValueDegs())
    })

    function onPointerDownMinus(ev: React.PointerEvent) {
      // Stop right click from triggering jog
      if (ev.button === 0) state.startJogging("-")
    }

    function onPointerDownPlus(ev: React.PointerEvent) {
      if (ev.button === 0) state.startJogging("+")
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
      >
        <IconButton
          onPointerDown={onPointerDownMinus}
          onPointerUp={state.stopJogging}
          onPointerOut={state.stopJogging}
          disabled={disabled}
          sx={{
            width: "52px",
            color: "white",
            alignContent: "center",
            borderRadius: "16px 0px 0px 16px",
            backgroundColor:
              state.activeJoggingDir === "-" ? "#495975 !important" : "#38445A",
            "& svg": {
              width: "42px",
              height: "42px",
            },
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
            }}
          >
            {formatDegrees(currentValue)}
          </Typography>

          <Slider
            disabled
            aria-label="Joint position"
            min={lowerLimitDegs}
            max={upperLimitDegs}
            value={currentValue}
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
          onPointerUp={state.stopJogging}
          onPointerOut={state.stopJogging}
          disabled={disabled}
          sx={{
            width: "52px",
            color: "white",
            alignContent: "center",
            fontSize: "37px",
            borderRadius: "0px 16px 16px 0px",
            backgroundColor:
              state.activeJoggingDir === "+" ? "#495975 !important" : "#38445A",
            "& svg": {
              width: "42px",
              height: "42px",
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Stack>
      </I18nextProvider>
    )
  },
)
