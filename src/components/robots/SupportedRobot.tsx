import { Suspense, useCallback, useEffect, useRef } from "react"

import { ABB_1200_07_7 } from "./ABB_1200_07_7"
import { ABB_1300_115_10 } from "./ABB_1300_115_10"
import { FANUC_ARC_Mate_100iD } from "./FANUC_ARC_Mate_100iD"
import { FANUC_ARC_Mate_120iD } from "./FANUC_ARC_Mate_120iD"
import { FANUC_CRX10iA } from "./FANUC_CRX10iA"
import { FANUC_CRX20iAL } from "./FANUC_CRX20iAL"
import { FANUC_CRX25iA } from "./FANUC_CRX25iA"
import { FANUC_CRX25iAL } from "./FANUC_CRX25iAL"
import { FANUC_LR_Mate_200iD } from "./FANUC_LR_Mate_200iD"
import { FANUC_LR_MATE_200iD7L } from "./FANUC_LR_MATE_200iD7L"
import { KUKA_KR16_R2010_2 } from "./KUKA_KR16_R2010_2"
import { KUKA_KR210_R2700 } from "./KUKA_KR210_R2700"
import { KUKA_KR270_R2700 } from "./KUKA_KR270_R2700"
import { KUKA_KR6_R700_2 } from "./KUKA_KR6_R700_2"
import { UniversalRobots_UR10CB } from "./UniversalRobots_UR10CB"
import { UniversalRobots_UR10e } from "./UniversalRobots_UR10e"
import { UniversalRobots_UR3CB } from "./UniversalRobots_UR3CB"
import { UniversalRobots_UR3e } from "./UniversalRobots_UR3e"
import { UniversalRobots_UR5CB } from "./UniversalRobots_UR5CB"
import { UniversalRobots_UR5e } from "./UniversalRobots_UR5e"
import { Yaskawa_AR1440 } from "./Yaskawa_AR1440"
import { Yaskawa_AR1730 } from "./Yaskawa_AR1730"
import { Yaskawa_AR2010 } from "./Yaskawa_AR2010"
import { Yaskawa_AR3120 } from "./Yaskawa_AR3120"
import { Yaskawa_AR900 } from "./Yaskawa_AR900"
import { Yaskawa_GP50 } from "./Yaskawa_GP50"

import type { GroupProps } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/wandelbots-api-client"
import { DHRobot } from "./DHRobot"

import { ErrorBoundary } from "react-error-boundary"
import * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import RobotAnimator from "./RobotAnimator"
import type { RobotModelComponent } from "./types"

export type DHRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  dhParameters: Array<DHParameter>
} & GroupProps

export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  modelFromController: string
  dhParameters: DHParameter[]
  getModel?: (modelFromController: string) => string
  isGhost?: boolean
} & GroupProps

export function defaultGetModel(modelFromController: string): string {
  return `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components/public/models/${modelFromController}.glb`
}

export const SupportedRobot = externalizeComponent(
  ({
    rapidlyChangingMotionState,
    modelFromController,
    dhParameters,
    getModel = defaultGetModel,
    isGhost = false,
    ...props
  }: SupportedRobotProps) => {
    let Robot: RobotModelComponent | null = null

    const robotRef = useRef<THREE.Group>()

    const setRobotRef = useCallback(
      (instance: THREE.Group | null) => {
        if (!instance) return
        robotRef.current = instance

        if (isGhost) applyGhostStyle()
      },
      [isGhost],
    )

    const applyGhostStyle = () => {
      if (!robotRef.current || robotRef.current.userData.isGhost) return

      robotRef.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.material instanceof THREE.Material) {
            obj.material.colorWrite = true
          }

          // Create a clone of the mesh
          const depth = obj.clone()
          const ghost = obj.clone()

          depth.material = new THREE.MeshStandardMaterial({
            depthTest: true,
            depthWrite: true,
            colorWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: 1,
          })
          depth.userData.isGhost = true

          // Set the material for the ghost mesh
          ghost.material = new THREE.MeshStandardMaterial({
            color: "#D91433",
            opacity: 0.3,
            depthTest: true,
            depthWrite: false,
            transparent: true,
            polygonOffset: true,
            polygonOffsetFactor: -1,
          })
          ghost.userData.isGhost = true

          if (obj.parent) {
            obj.parent.add(depth)
            obj.parent.add(ghost)
          }
        }
      })

      robotRef.current.userData.isGhost = true
    }

    const removeGhostStyle = () => {
      if (!robotRef.current || !robotRef.current.userData.isGhost) return

      const objectsToRemove: THREE.Object3D[] = []

      robotRef.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.userData?.isGhost) {
            objectsToRemove.push(obj)
          } else if (obj.material instanceof THREE.Material) {
            obj.material.colorWrite = true
          }
        }
      })

      objectsToRemove.forEach((obj) => {
        if (obj.parent) {
          obj.parent.remove(obj)
        }
      })

      robotRef.current.userData.isGhost = true
    }

    useEffect(() => {
      if (isGhost) {
        applyGhostStyle()
      } else {
        removeGhostStyle()
      }
    }, [isGhost])

    switch (modelFromController) {
      case "UniversalRobots_UR3":
        Robot = UniversalRobots_UR3CB
        break
      case "UniversalRobots_UR3e":
        Robot = UniversalRobots_UR3e
        break
      case "UniversalRobots_UR5":
        Robot = UniversalRobots_UR5CB
        break
      case "UniversalRobots_UR5e":
        Robot = UniversalRobots_UR5e
        break
      case "UniversalRobots_UR10":
        Robot = UniversalRobots_UR10CB
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
      case "Yaskawa_GP50":
        Robot = Yaskawa_GP50
        break
      case "FANUC_CRX10iA":
        Robot = FANUC_CRX10iA
        break
      case "FANUC_CRX20iAL":
        Robot = FANUC_CRX20iAL
        break
      case "FANUC_CRX25iA":
        Robot = FANUC_CRX25iA
        break
      case "FANUC_CRX25iAL":
        Robot = FANUC_CRX25iAL
        break
      case "FANUC_LR_Mate_200iD":
        Robot = FANUC_LR_Mate_200iD
        break
      case "FANUC_LR_Mate_200iD7L":
        Robot = FANUC_LR_MATE_200iD7L
        break
      case "FANUC_ARC_Mate_120iD":
        Robot = FANUC_ARC_Mate_120iD
        break
      case "FANUC_ARC_Mate_120iD35":
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
      case "KUKA_KR16_R2010_2":
        Robot = KUKA_KR16_R2010_2
        break
      case "KUKA_KR6_R700_2":
        Robot = KUKA_KR6_R700_2
        break
      case "ABB_1200_07_7":
        Robot = ABB_1200_07_7
        break
      case "ABB_1300_115_10":
        Robot = ABB_1300_115_10
        break
      default:
        console.warn(`Unknown robot type: ${modelFromController}`)
        Robot = null
    }

    return (
      <ErrorBoundary
        fallback={
          <DHRobot
            rapidlyChangingMotionState={rapidlyChangingMotionState}
            dhParameters={dhParameters}
            {...props}
          />
        }
      >
        <Suspense
          fallback={
            <DHRobot
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
              {...props}
            />
          }
        >
          <group ref={setRobotRef}>
            {Robot ? (
              <RobotAnimator
                rapidlyChangingMotionState={rapidlyChangingMotionState}
                robotConfig={Robot.config}
              >
                <Robot modelURL={getModel(modelFromController)} {...props} />
              </RobotAnimator>
            ) : (
              <DHRobot
                rapidlyChangingMotionState={rapidlyChangingMotionState}
                dhParameters={dhParameters}
              />
            )}
          </group>
        </Suspense>
        <ConsoleFilter />
      </ErrorBoundary>
    )
  },
)
