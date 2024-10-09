import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

Yaskawa_AR3120.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
  rotationSign: [1, -1, 1, 1, 1, 1],
}

export function Yaskawa_AR3120({
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
          <animated.group name="AR3120_J00">
            <animated.group
              name="AR3120_J01"
              position={[0.145, 0, 0]}
              rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
            >
              <animated.group
                name="AR3120_J02"
                position={[1.15, 0, 0]}
                rotation={[-Math.PI, 0, 0]}
              >
                <animated.group
                  name="AR3120_J03"
                  position={[0.25, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="AR3120_J04"
                    position={[0, -1.812, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR3120_J05"
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <group
                        ref={flangeRef}
                        name="AR3120_FLG"
                        position={[0, -0.1, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <mesh
                        name="AR3120_L06"
                        geometry={nodes.AR3120_L06.geometry}
                        material={materials["Metal.001"]}
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                      />
                    </animated.group>
                    <mesh
                      name="AR3120_L05"
                      geometry={nodes.AR3120_L05.geometry}
                      material={materials["Blue.001"]}
                      rotation={[Math.PI / 2, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <group
                    name="AR3120_L04"
                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                  >
                    <mesh
                      name="R_AXIS_GP20HL001"
                      geometry={nodes.R_AXIS_GP20HL001.geometry}
                      material={materials["Blue.001"]}
                    />
                    <mesh
                      name="R_AXIS_GP20HL001_1"
                      geometry={nodes.R_AXIS_GP20HL001_1.geometry}
                      material={materials["White.001"]}
                    />
                  </group>
                </animated.group>
                <group name="AR3120_L03" rotation={[Math.PI, 0, -Math.PI / 2]}>
                  <mesh
                    name="Mesh_3001"
                    geometry={nodes.Mesh_3001.geometry}
                    material={materials["Blue.001"]}
                  />
                  <mesh
                    name="Mesh_3001_1"
                    geometry={nodes.Mesh_3001_1.geometry}
                    material={materials["Black.001"]}
                  />
                </group>
              </animated.group>
              <mesh
                name="AR3120_L02"
                geometry={nodes.AR3120_L02.geometry}
                material={materials["Blue.001"]}
                position={[0, -0.146, 0]}
                rotation={[Math.PI, 0, 0]}
              />
            </animated.group>
            <group
              name="AR3120_L01"
              position={[0, -0.228, 0]}
              rotation={[0, -1.571, 0]}
            >
              <mesh
                name="S_AXIS_GP20HL001"
                geometry={nodes.S_AXIS_GP20HL001.geometry}
                material={materials["Blue.001"]}
              />
              <mesh
                name="S_AXIS_GP20HL001_1"
                geometry={nodes.S_AXIS_GP20HL001_1.geometry}
                material={materials["Black.001"]}
              />
            </group>
          </animated.group>
          <mesh
            name="AR3120_L00"
            geometry={nodes.AR3120_L00.geometry}
            material={materials["Blue.001"]}
            position={[0, -0.54, 0]}
          />
        </group>
      </group>
    </>
  )
}
