import { useCallback, useEffect, useRef } from "react"
import * as THREE from "three"

/**
 * Draws a robot as a see-through ghost in `color`: each mesh of its model
 * gets two copies, one that only writes depth (so the ghost shows its front
 * faces, not the inner ones) and one that draws the colour. The model's own
 * meshes are hidden one by one, not by their material: every robot drawn
 * from the same model file shares the materials.
 *
 * Styles the meshes that are not ghosts yet, so call it again when a model
 * has (re)loaded.
 */
export const applyGhostStyle = (robot: THREE.Group, color: string) => {
  const meshes: THREE.Mesh[] = []
  robot.traverse((obj) => {
    if (
      obj instanceof THREE.Mesh &&
      !obj.userData.isGhost &&
      !obj.userData.hasGhost
    ) {
      meshes.push(obj)
    }
  })

  for (const mesh of meshes) {
    if (!mesh.parent) continue

    const depth = mesh.clone()
    depth.visible = true
    depth.material = new THREE.MeshStandardMaterial({
      depthTest: true,
      depthWrite: true,
      colorWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      side: THREE.DoubleSide,
    })
    depth.userData.isGhost = true

    const ghost = mesh.clone()
    ghost.visible = true
    ghost.material = new THREE.MeshStandardMaterial({
      color,
      opacity: 0.3,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      side: THREE.DoubleSide,
    })
    ghost.userData.isGhost = true

    mesh.parent.add(depth)
    mesh.parent.add(ghost)
    mesh.visible = false
    mesh.userData.hasGhost = true
  }
}

/** Draws the robot of {@link applyGhostStyle} as its model again */
export const removeGhostStyle = (robot: THREE.Group) => {
  const ghosts: THREE.Mesh[] = []
  robot.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return
    if (obj.userData.isGhost) {
      ghosts.push(obj)
    } else if (obj.userData.hasGhost) {
      obj.visible = true
      obj.userData.hasGhost = false
    }
  })

  for (const ghost of ghosts) {
    ghost.parent?.remove(ghost)
    if (ghost.material instanceof THREE.Material) ghost.material.dispose()
  }
}

/**
 * The ghost style of a robot component with `transparentColor`: put
 * `groupRef` on the group that holds the model, and call `styleDrawnModel`
 * when the model is drawn. Its meshes come only then: the model loads after
 * the group is there.
 */
export function useGhostStyle(color: string | undefined) {
  const groupRef = useRef<THREE.Group>(null)
  const colorRef = useRef(color)
  colorRef.current = color

  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    removeGhostStyle(group)
    if (color) applyGhostStyle(group, color)
  }, [color])

  const styleDrawnModel = useCallback(() => {
    const group = groupRef.current
    if (group && colorRef.current) applyGhostStyle(group, colorRef.current)
  }, [])

  return { groupRef, styleDrawnModel }
}
