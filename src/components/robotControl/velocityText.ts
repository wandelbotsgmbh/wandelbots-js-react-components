// Ported from RobotPad (src/jogging/velocityInput.ts)

/**
 * What a velocity typed into the velocity field is. A text that is no
 * velocity is reported, never corrected: a value outside the range is not
 * clamped into it, so the user sees that it was refused and does not take
 * it as applied.
 */
export type VelocityText =
  | { kind: "valid"; value: number }
  | { kind: "empty" }
  | { kind: "notANumber" }
  | { kind: "outOfRange" }

/** A plain decimal number, with a point or a comma, without an exponent */
const DECIMAL_NUMBER = /^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/

/** The velocity in `text`, within `min` to `max` (both included) */
export function parseVelocityText(
  text: string,
  min: number,
  max: number,
): VelocityText {
  const trimmed = text.trim()
  if (trimmed === "") return { kind: "empty" }
  if (!DECIMAL_NUMBER.test(trimmed)) return { kind: "notANumber" }

  const value = Number(trimmed.replace(",", "."))
  if (!Number.isFinite(value)) return { kind: "notANumber" }
  if (value < min || value > max) return { kind: "outOfRange" }
  return { kind: "valid", value }
}
