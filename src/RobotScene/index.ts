// The 3D scene of a robot session, ready to use inside the app's <Canvas>:
// `@wandelbots/wandelbots-js-react-components/RobotScene`. It needs three.js
// and React Three Fiber (optional peers of the library).
export {
  JoggingAxes,
  type JoggingAxesProps,
} from "../components/robotScene/JoggingAxes"
// A robot at given joints as a ghost, as many as the app wants
export {
  RobotGhost,
  type RobotGhostProps,
  type RobotGhostRobot,
} from "../components/robotScene/RobotGhost"
export {
  RobotScene,
  RobotScene as default,
  type RobotSceneProps,
} from "../components/robotScene/RobotScene"
export {
  RobotSceneView,
  type RobotSceneViewProps,
} from "../components/robotScene/RobotSceneView"
