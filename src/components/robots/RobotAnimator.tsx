import { useFrame, useThree } from "@react-three/fiber"
import type { DHParameter, MotionGroupState } from "@wandelbots/nova-js/v2"
import type React from "react"
import { useEffect, useRef } from "react"
import type { Group, Object3D } from "three"
import { useAutorun } from "../utils/hooks"
import { ValueInterpolator } from "../utils/interpolation"
import { useRenderBoost } from "../utils/useRenderBoost"
import { collectJoints } from "./robotModelLogic"

type RobotAnimatorProps = {
  rapidlyChangingMotionState: MotionGroupState
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
  const jointObjects = useRef<Object3D[]>([])
  const interpolatorRef = useRef<ValueInterpolator | null>(null)
  const { invalidate } = useThree()
  const motionStateRef = useRef(rapidlyChangingMotionState)
  motionStateRef.current = rapidlyChangingMotionState

  const mgId = rapidlyChangingMotionState.motion_group
  const LOG = (msg: string, ...args: unknown[]) =>
    console.log(
      `%c[RobotAnimator:${mgId}]`,
      "color:#0a84ff;font-weight:bold",
      msg,
      ...args,
    )

  LOG("render", {
    motion_group: rapidlyChangingMotionState.motion_group,
    joint_position: rapidlyChangingMotionState.joint_position,
    jointObjectsCount: jointObjects.current.length,
    hasInterpolator: !!interpolatorRef.current,
  })

  // Boost rendering for 2 seconds when motion group changes
  useRenderBoost(rapidlyChangingMotionState.motion_group, 2000, 200)

  // Initialize interpolator
  // biome-ignore lint/correctness/useExhaustiveDependencies: pre-biome code
  useEffect(() => {
    const initialJointValues = rapidlyChangingMotionState.joint_position.filter(
      (item) => item !== undefined,
    )

    LOG("INIT interpolator effect (deps:[])", {
      initialJointValues,
    })

    interpolatorRef.current = new ValueInterpolator(initialJointValues, {
      tension: 120, // Controls spring stiffness - higher values create faster, more responsive motion
      friction: 20, // Controls damping - higher values reduce oscillation and create smoother settling
      threshold: 0.001,
    })

    return () => {
      LOG("INIT interpolator effect CLEANUP (unmount/destroy)")
      interpolatorRef.current?.destroy()
    }
  }, [])

  // Animation loop that runs at the display's refresh rate
  const frameLogCountRef = useRef(0)
  useFrame((state, delta) => {
    if (interpolatorRef.current) {
      const isComplete = interpolatorRef.current.update(delta)
      setRotation()

      // Log only the first handful of frames to avoid flooding the console
      if (frameLogCountRef.current < 8) {
        frameLogCountRef.current++
        LOG("useFrame", {
          frame: frameLogCountRef.current,
          isComplete,
          jointObjectsCount: jointObjects.current.length,
          currentValues: interpolatorRef.current.getCurrentValues(),
        })
      }

      // Trigger a re-render only if the animation is still running
      if (!isComplete) {
        invalidate()
      }
    }
  })

  function setGroupRef(group: Group | null) {
    if (!group) {
      LOG("setGroupRef(null) -> ref DETACHED")
      return
    }

    jointObjects.current = collectJoints(group)

    LOG("setGroupRef(group) -> ref ATTACHED / joints collected", {
      jointObjectsCount: jointObjects.current.length,
      jointNames: jointObjects.current.map((o) => o.name),
      hasInterpolator: !!interpolatorRef.current,
      interpolatorCurrentValues: interpolatorRef.current?.getCurrentValues(),
      latestStreamJointPosition: motionStateRef.current.joint_position,
    })

    // Set initial position
    setRotation()
    invalidate()
  }

  function setRotation() {
    const updatedJointValues = interpolatorRef.current?.getCurrentValues() || []

    if (onRotationChanged) {
      onRotationChanged(jointObjects.current, updatedJointValues)
    } else {
      for (const [index, object] of jointObjects.current.entries()) {
        const dhParam = dhParameters[index]
        const rotationOffset = dhParam.theta || 0
        const rotationSign = dhParam.reverse_rotation_direction ? -1 : 1

        object.rotation.y =
          rotationSign * (updatedJointValues[index] || 0) + rotationOffset
      }
    }
  }

  // Single path for feeding new joint targets — works for both MobX and plain props
  function applyMotionState(state: MotionGroupState) {
    const newJointValues = state.joint_position.filter(
      (item) => item !== undefined,
    )
    LOG("applyMotionState -> setTarget", {
      newJointValues,
      hasInterpolator: !!interpolatorRef.current,
      jointObjectsCount: jointObjects.current.length,
    })
    interpolatorRef.current?.setTarget(newJointValues)
    invalidate()
  }

  /**
   * MobX path: autorun tracks observable reads inside the callback.
   * Reads motionStateRef.current which dereferences the observable's properties.
   */
  useAutorun(() => {
    // Reading .joint_position here is what MobX tracks for reactivity.
    const jp = motionStateRef.current.joint_position
    LOG("AUTORUN fired (mobx tracked joint_position changed or first run)", {
      joint_position: jp,
    })
    applyMotionState(motionStateRef.current)
  })

  /**
   * Plain-prop path: catch reference changes not tracked by MobX.
   * Calling setTarget with the same values is idempotent and cheap.
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: false positive
  useEffect(() => {
    LOG("PROP-CHANGE effect (deps:[rapidlyChangingMotionState]) fired", {
      joint_position: rapidlyChangingMotionState.joint_position,
    })
    applyMotionState(rapidlyChangingMotionState)
  }, [rapidlyChangingMotionState])

  return <group ref={setGroupRef}>{children}</group>
}
