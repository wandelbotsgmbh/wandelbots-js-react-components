import { Suspense, useCallback, useEffect, useRef } from "react"

import { version } from "../../../package.json"

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
import { GenericRobot } from "./GenericRobot"
import RobotAnimator from "./RobotAnimator"

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
  flangeRef?: React.MutableRefObject<THREE.Group>
} & GroupProps

export function defaultGetModel(modelFromController: string): string {
  let useVersion = version
  if (version.startsWith("0.")) {
    useVersion = ""
  }
  return `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components${useVersion ? `@${useVersion}` : ""}/public/models/${modelFromController}.glb`
}

export const SupportedRobot = externalizeComponent(
  ({
    rapidlyChangingMotionState,
    modelFromController,
    dhParameters,
    getModel = defaultGetModel,
    isGhost = false,
    flangeRef,
    ...props
  }: SupportedRobotProps) => {
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
            <RobotAnimator
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
            >
              <GenericRobot
                modelURL={getModel(modelFromController)}
                flangeRef={flangeRef}
                {...props}
              />
            </RobotAnimator>
          </group>
        </Suspense>
        <ConsoleFilter />
      </ErrorBoundary>
    )
  },
)
