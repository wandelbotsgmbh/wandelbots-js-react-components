import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import RobotAnimator from "./RobotAnimator"
import { animated } from "@react-spring/three"

export function FANUC_ARC_Mate_120iD({
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
          <group name="M10iD" rotation={[0, 0, 0]}>
            <animated.group name="M20iD25_J00">
              <animated.group
                name="M20iD25_J01"
                position={[0.075, 0, 0]}
                rotation={[Math.PI / 2, Math.PI / 2, 0]}
              >
                <animated.group name="M20iD25_J02" position={[0.84, 0, 0]}>
                  <animated.group
                    name="M20iD25_J03"
                    position={[0.215, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="M20iD25_J04"
                      position={[0, -0.89, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="M20iD25_J05"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="M20iD25_FLG"
                          position={[0, -0.09, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        />
                        <mesh
                          name="M20iD25_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.M20iD25_L06.geometry}
                          material={materials.Fanuc_BlackMetal_AO}
                          position={[0, -0.09, 0]}
                          rotation={[Math.PI / 2, 0, Math.PI]}
                        />
                      </animated.group>
                      <mesh
                        name="M20iD25_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.M20iD25_L05.geometry}
                        material={materials.Fanuc_BlackMetal_AO}
                        rotation={[Math.PI, Math.PI / 2, 0]}
                      />
                    </animated.group>
                    <group
                      name="M20iD25_L04"
                      position={[0, -0.286, 0]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                    >
                      <mesh
                        name="Mesh_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh_2.geometry}
                        material={materials.Fanuc_Yellow_Textured_AO}
                      />
                      <mesh
                        name="Mesh_2_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Mesh_2_1.geometry}
                        material={materials.Fanuc_BlackMetal_AO}
                      />
                    </group>
                  </animated.group>
                  <group
                    name="M20iD25_L03"
                    position={[0, 0.406, 0]}
                    rotation={[Math.PI, Math.PI / 2, 0]}
                  >
                    <mesh
                      name="Mesh_15"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_15.geometry}
                      material={materials.Fanuc_BlackMetal_AO}
                    />
                    <mesh
                      name="Mesh_15_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_15_1.geometry}
                      material={materials.Fanuc_Yellow_Textured_AO}
                    />
                    <mesh
                      name="Mesh_15_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Mesh_15_2.geometry}
                      material={materials.Material_9_AO}
                    />
                  </group>
                </animated.group>
                <group
                  name="M20iD25_L02"
                  position={[0, 0.505, -0.055]}
                  rotation={[-Math.PI, Math.PI / 2, 0]}
                >
                  <mesh
                    name="Mesh_37"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_37.geometry}
                    material={materials.Fanuc_BlackMetal_AO}
                  />
                  <mesh
                    name="Mesh_37_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_37_1.geometry}
                    material={materials.Fanuc_Yellow_Textured_AO}
                  />
                </group>
              </animated.group>
              <group name="M20iD25_L01" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  name="Mesh_45"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_45.geometry}
                  material={materials.Material_9_AO}
                />
                <mesh
                  name="Mesh_45_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_45_1.geometry}
                  material={materials.Fanuc_Yellow_Textured_AO}
                />
                <mesh
                  name="Mesh_45_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Mesh_45_2.geometry}
                  material={materials.Fanuc_BlackMetal_AO}
                />
              </group>
            </animated.group>
            <mesh
              name="M20iD25_L00"
              castShadow
              receiveShadow
              geometry={nodes.M20iD25_L00.geometry}
              material={materials.Fanuc_BlackMetal_AO}
              position={[0, -0.425, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
