import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import type { GLTF } from "three-stdlib"
import type { RobotModelProps } from "./types"

type GLTFResult = GLTF & {
  nodes: {
    visuals_0: THREE.Mesh
    visuals_0_1: THREE.Mesh
    link_6: THREE.Mesh
    link_5: THREE.Mesh
    visuals_4: THREE.Mesh
    visuals_4_1: THREE.Mesh
    link_3: THREE.Mesh
    visuals_2: THREE.Mesh
    visuals_2_1: THREE.Mesh
    link_1: THREE.Mesh
  }
  materials: {
    kuka_metal: THREE.MeshPhysicalMaterial
    kuka_black: THREE.MeshStandardMaterial
    kuka_white: THREE.MeshStandardMaterial
    kuka_orange: THREE.MeshStandardMaterial
  }
}

export function KUKA_KR6_R700_2({ modelURL, ...props }: RobotModelProps) {
  const { nodes, materials } = useGLTF(modelURL) as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="link_0">
          <mesh
            name="visuals_0"
            castShadow
            receiveShadow
            geometry={nodes.visuals_0.geometry}
            material={materials.kuka_metal}
          />
          <mesh
            name="visuals_0_1"
            castShadow
            receiveShadow
            geometry={nodes.visuals_0_1.geometry}
            material={materials.kuka_black}
          />
        </group>
        <animated.group name="KUKA_KR6R700-2_J00">
          <animated.group
            name="KUKA_KR6R700-2_J01"
            position={[0.025, 0.4, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <animated.group
              name="KUKA_KR6R700-2_J02"
              position={[0.335, 0, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            >
              <animated.group
                name="KUKA_KR6R700-2_J03"
                position={[0.025, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="KUKA_KR6R700-2_J04"
                  position={[0, -0.365, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="KUKA_KR6R700-2_J05"
                    rotation={[-Math.PI / 2, 0, -Math.PI]}
                  >
                    <group
                      name="KUKA_KR6R700-2_FLG"
                      position={[0, -0.09, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <mesh
                      name="link_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.link_6.geometry}
                      material={materials.kuka_black}
                      position={[0.425, 0.725, 0]}
                      rotation={[-Math.PI, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <mesh
                    name="link_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.link_5.geometry}
                    material={materials.kuka_white}
                    position={[-0.425, 0, 0.725]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  />
                </animated.group>
                <group
                  name="link_4"
                  position={[-0.425, 0.36, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_4.geometry}
                    material={materials.kuka_white}
                  />
                  <mesh
                    name="visuals_4_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_4_1.geometry}
                    material={materials.kuka_orange}
                  />
                </group>
              </animated.group>
              <mesh
                name="link_3"
                castShadow
                receiveShadow
                geometry={nodes.link_3.geometry}
                material={materials.kuka_white}
                position={[-0.4, 0, 0.36]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              />
            </animated.group>
            <group
              name="link_2"
              position={[-0.025, 0, -0.4]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                name="visuals_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals_2.geometry}
                material={materials.kuka_white}
              />
              <mesh
                name="visuals_2_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_2_1.geometry}
                material={materials.kuka_orange}
              />
            </group>
          </animated.group>
          <mesh
            name="link_1"
            castShadow
            receiveShadow
            geometry={nodes.link_1.geometry}
            material={materials.kuka_white}
          />
        </animated.group>
      </group>
    </group>
  )
}