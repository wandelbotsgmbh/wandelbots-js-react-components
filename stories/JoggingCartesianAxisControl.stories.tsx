import { Typography, useTheme } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { useRef } from "react"
import { JoggingCartesianAxisControl } from "../src"
import { useAnimationFrame } from "../src/components/utils/hooks"
import XAxisIcon from "../src/icons/axis-x.svg"

const meta: Meta<typeof JoggingCartesianAxisControl> = {
  title: "Jogging/JoggingCartesianAxisControl",
  tags: ["!dev"],
  component: JoggingCartesianAxisControl,

  args: {
    label: "X",
    disabled: false,
    activeJoggingDirection: "+",
  },

  render: function Component(args) {
    const joggingDirRef = useRef<"+" | "-" | null>(null)
    const joggingValueRef = useRef(0)

    const theme = useTheme()
    const colors = theme.componentsExt?.JoggingCartesian?.Axis?.X

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
        colors={colors}
        startJogging={(direction) => (joggingDirRef.current = direction)}
        stopJogging={() => (joggingDirRef.current = null)}
        getDisplayedValue={() => `${joggingValueRef.current.toString()} mm`}
        label={
          <>
            <XAxisIcon />
            <Typography
              sx={{
                fontSize: "24px",
                color: theme.palette.text.primary,
              }}
            >
              X
            </Typography>
          </>
        }
      />
    )
  },
}
export default meta

export const Default: StoryObj<typeof JoggingCartesianAxisControl> = {}
