import { degreesToRadians, radiansToDegrees } from "@wandelbots/nova-js"
import { type CoordinateSystem, JointTypeEnum } from "@wandelbots/nova-js/v2"
import { runInAction, when } from "mobx"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Quaternion } from "three"
import { i18n } from "../../i18n/config"
import type { Vector3Simple } from "../../lib/JoggerConnection"
import { Pose3 } from "../../lib/Pose3"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { parseRotationToQuaternion } from "../../lib/rotation"
import type { JoggingStore } from "../jogging/JoggingStore"
import type { JogAxis, JogDirection } from "../jogging/jogHandle"
import type {
  JogMotion,
  RobotControlJogMode,
  RobotControlPanelProps,
  RobotControlPose,
  RobotControlTab,
} from "./RobotControlPanel"
import { useEveryFrame } from "./useEveryFrame"

// Ported from RobotPad (src/jogging/RobotControl.tsx)

/** What an app gives the Robot control of a session */
export type RobotControlOptions = {
  /** The app's lock: while it is true, nothing in the panel moves the robot */
  disabled?: boolean
  /**
   * NOVA's axes as the app's 3D view sees them, which `JoggingGizmoOrientation`
   * in the view writes: the gizmo turns with the camera
   */
  gizmoOrientation?: RobotControlPanelProps["gizmoOrientation"]
}

/** The joints of a six-axis robot arm, as the design names them */
const SIX_AXIS_NAMES = [
  "Base",
  "Shoulder",
  "Elbow",
  "Forearm",
  "Wrist",
  "Flange",
]

// The selected TCP and the coordinate systems in one select
const SELECTED_TCP = "selected-tcp"
const COORD_SYSTEM = "coordinate-system:"

/** A shown velocity in °/s, without the float noise of the conversion */
const toDegrees = (radians: number) =>
  Math.round(radiansToDegrees(radians) * 1e6) / 1e6

/**
 * A coordinate system's name in a select, with its id when another one has
 * the same name
 */
function coordSystemLabel(store: JoggingStore, cs: CoordinateSystem) {
  return cs.name && (store.coordSystemCountByName[cs.name] ?? 0) > 1
    ? `${cs.name} / ${cs.coordinate_system}`
    : cs.name || cs.coordinate_system
}

/**
 * The joints' positions, followed every animation frame: the motion state
 * changes too fast to be observed
 */
function useJointValues(store: JoggingStore): number[] {
  const text = useEveryFrame(
    () =>
      store.jogger.motionStream.rapidlyChangingMotionState.joint_position.join(
        " ",
      ),
    true,
  )
  return useMemo(() => (text ? text.split(" ").map(Number) : []), [text])
}

/**
 * The props of `RobotControlPanel` for a robot of a session: Translate
 * and Rotate jog the TCP (continuously or by the steps of its jogging store),
 * Joint jogs the joints, and Move to plans the pose typed in it as the
 * session's typed pose and moves along the planned trajectory while held.
 * The tab, jog mode, step size and velocities are the jogging store's, so
 * the session's storage keeps them.
 *
 * `<RobotControl />` is the panel with these props. An app that wants to
 * change a part takes the props and overrides it:
 *
 * ```tsx
 * <RobotControlPanel {...useRobotControlProps(session)} onClose={close} />
 * ```
 */
export function useRobotControlProps(
  session: RobotSession,
  options: RobotControlOptions = {},
): RobotControlPanelProps {
  const { disabled = false, gizmoOrientation } = options
  const { t } = useTranslation(undefined, { i18n })
  const store = session.jogging
  const { trajectory, targetPose } = session
  const jointValues = useJointValues(store)
  const linear = store.jointType === JointTypeEnum.PrismaticJoint
  const jointLimits =
    store.motionGroupDescription.operation_limits.auto_limits?.joints

  // Jogging waits while a trajectory moves the robot (jogDisabled); Move to
  // stays usable, so its own move goes on
  const trajectoryBusy =
    trajectory.trajectoryState === "moving" ||
    trajectory.trajectoryState === "stopping"
  const locked = disabled || trajectoryBusy
  useEffect(() => {
    if (locked) store.lock("external")
    else store.unlock("external")
  }, [store, locked])

  // The tab, jog mode and step size are the store's: it jogs by them and
  // keeps them. Move to has no tab in the store.
  const [onMoveToTab, setOnMoveToTab] = useState(false)
  // The store's tab is Joint also when its Cartesian tab is not there
  const tab: RobotControlTab = onMoveToTab
    ? "moveTo"
    : store.currentTab.id === "joint"
      ? "joint"
      : store.selectedCartesianMotionType
  function changeTab(next: RobotControlTab) {
    setOnMoveToTab(next === "moveTo")
    runInAction(() => {
      // Move to plans a TCP pose: the typed pose reads its text as joints
      // while the store is on its joint tab
      store.selectedTabId = next === "joint" ? "joint" : "cartesian"
    })
    if (next === "translate" || next === "rotate") {
      store.setSelectedCartesianMotionType(next)
    }
  }
  const jogMode: RobotControlJogMode =
    store.selectedIncrementId === "continuous" ? "continuous" : "increment"
  // The increment to go back to when the mode turns to Increment again
  const lastIncrement = useRef(
    store.activeDiscreteIncrement ?? store.discreteIncrementOptions[0],
  )
  if (store.activeDiscreteIncrement) {
    lastIncrement.current = store.activeDiscreteIncrement
  }
  const increment = lastIncrement.current

  // The latest press: a release while the jogging connection opens makes
  // that press move nothing, and a stop keeps the connection for a start
  // that came in the same event (a joint slider turning around)
  const press = useRef(0)

  async function startCartesian(
    motion: JogMotion,
    axis: JogAxis,
    direction: JogDirection,
  ) {
    const mine = ++press.current
    if (store.isLocked) return
    await store.activate()
    if (mine !== press.current) return
    if (motion === "translate") {
      await store.jogger.translateTCP({
        axis,
        direction,
        velocityMmPerSec: store.translationVelocityMmPerSec,
      })
    } else {
      await store.jogger.rotateTCP({
        axis,
        direction,
        velocityRadsPerSec: store.rotationVelocityRadsPerSec,
      })
    }
  }

  async function startJoint(joint: number, direction: JogDirection) {
    const mine = ++press.current
    await store.activate()
    if (mine !== press.current) return
    await store.jogger.rotateJoints({
      joint,
      direction,
      velocityUnit: linear ? "mm/s" : "rad/s",
      velocityValue: linear
        ? store.translationVelocityMmPerSec
        : store.rotationVelocityRadsPerSec,
    })
  }

  async function stopJogging() {
    const mine = ++press.current
    await store.jogger.stop()
    if (mine !== press.current) return
    await store.deactivate()
  }

  /** One step of the chosen size along or about an axis */
  async function step(
    motion: JogMotion,
    axis: JogAxis,
    direction: JogDirection,
    distance: number,
  ) {
    const chosen = store.discreteIncrementOptions.find((option) =>
      motion === "translate"
        ? Math.abs(option.mm - distance) < 1e-9
        : Math.abs(degreesToRadians(option.degrees) - distance) < 1e-9,
    )
    if (!chosen || store.isLocked) return
    await store.withMotionLock(async () => {
      try {
        const jogger = await store.activate()
        const state = jogger.motionStream.rapidlyChangingMotionState
        if (!state.tcp_pose) return
        store.setCurrentIncrementJog({ axis, direction })
        await store.jogger.runIncrementalCartesianMotion({
          currentTcpPose: state.tcp_pose,
          currentJoints: state.joint_position as Vector3Simple,
          velocityInRelevantUnits:
            motion === "translate"
              ? store.translationVelocityMmPerSec
              : store.rotationVelocityRadsPerSec,
          axis,
          direction,
          motion:
            motion === "translate"
              ? { type: "translate", distanceMm: chosen.mm }
              : {
                  type: "rotate",
                  distanceRads: degreesToRadians(chosen.degrees),
                },
        })
      } finally {
        store.setCurrentIncrementJog(null)
        await store.deactivate()
      }
    })
  }

  /** The jog frame, read every animation frame by the gizmo */
  function jogFrame(): Quaternion {
    if (store.selectedOrientation === "tool") {
      const flange = session.state.rapidlyChangingMotionState.flange_pose
      const frame = flange
        ? Pose3.fromPose(flange).quaternion.clone()
        : new Quaternion()
      const tcp = store.selectedTcpId
        ? session.description.tcpOffsetsById[store.selectedTcpId]
        : undefined
      if (tcp?.pose.orientation) {
        frame.multiply(
          parseRotationToQuaternion(tcp.pose.orientation, "ROTATION_VECTOR"),
        )
      }
      return frame
    }
    const coordSystem = store.jogCoordSystem
    return parseRotationToQuaternion(
      coordSystem.orientation ?? [1, 0, 0, 0],
      coordSystem.orientation_type ?? "QUATERNION",
    )
  }

  /** What went wrong in a call the panel made, for the app to show */
  function report(error: unknown) {
    session.reportError({
      kind: "jog",
      message: error instanceof Error ? error.message : String(error),
      cause: error,
    })
  }

  // Move to: the pose typed in the panel is planned and staged as the
  // session's typed pose, so its rules apply
  const started = useRef(false)

  function onTargetChange(pose: RobotControlPose | null) {
    if (!pose) {
      void targetPose.resetToLive()
      return
    }
    targetPose.setDraft(
      `(${[...pose.position, ...pose.orientation].join(", ")})`,
    )
    void targetPose.confirmEdit()
  }

  function onMoveStart() {
    if (
      trajectory.trajectoryState === "planned" &&
      trajectory.plannedTrajectory
    ) {
      started.current = true
      trajectory.start()
    }
  }

  async function onMoveStop() {
    if (!started.current) return
    started.current = false
    // A release before NOVA confirmed the start: wait for it, then pause
    await when(() => trajectory.trajectoryState !== "planned", {
      timeout: 2000,
    }).catch(() => {})
    if (trajectory.trajectoryState === "moving") await trajectory.pause()
  }

  const staged = targetPose.staged

  return {
    disabled,
    // Jogging waits for a trajectory, and for another client's jogging
    jogDisabled: trajectoryBusy || store.blocked,
    // A linear axis or a turntable jogs its joints only
    cartesian: store.canJogCartesian,
    tab,
    onTabChange: changeTab,
    jogMode,
    onJogModeChange: (mode) =>
      store.setSelectedIncrementId(
        mode === "continuous"
          ? "continuous"
          : (lastIncrement.current?.id ?? "continuous"),
      ),
    gizmoOrientation,
    gizmoFrameQuaternion: jogFrame,
    tcp:
      store.tcps.length > 0
        ? {
            options: store.tcps.map((tcp) => ({ id: tcp.id, label: tcp.id })),
            value: store.selectedTcpId,
            onChange: (id) => {
              store.requestTcpChange(id).catch(report)
            },
          }
        : undefined,
    jogFrame: {
      options: [
        {
          id: SELECTED_TCP,
          label: t("Jogging.MoveRelativeTo.SelectedTcp.dd"),
        },
        ...store.coordSystems.map((cs) => ({
          id: COORD_SYSTEM + cs.coordinate_system,
          label: coordSystemLabel(store, cs),
        })),
      ],
      value:
        store.selectedOrientation === "tool"
          ? SELECTED_TCP
          : COORD_SYSTEM + store.jogCoordSystemId,
      onChange: (id) =>
        id === SELECTED_TCP
          ? store.setMoveRelativeToSelectedTcp()
          : store.setMoveRelativeToCoordSystem(id.slice(COORD_SYSTEM.length)),
    },
    velocity: {
      translate: {
        value: store.translationVelocityMmPerSec,
        min: store.minTranslationVelocityMmPerSec,
        max: store.maxTranslationVelocityMmPerSec,
      },
      rotate: {
        value: store.rotationVelocityRadsPerSec,
        min: degreesToRadians(store.minRotationVelocityDegPerSec),
        max: degreesToRadians(store.maxRotationVelocityDegPerSec),
      },
    },
    onVelocityChange: (motion, value) =>
      motion === "rotate"
        ? store.setVelocityFromSlider(toDegrees(value), true)
        : store.setVelocityFromSlider(value, false),
    onJogStart: (motion, axis, direction) => {
      startCartesian(motion, axis, direction).catch(report)
    },
    onJogStop: () => {
      stopJogging().catch(report)
    },
    increments: {
      steps: {
        translate: store.discreteIncrementOptions.map((o) => o.mm),
        rotate: store.discreteIncrementOptions.map((o) =>
          degreesToRadians(o.degrees),
        ),
      },
      onStep: (motion, axis, direction, distance) => {
        step(motion, axis, direction, distance).catch(report)
      },
      running: store.incrementJogInProgress,
      // The store's increments pair a distance with an angle
      step: increment && {
        translate: increment.mm,
        rotate: degreesToRadians(increment.degrees),
      },
      onStepChange: (motion, distance) => {
        const chosen = store.discreteIncrementOptions.find((option) =>
          motion === "translate"
            ? option.mm === distance
            : Math.abs(degreesToRadians(option.degrees) - distance) < 1e-9,
        )
        if (chosen) store.setSelectedIncrementId(chosen.id)
      },
    },
    joints: {
      joints: jointValues.map((value, index) => ({
        value,
        min: jointLimits?.[index]?.position?.lower_limit,
        max: jointLimits?.[index]?.position?.upper_limit,
        name:
          jointValues.length === SIX_AXIS_NAMES.length && !linear
            ? SIX_AXIS_NAMES[index]
            : undefined,
      })),
      linear,
      velocity: linear
        ? {
            value: store.translationVelocityMmPerSec,
            min: store.minTranslationVelocityMmPerSec,
            max: store.maxTranslationVelocityMmPerSec,
          }
        : {
            value: store.rotationVelocityRadsPerSec,
            min: degreesToRadians(store.minRotationVelocityDegPerSec),
            max: degreesToRadians(store.maxRotationVelocityDegPerSec),
          },
      onVelocityChange: (value) =>
        linear
          ? store.setVelocityFromSlider(value, false)
          : store.setVelocityFromSlider(toDegrees(value), true),
      onJogStart: (joint, direction) => {
        startJoint(joint, direction).catch(report)
      },
      onJogStop: () => {
        stopJogging().catch(report)
      },
    },
    moveTo: {
      getCurrentPose: () => {
        const pose = session.state.displayedTcpPose
        if (!pose?.position || !pose.orientation) return null
        return {
          position: pose.position as [number, number, number],
          orientation: pose.orientation as [number, number, number],
        }
      },
      // The typed pose is read in the coordinate system of the displayed pose
      frame: {
        options: store.coordSystems.map((cs) => ({
          id: cs.coordinate_system,
          label: coordSystemLabel(store, cs),
        })),
        value: store.selectedCoordSystemId,
        onChange: (id) => store.setSelectedCoordSystemId(id),
      },
      onTargetChange,
      // The trajectory's states are the panel's
      state: targetPose.confirming ? "planning" : trajectory.trajectoryState,
      error: staged?.errorKey ? t(staged.errorKey) : null,
      onMoveStart,
      onMoveStop: () => {
        onMoveStop().catch(report)
      },
    },
  }
}
