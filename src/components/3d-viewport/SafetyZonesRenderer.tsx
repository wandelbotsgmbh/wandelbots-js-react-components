import { type ThreeElements } from "@react-three/fiber"
import type { Collider, ConvexHull, MotionGroupDescription } from "@wandelbots/nova-js/v2"
import * as THREE from "three"
import { ConvexGeometry } from "three-stdlib"

export type SafetyZonesRendererProps = {
  safetyZones: MotionGroupDescription["safety_zones"]
} & ThreeElements["group"]

interface CoplanarityResult {
  isCoplanar: boolean
  normal?: THREE.Vector3
}

function areVerticesCoplanar(vertices: THREE.Vector3[]): CoplanarityResult {
  if (vertices.length < 3) {
    console.log("Not enough vertices to define a plane")
    return { isCoplanar: false }
  }

  // Convert Vector3d to THREE.Vector3
  const v0 = new THREE.Vector3(vertices[0].x, vertices[0].y, vertices[0].z)
  const v1 = new THREE.Vector3(vertices[1].x, vertices[1].y, vertices[1].z)
  const v2 = new THREE.Vector3(vertices[2].x, vertices[2].y, vertices[2].z)

  const vector1 = new THREE.Vector3().subVectors(v1, v0)
  const vector2 = new THREE.Vector3().subVectors(v2, v0)
  const normal = new THREE.Vector3().crossVectors(vector1, vector2).normalize()

  // Check if all remaining vertices lie on the same plane
  for (let i = 3; i < vertices.length; i++) {
    const vi = new THREE.Vector3(vertices[i].x, vertices[i].y, vertices[i].z)
    const vector = new THREE.Vector3().subVectors(vi, v0)
    const dotProduct = normal.dot(vector)
    if (Math.abs(dotProduct) > 1e-6) {
      // Allowing a small tolerance
      console.log("Vertices are not on the same plane")
      return { isCoplanar: false }
    }
  }

  return { isCoplanar: true, normal }
}

export function SafetyZonesRenderer({
                                      safetyZones,
                                      ...props
                                    }: SafetyZonesRendererProps) {
  return (
    <group {...props}>
      {
        Object.values(safetyZones ?? {}).map((zone: Collider, index: number) => {
          let hullVertices: number[][] = []

          if (Object.keys(zone.shape).includes("vertices")) {
            hullVertices = (zone.shape as ConvexHull).vertices
          }

          const vertices = hullVertices
            .map((vertex: number[]) => new THREE.Vector3(vertex[0] / 1000, vertex[1] / 1000, vertex[2] / 1000))

          // Check if the vertices are on the same plane and only define a plane
          // Algorithm has troubles with vertices that are on the same plane so we
          // add a new vertex slightly moved along the normal direction
          const coplanarityResult = areVerticesCoplanar(vertices)

          if (coplanarityResult.isCoplanar && coplanarityResult.normal) {
            // Add a new vertex slightly moved along the normal direction
            const offset = 0.0001 // Adjust the offset as needed
            const newVertex = new THREE.Vector3().addVectors(
              vertices[0],
              coplanarityResult.normal.multiplyScalar(offset),
            )
            vertices.push(newVertex)
          }

          let convexGeometry
          try {
            convexGeometry = new ConvexGeometry(vertices)
          } catch (error) {
            console.log("Error creating ConvexGeometry:", error)
            return null
          }

          return (
            <mesh key={`${index}}`} geometry={convexGeometry}>
              <meshStandardMaterial
                key={index}
                attach="material"
                color="#009f4d"
                opacity={0.2}
                depthTest={false}
                depthWrite={false}
                transparent
                polygonOffset
                polygonOffsetFactor={-index}
              />
            </mesh>
          )
        })
      }
    </group>
  )
}
