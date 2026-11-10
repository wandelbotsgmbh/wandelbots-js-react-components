import type { ThreeElements } from "@react-three/fiber"
import { useCallback } from "react"
import type { Group } from "three"
import type { ConnectedMotionGroup } from "../../lib/ConnectedMotionGroup"
import { DHLinearAxis } from "./DHLinearAxis"
import { defaultGetModel } from "./robotModelLogic"
import { SupportedLinearAxis } from "./SupportedLinearAxis"

export type LinearAxisProps = {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => Promise<string>
  flangeRef?: React.Ref<Group>
  transparentColor?: string
  postModelRender?: () => void
} & ThreeElements["group"]

/**
 * The LinearAxis component is a wrapper that renders SupportedLinearAxis if a model is available,
 * otherwise falls back to DHLinearAxis for usage with @wandelbots/nova-js ConnectedMotionGroup object.
 *
 * @param {LinearAxisProps} props - The properties for the LinearAxis component.
 * @param {ConnectedMotionGroup} props.connectedMotionGroup - The connected motion group containing motion state and parameters.
 * @param {Function} [props.getModel] - Optional function to get the model URL. Defaults to defaultGetModel with the connection of the connected motion group (its URL and access token).
 * @param {Object} props - Additional properties passed to the underlying component.
 *
 * @returns {JSX.Element} The rendered SupportedLinearAxis or DHLinearAxis component.
 */
export function LinearAxis({
  connectedMotionGroup,
  getModel,
  flangeRef,
  transparentColor,
  postModelRender,
  ...props
}: LinearAxisProps) {
  // The model from the instance of the motion group, with the access token
  // of its connection
  const getModelOfConnection = useCallback(
    (model: string) => defaultGetModel(model, connectedMotionGroup.nova),
    [connectedMotionGroup],
  )
  const loadModel = getModel ?? getModelOfConnection

  if (!connectedMotionGroup.dhParameters) {
    return null
  }

  const mountingPosition = connectedMotionGroup.mountingPosition
  const mountingQuaternion = connectedMotionGroup.mountingQuaternion

  const modelFromController = connectedMotionGroup.modelFromController || ""
  // getModel always returns a promise: a call here would start a download at
  // every render, also after a failed download. SupportedLinearAxis loads it.
  const hasModel = !!modelFromController

  // Use SupportedLinearAxis if model is available, otherwise fall back to DHLinearAxis
  if (hasModel) {
    return (
      <SupportedLinearAxis
        rapidlyChangingMotionState={
          connectedMotionGroup.rapidlyChangingMotionState
        }
        modelFromController={modelFromController}
        dhParameters={connectedMotionGroup.dhParameters}
        getModel={loadModel}
        flangeRef={flangeRef}
        transparentColor={transparentColor}
        postModelRender={postModelRender}
        chainOffsetPosition={mountingPosition}
        chainOffsetQuaternion={mountingQuaternion}
        {...props}
      />
    )
  }

  return (
    <DHLinearAxis
      rapidlyChangingMotionState={
        connectedMotionGroup.rapidlyChangingMotionState
      }
      dhParameters={connectedMotionGroup.dhParameters}
      chainOffsetPosition={mountingPosition}
      chainOffsetQuaternion={mountingQuaternion}
      {...props}
    />
  )
}

export { defaultGetModel }

export default LinearAxis
