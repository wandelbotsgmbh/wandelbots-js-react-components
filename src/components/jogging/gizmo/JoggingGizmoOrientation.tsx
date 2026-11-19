import { useFrame, useThree } from "@react-three/fiber"
import { type RefObject, useRef } from "react"
import { type Group, Quaternion } from "three"
import { axesSeenBy } from "./jogGizmoProjection"

/**
 * Props of {@link JoggingGizmoOrientation}
 *
 * @beta
 */
export type JoggingGizmoOrientationProps = {
  /**
   * Receives the axes of the group this component sits in, as the camera
   * sees them; pass the same ref to the gizmo as its `orientation`. It may
   * start empty (`null`).
   */
  target: RefObject<Quaternion | null>
}

/**
 * Goes inside the app's 3D scene and tells a {@link JoggingGizmo} how the axes
 * of the group it sits in look from the scene's camera, every frame the scene
 * renders. The gizmo turns them on to its own jog frame
 * (`frameQuaternion`). Writes into `target` instead of setting state, so
 * orbiting does not re-render React.
 *
 * Put it where NOVA poses are drawn as they are: in a scene that is Y up,
 * like that of this library's robots, inside a group that turns NOVA's Z up
 * into Y up (`<group rotation={[-Math.PI / 2, 0, 0]}>`, as for
 * `JointLimitGizmo`). There, the axes are NOVA's world axes. Directly in a
 * Y-up scene, the gizmo would take the scene's Y for NOVA's Z, and its arrows
 * would point the wrong way.
 *
 * @beta
 */
export function JoggingGizmoOrientation({
  target,
}: JoggingGizmoOrientationProps) {
  const camera = useThree((state) => state.camera)
  // Holds no geometry: it only tells where in the scene this component sits
  const anchor = useRef<Group>(null)

  useFrame(() => {
    if (!anchor.current) return
    target.current = axesSeenBy(
      camera,
      anchor.current,
      target.current ?? new Quaternion(),
    )
  })

  return <group ref={anchor} />
}
