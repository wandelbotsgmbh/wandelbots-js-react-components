import { Suspense } from "react"

import { UniversalRobots_UR3 } from "./UniversalRobots_UR3"
import { UniversalRobots_UR3e } from "./UniversalRobots_UR3e"
import { UniversalRobots_UR5 } from "./UniversalRobots_UR5"
import { UniversalRobots_UR5e } from "./UniversalRobots_UR5e"
import { UniversalRobots_UR10 } from "./UniversalRobots_UR10"
import { UniversalRobots_UR10e } from "./UniversalRobots_UR10e"
import { Yaskawa_AR900 } from "./Yaskawa_AR900"
import { Yaskawa_AR1440 } from "./Yaskawa_AR1440"
import { Yaskawa_AR1730 } from "./Yaskawa_AR1730"
import { Yaskawa_AR2010 } from "./Yaskawa_AR2010"
import { Yaskawa_AR3120 } from "./Yaskawa_AR3120"
import { FANUC_CRX10iA } from "./FANUC_CRX10iA"
import { FANUC_CRX25iA } from "./FANUC_CRX25iA"
import { FANUC_CRX25iAL } from "./FANUC_CRX25iAL"
import { KUKA_KR210_R2700 } from "./KUKA_KR210_R2700"
import { KUKA_KR270_R2700 } from "./KUKA_KR270_R2700"
import { FANUC_ARC_Mate_100iD } from "./FANUC_ARC_Mate_100iD"
import { FANUC_ARC_Mate_120iD } from "./FANUC_ARC_Mate_120iD"
import { ABB_1200_07_7 } from "./ABB_1200_07_7"

import { type GroupProps } from "@react-three/fiber"
import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js"
import { DHRobot } from "./DHRobot"

export type RobotProps = {
  connectedMotionGroup: ConnectedMotionGroup
  modelURL: string;
} & GroupProps

export type SupportedRobotProps = RobotProps & {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => string;
}

function defaultGetModel(modelFromController: string): string {
  return `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components/public/models/${modelFromController}.glb`;
};

export function SupportedRobot({ getModel = defaultGetModel, ...props }: SupportedRobotProps) {
  let Robot
  const modelFromController = props.connectedMotionGroup.modelFromController
  switch (modelFromController) {
    case "UniversalRobots_UR3":
      Robot = UniversalRobots_UR3
      break
    case "UniversalRobots_UR3e":
      Robot = UniversalRobots_UR3e
      break
    case "UniversalRobots_UR5":
      Robot = UniversalRobots_UR5
      break
    case "UniversalRobots_UR5e":
      Robot = UniversalRobots_UR5e
      break
    case "UniversalRobots_UR10":
      Robot = UniversalRobots_UR10
      break
    case "UniversalRobots_UR10e":
      Robot = UniversalRobots_UR10e
      break
    case "Yaskawa_AR900":
      Robot = Yaskawa_AR900
      break
    case "Yaskawa_GP7":
      Robot = Yaskawa_AR900
      break
    case "Yaskawa_AR1440":
      Robot = Yaskawa_AR1440
      break
    case "Yaskawa_AR1730":
      Robot = Yaskawa_AR1730
      break
    case "Yaskawa_AR2010":
      Robot = Yaskawa_AR2010
      break
    case "Yaskawa_AR3120":
      Robot = Yaskawa_AR3120
      break
    case "FANUC_CRX10iA":
      Robot = FANUC_CRX10iA
      break
    case "FANUC_CRX25iA":
      Robot = FANUC_CRX25iA
      break
    case "FANUC_CRX25iAL":
      Robot = FANUC_CRX25iAL
      break
    case "FANUC_ARC_Mate_120iD":
      Robot = FANUC_ARC_Mate_120iD
      break
    case "FANUC_ARC_Mate_100iD":
      Robot = FANUC_ARC_Mate_100iD
      break
    case "KUKA_KR210_R2700":
      Robot = KUKA_KR210_R2700
      break
    case "KUKA_KR270_R2700":
      Robot = KUKA_KR270_R2700
      break
    case "ABB_1200_07_7":
      Robot = ABB_1200_07_7
      break
    default:
      console.warn(
        `Unknown robot type: ${modelFromController}`,
      )
      Robot = DHRobot
  }

  return (
    <Suspense fallback={<DHRobot {...props} />}>
      <Robot modelURL={getModel(modelFromController)} {...props} />
    </Suspense>
  )
}
