import { useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { invalidate, useFrame } from "@react-three/fiber";
import { lerp } from "./MathUtils";
import { AxisConfig } from "./index";
import * as THREE from "three";
import { findPath } from "./PathFinder";
import React, { RefObject } from "react";
import { Group } from "three";

interface AR1440Props {
  axisConfig: AxisConfig
  planData?: any
  isGhost: boolean
  flangeRef: RefObject<Group>;
}

export function AR1440({ axisConfig, planData, isGhost, flangeRef, ...props }: AR1440Props) {
  const gltf = useGLTF(findPath("ar1440.glb")) as any;
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

          axis_1.current.rotation.z = lerp(currentData[0], nextData[0], alpha);
          axis_2.current.rotation.z = lerp(currentData[1], nextData[1], alpha);
          axis_3.current.rotation.z = lerp(currentData[2], nextData[2], alpha);
          axis_4.current.rotation.z = lerp(currentData[3], nextData[3], alpha);
          axis_5.current.rotation.z = lerp(currentData[4], nextData[4], alpha);
          axis_6.current.rotation.z = lerp(currentData[5], nextData[5], alpha);
        }

        elapsedTime += delta;

        if (elapsedTime >= interval * planData.path.length) {
          elapsedTime = 0; // Reset the elapsed time
        }
      }
      invalidate();
    } else {
      axis_1.current.rotation.z = axis_1_value.get();
      axis_2.current.rotation.z = axis_2_value.get();
      axis_3.current.rotation.z = axis_3_value.get();
      axis_4.current.rotation.z = axis_4_value.get();
      axis_5.current.rotation.z = axis_5_value.get();
      axis_6.current.rotation.z = axis_6_value.get();
    }
  });

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="AR1440" rotation={[Math.PI / 2, 0, 0]}>
          <group name="AR1440_J01" rotation={[-Math.PI / 2, 0, 0]} ref={axis_1}>
            <group
              name="AR1440_J02"
              position={[0.155, 0, 0]}
              rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
              ref={axis_2}
            >
              <group
                name="AR1440_J03"
                position={[0.614, 0, 0]}
                rotation={[-Math.PI, 0, 0]}
                ref={axis_3}
              >
                <group
                  name="AR1440_J04"
                  position={[0.2, 0, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  ref={axis_4}
                >
                  <group
                    name="AR1440_J05"
                    position={[0, -0.64, 0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    ref={axis_5}
                  >
                    <group name="AR1440_J06" rotation={[-Math.PI / 2, 0, 0]}>
                      <group
                        name="AR1440_FLG"
                        position={[0, -0.1, 0]}
                        rotation={[-Math.PI, 0, 0]}
                        ref={axis_6}
                      />
                      <mesh
                        name="AR1440_L06_CAD"
                        castShadow
                        receiveShadow
                        geometry={nodes.AR1440_L06_CAD.geometry}
                        material={materials.metall}
                      />
                    </group>
                    <mesh
                      name="AR1440_L05_CAD"
                      castShadow
                      receiveShadow
                      geometry={nodes.AR1440_L05_CAD.geometry}
                      material={materials.yaskawaBlueMetall}
                    />
                  </group>
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
                </group>
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
              </group>
              <mesh
                name="AR1440_L02_CAD"
                castShadow
                receiveShadow
                geometry={nodes.AR1440_L02_CAD.geometry}
                material={materials.yaskawaBlueMetall}
              />
            </group>
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
          </group>
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
  );
}

//useGLTF.preload(findPath("ar1440.glb"));
