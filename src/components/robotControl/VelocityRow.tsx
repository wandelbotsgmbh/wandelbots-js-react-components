import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useId } from "react"
import { useTranslation } from "react-i18next"
import type { JogMotion, RobotControlVelocity } from "./RobotControlPanel"
import { formatVelocity, novaValue, shownValue } from "./units"

type VelocityRowProps = {
  motion: JogMotion
  velocity: RobotControlVelocity
  /** The new velocity, in NOVA's units */
  onChange: (value: number) => void
  disabled: boolean
}

/**
 * The jog velocity: its label and value above a slider. The slider moves in
 * whole shown units (mm/s, °/s); the app gets NOVA's units (mm/s, rad/s).
 */
export function VelocityRow({
  motion,
  velocity,
  onChange,
  disabled,
}: VelocityRowProps) {
  const { t } = useTranslation()
  const labelId = useId()
  const shown = (value: number) => shownValue(motion, value)

  return (
    <Stack gap="4px">
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <Typography id={labelId} variant="body2" color="text.secondary">
          {t("RobotControl.Velocity.lb")}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatVelocity(motion, velocity.value)}
        </Typography>
      </Stack>
      <Slider
        aria-labelledby={labelId}
        size="small"
        value={Math.round(shown(velocity.value))}
        min={Math.ceil(shown(velocity.min))}
        max={Math.floor(shown(velocity.max))}
        disabled={disabled}
        onChange={(_event, next) => {
          if (typeof next === "number") onChange(novaValue(motion, next))
        }}
        sx={(theme) => ({
          "& .MuiSlider-rail": { opacity: 0.38 },
          // A hollow thumb, as in the design
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.backgroundPaperElevation?.[5],
          },
        })}
      />
    </Stack>
  )
}
