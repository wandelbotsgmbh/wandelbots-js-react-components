import type { ColliderShape } from "@wandelbots/wandelbots-js"
import * as THREE from "three"
import { ConvexGeometry } from "three-stdlib"

export function colliderShapeToBufferGeometry(
  shape: ColliderShape,
): THREE.BufferGeometry {
  const shapeType = shape.shape_type
  switch (shapeType) {
    case "convex_hull":
      return new ConvexGeometry(
        shape.vertices.map(
          (vertex) => new THREE.Vector3(vertex[0] / 1000, vertex[1] / 1000, vertex[2] / 1000),
        ),
      )
    case "box":
      return new THREE.BoxGeometry(shape.size_x / 1000, shape.size_y / 1000, shape.size_z / 1000)
    case "sphere":
      return new THREE.SphereGeometry(shape.radius / 1000)
    case "capsule":
      return new THREE.CapsuleGeometry(shape.radius / 1000, shape.cylinder_height / 1000)
    case "cylinder":
      return new THREE.CylinderGeometry(
        shape.radius / 1000,
        shape.radius / 1000,
        shape.height / 1000,
      )
    case "rectangle": {
      return new THREE.BoxGeometry(shape.size_x / 1000, shape.size_y / 1000, 0)
    }
    default: {
      console.warn(`${shape.shape_type} is not supported`)
      return new THREE.BufferGeometry()
    }
  }
}
