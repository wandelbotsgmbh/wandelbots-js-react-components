import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { CachedFilled } from "@wandelbots/icons/CachedFilled"
import { Undo } from "@wandelbots/icons/Undo"
import { RoundedIconButton } from "@wandelbots/mui"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { isAtJoints, isAtPose } from "./atPose"
import { HoldToMoveButton } from "./HoldToMoveButton"
import { PanelSelect } from "./PanelSelect"
import { PoseField } from "./PoseField"
import { jointsToText, parseTargetText, poseToText } from "./poseText"
import type {
  RobotControlJointTarget,
  RobotControlMoveTo,
  RobotControlSelect,
  RobotControlTarget,
  RobotControlVelocity,
} from "./RobotControlPanel"
import { Section } from "./Section"
import { useEveryFrame } from "./useEveryFrame"
import { VelocityRow } from "./VelocityRow"

type MoveToTabProps = {
  moveTo: RobotControlMoveTo
  tcp?: RobotControlSelect
  /** The robot takes poses of the TCP: else it moves to joint values only */
  cartesian: boolean
  /** The joints are linear axes, in mm and mm/s */
  linear: boolean
  /** The velocity of a move to a pose of the TCP, in mm/s */
  velocity: RobotControlVelocity
  onVelocityChange: (value: number) => void
  /** The velocity of a move to joint values: rad/s, or mm/s for linear axes */
  jointVelocity: {
    velocity: RobotControlVelocity
    onChange: (value: number) => void
  }
  disabled: boolean
  /**
   * Turns off the TCP select: its change needs the jogging connection, as
   * on the jog tabs (`jogDisabled` of the panel)
   */
  jogDisabled: boolean
}

type Target = { target: RobotControlTarget; text: string }

const isJointTarget = (
  target: RobotControlTarget,
): target is RobotControlJointTarget => "joints" in target

/**
 * The Move to tab: the TCP, the target and the frame it is relative to,
 * the velocity, and the Move to button, off until what was typed is the
 * target; Reset shows with a target, and Plan again while the app gives an
 * `error` for it (it could not be planned, or the move to it failed). It
 * works as RobotPad's pose field and its TargetPoseStore: the
 * field shows the TCP's current pose until a typed pose is saved; a move
 * that took the TCP there ends with the current pose shown again, once the
 * button is let go; another tab shows it again as well.
 *
 * The target is a pose of the TCP, or joint values in square brackets,
 * which RobotPad's field took on its Joint tab. A robot that takes no TCP
 * poses (`cartesian` is false) shows its joints and moves to joint values
 * only. The velocity is the one of the move to the target: the joint
 * velocity for joint values.
 */
export function MoveToTab({
  moveTo,
  tcp,
  cartesian,
  linear,
  velocity,
  onVelocityChange,
  jointVelocity,
  disabled,
  jogDisabled,
}: MoveToTabProps) {
  const { t } = useTranslation()
  const [target, setTarget] = useState<Target | null>(null)
  // The text while editing, else null
  const [draft, setDraft] = useState<string | null>(null)
  const live = useEveryFrame(
    () => {
      if (!cartesian) {
        const joints = moveTo.getCurrentJoints?.()
        return joints ? jointsToText(joints) : ""
      }
      const current = moveTo.getCurrentPose()
      return current ? poseToText(current) : ""
    },
    target === null && draft === null,
  )
  const shown = target?.text ?? live
  const editing = draft !== null
  const draftTarget =
    draft === null
      ? null
      : parseTargetText(draft, {
          poses: cartesian,
          jointCount: moveTo.getCurrentJoints?.()?.length ?? null,
        })
  // Why the robot cannot move to the target: it may not move at all, or
  // the app's reason for this target
  const targetError = moveTo.notMoveableReason || moveTo.error || null
  // A target the app could plan, as RobotPad's staged pose. Not while
  // another pose is typed: the button would move to a pose not shown.
  const ready = target !== null && !targetError && !editing
  const atPose =
    useEveryFrame(
      () =>
        target !== null &&
        (isJointTarget(target.target)
          ? isAtJoints(
              moveTo.getCurrentJoints?.() ?? null,
              target.target.joints,
            )
          : isAtPose(moveTo.getCurrentPose(), target.target)),
      ready,
    ) && ready
  // The move that the velocity is of: to the target, else to what the
  // field shows and takes without brackets
  const movesJoints = target ? isJointTarget(target.target) : !cartesian

  // The app planned the target, or was about to, and has no plan now: it
  // dropped it, e.g. for another move (RobotPad: a saved pose takes the
  // trajectory). The tab keeps its target, so it says so and offers to
  // plan it again. Not at the target: a move that got there needs no plan.
  const planSeen = useRef(false)
  if (target === null) planSeen.current = false
  else if (moveTo.state !== "idle") planSeen.current = true
  const planDropped =
    ready && planSeen.current && moveTo.state === "idle" && !atPose

  // The move to the target has run: arriving there ends it
  const moveStarted = useRef(false)
  // Ends a held move: before the target goes, so the app pauses the move
  // while it still has it
  const stopHold = useRef<(() => void) | null>(null)

  function showLivePose() {
    stopHold.current?.()
    moveStarted.current = false
    setTarget(null)
    setDraft(null)
    moveTo.onTargetChange(null)
  }

  function confirm() {
    if (draftTarget === null || disabled) return
    moveStarted.current = false
    // The plan of this target is yet to come
    planSeen.current = false
    setTarget({
      target: draftTarget,
      text: isJointTarget(draftTarget)
        ? jointsToText(draftTarget.joints)
        : poseToText(draftTarget),
    })
    setDraft(null)
    moveTo.onTargetChange(draftTarget)
  }

  // The way out of a move that failed, or a target the app could not plan
  // when it was saved: the app plans the target that still shows
  function planAgain() {
    if (target) moveTo.onTargetChange(target.target)
  }

  // As RobotPad: a move that took the TCP to the target is over once it no
  // longer runs. Let go at the target, the move pauses a hair before its
  // end, so the TCP standing there is the signal.
  // biome-ignore lint/correctness/useExhaustiveDependencies: on these changes only
  useEffect(() => {
    if (!ready) return
    if (moveTo.state === "moving") {
      moveStarted.current = true
      return
    }
    if (moveStarted.current && atPose && moveTo.state !== "stopping") {
      showLivePose()
    }
  }, [ready, moveTo.state, atPose])

  // The typed pose is relative to the TCP and the frame: another one makes
  // the target a different pose. Joint values go as well: the field shows
  // one thing after such a change, the live pose.
  const frameKey = [tcp?.value, moveTo.frame?.value].join("\u0000")
  // biome-ignore lint/correctness/useExhaustiveDependencies: on a new TCP or frame only
  useEffect(() => {
    if (target) showLivePose()
  }, [frameKey])

  // Another tab: the plan is of no use there
  const latest = useRef({ target, onTargetChange: moveTo.onTargetChange })
  latest.current = { target, onTargetChange: moveTo.onTargetChange }
  useEffect(
    () => () => {
      // This cleanup runs before the button's: end its hold first
      stopHold.current?.()
      if (latest.current.target) latest.current.onTargetChange(null)
    },
    [],
  )

  // While a pose is typed: what is wrong with the text, else why the
  // robot may not move, which no typing changes. The reason for the target
  // that was saved before is not one for the pose typed now.
  const error =
    draft !== null
      ? draftTarget === null
        ? t("RobotControl.MoveTo.InvalidPose.lb")
        : moveTo.notMoveableReason || null
      : target
        ? (targetError ??
          (planDropped ? t("RobotControl.MoveTo.PlanDropped.lb") : null))
        : null

  return (
    <Section>
      {tcp && (
        <PanelSelect
          label={t("RobotControl.Tcp.lb")}
          {...tcp}
          disabled={disabled || jogDisabled}
        />
      )}

      <Typography variant="body1" color="text.primary">
        {t("RobotControl.MoveTo.TargetPose.lb")}
      </Typography>

      <Stack sx={{ gap: "8px" }}>
        {moveTo.frame && (
          <PanelSelect
            label={t("RobotControl.MoveTo.RelativeTo.lb")}
            {...moveTo.frame}
            disabled={disabled}
          />
        )}
        <PoseField
          label={
            cartesian
              ? t("RobotControl.MoveTo.Coordinates.lb")
              : t("RobotControl.MoveTo.JointPositions.lb", {
                  unit: linear ? "mm" : "rad",
                })
          }
          text={draft ?? shown}
          editing={editing}
          onEdit={() => {
            if (!disabled) setDraft(shown)
          }}
          onDraftChange={setDraft}
          onCancel={() => setDraft(null)}
          onConfirm={confirm}
          canConfirm={
            draftTarget !== null && !disabled && moveTo.state !== "planning"
          }
          error={error}
          disabled={disabled}
        />
      </Stack>

      <VelocityRow
        // Joints show as a rotation (°/s), linear axes and the TCP as a
        // translation (mm/s)
        motion={movesJoints && !linear ? "rotate" : "translate"}
        velocity={movesJoints ? jointVelocity.velocity : velocity}
        onChange={movesJoints ? jointVelocity.onChange : onVelocityChange}
        disabled={disabled}
      />

      {/* Move to stays, off without a target; Reset shows with one, as
          RobotPad's, not while another pose is typed; Plan again with a
          target the app cannot move to, or whose plan it dropped, so it
          need not be typed again */}
      <Stack direction="row" sx={{ gap: "12px", alignItems: "center" }}>
        {target && !editing && (
          <Tooltip title={t("RobotControl.MoveTo.Reset.lb")} placement="top">
            <span>
              <RoundedIconButton
                icon={<Undo />}
                ariaLabel={t("RobotControl.MoveTo.Reset.lb")}
                onClick={showLivePose}
              />
            </span>
          </Tooltip>
        )}
        {target && !editing && (targetError || planDropped) && (
          <Tooltip
            title={t("RobotControl.MoveTo.PlanAgain.lb")}
            placement="top"
          >
            <span>
              <RoundedIconButton
                icon={<CachedFilled />}
                ariaLabel={t("RobotControl.MoveTo.PlanAgain.lb")}
                onClick={planAgain}
                disabled={disabled || moveTo.state === "planning"}
              />
            </span>
          </Tooltip>
        )}
        <HoldToMoveButton
          state={target ? moveTo.state : "idle"}
          ready={ready}
          atPose={atPose}
          disabled={disabled}
          onMoveStart={() => {
            if (target) moveTo.onMoveStart(target.target)
          }}
          onMoveStop={moveTo.onMoveStop}
          stopRef={stopHold}
        />
      </Stack>
    </Section>
  )
}
