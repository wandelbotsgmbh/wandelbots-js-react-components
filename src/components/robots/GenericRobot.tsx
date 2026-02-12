import { useGLTF } from "@react-three/drei"
import type { ThreeElements } from "@react-three/fiber"
import React, { useCallback } from "react"
import type { Group, Mesh } from "three"
import { type Object3D } from "three"
import { isFlange, parseRobotModel } from "./robotModelLogic"

export type RobotModelProps = {
  modelURL: string
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

export function GenericRobot({
  modelURL,
  flangeRef,
  postModelRender,
  ...props
}: RobotModelProps) {
  const { gltf } = parseRobotModel(
    useGLTF(modelURL),
    modelURL.split("/").pop() || modelURL,
  )

  const groupRef: React.RefCallback<Group> = useCallback(
    (group) => {
      if (group && postModelRender) {
        postModelRender()
      }
    },
    [modelURL, postModelRender],
  )

  function renderNode(node: Object3D): React.ReactNode {
    if (isMesh(node)) {
      return (
        <mesh
          name={node.name}
          key={node.uuid}
          geometry={node.geometry}
          material={node.material}
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
  }

  return (
    <group {...props} dispose={null} ref={groupRef}>
      {renderNode(gltf.scene)}
    </group>
  )
}
