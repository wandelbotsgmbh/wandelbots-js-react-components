import React from "react";
import { Meta, StoryObj } from "@storybook/react";
declare const ColorPalette: () => React.JSX.Element;
declare const meta: Meta<typeof ColorPalette>;
export default meta;
type Story = StoryObj<typeof ColorPalette>;
export declare const colorPalette: Story;
