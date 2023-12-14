import React from "react";
import { wbTheme } from "./wbTheme";
import { Meta, StoryObj } from "@storybook/react";
import { Color, ColorSection } from "./color";

const ColorPalette = () => {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
      }}
    >
      <ColorSection name="Palette">
        <Color name="Primary" color={wbTheme.palette.primary.main} />
        <Color name="Secondary" color={wbTheme.palette.secondary.main} />
        <Color name="Background" color={wbTheme.palette.background.default} />
      </ColorSection>
      <ColorSection name="Text">
        <Color name="Primary" color={wbTheme.palette.text.primary} />
        <Color name="Secondary" color={wbTheme.palette.text.secondary} />
      </ColorSection>
      <ColorSection name="Line">
        <Color name="Primary" color={wbTheme.palette.line.primary} />
        <Color name="Secondary" color={wbTheme.palette.line.secondary} />
      </ColorSection>
      <ColorSection name="Button">
        <Color name="Primary Background" color={wbTheme.buttonPrimary.background} />
        <Color name="Primary Text" color={wbTheme.buttonPrimary.text} />
        <Color name="Secondary Background" color={wbTheme.buttonSecondary.background} />
        <Color name="Secondary Text" color={wbTheme.buttonSecondary.text} />
        <Color name="Back Background" color={wbTheme.buttonBack.background} />
        <Color name="Back Text" color={wbTheme.buttonBack.text} />
      </ColorSection>
      <ColorSection name="Input Field">
        <Color name="Background" color={wbTheme.inputField.background} />
        <Color name="Text" color={wbTheme.inputField.text} />
        <Color name="Unit Background" color={wbTheme.inputField.unitBackground} />
        <Color name="Unit Text" color={wbTheme.inputField.unitText} />
      </ColorSection>
      <ColorSection name="Sidebar">
        <Color name="Background" color={wbTheme.sidebar.background} />
        <Color name="Background Selected" color={wbTheme.sidebar.backgroundSelected} />
        <Color name="Selected" color={wbTheme.sidebar.selected} />
      </ColorSection>
    </div>
  );
};

const meta: Meta<typeof ColorPalette> = {
  component: ColorPalette,
};

export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const colorPalette: Story = {};
