// 3D viewport and Three.js-based components
export { default as CollisionSceneRenderer } from "./components/3d-viewport/collider/CollisionSceneRenderer"
export {
  JointLimitGizmo,
  type GizmoChainOffset,
  type GizmoDhParameter,
  type GizmoJointLimit,
  type JointLimitGizmoProps,
} from "./components/3d-viewport/JointLimitGizmo"
export * from "./components/3d-viewport/PresetEnvironment"
export * from "./components/3d-viewport/SafetyZonesRenderer"
export * from "./components/3d-viewport/TrajectoryRenderer"
export {
  JoggingGizmo,
  type JoggingGizmoProps,
} from "./components/jogging/gizmo/JoggingGizmo"
export {
  JoggingGizmoOrientation,
  type JoggingGizmoOrientationProps,
} from "./components/jogging/gizmo/JoggingGizmoOrientation"
export type {
  JogAxis,
  JogDirection,
  JogHandle,
} from "./components/jogging/jogHandle"
export type { JogControlsProps } from "./components/jogging/useJogControls"
export {
  type JogMotion,
  RobotControlPanel,
  type RobotControlIncrements,
  type RobotControlJogMode,
  type RobotControlJoint,
  type RobotControlJoints,
  type RobotControlJointTarget,
  type RobotControlMoveState,
  type RobotControlMoveTo,
  type RobotControlOption,
  type RobotControlPanelProps,
  type RobotControlPose,
  type RobotControlSelect,
  type RobotControlTab,
  type RobotControlTarget,
  type RobotControlVelocity,
} from "./components/robotControl/RobotControlPanel"
// The panel of a robot session, ready to use, and its props
export {
  RobotControl,
  type RobotControlProps,
} from "./components/robotControl/RobotControl"
export type { RobotControlOptions } from "./components/robotControl/useRobotControlProps"
// The 3D scene of a robot session, ready to use, its props and its parts
export {
  JoggingAxes,
  type JoggingAxesProps,
} from "./components/robotScene/JoggingAxes"
// A robot at given joints as a ghost, as many as the app wants
export {
  RobotGhost,
  type RobotGhostProps,
  type RobotGhostRobot,
} from "./components/robotScene/RobotGhost"
export {
  RobotScene,
  type RobotSceneProps,
} from "./components/robotScene/RobotScene"
export {
  RobotSceneView,
  type RobotSceneViewProps,
} from "./components/robotScene/RobotSceneView"
// The 3D view of a robot session, ready to use, and its canvas
export {
  RobotCanvas,
  type RobotCanvasProps,
} from "./components/robotView/RobotCanvas"
export {
  RobotView,
  type RobotViewProps,
} from "./components/robotView/RobotView"
// Where the 3D views found that the browser cannot draw 3D
export type { WebGLUnavailableContext } from "./components/utils/useWebGLRenderer"
export * from "./components/robots/LinearAxis"
export * from "./components/robots/MotionGroupVisualizer"
export * from "./components/robots/Robot"
// The model download, and the joint naming for apps that read the drawn chain
export {
  defaultGetModel,
  FLANGE_NODE_SUFFIX,
  JOINT_REST_SUFFIX,
  jointIndexOf,
} from "./components/robots/robotModelLogic"
// What Robot and LinearAxis draw (a session's robot: RobotScene)
export type { RobotModelSource } from "./components/robots/robotModelSource"
export * from "./components/robots/SupportedLinearAxis"
export * from "./components/robots/SupportedRobot"
// Opt-in joint-stream smoothing to feed the (as-is) robot visualizer.
export {
  ValueInterpolator,
  type InterpolationOptions,
} from "./components/utils/interpolation"
export * from "./components/utils/useSmoothedMotionState"
// Pose math with three.js objects; the plain-number transforms are in /core
export { Pose3 } from "./lib/Pose3"
export { parseRotationToQuaternion } from "./lib/rotation"
