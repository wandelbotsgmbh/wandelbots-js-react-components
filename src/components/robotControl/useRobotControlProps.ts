import { degreesToRadians, radiansToDegrees } from "@wandelbots/nova-js"
import { JointTypeEnum } from "@wandelbots/nova-js/v2"
import type { TFunction } from "i18next"
import { reaction, runInAction } from "mobx"
import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Quaternion } from "three"
import { i18n } from "../../i18n/config"
import { Pose3 } from "../../lib/Pose3"
import type { RobotNotMoveableReason } from "../../lib/robotSession/RobotSafety"
import type { RobotSession } from "../../lib/robotSession/RobotSession"
import { type RobotPose, sameRobotPose } from "../../lib/robotSession/robotPose"
import { parseRotationToQuaternion } from "../../lib/rotation"
import { coordSystemLabel } from "../jogging/coordSystemLabel"
import { JoggingRefusedError } from "../jogging/JoggingRefusedError"
import type { JoggingStore } from "../jogging/JoggingStore"
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

/**
 * The joints of a six-axis robot arm, as the design names them, in the
 * user's language
 */
function sixAxisNames(t: TFunction) {
  return [
    t("RobotControl.Joint.Base.lb"),
    t("RobotControl.Joint.Shoulder.lb"),
    t("RobotControl.Joint.Elbow.lb"),
    t("RobotControl.Joint.Forearm.lb"),
    t("RobotControl.Joint.Wrist.lb"),
    t("RobotControl.Joint.Flange.lb"),
  ]
}

// The selected TCP and the coordinate systems in one select
const SELECTED_TCP = "selected-tcp"
const COORD_SYSTEM = "coordinate-system:"

/** A shown velocity in °/s, without the float noise of the conversion */
const toDegrees = (radians: number) =>
  Math.round(radiansToDegrees(radians) * 1e6) / 1e6

/**
 * A pose of Move to as the session's: of the TCP and in the frame that the
 * panel shows, which are the jogging store's selected ones
 */
function robotPoseOf(session: RobotSession, pose: RobotControlPose): RobotPose {
  return {
    type: "cartesian",
    motionGroupId: session.motionGroupId,
    tcpPose: {
      pose,
      coordSystemId: session.jogging.selectedCoordSystemId,
      tcpId: session.jogging.selectedTcpId,
    },
  }
}

/** Plans a pose of Move to as the session's typed pose */
function planTarget(session: RobotSession, pose: RobotControlPose) {
  void session.targetPose.plan(robotPoseOf(session, pose))
}

/** Why the robot may not move, in the library's words */
function notMoveableText(reason: RobotNotMoveableReason, t: TFunction) {
  switch (reason.code) {
    case "disconnected":
      return t("RobotControl.MoveTo.NotMoveable.Disconnected.lb")
    case "safety_state":
      return t("RobotControl.MoveTo.NotMoveable.SafetyState.lb", {
        value: reason.value,
      })
    case "operation_mode":
      return t("RobotControl.MoveTo.NotMoveable.OperationMode.lb", {
        value: reason.value,
      })
    case "deactivated":
      return t("RobotControl.MoveTo.NotMoveable.Deactivated.lb")
  }
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
 * Jogging is off (`jogDisabled`) while the robot may not move
 * (`session.safety.canBeMoved`): not activated or still activating, stopped
 * by its safety, or without its live state. Also while a trajectory moves
 * the robot and while another client jogs it. `jogDisabledReason` says
 * which it is, in the library's words (English or German), and after
 * another client's jogging `onJogRetry` lets the user try again. `disabled`
 * is only the app's lock, for which the hook has no reason to give.
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
  // Only a six-axis arm has joints of these names
  const jointNames =
    jointValues.length === 6 && !linear ? sixAxisNames(t) : undefined

  // Jogging waits while a trajectory moves the robot (jogDisabled); Move to
  // stays usable, so its own move goes on
  const trajectoryBusy =
    trajectory.trajectoryState === "moving" ||
    trajectory.trajectoryState === "stopping"
  // Jogging is off while the robot may not move: not activated or still
  // activating, stopped by its safety, without its live state. The store
  // would refuse the jog; the panel shows it.
  const moveable = session.safety.canBeMoved
  const locked = disabled || trajectoryBusy || !moveable
  // What turns jogging off, the robot's own reason first: the jog tabs say
  // it. The app's lock is not among them: the app knows why it locks.
  const jogOff = !moveable
    ? "robot"
    : trajectoryBusy
      ? "trajectory"
      : store.blocked
        ? "blocked"
        : null
  const jogOffText = {
    // A robot that is activating or deactivating has no reason of its own
    // (see RobotSession): it is not activated yet, or no longer
    robot: () =>
      notMoveableText(
        session.safety.notMoveableReason ?? { code: "deactivated" },
        t,
      ),
    trajectory: () => t("RobotControl.JogDisabled.Moving.lb"),
    // NOVA gave the jogging connection to another client
    blocked: () => t("Jogging.Blocked.lb"),
  }
  useEffect(() => {
    if (!locked) return
    store.lock("external")
    // Also when the panel goes away: the session and its store live on
    return () => store.unlock("external")
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

  /**
   * The store's increment of a step size of the panel: mm to translate, rad
   * to rotate
   */
  function incrementOf(motion: JogMotion, distance: number) {
    return store.discreteIncrementOptions.find((option) =>
      motion === "translate"
        ? Math.abs(option.mm - distance) < 1e-9
        : Math.abs(degreesToRadians(option.degrees) - distance) < 1e-9,
    )
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
    // As the jogger turns the axes it jogs along: a coordinate system
    // without an orientation is not turned (a quaternion of NOVA is x, y, z,
    // w, so a fallback of [1, 0, 0, 0] was a half turn about X: the Y and Z
    // handles pointed the wrong way)
    return Pose3.fromCoordinateSystem(store.jogCoordSystem).quaternion
  }

  /** What went wrong in a call the panel made, for the app to show */
  function report(error: unknown) {
    session.reportError({
      kind: "jog",
      message: error instanceof Error ? error.message : String(error),
      cause: error,
    })
  }

  /**
   * Follows a jog that the store runs. One it refuses moves nothing and is
   * no error to show: the panel shows jogging as off for the same reason.
   */
  function jog(running: Promise<void>) {
    running.catch((error: unknown) => {
      if (!(error instanceof JoggingRefusedError)) report(error)
    })
  }

  // Move to: the pose typed in the panel is planned and staged as the
  // session's typed pose, so its rules apply
  // The panel's target, while it has one. The session plans nothing while
  // the robot may not move: the panel says why, and plans it once it may.
  const [target, setTarget] = useState<RobotControlPose | null>(null)
  const targetRef = useRef(target)
  targetRef.current = target

  function onTargetChange(pose: RobotControlPose | null) {
    setTarget(pose)
    if (!pose) {
      void targetPose.resetToLive()
      return
    }
    planTarget(session, pose)
  }

  useEffect(
    () =>
      // Once the robot can move: while it is activating, there is no reason
      // not to, but an app may still lock it, and the session plans nothing
      reaction(
        () => session.safety.canBeMoved,
        (moveable) => {
          const pose = targetRef.current
          const { staged, confirming } = session.targetPose
          if (moveable && pose && !staged && !confirming) {
            planTarget(session, pose)
          }
        },
      ),
    [session],
  )

  const notMoveable = session.safety.notMoveableReason

  const staged = targetPose.staged
  // The trajectory is the one of the panel's target only while the session
  // has that pose staged: another flow may have planned its own since
  // (RobotPad: a saved pose), or this one is not planned yet
  const targetIsStaged =
    target !== null &&
    targetPose.stagedPose !== null &&
    sameRobotPose(targetPose.stagedPose, robotPoseOf(session, target))

  return {
    disabled,
    // Jogging waits for a trajectory, for another client's jogging, and for
    // a robot that may move
    jogDisabled: jogOff !== null,
    jogDisabledReason: jogOff ? jogOffText[jogOff]() : undefined,
    // The store stays blocked until it is told to try again: the next jog
    // asks NOVA for the jogging connection anew
    onJogRetry: jogOff === "blocked" ? () => store.unblock() : undefined,
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
    // The store jogs: it makes a press that ends before the jogging
    // connection is ready move nothing, and runs one step at a time
    onJogStart: (motion, axis, direction) =>
      jog(store.startCartesianJogging(motion, axis, direction)),
    onJogStop: () => jog(store.stopJogging()),
    increments: {
      steps: {
        translate: store.discreteIncrementOptions.map((o) => o.mm),
        rotate: store.discreteIncrementOptions.map((o) =>
          degreesToRadians(o.degrees),
        ),
      },
      onStep: (motion, axis, direction, distance) => {
        const increment = incrementOf(motion, distance)
        if (!increment) return
        jog(
          store.runIncrementalCartesianJog(motion, axis, direction, increment),
        )
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
        name: jointNames?.[index],
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
      onJogStart: (joint, direction) =>
        jog(store.startJointJogging(joint, direction)),
      onJogStop: () => jog(store.stopJogging()),
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
      // The trajectory's states are the panel's, while it is the target's
      state: targetPose.confirming
        ? "planning"
        : targetIsStaged
          ? trajectory.trajectoryState
          : "idle",
      error:
        target && notMoveable
          ? notMoveableText(notMoveable, t)
          : staged?.errorKey
            ? t(staged.errorKey, {
                // NOVA's reason for a failed move, as it is: React escapes it
                message: staged.errorMessage,
                interpolation: { escapeValue: false },
              })
            : null,
      // The button is held and let go: the session sees to it that the
      // robot moves only while it is held, and only to the pose it shows
      onMoveStart: (pose) => {
        targetPose.holdMove(robotPoseOf(session, pose))
      },
      onMoveStop: () => {
        targetPose.releaseMove().catch(report)
      },
    },
  }
}
