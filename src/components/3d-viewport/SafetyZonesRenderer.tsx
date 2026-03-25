import { useEffect, useMemo } from "react"
import { type ThreeElements } from "@react-three/fiber"
import * as THREE from "three"
import { ConvexGeometry, mergeBufferGeometries } from "three-stdlib"

import type { Collider, ConvexHull, DHParameter, MotionGroupDescription, Sphere, Capsule } from "@wandelbots/nova-js/v2"
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
    side: THREE.FrontSide,
    polygonOffset: true,
  }

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

    let geometry: React.ReactElement | undefined

    switch (zone.shape.shape_type) {
      case "plane":
        (safetyZoneMaterialProps.side as number) = THREE.DoubleSide
        const planeSize = dhParametersToPlaneSize(dhParameters ?? [])
        geometry = <planeGeometry args={[planeSize, planeSize]} />
        break

      case "sphere": {
        const radius = (zone?.shape as Sphere).radius / 1000
        geometry = <sphereGeometry args={[radius]} />
        break
      }

      case "capsule": {
        const capsuleRadius = (zone?.shape as Capsule).radius / 1000
        const height = (zone?.shape as Capsule).cylinder_height / 1000
        geometry = <capsuleGeometry args={[capsuleRadius, height]} />
        break
      }

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

      case "rectangular_capsule": {
        // a lozenge is a complex object consisting of corner
        // spheres, edge cylinder, and a central box
        const rcRadius = zone.shape.radius! / 1000
        const sphereCenterDistanceX = zone.shape.sphere_center_distance_x! / 1000
        const sphereCenterDistanceY = zone.shape.sphere_center_distance_y! / 1000
        const halfX = sphereCenterDistanceX / 2
        const halfY = sphereCenterDistanceY / 2

        const geometries: THREE.BufferGeometry[] = []

        // 4 corner spheres
        const cornerPositions = [
          new THREE.Vector3(-halfX, -halfY, 0),
          new THREE.Vector3(halfX, -halfY, 0),
          new THREE.Vector3(halfX, halfY, 0),
          new THREE.Vector3(-halfX, halfY, 0),
        ]
        for (const pos of cornerPositions) {
          const sphereGeom = new THREE.SphereGeometry(rcRadius, 16, 16)
          sphereGeom.translate(pos.x, pos.y, pos.z)
          geometries.push(sphereGeom)
        }

        // 4 edge cylinders
        const cylXGeom1 = new THREE.CylinderGeometry(rcRadius, rcRadius, sphereCenterDistanceX, 16)
        cylXGeom1.rotateZ(Math.PI / 2)
        cylXGeom1.translate(0, -halfY, 0)
        geometries.push(cylXGeom1)

        const cylXGeom2 = new THREE.CylinderGeometry(rcRadius, rcRadius, sphereCenterDistanceX, 16)
        cylXGeom2.rotateZ(Math.PI / 2)
        cylXGeom2.translate(0, halfY, 0)
        geometries.push(cylXGeom2)

        const cylYGeom1 = new THREE.CylinderGeometry(rcRadius, rcRadius, sphereCenterDistanceY, 16)
        cylYGeom1.translate(-halfX, 0, 0)
        geometries.push(cylYGeom1)

        const cylYGeom2 = new THREE.CylinderGeometry(rcRadius, rcRadius, sphereCenterDistanceY, 16)
        cylYGeom2.translate(halfX, 0, 0)
        geometries.push(cylYGeom2)

        // Central box
        const boxGeom = new THREE.BoxGeometry(sphereCenterDistanceX, sphereCenterDistanceY, rcRadius * 2)
        geometries.push(boxGeom)

        const mergedGeometry = mergeBufferGeometries(geometries)
        if (mergedGeometry) {
          geometry = <primitive object={mergedGeometry} attach="geometry" />
        }
        break
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
        <meshStandardMaterial {...safetyZoneMaterialProps} polygonOffsetFactor={-id} />
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
