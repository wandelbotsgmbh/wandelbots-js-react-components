import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

KUKA_KR210_R2700.config = {
  rotationOffsets: [0, 0, -Math.PI / 2, 0, 0, 0],
}

export function KUKA_KR210_R2700({
  modelURL,
  flangeRef,
  ...props
}: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="kuka_kr210_2700">
            <animated.group name="joint_01">
              <animated.group
                name="joint_02"
                position={[0.33, 0.645, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="joint_03"
                  position={[1.15, 0, 0]}
                  rotation={[0, -Math.PI / 2, 0]}
                >
                  <animated.group
                    name="joint_04"
                    position={[0.115, 0, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="joint_05"
                      position={[0, -1.22, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="joint_06"
                        rotation={[Math.PI / 2, 0, 0]}
                      >
                        <group
                          ref={flangeRef}
                          name="flange"
                          position={[0, -0.215, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        />
                        <group
                          name="link_6"
                          position={[0, -0.17, 0]}
                          rotation={[0, 0, -Math.PI / 2]}
                        >
                          <mesh
                            name="visuals006"
                            geometry={nodes.visuals006.geometry}
                            material={materials.material_Material_Metall_black}
                          />
                        </group>
                      </animated.group>
                      <group
                        name="link_5"
                        position={[0, 0.059, 0]}
                        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                      >
                        <group name="visuals005">
                          <mesh
                            name="visuals005_1"
                            geometry={nodes.visuals005_1.geometry}
                            material={materials.material_Material_metal_black}
                          />
                          <mesh
                            name="visuals005_2"
                            geometry={nodes.visuals005_2.geometry}
                            material={materials.material_Material_kuka_orange}
                          />
                        </group>
                      </group>
                    </animated.group>
                    <group
                      name="link_4"
                      position={[0, -0.869, 0]}
                      rotation={[0, 0, -Math.PI / 2]}
                    >
                      <group name="visuals004">
                        <mesh
                          name="visuals004_1"
                          geometry={nodes.visuals004_1.geometry}
                          material={materials.material_Material_metal_black}
                        />
                        <mesh
                          name="visuals004_2"
                          geometry={nodes.visuals004_2.geometry}
                          material={materials.material_Material_kuka_orange}
                        />
                      </group>
                    </group>
                  </animated.group>
                  <group
                    name="link_3"
                    position={[0, -0.105, 0]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  >
                    <group name="visuals003">
                      <mesh
                        name="visuals003_1"
                        geometry={nodes.visuals003_1.geometry}
                        material={materials.material_Material_rubber}
                      />
                      <mesh
                        name="visuals003_2"
                        geometry={nodes.visuals003_2.geometry}
                        material={materials.material_Material_aluminium}
                      />
                      <mesh
                        name="visuals003_3"
                        geometry={nodes.visuals003_3.geometry}
                        material={materials.material_Material_metal_black}
                      />
                      <mesh
                        name="visuals003_4"
                        geometry={nodes.visuals003_4.geometry}
                        material={materials.material_Material_kuka_black}
                      />
                      <mesh
                        name="visuals003_5"
                        geometry={nodes.visuals003_5.geometry}
                        material={materials.material_Material_Rubber_black}
                      />
                      <mesh
                        name="visuals003_6"
                        geometry={nodes.visuals003_6.geometry}
                        material={materials.material_Material_kuka_orange}
                      />
                      <mesh
                        name="visuals003_7"
                        geometry={nodes.visuals003_7.geometry}
                        material={materials.material_Material_stainless_steel}
                      />
                    </group>
                  </group>
                </animated.group>
                <group
                  name="link_2"
                  position={[0, 0.009, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <group name="visuals002">
                    <mesh
                      name="visuals002_1"
                      geometry={nodes.visuals002_1.geometry}
                      material={materials.material_Material_metal_black}
                    />
                    <mesh
                      name="visuals002_2"
                      geometry={nodes.visuals002_2.geometry}
                      material={materials.material_Material_Rubber_black}
                    />
                    <mesh
                      name="visuals002_3"
                      geometry={nodes.visuals002_3.geometry}
                      material={materials.material_Material_kuka_orange}
                    />
                  </group>
                </group>
              </animated.group>
              <group name="link_1" position={[0, 0.236, 0]}>
                <group name="visuals001">
                  <mesh
                    name="visuals001_1"
                    geometry={nodes.visuals001_1.geometry}
                    material={materials.material_Material_kuka_black}
                  />
                  <mesh
                    name="visuals001_2"
                    geometry={nodes.visuals001_2.geometry}
                    material={materials.material_Material_kuka_orange}
                  />
                  <mesh
                    name="visuals001_3"
                    geometry={nodes.visuals001_3.geometry}
                    material={materials.material_Material_rubber}
                  />
                  <mesh
                    name="visuals001_4"
                    geometry={nodes.visuals001_4.geometry}
                    material={materials.material_Material_metal_black}
                  />
                  <mesh
                    name="visuals001_5"
                    geometry={nodes.visuals001_5.geometry}
                    material={materials.material_Material_aluminium}
                  />
                  <mesh
                    name="visuals001_6"
                    geometry={nodes.visuals001_6.geometry}
                    material={materials.material_Material_rubber_black}
                  />
                  <mesh
                    name="visuals001_7"
                    geometry={nodes.visuals001_7.geometry}
                    material={materials.material_Material_stainless_steel}
                  />
                </group>
              </group>
            </animated.group>
            <group name="link_0">
              <group name="visuals">
                <mesh
                  name="visuals_1"
                  geometry={nodes.visuals_1.geometry}
                  material={materials.material_Material_kuka_black}
                />
                <mesh
                  name="visuals_2"
                  geometry={nodes.visuals_2.geometry}
                  material={materials.material_Material_metal_black}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  )
}
