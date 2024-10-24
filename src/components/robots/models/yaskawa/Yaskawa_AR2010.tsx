import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "../../types"

Yaskawa_AR2010.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function Yaskawa_AR2010({
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
            name="shape"
            geometry={nodes.shape.geometry}
            material={materials.yaskawa_black}
          />
          <mesh
            name="shape_1"
            geometry={nodes.shape_1.geometry}
            material={materials.yaskawa_metalsilver}
          />
          <mesh
            name="shape_2"
            geometry={nodes.shape_2.geometry}
            material={materials.yaskawa_blue}
          />
          <mesh
            name="shape_3"
            geometry={nodes.shape_3.geometry}
            material={materials.yaskawa_metalsilver}
          />
        </group>
        <animated.group name="YASKAWA_AR2010_J00">
          <group name="link_1">
            <mesh
              name="shape001"
              geometry={nodes.shape001.geometry}
              material={materials.yaskawa_black}
            />
            <mesh
              name="shape001_1"
              geometry={nodes.shape001_1.geometry}
              material={materials.yaskawa_blue}
            />
          </group>
          <animated.group
            name="YASKAWA_AR2010_J01"
            position={[0.15, 0, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
          >
            <mesh
              name="link_2"
              geometry={nodes.link_2.geometry}
              material={materials.yaskawa_blue}
              position={[0, 0, 0.15]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            />
            <animated.group
              name="YASKAWA_AR2010_J02"
              position={[0.76, 0, 0]}
              rotation={[-Math.PI, 0, 0]}
            >
              <group
                name="link_3"
                position={[-0.76, 0, -0.15]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="shape003"
                  geometry={nodes.shape003.geometry}
                  material={materials.yaskawa_black}
                />
                <mesh
                  name="shape003_1"
                  geometry={nodes.shape003_1.geometry}
                  material={materials.yaskawa_blue}
                />
              </group>
              <animated.group
                name="YASKAWA_AR2010_J03"
                position={[0.2, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="link_4"
                  geometry={nodes.link_4.geometry}
                  material={materials.yaskawa_blue}
                  position={[-0.96, 0.15, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                />
                <animated.group
                  name="YASKAWA_AR2010_J04"
                  position={[0, -1.082, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="link_5"
                    geometry={nodes.link_5.geometry}
                    material={materials.yaskawa_blue}
                    position={[-0.96, 0, -1.232]}
                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  />
                  <animated.group
                    name="YASKAWA_AR2010_J05"
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="link_6"
                      geometry={nodes.link_6.geometry}
                      material={materials.yaskawa_metalsilver}
                      position={[-0.96, 1.232, 0]}
                      rotation={[0, 0, -Math.PI / 2]}
                    />
                    <group
                      ref={flangeRef}
                      name="YASKAWA_AR2010_FLG"
                      position={[0, -0.1, 0]}
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
