import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { GroupProps } from "@react-three/fiber"
import React, { useCallback } from "react"
import type { Group, Mesh } from "three"
import { type Object3D } from "three"

export type RobotModelProps = {
  modelURL: string
  /**
   * Called after a robot model has been loaded and
   * rendered into the threejs scene
   */
  postModelRender?: () => void
  flangeRef?: React.Ref<Group>
} & GroupProps

function isMesh(node: Object3D): node is Mesh {
  return node.type === "Mesh"
}

function isFlange(node: Object3D): boolean {
  return node.name.endsWith("_FLG")
}

export function GenericRobot({
  modelURL,
  flangeRef,
  postModelRender,
  ...props
}: RobotModelProps) {
  const gltf = useGLTF(modelURL)

  const groupRef: React.RefCallback<Group> = useCallback(
    (group) => {
      if (group && postModelRender) {
        postModelRender()
      }
    },
    [modelURL],
  )

  const renderNode = (node: Object3D): React.ReactNode => {
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
        <animated.group
          name={node.name}
          key={node.uuid}
          position={node.position}
          rotation={node.rotation}
          ref={isFlange(node) ? flangeRef : undefined}
        >
          {node.children.map(renderNode)}
        </animated.group>
      )
    }
  }

  return (
    <group {...props} dispose={null} ref={groupRef}>
      {renderNode(gltf.scene)}
    </group>
  )
}
