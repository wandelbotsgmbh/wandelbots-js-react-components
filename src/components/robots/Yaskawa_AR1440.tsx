import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function Yaskawa_AR1440({ modelURL, connectedMotionGroup, ...props }: RobotProps) {
  const gltf = useGLTF(modelURL) as any

  const nodes = gltf.nodes
  const materials = gltf.materials
  const rotationOffsets = [0, -Math.PI / 2, 0, 0, 0, 0]
  const rotationSign = [1, -1, 1, 1, 1, 1]

  function setRotation(jointObjects: THREE.Object3D[], jointValues: number[]) {
    jointObjects.forEach(
      (object, index) =>
        (object.rotation.y =
          rotationSign[index]! * jointValues[index]! + rotationOffsets[index]!),
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
          <group name="AR1440" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="AR1440_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="AR1440_J02"
                position={[0.155, 0, 0]}
                rotation={[Math.PI / 2, 0, Math.PI]}
              >
                <animated.group
                  name="AR1440_J03"
                  position={[0.614, 0, 0]}
                  rotation={[Math.PI, 0, 0]}
                >
                  <animated.group
                    name="AR1440_J04"
                    position={[0.2, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <animated.group
                      name="AR1440_J05"
                      position={[0, -0.64, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="AR1440_J06"
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group
                          name="AR1440_FLG"
                          position={[0, -0.1, 0]}
                          rotation={[-Math.PI, 0, 0]}
                        ></group>
                        <mesh
                          name="AR1440_L06_CAD"
                          castShadow
                          receiveShadow
                          geometry={nodes.AR1440_L06_CAD.geometry}
                          material={materials.metall}
                        />
                      </animated.group>
                      <mesh
                        name="AR1440_L05_CAD"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L05_CAD.geometry}
                        material={materials.yaskawaBlueMetall}
                      />
                    </animated.group>
                    <group name="AR1440_L04_CAD">
                      <mesh
                        name="AR1440_L04_CAD001"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L04_CAD001.geometry}
                        material={materials.yaskawaBlueMetall}
                      />
                      <mesh
                        name="AR1440_L04_CAD001_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L04_CAD001_1.geometry}
                        material={materials.white}
                      />
                    </group>
                  </animated.group>
                  <group name="AR1440_L03_CAD">
                    <mesh
                      name="AR1440_L03_CAD001"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1440_L03_CAD001.geometry}
                      material={materials.yaskawaBlueMetall}
                    />
                    <mesh
                      name="AR1440_L03_CAD001_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1440_L03_CAD001_1.geometry}
                      material={materials.blackMetall}
                    />
                  </group>
                </animated.group>
                <mesh
                  name="AR1440_L02_CAD"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR1440_L02_CAD.geometry}
                  material={materials.yaskawaBlueMetall}
                />
              </animated.group>
              <group name="AR1440_L01_CAD">
                <mesh
                  name="AR1440_L01_CAD001"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR1440_L01_CAD001.geometry}
                  material={materials.yaskawaBlueMetall}
                />
                <mesh
                  name="AR1440_L01_CAD001_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.AR1440_L01_CAD001_1.geometry}
                  material={materials.blackMetall}
                />
              </group>
            </animated.group>
            <mesh
              name="AR1440_L00_CAD"
              castShadow
              receiveShadow
              geometry={nodes.AR1440_L00_CAD.geometry}
              material={materials.yaskawaBlueMetall}
              position={[0, 0, 0.45]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </group>
        </group>
      </group>
    </>
  )
}
