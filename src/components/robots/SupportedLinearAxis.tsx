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
import { ErrorBoundary } from "react-error-boundary"
import type * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import { useSmoothedMotionState } from "../utils/useSmoothedMotionState"
import { DHLinearAxis } from "./DHLinearAxis"
import { GenericRobot } from "./GenericRobot"
import LinearAxisAnimator, {
  type LinearAxisAnimatorHandle,
} from "./LinearAxisAnimator"
import { applyGhostStyle, removeGhostStyle } from "./ghostStyle"
import { defaultGetModel } from "./robotModelLogic"

export type DHLinearAxisProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: Array<DHParameter>
  chainOffsetPosition?: [number, number, number]
  chainOffsetQuaternion?: THREE.Quaternion
} & ThreeElements["group"]

export type SupportedLinearAxisProps = {
  rapidlyChangingMotionState: MotionGroupState
  modelFromController: string
  dhParameters: DHParameter[]
  chainOffsetPosition?: [number, number, number]
  chainOffsetQuaternion?: THREE.Quaternion
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
    chainOffsetPosition,
    chainOffsetQuaternion,
    getModel = defaultGetModel,
    flangeRef,
    postModelRender,
    transparentColor,
    instanceUrl,
    ...props
  }: SupportedLinearAxisProps) => {
    const [robotGroup, setRobotGroup] = useState<THREE.Group | null>(null)
    const linearAxisAnimatorRef = useRef<LinearAxisAnimatorHandle>(null)

    const setRobotRef = useCallback((instance: THREE.Group | null) => {
      setRobotGroup(instance)
    }, [])

    // The model is loaded asynchronously, so its joint meshes mount into the
    // scene only after LinearAxisAnimator's group ref has already fired.
    // Trigger a joint re-scan once the model is actually rendered so the
    // streamed position is applied instead of the model's default position.
    const handlePostModelRender = useCallback(() => {
      linearAxisAnimatorRef.current?.recollectJoints()
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

    // One call of getModel per model, not one per render: after a failed
    // download, each call of defaultGetModel starts a new download
    const modelURL = useMemo(() => {
      const result = getModel(modelFromController, instanceUrl)
      if (!result) {
        const mockBlob = new Blob([], { type: "model/gltf-binary" })
        const mockFile = new File([mockBlob], `${modelFromController}.glb`, {
          type: "model/gltf-binary",
        })
        return Promise.resolve(URL.createObjectURL(mockFile))
      }
      return result
    }, [modelFromController, instanceUrl, getModel])

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
              ref={linearAxisAnimatorRef}
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
              chainOffsetPosition={chainOffsetPosition}
              chainOffsetQuaternion={chainOffsetQuaternion}
            >
              <GenericRobot
                modelURL={modelURL}
                postModelRender={handlePostModelRender}
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
