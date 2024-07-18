import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import RobotAnimator from "./RobotAnimator"
import { animated } from "@react-spring/three"

export function UniversalRobots_UR10({
  modelURL,
  connectedMotionGroup,
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
        connectedMotionGroup={connectedMotionGroup}
        robotRootObjectName="Scene"
        onRotationChanged={setRotation}
      />
      <group {...props} dispose={null}>
        <group name="Scene">
          <group name="UR10" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="UR10_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="UR10_J02"
                position={[0, 0.126, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group name="UR10_J03" position={[-0.612, 0, 0]}>
                  <animated.group name="UR10_J04" position={[-0.572, 0, 0]}>
                    <animated.group
                      name="UR10_J05"
                      position={[0, 0.164, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="UR10_J06"
                        position={[0, 0.116, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group name="UR10_FLG" position={[0, 0.092, 0]} />
                        <mesh
                          name="UR10_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.UR10_L06.geometry}
                          material={materials.Standard}
                        />
                      </animated.group>
                      <mesh
                        name="UR10_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.UR10_L05.geometry}
                        material={materials.Standard}
                      />
                    </animated.group>
                    <mesh
                      name="UR10_L04"
                      castShadow
                      receiveShadow
                      geometry={nodes.UR10_L04.geometry}
                      material={materials.Standard}
                    />
                  </animated.group>
                  <mesh
                    name="UR10_L03"
                    castShadow
                    receiveShadow
                    geometry={nodes.UR10_L03.geometry}
                    material={materials.Standard}
                  />
                </animated.group>
                <mesh
                  name="UR10_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.UR10_L02.geometry}
                  material={materials.Standard}
                />
              </animated.group>
              <mesh
                name="UR10_L01"
                castShadow
                receiveShadow
                geometry={nodes.UR10_L01.geometry}
                material={materials.Standard}
              />
            </animated.group>
            <mesh
              name="UR10_L00"
              castShadow
              receiveShadow
              geometry={nodes.UR10_L00.geometry}
              material={materials.Standard}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
