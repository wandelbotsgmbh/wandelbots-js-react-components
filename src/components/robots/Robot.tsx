import { type ThreeElements } from "@react-three/fiber"

import type { ConnectedMotionGroup } from "@wandelbots/nova-js/v1"
import type { Group } from "three"
import { SupportedRobot } from "./SupportedRobot"
import { defaultGetModel } from "./robotModelLogic"

export type RobotProps = {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => string
  flangeRef?: React.Ref<Group>
  transparentColor?: string
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
      {...props}
    />
  )
}
