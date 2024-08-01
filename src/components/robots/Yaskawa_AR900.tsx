import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function Yaskawa_AR900({
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
          <group name="AR900" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="AR900_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="AR900_J02"
                position={[0.04, 0, 0]}
                rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
              >
                <animated.group
                  name="AR900_J03"
                  position={[0.445, 0, 0]}
                  rotation={[-Math.PI, 0, 0]}
                >
                  <animated.group
                    name="AR900_J04"
                    position={[0.04, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR900_J05"
                      position={[0, -0.44, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="AR900_J06"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="AR900_FLG"
                          position={[0, -0.08, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        />
                        <mesh
                          name="AR900_L06"
                          castShadow
                          receiveShadow
                          geometry={nodes.AR900_L06.geometry}
                          material={materials["#BBA474.001"]}
                        />
                      </animated.group>
                      <mesh
                        name="AR900_L05"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR900_L05.geometry}
                        material={materials["#0056b9.001"]}
                      />
                    </animated.group>
                    <mesh
                      name="AR900_L04"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR900_L04.geometry}
                      material={materials["#0056b9.001"]}
                    />
                  </animated.group>
                  <mesh
                    name="AR900_L03"
                    castShadow
                    receiveShadow
                    geometry={nodes.AR900_L03.geometry}
                    material={materials["#0056b9.001"]}
                  />
                </animated.group>
                <mesh
                  name="AR900_L02"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR900_L02.geometry}
                  material={materials["#0056b9.001"]}
                />
              </animated.group>
              <mesh
                name="AR900_L01"
                castShadow
                receiveShadow
                geometry={nodes.AR900_L01.geometry}
                material={materials["#0056b9.001"]}
              />
            </animated.group>
            <mesh
              name="AR900_L00"
              castShadow
              receiveShadow
              geometry={nodes.AR900_L00.geometry}
              material={materials["#0056b9.001"]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
