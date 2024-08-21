import type { Meta, StoryObj } from "@storybook/react"
import { JoggingPanel } from "../src/index"
import { useArgs } from "@storybook/preview-api"

const meta: Meta<typeof JoggingPanel> = {
  title: "Jogging/JoggingPanel",
  tags: ["!dev"],
  component: JoggingPanel,
}
export default meta

export const Default: StoryObj<typeof JoggingPanel> = {
  args: {
    nova: "https://mock.example.com",
    motionGroupId: "0@mock-ur5e",
  },
  argTypes: {
    nova: {
      control: {
        type: "text",
      },
    },
  },
}
