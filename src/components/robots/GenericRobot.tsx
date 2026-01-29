import { useGLTF } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import React, { useCallback, useEffect, useState } from "react"
import type { Group, Mesh } from "three"
import { type Object3D } from "three"
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
  let gltf
  try {
    const parsed = parseRobotModel(gltfResult, 'robot.glb')
    gltf = parsed.gltf
  } catch (err) {
    console.warn('parseRobotModel failed:', err)
    gltf = gltfResult
  }

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
          <group name={node.name} key={node.uuid} position={node.position} rotation={node.rotation} />
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
      console.warn('Error rendering node', node.name, e)
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
    const resolveURL = async () => {
      try {
        if (typeof modelURL === 'string') {
          setResolvedURL(modelURL)
        } else {
          const url = await modelURL
          setResolvedURL(url)
        }
      } catch (error) {
        console.error('Failed to resolve model URL:', error)
      }
    }
    
    resolveURL()
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
