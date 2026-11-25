import { observer } from "mobx-react-lite"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import type { RobotModelSource } from "../robots/robotModelSource"
import { useRobotSessionOf } from "../robotSession/RobotSessionProvider"
import { RobotSceneView, type RobotSceneViewProps } from "./RobotSceneView"
import { useRobotSceneProps } from "./useRobotSceneProps"

/**
 * The robot (`session`, else the provider's), and any prop of
 * `RobotSceneView` to replace the session's
 */
export type RobotSceneProps = Partial<Omit<RobotSceneViewProps, "robot">> & {
  /** The robot; else the one of the nearest `RobotSessionProvider` */
  session?: RobotSession
  /**
   * Parts of the robot to replace the session's, e.g. the joints to show;
   * the rest stays the session's
   */
  robot?: Partial<RobotModelSource>
}

/**
 * The 3D scene of a robot session, ready to use inside the app's `<Canvas>`:
 * the robot, the ghost of a planned motion, the safety zones, the axes
 * jogging moves along and the light, wired as {@link useRobotSceneProps}
 * describes. It draws in NOVA's coordinates (Z up, m); the camera and its
 * controls are the app's. Any prop of `RobotSceneView` given here replaces
 * the session's; the children are the app's own parts of the scene.
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
  const props = useRobotSceneProps(useRobotSessionOf(session))
  return (
    <RobotSceneView
      {...props}
      {...overrides}
      robot={robot ? { ...props.robot, ...robot } : props.robot}
    />
  )
})
