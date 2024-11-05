import { OrbitControls } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import React, { useCallback, useState, type ReactNode } from "react"
import type { Group } from "three"
import {
  Box3,
  Mesh,
  MeshBasicMaterial,
  Sphere,
  SphereGeometry,
  Vector3,
} from "three"
import { PresetEnvironment, SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"

/**
 * Renders a single robot model with orbit controls targeting it
 * for storybook demonstration purposes
 */
export function SupportedRobotScene(
  props: React.ComponentProps<typeof SupportedRobot>,
) {
  const flangeRef: React.RefCallback<Group> = useCallback((node) => {
    if (!node) return

    // Add yellow sphere to illustrate flange position of story robots
    const geometry = new SphereGeometry(0.01, 32, 16)
    const material = new MeshBasicMaterial({ color: 0xffff00 })
    const sphere = new Mesh(geometry, material)
    node.add(sphere)
  }, [])

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas shadows>
        <PresetEnvironment />

        <FitToCamera>
          <SupportedRobot
            {...props}
            flangeRef={flangeRef}
            rapidlyChangingMotionState={rapidlyChangingMotionState}
          />
        </FitToCamera>
      </Canvas>
    </div>
  )
}

function FitToCamera({ children }: { children: ReactNode }) {
  const { scene, camera } = useThree()
  const [targetSphere, setTargetSphere] = useState(new Sphere())
  const [lockZoom, setLockZoom] = useState(true)

  const groupRef: React.RefCallback<Group> = useCallback(
    (group) => {
      if (!group) return

      const bbox = new Box3().setFromObject(scene)
      const center = bbox.getCenter(new Vector3())
      const bsphere = bbox.getBoundingSphere(new Sphere(center))
      setTargetSphere(bsphere)

      setTimeout(() => {
        setLockZoom(false)
      }, 100)
    },
    [camera],
  )

  return (
    <group ref={groupRef}>
      {children}
      <OrbitControls
        camera={camera}
        target={targetSphere.center}
        minDistance={lockZoom ? targetSphere.radius * 3 : targetSphere.radius}
        maxDistance={lockZoom ? targetSphere.radius * 3 : 3}
      />
    </group>
  )
}
