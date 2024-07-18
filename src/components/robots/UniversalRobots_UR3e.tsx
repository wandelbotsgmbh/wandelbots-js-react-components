import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function UniversalRobots_UR3e({
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
          <animated.group name="UR3e" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="UR3e_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="UR3e_J02"
                position={[0, 0.152, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group name="UR3e_J03" position={[-0.244, 0, 0]}>
                  <animated.group name="UR3e_J04" position={[-0.213, 0, 0]}>
                    <animated.group
                      name="UR3e_J05"
                      position={[0, 0.131, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="UR3e_J06"
                        position={[0, 0.085, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group name="UR3e_FLG" position={[0, 0.092, 0]} />
                        <mesh
                          name="UR3e_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.UR3e_L06.geometry}
                          material={materials.Standard}
                        />
                      </animated.group>
                      <mesh
                        name="UR3e_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.UR3e_L05.geometry}
                        material={materials.Standard}
                      />
                    </animated.group>
                    <mesh
                      name="UR3e_L04"
                      castShadow
                      receiveShadow
                      geometry={nodes.UR3e_L04.geometry}
                      material={materials.Standard}
                    />
                  </animated.group>
                  <mesh
                    name="UR3e_L03"
                    castShadow
                    receiveShadow
                    geometry={nodes.UR3e_L03.geometry}
                    material={materials.Standard}
                  />
                </animated.group>
                <mesh
                  name="UR3e_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.UR3e_L02.geometry}
                  material={materials.Standard}
                />
              </animated.group>
              <mesh
                name="UR3e_L01"
                castShadow
                receiveShadow
                geometry={nodes.UR3e_L01.geometry}
                material={materials.Standard}
              />
            </animated.group>
            <mesh
              name="UR3e_L00"
              castShadow
              receiveShadow
              geometry={nodes.UR3e_L00.geometry}
              material={materials.Standard}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </animated.group>
        </group>
      </group>
    </>
  )
}
