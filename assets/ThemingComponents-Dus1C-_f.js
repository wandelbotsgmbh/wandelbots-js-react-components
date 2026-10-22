import{j as e,M as s,e as r,C as i}from"./iframe-CMJe3vUn.js";import{useMDXComponents as n}from"./index-DZkgdffJ.js";import{D as a}from"./JoggingPanel.stories-DpF-61gZ.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-BwQercTH.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CkvAcIje.js";import"./useTheme-CmqkvzSF.js";import"./useLocalObservable-Cvew8EE1.js";import"./Stack-WvCO-lcu.js";import"./Typography-BI6PP6Cc.js";import"./styled-Cu5McQR3.js";import"./useThemeProps-DUHT0jOh.js";import"./getThemeProps-DF4KkJ2r.js";import"./createSvgIcon-Cv1Xk519.js";import"./SvgIcon-DWmxO4Xz.js";import"./getValidReactChildren-Bmi90xg2.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-B-Ed7NDu.js";import"./context-CvonSSXN.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-CT44Abba.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-SN83EqQc.js";import"./hooks-BcPtewxe.js";import"./useTranslation-vzcDxkSx.js";import"./IconButton-CHSa_IHV.js";import"./ButtonBase-DUIfW5eq.js";import"./useTimeout-DzrPpziT.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Byw9Pqt7.js";import"./useControlled-BCy5l5cn.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DeWz8kPK.js";import"./useSlotProps-BGMZujcS.js";import"./Popover-fdcSkfdM.js";import"./useSlot-BUn2VBDJ.js";import"./Paper-zAv6N390.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-ChZRDM_q.js";import"./utils-BOqE5FGX.js";import"./Fade-BF8wxTr4.js";import"./Alert-BBYnWcfl.js";import"./Tab-DReKulEK.js";import"./Button-ew2cMJ9w.js";import"./axis-x-B2gGI4OY.js";import"./Box-B1bTA7Df.js";import"./Select-B-D0nWSg.js";import"./listItemTextClasses-cTcmMXNj.js";import"./MenuItem-CwkFVrA6.js";import"./dividerClasses-DASsu3ph.js";import"./ToggleButton-CyaWxNx7.js";import"./VelocitySlider-zsHaTi92.js";import"./Divider-Bf0Y_EYb.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function fe(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{fe as default};
