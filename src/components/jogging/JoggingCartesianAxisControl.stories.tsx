import { Meta, StoryObj } from "@storybook/react"
import { JoggingCartesianAxisControl } from "./JoggingCartesianAxisControl"
import { useRef } from "react"
import { useAnimationFrame } from "../utils/hooks"
import { useArgs } from "@storybook/preview-api"

const meta: Meta<typeof JoggingCartesianAxisControl> = {
  component: JoggingCartesianAxisControl,

  args: {
    color: "#F14D42",
    label: "X",
    disabled: false,
  },
  render: function Component(args) {
    const [, setArgs] = useArgs()

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
