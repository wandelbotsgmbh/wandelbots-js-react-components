import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { Mesh } from "three"
import { type Object3D } from "three"
import type { RobotModelProps } from "./types"

function isMesh(node: Object3D): node is Mesh {
  return node.type === "Mesh"
}

// FIXME: Robots currently missing a _FLG group
// KUKA_KR210_R2700
// KUKA_KR270_R2700
// KUKA_KR16_R2010

function isFlange(node: Object3D): boolean {
  return node.name.endsWith("_FLG")
}

export function GenericRobot({
  modelURL,
  flangeRef,
  ...props
}: RobotModelProps) {
  const gltf = useGLTF(modelURL)

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
    <group {...props} dispose={null}>
      {renderNode(gltf.scene)}
    </group>
  )
}
