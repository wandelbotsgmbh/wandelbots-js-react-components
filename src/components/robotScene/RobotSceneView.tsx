import { useTheme } from "@mui/material/styles"
import type {
  MotionGroupDescription,
  MotionGroupState,
} from "@wandelbots/nova-js/v2"
import { type ReactNode, type Ref, useCallback, useMemo } from "react"
import type { Group } from "three"
import { PresetEnvironment } from "../3d-viewport/PresetEnvironment"
import { SafetyZonesRenderer } from "../3d-viewport/SafetyZonesRenderer"
import { MODEL_ROTATION } from "../robots/modelRotation"
import {
  MotionGroupVisualizer,
  MotionGroupVisualizerExact,
} from "../robots/MotionGroupVisualizer"
import { defaultGetModel } from "../robots/robotModelLogic"
import type { RobotModelSource } from "../robots/robotModelSource"
import type { SupportedRobotProps } from "../robots/SupportedRobot"
import { JoggingAxes, type JoggingAxesProps } from "./JoggingAxes"

/** Props of {@link RobotSceneView} */
export type RobotSceneViewProps = {
  /** The robot, drawn at its mounting; see `RobotModelSource` */
  robot: RobotModelSource
  /**
   * Gives the URL of the model file. Defaults to `defaultGetModel`,
   * downloading from the robot's `nova` connection.
   */
  getModel?: SupportedRobotProps["getModel"]
  /** The safety zones of the robot's controller; none if left out */
  safetyZones?: MotionGroupDescription["safety_zones"]
  /**
   * The joints at the end of a planned motion, drawn as a ghost of the
   * robot; none if left out
   */
  plannedJoints?: number[] | null
  /** The axes jogging moves along; none if left out */
  jogAxes?: JoggingAxesProps
  /**
   * Whether the robot is shown. Hiding it keeps it in the scene, moving with
   * its motion state, so that parts drawn from its joints stay in place.
   */
  robotVisible?: boolean
  /** The group at the robot's mounting, which holds the robot and its ghost */
  robotRef?: Ref<Group>
  /** Called when the robot's model is drawn */
  onModelDrawn?: () => void
  /**
   * Whether the scene brings its light: `PresetEnvironment` and a light that
   * casts the robot's shadow. Turn it off where the app lights its scene.
   */
  lighting?: boolean
  /** The app's own parts of the scene, in NOVA's coordinates */
  children?: ReactNode
}

// RobotPad's light, which casts the robot's shadow, in the model's frame
const LIGHT_POSITION: [number, number, number] = [-4, 1, 4]

/** What the ghost needs of a motion state: its joints */
const GHOST_STATE: Omit<MotionGroupState, "joint_position"> = {
  timestamp: "",
  sequence_number: 0,
  motion_group: "",
  controller: "",
  joint_limit_reached: { limit_reached: [] },
  standstill: true,
  description_revision: 0,
}

/**
 * A robot's scene for a React Three Fiber `<Canvas>` of the app: the robot at
 * its mounting, the ghost of a planned motion, the safety zones, the axes
 * jogging moves along and the light. It draws in NOVA's coordinates: Z up, in
 * metres. In a scene that is Y up, turn it: `<group rotation={[-Math.PI / 2, 0, 0]}>`.
 * The camera, its controls, the floor and the background are the app's: to
 * fit the camera to the robot, fit it to `robotRef`, the group of the robot
 * and its ghost (without the safety zones).
 *
 * Props in, nothing out: {@link RobotScene} gives them from a robot session.
 */
export function RobotSceneView({
  robot,
  getModel,
  safetyZones,
  plannedJoints,
  jogAxes,
  robotVisible = true,
  robotRef,
  onModelDrawn,
  lighting = true,
  children,
}: RobotSceneViewProps) {
  const theme = useTheme()

  // The model from the robot's instance; made again only for another
  // connection, as Robot does
  const nova = robot.nova
  const getModelOfConnection = useCallback(
    (model: string, _instanceUrl?: string, serialNumber?: string) =>
      defaultGetModel(model, nova, serialNumber),
    [nova],
  )
  const loadModel = getModel ?? getModelOfConnection

  const ghostState = useMemo(
    () =>
      plannedJoints ? { ...GHOST_STATE, joint_position: plannedJoints } : null,
    [plannedJoints],
  )

  if (!robot.dhParameters) return null

  const model = {
    // The model comes from loadModel
    instanceUrl: "",
    getModel: loadModel,
    inverseSolver: robot.inverseSolver,
    modelFromController: robot.modelFromController ?? "",
    serialNumber: robot.serialNumber,
    dhParameters: robot.dhParameters,
    kinematicChainOffset: robot.kinematicChainOffset,
  }

  return (
    <>
      {safetyZones && (
        <SafetyZonesRenderer
          safetyZones={safetyZones}
          dhParameters={robot.dhParameters}
        />
      )}

      <group
        ref={robotRef}
        position={robot.mountingPosition}
        quaternion={robot.mountingQuaternion}
      >
        <group rotation={MODEL_ROTATION}>
          <group visible={robotVisible}>
            <MotionGroupVisualizer
              {...model}
              rapidlyChangingMotionState={robot.rapidlyChangingMotionState}
              postModelRender={onModelDrawn}
            />
          </group>

          {ghostState && (
            <MotionGroupVisualizerExact
              {...model}
              rapidlyChangingMotionState={ghostState}
              transparentColor={theme.palette.success.main}
            />
          )}

          {lighting && (
            <directionalLight
              position={LIGHT_POSITION}
              castShadow
              intensity={1}
            />
          )}
        </group>
      </group>

      {jogAxes && <JoggingAxes {...jogAxes} />}

      {lighting && <PresetEnvironment />}

      {children}
    </>
  )
}
