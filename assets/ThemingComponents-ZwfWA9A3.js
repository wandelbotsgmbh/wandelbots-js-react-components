import{j as e,M as s,e as r,C as i}from"./iframe-DkYea-kr.js";import{useMDXComponents as m}from"./index-DnWuTDtb.js";import{D as a}from"./JoggingPanel.stories-B4vaAP8d.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DO1Eq-0D.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DpLrcdzv.js";import"./useTheme-BOvrQoMF.js";import"./useLocalObservable-KSnML_T4.js";import"./Stack-y5EyMkv8.js";import"./Typography-B2GngKrK.js";import"./styled-C3xSSN5c.js";import"./useThemeProps-CQDPG6S0.js";import"./getThemeProps-Cp1jNBft.js";import"./createSvgIcon-DMhRrVIP.js";import"./SvgIcon-Dl3HvK6Z.js";import"./getValidReactChildren-soM2k5xg.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-LLuIJpwT.js";import"./context-CDVTju11.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B2CfdrgV.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BQbQLCPi.js";import"./hooks-XF_ZW-qe.js";import"./useTranslation-Ca_MVY3J.js";import"./IconButton-qLxzQ-Qu.js";import"./ButtonBase-CkZH5FNo.js";import"./useTimeout-DQKgCCW3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B3pWdZkC.js";import"./useControlled-apa1KGAb.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-IECz2ZAM.js";import"./useSlotProps-DZiWKT5y.js";import"./Popover-ByxN8Nad.js";import"./useSlot-9t8Mzrpu.js";import"./Paper-D2dbpn3B.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Ab88GEsm.js";import"./utils-BbtRSZY9.js";import"./Fade-DpVsLLQZ.js";import"./Alert-D-5_kpSP.js";import"./Tab-fe5WvfDv.js";import"./Button-CJItOmwG.js";import"./axis-x-B-xqeSmY.js";import"./Box-CB5O4XHm.js";import"./Select-DiPRdQEJ.js";import"./listItemTextClasses-o4RwC4_W.js";import"./MenuItem-FGSWmKkL.js";import"./dividerClasses-CStzHPzS.js";import"./ToggleButton-DL_7BvKU.js";import"./VelocitySlider-CglbbNg_.js";import"./Divider-B8dLOo5d.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Migration note:"})," ",e.jsx(t.code,{children:"createNovaMuiTheme"})," has been renamed to ",e.jsx(t.code,{children:"createNovaTheme"}),`.
The old export still works but is deprecated and will be removed in the next major release.
`,e.jsx(t.code,{children:"createNovaTheme"})," also accepts multiple ",e.jsx(t.code,{children:"ThemeOptions"})," arguments (variadic) for easier composition."]}),`
`]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(i,{of:a,sourceState:"none"}),`
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
`,e.jsx(i,{of:h,sourceState:"none"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function je(o={}){const{wrapper:t}={...m(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{je as default};
