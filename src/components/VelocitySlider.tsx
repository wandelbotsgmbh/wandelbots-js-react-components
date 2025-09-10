import { Stack, Typography, useTheme, type SxProps } from "@mui/material"
import Slider from "@mui/material/Slider"
import isNumber from "lodash-es/isNumber"
import { observer } from "mobx-react-lite"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import type { JoggingStore } from "./jogging/JoggingStore"

type VelocitySliderProps = {
  min: number
  max: number
  velocity: number
  onVelocityChange: (newVelocity: number) => void
  disabled?: boolean
  renderValue?: (value: number) => ReactNode
  store: JoggingStore
}

/** A slider for controlling the movement velocity of a robot */
export const VelocitySlider = observer((props: VelocitySliderProps) => {
  const theme = useTheme()
  const { store } = props
  const { t } = useTranslation()

  function onSliderChange(_event: Event, newVelocity: number | number[]) {
    if (newVelocity === props.velocity || !isNumber(newVelocity)) return

    props.onVelocityChange(newVelocity)
  }

  return (
    <Stack direction="row" gap={2} alignItems="center">
      {store.showVelocityLegend && (
        <Typography
          sx={{
            color:
              theme.componentsExt?.JoggingPanel?.VelocitySlider
                ?.sliderLegendColor,
            fontSize: "14px",
          }}
        >
          {t("Jogging.Velocity.bt")}
        </Typography>
      )}
      <Slider
        value={props.velocity}
        color="secondary"
        onChange={onSliderChange}
        min={props.min}
        max={props.max}
        aria-labelledby="input-slider"
        disabled={props.disabled}
        sx={{
          "& .MuiSlider-valueLabelOpen": {
            zIndex: 100,
            backgroundColor: "transparent",
            top: "0px",
          },
        }}
      />
      {store.showVelocitySliderLabel &&
        (props.renderValue ? (
          props.renderValue(props.velocity)
        ) : (
          <VelocitySliderLabel value={props.velocity.toString()} />
        ))}
    </Stack>
  )
})

type VelocitySliderLabelProps = {
  value: string
  sx?: SxProps
}

export function VelocitySliderLabel({ value, sx }: VelocitySliderLabelProps) {
  const theme = useTheme()
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"5px"}
      sx={{
        padding: "6px 12px",
        background: theme.palette.backgroundPaperElevation?.[8],
        borderRadius: "10px",
        minWidth: "111px",
        ...sx,
      }}
    >
      <Typography
        component="span"
        sx={{
          textAlign: "right",
          fontSize: "14px",
          opacity: 0.8,
          color: theme.palette.text.primary,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Typography>
    </Stack>
  )
}
