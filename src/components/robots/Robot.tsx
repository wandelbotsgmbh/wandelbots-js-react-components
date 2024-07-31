import { type GroupProps } from "@react-three/fiber"

import type { ConnectedMotionGroup } from "@wandelbots/wandelbots-js"
import { defaultGetModel, SupportedRobot } from "./SupportedRobot"

export type ConnectecMotionGroupRobotProps = {
  connectedMotionGroup: ConnectedMotionGroup
  getModel?: (modelFromController: string) => string
} & GroupProps

/**
 * The Robot component is a wrapper around the SupportedRobot component
 * for usage with @wandelbots/wandelbots-js ConnectedMotionGroup object.
 *
 * @param {ConnectecMotionGroupRobotProps} props - The properties for the Robot component.
 * @param {ConnectedMotionGroup} props.connectedMotionGroup - The connected motion group containing motion state and parameters.
 * @param {Function} [props.getModel=defaultGetModel] - Optional function to get the model URL. Defaults to defaultGetModel.
 * @param {Object} props - Additional properties passed to the SupportedRobot component.
 *
 * @returns {JSX.Element} The rendered SupportedRobot component.
 */
export function Robot({
  connectedMotionGroup,
  getModel = defaultGetModel,
  ...props
}: ConnectecMotionGroupRobotProps) {
  return (
    <SupportedRobot
      rapidlyChangingMotionState={
        connectedMotionGroup.rapidlyChangingMotionState
      }
      modelFromController={connectedMotionGroup.modelFromController}
      dhParameters={connectedMotionGroup.dhParameters}
      getModel={getModel}
      {...props}
    />
  )
}
