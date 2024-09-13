import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

FANUC_CRX10iA.config = {
  rotationOffsets: [0, Math.PI / 2, 0, 0, 0, 0],
}

export function FANUC_CRX10iA({ modelURL, ...props }: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <>
      <group {...props} dispose={null}>
        <group name="Scene">
          <animated.group name="CRX10iA_J00">
            <animated.group
              name="CRX10iA_J01"
              rotation={[Math.PI / 2, Math.PI / 2, 0]}
            >
              <animated.group name="CRX10iA_J02" position={[0.54, 0, 0]}>
                <animated.group
                  name="CRX10iA_J03"
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="CRX10iA_J04"
                    position={[0, -0.54, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="CRX10iA_J05"
                      position={[0, 0.15, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group
                        name="CRX10iA_FLG"
                        position={[0, -0.16, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="CRX10iA_L06"
                        castShadow
                        receiveShadow
                        geometry={nodes.CRX10iA_L06.geometry}
                        material={materials.Fanuc_BlackMetal}
                        position={[0, -0.16, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      />
                    </animated.group>
                    <group
                      name="CRX10iA_L05"
                      position={[0, 0.15, 0]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="J5CASING_UNIT001"
                        castShadow
                        receiveShadow
                        geometry={nodes.J5CASING_UNIT001.geometry}
                        material={materials.Fanuc_WhitePlastic}
                      />
                      <mesh
                        name="J5CASING_UNIT001_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.J5CASING_UNIT001_1.geometry}
                        material={materials.Fanuc_Green}
                      />
                    </group>
                  </animated.group>
                  <group
                    name="CRX10iA_L04"
                    position={[0, -0.54, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="NAME_LABEL_CRX_10iA"
                      castShadow
                      receiveShadow
                      geometry={nodes.NAME_LABEL_CRX_10iA.geometry}
                      material={materials.Fanuc_RedPlastic}
                    />
                    <mesh
                      name="NAME_LABEL_CRX_10iA_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.NAME_LABEL_CRX_10iA_1.geometry}
                      material={materials.Fanuc_BlackPlastic}
                    />
                    <mesh
                      name="NAME_LABEL_CRX_10iA_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.NAME_LABEL_CRX_10iA_2.geometry}
                      material={materials.Fanuc_WhitePlastic}
                    />
                  </group>
                </animated.group>
                <mesh
                  name="CRX10iA_L03"
                  castShadow
                  receiveShadow
                  geometry={nodes.CRX10iA_L03.geometry}
                  material={materials.Fanuc_WhitePlastic}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                />
              </animated.group>
              <mesh
                name="CRX10iA_L02"
                castShadow
                receiveShadow
                geometry={nodes.CRX10iA_L02.geometry}
                material={materials.Fanuc_WhitePlastic}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              />
            </animated.group>
            <group name="CRX10iA_L01" position={[0, -0.117, 0]}>
              <mesh
                name="J2BASE_UNIT001"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_UNIT001.geometry}
                material={materials.Fanuc_Green}
              />
              <mesh
                name="J2BASE_UNIT001_1"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_UNIT001_1.geometry}
                material={materials.Fanuc_WhitePlastic}
              />
              <mesh
                name="J2BASE_UNIT001_2"
                castShadow
                receiveShadow
                geometry={nodes.J2BASE_UNIT001_2.geometry}
                material={materials.Fanuc_GreenLED}
              />
            </group>
          </animated.group>
          <mesh
            name="CRX10iA_L00"
            castShadow
            receiveShadow
            geometry={nodes.CRX10iA_L00.geometry}
            material={materials.Fanuc_BlackMetal}
            position={[0, -0.245, 0]}
          />
        </group>
      </group>
    </>
  )
}
