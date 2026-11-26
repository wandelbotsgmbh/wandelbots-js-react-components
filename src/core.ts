// Core components without heavy dependencies (Three.js, Monaco, MUI X)

// Side-effect import: loads the MUI theme augmentation of the Nova design
// system (`palette.tertiary`, `palette.backgroundPaperElevation` and
// `paletteExt`), which the components read from the theme.
import "@wandelbots/mui"

export * from "./components/AppHeader"
// A warning that the robot's live state stopped arriving, e.g. in RobotHeader
export {
  type ConnectionQuality,
  ConnectionWarning,
  type ConnectionWarningProps,
  type ConnectionWarningState,
} from "./components/connectionWarning/ConnectionWarning"
export {
  CurrentPose,
  type CurrentPoseProps,
} from "./components/currentPoseBar/CurrentPose"
export {
  CurrentPoseBar,
  type CurrentPoseBarProps,
  type CurrentPoseBarState,
  type EulerConvention,
  type OrientationFormat,
} from "./components/currentPoseBar/CurrentPoseBar"
export {
  JoggingButtons,
  type JoggingButtonsProps,
} from "./components/jogging/JoggingButtons"
export * from "./components/jogging/JoggingCartesianAxisControl"
export type { AxisControlComponentColors } from "./components/jogging/joggingColors"
export * from "./components/jogging/JoggingJointValueControl"
export {
  JoggingJointSlider,
  type JoggingJointSliderProps,
} from "./components/jogging/joint/JoggingJointSlider"
export * from "./components/jogging/JoggingPanel"
export {
  JoggingRefusedError,
  type JoggingRefusedReason,
} from "./components/jogging/JoggingRefusedError"
export {
  JoggingStore,
  type JoggingStoreOptions,
  type JoggingStoreStorage,
} from "./components/jogging/JoggingStore"
export type {
  JogAxis,
  JogDirection,
  JogHandle,
} from "./components/jogging/jogHandle"
export type { JogControlsProps } from "./components/jogging/useJogControls"
export * from "./components/LoadingCover"
export {
  RobotHeader,
  type RobotHeaderActivation,
  type RobotHeaderActivationState,
  type RobotHeaderProps,
} from "./components/robotHeader/RobotHeader"
// The header's activation switch, also for an app's own header (SafetyBar
// is below)
export {
  ActivationSwitch,
  type ActivationSwitchOfSessionProps,
} from "./components/robotHeader/ActivationSwitch"
// The data types of the pose bar, without three.js; also in /3d with the panel
export type {
  RobotControlOption,
  RobotControlPose,
  RobotControlSelect,
} from "./components/robotControl/robotControlTypes"
export * from "./components/modal/NoMotionGroupModal"
export * from "./components/utils/interpolation"
export * from "./components/utils/useSmoothedMotionState"
export * from "./components/VelocitySlider"
export * from "./i18n/config"
export * from "./lib/ConnectedMotionGroup"
// What a session's live state reads (`session.state.stream`); the session
// makes it
export { ControllerStateStream } from "./lib/ControllerStateStream"
export type { ControllerStateSource } from "./lib/controllerStateSource"
export type { ConnectionLogger } from "./lib/connectionLogger"
export * from "./lib/JoggerConnection"
export {
  jointValuesEqual,
  type MotionStateReadout,
  poseEqual,
  tcpMotionEqual,
  unwrapRotationVector,
} from "./lib/motionStateUpdate"
export * from "./lib/MotionStreamConnection"
export type { NovaConnection } from "./lib/novaConnection"
export { planErrorTranslationKey } from "./lib/planErrorTranslation"
// Pose math with plain numbers; Pose3 and the quaternions are in /3d
export {
  deriveSelectedTcpPose,
  type ReferencedPose,
  resolveCoordinateSystemInWorld,
  type TcpReferencedPose,
  transformPoseToCoordinateSystem,
} from "./lib/PoseTransformer"
// A robot of a NOVA cell, loaded and connected
export {
  type LoadRobotSessionOptions,
  loadRobotSession,
  type RobotSessionEvent,
  RobotSessionLoad,
  type RobotSessionLoadState,
} from "./lib/robotSession/loadRobotSession"
export {
  RobotActivation,
  type RobotActivationState,
  RobotModeChangeError,
} from "./lib/robotSession/RobotActivation"
export { RobotDescription } from "./lib/robotSession/RobotDescription"
export {
  isRobotLoadStepError,
  ROBOT_LOAD_STEP_IDS,
  RobotLoadProgress,
  type RobotLoadStep,
  RobotLoadStepError,
  type RobotLoadStepId,
  type RobotLoadStepStatus,
} from "./lib/robotSession/RobotLoadProgress"
export { RobotLiveState } from "./lib/robotSession/RobotLiveState"
export {
  type RobotNotMoveableReason,
  RobotSafety,
} from "./lib/robotSession/RobotSafety"
export type { RobotPose } from "./lib/robotSession/robotPose"
export {
  RobotSession,
  type RobotSessionError,
  type RobotSessionOptions,
} from "./lib/robotSession/RobotSession"
export {
  RobotTargetPose,
  type StagedTargetPose,
} from "./lib/robotSession/RobotTargetPose"
// A pose or joints as copied: "(x, y, z, rx, ry, rz)", "[j1, …]"
export {
  jointsToText,
  poseToText,
} from "./components/robotControl/poseText"
// Move to of a session (`session.trajectory`); the session makes it
export {
  type PlannedTrajectory,
  type PlanTrajectoryResult,
  TrajectoryExecutionStore,
  type TrajectoryState,
  type TrajectoryTarget,
} from "./lib/TrajectoryExecutionStore"
export * from "./SafetyBar"
