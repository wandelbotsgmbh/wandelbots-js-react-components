import type { Meta, StoryObj } from "@storybook/react-vite"
import { JoggingJointRotationControl } from "../src"
import { useRef } from "react"
import { useAnimationFrame } from "../src/components/utils/hooks"

const meta: Meta<typeof JoggingJointRotationControl> = {
  title: "Jogging/JoggingJointRotationControl",
  tags: ["!dev"],
  component: JoggingJointRotationControl,

  args: {
    lowerLimitDegs: -360,
    upperLimitDegs: 360,
    disabled: false,
  },
  render: function Component(args) {
    const joggingDirRef = useRef<"+" | "-" | null>(null)
    const joggingValueRef = useRef(0)

    useAnimationFrame(() => {
      if (joggingDirRef.current === "+") {
        joggingValueRef.current += 1
        if (args.upperLimitDegs != null) {
          joggingValueRef.current = Math.min(
            joggingValueRef.current,
            args.upperLimitDegs,
          )
        }
      } else if (joggingDirRef.current === "-") {
        joggingValueRef.current -= 1
        if (args.lowerLimitDegs != null) {
          joggingValueRef.current = Math.max(
            joggingValueRef.current,
            args.lowerLimitDegs,
          )
        }
      }
    })

    return (
      <JoggingJointRotationControl
        {...args}
        startJogging={(direction) => (joggingDirRef.current = direction)}
        stopJogging={() => (joggingDirRef.current = null)}
        getValueDegs={() => joggingValueRef.current}
      />
    )
  },
}
export default meta

export const Default: StoryObj<typeof JoggingJointRotationControl> = {}
