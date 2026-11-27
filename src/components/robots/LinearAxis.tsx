import type { ThreeElements } from "@react-three/fiber"
import { useCallback } from "react"
import type { Group } from "three"
import { DHLinearAxis } from "./DHLinearAxis"
import type { RobotMotionGroupProps } from "./Robot"
import { defaultGetModel } from "./robotModelLogic"
import type { RobotModelSource } from "./robotModelSource"
import { SupportedLinearAxis } from "./SupportedLinearAxis"

export type LinearAxisProps = RobotMotionGroupProps & {
  getModel?: (modelFromController: string) => Promise<string>
  flangeRef?: React.Ref<Group>
  /** See `transparentColor` of `SupportedRobot` */
  transparentColor?: string
  /** See `transparentOpacity` of `SupportedRobot` */
  transparentOpacity?: number
  postModelRender?: () => void
} & ThreeElements["group"]

/**
 * A linear axis of a NOVA cell: {@link SupportedLinearAxis} with its model,
 * or `DHLinearAxis` from its DH parameters when the controller reports
 * no model.
 *
 * ```tsx
 * <LinearAxis motionGroup={connectedMotionGroup} />
 * ```
 *
 * @param props.motionGroup - The axis to draw, see {@link RobotModelSource}
 * @param props.getModel - Gives the URL of the model file. Defaults to {@link defaultGetModel}, downloading from the axis's `nova` connection (its URL and access token).
 * @param props - Further properties go to the underlying component.
 */
export function LinearAxis({
  motionGroup,
  connectedMotionGroup,
  getModel,
  flangeRef,
  transparentColor,
  transparentOpacity,
  postModelRender,
  ...props
}: LinearAxisProps) {
  const axis: RobotModelSource | undefined = motionGroup ?? connectedMotionGroup

  // The model from the instance of the axis, with the access token of its
  // connection. Made again only for another connection: an app may give a
  // new motionGroup object at every render.
  const nova = axis?.nova
  const getModelOfConnection = useCallback(
    (model: string, _instanceUrl?: string, serialNumber?: string) =>
      defaultGetModel(model, nova, serialNumber),
    [nova],
  )
  const loadModel = getModel ?? getModelOfConnection

  if (!axis?.dhParameters) {
    return null
  }

  const modelFromController = axis.modelFromController || ""
  // getModel always returns a promise: a call here would start a download at
  // every render, also after a failed download. SupportedLinearAxis loads it.
  const hasModel = !!modelFromController

  // Use SupportedLinearAxis if model is available, otherwise fall back to DHLinearAxis
  if (hasModel) {
    return (
      <SupportedLinearAxis
        rapidlyChangingMotionState={axis.rapidlyChangingMotionState}
        modelFromController={modelFromController}
        dhParameters={axis.dhParameters}
        serialNumber={axis.serialNumber}
        kinematicChainOffset={axis.kinematicChainOffset}
        getModel={loadModel}
        flangeRef={flangeRef}
        transparentColor={transparentColor}
        transparentOpacity={transparentOpacity}
        postModelRender={postModelRender}
        chainOffsetPosition={axis.mountingPosition}
        chainOffsetQuaternion={axis.mountingQuaternion}
        {...props}
      />
    )
  }

  return (
    <DHLinearAxis
      rapidlyChangingMotionState={axis.rapidlyChangingMotionState}
      dhParameters={axis.dhParameters}
      chainOffsetPosition={axis.mountingPosition}
      chainOffsetQuaternion={axis.mountingQuaternion}
      {...props}
    />
  )
}

export { defaultGetModel }

export default LinearAxis
