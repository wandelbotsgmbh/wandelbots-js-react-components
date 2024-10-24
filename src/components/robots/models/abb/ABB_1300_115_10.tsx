import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "../../types"

ABB_1300_115_10.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function ABB_1300_115_10({
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
            name="visuals_0"
            geometry={nodes.visuals_0.geometry}
            material={materials.abb_metal_black}
          />
          <mesh
            name="visuals_0_1"
            geometry={nodes.visuals_0_1.geometry}
            material={materials.abb_white}
          />
          <mesh
            name="visuals_0_2"
            geometry={nodes.visuals_0_2.geometry}
            material={materials.abb_metal_polished}
          />
          <mesh
            name="visuals_0_3"
            geometry={nodes.visuals_0_3.geometry}
            material={materials.abb_red}
          />
        </group>
        <animated.group name="ABB_IRB1300_115_10_J00">
          <animated.group
            name="ABB_IRB1300_115_10_J01"
            position={[0.15, 0.544, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
          >
            <animated.group
              name="ABB_IRB1300_115_10_J02"
              position={[0.575, 0, 0]}
            >
              <animated.group
                name="ABB_IRB1300_115_10_J03"
                position={[0.04, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="ABB_IRB1300_115_10_J04"
                  position={[0, 0.425, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="ABB_IRB1300_115_10_J05"
                    rotation={[Math.PI / 2, 0, -Math.PI]}
                  >
                    <group
                      ref={flangeRef}
                      name="ABB_IRB1300_115_10_FLG"
                      position={[0, 0.092, 0]}
                    />
                    <mesh
                      name="link_6"
                      geometry={nodes.link_6.geometry}
                      material={materials.abb_metal_polished}
                      position={[1.159, -0.575, 0]}
                      rotation={[0, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <group
                    name="link_5"
                    position={[-1.159, 0, 0.575]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals_5"
                      geometry={nodes.visuals_5.geometry}
                      material={materials.abb_white}
                    />
                    <mesh
                      name="visuals_5_1"
                      geometry={nodes.visuals_5_1.geometry}
                      material={materials.abb_metal_black}
                    />
                  </group>
                </animated.group>
                <group
                  name="link_4"
                  position={[-1.159, -0.15, 0]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals_4"
                    geometry={nodes.visuals_4.geometry}
                    material={materials.abb_metal_polished}
                  />
                  <mesh
                    name="visuals_4_1"
                    geometry={nodes.visuals_4_1.geometry}
                    material={materials.abb_white}
                  />
                  <mesh
                    name="visuals_4_2"
                    geometry={nodes.visuals_4_2.geometry}
                    material={materials.abb_red}
                  />
                  <mesh
                    name="visuals_4_3"
                    geometry={nodes.visuals_4_3.geometry}
                    material={materials.abb_metal_black}
                  />
                </group>
              </animated.group>
              <group
                name="link_3"
                position={[-1.119, 0, 0.15]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="visuals_3"
                  geometry={nodes.visuals_3.geometry}
                  material={materials.abb_white}
                />
                <mesh
                  name="visuals_3_1"
                  geometry={nodes.visuals_3_1.geometry}
                  material={materials.abb_red}
                />
                <mesh
                  name="visuals_3_2"
                  geometry={nodes.visuals_3_2.geometry}
                  material={materials.abb_metal_black}
                />
              </group>
            </animated.group>
            <group
              name="link_2"
              position={[-0.544, 0, 0.15]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                name="visuals_2"
                geometry={nodes.visuals_2.geometry}
                material={materials.abb_white}
              />
              <mesh
                name="visuals_2_1"
                geometry={nodes.visuals_2_1.geometry}
                material={materials.abb_metal_black}
              />
            </group>
          </animated.group>
          <group name="link_1">
            <mesh
              name="visuals_1"
              geometry={nodes.visuals_1.geometry}
              material={materials.abb_white}
            />
            <mesh
              name="visuals_1_1"
              geometry={nodes.visuals_1_1.geometry}
              material={materials.abb_metal_black}
            />
          </group>
        </animated.group>
      </group>
    </group>
  )
}
