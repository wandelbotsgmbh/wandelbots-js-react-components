import { createTheme } from "@mui/material/styles";
import { NamedThemeOptions } from "./theme";

export const sojkaTheme = createTheme({
  name: 'sojka',
  palette: {
    primary: {
      main: '#066771',
    },
    secondary: {
      main: '#616161',
    },
    background: {
      default: '#FAFAFA'
    },
    text: {
      primary: '#262626',
      secondary: '#616161',
      primaryDark: '#FAFAFA',
    },
    line: {
      primary: 'rgb(0,0,0)',
      secondary: 'rgb(200,200,200)',
    },
  },
  backgrounds: {
    light1: '#D6D6D6',
    light2: '#EBEBEB',
    medium: '#A3A3A3',
    dark1: '#616161',
    dark2: '#262626',
  },
  borders: {
    active: '#616161',
    non_decorative: '#A3A3A3',
  },
  axes: {
    x: '#B52222',
    y: '#28AF28',
    z: '#0045FF'
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
  viewport: {
    background: "#FAFAFA",
    controlBackground: 'rgb(100,100,100)',
  },
} as NamedThemeOptions)
