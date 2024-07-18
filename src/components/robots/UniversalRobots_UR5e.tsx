import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import type { RobotProps } from "./SupportedRobot"
import { animated } from "@react-spring/three"
import RobotAnimator from "./RobotAnimator"

export function UniversalRobots_UR5e({
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
          <group name="UR5e" rotation={[Math.PI / 2, 0, 0]}>
            <animated.group name="UR5e_J01" rotation={[-Math.PI / 2, 0, 0]}>
              <animated.group
                name="UR5e_J02"
                position={[0, 0.162, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <animated.group name="UR5e_J03" position={[-0.425, 0, 0]}>
                  <animated.group name="UR5e_J04" position={[-0.392, 0, 0]}>
                    <animated.group
                      name="UR5e_J05"
                      position={[0, 0.133, 0]}
                      rotation={[Math.PI / 2, 0, 0]}
                    >
                      <animated.group
                        name="UR5e_J06"
                        position={[0, 0.1, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <group name="UR5e_FLG" position={[0, 0.1, 0]}></group>

                        <group
                          name="UR5e_L06"
                          position={[0, 0.1, 0]}
                          rotation={[0, 0, -Math.PI]}
                        >
                          <>
                            <mesh
                              name="C-1000255"
                              castShadow
                              receiveShadow
                              geometry={nodes["C-1000255"].geometry}
                              material={materials.Black}
                            />
                            <mesh
                              name="C-1000255_1"
                              castShadow
                              receiveShadow
                              geometry={nodes["C-1000255_1"].geometry}
                              material={materials.Metal}
                            />
                          </>
                        </group>
                      </animated.group>
                      <group
                        name="UR5e_L05"
                        rotation={[-Math.PI / 2, -Math.PI / 3, 0]}
                      >
                        <>
                          <mesh
                            name="C-1000253"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253"].geometry}
                            material={materials.Blue}
                          />
                          <mesh
                            name="C-1000253_1"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_1"].geometry}
                            material={materials.Black}
                          />
                          <mesh
                            name="C-1000253_2"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_2"].geometry}
                            material={materials.Metal}
                          />
                          <mesh
                            name="C-1000253_3"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_3"].geometry}
                            material={materials.DarkGray}
                          />
                        </>
                      </group>
                    </animated.group>
                    <group name="UR5e_L04" rotation={[0, -Math.PI / 3, 0]}>
                      <>
                        <mesh
                          name="C-1000251"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251"].geometry}
                          material={materials.Blue}
                        />
                        <mesh
                          name="C-1000251_1"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_1"].geometry}
                          material={materials.Black}
                        />
                        <mesh
                          name="C-1000251_2"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_2"].geometry}
                          material={materials.Metal}
                        />
                        <mesh
                          name="C-1000251_3"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_3"].geometry}
                          material={materials.DarkGray}
                        />
                      </>
                    </group>
                  </animated.group>
                  <group name="UR5e_L03">
                    <>
                      <mesh
                        name="C-1000250"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250"].geometry}
                        material={materials.Black}
                      />
                      <mesh
                        name="C-1000250_1"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_1"].geometry}
                        material={materials.DarkGray}
                      />
                      <mesh
                        name="C-1000250_2"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_2"].geometry}
                        material={materials.Blue}
                      />
                      <mesh
                        name="C-1000250_3"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_3"].geometry}
                        material={materials.Metal}
                      />
                      <mesh
                        name="C-1000250_4"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_4"].geometry}
                        material={materials.Metal}
                      />
                    </>
                  </group>
                </animated.group>
                <group name="UR5e_L02" rotation={[0, -Math.PI / 2, 0]}>
                  <>
                    <mesh
                      name="C-1000249"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249"].geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="C-1000249_1"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_1"].geometry}
                      material={materials.Black}
                    />
                    <mesh
                      name="C-1000249_2"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_2"].geometry}
                      material={materials.DarkGray}
                    />
                    <mesh
                      name="C-1000249_3"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_3"].geometry}
                      material={materials.Blue}
                    />
                    <mesh
                      name="C-1000249_4"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_4"].geometry}
                      material={materials.Metal}
                    />
                  </>
                </group>
              </animated.group>
              <group name="UR5e_L01" rotation={[Math.PI / 2, 0, 0]}>
                <>
                  <mesh
                    name="C-1000248"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248"].geometry}
                    material={materials.DarkGray}
                  />
                  <mesh
                    name="C-1000248_1"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_1"].geometry}
                    material={materials.Black}
                  />
                  <mesh
                    name="C-1000248_2"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_2"].geometry}
                    material={materials.Blue}
                  />
                  <mesh
                    name="C-1000248_3"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_3"].geometry}
                    material={materials.Metal}
                  />
                </>
              </group>
            </animated.group>
            <group name="UR5e_L00">
              <>
                <mesh
                  name="C-1000257"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000257"].geometry}
                  material={materials.Black}
                />
                <mesh
                  name="C-1000257_1"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000257_1"].geometry}
                  material={materials.Metal}
                />
              </>
            </group>
          </group>
        </group>
      </group>
    </>
  )
}
