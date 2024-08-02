import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import RobotAnimator from "./RobotAnimator"
import { animated } from "@react-spring/three"

export function FANUC_ARC_Mate_100iD({
  modelURL,
  rapidlyChangingMotionState,
  ...props
}: RobotProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials
  const rotationOffsets = [0, Math.PI / 2, 0, 0, 0, 0]

  function setRotation(jointObjects: THREE.Object3D[], jointValues: number[]) {
    jointObjects.forEach(
      (object, index) =>
        (object.rotation.y = jointValues[index]! + rotationOffsets[index]!),
    )
  }

  return (
    <>
      <RobotAnimator
        rapidlyChangingMotionState={rapidlyChangingMotionState}
        robotRootObjectName="Scene"
        onRotationChanged={setRotation}
      />
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="M10iD" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="M10iD_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="M10iD_J02"
                position={[0.075, 0, 0]}
                rotation={[Math.PI / 2, Math.PI / 2, 0]}
              >
                <animated.group name="M10iD_J03" position={[0.64, 0, 0]}>
                  <animated.group
                    name="M10iD_J04"
                    position={[0.195, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="M10iD_J05"
                      position={[0, -0.7, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="M10iD_J06"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="M10iD_FLG"
                          position={[0, -0.075, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        />
                        <mesh
                          name="M10iD_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.M10iD_L06.geometry}
                          material={materials.Fanuc_BlackMetal_AO}
                          position={[-0.835, 0.775, 0]}
                          rotation={[0, 0, -Math.PI / 2]}
                        />
                      </animated.group>
                      <mesh
                        name="M10iD_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.M10iD_L05.geometry}
                        material={materials.Fanuc_BlackMetal_AO}
                        position={[-0.835, 0, -0.775]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                      />
                    </animated.group>
                    <group
                      name="M10iD_L04"
                      position={[-0.835, 0.075, 0]}
                      rotation={[0, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="Mesh_654"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh_654.geometry}
                        material={materials.Fanuc_Yellow_Textured_AO}
                      />
                      <mesh
                        name="Mesh_654_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh_654_1.geometry}
                        material={materials.Fanuc_BlackMetal_AO}
                      />
                    </group>
                  </animated.group>
                  <group
                    name="M10iD_L03"
                    position={[-0.64, 0, -0.075]}
                    rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="Mesh_378"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_378.geometry}
                      material={materials.Material_1_AO}
                    />
                    <mesh
                      name="Mesh_378_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_378_1.geometry}
                      material={materials.Fanuc_Yellow_Textured_AO}
                    />
                    <mesh
                      name="Mesh_378_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_378_2.geometry}
                      material={materials.Fanuc_BlackMetal_AO}
                    />
                  </group>
                </animated.group>
                <group
                  name="M10iD_L02"
                  position={[0, 0, -0.075]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="Mesh_358"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_358.geometry}
                    material={materials.Fanuc_Yellow_Textured_AO}
                  />
                  <mesh
                    name="Mesh_358_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_358_1.geometry}
                    material={materials.Fanuc_BlackMetal_AO}
                  />
                </group>
              </animated.group>
              <group name="M10iD_L01">
                <mesh
                  name="Mesh_356"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_356.geometry}
                  material={materials.Fanuc_Yellow_Textured_AO}
                />
                <mesh
                  name="Mesh_356_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_356_1.geometry}
                  material={materials.Material_1_AO}
                />
                <mesh
                  name="Mesh_356_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_356_2.geometry}
                  material={materials.Fanuc_BlackMetal_AO}
                />
              </group>
            </animated.group>
            <mesh
              name="M10iD_L00"
              castShadow
              receiveShadow
              geometry={nodes.M10iD_L00.geometry}
              material={materials.Fanuc_BlackMetal_AO}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
