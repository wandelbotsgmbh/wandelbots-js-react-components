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
import { type SupportedRobotModel } from "./getRobotModel"
import RobotAnimator from "./RobotAnimator"

export type DHRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  dhParameters: Array<DHParameter>
} & GroupProps

export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  modelFromController: SupportedRobotModel
  dhParameters: DHParameter[]
  getModel?: (modelFromController: SupportedRobotModel) => string
  isGhost?: boolean
  renderDHRobotWhileLoading?: boolean
  flangeRef?: React.Ref<THREE.Group>
} & GroupProps

export function defaultGetModel(
  modelFromController: SupportedRobotModel,
): string {
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
    renderDHRobotWhileLoading,
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
        <ModelLoadFallback
          renderDHRobot={renderDHRobotWhileLoading}
          rapidlyChangingMotionState={rapidlyChangingMotionState}
          dhParameters={dhParameters}
          {...props}
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
        </ModelLoadFallback>
        <ConsoleFilter />
      </ErrorBoundary>
    )
  },
)

type ModelLoadFallbackProps = {
  renderDHRobot?: boolean
  children: React.ReactNode
} & DHRobotProps

function ModelLoadFallback({
  renderDHRobot,
  children,
  ...props
}: ModelLoadFallbackProps) {
  if (!renderDHRobot) {
    return children
  }

  return <Suspense fallback={<DHRobot {...props} />}>{children}</Suspense>
}
