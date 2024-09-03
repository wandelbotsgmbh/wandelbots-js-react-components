import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import { animated } from "@react-spring/three"
import type { RobotProps } from "./SupportedRobot"
import RobotAnimator from "./RobotAnimator"

export function UniversalRobots_UR5({
  modelURL,
  rapidlyChangingMotionState,
  ...props
}: RobotProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  function setRotation(jointObjects: THREE.Object3D[], jointValues: number[]) {
    jointObjects.forEach(
      (object, index) => (object.rotation.y = jointValues[index]!),
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
          <animated.group name="UNIVERSALROBOTS_UR5CB3_J00">
            <animated.group name="link_1">
              <mesh
                name="visuals_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1.geometry}
                material={materials.universalrobots_darkgrey}
              />
              <mesh
                name="visuals_1_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1_1.geometry}
                material={materials.universalrobots_black}
              />
              <mesh
                name="visuals_1_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1_2.geometry}
                material={materials.universalrobots_aluminum}
              />
              <mesh
                name="visuals_1_3"
                castShadow
                receiveShadow
                geometry={nodes.visuals_1_3.geometry}
                material={materials.universalrobots_lightblue}
              />
            </animated.group>
            <animated.group
              name="UNIVERSALROBOTS_UR5CB3_J01"
              position={[0, 0.089, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <animated.group
                name="link_2"
                position={[0, 0, 0.089]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="visuals_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2.geometry}
                  material={materials.universalrobots_stainlesssteel}
                />
                <mesh
                  name="visuals_2_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2_1.geometry}
                  material={materials.universalrobots_lightblue}
                />
                <mesh
                  name="visuals_2_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2_2.geometry}
                  material={materials.universalrobots_aluminum}
                />
                <mesh
                  name="visuals_2_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2_3.geometry}
                  material={materials.universalrobots_black}
                />
                <mesh
                  name="visuals_2_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals_2_4.geometry}
                  material={materials.universalrobots_darkgrey}
                />
              </animated.group>
              <animated.group
                name="UNIVERSALROBOTS_UR5CB3_J02"
                position={[-0.425, 0, 0]}
              >
                <animated.group
                  name="link_3"
                  position={[0.425, 0, 0.089]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="visuals_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3.geometry}
                    material={materials.universalrobots_lightblue}
                  />
                  <mesh
                    name="visuals_3_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3_1.geometry}
                    material={materials.universalrobots_black}
                  />
                  <mesh
                    name="visuals_3_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3_2.geometry}
                    material={materials.universalrobots_aluminum}
                  />
                  <mesh
                    name="visuals_3_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3_3.geometry}
                    material={materials.universalrobots_darkgrey}
                  />
                  <mesh
                    name="visuals_3_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals_3_4.geometry}
                    material={materials.universalrobots_stainlesssteel}
                  />
                </animated.group>
                <animated.group
                  name="UNIVERSALROBOTS_UR5CB3_J03"
                  position={[-0.392, 0, 0]}
                >
                  <animated.group
                    name="link_4"
                    position={[0.817, 0, 0.089]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="visuals_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals_4.geometry}
                      material={materials.universalrobots_darkgrey}
                    />
                    <mesh
                      name="visuals_4_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals_4_1.geometry}
                      material={materials.universalrobots_aluminum}
                    />
                    <mesh
                      name="visuals_4_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals_4_2.geometry}
                      material={materials.universalrobots_lightblue}
                    />
                    <mesh
                      name="visuals_4_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals_4_3.geometry}
                      material={materials.universalrobots_black}
                    />
                  </animated.group>
                  <animated.group
                    name="UNIVERSALROBOTS_UR5CB3_J04"
                    position={[0, 0.109, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="link_5"
                      position={[0.817, 0.089, 0.109]}
                      rotation={[Math.PI, 0, 0]}
                    >
                      <mesh
                        name="visuals_5"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals_5.geometry}
                        material={materials.universalrobots_darkgrey}
                      />
                      <mesh
                        name="visuals_5_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals_5_1.geometry}
                        material={materials.universalrobots_lightblue}
                      />
                      <mesh
                        name="visuals_5_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals_5_2.geometry}
                        material={materials.universalrobots_aluminum}
                      />
                      <mesh
                        name="visuals_5_3"
                        castShadow
                        receiveShadow
                        geometry={nodes.visuals_5_3.geometry}
                        material={materials.universalrobots_black}
                      />
                    </animated.group>
                    <animated.group
                      name="UNIVERSALROBOTS_UR5CB3_J05"
                      position={[0, 0.095, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="link_6"
                        castShadow
                        receiveShadow
                        geometry={nodes.link_6.geometry}
                        material={materials.universalrobots_stainlesssteel}
                        position={[0.817, -0.109, -0.005]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      />
                      <animated.group
                        name="UNIVERSALROBOTS_UR5CB3_FLG"
                        position={[0, 0.082, 0]}
                      />
                    </animated.group>
                  </animated.group>
                </animated.group>
              </animated.group>
            </animated.group>
          </animated.group>
          <mesh
            name="link_0"
            castShadow
            receiveShadow
            geometry={nodes.link_0.geometry}
            material={materials.universalrobots_aluminum}
          />
        </group>
      </group>
    </>
  )
}
