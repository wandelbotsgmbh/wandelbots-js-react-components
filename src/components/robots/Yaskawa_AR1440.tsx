import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

Yaskawa_AR1440.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
  rotationSign: [1, -1, 1, 1, 1, 1],
}

export function Yaskawa_AR1440({
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
          <group name="AR1440" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="AR1440_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="AR1440_J02"
                position={[0.155, 0, 0]}
                rotation={[Math.PI / 2, 0, Math.PI]}
              >
                <animated.group
                  name="AR1440_J03"
                  position={[0.614, 0, 0]}
                  rotation={[Math.PI, 0, 0]}
                >
                  <animated.group
                    name="AR1440_J04"
                    position={[0.2, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR1440_J05"
                      position={[0, -0.64, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="AR1440_J06"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          ref={flangeRef}
                          name="AR1440_FLG"
                          position={[0, -0.1, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        ></group>
                        <mesh
                          name="AR1440_L06_CAD"
                          castShadow
                          receiveShadow
                          geometry={nodes.AR1440_L06_CAD.geometry}
                          material={materials.metall}
                        />
                      </animated.group>
                      <mesh
                        name="AR1440_L05_CAD"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L05_CAD.geometry}
                        material={materials.yaskawaBlueMetall}
                      />
                    </animated.group>
                    <group name="AR1440_L04_CAD">
                      <mesh
                        name="AR1440_L04_CAD001"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L04_CAD001.geometry}
                        material={materials.yaskawaBlueMetall}
                      />
                      <mesh
                        name="AR1440_L04_CAD001_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L04_CAD001_1.geometry}
                        material={materials.white}
                      />
                    </group>
                  </animated.group>
                  <group name="AR1440_L03_CAD">
                    <mesh
                      name="AR1440_L03_CAD001"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1440_L03_CAD001.geometry}
                      material={materials.yaskawaBlueMetall}
                    />
                    <mesh
                      name="AR1440_L03_CAD001_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1440_L03_CAD001_1.geometry}
                      material={materials.blackMetall}
                    />
                  </group>
                </animated.group>
                <mesh
                  name="AR1440_L02_CAD"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR1440_L02_CAD.geometry}
                  material={materials.yaskawaBlueMetall}
                />
              </animated.group>
              <group name="AR1440_L01_CAD">
                <mesh
                  name="AR1440_L01_CAD001"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR1440_L01_CAD001.geometry}
                  material={materials.yaskawaBlueMetall}
                />
                <mesh
                  name="AR1440_L01_CAD001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR1440_L01_CAD001_1.geometry}
                  material={materials.blackMetall}
                />
              </group>
            </animated.group>
            <mesh
              name="AR1440_L00_CAD"
              castShadow
              receiveShadow
              geometry={nodes.AR1440_L00_CAD.geometry}
              material={materials.yaskawaBlueMetall}
              position={[0, 0, 0.45]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
