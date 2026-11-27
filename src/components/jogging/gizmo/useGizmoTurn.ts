import { useFrame, useThree } from "@react-three/fiber"
import { type RefObject, useEffect, useRef } from "react"
import type { Group, Quaternion } from "three"
import { hasTurned } from "./gizmoView"

/**
 * Turns `group` with `orientation`, and has `place` lay the handles over it,
 * whenever it turns. `place` returns whether it found every handle to place.
 *
 * The canvas draws on demand. Looking for a turn every animation frame costs
 * a comparison of two rotations; drawing happens only after a turn or a new
 * `layout` (e.g. a new size), and again until every handle is placed.
 */
export function useGizmoTurn(
  orientation: RefObject<Quaternion | null>,
  group: RefObject<Group | null>,
  place: (orientation: Quaternion) => boolean,
  layout: string,
) {
  const last = useRef<Quaternion | null>(null)
  const invalidate = useThree((state) => state.invalidate)

  // A new layout moves every handle, whether or not the gizmo turned
  // biome-ignore lint/correctness/useExhaustiveDependencies: layout is the trigger
  useEffect(() => {
    last.current = null
    invalidate()
  }, [layout, invalidate])

  useEffect(() => {
    let frame = requestAnimationFrame(function check() {
      const q = orientation.current
      if (q && hasTurned(last.current, q)) invalidate()
      frame = requestAnimationFrame(check)
    })
    return () => cancelAnimationFrame(frame)
  }, [orientation, invalidate])

  useFrame(() => {
    const q = orientation.current
    if (!q || !group.current) return
    if (!hasTurned(last.current, q)) return
    group.current.quaternion.copy(q)
    // The first frames can come before the handles are attached; only once
    // all are placed is this rotation done with
    if (place(q)) last.current = q.clone()
  })
}
