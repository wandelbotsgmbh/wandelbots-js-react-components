import { createTheme } from "@mui/material/styles";
import { NamedThemeOptions } from "./theme";

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
