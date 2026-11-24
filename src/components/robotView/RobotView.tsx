import { observer } from "mobx-react-lite"
import { RobotScene, type RobotSceneProps } from "../robotScene/RobotScene"
import { useRobotSessionOf } from "../robotSession/RobotSessionProvider"
import { RobotCanvas, type RobotCanvasProps } from "./RobotCanvas"

/**
 * The robot (`session`, else the provider's), any prop of `RobotSceneView`
 * to replace the session's, the canvas's options, and the app's own parts of
 * the scene as children
 */
export type RobotViewProps = RobotSceneProps &
  Omit<RobotCanvasProps, "orbitTarget">

/**
 * The 3D view of a robot session, ready to use: `RobotScene` in a
 * {@link RobotCanvas} whose camera orbits the robot's base. It fills its
 * parent, so the app decides where it goes. The children are the app's own
 * parts of the scene, in NOVA's coordinates (Z up, m).
 *
 * ```tsx
 * <Box sx={{ position: "relative", flex: 1 }}>
 *   <RobotView session={session}>
 *     <AppOverlays />
 *   </RobotView>
 * </Box>
 * ```
 */
export const RobotView = observer(function RobotView({
  session,
  antialias,
  onContextLost,
  onWebGLUnavailable,
  sx,
  children,
  ...scene
}: RobotViewProps) {
  const robot = useRobotSessionOf(session)
  const base = robot.description.mounting?.position

  return (
    <RobotCanvas
      orbitTarget={[
        (base?.[0] ?? 0) / 1000,
        (base?.[1] ?? 0) / 1000,
        (base?.[2] ?? 0) / 1000,
      ]}
      antialias={antialias}
      onContextLost={onContextLost}
      onWebGLUnavailable={onWebGLUnavailable}
      sx={sx}
    >
      <RobotScene session={robot} {...scene}>
        {children}
      </RobotScene>
    </RobotCanvas>
  )
})
