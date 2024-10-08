import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import type { RobotModelProps } from "./types"

ABB_1200_07_7.config = {
  rotationOffsets: [0, -Math.PI / 2, 0, 0, 0, 0],
}

export function ABB_1200_07_7({ modelURL, ...props }: RobotModelProps) {
  const gltf = useGLTF(modelURL) as any
  const nodes = gltf.nodes
  const materials = gltf.materials

  return (
    <group {...props} dispose={null}>
      <group name="Empty">
        <group name="visuals">
          <mesh
            name="visuals_1"
            castShadow
            receiveShadow
            geometry={nodes.visuals_1.geometry}
            material={materials.abb_metal_polished}
          />
          <mesh
            name="visuals_2"
            castShadow
            receiveShadow
            geometry={nodes.visuals_2.geometry}
            material={materials.abb_white}
          />
        </group>
        <animated.group name="ABB_IRB1200_J00">
          <group
            name="ABB_IRB1200_J01"
            position={[0, 0.399, 0]}
            rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
          >
            <animated.group name="ABB_IRB1200_J02" position={[0.35, 0, 0]}>
              <animated.group
                name="ABB_IRB1200_J03"
                position={[0.042, 0, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <animated.group
                  name="ABB_IRB1200_J04"
                  position={[0, 0.351, 0]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  <animated.group
                    name="ABB_IRB1200_J05"
                    rotation={[Math.PI / 2, 0, -Math.PI]}
                  >
                    <group name="ABB_IRB1200_FLG" position={[0, 0.082, 0]} />
                    <mesh
                      name="visuals006"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals006.geometry}
                      material={materials.abb_metal_black}
                      position={[0.791, -0.351, 0]}
                      rotation={[0, 0, Math.PI / 2]}
                    />
                  </animated.group>
                  <group
                    name="visuals005"
                    position={[-0.791, 0, 0.351]}
                    rotation={[Math.PI / 2, 0, -Math.PI / 2]}
                  >
                    <mesh
                      name="visuals005_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals005_1.geometry}
                      material={materials.abb_metal_polished}
                    />
                    <mesh
                      name="visuals005_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.visuals005_2.geometry}
                      material={materials.abb_white}
                    />
                  </group>
                </animated.group>
                <group
                  name="visuals004"
                  position={[-0.791, 0, 0]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                >
                  <mesh
                    name="visuals004_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals004_1.geometry}
                    material={materials.abb_metal_polished}
                  />
                  <mesh
                    name="visuals004_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals004_2.geometry}
                    material={materials.abb_white}
                  />
                  <mesh
                    name="visuals004_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.visuals004_3.geometry}
                    material={materials.abb_red}
                  />
                </group>
              </animated.group>
              <group
                name="visuals003"
                position={[-0.749, 0, 0]}
                rotation={[Math.PI / 2, 0, -Math.PI / 2]}
              >
                <mesh
                  name="visuals003_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals003_1.geometry}
                  material={materials.abb_white}
                />
                <mesh
                  name="visuals003_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals003_2.geometry}
                  material={materials.abb_red}
                />
                <mesh
                  name="visuals003_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.visuals003_3.geometry}
                  material={materials.abb_metal_polished}
                />
              </group>
            </animated.group>
            <group
              name="visuals002"
              position={[-0.399, 0, 0]}
              rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            >
              <mesh
                name="visuals002_1"
                castShadow
                receiveShadow
                geometry={nodes.visuals002_1.geometry}
                material={materials.abb_white}
              />
              <mesh
                name="visuals002_2"
                castShadow
                receiveShadow
                geometry={nodes.visuals002_2.geometry}
                material={materials.abb_metal_polished}
              />
            </group>
          </group>
          <group name="visuals001">
            <mesh
              name="visuals001_1"
              castShadow
              receiveShadow
              geometry={nodes.visuals001_1.geometry}
              material={materials.abb_white}
            />
            <mesh
              name="visuals001_2"
              castShadow
              receiveShadow
              geometry={nodes.visuals001_2.geometry}
              material={materials.abb_metal_polished}
            />
          </group>
        </animated.group>
      </group>
    </group>
  )
}
