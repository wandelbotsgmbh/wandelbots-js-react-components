// Default colors of the jogging components. These are the same values as the
// `componentsExt` jogging colors of the removed `createNovaTheme`.

export interface AxisControlComponentColors {
  color?: string
  borderColor?: string
  backgroundColor?: string
  buttonBackgroundColor?: {
    default?: string
    pressed?: string
    disabled?: string
    hovered?: string
  }
  labelColor?: string
}

// White = palette.text.primary in dark mode.
const onDark = "rgba(255, 255, 255, 1)"

/** Colors of the X, Y and Z axis controls of the cartesian jogging tab */
export const cartesianAxisColors: Record<
  "X" | "Y" | "Z",
  AxisControlComponentColors
> = {
  X: {
    backgroundColor: "rgba(215, 66, 56, 1)",
    borderColor: "rgba(215, 66, 56, 1)",
    buttonBackgroundColor: {
      default: "rgba(241, 77, 66, 1)",
      pressed: "rgba(138, 41, 35, 1)",
      hovered: "rgba(241, 77, 66, 1)",
      disabled: "rgba(241, 77, 66, 1)",
    },
    color: "rgba(255, 198, 198, 1)",
    labelColor: onDark,
  },
  Y: {
    backgroundColor: "rgba(20, 151, 108, 1)",
    borderColor: "rgba(20, 151, 108, 1)",
    buttonBackgroundColor: {
      default: "rgba(28, 188, 135, 1)",
      pressed: "rgba(11, 89, 63, 1)",
      disabled: "rgba(28, 188, 135, 1)",
      hovered: "rgba(28, 188, 135, 1)",
    },
    color: "rgba(215, 255, 242, 1)",
    labelColor: onDark,
  },
  Z: {
    backgroundColor: "rgba(1, 87, 155, 1)",
    borderColor: "rgba(1, 87, 155, 1)",
    buttonBackgroundColor: {
      default: "rgba(2, 136, 209, 1)",
      pressed: "rgba(2, 64, 114, 1)",
      disabled: "rgba(2, 136, 209, 1)",
      hovered: "rgba(2, 136, 209, 1)",
    },
    color: "rgba(210, 239, 255, 1)",
    labelColor: onDark,
  },
}

/** Color of the arrows of the joint jogging controls */
export const jointArrowColor = onDark

/** Color of the velocity legend of the velocity slider */
export const velocitySliderLegendColor = onDark
