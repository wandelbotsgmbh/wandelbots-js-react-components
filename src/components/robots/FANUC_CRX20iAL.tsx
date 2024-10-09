import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

FANUC_CRX20iAL.config = {
  rotationOffsets: [0, Math.PI / 2, 0, 0, 0, 0],
}

export function FANUC_CRX20iAL({
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
          <mesh
            name="link_0"
            geometry={nodes.link_0.geometry}
            material={materials.fanuc_metal_black}
          />
          <animated.group name="FANUC_CRX20iAL_J00" position={[0, -0.245, 0]}>
            <animated.group
              name="FANUC_CRX20iAL_J01"
              position={[0, 0.245, 0]}
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
            >
              <animated.group name="FANUC_CRX20iAL_J02" position={[0.71, 0, 0]}>
                <animated.group
                  name="FANUC_CRX20iAL_J03"
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="FANUC_CRX20iAL_J04"
                    position={[0, -0.54, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="FANUC_CRX20iAL_J05"
                      position={[0, 0.15, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        ref={flangeRef}
                        name="FANUC_CRX20iAL_FLG"
                        position={[0, -0.16, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="link_6"
                        geometry={nodes.link_6.geometry}
                        material={materials.fanuc_metal_black}
                        position={[-0.71, 0.54, -0.15]}
                        rotation={[0, 0, -Math.PI / 2]}
                      />
                    </animated.group>
                    <animated.group
                      name="link_5"
                      position={[-0.71, 0, -0.54]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="shape053"
                        geometry={nodes.shape053.geometry}
                        material={materials.fanuc_white}
                      />
                      <mesh
                        name="shape053_1"
                        geometry={nodes.shape053_1.geometry}
                        material={materials.fanuc_green}
                      />
                    </animated.group>
                  </animated.group>
                  <animated.group
                    name="link_4"
                    position={[-0.71, 0, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="shape054"
                      geometry={nodes.shape054.geometry}
                      material={materials.fanuc_white}
                    />
                    <mesh
                      name="shape054_1"
                      geometry={nodes.shape054_1.geometry}
                      material={materials.fanuc_red}
                    />
                    <mesh
                      name="shape054_2"
                      geometry={nodes.shape054_2.geometry}
                      material={materials.fanuc_metal_black}
                    />
                  </animated.group>
                </animated.group>
                <animated.group
                  name="link_3"
                  position={[-0.71, 0, 0]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="shape009"
                    geometry={nodes.shape009.geometry}
                    material={materials.fanuc_green}
                  />
                  <mesh
                    name="shape009_1"
                    geometry={nodes.shape009_1.geometry}
                    material={materials.fanuc_white}
                  />
                </animated.group>
              </animated.group>
              <mesh
                name="link_2"
                geometry={nodes.link_2.geometry}
                material={materials.fanuc_white}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              />
            </animated.group>
            <group name="link_1" position={[0, 0.245, 0]}>
              <mesh
                name="shape005"
                geometry={nodes.shape005.geometry}
                material={materials.fanuc_white}
              />
              <mesh
                name="shape005_1"
                geometry={nodes.shape005_1.geometry}
                material={materials.fanuc_green}
              />
            </group>
          </animated.group>
        </group>
      </group>
    </>
  )
}
