import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

ABB_1300_115_10.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function ABB_1300_115_10({
  modelURL,
  flangeRef,
  ...props
}: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="link_0"
          castShadow
          receiveShadow
          geometry={nodes.link_0.geometry}
          material={materials.Plastic}
        />
        <animated.group name="ABB_IRB_1300_115_10_J00">
          <animated.group
            name="ABB_IRB_1300_115_10_J01"
            position={[0.15, 0.544, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
          >
            <animated.group
              name="ABB_IRB_1300_115_10_J02"
              position={[0.575, 0, 0]}
            >
              <animated.group
                name="ABB_IRB_1300_115_10_J03"
                position={[0.04, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="ABB_IRB_1300_115_10_J04"
                  position={[0, 0.425, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="ABB_IRB_1300_115_10_J05"
                    rotation={[Math.PI / 2, 0, -Math.PI]}
                  >
                    <group
                      ref={flangeRef}
                      name="ABB_IRB_1300_115_10_FLG"
                      position={[0, 0.092, 0]}
                    />
                    <mesh
                      name="link_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.link_6.geometry}
                      material={materials.Metal}
                      position={[1.159, -0.575, 0]}
                      rotation={[0, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <mesh
                    name="link_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.link_5.geometry}
                    material={materials.Plastic}
                    position={[-1.159, 0, 0.575]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  />
                </animated.group>
                <group
                  name="link_4"
                  position={[-1.159, -0.15, 0]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals004"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals004.geometry}
                    material={materials.Plastic}
                  />
                  <mesh
                    name="visuals004_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals004_1.geometry}
                    material={materials.PlasticRed}
                  />
                </group>
              </animated.group>
              <group
                name="link_3"
                position={[-1.119, 0, 0.15]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="visuals003"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals003.geometry}
                  material={materials.Plastic}
                />
                <mesh
                  name="visuals003_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals003_1.geometry}
                  material={materials.PlasticRed}
                />
                <mesh
                  name="visuals003_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals003_2.geometry}
                  material={materials.Plastic}
                />
              </group>
            </animated.group>
            <mesh
              name="link_2"
              castShadow
              receiveShadow
              geometry={nodes.link_2.geometry}
              material={materials.Plastic}
              position={[-0.544, 0, 0.15]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            />
          </animated.group>
          <mesh
            name="link_1"
            castShadow
            receiveShadow
            geometry={nodes.link_1.geometry}
            material={materials.Plastic}
          />
        </animated.group>
      </group>
    </group>
  )
}
