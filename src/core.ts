// Core components without heavy dependencies (Three.js, Monaco, MUI X)

// Side-effect import: loads the MUI theme augmentation of the Nova design
// system (`palette.tertiary`, `palette.backgroundPaperElevation` and
// `paletteExt`), which the components read from the theme.
import "@wandelbots/mui"

export * from "./components/AppHeader"
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
export { JoggingStore } from "./components/jogging/JoggingStore"
export type {
  JogAxis,
  JogDirection,
  JogHandle,
} from "./components/jogging/jogHandle"
export type { JogControlsProps } from "./components/jogging/useJogControls"
// The data types of the pose bar, without three.js
export type {
  RobotControlOption,
  RobotControlPose,
  RobotControlSelect,
} from "./components/robotControl/robotControlTypes"
export * from "./components/LoadingCover"
export * from "./components/modal/NoMotionGroupModal"
export * from "./components/utils/interpolation"
export * from "./components/utils/useSmoothedMotionState"
export * from "./components/VelocitySlider"
export * from "./i18n/config"
export * from "./lib/ConnectedMotionGroup"
export * from "./lib/JoggerConnection"
export * from "./lib/motionStateUpdate"
export * from "./lib/MotionStreamConnection"
export type { NovaConnection } from "./lib/novaConnection"
export * from "./SafetyBar"
