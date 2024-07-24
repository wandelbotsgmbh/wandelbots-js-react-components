import { Meta, StoryObj } from "@storybook/react";
import { LoadingButton } from "./LoadingButton";
import { useState } from "react";


async function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const DemoLoader = (props: React.ComponentProps<typeof LoadingButton>) => {
  const [isLoading, setIsLoading] = useState(false);

  async function doThing() {
    setIsLoading(true);
    try {
      await delay(1000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LoadingButton
      loading={isLoading}
      onClick={doThing}
      {...props}
    />
  );
}

const meta: Meta<typeof LoadingButton> = {
  component: LoadingButton,

  args: {
    children: "Click me",
    variant: "contained",
  },
  argTypes: {
    variant: {
      options: ["contained", "outlined", "text"],
      control: { type: 'select' },
    }
  },
  render: (props) => {
    return <DemoLoader {...props} />;
  }
};
export default meta;

export const Default: StoryObj<typeof LoadingButton> = {
};
