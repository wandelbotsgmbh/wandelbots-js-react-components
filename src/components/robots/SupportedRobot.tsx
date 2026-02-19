import type { ThreeElements } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import { Suspense, useCallback, useEffect, useState } from "react"
import { DHRobot } from "./DHRobot"

import { ErrorBoundary } from "react-error-boundary"
import type * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import { GenericRobot } from "./GenericRobot"
import RobotAnimator from "./RobotAnimator"
import { applyGhostStyle, removeGhostStyle } from "./ghostStyle"
import { defaultGetModel } from "./robotModelLogic"

export type DHRobotProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: Array<DHParameter>
} & ThreeElements["group"]

export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupState
  modelFromController: string
  dhParameters: DHParameter[]
  flangeRef?: React.Ref<THREE.Group>
  instanceUrl?: string
  getModel?: (modelFromController: string, instanceUrl?: string) => Promise<string> | undefined
  postModelRender?: () => void
  transparentColor?: string
} & ThreeElements["group"]

export const SupportedRobot = externalizeComponent(
  ({
    rapidlyChangingMotionState,
    modelFromController,
    dhParameters,
    getModel = defaultGetModel,
    flangeRef,
    postModelRender,
    transparentColor,
    instanceUrl,
    ...props
  }: SupportedRobotProps) => {
    const [robotGroup, setRobotGroup] = useState<THREE.Group | null>(null)

    const setRobotRef = useCallback((instance: THREE.Group | null) => {
      setRobotGroup(instance)
    }, [])

    useEffect(() => {
      if (!robotGroup) return

      if (transparentColor) {
        applyGhostStyle(robotGroup, transparentColor)
      } else {
        removeGhostStyle(robotGroup)
      }
    }, [robotGroup, transparentColor])

    const dhrobot = (
      <DHRobot
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        dhParameters={dhParameters}
        {...props}
      />
    )

    return (
      <ErrorBoundary
        fallback={dhrobot}
        onError={(err) => {
          // Missing model; show the fallback for now
          console.warn(err)
        }}
      >
        <Suspense fallback={dhrobot}>
          <group ref={setRobotRef}>
            <RobotAnimator
              key={modelFromController}
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
            >
              <GenericRobot
                modelURL={(() => {
                  const result = getModel(modelFromController, instanceUrl)
                  if (!result) {
                    const mockBlob = new Blob([], { type: 'model/gltf-binary' })
                    const mockFile = new File([mockBlob], `${modelFromController}.glb`, { type: 'model/gltf-binary' })
                    return Promise.resolve(URL.createObjectURL(mockFile))
                  }
                  return result
                })()}
                postModelRender={postModelRender}
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
