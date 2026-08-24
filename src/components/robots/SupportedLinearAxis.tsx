import type { ThreeElements } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import { Suspense, useCallback, useEffect, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import type * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import { useSmoothedMotionState } from "../utils/useSmoothedMotionState"
import { DHLinearAxis } from "./DHLinearAxis"
import { GenericRobot } from "./GenericRobot"
import LinearAxisAnimator from "./LinearAxisAnimator"
import { applyGhostStyle, removeGhostStyle } from "./ghostStyle"
import { defaultGetModel } from "./robotModelLogic"

export type DHLinearAxisProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: Array<DHParameter>
} & ThreeElements["group"]

export type SupportedLinearAxisProps = {
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

/**
 * Renders the linear axis at exactly the pose it is given, frame by frame — no
 * smoothing, so it tracks the streamed motion state with no lag or overshoot.
 *
 * Use this when the incoming stream is already the exact pose to display. For
 * spring-damped transitions, use {@link SupportedLinearAxis}, or compose
 * {@link useSmoothedMotionState} with this component yourself.
 */
export const SupportedLinearAxisExact = externalizeComponent(
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
  }: SupportedLinearAxisProps) => {
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

    const dhLinearAxis = (
      <DHLinearAxis
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        dhParameters={dhParameters}
        {...props}
      />
    )

    return (
      <ErrorBoundary
        fallback={dhLinearAxis}
        onError={(err) => {
          // Missing model; show the fallback for now
          console.warn(err)
        }}
      >
        <Suspense fallback={dhLinearAxis}>
          <group ref={setRobotRef}>
            <LinearAxisAnimator
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
            >
              <GenericRobot
                modelURL={(() => {
                  const result = getModel(modelFromController, instanceUrl)
                  if (!result) {
                    const mockBlob = new Blob([], { type: "model/gltf-binary" })
                    const mockFile = new File(
                      [mockBlob],
                      `${modelFromController}.glb`,
                      { type: "model/gltf-binary" },
                    )
                    return Promise.resolve(URL.createObjectURL(mockFile))
                  }
                  return result
                })()}
                postModelRender={postModelRender}
                flangeRef={flangeRef}
                {...props}
              />
            </LinearAxisAnimator>
          </group>
        </Suspense>
        <ConsoleFilter />
      </ErrorBoundary>
    )
  },
)

/**
 * Linear axis visualizer with built-in spring smoothing of the joint stream.
 *
 * Thin wrapper that runs the incoming motion state through
 * {@link useSmoothedMotionState} and renders {@link SupportedLinearAxisExact}.
 * It is the batteries-included default; drop down to `SupportedLinearAxisExact`
 * when you need to control or disable smoothing.
 */
export const SupportedLinearAxis = externalizeComponent(
  ({ rapidlyChangingMotionState, ...props }: SupportedLinearAxisProps) => {
    const smoothedMotionState = useSmoothedMotionState(
      rapidlyChangingMotionState,
    )

    return (
      <SupportedLinearAxisExact
        rapidlyChangingMotionState={smoothedMotionState}
        {...props}
      />
    )
  },
)

export default SupportedLinearAxis
