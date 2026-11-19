import type { JoggingStore } from "@wandelbots/wandelbots-js-react-components"
import { useMemo } from "react"
import { Quaternion, Vector3 } from "three"

/** Without an inverse solver, the TCP cannot move along an axis */
export const cannotJog = (store: JoggingStore) =>
  store.isLocked || store.inverseSolver === null

/**
 * The orientation of the TCP: the frame of jogging along the tool's axes.
 * JoggingGizmo calls it every animation frame, so it turns with the tool
 * while it jogs. NOVA gives it as a rotation vector in
 * the world frame (the response coordinate system of the motion state, not
 * set here), the frame of the gizmo's frameQuaternion.
 */
export function useToolFrame(store: JoggingStore) {
  return useMemo(() => {
    const turn = new Quaternion()
    const axis = new Vector3()
    return () => {
      const [x = 0, y = 0, z = 0] =
        store.jogger.motionStream.rapidlyChangingMotionState.tcp_pose
          ?.orientation ?? []
      const angle = Math.hypot(x, y, z)
      if (angle < 1e-9) return turn.identity()
      return turn.setFromAxisAngle(
        axis.set(x / angle, y / angle, z / angle),
        angle,
      )
    }
  }, [store])
}
