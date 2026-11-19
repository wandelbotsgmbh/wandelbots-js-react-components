import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Pose } from "@wandelbots/icons/Pose"
import { AdornedTextField, SecondaryButton } from "@wandelbots/mui"
import { useTranslation } from "react-i18next"
import { HoldToMoveButton } from "./HoldToMoveButton"
import { PanelSelect } from "./PanelSelect"
import { parsePoseText, poseToText } from "./poseText"
import type {
  RobotControlMoveTo,
  RobotControlSelect,
  RobotControlVelocity,
} from "./RobotControlPanel"
import { Section } from "./Section"
import { VelocityRow } from "./VelocityRow"

type MoveToTabProps = {
  moveTo: RobotControlMoveTo
  /** The typed coordinates, kept by the panel while other tabs show */
  text: string
  onTextChange: (text: string) => void
  tcp?: RobotControlSelect
  velocity: RobotControlVelocity
  onVelocityChange: (value: number) => void
  disabled: boolean
}

/**
 * The Move to tab: the TCP, the target pose (typed, or the current pose) and
 * the frame it is relative to, the velocity, and a button to hold to move
 * there. The app plans the move when the pose changes (`onTargetChange`),
 * so the button can start it at once.
 */
export function MoveToTab({
  moveTo,
  text,
  onTextChange,
  tcp,
  velocity,
  onVelocityChange,
  disabled,
}: MoveToTabProps) {
  const { t } = useTranslation()
  const pose = parsePoseText(text)
  const invalid = text.trim() !== "" && pose === null
  const message = invalid
    ? t("RobotControl.MoveTo.InvalidPose.lb")
    : (moveTo.error ?? undefined)

  function edit(next: string) {
    onTextChange(next)
    moveTo.onTargetChange(parsePoseText(next))
  }

  function fillInCurrentPose() {
    const current = moveTo.getCurrentPose()
    if (current) edit(poseToText(current))
  }

  return (
    <Section>
      {tcp && (
        <PanelSelect
          label={t("RobotControl.Tcp.lb")}
          {...tcp}
          disabled={disabled}
        />
      )}

      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}
      >
        <Typography variant="body1" color="text.primary">
          {t("RobotControl.MoveTo.TargetPose.lb")}
        </Typography>
        <SecondaryButton
          startIcon={<Pose />}
          onClick={fillInCurrentPose}
          disabled={disabled}
        >
          {t("RobotControl.MoveTo.UseCurrentPose.bt")}
        </SecondaryButton>
      </Stack>

      <Stack sx={{ gap: "8px" }}>
        {moveTo.frame && (
          <PanelSelect
            label={t("RobotControl.MoveTo.RelativeTo.lb")}
            {...moveTo.frame}
            disabled={disabled}
          />
        )}
        <AdornedTextField
          label={t("RobotControl.MoveTo.Coordinates.lb")}
          value={text}
          onChange={(event) => edit(event.target.value)}
          disabled={disabled}
          error={!!message}
          helperText={message}
          fullWidth
          autoComplete="off"
          slotProps={{ htmlInput: { spellCheck: false } }}
          sx={{ "& input": { fontVariantNumeric: "tabular-nums" } }}
        />
      </Stack>

      <VelocityRow
        motion="translate"
        velocity={velocity}
        onChange={onVelocityChange}
        disabled={disabled}
      />

      <HoldToMoveButton
        onMoveStart={() => {
          if (pose) moveTo.onMoveStart(pose)
        }}
        onMoveStop={moveTo.onMoveStop}
        disabled={disabled || pose === null || !!moveTo.error}
        disabledReason={
          moveTo.error ??
          (pose ? undefined : t("RobotControl.MoveTo.EnterPose.lb"))
        }
        loading={moveTo.planning ?? false}
      />
    </Section>
  )
}
