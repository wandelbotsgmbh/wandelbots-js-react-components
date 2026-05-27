import{j as e,M as p,e as i,C as r}from"./iframe-ZZVW1XqV.js";import{useMDXComponents as n}from"./index-kPfas0ri.js";import{D as a}from"./JoggingPanel.stories-C3OPMkcw.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-ToshbkQK.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-WYekAgSV.js";import"./useTheme-cazX4MSO.js";import"./useLocalObservable-B6p_CBHD.js";import"./Stack-CnzyR7YV.js";import"./Typography-CWr55VjG.js";import"./styled-DuVnwfSN.js";import"./useThemeProps-C8RddSMC.js";import"./getThemeProps-DAsDnbBv.js";import"./createSvgIcon-Dv0TmzfE.js";import"./SvgIcon-YFWIgye4.js";import"./getValidReactChildren-BPGO9w4M.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BZq5q35Q.js";import"./context-CYxK5gWU.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DxKDwRex.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DGJ1p74l.js";import"./hooks-C35qroKj.js";import"./useTranslation-DUi4SxsZ.js";import"./IconButton-BZE1CHx5.js";import"./ButtonBase-IiuycNnO.js";import"./useTimeout-0hM7NA6S.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BWglofE-.js";import"./useControlled-BtfMh9E9.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CFVqvEkb.js";import"./useSlotProps-CyFjPeQm.js";import"./Popover-BBByfKJM.js";import"./useSlot-B0f-OLbV.js";import"./Paper-q-K7EU-g.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-ChiveiD1.js";import"./utils-BqtJ5hDS.js";import"./Fade-B-jEww1M.js";import"./Alert-BgfgEBap.js";import"./Tab-CVL1SRIh.js";import"./Button-jTIPvSj2.js";import"./axis-x-BC2yk2ye.js";import"./rotation-BMuDNjsZ.js";import"./JoggingCartesianAxisControl-DNC-UNJ_.js";import"./Select-BKjk8p5o.js";import"./listItemTextClasses-BzFT_91G.js";import"./MenuItem-BQxRG53j.js";import"./dividerClasses-CQaIfQ4c.js";import"./ToggleButton-Dd4Gcf7m.js";import"./Box-WIoobPhI.js";import"./VelocitySlider-CSsBAcx-.js";import"./Divider-CfZ9Lx8G.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:a,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme({
palette: {
  primary: {
    main: "#ff0000"
  }
}
})

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider, createTheme } from "@mui/material";
import { JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createTheme({
typography: {
  fontFamily: 'Comic Sans MS'
}
})

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:h,sourceState:"none"})]})}function we(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{we as default};
