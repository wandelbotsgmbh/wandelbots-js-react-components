import React from "react";
import { sojkaTheme } from "./sojkaTheme";
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
        <Color name="Primary" color={sojkaTheme.palette.primary.main} />
        <Color name="Secondary" color={sojkaTheme.palette.secondary.main} />
        <Color name="Background" color={sojkaTheme.palette.background.default} />
      </ColorSection>
      <ColorSection name="Text">
        <Color name="Primary" color={sojkaTheme.palette.text.primary} />
        <Color name="Secondary" color={sojkaTheme.palette.text.secondary} />
        <Color name="Primary Dark" color={sojkaTheme.palette.text.primaryDark} />
      </ColorSection>
      <ColorSection name="Line">
        <Color name="Primary" color={sojkaTheme.palette.line.primary} />
        <Color name="Secondary" color={sojkaTheme.palette.line.secondary} />
      </ColorSection>
      <ColorSection name="Backgrounds">
        <Color name="Light 1" color={sojkaTheme.backgrounds.light1} />
        <Color name="Light 2" color={sojkaTheme.backgrounds.light2} />
        <Color name="Medium" color={sojkaTheme.backgrounds.medium} />
        <Color name="Dark 1" color={sojkaTheme.backgrounds.dark1} />
        <Color name="Dark 2" color={sojkaTheme.backgrounds.dark2} />
      </ColorSection>
      <ColorSection name="Borders">
        <Color name="Active" color={sojkaTheme.borders.active} />
        <Color name="Non Decorative" color={sojkaTheme.borders.non_decorative} />
      </ColorSection>
      <ColorSection name="Axes">
        <Color name="X" color={sojkaTheme.axes.x} />
        <Color name="Y" color={sojkaTheme.axes.y} />
        <Color name="Z" color={sojkaTheme.axes.z} />
      </ColorSection>
      <ColorSection name="Sidebar">
        <Color name="Background" color={sojkaTheme.sidebar.background} />
        <Color name="Background Selected" color={sojkaTheme.sidebar.backgroundSelected} />
        <Color name="Selected" color={sojkaTheme.sidebar.selected} />
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
