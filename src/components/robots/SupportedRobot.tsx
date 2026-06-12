import type { ThreeElements } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { DHRobot } from "./DHRobot"

import { ErrorBoundary } from "react-error-boundary"
import type * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import { GenericRobot } from "./GenericRobot"
import RobotAnimator, { type RobotAnimatorHandle } from "./RobotAnimator"
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
  getModel?: (
    modelFromController: string,
    instanceUrl?: string,
  ) => Promise<string> | undefined
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
    const robotAnimatorRef = useRef<RobotAnimatorHandle>(null)

    const setRobotRef = useCallback((instance: THREE.Group | null) => {
      setRobotGroup(instance)
    }, [])

    // The robot model is loaded asynchronously, so its joint meshes mount
    // into the scene only after RobotAnimator's group ref has already fired.
    // Trigger a joint re-scan once the model is actually rendered so the
    // streamed pose is applied instead of the model's default pose.
    const handlePostModelRender = useCallback(() => {
      robotAnimatorRef.current?.recollectJoints()
      postModelRender?.()
    }, [postModelRender])

    useEffect(() => {
      if (!robotGroup) return

      if (transparentColor) {
        applyGhostStyle(robotGroup, transparentColor)
      } else {
        removeGhostStyle(robotGroup)
      }
    }, [robotGroup, transparentColor])

    const modelURL = useMemo(() => {
      const result = getModel(modelFromController, instanceUrl)
      if (!result) {
        throw new Error(
          `No model found for robot "${modelFromController}". Ensure the model is available or provide a custom getModel function.`,
        )
      }
      return result
    }, [modelFromController, instanceUrl, getModel])

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
              ref={robotAnimatorRef}
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
            >
              <GenericRobot
                modelURL={modelURL}
                postModelRender={handlePostModelRender}
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

export default SupportedRobot
