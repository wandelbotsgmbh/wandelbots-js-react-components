import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import { type ReactNode, useRef, useState } from "react"
import type { JogDirection } from "../jogging/jogHandle"
import { JoggingJointSlider } from "../jogging/joint/JoggingJointSlider"
import type { RobotControlJoints } from "./RobotControlPanel"
import { Section } from "./Section"
import { VelocityRow } from "./VelocityRow"

/**
 * The Joint tab: a slider per joint across its limits, and the velocity.
 * One joint jogs at a time: the jogging joint is kept in a ref, which
 * changes at once, so a second finger on another slider in the same frame
 * jogs nothing; the other sliders show as unavailable meanwhile. Under the
 * sliders it says why jogging is off, when the app gives a reason.
 */
export function JointJogTab({
  joints,
  disabled,
  disabledReason,
}: {
  joints: RobotControlJoints
  disabled: boolean
  /** Why jogging is off, as the panel shows it */
  disabledReason?: ReactNode
}) {
  const jogging = useRef<number | null>(null)
  const [active, setActive] = useState<number | null>(null)

  function start(index: number, direction: JogDirection) {
    if (jogging.current !== null && jogging.current !== index) return
    jogging.current = index
    setActive(index)
    joints.onJogStart(index, direction)
  }

  function stop(index: number) {
    if (jogging.current !== index) return
    jogging.current = null
    setActive(null)
    joints.onJogStop()
  }

  return (
    <>
      <Section>
        {/* Inset as in the design: room for a thumb at a limit */}
        <Stack sx={{ gap: "8px", paddingX: "4px" }}>
          {joints.joints.map((joint, index) => (
            <JoggingJointSlider
              // The index is the joint's identity: joints never reorder
              // biome-ignore lint/suspicious/noArrayIndexKey: see above
              key={index}
              label={`J${index + 1}`}
              name={joint.name}
              value={joint.value}
              min={joint.min}
              max={joint.max}
              linear={joints.linear}
              onJogStart={(direction) => start(index, direction)}
              onJogStop={() => stop(index)}
              disabled={disabled || (active !== null && active !== index)}
            />
          ))}
        </Stack>
        {disabledReason}
      </Section>
      <Divider sx={{ marginX: "20px" }} />
      <Section>
        <VelocityRow
          // A joint's velocity shows as a translation's (mm/s) or a
          // rotation's (°/s)
          motion={joints.linear ? "translate" : "rotate"}
          velocity={joints.velocity}
          onChange={joints.onVelocityChange}
          disabled={disabled}
        />
      </Section>
    </>
  )
}
