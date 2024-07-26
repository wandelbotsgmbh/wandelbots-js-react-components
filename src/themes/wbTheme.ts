import { createTheme, useTheme } from "@mui/material/styles";
import { NamedThemeOptions } from "./theme";

// TODO put custom colors in theme palette maybe?
const baseColors = {
  white: "#FFFFFF",
  midnightblue: "#001337",
  lightbuttonblue: "#47D3FF",
  midnightgray: "#DDE0E4",
  midnightgray500: "#828B9B",
  skyblue500: "#06B8F1",
  skyblue600: "#0094CE",
  darkishblue: "#262F42",
  darkestblue: "#101629",
  grayishblue: "#505968",
  darkgrayishblue: "#363c4b",
  scaryred: "#FF0E65",
  tealGreen: "#1AC0B2",
  magenta: "#EA3785",
}

/** Colors for the dark theme */
export const darkColors = {
  primary: baseColors.skyblue500,
  textDefault: baseColors.white,
  textInverse: baseColors.darkestblue,
  textError: baseColors.scaryred,
  textSubtle: baseColors.midnightgray500,
  backgroundDefault: baseColors.darkishblue,
  inputBackgroundDefault: baseColors.darkgrayishblue,
  borderColorDefault: "#3A4150",

  selectBackground: baseColors.grayishblue,
  appBarBackground: baseColors.darkestblue,
  virtualRobot: "#1AC0B2",
  physicalRobot: "#956FFA",
  robotViewportBackground: "#1F283A",
  viewportButtonInactiveBackground: baseColors.darkestblue,
  viewportButtonHover: baseColors.midnightgray500,
  viewportButtonActiveBackground: baseColors.skyblue500,
  tabsBarBackground: baseColors.darkestblue,
  activeTabBackground: baseColors.darkishblue,
  omniverseConfigurationSuccess: baseColors.tealGreen,
  omniverseConfigurationFailure: baseColors.magenta,
}

/** Colors for the light theme */
export const lightColors = {
  primary: baseColors.lightbuttonblue,
  textDefault: "#18181B",
  textInverse: baseColors.white,
  textError: baseColors.scaryred,
  textSubtle: baseColors.midnightgray500,
  backgroundDefault: baseColors.white,
  inputBackgroundDefault: baseColors.white,
  borderColorDefault: baseColors.midnightgray500,

  selectBackground: "#E4E4E7",
  appBarBackground: baseColors.white,
  virtualRobot: "green",
  physicalRobot: "blue",
  robotViewportBackground: "#E4E4E7",
  viewportButtonInactiveBackground: baseColors.midnightgray,
  viewportButtonHover: baseColors.midnightgray500,
  viewportButtonActiveBackground: baseColors.lightbuttonblue,
  tabsBarBackground: baseColors.white,
  activeTabBackground: baseColors.white,
  omniverseConfigurationSuccess: baseColors.tealGreen,
  omniverseConfigurationFailure: baseColors.magenta,
}

/** Gets the colors for the current theme (light or dark) */
export function useThemeColors() {
  return useTheme().palette.mode === "dark" ? darkColors : lightColors
}

export const wbTheme = createTheme({
  name: 'wandelbots',
  palette: {
    mode: 'light',
    primary: {
      main: '#010B23',
    },
    secondary: {
      main: '#4A526B',
    },
    background: {
      default: '#010B23'
    },
    text: {
      primary: '#010B23',
      secondary: '#010B23',
    },
    line: {
      primary: 'rgb(255,255,255)',
      secondary: 'rgb(100,100,100)',
    },
  },
  buttonPrimary: {
    background: "#00A4F5",
    text: "#FFFFFF"
  },
  buttonSecondary: {
    background: "#879399",
    text: "#FFFFFF"
  },
  buttonBack: {
    background: "transparent",
    text: "#151D35"
  },
  inputField: {
    background: "#F5F8FA",
    text: "#242C3E",
    unitBackground: "#CCD4D9",
    unitText: "#242C3E",
  },
  sidebar: {
    background: "#000000",
    backgroundSelected: "#4B4B4B",
    selected: "#6FE946"
  },
  actionPanel: {
    background: "#262626",
    backgroundSelected: "#4B4B4B",
    text: "#FAFAFA"
  },
  controlPanel: {
    background: "#EBEBEB",
    text: "#525F66"
  },
  listItem: {
    background: "#D9D9D9",
    backgroundSelected: "#616161",
    textTitle: "#262626",
    textTitleSelected: "#FAFAFA",
    textDesc: "#616161",
    textDescSelected: "#F5F5F5"
  },
  breadcrumb: {
    background: "#FFFFFF",
    text: "#010B2366",
    textSelected: "#010B23"
  },
  axes: {
    x: '#B52222',
    y: '#28AF28',
    z: '#0045FF'
  },
  viewport: {
    background: "#FAFAFA",
    controlBackground: 'rgb(100,100,100)',
  },
  tabIcon: {
    color: "#444444"
  }
} as NamedThemeOptions);

