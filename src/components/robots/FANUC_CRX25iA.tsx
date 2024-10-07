import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

FANUC_CRX25iA.config = {
  rotationOffsets: [0, Math.PI / 2, 0, 0, 0, 0],
}

export function FANUC_CRX25iA({
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
        <group name="Scene" position={[0, -0.37, 0]}>
          <group name="CRX25iA_L00">
            <mesh
              name="J1BASE_NetGen_Coarse"
              castShadow
              receiveShadow
              geometry={nodes.J1BASE_NetGen_Coarse.geometry}
              material={materials.Fanuc_BlackMetal}
            />
            <mesh
              name="J1BASE_NetGen_Coarse_1"
              castShadow
              receiveShadow
              geometry={nodes.J1BASE_NetGen_Coarse_1.geometry}
              material={materials.Fanuc_GreenPlastic}
            />
          </group>
          <animated.group name="CRX25iA_J00">
            <animated.group
              name="CRX25iA_J01"
              position={[0, 0.37, 0]}
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
            >
              <animated.group name="CRX25iA_J02" position={[0.95, 0, 0]}>
                <animated.group
                  name="CRX25iA_J03"
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="CRX25iA_J04"
                    position={[0, -0.75, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="CRX25iA_J05"
                      position={[0, 0.185, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group
                        ref={flangeRef}
                        name="CRX25iA_FLG"
                        position={[0, -0.18, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="CRX25iA_L06"
                        castShadow
                        receiveShadow
                        geometry={nodes.CRX25iA_L06.geometry}
                        material={materials.Fanuc_BlackMetal}
                        position={[0, -0.18, 0]}
                      />
                    </animated.group>
                    <group name="CRX25iA_L05" position={[0, 0.185, 0]}>
                      <mesh
                        name="J6CASING_NetGen_Coarse"
                        castShadow
                        receiveShadow
                        geometry={nodes.J6CASING_NetGen_Coarse.geometry}
                        material={materials.Fanuc_WhitePlastic}
                      />
                      <mesh
                        name="J6CASING_NetGen_Coarse_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.J6CASING_NetGen_Coarse_1.geometry}
                        material={materials.Fanuc_GreenPlastic}
                      />
                    </group>
                  </animated.group>
                  <group name="CRX25iA_L04" position={[0, -0.75, 0]}>
                    <mesh
                      name="J3ARM_NetGen_Coarse"
                      castShadow
                      receiveShadow
                      geometry={nodes.J3ARM_NetGen_Coarse.geometry}
                      material={materials.Fanuc_WhitePlastic}
                    />
                    <mesh
                      name="J3ARM_NetGen_Coarse_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.J3ARM_NetGen_Coarse_1.geometry}
                      material={materials.Fanuc_RedPlastic}
                    />
                    <mesh
                      name="J3ARM_NetGen_Coarse_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.J3ARM_NetGen_Coarse_2.geometry}
                      material={materials.Fanuc_BlackPlastic}
                    />
                  </group>
                </animated.group>
                <group name="CRX25iA_L03">
                  <mesh
                    name="J3CASING_NetGen_Coarse"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3CASING_NetGen_Coarse.geometry}
                    material={materials.Fanuc_WhitePlastic}
                  />
                  <mesh
                    name="J3CASING_NetGen_Coarse_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.J3CASING_NetGen_Coarse_1.geometry}
                    material={materials.Fanuc_GreenPlastic}
                  />
                </group>
              </animated.group>
              <mesh
                name="CRX25iA_L02"
                castShadow
                receiveShadow
                geometry={nodes.CRX25iA_L02.geometry}
                material={materials.Fanuc_WhitePlastic}
              />
            </animated.group>
            <group name="CRX25iA_L01" position={[0, 0.18, 0]}>
              <mesh
                name="J2BASE_NetGen_Coarse"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_NetGen_Coarse.geometry}
                material={materials.Fanuc_WhitePlastic}
              />
              <mesh
                name="J2BASE_NetGen_Coarse_1"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_NetGen_Coarse_1.geometry}
                material={materials.Fanuc_GreenLED}
              />
            </group>
          </animated.group>
        </group>
      </group>
    </>
  )
}
