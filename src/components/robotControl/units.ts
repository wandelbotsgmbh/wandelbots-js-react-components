import type { JogMotion } from "./RobotControlPanel"

/** Radians as degrees */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}

/** Degrees as radians */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/**
 * A value of a motion as the panel shows it: NOVA gives translations in mm
 * (or mm/s) and rotations in rad (or rad/s); the panel shows degrees
 */
export function shownValue(motion: JogMotion, value: number): number {
  return motion === "rotate" ? toDegrees(value) : value
}

/** The inverse of {@link shownValue}: a shown value in NOVA's units */
export function novaValue(motion: JogMotion, shown: number): number {
  return motion === "rotate" ? toRadians(shown) : shown
}

/** A step size as shown, e.g. "5 mm" or "2.5°": at most two decimals */
export function formatStep(motion: JogMotion, distance: number): string {
  const shown = String(Number(shownValue(motion, distance).toFixed(2)))
  return motion === "rotate" ? `${shown}°` : `${shown} mm`
}

/** A velocity as shown, e.g. "125 mm/s" or "10°/s": in whole units */
export function formatVelocity(motion: JogMotion, velocity: number): string {
  const shown = Math.round(shownValue(motion, velocity))
  return motion === "rotate" ? `${shown}°/s` : `${shown} mm/s`
}
