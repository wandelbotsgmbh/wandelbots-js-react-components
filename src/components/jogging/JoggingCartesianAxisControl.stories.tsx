import type { Meta, StoryObj } from "@storybook/react"
import { JoggingCartesianAxisControl } from "./JoggingCartesianAxisControl"
import { useRef } from "react"
import { useAnimationFrame } from "../utils/hooks"

const meta: Meta<typeof JoggingCartesianAxisControl> = {
  title: "Jogging/JoggingCartesianAxisControl",
  tags: ["!dev"],
  component: JoggingCartesianAxisControl,

  args: {
    color: "#F14D42",
    label: "X",
    disabled: false,
  },
  render: function Component(args) {
    const joggingDirRef = useRef<"+" | "-" | null>(null)
    const joggingValueRef = useRef(0)

    useAnimationFrame(() => {
      if (joggingDirRef.current === "+") {
        joggingValueRef.current += 1
      } else if (joggingDirRef.current === "-") {
        joggingValueRef.current -= 1
      }
    })

    return (
      <JoggingCartesianAxisControl
        {...args}
        startJogging={(direction) => (joggingDirRef.current = direction)}
        stopJogging={() => (joggingDirRef.current = null)}
        getDisplayedValue={() => joggingValueRef.current.toString()}
      />
    )
  },
}
export default meta

export const Default: StoryObj<typeof JoggingCartesianAxisControl> = {}
