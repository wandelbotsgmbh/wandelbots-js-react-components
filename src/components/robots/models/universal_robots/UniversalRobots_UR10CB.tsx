import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "../../types"

export function UniversalRobots_UR10CB({
  modelURL,
  flangeRef,
  ...props
}: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <animated.group name="UNIVERSALROBOTS_UR10CB_J00">
          <group name="link_0">
            <mesh
              name="visuals_0"
              geometry={nodes.visuals_0.geometry}
              material={materials.universalrobots_aluminum}
            />
            <mesh
              name="visuals_0_1"
              geometry={nodes.visuals_0_1.geometry}
              material={materials.universalrobots_aluminum}
            />
          </group>
          <animated.group
            name="UNIVERSALROBOTS_UR10CB_J01"
            position={[0, 0.127, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group
              name="link_1"
              position={[0, 0, 0.127]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <mesh
                name="visuals_1"
                geometry={nodes.visuals_1.geometry}
                material={materials.universalrobots_darkgrey}
              />
              <mesh
                name="visuals_1_1"
                geometry={nodes.visuals_1_1.geometry}
                material={materials.universalrobots_stainlesssteel}
              />
              <mesh
                name="visuals_1_2"
                geometry={nodes.visuals_1_2.geometry}
                material={materials.universalrobots_stainlesssteel}
              />
              <mesh
                name="visuals_1_3"
                geometry={nodes.visuals_1_3.geometry}
                material={materials.universalrobots_stainlesssteel}
              />
              <mesh
                name="visuals_1_4"
                geometry={nodes.visuals_1_4.geometry}
                material={materials.universalrobots_black}
              />
              <mesh
                name="visuals_1_5"
                geometry={nodes.visuals_1_5.geometry}
                material={materials.universalrobots_lightblue}
              />
            </group>
            <animated.group
              name="UNIVERSALROBOTS_UR10CB_J02"
              position={[-0.612, 0, 0]}
            >
              <group
                name="link_2"
                position={[0.612, 0, 0.127]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="visuals_2"
                  geometry={nodes.visuals_2.geometry}
                  material={materials.universalrobots_aluminum}
                />
                <mesh
                  name="visuals_2_1"
                  geometry={nodes.visuals_2_1.geometry}
                  material={materials.universalrobots_stainlesssteel}
                />
                <mesh
                  name="visuals_2_2"
                  geometry={nodes.visuals_2_2.geometry}
                  material={materials.universalrobots_darkgrey}
                />
                <mesh
                  name="visuals_2_3"
                  geometry={nodes.visuals_2_3.geometry}
                  material={materials.universalrobots_black}
                />
                <mesh
                  name="visuals_2_4"
                  geometry={nodes.visuals_2_4.geometry}
                  material={materials.universalrobots_stainlesssteel}
                />
                <mesh
                  name="visuals_2_5"
                  geometry={nodes.visuals_2_5.geometry}
                  material={materials.universalrobots_lightblue}
                />
              </group>
              <animated.group
                name="UNIVERSALROBOTS_UR10CB_J03"
                position={[-0.572, 0, 0]}
              >
                <group
                  name="link_3"
                  position={[1.184, 0, 0.127]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="visuals_3"
                    geometry={nodes.visuals_3.geometry}
                    material={materials.universalrobots_aluminum}
                  />
                  <mesh
                    name="visuals_3_1"
                    geometry={nodes.visuals_3_1.geometry}
                    material={materials.universalrobots_stainlesssteel}
                  />
                  <mesh
                    name="visuals_3_2"
                    geometry={nodes.visuals_3_2.geometry}
                    material={materials.universalrobots_darkgrey}
                  />
                  <mesh
                    name="visuals_3_3"
                    geometry={nodes.visuals_3_3.geometry}
                    material={materials.universalrobots_black}
                  />
                  <mesh
                    name="visuals_3_4"
                    geometry={nodes.visuals_3_4.geometry}
                    material={materials.universalrobots_lightblue}
                  />
                </group>
                <animated.group
                  name="UNIVERSALROBOTS_UR10CB_J04"
                  position={[0, 0.164, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <group
                    name="link_4"
                    position={[1.184, 0.127, 0.164]}
                    rotation={[Math.PI, 0, 0]}
                  >
                    <mesh
                      name="visuals_4"
                      geometry={nodes.visuals_4.geometry}
                      material={materials.universalrobots_darkgrey}
                    />
                    <mesh
                      name="visuals_4_1"
                      geometry={nodes.visuals_4_1.geometry}
                      material={materials.universalrobots_stainlesssteel}
                    />
                    <mesh
                      name="visuals_4_2"
                      geometry={nodes.visuals_4_2.geometry}
                      material={materials.universalrobots_black}
                    />
                    <mesh
                      name="visuals_4_3"
                      geometry={nodes.visuals_4_3.geometry}
                      material={materials.universalrobots_stainlesssteel}
                    />
                    <mesh
                      name="visuals_4_4"
                      geometry={nodes.visuals_4_4.geometry}
                      material={materials.universalrobots_lightblue}
                    />
                  </group>
                  <animated.group
                    name="UNIVERSALROBOTS_UR10CB_J05"
                    position={[0, 0.116, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group
                      name="link_5"
                      position={[1.184, -0.164, 0.012]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="visuals_5"
                        geometry={nodes.visuals_5.geometry}
                        material={materials.universalrobots_darkgrey}
                      />
                      <mesh
                        name="visuals_5_1"
                        geometry={nodes.visuals_5_1.geometry}
                        material={materials.universalrobots_stainlesssteel}
                      />
                      <mesh
                        name="visuals_5_2"
                        geometry={nodes.visuals_5_2.geometry}
                        material={materials.universalrobots_black}
                      />
                      <mesh
                        name="visuals_5_3"
                        geometry={nodes.visuals_5_3.geometry}
                        material={materials.universalrobots_aluminum}
                      />
                      <mesh
                        name="visuals_5_4"
                        geometry={nodes.visuals_5_4.geometry}
                        material={materials.universalrobots_lightblue}
                      />
                    </group>
                    <group
                      ref={flangeRef}
                      name="UNIVERSALROBOTS_UR10CB_FLG"
                      position={[0, 0.116, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group name="link_6" position={[1.184, -0.012, -0.28]}>
                        <mesh
                          name="visuals_6"
                          geometry={nodes.visuals_6.geometry}
                          material={materials.universalrobots_aluminum}
                        />
                        <mesh
                          name="visuals_6_1"
                          geometry={nodes.visuals_6_1.geometry}
                          material={materials.universalrobots_aluminum}
                        />
                      </group>
                    </group>
                  </animated.group>
                </animated.group>
              </animated.group>
            </animated.group>
          </animated.group>
        </animated.group>
      </group>
    </group>
  )
}
