import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "../../types"

Yaskawa_GP50.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function Yaskawa_GP50({
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
          <group name="link_0">
            <mesh
              name="shape439"
              geometry={nodes.shape439.geometry}
              material={materials.yaskawa_blue}
            />
            <mesh
              name="shape439_1"
              geometry={nodes.shape439_1.geometry}
              material={materials.yaskawa_metalsilver}
            />
            <mesh
              name="shape439_2"
              geometry={nodes.shape439_2.geometry}
              material={materials.yaskawa_black}
            />
          </group>
          <animated.group name="YASKAWA_GP50_J00" position={[0, -0.54, 0]}>
            <group name="link_1" position={[0, 0.54, 0]}>
              <mesh
                name="shape320"
                geometry={nodes.shape320.geometry}
                material={materials.yaskawa_blue}
              />
              <mesh
                name="shape320_1"
                geometry={nodes.shape320_1.geometry}
                material={materials.yaskawa_black}
              />
              <mesh
                name="shape320_2"
                geometry={nodes.shape320_2.geometry}
                material={materials.yaskawa_metalsilver}
              />
              <mesh
                name="shape320_3"
                geometry={nodes.shape320_3.geometry}
                material={materials.yaskawa_black}
              />
              <mesh
                name="shape320_4"
                geometry={nodes.shape320_4.geometry}
                material={materials.yaskawa_white}
              />
              <mesh
                name="shape320_5"
                geometry={nodes.shape320_5.geometry}
                material={materials.yaskawa_black}
              />
            </group>
            <animated.group
              name="YASKAWA_GP50_J01"
              position={[0.145, 0.54, 0]}
              rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            >
              <group
                name="link_2"
                position={[0, 0, 0.145]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="shape440"
                  geometry={nodes.shape440.geometry}
                  material={materials.yaskawa_blue}
                />
                <mesh
                  name="shape440_1"
                  geometry={nodes.shape440_1.geometry}
                  material={materials.yaskawa_white}
                />
                <mesh
                  name="shape440_2"
                  geometry={nodes.shape440_2.geometry}
                  material={materials.yaskawa_metalsilver}
                />
                <mesh
                  name="shape440_3"
                  geometry={nodes.shape440_3.geometry}
                  material={materials.yaskawa_black}
                />
              </group>
              <animated.group
                name="YASKAWA_GP50_J02"
                position={[0.87, 0, 0]}
                rotation={[-Math.PI, 0, 0]}
              >
                <group
                  name="link_3"
                  position={[-0.87, 0, -0.145]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="shape341"
                    geometry={nodes.shape341.geometry}
                    material={materials.yaskawa_blue}
                  />
                  <mesh
                    name="shape341_1"
                    geometry={nodes.shape341_1.geometry}
                    material={materials.yaskawa_white}
                  />
                  <mesh
                    name="shape341_2"
                    geometry={nodes.shape341_2.geometry}
                    material={materials.yaskawa_black}
                  />
                  <mesh
                    name="shape341_3"
                    geometry={nodes.shape341_3.geometry}
                    material={materials.yaskawa_black}
                  />
                  <mesh
                    name="shape341_4"
                    geometry={nodes.shape341_4.geometry}
                    material={materials.yaskawa_metalsilver}
                  />
                  <mesh
                    name="shape341_5"
                    geometry={nodes.shape341_5.geometry}
                    material={materials.yaskawa_metalsilver}
                  />
                </group>
                <animated.group
                  name="YASKAWA_GP50_J03"
                  position={[0.21, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="link_4"
                    geometry={nodes.link_4.geometry}
                    material={materials.yaskawa_blue}
                    position={[-1.08, 0.145, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  />
                  <animated.group
                    name="YASKAWA_GP50_J04"
                    position={[0, -1.025, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="link_5"
                      geometry={nodes.link_5.geometry}
                      material={materials.yaskawa_blue}
                      position={[-1.08, 0, -1.17]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                    />
                    <animated.group
                      name="YASKAWA_GP50_J05"
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="link_6"
                        geometry={nodes.link_6.geometry}
                        material={materials.yaskawa_metalsilver}
                        position={[-1.08, 1.17, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      />
                      <group
                        ref={flangeRef}
                        name="YASKAWA_GP50_FLG"
                        position={[0, -0.175, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                    </animated.group>
                  </animated.group>
                </animated.group>
              </animated.group>
            </animated.group>
          </animated.group>
        </group>
      </group>
    </>
  )
}
