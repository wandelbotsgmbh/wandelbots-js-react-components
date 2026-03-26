import { useEffect, useMemo } from "react"
import { type ThreeElements } from "@react-three/fiber"
import * as THREE from "three"
import { ConvexGeometry, RoundedBoxGeometry } from "three-stdlib"

import type {
  Collider,
  ConvexHull,
  DHParameter,
  MotionGroupDescription,
  Sphere,
  Capsule,
  RectangularCapsule,
} from "@wandelbots/nova-js/v2"
import type { Geometry, SafetySetupSafetyZone } from "@wandelbots/nova-js/v1"

import { dhParametersToPlaneSize, orientationToQuaternion, verticesToCoplanarity } from "../utils/converters"

export type SafetyZonesRendererProps = {
  safetyZones: SafetySetupSafetyZone[] | MotionGroupDescription["safety_zones"]
  dhParameters?: DHParameter[]
} & ThreeElements["group"]

export function SafetyZonesRenderer({
                                      safetyZones,
                                      dhParameters,
                                      ...props
                                    }: SafetyZonesRendererProps) {
  /**
   * Common material properties for safety zone meshes
   */
  const safetyZoneMaterialProps = {
    attach: "material" as const,
    color: "#009f4d",
    opacity: 0.2,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    polygonOffset: true,
  }

  /**
   * Plane size for the plane safety zones, returns the reach distance
   * of the robot
   */
  const planeSize = dhParametersToPlaneSize(dhParameters ?? [])

  /**
   * Warning during runtime stating the deprecation of the V1 safety zones
   */
  useEffect(() => {
    Array.isArray(safetyZones) &&
    console.warn("SafetyZonesRenderer: The support of V1 safety zones is deprecated. Please migrate to V2 safety zones.")
  }, [safetyZones])

  /**
   * Helper function to render plane, sphere, and capsule meshes
   * @param id number
   * @param zone Collider
   */
  const renderMesh = (id: number, zone: Collider) => {
    if (!zone?.pose?.position || !zone?.pose?.orientation) {
      return null
    }

    const position = new THREE.Vector3(zone.pose.position[0] / 1000, zone.pose.position[1] / 1000, zone.pose.position[2] / 1000)
    const orientation = new THREE.Vector3(zone.pose.orientation[0], zone.pose.orientation[1], zone.pose.orientation[2])

    let geometry: React.ReactElement | null

    const materialProps = zone.shape.shape_type === "plane"
      ? { ...safetyZoneMaterialProps, side: THREE.DoubleSide }
      : { ...safetyZoneMaterialProps, side: THREE.FrontSide }

    switch (zone.shape.shape_type) {
      /**
       * Plane shape, uses DH parameters to calculate the size of the plane (reach distance of a robot)
       */
      case "plane":
        geometry = <planeGeometry args={[planeSize, planeSize]} />
        break

      /**
       * Sphere shape
       */
      case "sphere": {
        const radius = (zone?.shape as Sphere).radius / 1000
        geometry = <sphereGeometry args={[radius]} />
        break
      }

      /**
       * Capsule shape
       */
      case "capsule": {
        const capsuleRadius = (zone?.shape as Capsule).radius / 1000
        const height = (zone?.shape as Capsule).cylinder_height / 1000
        geometry = <capsuleGeometry args={[capsuleRadius, height]} />
        break
      }

      /**
       * Convex hull, checks at first if the vertices are coplanar - if yes, adds a small offset for
       * renderer to be able to visualize the convex hull.
       */
      case "convex_hull": {
        const vertices = (zone?.shape as ConvexHull).vertices.map(
          (v) => new THREE.Vector3(v[0] / 1000, v[1] / 1000, v[2] / 1000),
        )
        // Check if the vertices are on the same plane
        const coplanarityResult = verticesToCoplanarity(vertices)
        if (coplanarityResult.isCoplanar && coplanarityResult.normal) {
          const offset = 0.0001
          const newVertex = new THREE.Vector3().addVectors(
            vertices[0],
            coplanarityResult.normal.multiplyScalar(offset),
          )
          vertices.push(newVertex)
        }
        try {
          geometry = <primitive object={new ConvexGeometry(vertices)} attach="geometry" />
        } catch (error) {
          console.log("Error creating ConvexGeometry:", error)
          return null
        }
        break
      }

      /**
       * Convex hull around four spheres. Sphere center points in x/y-plane,
       * offset by either combination "+/- sizeX" or "+/- sizeY".
       * Alternative description: Rectangle in x/y-plane with a 3D padding (source: nova-api docs)
       *
       * Basically a rounded box with a rectangular cross-section.
       */
      case "rectangular_capsule": {
        const shape = (zone.shape as RectangularCapsule)
        const rcRadius = shape.radius / 1000
        const width = shape.sphere_center_distance_x / 1000
        const height = shape.sphere_center_distance_y / 1000
        const depth = rcRadius * 2

        geometry = <primitive object={new RoundedBoxGeometry(width, height, depth, 2, rcRadius)} attach="geometry" />
        break
      }

      default: {
        console.warn("Unsupported safety zone shape type:", zone.shape.shape_type)
        geometry = null
      }
    }

    return (
      <mesh
        key={`safety-zone-${zone.shape.shape_type}-${id}`}
        renderOrder={id}
        position={position}
        quaternion={orientationToQuaternion(orientation)}
      >
        {geometry}
        <meshStandardMaterial
          {...materialProps}
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
      return renderMesh(index, zone)
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

          // Use a per-geometry identifier derived from both zone index and geometry index
          const id = index * 1000 + i
          // Build a compatible zone object for renderMesh
          const zone: Collider = {
            pose: {
              position: [0, 0, 0],
              orientation: [0, 0, 0],
            },
            shape: {
              shape_type: "convex_hull",
              vertices: geometry.convex_hull.vertices.map((v) => [v.x, v.y, v.z]),
            } as ConvexHull,
          }
          return renderMesh(id, zone)
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
