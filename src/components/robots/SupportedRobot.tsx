import type { ThreeElements } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupState,
  Pose,
} from "@wandelbots/nova-js/v2"
import { Suspense, useCallback, useMemo, useRef } from "react"
import { DHRobot } from "./DHRobot"

import { ErrorBoundary } from "react-error-boundary"
import type * as THREE from "three"
import { externalizeComponent } from "../../externalizeComponent"
import ConsoleFilter from "../ConsoleFilter"
import { GenericRobot } from "./GenericRobot"
import RobotAnimator, { type RobotAnimatorHandle } from "./RobotAnimator"
import { useGhostStyle } from "./ghostStyle"
import { defaultGetModel } from "./robotModelLogic"
import { useFrameSmoothedMotionState } from "./useFrameSmoothedMotionState"

export type DHRobotProps = {
  rapidlyChangingMotionState: MotionGroupState
  dhParameters: Array<DHParameter>
  /**
   * The transform between the motion group's base frame and the start of
   * its DH chain (the kinematic model's `kinematic_chain_offset`)
   */
  kinematicChainOffset?: Pose | null
} & ThreeElements["group"]

export type SupportedRobotProps = {
  rapidlyChangingMotionState: MotionGroupState
  modelFromController: string
  dhParameters: DHParameter[]
  /**
   * The robot's serial number: a copy of its model registered for it is
   * drawn instead, if there is one (see `defaultGetModel`)
   */
  serialNumber?: string
  /**
   * The transform between the motion group's base frame and the start of
   * its DH chain (the kinematic model's `kinematic_chain_offset`): the root
   * joint is placed by it, whatever the model file says
   */
  kinematicChainOffset?: Pose | null
  /** Where the robot is mounted, in metres (the motion group's mounting) */
  chainOffsetPosition?: [number, number, number]
  /** How the robot is mounted (the motion group's mounting) */
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
 * Renders the robot at exactly the pose it is given, frame by frame — no
 * smoothing, so it tracks the streamed motion state with no lag or overshoot.
 *
 * Use this when the incoming stream is already the exact pose to display (e.g.
 * scrubbing a planned trajectory). For spring-damped transitions, use
 * {@link SupportedRobot}, or compose {@link useSmoothedMotionState} with this
 * component yourself.
 */
export const SupportedRobotExact = externalizeComponent(
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
  }: SupportedRobotProps) => {
    const robotAnimatorRef = useRef<RobotAnimatorHandle>(null)
    const ghost = useGhostStyle(transparentColor, transparentOpacity)

    // The robot model is loaded asynchronously, so its joint meshes mount
    // into the scene only after RobotAnimator's group ref has already fired.
    // Trigger a joint re-scan once the model is actually rendered so the
    // streamed pose is applied instead of the model's default pose, and
    // style its meshes as a ghost.
    const { styleDrawnModel } = ghost
    const handlePostModelRender = useCallback(() => {
      robotAnimatorRef.current?.recollectJoints()
      styleDrawnModel()
      postModelRender?.()
    }, [postModelRender, styleDrawnModel])

    const modelURL = useMemo(() => {
      const result = getModel(modelFromController, instanceUrl, serialNumber)
      if (!result) {
        throw new Error(
          `No model found for robot "${modelFromController}". Ensure the model is available or provide a custom getModel function.`,
        )
      }
      return result
    }, [modelFromController, instanceUrl, serialNumber, getModel])

    const dhrobot = (
      <DHRobot
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        dhParameters={dhParameters}
        kinematicChainOffset={kinematicChainOffset}
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
          <group ref={ghost.groupRef}>
            <RobotAnimator
              ref={robotAnimatorRef}
              rapidlyChangingMotionState={rapidlyChangingMotionState}
              dhParameters={dhParameters}
              chainOffsetPosition={chainOffsetPosition}
              chainOffsetQuaternion={chainOffsetQuaternion}
            >
              <GenericRobot
                modelURL={modelURL}
                postModelRender={handlePostModelRender}
                flangeRef={flangeRef}
                dhParameters={dhParameters}
                kinematicChainOffset={kinematicChainOffset}
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

/**
 * Robot visualizer with built-in spring smoothing of the joint stream.
 *
 * This is a thin wrapper that runs the incoming motion state through the
 * spring of {@link useSmoothedMotionState}, stepped in the canvas's frame loop
 * so that each drawn frame shows the spring at its own time, and renders
 * {@link SupportedRobotExact}. It is the batteries-included default; drop down
 * to `SupportedRobotExact` (optionally with your own
 * {@link useSmoothedMotionState} configuration) when you need to control or
 * disable smoothing.
 */
export const SupportedRobot = externalizeComponent(
  ({ rapidlyChangingMotionState, ...props }: SupportedRobotProps) => {
    const smoothedMotionState = useFrameSmoothedMotionState(
      rapidlyChangingMotionState,
    )

    return (
      <SupportedRobotExact
        rapidlyChangingMotionState={smoothedMotionState}
        {...props}
      />
    )
  },
)

export default SupportedRobot
