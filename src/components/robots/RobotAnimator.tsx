import { Globals, useSpring } from "@react-spring/three"
import { useThree } from "@react-three/fiber"
import type {
  DHParameter,
  MotionGroupStateResponse,
} from "@wandelbots/nova-api/v1"
import React, { useMemo, useRef } from "react"
import type { Group, Object3D } from "three"
import { collectJoints } from "./robotModelLogic"

type RobotAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupStateResponse
  dhParameters: DHParameter[]
  onRotationChanged?: (joints: Object3D[], jointValues: number[]) => void
  children: React.ReactNode
}

export default function RobotAnimator({
  rapidlyChangingMotionState,
  dhParameters,
  onRotationChanged,
  children,
}: RobotAnimatorProps) {
  Globals.assign({ frameLoop: "always" })
  const jointObjects = useRef<Object3D[]>([])
  const { invalidate } = useThree()

  function setGroupRef(group: Group | null) {
    if (!group) return

    jointObjects.current = collectJoints(group)

    // Set initial position
    setRotation()
    invalidate()
  }

  function setRotation() {
    const updatedJointValues = jointObjects.current.map((_, objectIndex) =>
      (axisValues as any)[objectIndex].get(),
    )

    if (onRotationChanged) {
      onRotationChanged(jointObjects.current, updatedJointValues)
    } else {
      for (const [index, object] of jointObjects.current.entries()) {
        const dhParam = dhParameters[index]
        const rotationOffset = dhParam.theta || 0
        const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

        object.rotation.y =
          rotationSign * updatedJointValues[index]! + rotationOffset
      }
    }
  }

  // Purely declarative spring - no imperative API usage
  const jointValues = useMemo(
    () =>
      rapidlyChangingMotionState.state.joint_position.joints.filter(
        (item) => item !== undefined,
      ),
    [rapidlyChangingMotionState.state.joint_position.joints],
  )

  const targetValues = useMemo(
    () => Object.fromEntries(jointValues.map((value, index) => [index, value])),
    [jointValues],
  )

  const axisValues = useSpring({
    from: Object.fromEntries(jointValues.map((_, index) => [index, 0])),
    to: targetValues,
    config: { tension: 120, friction: 20 },
    onChange: () => {
      setRotation()
      invalidate()
    },
    onResolve: () => {
      setRotation()
    },
  })

  return <group ref={setGroupRef}>{children}</group>
}
