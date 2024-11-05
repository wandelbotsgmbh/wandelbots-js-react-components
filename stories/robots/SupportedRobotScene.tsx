import { useCallback } from "react"
import type { Group } from "three"
import { Mesh, MeshBasicMaterial, SphereGeometry } from "three"
import { SupportedRobot } from "../../src"
import { rapidlyChangingMotionState } from "./motionState"

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
    <>
      <SupportedRobot
        {...props}
        flangeRef={flangeRef}
        rapidlyChangingMotionState={rapidlyChangingMotionState}
      />
    </>
  )
}
