import type { ThreeElements } from "@react-three/fiber"

import type { Group } from "three"
import type { ConnectedMotionGroup } from "../../lib/ConnectedMotionGroup"
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
 * The LinearAxis component is a wrapper around the SupportedLinearAxis component
 * for usage with @wandelbots/nova-js ConnectedMotionGroup object.
 *
 * @param {LinearAxisProps} props - The properties for the LinearAxis component.
 * @param {ConnectedMotionGroup} props.connectedMotionGroup - The connected motion group containing motion state and parameters.
 * @param {Function} [props.getModel=defaultGetModel] - Optional function to get the model URL. Defaults to defaultGetModel.
 * @param {Object} props - Additional properties passed to the SupportedLinearAxis component.
 *
 * @returns {JSX.Element} The rendered SupportedLinearAxis component.
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

  return (
    <SupportedLinearAxis
      rapidlyChangingMotionState={
        connectedMotionGroup.rapidlyChangingMotionState
      }
      modelFromController={connectedMotionGroup.modelFromController || ""}
      dhParameters={connectedMotionGroup.dhParameters}
      getModel={getModel}
      flangeRef={flangeRef}
      transparentColor={transparentColor}
      postModelRender={postModelRender}
      {...props}
    />
  )
}

export { defaultGetModel }

