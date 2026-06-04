import{j as e,M as a,e as i,C as r}from"./iframe-oN6q3zgG.js";import{useMDXComponents as n}from"./index-ayKKM3BD.js";import{D as p}from"./JoggingPanel.stories-CF-zpyDl.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DnqstJeZ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-_dRI83pF.js";import"./useTheme-C63l57-j.js";import"./useLocalObservable-CtUoglHq.js";import"./Stack-CzoYev1Y.js";import"./Typography-DydLEqyU.js";import"./styled-9T41Md9y.js";import"./useThemeProps-CRh_l191.js";import"./getThemeProps-CI7EbCW6.js";import"./createSvgIcon-DD-xdrzr.js";import"./SvgIcon-BvgSJNq6.js";import"./getValidReactChildren-EIUSuprp.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-D-qg6SU6.js";import"./context-CMhpk8d7.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Cn3IjZrO.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-8yZvOYa0.js";import"./hooks-WZyFfhuu.js";import"./useTranslation-tyojdT_5.js";import"./IconButton-51VCroTw.js";import"./ButtonBase-BvCY-EIs.js";import"./useTimeout-w6cgNl3H.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DnXbM3M4.js";import"./useControlled-_GnWSzzA.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Bqm69nWB.js";import"./useSlotProps-ttg1cKmP.js";import"./Popover-CfzrIiWm.js";import"./useSlot-9vJNPunL.js";import"./Paper-CPuzR7XL.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-C1utOIxh.js";import"./utils-Cuz6EezF.js";import"./Fade-BFrjesZE.js";import"./Alert-BB6_g71M.js";import"./Tab-CtF0DLgM.js";import"./Button-Dcrc7Wyz.js";import"./axis-x-DiJymlT8.js";import"./rotation-QAeeABTf.js";import"./JoggingCartesianAxisControl-DHF0th_H.js";import"./Box-D9FEQXWC.js";import"./Select-B94zvDV5.js";import"./listItemTextClasses-_dPWYVMW.js";import"./MenuItem-C4MIZkf7.js";import"./dividerClasses-D8wEvQN3.js";import"./ToggleButton-B2K4uSGf.js";import"./VelocitySlider--SwFYIVk.js";import"./Divider-BL5AOkSy.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
`,e.jsx(r,{of:p,sourceState:"none"}),`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
