import { Meta, StoryObj } from "@storybook/react";
import { VelocitySlider } from "../index";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof VelocitySlider> = {
  component: VelocitySlider,

  args: {
    velocity: 1,
    min: 1,
    max: 100,
    disabled: false,
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();

    function onVelocityChange(newVelocity: number) {
      args.onVelocityChange?.(newVelocity);
      setArgs({ velocity: newVelocity });
    }

    return <VelocitySlider
      {...args} 
      onVelocityChange={onVelocityChange}
    />;
  },

};
export default meta;

export const Default: StoryObj<typeof VelocitySlider> = {
};
