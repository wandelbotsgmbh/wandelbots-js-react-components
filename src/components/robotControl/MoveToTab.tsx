import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { Undo } from "@wandelbots/icons/Undo"
import { RoundedIconButton } from "@wandelbots/mui"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { isAtPose } from "./atPose"
import { HoldToMoveButton } from "./HoldToMoveButton"
import { PanelSelect } from "./PanelSelect"
import { PoseField } from "./PoseField"
import { parsePoseText, poseToText } from "./poseText"
import type {
  RobotControlMoveTo,
  RobotControlPose,
  RobotControlSelect,
  RobotControlVelocity,
} from "./RobotControlPanel"
import { Section } from "./Section"
import { useEveryFrame } from "./useEveryFrame"
import { VelocityRow } from "./VelocityRow"

type MoveToTabProps = {
  moveTo: RobotControlMoveTo
  tcp?: RobotControlSelect
  velocity: RobotControlVelocity
  onVelocityChange: (value: number) => void
  disabled: boolean
}

type Target = { pose: RobotControlPose; text: string }

/**
 * The Move to tab: the TCP, the target pose and the frame it is relative to,
 * the velocity, and the Move to button, off until a typed pose is the
 * target; Reset shows with a target. It works as RobotPad's pose field and its TargetPoseStore: the
 * field shows the TCP's current pose until a typed pose is saved; a move
 * that took the TCP there ends with the current pose shown again, once the
 * button is let go; another tab shows it again as well.
 */
export function MoveToTab({
  moveTo,
  tcp,
  velocity,
  onVelocityChange,
  disabled,
}: MoveToTabProps) {
  const { t } = useTranslation()
  const [target, setTarget] = useState<Target | null>(null)
  // The text while editing, else null
  const [draft, setDraft] = useState<string | null>(null)
  const live = useEveryFrame(
    () => {
      const current = moveTo.getCurrentPose()
      return current ? poseToText(current) : ""
    },
    target === null && draft === null,
  )
  const shown = target?.text ?? live
  const editing = draft !== null
  const draftPose = draft === null ? null : parsePoseText(draft)
  // A target the app could plan, as RobotPad's staged pose. Not while
  // another pose is typed: the button would move to a pose not shown.
  const ready = target !== null && !moveTo.error && !editing
  const atPose =
    useEveryFrame(
      () => target !== null && isAtPose(moveTo.getCurrentPose(), target.pose),
      ready,
    ) && ready

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
    if (draftPose === null || disabled) return
    moveStarted.current = false
    setTarget({ pose: draftPose, text: poseToText(draftPose) })
    setDraft(null)
    moveTo.onTargetChange(draftPose)
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
  // the target a different pose
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

  const error =
    draft !== null
      ? draftPose === null
        ? t("RobotControl.MoveTo.InvalidPose.lb")
        : null
      : target
        ? (moveTo.error ?? null)
        : null

  return (
    <Section>
      {tcp && (
        <PanelSelect
          label={t("RobotControl.Tcp.lb")}
          {...tcp}
          disabled={disabled}
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
          text={draft ?? shown}
          editing={editing}
          onEdit={() => {
            if (!disabled) setDraft(shown)
          }}
          onDraftChange={setDraft}
          onCancel={() => setDraft(null)}
          onConfirm={confirm}
          canConfirm={
            draftPose !== null && !disabled && moveTo.state !== "planning"
          }
          error={error}
          disabled={disabled}
        />
      </Stack>

      <VelocityRow
        motion="translate"
        velocity={velocity}
        onChange={onVelocityChange}
        disabled={disabled}
      />

      {/* Move to stays, off without a target; Reset shows with one, as
          RobotPad's, not while another pose is typed */}
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
        <HoldToMoveButton
          state={target ? moveTo.state : "idle"}
          ready={ready}
          atPose={atPose}
          disabled={disabled}
          onMoveStart={() => {
            if (target) moveTo.onMoveStart(target.pose)
          }}
          onMoveStop={moveTo.onMoveStop}
          stopRef={stopHold}
        />
      </Stack>
    </Section>
  )
}
