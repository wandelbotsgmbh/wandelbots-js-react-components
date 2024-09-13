import type { GroupProps } from "@react-three/fiber"

export type RobotModelProps = {
  modelURL: string
} & GroupProps

/**
 * Configuration needed to render a specific robot model that
 * isn't already handled by the gltf => tsx export
 */
export type RobotModelConfig = {
  rotationOffsets?: number[]
  rotationSign?: number[]
}

export type RobotModelComponent = {
  (props: RobotModelProps): JSX.Element
  config?: RobotModelConfig
}
