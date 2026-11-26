import { observer } from "mobx-react-lite"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { RobotModelSource } from "../robots/robotModelSource"
import { RobotSceneView, type RobotSceneViewProps } from "./RobotSceneView"
import { useRobotSceneProps } from "./useRobotSceneProps"

/** The robot, and any prop of `RobotSceneView` to replace the session's */
export type RobotSceneProps = Partial<Omit<RobotSceneViewProps, "robot">> & {
  /** The robot the scene draws */
  session: RobotSession
  /**
   * Parts of the robot to replace the session's, e.g. the joints to show;
   * the rest stays the session's
   */
  robot?: Partial<RobotModelSource>
}

/**
 * The 3D scene of a robot session, ready to use inside the app's `<Canvas>`:
 * the robot at its mounting with its live joints, the ghost of a planned
 * motion's end until the robot is there, the safety zones of its controller,
 * the axes jogging moves along and the light. It draws in NOVA's coordinates
 * (Z up, m); the camera and its controls are the app's. Any prop of
 * `RobotSceneView` given here replaces the session's; the children are the
 * app's own parts of the scene.
 *
 * ```tsx
 * <Canvas camera={{ up: [0, 0, 1], position: [3, -3, 3] }}>
 *   <RobotScene session={session}>
 *     <AppOverlays />
 *   </RobotScene>
 *   <OrbitControls makeDefault />
 * </Canvas>
 * ```
 */
export const RobotScene = observer(function RobotScene({
  session,
  robot,
  ...overrides
}: RobotSceneProps) {
  const props = useRobotSceneProps(session)
  return (
    <RobotSceneView
      {...props}
      {...overrides}
      robot={robot ? { ...props.robot, ...robot } : props.robot}
    />
  )
})
