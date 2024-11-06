import { Canvas } from "@react-three/fiber"
import React, { useCallback } from "react"
import type { Group } from "three"
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three"
import { PresetEnvironment, SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"
import { OrbitControlsAround } from "./OrbitControlsAround"

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

        <OrbitControlsAround>
          <SupportedRobot
            {...props}
            flangeRef={flangeRef}
            rapidlyChangingMotionState={rapidlyChangingMotionState}
          />
        </OrbitControlsAround>
      </Canvas>
    </div>
  )
}
