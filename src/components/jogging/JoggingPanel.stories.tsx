import { Meta, StoryObj } from "@storybook/react";
import { JoggingPanel } from "./JoggingPanel";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof JoggingPanel> = {
  component: JoggingPanel,

  args: {
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();
    return <JoggingPanel
      {...args} 
    />;
  },
};
export default meta;

export const Default: StoryObj<typeof JoggingPanel> = {
};
