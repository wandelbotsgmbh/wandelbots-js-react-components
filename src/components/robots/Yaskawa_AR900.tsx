import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

Yaskawa_AR900.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function Yaskawa_AR900({ modelURL, ...props }: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="AR900" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="AR900_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="AR900_J02"
                position={[0.04, 0, 0]}
                rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
              >
                <animated.group
                  name="AR900_J03"
                  position={[0.445, 0, 0]}
                  rotation={[-Math.PI, 0, 0]}
                >
                  <animated.group
                    name="AR900_J04"
                    position={[0.04, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR900_J05"
                      position={[0, -0.44, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="AR900_J06"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="AR900_FLG"
                          position={[0, -0.08, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        />
                        <mesh
                          name="AR900_L06"
                          geometry={nodes.AR900_L06.geometry}
                          material={materials["#BBA474.001"]}
                        />
                      </animated.group>
                      <mesh
                        name="AR900_L05"
                        geometry={nodes.AR900_L05.geometry}
                        material={materials["#0056b9.001"]}
                      />
                    </animated.group>
                    <mesh
                      name="AR900_L04"
                      geometry={nodes.AR900_L04.geometry}
                      material={materials["#0056b9.001"]}
                    />
                  </animated.group>
                  <mesh
                    name="AR900_L03"
                    geometry={nodes.AR900_L03.geometry}
                    material={materials["#0056b9.001"]}
                  />
                </animated.group>
                <mesh
                  name="AR900_L02"
                  geometry={nodes.AR900_L02.geometry}
                  material={materials["#0056b9.001"]}
                />
              </animated.group>
              <mesh
                name="AR900_L01"
                geometry={nodes.AR900_L01.geometry}
                material={materials["#0056b9.001"]}
              />
            </animated.group>
            <mesh
              name="AR900_L00"
              geometry={nodes.AR900_L00.geometry}
              material={materials["#0056b9.001"]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
