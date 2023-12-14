import { useSpring } from "@react-spring/three";
import { Sphere, Trail, useGLTF } from "@react-three/drei";
import { invalidate, useFrame } from "@react-three/fiber";
import { lerp } from "./MathUtils";
import { AxisConfig } from "./index";
import * as THREE from "three";
import { findPath } from "./PathFinder";
import React, { RefObject } from "react";
import { Group } from "three";

interface UR5eProps {
  axisConfig: AxisConfig
  planData?: any
  isGhost: boolean
  flangeRef: RefObject<Group>;
}

export function UR5e({ axisConfig, planData, isGhost, flangeRef, ...props }: UR5eProps) {
  const gltf = useGLTF(findPath("ur5e.glb")) as any;
  const nodes = gltf.nodes;
  const materials = gltf.materials;
  const interval = 0.25; // 250m  update rate
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

  const depthMaterial = new THREE.MeshPhysicalMaterial({
    depthTest: true,
    depthWrite: true,
    colorWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    color: "#ffffff",
  });

  const ghostMaterial = new THREE.MeshPhysicalMaterial({
    depthTest: true,
    depthWrite: true,
    transmission: 0.75,
    roughness: 1,
    transparent: true,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    colorWrite: true,
    color: "#f3f3f3",
  });

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="UR5e" rotation={[Math.PI / 2, 0, 0]}>
          <group name="UR5e_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="UR5e_J02"
              position={[0, 0.162, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              ref={axis_2}
            >
              <group name="UR5e_J03" position={[-0.425, 0, 0]} ref={axis_3}>
                <group name="UR5e_J04" position={[-0.392, 0, 0]} ref={axis_4}>
                  <group
                    name="UR5e_J05"
                    position={[0, 0.133, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group
                      name="UR5e_J06"
                      position={[0, 0.1, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      ref={axis_6}
                    >
                      <group name="UR5e_FLG" position={[0, 0.1, 0]} ref={flangeRef}>
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

                      <group
                        name="UR5e_L06"
                        position={[0, 0.1, 0]}
                        rotation={[0, 0, -Math.PI]}
                      >
                        {isGhost ? (
                          <>
                            <mesh
                              name="C-1000255"
                              castShadow
                              receiveShadow
                              geometry={nodes["C-1000255"].geometry}
                              material={depthMaterial}
                            />
                            <mesh
                              name="C-1000255_1"
                              castShadow
                              receiveShadow
                              geometry={nodes["C-1000255_1"].geometry}
                              material={depthMaterial}
                            />

                            <mesh
                              name="C-1000255"
                              castShadow
                              receiveShadow
                              geometry={nodes["C-1000255"].geometry}
                              material={ghostMaterial}
                            />
                            <mesh
                              name="C-1000255_1"
                              castShadow
                              receiveShadow
                              geometry={nodes["C-1000255_1"].geometry}
                              material={ghostMaterial}
                            />
                          </>
                        ) : (
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
                        )}
                      </group>
                    </group>
                    <group
                      name="UR5e_L05"
                      rotation={[-Math.PI / 2, -Math.PI / 3, 0]}
                    >
                      {isGhost ? (
                        <>
                          <mesh
                            name="C-1000253"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253"].geometry}
                            material={depthMaterial}
                          />
                          <mesh
                            name="C-1000253_1"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_1"].geometry}
                            material={depthMaterial}
                          />
                          <mesh
                            name="C-1000253_2"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_2"].geometry}
                            material={depthMaterial}
                          />
                          <mesh
                            name="C-1000253_3"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_3"].geometry}
                            material={depthMaterial}
                          />

                          <mesh
                            name="C-1000253"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253"].geometry}
                            material={ghostMaterial}
                          />
                          <mesh
                            name="C-1000253_1"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_1"].geometry}
                            material={ghostMaterial}
                          />
                          <mesh
                            name="C-1000253_2"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_2"].geometry}
                            material={ghostMaterial}
                          />
                          <mesh
                            name="C-1000253_3"
                            castShadow
                            receiveShadow
                            geometry={nodes["C-1000253_3"].geometry}
                            material={ghostMaterial}
                          />
                        </>
                      ) : (
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
                      )}
                    </group>
                  </group>
                  <group name="UR5e_L04" rotation={[0, -Math.PI / 3, 0]}>
                    {isGhost ? (
                      <>
                        <mesh
                          name="C-1000251"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251"].geometry}
                          material={depthMaterial}
                        />
                        <mesh
                          name="C-1000251_1"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_1"].geometry}
                          material={depthMaterial}
                        />
                        <mesh
                          name="C-1000251_2"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_2"].geometry}
                          material={depthMaterial}
                        />
                        <mesh
                          name="C-1000251_3"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_3"].geometry}
                          material={depthMaterial}
                        />

                        <mesh
                          name="C-1000251"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251"].geometry}
                          material={ghostMaterial}
                        />
                        <mesh
                          name="C-1000251_1"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_1"].geometry}
                          material={ghostMaterial}
                        />
                        <mesh
                          name="C-1000251_2"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_2"].geometry}
                          material={ghostMaterial}
                        />
                        <mesh
                          name="C-1000251_3"
                          castShadow
                          receiveShadow
                          geometry={nodes["C-1000251_3"].geometry}
                          material={ghostMaterial}
                        />
                      </>
                    ) : (
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
                    )}
                  </group>
                </group>
                <group name="UR5e_L03">
                  {isGhost ? (
                    <>
                      <mesh
                        name="C-1000250"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250"].geometry}
                        material={depthMaterial}
                      />
                      <mesh
                        name="C-1000250_1"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_1"].geometry}
                        material={depthMaterial}
                      />
                      <mesh
                        name="C-1000250_2"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_2"].geometry}
                        material={depthMaterial}
                      />
                      <mesh
                        name="C-1000250_3"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_3"].geometry}
                        material={depthMaterial}
                      />
                      <mesh
                        name="C-1000250_4"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_4"].geometry}
                        material={depthMaterial}
                      />

                      <mesh
                        name="C-1000250"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250"].geometry}
                        material={ghostMaterial}
                      />
                      <mesh
                        name="C-1000250_1"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_1"].geometry}
                        material={ghostMaterial}
                      />
                      <mesh
                        name="C-1000250_2"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_2"].geometry}
                        material={ghostMaterial}
                      />
                      <mesh
                        name="C-1000250_3"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_3"].geometry}
                        material={ghostMaterial}
                      />
                      <mesh
                        name="C-1000250_4"
                        castShadow
                        receiveShadow
                        geometry={nodes["C-1000250_4"].geometry}
                        material={ghostMaterial}
                      />
                    </>
                  ) : (
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
                  )}
                </group>
              </group>
              <group name="UR5e_L02" rotation={[0, -Math.PI / 2, 0]}>
                {isGhost ? (
                  <>
                    <mesh
                      name="C-1000249"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249"].geometry}
                      material={depthMaterial}
                    />
                    <mesh
                      name="C-1000249_1"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_1"].geometry}
                      material={depthMaterial}
                    />
                    <mesh
                      name="C-1000249_2"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_2"].geometry}
                      material={depthMaterial}
                    />
                    <mesh
                      name="C-1000249_3"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_3"].geometry}
                      material={depthMaterial}
                    />
                    <mesh
                      name="C-1000249_4"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_4"].geometry}
                      material={depthMaterial}
                    />

                    <mesh
                      name="C-1000249"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249"].geometry}
                      material={ghostMaterial}
                    />
                    <mesh
                      name="C-1000249_1"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_1"].geometry}
                      material={ghostMaterial}
                    />
                    <mesh
                      name="C-1000249_2"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_2"].geometry}
                      material={ghostMaterial}
                    />
                    <mesh
                      name="C-1000249_3"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_3"].geometry}
                      material={ghostMaterial}
                    />
                    <mesh
                      name="C-1000249_4"
                      castShadow
                      receiveShadow
                      geometry={nodes["C-1000249_4"].geometry}
                      material={ghostMaterial}
                    />
                  </>
                ) : (
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
                )}
              </group>
            </group>
            <group name="UR5e_L01" rotation={[Math.PI / 2, 0, 0]}>
              {isGhost ? (
                <>
                  <mesh
                    name="C-1000248"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248"].geometry}
                    material={depthMaterial}
                  />
                  <mesh
                    name="C-1000248_1"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_1"].geometry}
                    material={depthMaterial}
                  />
                  <mesh
                    name="C-1000248_2"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_2"].geometry}
                    material={depthMaterial}
                  />
                  <mesh
                    name="C-1000248_3"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_3"].geometry}
                    material={depthMaterial}
                  />

                  <mesh
                    name="C-1000248"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248"].geometry}
                    material={ghostMaterial}
                  />
                  <mesh
                    name="C-1000248_1"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_1"].geometry}
                    material={ghostMaterial}
                  />
                  <mesh
                    name="C-1000248_2"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_2"].geometry}
                    material={ghostMaterial}
                  />
                  <mesh
                    name="C-1000248_3"
                    castShadow
                    receiveShadow
                    geometry={nodes["C-1000248_3"].geometry}
                    material={ghostMaterial}
                  />
                </>
              ) : (
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
              )}
            </group>
          </group>
          <group name="UR5e_L00">
            {isGhost ? (
              <>
                <mesh
                  name="C-1000257"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000257"].geometry}
                  material={depthMaterial}
                />
                <mesh
                  name="C-1000257_1"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000257_1"].geometry}
                  material={depthMaterial}
                />

                <mesh
                  name="C-1000257"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000257"].geometry}
                  material={ghostMaterial}
                />
                <mesh
                  name="C-1000257_1"
                  castShadow
                  receiveShadow
                  geometry={nodes["C-1000257_1"].geometry}
                  material={ghostMaterial}
                />
              </>
            ) : (
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
            )}
          </group>
        </group>
      </group>
    </group>
  );
}

//useGLTF.preload(findPath("ur5e.glb"));
