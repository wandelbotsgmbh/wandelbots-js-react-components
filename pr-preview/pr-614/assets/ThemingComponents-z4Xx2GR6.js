import{j as e,M as a,e as i,C as r}from"./iframe-BktpLyFG.js";import{useMDXComponents as n}from"./index-DVaYwRcD.js";import{D as p}from"./JoggingPanel.stories-DkNs03DM.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BKP_nGw_.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Bu7iQjly.js";import"./useTheme-vGz388W0.js";import"./useLocalObservable-mAIcJmpd.js";import"./Stack-B4LRxMix.js";import"./Typography-Voa_F59U.js";import"./styled-DAuixZZr.js";import"./useThemeProps-BnDuMFvZ.js";import"./getThemeProps-VRdCsbYl.js";import"./createSvgIcon-3XXHrKCW.js";import"./SvgIcon-DVr8FpOn.js";import"./getValidReactChildren-BCi9coFi.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-BkYu4_0b.js";import"./context-Cblz76sC.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-sS5KrYs0.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-eiKShz0M.js";import"./hooks-BsaOnC0D.js";import"./useTranslation-Dd3KAXVW.js";import"./IconButton--tvB0ucb.js";import"./ButtonBase-D0Z-haiV.js";import"./useTimeout-DalGcRLt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-4Ggq5fjF.js";import"./useControlled-BIYqvKFk.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Dw9MGOG8.js";import"./useSlotProps-9D-wZKDg.js";import"./Popover-VSBWPDPW.js";import"./useSlot-HeRHl38G.js";import"./Paper-D3YakWmv.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-LQN90JnI.js";import"./utils-5rAu8RCr.js";import"./Fade-D-Ukbu1X.js";import"./Alert-CvY8Cfq_.js";import"./Tab-CXbn_kY8.js";import"./Button-DUdd8WAk.js";import"./axis-x-BnC4SXqc.js";import"./rotation--697w9IP.js";import"./JoggingCartesianAxisControl-BqFZgmtr.js";import"./Box-6_1luqr6.js";import"./Select-CbEEf3GV.js";import"./listItemTextClasses-DTgc7c2b.js";import"./MenuItem-BQnQWa3q.js";import"./dividerClasses-Wzv_-_UV.js";import"./ToggleButton-C666kegO.js";import"./VelocitySlider-BSyuQcsC.js";import"./Divider-aVTZly-_.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
