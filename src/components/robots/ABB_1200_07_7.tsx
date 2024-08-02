import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function ABB_1200_07_7({
  modelURL,
  rapidlyChangingMotionState,
  ...props
}: RobotProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials
  const rotationOffsets = [0, -Math.PI / 2, 0, 0, 0, 0]

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
          <group name="IRB1200_7_70_IRC5" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group
              name="IRB1200_7_70_IRC5_J01"
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <animated.group
                name="IRB1200_7_70_IRC5_J02"
                position={[0, 0.399, 0]}
                rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
              >
                <animated.group
                  name="IRB1200_7_70_IRC5_J03"
                  position={[0.35, 0, 0]}
                >
                  <animated.group
                    name="IRB1200_7_70_IRC5_J04"
                    position={[0.042, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="IRB1200_7_70_IRC5_J05"
                      position={[0, 0.351, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="IRB1200_7_70_IRC5_J06"
                        rotation={[Math.PI / 2, 0, -Math.PI]}
                      >
                        <group
                          name="IRB1200_7_70_IRC5_FLG"
                          position={[0, 0.082, 0]}
                        />
                        <mesh
                          name="IRB1200_7_70_IRC5_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.IRB1200_7_70_IRC5_L06.geometry}
                          material={materials["IRB1200_7-70_IRC5.003_Bake"]}
                        />
                      </animated.group>
                      <mesh
                        name="IRB1200_7_70_IRC5_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.IRB1200_7_70_IRC5_L05.geometry}
                        material={materials["IRB1200_7-70_IRC5.003_Bake"]}
                      />
                    </animated.group>
                    <mesh
                      name="IRB1200_7_70_IRC5_L04"
                      castShadow
                      receiveShadow
                      geometry={nodes.IRB1200_7_70_IRC5_L04.geometry}
                      material={materials["IRB1200_7-70_IRC5.003_Bake"]}
                    />
                  </animated.group>
                  <mesh
                    name="IRB1200_7_70_IRC5_L03"
                    castShadow
                    receiveShadow
                    geometry={nodes.IRB1200_7_70_IRC5_L03.geometry}
                    material={materials["IRB1200_7-70_IRC5.003_Bake"]}
                  />
                </animated.group>
                <mesh
                  name="IRB1200_7_70_IRC5_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.IRB1200_7_70_IRC5_L02.geometry}
                  material={materials["IRB1200_7-70_IRC5.003_Bake"]}
                />
              </animated.group>
              <mesh
                name="IRB1200_7_70_IRC5_L01"
                castShadow
                receiveShadow
                geometry={nodes.IRB1200_7_70_IRC5_L01.geometry}
                material={materials["IRB1200_7-70_IRC5.003_Bake"]}
                rotation={[Math.PI / 2, 0, 0]}
              />
            </animated.group>
            <mesh
              name="IRB1200_7_70_IRC5_L00"
              castShadow
              receiveShadow
              geometry={nodes.IRB1200_7_70_IRC5_L00.geometry}
              material={materials["IRB1200_7-70_IRC5.003_Bake"]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
