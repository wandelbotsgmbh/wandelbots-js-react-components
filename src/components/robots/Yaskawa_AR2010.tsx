import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

Yaskawa_AR2010.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
  rotationSign: [1, -1, 1, 1, 1, 1],
}

export function Yaskawa_AR2010({ modelURL, ...props }: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="AR2010" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="AR2010_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="AR2010_J02"
                position={[0.15, 0, 0]}
                rotation={[Math.PI / 2, 0, Math.PI]}
              >
                <animated.group
                  name="AR2010_J03"
                  position={[0.76, 0, 0]}
                  rotation={[Math.PI, 0, 0]}
                >
                  <animated.group
                    name="AR2010_J04"
                    position={[0.2, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR2010_J05"
                      position={[0, -1.082, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="AR2010_J06"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="AR2010_FLG"
                          position={[0, -0.1, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        ></group>
                        <group name="AR2010_L06">
                          <mesh
                            name="AR2010_06001"
                            castShadow
                            receiveShadow
                            geometry={nodes.AR2010_06001.geometry}
                            material={materials.yaskawaBlueMetall}
                          />
                          <mesh
                            name="AR2010_06001_1"
                            castShadow
                            receiveShadow
                            geometry={nodes.AR2010_06001_1.geometry}
                            material={materials.metall}
                          />
                        </group>
                      </animated.group>
                      <mesh
                        name="AR2010_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR2010_L05.geometry}
                        material={materials.yaskawaBlueMetall}
                      />
                    </animated.group>
                    <group name="AR2010_L04">
                      <mesh
                        name="AR2010_04001"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR2010_04001.geometry}
                        material={materials.yaskawaBlueMetall}
                      />
                      <mesh
                        name="AR2010_04001_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR2010_04001_1.geometry}
                        material={materials.white}
                      />
                    </group>
                  </animated.group>
                  <group name="AR2010_L03">
                    <mesh
                      name="AR2010_03001"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR2010_03001.geometry}
                      material={materials.yaskawaBlueMetall}
                    />
                    <mesh
                      name="AR2010_03001_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR2010_03001_1.geometry}
                      material={materials.blackMetall}
                    />
                  </group>
                </animated.group>
                <mesh
                  name="AR2010_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR2010_L02.geometry}
                  material={materials.yaskawaBlueMetall}
                />
              </animated.group>
              <group name="AR2010_L01">
                <mesh
                  name="AR2010_01001"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR2010_01001.geometry}
                  material={materials.yaskawaBlueMetall}
                />
                <mesh
                  name="AR2010_01001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR2010_01001_1.geometry}
                  material={materials.blackMetall}
                />
              </group>
            </animated.group>
            <mesh
              name="AR2010_L00"
              castShadow
              receiveShadow
              geometry={nodes.AR2010_L00.geometry}
              material={materials.yaskawaBlueMetall}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
