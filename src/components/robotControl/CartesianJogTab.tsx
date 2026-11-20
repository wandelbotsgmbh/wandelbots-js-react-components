import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import type { JogAxis, JogDirection } from "../jogging/jogHandle"
import { JogArea, type JogView } from "./JogArea"
import { type JogMode, JogModeToggle } from "./JogModeToggle"
import { InlineSelect, PanelSelect } from "./PanelSelect"
import type { JogMotion, RobotControlPanelProps } from "./RobotControlPanel"
import { Section } from "./Section"
import { formatStep } from "./units"
import { VelocityRow } from "./VelocityRow"

/** The panel's settings of a jog tab, kept while the tabs change */
export type CartesianJogSettings = {
  mode: JogMode
  view: JogView
  /** The chosen step size of each motion, as an index into its steps */
  step: Record<JogMotion, number>
}

type CartesianJogTabProps = Omit<
  RobotControlPanelProps,
  "onClose" | "joints"
> & {
  motion: JogMotion
  settings: CartesianJogSettings
  onSettingsChange: (settings: CartesianJogSettings) => void
}

/**
 * The Translate and Rotate tabs: the TCP and the frame to jog along, the
 * jog mode, velocity and step size, and the gizmo or the buttons
 */
export function CartesianJogTab({
  motion,
  settings,
  onSettingsChange,
  disabled = false,
  tcp,
  jogFrame,
  velocity,
  onVelocityChange,
  onJogStart,
  onJogStop,
  increments,
  gizmoOrientation,
  gizmoFrameQuaternion,
}: CartesianJogTabProps) {
  const { t } = useTranslation()
  const mode: JogMode = increments ? settings.mode : "continuous"
  const steps = increments?.steps[motion] ?? []
  const stepIndex = Math.min(settings.step[motion], steps.length - 1)
  const step = steps[stepIndex]

  // A press in Continuous mode jogs until its release. The release must
  // stop it whatever the mode is by then, and only then: a step needs none.
  const jogging = useRef(false)

  function start(axis: JogAxis, direction: JogDirection) {
    if (mode === "increment") {
      if (increments && step !== undefined) {
        increments.onStep(motion, axis, direction, step)
      }
      return
    }
    jogging.current = true
    onJogStart(motion, axis, direction)
  }

  function stop() {
    if (!jogging.current) return
    jogging.current = false
    onJogStop()
  }

  return (
    <>
      {(tcp || jogFrame) && (
        <>
          <Section>
            <Stack direction="row" sx={{ gap: "12px" }}>
              {tcp && (
                <PanelSelect
                  label={t("RobotControl.Tcp.lb")}
                  {...tcp}
                  disabled={disabled}
                />
              )}
              {jogFrame && (
                <PanelSelect
                  label={t("RobotControl.JogFrame.lb")}
                  {...jogFrame}
                  disabled={disabled}
                />
              )}
            </Stack>
          </Section>
          <Divider sx={{ marginX: "20px" }} />
        </>
      )}

      <Section>
        {increments && (
          <JogModeToggle
            value={mode}
            onChange={(next) => onSettingsChange({ ...settings, mode: next })}
            disabled={disabled}
          />
        )}
        <VelocityRow
          motion={motion}
          velocity={velocity[motion]}
          onChange={(value) => onVelocityChange(motion, value)}
          disabled={disabled}
        />
        {mode === "increment" && step !== undefined && (
          <InlineSelect
            label={t("RobotControl.StepSize.lb")}
            value={String(stepIndex)}
            options={steps.map((distance, index) => ({
              id: String(index),
              label: formatStep(motion, distance),
            }))}
            onChange={(id) =>
              onSettingsChange({
                ...settings,
                step: { ...settings.step, [motion]: Number(id) },
              })
            }
            disabled={disabled}
          />
        )}
      </Section>
      <Divider sx={{ marginX: "20px" }} />

      <Section>
        <JogArea
          // A new mode takes new controls: the held one of the old mode
          // ends, and stops its jog
          key={mode}
          view={settings.view}
          onViewChange={(view) => onSettingsChange({ ...settings, view })}
          mode={mode}
          controls={{
            motion,
            onJogStart: start,
            onJogStop: stop,
            activeHandle: mode === "increment" ? increments?.running : null,
            disabled,
          }}
          gizmoOrientation={gizmoOrientation}
          gizmoFrameQuaternion={gizmoFrameQuaternion}
        />
      </Section>
    </>
  )
}
