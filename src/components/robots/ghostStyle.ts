import type { Group, Object3D } from "three"
import { Material, Mesh, MeshStandardMaterial } from "three"

export const applyGhostStyle = (robot: Group) => {
  if (robot.userData.isGhost) return

  robot.traverse((obj) => {
    if (obj instanceof Mesh) {
      if (obj.material instanceof Material) {
        obj.material.colorWrite = true
      }

      // Create a clone of the mesh
      const depth = obj.clone()
      const ghost = obj.clone()

      depth.material = new MeshStandardMaterial({
        depthTest: true,
        depthWrite: true,
        colorWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
      })
      depth.userData.isGhost = true

      // Set the material for the ghost mesh
      ghost.material = new MeshStandardMaterial({
        color: "#D91433",
        opacity: 0.3,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      })
      ghost.userData.isGhost = true

      if (obj.parent) {
        obj.parent.add(depth)
        obj.parent.add(ghost)
      }
    }
  })

  robot.userData.isGhost = true
}

export const removeGhostStyle = (robot: Group) => {
  if (!robot.userData.isGhost) return

  const objectsToRemove: Object3D[] = []

  robot.traverse((obj) => {
    if (obj instanceof Mesh) {
      if (obj.userData?.isGhost) {
        objectsToRemove.push(obj)
      } else if (obj.material instanceof Material) {
        obj.material.colorWrite = true
      }
    }
  })

  objectsToRemove.forEach((obj) => {
    if (obj.parent) {
      obj.parent.remove(obj)
    }
  })

  robot.userData.isGhost = true
}
