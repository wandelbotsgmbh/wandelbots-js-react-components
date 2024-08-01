import { SafetySetupSafetyZone, Geometry } from "@wandelbots/wandelbots-js"
import * as THREE from "three"
import { ConvexGeometry } from "three-stdlib"
import { type GroupProps } from "@react-three/fiber"

export type SafetyZonesRendererProps = {
  safetyZones: SafetySetupSafetyZone[]
} & GroupProps

export function SafetyZonesRenderer({
  safetyZones,
  ...props
}: SafetyZonesRendererProps) {
  return (
    <group {...props}>
      {safetyZones.map((zone, index) => {
        let geometries: Geometry[] = []
        if (zone.geometry) {
          if (zone.geometry.compound) {
            geometries = zone.geometry.compound.child_geometries
          } else if (zone.geometry.convex_hull) {
            geometries = [zone.geometry]
          }
        }

        return geometries.map((geometry, i) => {
          if (!geometry.convex_hull) return null

          const vertices = geometry.convex_hull.vertices.map(
            (v) => new THREE.Vector3(v.x / 1000, v.y / 1000, v.z / 1000),
          )
          const convexGeometry = new ConvexGeometry(vertices)
          return (
            <>
              <mesh key={`${index}-${i}`} geometry={convexGeometry}>
                <meshStandardMaterial
                  key={index}
                  attach="material"
                  color="#009f4d"
                  opacity={0.2}
                  depthTest={false}
                  depthWrite={false}
                  transparent
                  polygonOffset
                  polygonOffsetFactor={-i}
                />
              </mesh>
            </>
          )
        })
      })}
    </group>
  )
}
