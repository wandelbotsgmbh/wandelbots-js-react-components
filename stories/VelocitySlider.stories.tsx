import type { Meta, StoryObj } from "@storybook/react-vite"
import { useArgs } from "storybook/preview-api"
import { type JoggingStore, VelocitySlider } from "../src"

const mockStore = {
  showTabIcons: false,
  showVelocitySliderLabel: true,
  showVelocityLegend: false,
} as unknown as JoggingStore

const meta: Meta<typeof VelocitySlider> = {
  title: "Jogging/VelocitySlider",
  component: VelocitySlider,
  tags: ["!dev"],

  args: {
    velocity: 1,
    min: 1,
    max: 100,
    disabled: false,
    store: mockStore,
  },
  render: function Component(args) {
    const [, setArgs] = useArgs()

    function onVelocityChange(newVelocity: number, useDegree: boolean) {
      args.onVelocityChange?.(newVelocity, useDegree)
      setArgs({ velocity: newVelocity })
    }

    return <VelocitySlider {...args} onVelocityChange={onVelocityChange} />
  },
}
export default meta

export const Default: StoryObj<typeof VelocitySlider> = {}
