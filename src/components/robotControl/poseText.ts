/**
 * A pose as typed and copied: "(x, y, z, rx, ry, rz)", position in mm and
 * orientation as a rotation vector in rad; joints as "[j1, j2, …]" in rad
 * (mm for a linear axis). The same format and rules as robot-pad's typed
 * target pose, so a pose copied in one app reads the same in the other.
 */

import type { RobotControlPose, RobotControlTarget } from "./RobotControlPanel"

/**
 * One plain or scientific-notation number, no separators. The digits after
 * the point belong to the point: without it, a run of digits could be split
 * between two groups in many ways, and a long one took seconds to reject.
 */
const NUMBER_PATTERN = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/

const round = (value: number, digits: number) =>
  Number.parseFloat(value.toFixed(digits))

/**
 * A pose as text: position to 0.1 mm, orientation to 0.0001 rad unless asked
 * otherwise. A value that a NOVA pose leaves out is 0.
 */
export function poseToText(
  pose: {
    position?: readonly number[]
    orientation?: readonly number[]
  },
  precision: { positionPrecision?: number; rotationPrecision?: number } = {},
): string {
  const positionDigits = precision.positionPrecision ?? 1
  const rotationDigits = precision.rotationPrecision ?? 4
  const three = (values: readonly number[] | undefined) =>
    [0, 1, 2].map((index) => values?.[index] ?? 0)
  return `(${[
    ...three(pose.position).map((v) => round(v, positionDigits)),
    ...three(pose.orientation).map((v) => round(v, rotationDigits)),
  ].join(", ")})`
}

/** Joint values as text, each to 0.0001 */
export function jointsToText(joints: readonly number[]): string {
  return `[${joints.map((value) => round(value, 4)).join(", ")}]`
}

/**
 * The comma-separated numbers in `text`, optionally in the given brackets, or
 * null for anything malformed: unbalanced brackets, a missing comma, an empty
 * entry or a value that is not a number
 */
function parseNumberList(
  text: string,
  open: string,
  close: string,
): number[] | null {
  let inner = text.trim()
  const opens = inner.startsWith(open)
  const closes = inner.endsWith(close)
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
  return values
}

/**
 * The pose in `text`, or null if it is not one: six comma-separated numbers,
 * optionally in parentheses. Anything else is rejected rather than guessed,
 * e.g. a forgotten comma, which would otherwise shift every value after it.
 */
export function parsePoseText(text: string): RobotControlPose | null {
  const values = parseNumberList(text, "(", ")")
  if (values?.length !== 6) return null

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

/**
 * The joint values in `text`, or null if they are not exactly
 * `jointCount` comma-separated numbers, optionally in square brackets
 */
export function parseJointsText(
  text: string,
  jointCount: number,
): number[] | null {
  const values = parseNumberList(text, "[", "]")
  if (values?.length !== jointCount) return null
  return values
}

/**
 * The target of a move in `text`, or null if it is none: a pose of the TCP
 * in parentheses, or joint values in square brackets, as many as the robot
 * has joints (`jointCount`; null when they are not known, which takes none).
 * Numbers without brackets are what the field shows: a pose of the TCP, or
 * joint values for a robot that takes no TCP poses (`poses` is false), for
 * which a pose is no target either.
 */
export function parseTargetText(
  text: string,
  { poses, jointCount }: { poses: boolean; jointCount: number | null },
): RobotControlTarget | null {
  if (poses && !text.trim().startsWith("[")) return parsePoseText(text)
  if (jointCount === null) return null
  const joints = parseJointsText(text, jointCount)
  return joints && { joints }
}
