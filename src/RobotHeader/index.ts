// The header of a robot app: `@wandelbots/wandelbots-js-react-components/RobotHeader`.
// No three.js needed.
export type { AppItem } from "../components/AppHeader"
export type {
  RobotControlOption,
  RobotControlSelect,
} from "../components/robotControl/RobotControlPanel"
export {
  RobotHeader,
  RobotHeader as default,
  type RobotHeaderActivation,
  type RobotHeaderActivationState,
  type RobotHeaderProps,
} from "../components/robotHeader/RobotHeader"
// The header's parts that are the robot's, for an app that builds its own
// header: each takes the session, as RobotHeader does
export {
  ActivationSwitch,
  type ActivationSwitchOfSessionProps,
} from "../components/robotHeader/ActivationSwitch"
export {
  SafetyBar,
  type SafetyBarOfSessionProps,
  type SafetyBarProps,
} from "../SafetyBar/SafetyBar"
// For the header's actions: a warning that the live state stopped arriving
export {
  type ConnectionQuality,
  ConnectionWarning,
  type ConnectionWarningProps,
  type ConnectionWarningState,
} from "../components/connectionWarning/ConnectionWarning"
