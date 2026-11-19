import { useFrame, useThree } from "@react-three/fiber"
import type { RefObject } from "react"
import { Quaternion } from "three"
import { novaAxesSeenBy } from "./gizmoView"

/**
 * Props of {@link JoggingGizmoOrientation}
 */
export type JoggingGizmoOrientationProps = {
  /**
   * Receives NOVA's axes as the camera sees them; pass the same ref to the
   * gizmo as its `orientation`. It may start empty (`null`).
   */
  target: RefObject<Quaternion | null>
}

/**
 * Goes anywhere inside the app's 3D scene and tells a {@link JoggingGizmo}
 * how NOVA's axes look from the scene's camera, every frame the scene
 * renders. The gizmo turns them on to its own jog frame (`frameQuaternion`).
 * Writes into `target` instead of setting state, so orbiting does not
 * re-render React.
 *
 * It follows the camera's up. In a scene that is Y up, like that of this
 * library's robots, it translates NOVA's axes (Z up): NOVA's Z is the
 * scene's Y. In a scene that is Z up like NOVA's world, whose camera has Z
 * up, it takes NOVA's axes as they are. Where it sits in the scene does not
 * matter.
 */
export function JoggingGizmoOrientation({
  target,
}: JoggingGizmoOrientationProps) {
  const camera = useThree((state) => state.camera)

  useFrame(() => {
    target.current = novaAxesSeenBy(camera, target.current ?? new Quaternion())
  })

  return null
}
