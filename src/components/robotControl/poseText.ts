/**
 * A pose as typed and copied: "(x, y, z, rx, ry, rz)", position in mm and
 * orientation as a rotation vector in rad. The same format and rules as
 * robot-pad's typed target pose, so a pose copied in one app reads the same
 * in the other.
 */

import type { RobotControlPose } from "./RobotControlPanel"

/** One plain or scientific-notation number, no separators */
const NUMBER_PATTERN = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/

/** A pose as text: position to 0.1 mm, orientation to 0.0001 rad */
export function poseToText(pose: RobotControlPose): string {
  const round = (v: number, digits: number) =>
    Number.parseFloat(v.toFixed(digits))
  return `(${[
    ...pose.position.map((v) => round(v, 1)),
    ...pose.orientation.map((v) => round(v, 4)),
  ].join(", ")})`
}

/**
 * The pose in `text`, or null if it is not one: six comma-separated numbers,
 * optionally in parentheses. Anything else is rejected rather than guessed,
 * e.g. a forgotten comma, which would otherwise shift every value after it.
 */
export function parsePoseText(text: string): RobotControlPose | null {
  let inner = text.trim()
  const opens = inner.startsWith("(")
  const closes = inner.endsWith(")")
  if (opens !== closes) return null
  if (opens) inner = inner.slice(1, -1)
  if (inner.trim() === "") return null

  const values: number[] = []
  for (const part of inner.split(",")) {
    const trimmed = part.trim()
    if (!NUMBER_PATTERN.test(trimmed)) return null
    const value = Number(trimmed)
    if (!Number.isFinite(value)) return null
    values.push(value)
  }
  if (values.length !== 6) return null

  const [x, y, z, rx, ry, rz] = values as [
    number,
    number,
    number,
    number,
    number,
    number,
  ]
  return { position: [x, y, z], orientation: [rx, ry, rz] }
}
