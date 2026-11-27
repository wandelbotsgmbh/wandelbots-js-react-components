import type { ThreeElements } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupState,
  Pose,
} from "@wandelbots/nova-js/v2"
import { Suspense, useCallback, useMemo, useRef } from "react"
import { ErrorBoundary } from "react-error-boundary"
import type * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import { DHLinearAxis } from "./DHLinearAxis"
import { GenericRobot } from "./GenericRobot"
import LinearAxisAnimator, {
  type LinearAxisAnimatorHandle,
} from "./LinearAxisAnimator"
import { useGhostStyle } from "./ghostStyle"
import { defaultGetModel } from "./robotModelLogic"
import { useFrameSmoothedMotionState } from "./useFrameSmoothedMotionState"

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
  /**
   * The axis's serial number: a copy of its model registered for it is
   * drawn instead, if there is one (see `defaultGetModel`)
   */
  serialNumber?: string
  /**
   * The transform between the motion group's base frame and the start of
   * its DH chain (the kinematic model's `kinematic_chain_offset`): the rail
   * is placed by it, whatever the model file says
   */
  kinematicChainOffset?: Pose | null
  /** Where the axis is mounted, in metres (the motion group's mounting) */
  chainOffsetPosition?: [number, number, number]
  /** How the axis is mounted (the motion group's mounting) */
  chainOffsetQuaternion?: THREE.Quaternion
  flangeRef?: React.Ref<THREE.Group>
  instanceUrl?: string
  getModel?: (
    modelFromController: string,
    instanceUrl?: string,
    serialNumber?: string,
  ) => Promise<string> | undefined
  postModelRender?: () => void
  /**
   * Draws the robot as a see-through ghost in this colour, e.g. a planned
   * pose. Each ghost gets materials of its own, so several ghosts of one
   * model can have their own colours and opacities.
   */
  transparentColor?: string
  /** The opacity of the ghost of `transparentColor`, from 0 to 1. Default: 0.3 */
  transparentOpacity?: number
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
    serialNumber,
    kinematicChainOffset,
    chainOffsetPosition,
    chainOffsetQuaternion,
    getModel = defaultGetModel,
    flangeRef,
    postModelRender,
    transparentColor,
    transparentOpacity,
    instanceUrl,
    ...props
  }: SupportedLinearAxisProps) => {
    const linearAxisAnimatorRef = useRef<LinearAxisAnimatorHandle>(null)
    const ghost = useGhostStyle(transparentColor, transparentOpacity)

    // The model is loaded asynchronously, so its joint meshes mount into the
    // scene only after LinearAxisAnimator's group ref has already fired.
    // Trigger a joint re-scan once the model is actually rendered so the
    // streamed position is applied instead of the model's default position,
    // and style its meshes as a ghost.
    const { styleDrawnModel } = ghost
    const handlePostModelRender = useCallback(() => {
      linearAxisAnimatorRef.current?.recollectJoints()
      styleDrawnModel()
      postModelRender?.()
    }, [postModelRender, styleDrawnModel])

    // One call of getModel per model, not one per render: after a failed
    // download, each call of defaultGetModel starts a new download
    const modelURL = useMemo(() => {
      const result = getModel(modelFromController, instanceUrl, serialNumber)
      if (!result) {
        const mockBlob = new Blob([], { type: "model/gltf-binary" })
        const mockFile = new File([mockBlob], `${modelFromController}.glb`, {
          type: "model/gltf-binary",
        })
        return Promise.resolve(URL.createObjectURL(mockFile))
      }
      return result
    }, [modelFromController, instanceUrl, serialNumber, getModel])

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
          <group ref={ghost.groupRef}>
            <LinearAxisAnimator
              ref={linearAxisAnimatorRef}
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
              chainOffsetPosition={chainOffsetPosition}
              chainOffsetQuaternion={chainOffsetQuaternion}
            >
              {/* The DH chain and its offset place the rail and hoist each
                  joint's rest pose, so the animator slides the carriage
                  along the rail */}
              <GenericRobot
                modelURL={modelURL}
                postModelRender={handlePostModelRender}
                flangeRef={flangeRef}
                dhParameters={dhParameters}
                kinematicChainOffset={kinematicChainOffset}
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
 * Thin wrapper that runs the incoming motion state through the spring of
 * {@link useSmoothedMotionState}, stepped in the canvas's frame loop so that
 * each drawn frame shows the spring at its own time, and renders
 * {@link SupportedLinearAxisExact}. It is the batteries-included default; drop
 * down to `SupportedLinearAxisExact` when you need to control or disable
 * smoothing.
 */
export const SupportedLinearAxis = externalizeComponent(
  ({ rapidlyChangingMotionState, ...props }: SupportedLinearAxisProps) => {
    const smoothedMotionState = useFrameSmoothedMotionState(
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
