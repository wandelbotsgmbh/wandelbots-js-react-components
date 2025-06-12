import { Line } from "@react-three/drei"
import type { GetTrajectoryResponse } from "@wandelbots/nova-js/v1"
import * as THREE from "three"

export type TrajectoryRendererProps = {
  trajectory: GetTrajectoryResponse
} & React.JSX.IntrinsicElements["group"]

export function TrajectoryRenderer({
  trajectory,
  ...props
}: TrajectoryRendererProps) {
  const points =
    trajectory.trajectory
      ?.map((point) => {
        if (point.tcp_pose) {
          return new THREE.Vector3(
            point.tcp_pose.position.x / 1000,
            point.tcp_pose.position.z / 1000,
            -point.tcp_pose.position.y / 1000,
          )
        }
        return null
      })
      .filter((point): point is THREE.Vector3 => point !== null) || []

  return (
    <group {...props}>
      {points.length > 0 && (
        <Line
          points={points}
          lineWidth={3}
          polygonOffset={true}
          polygonOffsetFactor={10}
          polygonOffsetUnits={10}
        />
      )}
    </group>
  )
}
