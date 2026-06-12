import { useGLTF } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import type React from "react"
import { useCallback, useEffect, useState } from "react"
import type { Group, Mesh, Object3D } from "three"
import { isFlange, parseRobotModel } from "./robotModelLogic"

export type RobotModelProps = {
  modelURL: string | Promise<string>
  /**
   * Called after a robot model has been loaded and
   * rendered into the threejs scene
   */
  postModelRender?: () => void
  flangeRef?: React.Ref<Group>
} & ThreeElements["group"]

function isMesh(node: Object3D): node is Mesh {
  return node.type === "Mesh"
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

  const groupRef: React.RefCallback<Group> = useCallback(
    (group) => {
      if (group && postModelRender) {
        postModelRender()
      }
    },
    [postModelRender],
  )

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
    <group {...props} dispose={null} ref={groupRef}>
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
