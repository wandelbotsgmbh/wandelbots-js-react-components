import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { GLTF } from "three-stdlib"
import type { RobotModelProps } from "./types"

type GLTFResult = GLTF & {
  nodes: {
    visuals_0: THREE.Mesh
    visuals_0_1: THREE.Mesh
    visuals_0_2: THREE.Mesh
    link_6: THREE.Mesh
    link_5: THREE.Mesh
    link_4: THREE.Mesh
    visuals_3: THREE.Mesh
    visuals_3_1: THREE.Mesh
    visuals_3_2: THREE.Mesh
    visuals_2: THREE.Mesh
    visuals_2_1: THREE.Mesh
    visuals_1: THREE.Mesh
    visuals_1_1: THREE.Mesh
    visuals_1_2: THREE.Mesh
  }
  materials: {
    material_Material_Metall: THREE.MeshStandardMaterial
    material_Material_Farbe__2_: THREE.MeshPhysicalMaterial
    material_Material_Farbe: THREE.MeshStandardMaterial
  }
}

KUKA_KR16_R2010_2.config = {
  rotationOffsets: [0, 0, -Math.PI / 2, 0, 0, 0],
}

export function KUKA_KR16_R2010_2({ modelURL, ...props }: RobotModelProps) {
  const { nodes, materials } = useGLTF(modelURL) as GLTFResult

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="link_0">
            <mesh
              name="visuals_0"
              castShadow
              receiveShadow
              geometry={nodes.visuals_0.geometry}
              material={materials.material_Material_Metall}
            />
            <mesh
              name="visuals_0_1"
              castShadow
              receiveShadow
              geometry={nodes.visuals_0_1.geometry}
              material={materials.material_Material_Farbe__2_}
            />
            <mesh
              name="visuals_0_2"
              castShadow
              receiveShadow
              geometry={nodes.visuals_0_2.geometry}
              material={materials.material_Material_Metall}
            />
          </group>
          <animated.group name="KUKA_KR16R2010_2_J00">
            <animated.group
              name="KUKA_KR16R2010_2_J01"
              position={[0.16, 0.52, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <animated.group
                name="KUKA_KR16R2010_2_J02"
                position={[0.98, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
              >
                <animated.group
                  name="KUKA_KR16R2010_2_J03"
                  position={[0.15, 0, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="KUKA_KR16R2010_2_J04"
                    position={[0, -0.86, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="KUKA_KR16R2010_2_J05"
                      rotation={[-Math.PI / 2, 0, -Math.PI]}
                    >
                      <mesh
                        name="link_6"
                        castShadow
                        receiveShadow
                        geometry={nodes.link_6.geometry}
                        material={materials.material_Material_Farbe__2_}
                        position={[0.67, 2, 0]}
                        rotation={[-Math.PI, 0, Math.PI / 2]}
                      />
                    </animated.group>
                    <mesh
                      name="link_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.link_5.geometry}
                      material={materials.material_Material_Farbe}
                      position={[-0.67, 0, 2]}
                      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                    />
                  </animated.group>
                  <mesh
                    name="link_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.link_4.geometry}
                    material={materials.material_Material_Farbe}
                    position={[-0.67, 1.14, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  />
                </animated.group>
                <group
                  name="link_3"
                  position={[-0.52, 0, 1.14]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3.geometry}
                    material={materials.material_Material_Farbe}
                  />
                  <mesh
                    name="visuals_3_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3_1.geometry}
                    material={materials.material_Material_Metall}
                  />
                  <mesh
                    name="visuals_3_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3_2.geometry}
                    material={materials.material_Material_Farbe__2_}
                  />
                </group>
              </animated.group>
              <group
                name="link_2"
                position={[-0.16, 0, -0.52]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="visuals_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2.geometry}
                  material={materials.material_Material_Farbe}
                />
                <mesh
                  name="visuals_2_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2_1.geometry}
                  material={materials.material_Material_Metall}
                />
              </group>
            </animated.group>
            <group name="link_1">
              <mesh
                name="visuals_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1.geometry}
                material={materials.material_Material_Farbe}
              />
              <mesh
                name="visuals_1_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1_1.geometry}
                material={materials.material_Material_Farbe__2_}
              />
              <mesh
                name="visuals_1_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1_2.geometry}
                material={materials.material_Material_Metall}
              />
            </group>
          </animated.group>
        </group>
      </group>
    </>
  )
}
