import Slider from "@mui/material/Slider"
import { isNumber } from "lodash-es"
import { observer } from "mobx-react-lite"
import { Stack, Typography } from "@mui/material"

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
  const valueLabelFormat =
    props.valueLabelFormat || ((value: number) => `${value}`)

  function onSliderChange(_event: Event, newVelocity: number | number[]) {
    if (newVelocity === props.velocity || !isNumber(newVelocity)) return

    props.onVelocityChange(newVelocity)
  }

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "15px",
          opacity: 0.8,
        }}
      >
        {valueLabelFormat(props.velocity)}
      </Typography>
      <Slider
        value={props.velocity}
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
    </>
  )
})
