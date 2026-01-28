import type { ThreeElements } from "@react-three/fiber"

import type { Group } from "three"
import type { ConnectedMotionGroup } from "../../lib/ConnectedMotionGroup"
import { defaultGetModel } from "./robotModelLogic"
import { SupportedRobot } from "./SupportedRobot"

export type RobotProps = {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => Promise<string>
  flangeRef?: React.Ref<Group>
  transparentColor?: string
  postModelRender?: () => void
} & ThreeElements["group"]

/**
 * The Robot component is a wrapper around the SupportedRobot component
 * for usage with @wandelbots/nova-js ConnectedMotionGroup object.
 *
 * @param {RobotProps} props - The properties for the Robot component.
 * @param {ConnectedMotionGroup} props.connectedMotionGroup - The connected motion group containing motion state and parameters.
 * @param {Function} [props.getModel=defaultGetModel] - Optional function to get the model URL. Defaults to defaultGetModel.
 * @param {Object} props - Additional properties passed to the SupportedRobot component.
 *
 * @returns {JSX.Element} The rendered SupportedRobot component.
 */
export function Robot({
  connectedMotionGroup,
  getModel = defaultGetModel,
  flangeRef,
  transparentColor,
  postModelRender,
  ...props
}: RobotProps) {
  if (!connectedMotionGroup.dhParameters) {
    return null
  }

  return (
    <SupportedRobot
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
