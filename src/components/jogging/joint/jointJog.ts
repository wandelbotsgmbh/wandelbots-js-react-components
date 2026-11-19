import type { JogDirection } from "../jogHandle"

/** A joint's limits as a slider takes them, in NOVA's units */
export type JointLimits = {
  /** The lower limit, the left end of the track */
  min?: number
  /** The upper limit, the right end of the track */
  max?: number
  /** A linear axis, in mm; otherwise a revolute joint, in radians */
  linear?: boolean
}

/** The stretch of joint values a slider's track spans */
export type JointRange = { min: number; max: number }

/** How a joint's values are shown */
export type JointUnit = "deg" | "rad" | "mm"

/**
 * The range a joint's track spans: its limits; a full turn for a revolute
 * joint without them; none for a linear axis without them, which has nothing
 * to be placed in
 */
export function jointSliderRange({
  min,
  max,
  linear,
}: JointLimits): JointRange | null {
  if (min !== undefined && max !== undefined && max > min) return { min, max }
  return linear ? null : { min: -Math.PI, max: Math.PI }
}

/** Where `value` sits along a track spanning `range`, from 0 to 1 */
export function fractionOf(value: number, range: JointRange): number {
  return Math.min(1, Math.max(0, (value - range.min) / (range.max - range.min)))
}

/**
 * The joint value at `fraction` of the way along a track spanning `range`.
 * Past an end it is the limit, so a goal is never out of reach.
 */
export function valueAt(fraction: number, range: JointRange): number {
  const clamped = Math.min(1, Math.max(0, fraction))
  return range.min + clamped * (range.max - range.min)
}

/** Where the joint's zero sits along its track, or null when it lies outside */
export function zeroFraction(range: JointRange): number | null {
  if (range.min > 0 || range.max < 0) return null
  return fractionOf(0, range)
}

/**
 * Which way to jog from `current` to reach `goal`, or null when the joint is
 * within `deadband` of it already
 */
export function directionToward(
  current: number,
  goal: number,
  deadband: number,
): JogDirection | null {
  if (Math.abs(goal - current) <= deadband) return null
  return goal > current ? "+" : "-"
}

/**
 * Whether a joint jogging in `direction` has got to `goal`: at it, or past it,
 * as a jog overshoots a little before its stop lands
 */
export function hasReachedGoal(
  current: number,
  goal: number,
  direction: JogDirection,
): boolean {
  return direction === "+" ? current >= goal : current <= goal
}

/** How a joint is shown: a linear axis in mm, a revolute joint in `angleUnit` */
export function jointUnit(
  linear: boolean,
  angleUnit: "deg" | "rad",
): JointUnit {
  return linear ? "mm" : angleUnit
}

const DISPLAY: Record<
  JointUnit,
  { shown: (value: number) => number; decimals: number; suffix: string }
> = {
  deg: { shown: (rad) => (rad * 180) / Math.PI, decimals: 1, suffix: "°" },
  rad: { shown: (rad) => rad, decimals: 3, suffix: " rad" },
  mm: { shown: (mm) => mm, decimals: 1, suffix: " mm" },
}

/** A number with `decimals`, never "-0.0" */
function fixed(value: number, decimals: number) {
  const text = value.toFixed(decimals)
  return Number(text) === 0 ? (0).toFixed(decimals) : text
}

/** A joint value in the unit it is shown in, e.g. degrees */
export function shownJointValue(value: number, unit: JointUnit): number {
  return DISPLAY[unit].shown(value)
}

/** A joint value as shown, e.g. "35.2°" */
export function formatJointValue(value: number, unit: JointUnit): string {
  const { shown, decimals, suffix } = DISPLAY[unit]
  return `${fixed(shown(value), decimals)}${suffix}`
}

/** A joint limit as shown below its track: whole, with its sign, e.g. "+185°" */
export function formatJointLimit(value: number, unit: JointUnit): string {
  const { shown, suffix } = DISPLAY[unit]
  const whole = Math.round(shown(value))
  const sign = whole > 0 ? "+" : ""
  return `${sign}${fixed(whole, 0)}${suffix}`
}
