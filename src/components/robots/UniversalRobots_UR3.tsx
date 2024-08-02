import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import RobotAnimator from "./RobotAnimator"

export function UniversalRobots_UR3({
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
          <group name="UR3" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="UR3_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="UR3_J02"
                position={[0, 0.152, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group name="UR3_J03" position={[-0.244, 0, 0]}>
                  <animated.group name="UR3_J04" position={[-0.213, 0, 0]}>
                    <animated.group
                      name="UR3_J05"
                      position={[0, 0.112, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <mesh
                        name="UR3_05"
                        castShadow
                        receiveShadow
                        geometry={nodes.UR3_05.geometry}
                        material={materials.Standard}
                      />
                      <animated.group
                        name="UR3_J06"
                        position={[0, 0.085, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group name="UR3_FLG" position={[0, 0.082, 0]} />
                        <mesh
                          name="UR3_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.UR3_L06.geometry}
                          material={materials.Standard}
                        />
                      </animated.group>
                    </animated.group>
                    <mesh
                      name="UR3_L04"
                      castShadow
                      receiveShadow
                      geometry={nodes.UR3_L04.geometry}
                      material={materials.Standard}
                    />
                  </animated.group>
                  <mesh
                    name="UR3_L03"
                    castShadow
                    receiveShadow
                    geometry={nodes.UR3_L03.geometry}
                    material={materials.Standard}
                  />
                </animated.group>
                <mesh
                  name="UR3_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.UR3_L02.geometry}
                  material={materials.Standard}
                />
              </animated.group>
              <mesh
                name="UR3_L01"
                castShadow
                receiveShadow
                geometry={nodes.UR3_L01.geometry}
                material={materials.Standard}
              />
            </animated.group>
            <mesh
              name="UR3_L00"
              castShadow
              receiveShadow
              geometry={nodes.UR3_L00.geometry}
              material={materials.Standard}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
