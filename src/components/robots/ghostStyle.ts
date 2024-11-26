import * as THREE from "three"

export const applyGhostStyle = (robot: THREE.Group, color: string) => {
  if (robot.userData.isGhost) return

  robot.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      if (obj.material instanceof THREE.Material) {
        obj.material.colorWrite = false
      }

      // Create a clone of the mesh
      const depth = obj.clone()
      const ghost = obj.clone()

      depth.material = new THREE.MeshStandardMaterial({
        depthTest: true,
        depthWrite: true,
        colorWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        side: THREE.DoubleSide,
      })
      depth.userData.isGhost = true

      // Set the material for the ghost mesh
      ghost.material = new THREE.MeshStandardMaterial({
        color: color,
        opacity: 0.3,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        side: THREE.DoubleSide,
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

export const removeGhostStyle = (robot: THREE.Group) => {
  if (!robot.userData.isGhost) return

  const objectsToRemove: THREE.Object3D[] = []

  robot.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      if (obj.userData?.isGhost) {
        objectsToRemove.push(obj)
      } else if (obj.material instanceof THREE.Material) {
        obj.material.colorWrite = true
      }
    }
  })

  objectsToRemove.forEach((obj) => {
    if (obj.parent) {
      obj.parent.remove(obj)
    }
  })

  robot.userData.isGhost = false
}
