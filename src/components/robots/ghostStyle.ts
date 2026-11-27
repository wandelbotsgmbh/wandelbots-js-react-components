import { useCallback, useEffect, useRef } from "react"
import * as THREE from "three"

/** The opacity of a ghost that the app gives none */
export const DEFAULT_GHOST_OPACITY = 0.3

/**
 * The key in `userData` of a mesh of the robot's model file: only these turn
 * into a ghost, not the parts that an app draws at the flange
 */
export const MODEL_MESH = "isRobotModelMesh"

/**
 * Draws a robot as a see-through ghost in `color` and `opacity`: each mesh of
 * its model gets two copies, one that only writes depth (so the ghost shows
 * its front faces, not the inner ones) and one that draws the colour. The
 * model's own meshes are hidden one by one, not by their material: every
 * robot drawn from the same model file shares the materials. Meshes that are
 * not the model's (see {@link MODEL_MESH}) stay as they are.
 *
 * Styles the meshes that are not ghosts yet, so call it again when a model
 * has (re)loaded.
 */
export const applyGhostStyle = (
  robot: THREE.Group,
  color: string,
  opacity = DEFAULT_GHOST_OPACITY,
) => {
  const meshes: THREE.Mesh[] = []
  robot.traverse((obj) => {
    if (
      obj instanceof THREE.Mesh &&
      obj.userData[MODEL_MESH] &&
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
      opacity,
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
export function useGhostStyle(
  color: string | undefined,
  opacity = DEFAULT_GHOST_OPACITY,
) {
  const groupRef = useRef<THREE.Group>(null)
  const styleRef = useRef({ color, opacity })
  styleRef.current = { color, opacity }

  useEffect(() => {
    const group = groupRef.current
    if (!group) return
    removeGhostStyle(group)
    if (color) applyGhostStyle(group, color, opacity)
  }, [color, opacity])

  const styleDrawnModel = useCallback(() => {
    const group = groupRef.current
    const { color, opacity } = styleRef.current
    if (group && color) applyGhostStyle(group, color, opacity)
  }, [])

  return { groupRef, styleDrawnModel }
}
