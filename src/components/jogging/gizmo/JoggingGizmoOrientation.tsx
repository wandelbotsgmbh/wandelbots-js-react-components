import { useFrame, useThree } from "@react-three/fiber"
import type { RefObject } from "react"
import { Quaternion } from "three"
import { jogFrameInCamera } from "./jogGizmoProjection"

const IDENTITY = new Quaternion()
const cameraQuaternion = new Quaternion()

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
   * World orientation of the frame the gizmo jogs along, as the 3D scene has
   * it. Defaults to the scene's own axes, the world frame of a scene that is
   * Z up like NOVA. A frame that turns, such as the tool's, can be a
   * function: it is called every frame the scene renders, so the gizmo turns
   * with the tool without re-rendering React.
   */
  frameQuaternion?: Quaternion | (() => Quaternion)
}

/**
 * Goes inside the app's 3D scene and tells a {@link JoggingGizmo} how the jog
 * frame looks from the scene's camera, every frame the scene renders. Writes
 * into `target` instead of setting state, so orbiting does not re-render
 * React.
 *
 * @beta
 */
export function JoggingGizmoOrientation({
  target,
  frameQuaternion = IDENTITY,
}: JoggingGizmoOrientationProps) {
  const camera = useThree((state) => state.camera)

  useFrame(() => {
    const frame =
      typeof frameQuaternion === "function"
        ? frameQuaternion()
        : frameQuaternion
    camera.getWorldQuaternion(cameraQuaternion)
    target.current = jogFrameInCamera(
      cameraQuaternion,
      frame,
      target.current ?? new Quaternion(),
    )
  })

  return null
}
