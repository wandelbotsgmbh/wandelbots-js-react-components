import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "../../types"

FANUC_CRX10iAL.config = {
  rotationOffsets: [0, Math.PI / 2, 0, 0, 0, 0],
}

export function FANUC_CRX10iAL({
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
            material={materials.fanuc_metal_black}
          />
          <mesh
            name="visuals_0_1"
            geometry={nodes.visuals_0_1.geometry}
            material={materials.fanuc_stainless_steel}
          />
          <mesh
            name="visuals_0_2"
            geometry={nodes.visuals_0_2.geometry}
            material={materials.fanuc_metal_black}
          />
          <mesh
            name="visuals_0_3"
            geometry={nodes.visuals_0_3.geometry}
            material={materials.fanuc_stainless_steel}
          />
          <mesh
            name="visuals_0_4"
            geometry={nodes.visuals_0_4.geometry}
            material={materials.fanuc_aluminium_black}
          />
          <mesh
            name="visuals_0_5"
            geometry={nodes.visuals_0_5.geometry}
            material={materials.fanuc_aluminium_black}
          />
          <mesh
            name="visuals_0_6"
            geometry={nodes.visuals_0_6.geometry}
            material={materials.fanuc_rubber}
          />
        </group>
        <animated.group name="FANUC_CRX10IAL_J00">
          <animated.group
            name="FANUC_CRX10IAL_J01"
            rotation={[Math.PI / 2, Math.PI / 2, 0]}
          >
            <animated.group name="FANUC_CRX10IAL_J02" position={[0.71, 0, 0]}>
              <animated.group
                name="FANUC_CRX10IAL_J03"
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="FANUC_CRX10IAL_J04"
                  position={[0, -0.54, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="FANUC_CRX10IAL_J05"
                    position={[0, 0.15, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <group
                      ref={flangeRef}
                      name="FANUC_CRX10IAL_FLG"
                      position={[0, -0.16, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <group
                      name="link_6"
                      position={[-0.71, 0.54, -0.15]}
                      rotation={[0, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="visuals_6"
                        geometry={nodes.visuals_6.geometry}
                        material={materials.fanuc_metal_black}
                      />
                      <mesh
                        name="visuals_6_1"
                        geometry={nodes.visuals_6_1.geometry}
                        material={materials.fanuc_stainless_steel}
                      />
                      <mesh
                        name="visuals_6_2"
                        geometry={nodes.visuals_6_2.geometry}
                        material={materials.fanuc_aluminium_black}
                      />
                      <mesh
                        name="visuals_6_3"
                        geometry={nodes.visuals_6_3.geometry}
                        material={materials.fanuc_aluminium_black}
                      />
                    </group>
                  </animated.group>
                  <group
                    name="link_5"
                    position={[-0.71, 0, -0.54]}
                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals_5"
                      geometry={nodes.visuals_5.geometry}
                      material={materials.fanuc_white}
                    />
                    <mesh
                      name="visuals_5_1"
                      geometry={nodes.visuals_5_1.geometry}
                      material={materials.fanuc_green}
                    />
                    <mesh
                      name="visuals_5_2"
                      geometry={nodes.visuals_5_2.geometry}
                      material={materials.fanuc_stainless_steel}
                    />
                  </group>
                </animated.group>
                <group
                  name="link_4"
                  position={[-0.71, 0, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals_4"
                    geometry={nodes.visuals_4.geometry}
                    material={materials.fanuc_white}
                  />
                  <mesh
                    name="visuals_4_1"
                    geometry={nodes.visuals_4_1.geometry}
                    material={materials.fanuc_white}
                  />
                  <mesh
                    name="visuals_4_2"
                    geometry={nodes.visuals_4_2.geometry}
                    material={materials.fanuc_metal_black}
                  />
                  <mesh
                    name="visuals_4_3"
                    geometry={nodes.visuals_4_3.geometry}
                    material={materials.fanuc_red}
                  />
                </group>
              </animated.group>
              <group
                name="link_3"
                position={[-0.71, 0, 0]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="visuals_3"
                  geometry={nodes.visuals_3.geometry}
                  material={materials.fanuc_white}
                />
                <mesh
                  name="visuals_3_1"
                  geometry={nodes.visuals_3_1.geometry}
                  material={materials.fanuc_green}
                />
              </group>
            </animated.group>
            <mesh
              name="link_2"
              geometry={nodes.link_2.geometry}
              material={materials.fanuc_white}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            />
          </animated.group>
          <group name="link_1">
            <mesh
              name="visuals_1"
              geometry={nodes.visuals_1.geometry}
              material={materials.fanuc_green}
            />
            <mesh
              name="visuals_1_1"
              geometry={nodes.visuals_1_1.geometry}
              material={materials.fanuc_white}
            />
            <mesh
              name="visuals_1_2"
              geometry={nodes.visuals_1_2.geometry}
              material={materials.fanuc_green}
            />
          </group>
        </animated.group>
      </group>
    </group>
  )
}
