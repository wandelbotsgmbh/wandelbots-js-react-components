import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { radiansToDegrees } from "@wandelbots/nova-js"
import { IconButton, Slider, Typography, useTheme } from "@mui/material"
import Stack from "@mui/material/Stack"
import throttle from "lodash-es/throttle"
import { observer, useLocalObservable } from "mobx-react-lite"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { externalizeComponent } from "../../externalizeComponent"
import { useAnimationFrame } from "../utils/hooks"

type JoggingJointValueControlProps = {
  startJogging: (direction: "-" | "+") => void
  stopJogging: () => void
  lowerLimit?: number
  upperLimit?: number
  useDegree: boolean
  getValue: () => number | undefined
  disabled?: boolean
} & React.ComponentProps<typeof Stack>

/** A input widget to control an individual joint */
export const JoggingJointValueControl = externalizeComponent(
  observer(
    ({
       startJogging,
       stopJogging,
       lowerLimit,
       upperLimit,
       useDegree,
       getValue,
       disabled,
       ...rest
     }: JoggingJointValueControlProps) => {
      const { t } = useTranslation()
      const [currentValue, setCurrentValue] = useState<number | undefined>()
      const theme = useTheme()

      const pressedButtonStyle = {
        background: theme.palette.backgroundPaperElevation?.[4],
        color: theme.palette.backgroundPaperElevation?.[11],
      }

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
        setCurrentValue(useDegree ? convertToDegree(getValue()) : getValue())
      }, 50)

      useAnimationFrame(updateValue)

      function convertToDegree(value: number| undefined){
        if (value == undefined){
          return undefined;
        }
        return radiansToDegrees(value);
      }

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
      function formatMm(value: number | undefined, precision = 1) {
        if (value === undefined || isNaN(value)) return ""

        const output = t("General.mm.variable", {
          amount: value.toFixed(precision),
        })

        if (value > 0 && precision === 0) {
          return `+${output}`
        } else {
          return output
        }
      }


      return (
        <Stack
          height="64px"
          width="100%"
          maxWidth="260px"
          direction="row"
          {...rest}
          sx={{
            "& .MuiIconButton-root": {
              width: "52px",
              color: theme.palette.text.primary,
              alignContent: "center",
              backgroundColor: theme.palette.backgroundPaperElevation?.[11],
              "& svg": {
                width: "42px",
                height: "42px",
              },

              "&.Mui-disabled": {
                backgroundColor: theme.palette.backgroundPaperElevation?.[11],
                color: theme.palette.action.disabled,
                opacity: 1,
              },
              "&:hover": {
                backgroundColor: theme.palette.backgroundPaperElevation?.[9],
              },
              "&:active": {
                ...pressedButtonStyle,
              },
            },
          }}
        >
          <IconButton
            onPointerDown={onPointerDownMinus}
            onPointerUp={onPointerUp}
            onPointerOut={onPointerOut}
            disabled={disabled}
            disableRipple
            sx={{
              borderRadius: "16px 0px 0px 16px",
              ...(state.activeJoggingDir === "-" ? pressedButtonStyle : {}),
            }}
          >
            <ChevronLeft
              sx={{
                pointerEvents: "none",
                color:
                theme.componentsExt?.JoggingPanel?.JoggingJoint?.Joint
                  ?.arrowColor,
              }}
            />
          </IconButton>

          <Stack
            flexGrow={1}
            alignItems="center"
            justifyContent="center"
            sx={{
              borderStyle: "solid",
              borderLeftWidth: 0,
              borderRightWidth: 0,
              border: "none",
              backgroundColor: theme.palette.backgroundPaperElevation?.[11],
              paddingLeft: "20px",
              paddingRight: "20px",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 700,
                position: "relative",
                top: "5px",

                color: disabled
                  ? theme.palette.action.disabled
                  : theme.palette.text.primary,
              }}
            >
              {useDegree ? formatDegrees(currentValue) : formatMm(currentValue)}
            </Typography>

            <Slider
              disabled
              aria-label="Joint position"
              min={ useDegree ? convertToDegree(lowerLimit) : lowerLimit}
              max={ useDegree ? convertToDegree(upperLimit) : upperLimit}
              value={currentValue || 0}
              track={false}
              sx={{
                "& .MuiSlider-mark": {
                  display: "none",
                },
                "& .MuiSlider-thumb": {
                  width: "5px",
                  height: "12px",
                  borderRadius: "2px",
                  color: disabled
                    ? theme.palette.action.disabled
                    : theme.palette.text.primary,
                },
                "& .MuiSlider-markLabel": {
                  top: "20px",
                  fontSize: "12px",
                  color: disabled
                    ? theme.palette.action.disabled
                    : theme.palette.text.secondary,
                },
                "& .MuiSlider-rail": {
                  backgroundColor: theme.palette.backgroundPaperElevation?.[5],
                  opacity: 1,
                },
              }}
              marks={
                lowerLimit !== undefined &&
                upperLimit !== undefined && [
                  {
                    value: (useDegree ? convertToDegree(lowerLimit) : lowerLimit) as number,
                    label: useDegree ? formatDegrees(convertToDegree(lowerLimit),0) : formatMm(lowerLimit),
                  },
                  {
                    value: (useDegree ? convertToDegree(upperLimit) : upperLimit) as number,
                    label: useDegree ?  formatDegrees(convertToDegree(upperLimit),0) : formatMm(upperLimit),
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
            disableRipple
            sx={{
              borderRadius: "0px 16px 16px 0px",
              ...(state.activeJoggingDir === "+" ? pressedButtonStyle : {}),
            }}
          >
            <ChevronRight
              sx={{
                pointerEvents: "none",
                color:
                theme.componentsExt?.JoggingPanel?.JoggingJoint?.Joint
                  ?.arrowColor,
              }}
            />
          </IconButton>
        </Stack>
      )
    },
  ),
)
