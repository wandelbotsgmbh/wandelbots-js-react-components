/**
 * An axis of a cartesian jog
 */
export type JogAxis = "x" | "y" | "z"

/**
 * Which way along an axis
 */
export type JogDirection = "+" | "-"

/**
 * One jog control, e.g. +X
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

/**
 * How a handle is named on screen, as the jog buttons name it: X+, or Rx+
 * when it rotates about X
 */
export function jogHandleName(
  handle: JogHandle,
  motion: "translate" | "rotate" = "translate",
): string {
  return motion === "rotate"
    ? `R${handle.axis}${handle.direction}`
    : `${handle.axis.toUpperCase()}${handle.direction}`
}
