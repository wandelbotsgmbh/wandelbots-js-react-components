import { Meta, StoryObj } from "@storybook/react"
import { VelocitySlider } from "./VelocitySlider"
import { useArgs } from "@storybook/preview-api"

const meta: Meta<typeof VelocitySlider> = {
  component: VelocitySlider,

  args: {
    velocity: 1,
    min: 1,
    max: 100,
    disabled: false,
  },
  render: function Component(args) {
    const [, setArgs] = useArgs()

    function onVelocityChange(newVelocity: number) {
      args.onVelocityChange?.(newVelocity)
      setArgs({ velocity: newVelocity })
    }

    const { onVelocityChange: _, ...restArgs } = args

    return <VelocitySlider onVelocityChange={onVelocityChange} {...restArgs} />
  },
}
export default meta

export const Default: StoryObj<typeof VelocitySlider> = {}
