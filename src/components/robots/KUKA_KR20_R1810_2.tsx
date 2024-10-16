import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

KUKA_KR20_R1810_2.config = {
  rotationOffsets: [0, 0, -Math.PI / 2, 0, 0, 0],
  rotationSign: [-1, 1, 1, 1, 1, 1],
}

export function KUKA_KR20_R1810_2({
  modelURL,
  flangeRef,
  ...props
}: RobotModelProps) {
  const { nodes, materials } = useGLTF(modelURL) as any

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="link_0">
          <mesh
            name="visuals_0"
            geometry={nodes.visuals_0.geometry}
            material={materials.kuka_black}
          />
          <mesh
            name="visuals_0_1"
            geometry={nodes.visuals_0_1.geometry}
            material={materials.kuka_metal}
          />
        </group>
        <animated.group name="KUKA_KR20R1810_2_J00">
          <animated.group
            name="KUKA_KR20R1810_2_J01"
            position={[0.16, 0.52, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <animated.group
              name="KUKA_KR20R1810_2_J02"
              position={[0.78, 0, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            >
              <animated.group
                name="KUKA_KR20R1810_2_J03"
                position={[0.15, 0, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="KUKA_KR20R1810_2_J04"
                  position={[0, -0.86, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="KUKA_KR20R1810_2_J05"
                    rotation={[-Math.PI / 2, 0, -Math.PI]}
                  >
                    <group
                      name="KUKA_KR20R1810_2_FLG"
                      ref={flangeRef}
                      position={[0, -0.153, 0]}
                      rotation={[-Math.PI, 0, 0]}
                    />
                    <mesh
                      name="link_6"
                      geometry={nodes.link_6.geometry}
                      material={materials.kuka_metal}
                      position={[0.67, 1.8, 0]}
                      rotation={[-Math.PI, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <group
                    name="link_5"
                    position={[-0.67, 0, 1.8]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals_5"
                      geometry={nodes.visuals_5.geometry}
                      material={materials.kuka_orange}
                    />
                    <mesh
                      name="visuals_5_1"
                      geometry={nodes.visuals_5_1.geometry}
                      material={materials.kuka_black}
                    />
                    <mesh
                      name="visuals_5_2"
                      geometry={nodes.visuals_5_2.geometry}
                      material={materials.kuka_metal}
                    />
                  </group>
                </animated.group>
                <group
                  name="link_4"
                  position={[-0.67, 0.94, 0]}
                  rotation={[0, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals_4"
                    geometry={nodes.visuals_4.geometry}
                    material={materials.kuka_orange}
                  />
                  <mesh
                    name="visuals_4_1"
                    geometry={nodes.visuals_4_1.geometry}
                    material={materials.kuka_black}
                  />
                  <mesh
                    name="visuals_4_2"
                    geometry={nodes.visuals_4_2.geometry}
                    material={materials.kuka_metal}
                  />
                </group>
              </animated.group>
              <group
                name="link_3"
                position={[-0.52, 0, 0.94]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="visuals_3"
                  geometry={nodes.visuals_3.geometry}
                  material={materials.kuka_metal}
                />
                <mesh
                  name="visuals_3_1"
                  geometry={nodes.visuals_3_1.geometry}
                  material={materials.kuka_black}
                />
                <mesh
                  name="visuals_3_2"
                  geometry={nodes.visuals_3_2.geometry}
                  material={materials.kuka_orange}
                />
              </group>
            </animated.group>
            <group
              name="link_2"
              position={[-0.16, 0, -0.52]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <mesh
                name="visuals_2"
                geometry={nodes.visuals_2.geometry}
                material={materials.kuka_orange}
              />
              <mesh
                name="visuals_2_1"
                geometry={nodes.visuals_2_1.geometry}
                material={materials.kuka_black}
              />
              <mesh
                name="visuals_2_2"
                geometry={nodes.visuals_2_2.geometry}
                material={nodes.visuals_2_2.material}
              />
            </group>
          </animated.group>
          <group name="link_1">
            <mesh
              name="visuals_1"
              geometry={nodes.visuals_1.geometry}
              material={materials.kuka_orange}
            />
            <mesh
              name="visuals_1_1"
              geometry={nodes.visuals_1_1.geometry}
              material={materials.kuka_black}
            />
            <mesh
              name="visuals_1_2"
              geometry={nodes.visuals_1_2.geometry}
              material={materials.kuka_metal}
            />
            <mesh
              name="visuals_1_3"
              geometry={nodes.visuals_1_3.geometry}
              material={nodes.visuals_1_3.material}
            />
            <mesh
              name="visuals_1_4"
              geometry={nodes.visuals_1_4.geometry}
              material={nodes.visuals_1_4.material}
            />
            <mesh
              name="visuals_1_5"
              geometry={nodes.visuals_1_5.geometry}
              material={nodes.visuals_1_5.material}
            />
            <mesh
              name="visuals_1_6"
              geometry={nodes.visuals_1_6.geometry}
              material={nodes.visuals_1_6.material}
            />
            <mesh
              name="visuals_1_7"
              geometry={nodes.visuals_1_7.geometry}
              material={nodes.visuals_1_7.material}
            />
          </group>
        </animated.group>
      </group>
    </group>
  )
}
