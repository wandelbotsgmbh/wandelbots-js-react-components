import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

Yaskawa_GP88.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function Yaskawa_GP88({
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
            name="shape003"
            geometry={nodes.shape003.geometry}
            material={materials.yaskawa_blue}
          />
          <mesh
            name="shape003_1"
            geometry={nodes.shape003_1.geometry}
            material={materials.yaskawa_metalsilver}
          />
          <mesh
            name="shape003_2"
            geometry={nodes.shape003_2.geometry}
            material={materials.yaskawa_black}
          />
        </group>
        <animated.group name="YASKAWA_GP88_J00">
          <group name="link_1">
            <mesh
              name="shape030"
              geometry={nodes.shape030.geometry}
              material={materials.yaskawa_blue}
            />
            <mesh
              name="shape030_1"
              geometry={nodes.shape030_1.geometry}
              material={materials.yaskawa_black}
            />
            <mesh
              name="shape030_2"
              geometry={nodes.shape030_2.geometry}
              material={materials.yaskawa_black}
            />
            <mesh
              name="shape030_3"
              geometry={nodes.shape030_3.geometry}
              material={materials.yaskawa_metalsilver}
            />
          </group>
          <animated.group
            name="YASKAWA_GP88_J01"
            position={[0.32, 0, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
          >
            <group
              name="link_2"
              position={[0, 0, 0.32]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                name="shape029"
                geometry={nodes.shape029.geometry}
                material={materials.yaskawa_blue}
              />
              <mesh
                name="shape029_1"
                geometry={nodes.shape029_1.geometry}
                material={materials.yaskawa_black}
              />
              <mesh
                name="shape029_2"
                geometry={nodes.shape029_2.geometry}
                material={materials.yaskawa_white}
              />
              <mesh
                name="shape029_3"
                geometry={nodes.shape029_3.geometry}
                material={materials.yaskawa_metalsilver}
              />
            </group>
            <animated.group
              name="YASKAWA_GP88_J02"
              position={[0.87, 0, 0]}
              rotation={[-Math.PI, 0, 0]}
            >
              <group
                name="link_3"
                position={[-0.87, 0, -0.32]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="shape021"
                  geometry={nodes.shape021.geometry}
                  material={materials.yaskawa_blue}
                />
                <mesh
                  name="shape021_1"
                  geometry={nodes.shape021_1.geometry}
                  material={materials.yaskawa_black}
                />
                <mesh
                  name="shape021_2"
                  geometry={nodes.shape021_2.geometry}
                  material={materials.yaskawa_metalsilver}
                />
              </group>
              <animated.group
                name="YASKAWA_GP88_J03"
                position={[0.21, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="link_4"
                  geometry={nodes.link_4.geometry}
                  material={materials.yaskawa_blue}
                  position={[-1.08, 0.32, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                />
                <animated.group
                  name="YASKAWA_GP88_J04"
                  position={[0, -1.025, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="link_5"
                    geometry={nodes.link_5.geometry}
                    material={materials.yaskawa_blue}
                    position={[-1.08, 0, -1.345]}
                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  />
                  <animated.group
                    name="YASKAWA_GP88_J05"
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="link_6"
                      geometry={nodes.link_6.geometry}
                      material={materials.yaskawa_metalgold}
                      position={[-1.08, 1.345, 0]}
                      rotation={[0, 0, -Math.PI / 2]}
                    />
                    <group
                      name="YASKAWA_GP88_FLG"
                      ref={flangeRef}
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
  )
}
