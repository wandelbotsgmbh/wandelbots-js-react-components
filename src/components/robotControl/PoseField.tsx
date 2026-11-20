import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import { CheckFilled } from "@wandelbots/icons/CheckFilled"
import { CloseFilled } from "@wandelbots/icons/CloseFilled"
import { ContentCopyFilled } from "@wandelbots/icons/ContentCopyFilled"
import { EditFilled } from "@wandelbots/icons/EditFilled"
import { AdornedTextField, RoundedIconButton } from "@wandelbots/mui"
import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useCopyText } from "./useCopyText"

type PoseFieldProps = {
  /** The text shown: the draft while editing, else the target or the live pose */
  text: string
  editing: boolean
  onEdit: () => void
  onDraftChange: (text: string) => void
  onCancel: () => void
  onConfirm: () => void
  /** Whether the draft can be saved now */
  canConfirm: boolean
  error: string | null
  /** No editing: the robot may not move */
  disabled: boolean
}

/**
 * The coordinates field of the Move to tab, as RobotPad's EditablePoseField:
 * it shows a pose to copy; Edit pose, or a click on it, makes it editable;
 * Save pose edit (Enter) and Cancel (Escape) end the editing
 */
export function PoseField({
  text,
  editing,
  onEdit,
  onDraftChange,
  onCancel,
  onConfirm,
  canConfirm,
  error,
  disabled,
}: PoseFieldProps) {
  const { t } = useTranslation()
  const input = useRef<HTMLInputElement>(null)
  const { copied, copy: copyText } = useCopyText()

  // Editing puts the caret at the end; saved or cancelled, the field shows
  // the pose from its start again, as RobotPad's
  useEffect(() => {
    const field = input.current
    if (!field) return
    if (editing) {
      field.focus()
      field.setSelectionRange(field.value.length, field.value.length)
    } else if (document.activeElement === field) {
      field.blur()
      field.scrollLeft = 0
    }
  }, [editing])

  function copy() {
    return copyText(text, () => input.current?.select())
  }

  return (
    <Stack direction="row" sx={{ gap: "8px", alignItems: "flex-start" }}>
      <AdornedTextField
        label={t("RobotControl.MoveTo.Coordinates.lb")}
        value={text}
        inputRef={input}
        onChange={(event) => onDraftChange(event.target.value)}
        onClick={() => {
          if (!editing && !disabled) onEdit()
        }}
        onKeyDown={(event) => {
          if (!editing) return
          if (event.key === "Enter" && canConfirm) onConfirm()
          else if (event.key === "Escape") onCancel()
        }}
        error={!!error}
        helperText={error ?? undefined}
        fullWidth
        autoComplete="off"
        slotProps={{
          htmlInput: { readOnly: !editing, spellCheck: false },
        }}
        sx={{
          "& input": {
            fontVariantNumeric: "tabular-nums",
            cursor: editing || disabled ? undefined : "text",
          },
        }}
      />
      {/* The buttons sit beside the field's box, not beside its error */}
      <Stack
        direction="row"
        sx={{ gap: "8px", height: "56px", alignItems: "center" }}
      >
        {editing ? (
          <>
            <RoundedIconButton
              icon={<CloseFilled />}
              ariaLabel={t("RobotControl.MoveTo.Cancel.bt")}
              onClick={onCancel}
            />
            <Tooltip
              title={t("RobotControl.MoveTo.ConfirmEdit.lb")}
              placement="left"
            >
              <span>
                <RoundedIconButton
                  icon={<CheckFilled />}
                  ariaLabel={t("RobotControl.MoveTo.ConfirmEdit.lb")}
                  onClick={onConfirm}
                  disabled={!canConfirm}
                  sx={{ color: "primary.main" }}
                />
              </span>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              title={t("RobotControl.MoveTo.Copied.lb")}
              open={copied}
              disableHoverListener
              placement="left"
            >
              <RoundedIconButton
                icon={copied ? <CheckFilled /> : <ContentCopyFilled />}
                ariaLabel={t("RobotControl.MoveTo.Copy.bt")}
                onClick={() => void copy()}
              />
            </Tooltip>
            <RoundedIconButton
              icon={<EditFilled />}
              ariaLabel={t("RobotControl.MoveTo.Edit.bt")}
              onClick={onEdit}
              disabled={disabled}
            />
          </>
        )}
      </Stack>
    </Stack>
  )
}
