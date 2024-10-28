import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { Mesh } from "three"
import { type Object3D } from "three"
import type { RobotModelProps } from "./types"

function isMesh(node: Object3D): node is Mesh {
  return node.type === "Mesh"
}

export function GenericRobot({
  modelURL,
  flangeRef,
  ...props
}: RobotModelProps) {
  const gltf = useGLTF(modelURL)

  const renderNode = (node: Object3D): React.ReactNode => {
    console.log(node.name)

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
        >
          {node.children.map(renderNode)}
        </animated.group>
      )
    }
  }

  return (
    <group {...props} dispose={null}>
      {renderNode(gltf.scene)}
    </group>
  )
}
