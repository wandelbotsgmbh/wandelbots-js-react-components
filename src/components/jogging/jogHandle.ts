/**
 * An axis of a cartesian jog
 *
 * @beta
 */
export type JogAxis = "x" | "y" | "z"

/**
 * Which way along an axis
 *
 * @beta
 */
export type JogDirection = "+" | "-"

/**
 * One jog control, e.g. +X
 *
 * @beta
 */
export type JogHandle = { axis: JogAxis; direction: JogDirection }

export const JOG_AXES: readonly JogAxis[] = ["x", "y", "z"]
export const JOG_DIRECTIONS: readonly JogDirection[] = ["-", "+"]

export function isSameJogHandle(
  a: JogHandle | null | undefined,
  b: JogHandle | null | undefined,
): boolean {
  return !!a && !!b && a.axis === b.axis && a.direction === b.direction
}

/** How a handle is named on screen, e.g. X+ */
export function jogHandleName(handle: JogHandle): string {
  return `${handle.axis.toUpperCase()}${handle.direction}`
}
