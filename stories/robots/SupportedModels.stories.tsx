import type { StoryObj } from "@storybook/react"
import { useCallback } from "react"
import * as THREE from "three"
import { type Group } from "three"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { getDHParams, sharedStoryConfig } from "./robotStoryConfig"

export default {
  ...sharedStoryConfig,
  tags: ["!autodocs"],
  title: "3D View/Robot/Supported Models",
}

function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  const flangeRef = useCallback((node: Group) => {
    const geometry = new THREE.SphereGeometry(0.01, 32, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    const sphere = new THREE.Mesh(geometry, material)

    node.add(sphere)
  }, [])

  return (
    <>
      <SupportedRobot
        {...props}
        flangeRef={flangeRef}
        rapidlyChangingMotionState={rapidlyChangingMotionState}
      />
    </>
  )
}

function robotStory(
  modelFromController: string,
): StoryObj<typeof SupportedRobotScene> {
  return {
    args: {
      modelFromController,
    },
    render: (args, { loaded: { dhParameters } }) => (
      <SupportedRobotScene {...args} dhParameters={dhParameters} />
    ),
    name: modelFromController,
    loaders: [
      async () => ({
        dhParameters: await getDHParams(modelFromController),
      }),
    ],
  }
}

export const ABB_1200_07_7 = robotStory("ABB_1200_07_7")
ABB_1200_07_7.storyName = "ABB_1200_07_7"

export const ABB_1300_115_10 = robotStory("ABB_1300_115_10")
ABB_1300_115_10.storyName = "ABB_1300_115_10"

export const FANUC_M10iD12 = robotStory("FANUC_M10iD12")
FANUC_M10iD12.storyName = "FANUC_M10iD12"

export const FANUC_M20iD25 = robotStory("FANUC_M20iD25")
FANUC_M20iD25.storyName = "FANUC_M20iD25"

export const FANUC_CRX10iA = robotStory("FANUC_CRX10iA")
FANUC_CRX10iA.storyName = "FANUC_CRX10iA"

export const FANUC_CRX10iAL = robotStory("FANUC_CRX10iAL")
FANUC_CRX10iAL.storyName = "FANUC_CRX10iAL"

export const FANUC_CRX20iAL = robotStory("FANUC_CRX20iAL")
FANUC_CRX20iAL.storyName = "FANUC_CRX20iAL"

export const FANUC_CRX25iA = robotStory("FANUC_CRX25iA")
FANUC_CRX25iA.storyName = "FANUC_CRX25iA"

export const FANUC_LR_Mate_200iD = robotStory("FANUC_LR_Mate_200iD")
FANUC_LR_Mate_200iD.storyName = "FANUC_LR_Mate_200iD"

export const FANUC_LR_Mate_200iD4S = robotStory("FANUC_LR_Mate_200iD4S")
FANUC_LR_Mate_200iD4S.storyName = "FANUC_LR_Mate_200iD4S"

export const FANUC_LR_Mate_200iD7L = robotStory("FANUC_LR_Mate_200iD7L")
FANUC_LR_Mate_200iD7L.storyName = "FANUC_LR_Mate_200iD7L"

export const KUKA_KR6_R700_2 = robotStory("KUKA_KR6_R700_2")
KUKA_KR6_R700_2.storyName = "KUKA_KR6_R700_2"

export const KUKA_KR6_R700_C4SR_FLR = robotStory("KUKA_KR6_R700_C4SR_FLR")
KUKA_KR6_R700_C4SR_FLR.storyName = "KUKA_KR6_R700_C4SR_FLR"

export const KUKA_KR6_R900_2 = robotStory("KUKA_KR6_R900_2")
KUKA_KR6_R900_2.storyName = "KUKA_KR6_R900_2"

export const KUKA_KR16_R1610_2 = robotStory("KUKA_KR16_R1610_2")
KUKA_KR16_R1610_2.storyName = "KUKA_KR16_R1610_2"

export const KUKA_KR16_R2010_2 = robotStory("KUKA_KR16_R2010_2")
KUKA_KR16_R2010_2.storyName = "KUKA_KR16_R2010_2"

export const KUKA_KR20_R1810_2 = robotStory("KUKA_KR20_R1810_2")
KUKA_KR20_R1810_2.storyName = "KUKA_KR20_R1810_2"

export const KUKA_KR210_R2700_2 = robotStory("KUKA_KR210_R2700_2")
KUKA_KR210_R2700_2.storyName = "KUKA_KR210_R2700_2"

export const KUKA_KR210_R3100_2 = robotStory("KUKA_KR210_R3100_2")
KUKA_KR210_R3100_2.storyName = "KUKA_KR210_R3100_2"

export const KUKA_KR210_R3300_2K = robotStory("KUKA_KR210_R3300_2K")
KUKA_KR210_R3300_2K.storyName = "KUKA_KR210_R3300_2K"

export const UniversalRobots_UR3 = robotStory("UniversalRobots_UR3")
UniversalRobots_UR3.storyName = "UniversalRobots_UR3"

export const UniversalRobots_UR3e = robotStory("UniversalRobots_UR3e")
UniversalRobots_UR3e.storyName = "UniversalRobots_UR3e"

export const UniversalRobots_UR5 = robotStory("UniversalRobots_UR5")
UniversalRobots_UR5.storyName = "UniversalRobots_UR5"

export const UniversalRobots_UR10 = robotStory("UniversalRobots_UR10")
UniversalRobots_UR10.storyName = "UniversalRobots_UR10"

export const UniversalRobots_UR10e = robotStory("UniversalRobots_UR10e")
UniversalRobots_UR10e.storyName = "UniversalRobots_UR10e"

export const UniversalRobots_UR16e = robotStory("UniversalRobots_UR16e")
UniversalRobots_UR16e.storyName = "UniversalRobots_UR16e"

export const UniversalRobots_UR20 = robotStory("UniversalRobots_UR20")
UniversalRobots_UR20.storyName = "UniversalRobots_UR20"

export const Yaskawa_AR900 = robotStory("Yaskawa_AR900")
Yaskawa_AR900.storyName = "Yaskawa_AR900"

export const Yaskawa_AR1440 = robotStory("Yaskawa_AR1440")
Yaskawa_AR1440.storyName = "Yaskawa_AR1440"

export const Yaskawa_AR1730 = robotStory("Yaskawa_AR1730")
Yaskawa_AR1730.storyName = "Yaskawa_AR1730"

export const Yaskawa_AR2010 = robotStory("Yaskawa_AR2010")
Yaskawa_AR2010.storyName = "Yaskawa_AR2010"

export const Yaskawa_AR3120 = robotStory("Yaskawa_AR3120")
Yaskawa_AR3120.storyName = "Yaskawa_AR3120"

export const Yaskawa_GP50 = robotStory("Yaskawa_GP50")
Yaskawa_GP50.storyName = "Yaskawa_GP50"

export const Yaskawa_GP88 = robotStory("Yaskawa_GP88")
Yaskawa_GP88.storyName = "Yaskawa_GP88"
