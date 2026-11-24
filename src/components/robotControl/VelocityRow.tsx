import Box from "@mui/material/Box"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { AdornedTextField } from "@wandelbots/mui"
import { useId, useState } from "react"
import { useTranslation } from "react-i18next"
import type { JogMotion, RobotControlVelocity } from "./RobotControlPanel"
import { formatVelocity, novaValue, shownVelocity, velocityUnit } from "./units"
import { parseVelocityText } from "./velocityText"

type VelocityRowProps = {
  motion: JogMotion
  velocity: RobotControlVelocity
  /** The new velocity, in NOVA's units */
  onChange: (value: number) => void
  disabled: boolean
}

/**
 * The jog velocity: its label and a field to type it into, above a slider.
 * Both show mm/s or °/s, the slider in whole units; the app gets NOVA's
 * units (mm/s, rad/s).
 *
 * The field works as RobotPad's: Enter, or leaving the field, applies what
 * was typed. A text that is no velocity of the range is flagged and never
 * corrected: it stays in the field, with what is wrong with it, until it is
 * fixed, Escape brings the applied velocity back, or the slider is moved.
 */
export function VelocityRow({
  motion,
  velocity,
  onChange,
  disabled,
}: VelocityRowProps) {
  const { t } = useTranslation()
  const labelId = useId()
  const errorId = useId()
  // What is typed and not applied yet. It belongs to the motion it was
  // typed for: the row of Translate is the row of Rotate too, and 200 mm/s
  // is no rotation.
  const [draft, setDraft] = useState<{
    motion: JogMotion
    text: string
  } | null>(null)
  const draftText = draft?.motion === motion ? draft.text : null

  const value = shownVelocity(motion, velocity.value)
  const min = shownVelocity(motion, velocity.min)
  const max = shownVelocity(motion, velocity.max)
  const typed =
    draftText === null ? null : parseVelocityText(draftText, min, max)
  const error =
    typed === null || typed.kind === "valid"
      ? null
      : typed.kind === "outOfRange"
        ? t("RobotControl.Velocity.OutOfRange.lb", {
            min: formatVelocity(motion, min),
            max: formatVelocity(motion, max),
            // React escapes the text; i18next's escaping on top of it would
            // show the "/" of "mm/s" as "&#x2F;"
            interpolation: { escapeValue: false },
          })
        : t("RobotControl.Velocity.NotANumber.lb")

  /**
   * Reports a shown velocity in NOVA's units. Never one beyond the app's
   * limits: a limit in °/s can be a hair beyond itself in rad/s.
   */
  function apply(shown: number) {
    onChange(
      Math.min(velocity.max, Math.max(velocity.min, novaValue(motion, shown))),
    )
    setDraft(null)
  }

  function applyTyped() {
    if (typed?.kind === "valid") apply(typed.value)
  }

  return (
    <Stack gap="4px">
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}
      >
        <Typography id={labelId} variant="body2" color="text.secondary">
          {t("RobotControl.Velocity.lb")}
        </Typography>
        {/* The right column of the panel's selects, as the step size below */}
        <Box sx={{ width: "calc((100% - 12px) / 2)", flexShrink: 0 }}>
          <AdornedTextField
            adornedSize="small"
            fullWidth
            value={draftText ?? String(value)}
            error={error !== null}
            disabled={disabled}
            autoComplete="off"
            onChange={(event) => setDraft({ motion, text: event.target.value })}
            // All of it selected: typing replaces the velocity
            onFocus={(event) => event.target.select()}
            onBlur={applyTyped}
            onKeyDown={(event) => {
              if (event.key === "Enter") applyTyped()
              else if (event.key === "Escape") setDraft(null)
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    {velocityUnit(motion)}
                  </InputAdornment>
                ),
              },
              htmlInput: {
                inputMode: "decimal",
                "aria-labelledby": labelId,
                "aria-describedby": error === null ? undefined : errorId,
              },
            }}
            sx={{
              "& input": {
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              },
            }}
          />
        </Box>
      </Stack>
      {error !== null && (
        // Not the field's own helper text: that is as narrow as the field
        <FormHelperText
          error
          id={errorId}
          sx={{ margin: 0, textAlign: "right" }}
        >
          {error}
        </FormHelperText>
      )}
      <Slider
        aria-labelledby={labelId}
        size="small"
        value={Math.round(value)}
        min={Math.ceil(min)}
        max={Math.floor(max)}
        disabled={disabled}
        onChange={(_event, next) => {
          if (typeof next === "number") apply(next)
        }}
        sx={(theme) => ({
          // The rail and the hollow thumb of the joint sliders, as in the
          // design: a 4 px rail (the small slider's is 2 px)
          height: 4,
          "& .MuiSlider-rail": { opacity: 0.38 },
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            border: `3px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.backgroundPaperElevation?.[5],
          },
        })}
      />
    </Stack>
  )
}
