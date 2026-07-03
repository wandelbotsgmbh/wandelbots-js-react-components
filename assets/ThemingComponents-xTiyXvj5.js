import{j as e,M as a,e as r,C as i}from"./iframe-Ck_8_rPi.js";import{useMDXComponents as n}from"./index-D25tAKuv.js";import{D as p}from"./JoggingPanel.stories--CNh-7mV.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-j_xRZqkM.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-B6Z2A2fU.js";import"./useTheme-D2WhJaKu.js";import"./useLocalObservable-DoZqcgrL.js";import"./Stack-DgWh5f85.js";import"./Typography-5Ydmnuwf.js";import"./styled-C3IjdeTo.js";import"./useThemeProps-eyjNKKy9.js";import"./getThemeProps-Wxn2q-2f.js";import"./createSvgIcon-BPZKg3h6.js";import"./SvgIcon-ienfSbo7.js";import"./getValidReactChildren-DTrRWs0n.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-D7iOTdkY.js";import"./context-B4wr4qHp.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-C1ku_D3b.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DT63OkWO.js";import"./hooks-DO3kIkIa.js";import"./useTranslation-BrmPx0s9.js";import"./IconButton-9mJukCkq.js";import"./ButtonBase-idj6tRoO.js";import"./useTimeout-CaXFH3dq.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CWsMnsXl.js";import"./useControlled-C4e_OTwW.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CUjb-jSh.js";import"./useSlotProps-CTBWw-Dx.js";import"./Popover-C0yMpXk8.js";import"./useSlot-BP0g0-qk.js";import"./Paper-JCun0_jh.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-C2UTdt16.js";import"./utils-B4gVlluA.js";import"./Fade-62z4Qa__.js";import"./Alert-6Vm35Ss_.js";import"./Tab-DV8du3MK.js";import"./Button-BmTt5xhs.js";import"./axis-x-D1Me7T_c.js";import"./rotation-CSQhVQSV.js";import"./JoggingCartesianAxisControl-BIYNmrKV.js";import"./Box-CRTfYKmG.js";import"./Select-W1VaI4IC.js";import"./listItemTextClasses-D3LytYZK.js";import"./MenuItem-C9cvTgMx.js";import"./dividerClasses-ChsAyLBN.js";import"./ToggleButton-CJ9rDNHc.js";import"./VelocitySlider-CvC8XuFm.js";import"./Divider-B3VzI5Q9.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(i,{of:p,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme({
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
`,e.jsx(i,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(r,{dark:!0,code:`
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
`,e.jsx(i,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
