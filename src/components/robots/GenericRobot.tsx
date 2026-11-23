import { useGLTF } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import type React from "react"
import { useEffect, useState } from "react"
import type { Group, Mesh, Object3D, Texture } from "three"
import { isFlange, parseRobotModel } from "./robotModelLogic"

export type RobotModelProps = {
  modelURL: string | Promise<string>
  /**
   * Called after a robot model has been loaded and
   * rendered into the threejs scene, when the components above it
   * (RobotAnimator, LinearAxisAnimator) have mounted
   */
  postModelRender?: () => void
  flangeRef?: React.Ref<Group>
} & ThreeElements["group"]

function isMesh(node: Object3D): node is Mesh {
  return node.type === "Mesh"
}

/**
 * Frees the renderers' copies of a model's geometries, materials and
 * textures. The model itself stays as it is: a 3D view that shows it again
 * uploads it again.
 */
function releaseModel(model: Object3D) {
  model.traverse((node) => {
    if (!isMesh(node)) return
    node.geometry?.dispose()
    for (const material of [node.material].flat()) {
      if (!material) continue
      for (const value of Object.values(material)) {
        if ((value as Texture | null)?.isTexture) (value as Texture).dispose()
      }
      material.dispose()
    }
  })
}

// Separate component that only renders when we have a valid URL
function LoadedRobotModel({
  url,
  flangeRef,
  postModelRender,
  ...props
}: {
  url: string
  flangeRef?: React.Ref<Group>
  postModelRender?: () => void
} & ThreeElements["group"]) {
  const gltfResult = useGLTF(url)
  const parsed = parseRobotModel(gltfResult, "robot.glb")
  const gltf = parsed.gltf

  // drei caches the model for all 3D views, so it is rendered without
  // R3F's dispose. Each renderer that drew it listens to its parts until
  // they are disposed, and so the cache would keep every renderer, with its
  // canvas and the page around it: free the copies when the model goes.
  useEffect(() => () => releaseModel(gltf.scene), [gltf])

  // After the commit, not in a ref callback: the refs of the components
  // above (such as the animator, which poses the joints of the new model)
  // attach only after the refs of their children
  // biome-ignore lint/correctness/useExhaustiveDependencies: called again for a new model
  useEffect(() => {
    postModelRender?.()
  }, [url, postModelRender])

  function renderNode(node: Object3D): React.ReactNode {
    try {
      if (isMesh(node)) {
        // Defensive: only render mesh if geometry exists
        if ((node as Mesh).geometry) {
          return (
            <mesh
              name={node.name}
              key={node.uuid}
              geometry={(node as Mesh).geometry}
              material={(node as Mesh).material}
              position={node.position}
              rotation={node.rotation}
            />
          )
        }
        // Fallback to empty group if geometry is missing
        return (
          <group
            name={node.name}
            key={node.uuid}
            position={node.position}
            rotation={node.rotation}
          />
        )
      } else {
        return (
          <group
            name={node.name}
            key={node.uuid}
            position={node.position}
            rotation={node.rotation}
            ref={isFlange(node) ? flangeRef : undefined}
          >
            {node.children.map(renderNode)}
          </group>
        )
      }
    } catch (e) {
      console.warn("Error rendering node", node.name, e)
      return null
    }
  }

  return (
    <group {...props} dispose={null}>
      {renderNode(gltf.scene)}
    </group>
  )
}

export function GenericRobot({
  modelURL,
  flangeRef,
  postModelRender,
  ...props
}: RobotModelProps) {
  const [resolvedURL, setResolvedURL] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const resolveURL = async () => {
      try {
        const url = typeof modelURL === "string" ? modelURL : await modelURL
        if (!cancelled) {
          setResolvedURL((prev: string | null) => (prev === url ? prev : url))
        }
      } catch (error) {
        console.error("Failed to resolve model URL:", error)
      }
    }

    resolveURL()
    return () => {
      cancelled = true
    }
  }, [modelURL])

  // Don't render until we have a resolved URL
  if (!resolvedURL) {
    return null // Loading state
  }

  return (
    <LoadedRobotModel
      url={resolvedURL}
      flangeRef={flangeRef}
      postModelRender={postModelRender}
      {...props}
    />
  )
}

export default GenericRobot
