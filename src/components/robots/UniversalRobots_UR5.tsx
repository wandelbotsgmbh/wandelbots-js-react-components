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
          <group name="UR5" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="UR5_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="UR5_J02"
                position={[0, 0.089, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group name="UR5_J03" position={[-0.425, 0, 0]}>
                  <animated.group name="UR5_J04" position={[-0.392, 0, 0]}>
                    <animated.group
                      name="UR5_J05"
                      position={[0, 0.109, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="UR5_J06"
                        position={[0, 0.095, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group name="UR5_FLG" position={[0, 0.082, 0]} />
                        <mesh
                          name="UR5_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.UR5_L06.geometry}
                          material={nodes.UR5_L06.material}
                        />
                      </animated.group>
                      <mesh
                        name="UR5_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.UR5_L05.geometry}
                        material={nodes.UR5_L05.material}
                      />
                    </animated.group>
                    <mesh
                      name="UR5_L04"
                      castShadow
                      receiveShadow
                      geometry={nodes.UR5_L04.geometry}
                      material={nodes.UR5_L04.material}
                    />
                  </animated.group>
                  <mesh
                    name="UR5_L03"
                    castShadow
                    receiveShadow
                    geometry={nodes.UR5_L03.geometry}
                    material={nodes.UR5_L03.material}
                  />
                </animated.group>
                <mesh
                  name="UR5_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.UR5_L02.geometry}
                  material={nodes.UR5_L02.material}
                />
              </animated.group>
              <mesh
                name="UR5_L01"
                castShadow
                receiveShadow
                geometry={nodes.UR5_L01.geometry}
                material={nodes.UR5_L01.material}
              />
            </animated.group>
            <mesh
              name="UR5_L00"
              castShadow
              receiveShadow
              geometry={nodes.UR5_L00.geometry}
              material={nodes.UR5_L00.material}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
