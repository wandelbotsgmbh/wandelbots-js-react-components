import type { ThreeElements } from "@react-three/fiber"
import { useCallback } from "react"
import type { Group } from "three"
import type { ConnectedMotionGroup } from "../../lib/ConnectedMotionGroup"
import { defaultGetModel } from "./robotModelLogic"
import type { RobotModelSource } from "./robotModelSource"
import { SupportedRobot } from "./SupportedRobot"

/**
 * The robot to draw: `motionGroup`, or the `connectedMotionGroup` of
 * earlier versions
 */
export type RobotMotionGroupProps =
  | {
      /**
       * The robot to draw: `robotModelOf(session)`, a `ConnectedMotionGroup`,
       * or the app's own data
       */
      motionGroup: RobotModelSource
      connectedMotionGroup?: never
    }
  | {
      /** @deprecated Use `motionGroup`, which takes a ConnectedMotionGroup as it is */
      connectedMotionGroup: ConnectedMotionGroup
      motionGroup?: never
    }

export type RobotProps = RobotMotionGroupProps & {
  getModel?: (modelFromController: string) => Promise<string>
  flangeRef?: React.Ref<Group>
  transparentColor?: string
  postModelRender?: () => void
} & ThreeElements["group"]

/**
 * A robot of a NOVA cell in its model, at its mounting, moving as its motion
 * state does: {@link SupportedRobot} for a {@link RobotModelSource}.
 *
 * ```tsx
 * <Robot motionGroup={robotModelOf(session)} />
 * ```
 *
 * @param props.motionGroup - The robot to draw, see {@link RobotModelSource}
 * @param props.getModel - Gives the URL of the model file. Defaults to {@link defaultGetModel}, downloading from the robot's `nova` connection (its URL and access token).
 * @param props - Further properties go to SupportedRobot.
 */
export function Robot({
  motionGroup,
  connectedMotionGroup,
  getModel,
  flangeRef,
  transparentColor,
  postModelRender,
  ...props
}: RobotProps) {
  const robot: RobotModelSource | undefined =
    motionGroup ?? connectedMotionGroup

  // The model from the instance of the robot, with the access token of its
  // connection. Made again only for another connection: an app may give a
  // new motionGroup object at every render.
  const nova = robot?.nova
  const getModelOfConnection = useCallback(
    (model: string) => defaultGetModel(model, nova),
    [nova],
  )

  if (!robot?.dhParameters) {
    return null
  }

  return (
    <SupportedRobot
      rapidlyChangingMotionState={robot.rapidlyChangingMotionState}
      modelFromController={robot.modelFromController || ""}
      dhParameters={robot.dhParameters}
      getModel={getModel ?? getModelOfConnection}
      flangeRef={flangeRef}
      transparentColor={transparentColor}
      postModelRender={postModelRender}
      chainOffsetPosition={robot.mountingPosition}
      chainOffsetQuaternion={robot.mountingQuaternion}
      {...props}
    />
  )
}

export { defaultGetModel }

export default Robot
