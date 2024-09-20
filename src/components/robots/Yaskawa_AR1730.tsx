import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

Yaskawa_AR1730.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
  rotationSign: [1, -1, 1, 1, 1, 1],
}

export function Yaskawa_AR1730({ modelURL, ...props }: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          <animated.group name="AR1730_J00">
            <animated.group
              name="AR1730_J01"
              position={[0.15, 0, 0]}
              rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            >
              <animated.group
                name="AR1730_J02"
                position={[0.76, 0, 0]}
                rotation={[-Math.PI, 0, 0]}
              >
                <animated.group
                  name="AR1730_J03"
                  position={[0.2, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="AR1730_J04"
                    position={[0, -0.795, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR1730_J05"
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group
                        name="AR1730_FLG"
                        position={[0, -0.1, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="AR1730_L06"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1730_L06.geometry}
                        material={materials.Metal}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                      />
                    </animated.group>
                    <mesh
                      name="AR1730_L05"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1730_L05.geometry}
                      material={materials.Blue}
                      rotation={[Math.PI / 2, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <group
                    name="AR1730_L04"
                    position={[0, -0.302, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="_R_AXIS_SW0001002"
                      castShadow
                      receiveShadow
                      geometry={nodes._R_AXIS_SW0001002.geometry}
                      material={materials.Blue}
                    />
                    <mesh
                      name="_R_AXIS_SW0001002_1"
                      castShadow
                      receiveShadow
                      geometry={nodes._R_AXIS_SW0001002_1.geometry}
                      material={materials.White}
                    />
                  </group>
                </animated.group>
                <group
                  name="AR1730_L03"
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="_U_AXIS_SW0001002"
                    castShadow
                    receiveShadow
                    geometry={nodes._U_AXIS_SW0001002.geometry}
                    material={materials.Blue}
                  />
                  <mesh
                    name="_U_AXIS_SW0001002_1"
                    castShadow
                    receiveShadow
                    geometry={nodes._U_AXIS_SW0001002_1.geometry}
                    material={materials.Black}
                  />
                </group>
              </animated.group>
              <mesh
                name="AR1730_L02"
                castShadow
                receiveShadow
                geometry={nodes.AR1730_L02.geometry}
                material={materials.Blue}
                position={[0, -0.157, 0]}
                rotation={[-Math.PI, -1.571, 0]}
              />
            </animated.group>
            <group
              name="AR1730_L01"
              position={[0, -0.336, 0]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                name="_S_AXIS_SW0001002"
                castShadow
                receiveShadow
                geometry={nodes._S_AXIS_SW0001002.geometry}
                material={materials.Blue}
              />
              <mesh
                name="_S_AXIS_SW0001002_1"
                castShadow
                receiveShadow
                geometry={nodes._S_AXIS_SW0001002_1.geometry}
                material={materials.Black}
              />
            </group>
          </animated.group>
          <mesh
            name="AR1730_L00"
            castShadow
            receiveShadow
            geometry={nodes.AR1730_L00.geometry}
            material={materials.Blue}
            position={[0, -0.505, 0]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
        </group>
      </group>
    </>
  )
}
