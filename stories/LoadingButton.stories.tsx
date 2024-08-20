import type { Meta, StoryObj } from "@storybook/react"
import { LoadingButton } from "../src/components/LoadingButton"
import { useState } from "react"
import PlayArrow from "@mui/icons-material/PlayArrow"

async function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

const DemoLoader = (props: React.ComponentProps<typeof LoadingButton>) => {
  const [isLoading, setIsLoading] = useState(false)

  async function doThing() {
    setIsLoading(true)
    try {
      await delay(1000)
    } finally {
      setIsLoading(false)
    }
  }

  return <LoadingButton loading={isLoading} onClick={doThing} {...props} />
}

const meta: Meta<typeof LoadingButton> = {
  component: LoadingButton,
  tags: ["!dev", "!autodocs"],
  args: {
    children: "Click me",
    loadingPosition: "start",
    variant: "contained",
    startIcon: <PlayArrow />,
  },
  argTypes: {
    loadingPosition: {
      options: ["center", "start", "end"],
      control: { type: "select" },
    },
    variant: {
      options: ["contained", "outlined", "text"],
      control: { type: "select" },
    },
  },
  render: (props) => {
    return <DemoLoader {...props} />
  },
}
export default meta

export const Default: StoryObj<typeof LoadingButton> = {}
