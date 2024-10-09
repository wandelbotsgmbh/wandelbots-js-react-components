import { Stack, Typography, useTheme } from "@mui/material"
import Slider from "@mui/material/Slider"
import isNumber from "lodash-es/isNumber"
import { observer } from "mobx-react-lite"

type VelocitySliderProps = {
  min: number
  max: number
  velocity: number
  onVelocityChange: (newVelocity: number) => void
  disabled?: boolean
  valueLabelFormat?: (value: number) => string
}

/** A slider for controlling the movement velocity of a robot */
export const VelocitySlider = observer((props: VelocitySliderProps) => {
  const theme = useTheme()

  const valueLabelFormat =
    props.valueLabelFormat || ((value: number) => `${value}`)

  function onSliderChange(_event: Event, newVelocity: number | number[]) {
    if (newVelocity === props.velocity || !isNumber(newVelocity)) return

    props.onVelocityChange(newVelocity)
  }

  return (
    <Stack direction="row" gap={2}>
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
      <div
        style={{
          padding: "6px 12px",
          background: theme.palette.backgroundPaperElevation?.[8],
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "14px",
            opacity: 0.8,
            lineHeight: 1,
            color: theme.palette.text.primary,
            whiteSpace: "nowrap",
          }}
        >
          {valueLabelFormat(props.velocity)}
        </Typography>
      </div>
    </Stack>
  )
})
