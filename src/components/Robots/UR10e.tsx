import { useSpring } from "@react-spring/three";
import { Sphere, Trail, useGLTF } from "@react-three/drei";
import { invalidate, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lerp } from "./MathUtils";
import { AxisConfig } from "./index";
import { findPath } from "./PathFinder";
import React, { RefObject } from "react";
import { Group } from "three";

interface UR10eProps {
  axisConfig: AxisConfig
  planData?: any
  isGhost: boolean
  flangeRef: RefObject<Group>;
}

export function UR10e({ axisConfig, planData, isGhost, flangeRef, ...props }: UR10eProps) {
  const gltf = useGLTF(findPath("ur10e.glb")) as any;
  const nodes = gltf.nodes;
  const materials = gltf.materials;
  const interval = 0.25; // 250ms update rate
  let elapsedTime = 0;

  const axis_1 = React.useRef<THREE.Group>(new THREE.Group());
  const axis_2 = React.useRef<THREE.Group>(new THREE.Group());
  const axis_3 = React.useRef<THREE.Group>(new THREE.Group());
  const axis_4 = React.useRef<THREE.Group>(new THREE.Group());
  const axis_5 = React.useRef<THREE.Group>(new THREE.Group());
  const axis_6 = React.useRef<THREE.Group>(new THREE.Group());

  const [
    {
      axis_1_value,
      axis_2_value,
      axis_3_value,
      axis_4_value,
      axis_5_value,
      axis_6_value,
    },
    setSpring,
  ] = useSpring(() => ({
    axis_1_value: axisConfig.axis_1,
    axis_2_value: axisConfig.axis_2,
    axis_3_value: axisConfig.axis_3,
    axis_4_value: axisConfig.axis_4,
    axis_5_value: axisConfig.axis_5,
    axis_6_value: axisConfig.axis_6,
    onChange: () => {
      axis_1.current.rotation.z = -axis_1_value.get();
      axis_2.current.rotation.z = axis_2_value.get();
      axis_3.current.rotation.y = axis_3_value.get();
      axis_4.current.rotation.y = axis_4_value.get();
      axis_5.current.rotation.z = axis_5_value.get();
      axis_6.current.rotation.z = -axis_6_value.get();
      invalidate();
    },
  }));

  setSpring.start({
    axis_1_value: axisConfig.axis_1,
    axis_2_value: axisConfig.axis_2,
    axis_3_value: axisConfig.axis_3,
    axis_4_value: axisConfig.axis_4,
    axis_5_value: axisConfig.axis_5,
    axis_6_value: axisConfig.axis_6,
  });

  useFrame((_, delta) => {

    axis_1.current.rotation.order = "ZYX";
    axis_2.current.rotation.order = "ZYX";
    axis_3.current.rotation.order = "ZYX";
    axis_4.current.rotation.order = "ZYX";
    axis_5.current.rotation.order = "ZYX";
    axis_6.current.rotation.order = "ZYX";

    if (axisConfig.useSkill) {
      elapsedTime += delta;
      if (elapsedTime >= interval) {
        const currentIndex = Math.floor(elapsedTime / interval);
        const nextIndex = currentIndex + 1;

        if (nextIndex < planData.path.length) {
          const currentData = planData.path[currentIndex].joints.joints;
          const nextData = planData.path[nextIndex].joints.joints;

          const alpha = (elapsedTime % interval) / interval;

          axis_1.current.rotation.z = -lerp(currentData[0], nextData[0], alpha);
          axis_2.current.rotation.z = lerp(currentData[1], nextData[1], alpha);
          axis_3.current.rotation.y = lerp(currentData[2], nextData[2], alpha);
          axis_4.current.rotation.y = lerp(currentData[3], nextData[3], alpha);
          axis_5.current.rotation.z = lerp(currentData[4], nextData[4], alpha);
          axis_6.current.rotation.z = -lerp(currentData[5], nextData[5], alpha);
        }

        elapsedTime += delta;

        if (elapsedTime >= interval * planData.path.length) {
          elapsedTime = 0; // Reset the elapsed time
        }
      }
      invalidate();
    } else {
      axis_1.current.rotation.z = -axis_1_value.get();
      axis_2.current.rotation.z = axis_2_value.get();
      axis_3.current.rotation.y = axis_3_value.get();
      axis_4.current.rotation.y = axis_4_value.get();
      axis_5.current.rotation.z = axis_5_value.get();
      axis_6.current.rotation.z = -axis_6_value.get();
    }
  });

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="UR10e" rotation={[Math.PI / 2, 0, 0]}>
          <group name="UR10e_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="UR10e_J02"
              position={[0, 0.181, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              ref={axis_2}
            >
              <group name="UR10e_J03" position={[-0.613, 0, 0]} ref={axis_3}>
                <group name="UR10e_J04" position={[-0.572, 0, 0]} ref={axis_4}>
                  <group
                    name="UR10e_J05"
                    position={[0, 0.174, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group
                      name="UR10e_J06"
                      position={[0, 0.12, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      ref={axis_6}
                    >
                      <group
                        name="UR10e_FLG"
                        position={[1.184, -0.174, 0.061]}
                        rotation={[-Math.PI / 2, 0, 0]}
                      >
                        <mesh
                          name="C-1000493"
                          geometry={nodes["C-1000493"].geometry}
                          material={materials.Black}
                          castShadow
                          receiveShadow
                        />
                        <mesh
                          name="C-1000493_1"
                          geometry={nodes["C-1000493_1"].geometry}
                          material={materials.Metal}
                          castShadow
                          receiveShadow
                        />
                      </group>

                      <group name="UR10e_L07" position={[0, 0.117, 0]} ref={flangeRef}>
                        <Trail
                          width={0.5} // Width of the line
                          color={"white"} // Color of the line
                          length={10} // Length of the line
                          decay={1} // How fast the line fades away
                          local={false} // Wether to use the target's world or local positions
                          stride={0} // Min distance between previous and current point
                          interval={1} // Number of frames to wait before next calculation
                          attenuation={(width) => width} // A function to define the width in each point along it.
                        >
                          <mesh>
                            <Sphere scale={0.001} />
                          </mesh>
                        </Trail>
                      </group>
                    </group>
                    <group
                      name="UR10e_L06"
                      position={[1.184, 0.181, 0.174]}
                      rotation={[Math.PI, 0, 0]}
                    >
                      <mesh
                        name="C-1000492"
                        geometry={nodes["C-1000492"].geometry}
                        material={materials.DarkGray}
                        castShadow
                        receiveShadow
                      />
                      <mesh
                        name="C-1000492_1"
                        geometry={nodes["C-1000492_1"].geometry}
                        material={materials.Black}
                        castShadow
                        receiveShadow
                      />
                      <mesh
                        name="C-1000492_2"
                        geometry={nodes["C-1000492_2"].geometry}
                        material={materials.Blue}
                        castShadow
                        receiveShadow
                      />
                      <mesh
                        name="C-1000492_3"
                        geometry={nodes["C-1000492_3"].geometry}
                        material={materials.Screw}
                        castShadow
                        receiveShadow
                      />
                    </group>
                  </group>
                  <group
                    name="UR10e_L05"
                    position={[1.184, 0, 0.181]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  >
                    <mesh
                      name="C-1000491"
                      geometry={nodes["C-1000491"].geometry}
                      material={materials.DarkGray}
                      castShadow
                      receiveShadow
                    />
                    <mesh
                      name="C-1000491_1"
                      geometry={nodes["C-1000491_1"].geometry}
                      material={materials.Blue}
                      castShadow
                      receiveShadow
                    />
                    <mesh
                      name="C-1000491_2"
                      geometry={nodes["C-1000491_2"].geometry}
                      material={materials.Black}
                      castShadow
                      receiveShadow
                    />
                    <mesh
                      name="C-1000491_3"
                      geometry={nodes["C-1000491_3"].geometry}
                      material={materials.Screw}
                      castShadow
                      receiveShadow
                    />
                  </group>
                </group>
                <group
                  name="UR10e_L04"
                  position={[0.613, 0, 0.181]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <mesh
                    name="C-1000490"
                    geometry={nodes["C-1000490"].geometry}
                    material={materials.Metal}
                    castShadow
                    receiveShadow
                  />
                  <mesh
                    name="C-1000490_1"
                    geometry={nodes["C-1000490_1"].geometry}
                    material={materials.Black}
                    castShadow
                    receiveShadow
                  />
                  <mesh
                    name="C-1000490_2"
                    geometry={nodes["C-1000490_2"].geometry}
                    material={materials.DarkGray}
                    castShadow
                    receiveShadow
                  />
                  <mesh
                    name="C-1000490_3"
                    geometry={nodes["C-1000490_3"].geometry}
                    material={materials.Blue}
                    castShadow
                    receiveShadow
                  />
                </group>
              </group>
              <group
                name="UR10e_L03"
                position={[0, 0, 0.181]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <mesh
                  name="C-1000489"
                  geometry={nodes["C-1000489"].geometry}
                  material={materials.Blue}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_1"
                  geometry={nodes["C-1000489_1"].geometry}
                  material={materials.Black}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_2"
                  geometry={nodes["C-1000489_2"].geometry}
                  material={materials.DarkGray}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_3"
                  geometry={nodes["C-1000489_3"].geometry}
                  material={materials.Screw}
                  castShadow
                  receiveShadow
                />
                <mesh
                  name="C-1000489_4"
                  geometry={nodes["C-1000489_4"].geometry}
                  material={materials.Metal}
                  castShadow
                  receiveShadow
                />
              </group>
            </group>
            <group name="UR10e_L02">
              <mesh
                name="C-1000488"
                geometry={nodes["C-1000488"].geometry}
                material={materials.Black}
                castShadow
                receiveShadow
              />
              <mesh
                name="C-1000488_1"
                geometry={nodes["C-1000488_1"].geometry}
                material={materials.Blue}
                castShadow
                receiveShadow
              />
              <mesh
                name="C-1000488_2"
                geometry={nodes["C-1000488_2"].geometry}
                material={materials.Screw}
                castShadow
                receiveShadow
              />
              <mesh
                name="C-1000488_3"
                geometry={nodes["C-1000488_3"].geometry}
                material={materials.DarkGray}
                castShadow
                receiveShadow
              />
            </group>
          </group>
          <group name="UR10e_L01" rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              name="C-1000487"
              geometry={nodes["C-1000487"].geometry}
              material={materials.Black}
              castShadow
              receiveShadow
            />
            <mesh
              name="C-1000487_1"
              geometry={nodes["C-1000487_1"].geometry}
              material={materials.Metal}
              castShadow
              receiveShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
}

//useGLTF.preload(findPath("ur10e.glb"));
