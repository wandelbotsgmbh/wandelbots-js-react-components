import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

export function UniversalRobots_UR10e({
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
          <animated.group name="UNIVERSALROBOTS_UR10E_J00">
            <group name="link_1">
              <mesh
                name="C-1000488"
                castShadow
                receiveShadow
                geometry={nodes["C-1000488"].geometry}
                material={materials.Black}
              />
              <mesh
                name="C-1000488_1"
                castShadow
                receiveShadow
                geometry={nodes["C-1000488_1"].geometry}
                material={materials.Blue}
              />
              <mesh
                name="C-1000488_2"
                castShadow
                receiveShadow
                geometry={nodes["C-1000488_2"].geometry}
                material={materials.Screw}
              />
              <mesh
                name="C-1000488_3"
                castShadow
                receiveShadow
                geometry={nodes["C-1000488_3"].geometry}
                material={materials.DarkGray}
              />
            </group>
            <animated.group
              name="UNIVERSALROBOTS_UR10E_J01"
              position={[0, 0.181, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <group
                name="link_2"
                position={[0, 0, 0.181]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="C-1000489"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000489"].geometry}
                  material={materials.Blue}
                />
                <mesh
                  name="C-1000489_1"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000489_1"].geometry}
                  material={materials.Black}
                />
                <mesh
                  name="C-1000489_2"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000489_2"].geometry}
                  material={materials.DarkGray}
                />
                <mesh
                  name="C-1000489_3"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000489_3"].geometry}
                  material={materials.Screw}
                />
                <mesh
                  name="C-1000489_4"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000489_4"].geometry}
                  material={materials.Metal}
                />
              </group>
              <animated.group
                name="UNIVERSALROBOTS_UR10E_J02"
                position={[-0.613, 0, 0]}
              >
                <group
                  name="link_3"
                  position={[0.613, 0, 0.181]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="C-1000490"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000490"].geometry}
                    material={materials.Metal}
                  />
                  <mesh
                    name="C-1000490_1"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000490_1"].geometry}
                    material={materials.Black}
                  />
                  <mesh
                    name="C-1000490_2"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000490_2"].geometry}
                    material={materials.DarkGray}
                  />
                  <mesh
                    name="C-1000490_3"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000490_3"].geometry}
                    material={materials.Blue}
                  />
                  <mesh
                    name="C-1000490_4"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000490_4"].geometry}
                    material={materials.Screw}
                  />
                </group>
                <animated.group
                  name="UNIVERSALROBOTS_UR10E_J03"
                  position={[-0.572, 0, 0]}
                >
                  <group
                    name="link_4"
                    position={[1.184, 0, 0.181]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="C-1000491"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000491"].geometry}
                      material={materials.DarkGray}
                    />
                    <mesh
                      name="C-1000491_1"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000491_1"].geometry}
                      material={materials.Blue}
                    />
                    <mesh
                      name="C-1000491_2"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000491_2"].geometry}
                      material={materials.Black}
                    />
                    <mesh
                      name="C-1000491_3"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000491_3"].geometry}
                      material={materials.Screw}
                    />
                  </group>
                  <animated.group
                    name="UNIVERSALROBOTS_UR10E_J04"
                    position={[0, 0.174, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <group
                      name="link_5"
                      position={[1.184, 0.181, 0.174]}
                      rotation={[Math.PI, 0, 0]}
                    >
                      <mesh
                        name="C-1000492"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000492"].geometry}
                        material={materials.DarkGray}
                      />
                      <mesh
                        name="C-1000492_1"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000492_1"].geometry}
                        material={materials.Black}
                      />
                      <mesh
                        name="C-1000492_2"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000492_2"].geometry}
                        material={materials.Blue}
                      />
                      <mesh
                        name="C-1000492_3"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000492_3"].geometry}
                        material={materials.Screw}
                      />
                    </group>
                    <animated.group
                      name="UNIVERSALROBOTS_UR10E_J05"
                      position={[0, 0.12, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group
                        name="link_6"
                        position={[1.184, -0.174, 0.061]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <mesh
                          name="C-1000493"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000493"].geometry}
                          material={materials.Black}
                        />
                        <mesh
                          name="C-1000493_1"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000493_1"].geometry}
                          material={materials.Metal}
                        />
                      </group>
                      <group
                        ref={flangeRef}
                        name="UNIVERSALROBOTS_UR10E_FLG"
                        position={[0, 0.117, 0]}
                      />
                    </animated.group>
                  </animated.group>
                </animated.group>
              </animated.group>
            </animated.group>
          </animated.group>
          <group name="link_0">
            <mesh
              name="C-1000487"
              castShadow
              receiveShadow
              geometry={nodes["C-1000487"].geometry}
              material={materials.Black}
            />
            <mesh
              name="C-1000487_1"
              castShadow
              receiveShadow
              geometry={nodes["C-1000487_1"].geometry}
              material={materials.Metal}
            />
          </group>
        </group>
      </group>
    </>
  )
}
