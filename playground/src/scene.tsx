import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import { Bounds, OrbitControls, useBounds } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { ElevationCard } from "@wandelbots/mui"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import {
  type ConnectedMotionGroup,
  LinearAxis,
  PresetEnvironment,
  Robot,
} from "@wandelbots/wandelbots-js-react-components"
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

/** FitCamera calls it when a model is drawn (see Viewport) */
const ModelDrawnContext = createContext(() => {})

/** A 3D view that fills its parent, with the light of PresetEnvironment */
export function Viewport({ children }: { children: ReactNode }) {
  const theme = useTheme()
  const gridColor =
    theme.palette.backgroundPaperElevation?.[11] ?? theme.palette.grey[700]
  const gridCenterColor =
    theme.palette.backgroundPaperElevation?.[16] ?? theme.palette.grey[500]
  const [modelDrawn, setModelDrawn] = useState(false)
  const onModelDrawn = useCallback(() => setModelDrawn(true), [])

  // data-model-drawn turns "true" when the robot model is drawn (its
  // postModelRender called `refit` of FitCamera). The e2e tests wait for it:
  // the canvas itself does not tell when the model is there.
  return (
    <Canvas
      data-testid="viewport"
      data-model-drawn={modelDrawn}
      shadows
      camera={{ position: [2, 1.5, 2], fov: 35 }}
    >
      <ModelDrawnContext.Provider value={onModelDrawn}>
        <color attach="background" args={[theme.palette.background.default]} />
        <PresetEnvironment />
        <gridHelper args={[10, 20, gridCenterColor, gridColor]} />
        <OrbitControls makeDefault />
        {children}
      </ModelDrawnContext.Provider>
    </Canvas>
  )
}

/**
 * Fits the camera to its content when the content calls `refit`, for example
 * when a robot model has loaded. (A fit before that would fit an empty box.)
 * `refit` also sets the marker data-model-drawn of the Viewport.
 */
export function FitCamera({
  children,
}: {
  children: (refit: () => void) => ReactNode
}) {
  // A large margin, so that the robot stays in the view while it moves
  return (
    <Bounds clip margin={1.7}>
      <Refit>{children}</Refit>
    </Bounds>
  )
}

function Refit({ children }: { children: (refit: () => void) => ReactNode }) {
  const bounds = useBounds()
  const onModelDrawn = useContext(ModelDrawnContext)
  const refit = useCallback(() => {
    // biome-ignore lint/suspicious/noFocusedTests: fit() of drei's Bounds, not a test
    bounds.refresh().clip().fit()
    onModelDrawn()
  }, [bounds, onModelDrawn])
  return children(refit)
}

/**
 * Turns NOVA coordinates (Z up) into the coordinates of the 3D view and the
 * robot models (Y up), for parts that draw NOVA poses as they are:
 * SafetyZonesRenderer, CollisionSceneRenderer and JointLimitGizmo.
 * TrajectoryRenderer turns the poses itself.
 */
export function NovaCoordinates({ children }: { children: ReactNode }) {
  return <group rotation={[-Math.PI / 2, 0, 0]}>{children}</group>
}

/** Whether the motion group is a linear axis, as JoggingStore decides it */
export function isLinearAxis(motionGroup: ConnectedMotionGroup) {
  return motionGroup.dhParameters?.[0]?.type === JointTypeEnum.PrismaticJoint
}

/**
 * The robot (Robot) or linear axis (LinearAxis) of a connected motion group.
 * They load their model from the instance of the motion group, with the
 * access token of its connection.
 */
export function MotionGroupModel({
  motionGroup,
  onModelLoaded,
}: {
  motionGroup: ConnectedMotionGroup
  onModelLoaded?: () => void
}) {
  return isLinearAxis(motionGroup) ? (
    <LinearAxis
      connectedMotionGroup={motionGroup}
      postModelRender={onModelLoaded}
    />
  ) : (
    <Robot connectedMotionGroup={motionGroup} postModelRender={onModelLoaded} />
  )
}

/** A page with a 3D view on the free width and a side panel of a fixed width */
export function ViewWithSidePanel({
  view,
  panel,
}: {
  view: ReactNode
  panel: ReactNode
}) {
  return (
    <Stack direction="row" sx={{ position: "absolute", inset: 0 }}>
      <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>{view}</Box>
      <Box
        sx={{
          position: "relative",
          width: 420,
          flexShrink: 0,
          overflowY: "auto",
          borderLeft: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        {panel}
      </Box>
    </Stack>
  )
}

/** A small panel over the 3D view, for its switches and notes */
export function ViewPanel({ children }: { children: ReactNode }) {
  return (
    <ElevationCard
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        m: 2,
        p: 2,
        maxWidth: 380,
      }}
    >
      <Stack gap={1}>{children}</Stack>
    </ElevationCard>
  )
}
