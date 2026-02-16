import type { ThreeElements } from "@react-three/fiber"

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
 * @param {Function} [props.getModel=defaultGetModel] - Optional function to get the model URL. Defaults to defaultGetModel.
 * @param {Object} props - Additional properties passed to the underlying component.
 *
 * @returns {JSX.Element} The rendered SupportedLinearAxis or DHLinearAxis component.
 */
export function LinearAxis({
  connectedMotionGroup,
  getModel = defaultGetModel,
  flangeRef,
  transparentColor,
  postModelRender,
  ...props
}: LinearAxisProps) {
  if (!connectedMotionGroup.dhParameters) {
    return null
  }

  const modelFromController = connectedMotionGroup.modelFromController || ""
  const hasModel = modelFromController && getModel(modelFromController)

  // Use SupportedLinearAxis if model is available, otherwise fall back to DHLinearAxis
  if (hasModel) {
    return (
      <SupportedLinearAxis
        rapidlyChangingMotionState={
          connectedMotionGroup.rapidlyChangingMotionState
        }
        modelFromController={modelFromController}
        dhParameters={connectedMotionGroup.dhParameters}
        getModel={getModel}
        flangeRef={flangeRef}
        transparentColor={transparentColor}
        postModelRender={postModelRender}
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
      {...props}
    />
  )
}

export { defaultGetModel }

