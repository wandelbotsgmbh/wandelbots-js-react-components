import { useEffect, useMemo } from "react"
import { type ThreeElements } from "@react-three/fiber"
import { type Collider, type ConvexHull, type DHParameter, type MotionGroupDescription } from "@wandelbots/nova-js/v2"
import type { Geometry, SafetySetupSafetyZone } from "@wandelbots/nova-js/v1"
import * as THREE from "three"
import { ConvexGeometry } from "three-stdlib"
import type { Vector3 } from "three"

export type SafetyZonesRendererProps = {
  safetyZones: SafetySetupSafetyZone[] | MotionGroupDescription["safety_zones"]
  dhParameters?: DHParameter[]
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
                                      dhParameters,
                                      ...props
                                    }: SafetyZonesRendererProps) {

  /**
   * Warning during runtime stating the deprecation of the V1 safety zones
   */
  useEffect(() => {
    Array.isArray(safetyZones) && console.warn("SafetyZonesRenderer: The support of V1 safety zones is deprecated. Please migrate to V2 safety zones.")
  }, [safetyZones])

  /**
   * Helper function to render convex hulls mesh materials
   * @param vertices Vector3[]
   * @param id number
   */
  const renderHullMesh = (vertices: Vector3[], id: number) => {
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
      <mesh key={`safety-zone-mesh-${id}`} geometry={convexGeometry}>
        <meshStandardMaterial
          key={`safety-zone-material-${id}`}
          attach="material"
          color="#009f4d"
          opacity={0.2}
          depthTest={false}
          depthWrite={false}
          transparent
          polygonOffset
          polygonOffsetFactor={-id}
        />
      </mesh>
    )
  }

  /**
   * Plane size is calculated based on the reach radius of the robot
   */
  const planeSize = useMemo(() => {
    const defaultPlaneSize = 5
    if (!dhParameters || dhParameters.length === 0) {
      return defaultPlaneSize
    }
    const reachRadiusM = dhParameters.reduce((sum, p) => {
      return sum + (Math.abs(p.a ?? 0) / 1000) + (Math.abs(p.d ?? 0) / 1000)
    }, 0)
    const size = reachRadiusM * 2
    if (!Number.isFinite(size) || size <= 0) {
      return defaultPlaneSize
    }
    return size
  }, [dhParameters])

  /**
   * Helper function to render plane meshes
   *
   * @param position THREE.Vector3 - The transform origin. This is the point on the plane defined in the Nova V2 API.
   *                                  In this visualization, we center the (theoretically infinite) plane on this point.
   *                                  This point also acts as the pivot around which the rotation is applied.
   * @param orientationVector THREE.Vector3 - A rotation vector (Rodrigues notation).
   *                                          - Direction: The axis around which the plane is rotated.
   *                                          - Length: The angle of rotation in radians.
   * @param id number
   */
  const renderPlaneMesh = (position: THREE.Vector3, orientationVector: THREE.Vector3, id: number) => {
    // The orientation is provided as a rotation vector (also known as Rodrigues notation or axis-angle representation).
    // 1. The direction of the vector defines the axis of rotation in 3D space.
    // 2. The magnitude (length) of the vector represents the rotation angle in radians.
    // The rotation is applied to the default THREE.PlaneGeometry (which starts in the XY plane with normal along +Z).
    const angle = orientationVector.length()

    const quaternion = new THREE.Quaternion()
    if (angle > 1e-6) {
      const axis = orientationVector.clone().normalize()
      quaternion.setFromAxisAngle(axis, angle)
    }

    return (
      <mesh
        key={`safety-zone-plane-${id}`}
        renderOrder={id}
        position={position}
        quaternion={quaternion}
      >
        <planeGeometry args={[planeSize, planeSize]} />
        <meshStandardMaterial
          key={`safety-zone-plane-material-${id}`}
          attach="material"
          color="#009f4d"
          opacity={0.2}
          depthTest={false}
          depthWrite={false}
          transparent
          side={THREE.DoubleSide}
          polygonOffset
          polygonOffsetFactor={-id}
        />
      </mesh>
    )
  }

  /**
   * Helper function to render V2 safety zones
   */
  const renderV2SafetyZones = () => {
    return Object.values(safetyZones ?? {}).map((zone: Collider, index: number) => {
      switch (zone.shape.shape_type) {
        case "convex_hull":
          return renderHullMesh(
            (zone.shape as ConvexHull).vertices
              .map((vertex: number[]) => new THREE.Vector3(vertex[0] / 1000, vertex[1] / 1000, vertex[2] / 1000)), index,
          )

        case "plane":
          return zone?.pose?.position && zone?.pose?.orientation && renderPlaneMesh(
            new THREE.Vector3(zone.pose.position[0] / 1000, zone.pose.position[1] / 1000, zone.pose.position[2] / 1000),
            new THREE.Vector3(zone.pose.orientation[0], zone.pose.orientation[1], zone.pose.orientation[2]),
            index,
          )
      }
    })
  }

  /**
   * Helper function to V1 safety zones
   * @deprecated this render function is to be seen as a temporary measure, as the support
   * for the V1 safety zones is to be removed in the future
   */
  const renderV1SafetyZones = () => {
    if (Array.isArray(safetyZones)) {
      return (safetyZones as SafetySetupSafetyZone[]).map((zone: SafetySetupSafetyZone, index) => {
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

          // Use a per-geometry identifier derived from both zone index and geometry index
          return renderHullMesh(vertices, index * 1000 + i)
        })
      })
    }
    return null
  }

  /**
   * Helper variable to render both api versions of safety zones
   */
  const renderedSafetyZones = useMemo(() => {
    return Array.isArray(safetyZones)
      ? renderV1SafetyZones()
      : renderV2SafetyZones()
  }, [safetyZones, renderV1SafetyZones, renderV2SafetyZones])

  return (
    <group {...props}>
      {renderedSafetyZones}
    </group>
  )
}
