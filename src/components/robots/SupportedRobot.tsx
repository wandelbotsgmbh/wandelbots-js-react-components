import type { ThreeElements } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
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
  rapidlyChangingMotionState: MotionGroupStateResponse
  dhParameters: Array<DHParameter>
} & ThreeElements["group"]

export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  modelFromController: string
  dhParameters: DHParameter[]
  flangeRef?: React.Ref<THREE.Group>
  getModel?: (modelFromController: string) => string
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
          console.error(err)
        }}
      >
        <Suspense fallback={dhrobot}>
          <group ref={setRobotRef}>
            <RobotAnimator
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
            >
              <GenericRobot
                modelURL={getModel(modelFromController)}
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
