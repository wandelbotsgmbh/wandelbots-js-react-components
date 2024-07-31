import { Meta, StoryObj } from "@storybook/react";
import { JoggingPanel } from "./JoggingPanel";
import { useArgs } from "@storybook/preview-api";
import { NovaClient } from "@wandelbots/wandelbots-js";

const meta: Meta<typeof JoggingPanel> = {
  component: JoggingPanel,

  args: {
    motionGroupId: "0@mock-ur5e"
  },
  render: function Component(args) {
    const [, setArgs] = useArgs();
    return <JoggingPanel
      nova={new NovaClient({
        instanceUrl: "https://mock",
        mock: true
      })}
      {...args} 
    />;
  },
};
export default meta;

export const Default: StoryObj<typeof JoggingPanel> = {
};
