import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "../../types"

Yaskawa_AR900.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function Yaskawa_AR900({
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
              name="visuals"
              geometry={nodes.visuals.geometry}
              material={materials.yaskawa_blue}
            />
            <mesh
              name="visuals_1"
              geometry={nodes.visuals_1.geometry}
              material={materials.yaskawa_black}
            />
            <mesh
              name="visuals_2"
              geometry={nodes.visuals_2.geometry}
              material={materials.yaskawa_metalsilver}
            />
          </group>
          <animated.group name="YASKAWA_GP7_J00">
            <mesh
              name="link_1"
              geometry={nodes.link_1.geometry}
              material={materials.yaskawa_blue}
            />
            <animated.group
              name="YASKAWA_GP7_J01"
              position={[0.04, 0, 0]}
              rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            >
              <mesh
                name="link_2"
                geometry={nodes.link_2.geometry}
                material={materials.yaskawa_blue}
                position={[0, 0, 0.04]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              />
              <animated.group
                name="YASKAWA_GP7_J02"
                position={[0.445, 0, 0]}
                rotation={[-Math.PI, 0, 0]}
              >
                <group
                  name="link_3"
                  position={[-0.445, 0, -0.04]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals003"
                    geometry={nodes.visuals003.geometry}
                    material={materials.yaskawa_blue}
                  />
                  <mesh
                    name="visuals003_1"
                    geometry={nodes.visuals003_1.geometry}
                    material={materials.material_Material_Metall__1_}
                  />
                  <mesh
                    name="visuals003_2"
                    geometry={nodes.visuals003_2.geometry}
                    material={materials.yaskawa_black}
                  />
                </group>
                <animated.group
                  name="YASKAWA_GP7_J03"
                  position={[0.04, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <group
                    name="link_4"
                    position={[-0.485, 0.04, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals004"
                      geometry={nodes.visuals004.geometry}
                      material={materials.yaskawa_white}
                    />
                    <mesh
                      name="visuals004_1"
                      geometry={nodes.visuals004_1.geometry}
                      material={materials.yaskawa_black}
                    />
                    <mesh
                      name="visuals004_2"
                      geometry={nodes.visuals004_2.geometry}
                      material={materials.yaskawa_blue}
                    />
                  </group>
                  <animated.group
                    name="YASKAWA_GP7_J04"
                    position={[0, -0.44, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="link_5"
                      geometry={nodes.link_5.geometry}
                      material={materials.yaskawa_blue}
                      position={[-0.485, 0, -0.48]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                    />
                    <animated.group
                      name="YASKAWA_GP7_J05"
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="link_6"
                        geometry={nodes.link_6.geometry}
                        material={materials.yaskawa_metalgold}
                        position={[-0.485, 0.48, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      />
                      <group
                        ref={flangeRef}
                        name="YASKAWA_GP7_FLG"
                        position={[0, -0.08, 0]}
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
