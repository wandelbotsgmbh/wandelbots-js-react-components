import type { Meta, StoryObj } from "@storybook/react-vite"
import { useRef } from "react"
import { JoggingJointValueControl } from "../src"
import { useAnimationFrame } from "../src/components/utils/hooks"

const meta: Meta<typeof JoggingJointValueControl> = {
  title: "Jogging/JoggingJointValueControl",
  tags: ["!dev"],
  component: JoggingJointValueControl,

  args: {
    lowerLimit: -360,
    upperLimit: 360,
    disabled: false,
  },
  render: function Component(args) {
    const joggingDirRef = useRef<"+" | "-" | null>(null)
    const joggingValueRef = useRef(0)

    useAnimationFrame(() => {
      if (joggingDirRef.current === "+") {
        joggingValueRef.current += 1
        if (args.upperLimit != null) {
          joggingValueRef.current = Math.min(
            joggingValueRef.current,
            args.upperLimit,
          )
        }
      } else if (joggingDirRef.current === "-") {
        joggingValueRef.current -= 1
        if (args.lowerLimit != null) {
          joggingValueRef.current = Math.max(
            joggingValueRef.current,
            args.lowerLimit,
          )
        }
      }
    })

    return (
      <JoggingJointValueControl
        {...args}
        startJogging={(direction) => (joggingDirRef.current = direction)}
        stopJogging={() => (joggingDirRef.current = null)}
        getValue={() => joggingValueRef.current}
      />
    )
  },
}
export default meta

export const Default: StoryObj<typeof JoggingJointValueControl> = {}
