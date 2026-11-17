import { useFrame, useThree } from "@react-three/fiber"
import { type RefObject, useRef } from "react"
import { type Group, Quaternion } from "three"
import { jogFrameSeenBy } from "./jogGizmoProjection"

const IDENTITY = new Quaternion()

/**
 * Props of {@link JoggingGizmoOrientation}
 *
 * @beta
 */
export type JoggingGizmoOrientationProps = {
  /**
   * Receives the jog frame as the camera sees it; pass the same ref to the
   * gizmo as its `orientation`. It may start empty (`null`).
   */
  target: RefObject<Quaternion | null>
  /**
   * Orientation of the frame the gizmo jogs along, in the coordinates of the
   * group this component sits in. Defaults to that group's own axes: in a
   * group that turns NOVA's Z up into the scene's Y up, that is NOVA's world
   * frame.
   *
   * A frame that turns, such as the tool's, can be a function: it is called
   * every frame the scene renders, so the gizmo turns with the tool without
   * re-rendering React.
   */
  frameQuaternion?: Quaternion | (() => Quaternion)
}

/**
 * Goes inside the app's 3D scene and tells a {@link JoggingGizmo} how the jog
 * frame looks from the scene's camera, every frame the scene renders. Writes
 * into `target` instead of setting state, so orbiting does not re-render
 * React.
 *
 * Put it where NOVA poses are drawn as they are: in a scene that is Y up,
 * like that of this library's robots, inside a group that turns NOVA's Z up
 * into Y up (`<group rotation={[-Math.PI / 2, 0, 0]}>`, as for
 * `JointLimitGizmo`). Directly in a Y-up scene, the gizmo would take the
 * scene's Y for NOVA's Z, and its arrows would point the wrong way.
 *
 * @beta
 */
export function JoggingGizmoOrientation({
  target,
  frameQuaternion = IDENTITY,
}: JoggingGizmoOrientationProps) {
  const camera = useThree((state) => state.camera)
  // Holds no geometry: it only tells where in the scene this component sits
  const anchor = useRef<Group>(null)

  useFrame(() => {
    if (!anchor.current) return
    const frame =
      typeof frameQuaternion === "function"
        ? frameQuaternion()
        : frameQuaternion
    target.current = jogFrameSeenBy(
      camera,
      anchor.current,
      frame,
      target.current ?? new Quaternion(),
    )
  })

  return <group ref={anchor} />
}
