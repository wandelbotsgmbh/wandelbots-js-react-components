// This file has been automatically generated using 'npm run build:models'
// DO NOT MODIFY

import { KUKA_KR270_R2700 } from "./models/kuka/KUKA_KR270_R2700"
import { KUKA_KR210_R2700 } from "./models/kuka/KUKA_KR210_R2700"
import { KUKA_KR20_R1810_2 } from "./models/kuka/KUKA_KR20_R1810_2"
import { KUKA_KR6_R700_2 } from "./models/kuka/KUKA_KR6_R700_2"
import { KUKA_KR16_R2010_2 } from "./models/kuka/KUKA_KR16_R2010_2"
import { UniversalRobots_UR10e } from "./models/universal_robots/UniversalRobots_UR10e"
import { UniversalRobots_UR16e } from "./models/universal_robots/UniversalRobots_UR16e"
import { UniversalRobots_UR3CB } from "./models/universal_robots/UniversalRobots_UR3CB"
import { UniversalRobots_UR3e } from "./models/universal_robots/UniversalRobots_UR3e"
import { UniversalRobots_UR5e } from "./models/universal_robots/UniversalRobots_UR5e"
import { UniversalRobots_UR10CB } from "./models/universal_robots/UniversalRobots_UR10CB"
import { UniversalRobots_UR5CB } from "./models/universal_robots/UniversalRobots_UR5CB"
import { ABB_1200_07_7 } from "./models/abb/ABB_1200_07_7"
import { ABB_1300_115_10 } from "./models/abb/ABB_1300_115_10"
import { FANUC_CRX25iAL } from "./models/fanuc/FANUC_CRX25iAL"
import { FANUC_ARC_Mate_100iD } from "./models/fanuc/FANUC_ARC_Mate_100iD"
import { FANUC_CRX10iA } from "./models/fanuc/FANUC_CRX10iA"
import { FANUC_ARC_Mate_120iD } from "./models/fanuc/FANUC_ARC_Mate_120iD"
import { FANUC_LR_Mate_200iD7L } from "./models/fanuc/FANUC_LR_Mate_200iD7L"
import { FANUC_CRX20iAL } from "./models/fanuc/FANUC_CRX20iAL"
import { FANUC_CRX10iAL } from "./models/fanuc/FANUC_CRX10iAL"
import { FANUC_LR_Mate_200iD4S } from "./models/fanuc/FANUC_LR_Mate_200iD4S"
import { FANUC_LR_Mate_200iD } from "./models/fanuc/FANUC_LR_Mate_200iD"
import { FANUC_CRX25iA } from "./models/fanuc/FANUC_CRX25iA"
import { Yaskawa_AR1440 } from "./models/yaskawa/Yaskawa_AR1440"
import { Yaskawa_AR900 } from "./models/yaskawa/Yaskawa_AR900"
import { Yaskawa_AR3120 } from "./models/yaskawa/Yaskawa_AR3120"
import { Yaskawa_AR1730 } from "./models/yaskawa/Yaskawa_AR1730"
import { Yaskawa_GP88 } from "./models/yaskawa/Yaskawa_GP88"
import { Yaskawa_GP50 } from "./models/yaskawa/Yaskawa_GP50"
import { Yaskawa_AR2010 } from "./models/yaskawa/Yaskawa_AR2010"

export type SupportedRobotModel =
  | "KUKA_KR270_R2700"
  | "KUKA_KR210_R2700"
  | "KUKA_KR20_R1810_2"
  | "KUKA_KR6_R700_2"
  | "KUKA_KR16_R2010_2"
  | "UniversalRobots_UR10e"
  | "UniversalRobots_UR16e"
  | "UniversalRobots_UR3CB"
  | "UniversalRobots_UR3e"
  | "UniversalRobots_UR5e"
  | "UniversalRobots_UR10CB"
  | "UniversalRobots_UR5CB"
  | "ABB_1200_07_7"
  | "ABB_1300_115_10"
  | "FANUC_CRX25iAL"
  | "FANUC_ARC_Mate_100iD"
  | "FANUC_CRX10iA"
  | "FANUC_ARC_Mate_120iD"
  | "FANUC_LR_Mate_200iD7L"
  | "FANUC_CRX20iAL"
  | "FANUC_CRX10iAL"
  | "FANUC_LR_Mate_200iD4S"
  | "FANUC_LR_Mate_200iD"
  | "FANUC_CRX25iA"
  | "Yaskawa_AR1440"
  | "Yaskawa_AR900"
  | "Yaskawa_AR3120"
  | "Yaskawa_AR1730"
  | "Yaskawa_GP88"
  | "Yaskawa_GP50"
  | "Yaskawa_AR2010"

export function getSupportedRobot(modelName: SupportedRobotModel) {
  switch (modelName) {
    case "KUKA_KR270_R2700":
      return KUKA_KR270_R2700
    case "KUKA_KR210_R2700":
      return KUKA_KR210_R2700
    case "KUKA_KR20_R1810_2":
      return KUKA_KR20_R1810_2
    case "KUKA_KR6_R700_2":
      return KUKA_KR6_R700_2
    case "KUKA_KR16_R2010_2":
      return KUKA_KR16_R2010_2
    case "UniversalRobots_UR10e":
      return UniversalRobots_UR10e
    case "UniversalRobots_UR16e":
      return UniversalRobots_UR16e
    case "UniversalRobots_UR3CB":
      return UniversalRobots_UR3CB
    case "UniversalRobots_UR3e":
      return UniversalRobots_UR3e
    case "UniversalRobots_UR5e":
      return UniversalRobots_UR5e
    case "UniversalRobots_UR10CB":
      return UniversalRobots_UR10CB
    case "UniversalRobots_UR5CB":
      return UniversalRobots_UR5CB
    case "ABB_1200_07_7":
      return ABB_1200_07_7
    case "ABB_1300_115_10":
      return ABB_1300_115_10
    case "FANUC_CRX25iAL":
      return FANUC_CRX25iAL
    case "FANUC_ARC_Mate_100iD":
      return FANUC_ARC_Mate_100iD
    case "FANUC_CRX10iA":
      return FANUC_CRX10iA
    case "FANUC_ARC_Mate_120iD":
      return FANUC_ARC_Mate_120iD
    case "FANUC_LR_Mate_200iD7L":
      return FANUC_LR_Mate_200iD7L
    case "FANUC_CRX20iAL":
      return FANUC_CRX20iAL
    case "FANUC_CRX10iAL":
      return FANUC_CRX10iAL
    case "FANUC_LR_Mate_200iD4S":
      return FANUC_LR_Mate_200iD4S
    case "FANUC_LR_Mate_200iD":
      return FANUC_LR_Mate_200iD
    case "FANUC_CRX25iA":
      return FANUC_CRX25iA
    case "Yaskawa_AR1440":
      return Yaskawa_AR1440
    case "Yaskawa_AR900":
      return Yaskawa_AR900
    case "Yaskawa_AR3120":
      return Yaskawa_AR3120
    case "Yaskawa_AR1730":
      return Yaskawa_AR1730
    case "Yaskawa_GP88":
      return Yaskawa_GP88
    case "Yaskawa_GP50":
      return Yaskawa_GP50
    case "Yaskawa_AR2010":
      return Yaskawa_AR2010
    default:
      return null
  }
}
