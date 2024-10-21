import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

export function UniversalRobots_UR16e({
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
        <group name="link_0">
          <mesh
            name="shape007"
            geometry={nodes.shape007.geometry}
            material={materials.universalrobots_stainlesssteel}
          />
          <mesh
            name="shape007_1"
            geometry={nodes.shape007_1.geometry}
            material={materials.universalrobots_stainlesssteel}
          />
          <mesh
            name="shape007_2"
            geometry={nodes.shape007_2.geometry}
            material={materials.universalrobots_aluminum}
          />
          <mesh
            name="shape007_3"
            geometry={nodes.shape007_3.geometry}
            material={materials.universalrobots_aluminum}
          />
          <mesh
            name="shape007_4"
            geometry={nodes.shape007_4.geometry}
            material={materials.universalrobots_black}
          />
        </group>
        <animated.group name="UNIVERSALROBOTS_UR16E_J00">
          <group name="link_1">
            <mesh
              name="shape039"
              geometry={nodes.shape039.geometry}
              material={materials.universalrobots_lightblue}
            />
            <mesh
              name="shape039_1"
              geometry={nodes.shape039_1.geometry}
              material={materials.universalrobots_darkgrey}
            />
            <mesh
              name="shape039_2"
              geometry={nodes.shape039_2.geometry}
              material={materials.universalrobots_stainlesssteel}
            />
            <mesh
              name="shape039_3"
              geometry={nodes.shape039_3.geometry}
              material={materials.universalrobots_black}
            />
          </group>
          <animated.group
            name="UNIVERSALROBOTS_UR16E_J01"
            position={[0, 0.181, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group
              name="link_2"
              position={[0.181, 0, 0]}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            >
              <mesh
                name="shape002"
                geometry={nodes.shape002.geometry}
                material={materials.universalrobots_darkgrey}
              />
              <mesh
                name="shape002_1"
                geometry={nodes.shape002_1.geometry}
                material={materials.universalrobots_black}
              />
              <mesh
                name="shape002_2"
                geometry={nodes.shape002_2.geometry}
                material={materials.universalrobots_lightblue}
              />
              <mesh
                name="shape002_3"
                geometry={nodes.shape002_3.geometry}
                material={materials.universalrobots_aluminum}
              />
              <mesh
                name="shape002_4"
                geometry={nodes.shape002_4.geometry}
                material={materials.universalrobots_stainlesssteel}
              />
            </group>
            <animated.group
              name="UNIVERSALROBOTS_UR16E_J02"
              position={[-0.478, 0, 0]}
            >
              <group
                name="link_3"
                position={[0.659, 0, 0]}
                rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              >
                <mesh
                  name="shape005"
                  geometry={nodes.shape005.geometry}
                  material={materials.universalrobots_stainlesssteel}
                />
                <mesh
                  name="shape005_1"
                  geometry={nodes.shape005_1.geometry}
                  material={materials.universalrobots_aluminum}
                />
                <mesh
                  name="shape005_2"
                  geometry={nodes.shape005_2.geometry}
                  material={materials.universalrobots_black}
                />
                <mesh
                  name="shape005_3"
                  geometry={nodes.shape005_3.geometry}
                  material={materials.universalrobots_lightblue}
                />
                <mesh
                  name="shape005_4"
                  geometry={nodes.shape005_4.geometry}
                  material={materials.universalrobots_darkgrey}
                />
              </group>
              <animated.group
                name="UNIVERSALROBOTS_UR16E_J03"
                position={[-0.36, 0, 0]}
              >
                <group
                  name="link_4"
                  position={[0, 0, -1.019]}
                  rotation={[-Math.PI / 2, 0, Math.PI]}
                >
                  <mesh
                    name="shape003"
                    geometry={nodes.shape003.geometry}
                    material={materials.universalrobots_lightblue}
                  />
                  <mesh
                    name="shape003_1"
                    geometry={nodes.shape003_1.geometry}
                    material={materials.universalrobots_darkgrey}
                  />
                  <mesh
                    name="shape003_2"
                    geometry={nodes.shape003_2.geometry}
                    material={materials.universalrobots_black}
                  />
                  <mesh
                    name="shape003_3"
                    geometry={nodes.shape003_3.geometry}
                    material={materials.universalrobots_stainlesssteel}
                  />
                </group>
                <animated.group
                  name="UNIVERSALROBOTS_UR16E_J04"
                  position={[0, 0.174, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <group
                    name="link_5"
                    position={[0, -1.019, 0.174]}
                    rotation={[Math.PI, 0, Math.PI]}
                  >
                    <mesh
                      name="shape"
                      geometry={nodes.shape.geometry}
                      material={materials.universalrobots_lightblue}
                    />
                    <mesh
                      name="shape_1"
                      geometry={nodes.shape_1.geometry}
                      material={materials.universalrobots_darkgrey}
                    />
                    <mesh
                      name="shape_2"
                      geometry={nodes.shape_2.geometry}
                      material={materials.universalrobots_black}
                    />
                    <mesh
                      name="shape_3"
                      geometry={nodes.shape_3.geometry}
                      material={materials.universalrobots_stainlesssteel}
                    />
                  </group>
                  <animated.group
                    name="UNIVERSALROBOTS_UR16E_J05"
                    position={[0, 0.12, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group
                      name="link_6"
                      position={[0, -0.174, -1.139]}
                      rotation={[-Math.PI / 2, 0, Math.PI]}
                    >
                      <mesh
                        name="shape004"
                        geometry={nodes.shape004.geometry}
                        material={materials.universalrobots_aluminum}
                      />
                      <mesh
                        name="shape004_1"
                        geometry={nodes.shape004_1.geometry}
                        material={materials.universalrobots_black}
                      />
                    </group>
                    <group
                      ref={flangeRef}
                      name="UNIVERSALROBOTS_UR16E_FLG"
                      position={[0, 0.117, 0]}
                    />
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
