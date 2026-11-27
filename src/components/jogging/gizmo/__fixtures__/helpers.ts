import { Quaternion, Vector3 } from "three"
import { expect } from "vitest"
import type { ProjectedJogArc } from "../arcs"
import { projectJogHandles } from "../arrows"

// Helpers of the gizmo's tests

export const about = (axis: [number, number, number], degrees: number) =>
  new Quaternion().setFromAxisAngle(
    new Vector3(...axis),
    (degrees * Math.PI) / 180,
  )

/** Screen position of a handle, in gizmo radii, y pointing down */
export function tipOf(q: Quaternion, name: string) {
  const handle = projectJogHandles(q).find(
    (h) => `${h.axis}${h.direction}` === name,
  )
  if (!handle) throw new Error(`no handle ${name}`)
  return { x: handle.x, y: handle.y, depth: handle.depth }
}

export function expectTip(q: Quaternion, name: string, x: number, y: number) {
  const tip = tipOf(q, name)
  expect(tip.x).toBeCloseTo(x)
  expect(tip.y).toBeCloseTo(y)
}

export const arcName = (arc: ProjectedJogArc) => `${arc.axis}${arc.direction}`

export function arcOf(arcs: ProjectedJogArc[], name: string) {
  const arc = arcs.find((a) => arcName(a) === name)
  if (!arc) throw new Error(`no arc ${name}`)
  return arc
}
