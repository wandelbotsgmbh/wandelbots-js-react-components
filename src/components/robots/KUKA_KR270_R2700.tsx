import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function KUKA_KR270_R2700({
  modelURL,
  rapidlyChangingMotionState,
  ...props
}: RobotProps) {
  const gltf = useGLTF(modelURL) as any

  const nodes = gltf.nodes
  const materials = gltf.materials

  const rotationOffsets = [0, 0, -Math.PI / 2, 0, 0, 0]

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
          <animated.group name="joint_01">
            <animated.group
              name="joint_02"
              position={[0.35, 0.675, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <animated.group
                name="joint_03"
                position={[1.15, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
              >
                <animated.group
                  name="joint_04"
                  position={[-0.041, 0, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="joint_05"
                    position={[0, -1.2, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="joint_06"
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <group
                        name="flange"
                        position={[0, -0.24, 0]}
                        rotation={[-Math.PI, 0, 0]}
                      />
                      <group
                        name="link_6"
                        position={[0, -0.213, 0]}
                        rotation={[0, 0, -Math.PI / 2]}
                      >
                        <group name="visuals006">
                          <mesh
                            name="visuals006_1"
                            castShadow
                            receiveShadow
                            geometry={nodes.visuals006_1.geometry}
                            material={materials.material_Material_Farbe__1_}
                          />
                          <mesh
                            name="visuals006_2"
                            castShadow
                            receiveShadow
                            geometry={nodes.visuals006_2.geometry}
                            material={materials.material_Material_Metall}
                          />
                        </group>
                      </group>
                    </animated.group>
                    <group
                      name="link_5"
                      position={[0, 0.044, 0]}
                      rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                    >
                      <mesh
                        name="visuals005"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals005.geometry}
                        material={materials.material_Material_Farbe}
                      />
                    </group>
                  </animated.group>
                  <group
                    name="link_4"
                    position={[0, -0.954, 0]}
                    rotation={[0, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals004"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals004.geometry}
                      material={materials.material_Material_Farbe}
                    />
                  </group>
                </animated.group>
                <group
                  name="link_3"
                  position={[0, -0.178, 0]}
                  rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                >
                  <group name="visuals003">
                    <mesh
                      name="visuals003_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_1.geometry}
                      material={materials.material_Material_Farbe__1_}
                    />
                    <mesh
                      name="visuals003_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_2.geometry}
                      material={materials.material_Material_Farbe__2_}
                    />
                    <mesh
                      name="visuals003_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_3.geometry}
                      material={materials.material_Material_Metall}
                    />
                    <mesh
                      name="visuals003_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals003_4.geometry}
                      material={materials.material_Material_Farbe}
                    />
                  </group>
                </group>
              </animated.group>
              <group name="link_2" rotation={[Math.PI / 2, 0, 0]}>
                <group name="visuals002">
                  <mesh
                    name="visuals002_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_1.geometry}
                    material={materials.material_Material_Farbe}
                  />
                  <mesh
                    name="visuals002_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_2.geometry}
                    material={materials.material_Material_Farbe__1_}
                  />
                  <mesh
                    name="visuals002_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_3.geometry}
                    material={materials.material_Material_Metall}
                  />
                  <mesh
                    name="visuals002_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals002_4.geometry}
                    material={materials.material_Material_Farbe__2_}
                  />
                </group>
              </group>
            </animated.group>
            <group name="link_1" position={[0, 0.226, 0]}>
              <group name="visuals001">
                <mesh
                  name="visuals001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_1.geometry}
                  material={materials.material_Material_Metall}
                />
                <mesh
                  name="visuals001_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_2.geometry}
                  material={materials.material_Material_Farbe__1_}
                />
                <mesh
                  name="visuals001_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_3.geometry}
                  material={materials.material_Material_Farbe__2_}
                />
                <mesh
                  name="visuals001_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals001_4.geometry}
                  material={materials.material_Material_Farbe}
                />
              </group>
            </group>
          </animated.group>
          <group name="link_0-base">
            <group name="visuals">
              <mesh
                name="visuals_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1.geometry}
                material={materials.material_Material_Metall}
              />
              <mesh
                name="visuals_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals_2.geometry}
                material={materials.material_Material_Farbe__1_}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  )
}
