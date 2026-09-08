import{j as e,M as s,e as r,C as i}from"./iframe-Dg8QaNeO.js";import{useMDXComponents as n}from"./index-D5da4161.js";import{D as a}from"./JoggingPanel.stories-CakFK-w3.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DF2tdc5t.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DNej2Whg.js";import"./useTheme-CvsiONSV.js";import"./useLocalObservable-RkWGspCB.js";import"./Stack-DVZIgza7.js";import"./Typography-BDayEOYH.js";import"./styled-B1muPhWg.js";import"./useThemeProps-BdjuaDM0.js";import"./getThemeProps-BR3TdkWI.js";import"./createSvgIcon-CXtyqEEJ.js";import"./SvgIcon-CkcX3XiG.js";import"./getValidReactChildren-DPFuxJgY.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-lg8v6IMz.js";import"./context-BhGYiao1.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-Ch2taCr_.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Dy_xgqo8.js";import"./hooks-CbPtOFfr.js";import"./useTranslation-Ct9Uxtzi.js";import"./IconButton-CINZDiGZ.js";import"./ButtonBase-CY6rDtJe.js";import"./useTimeout-DK1MT_6g.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B304OaDz.js";import"./useControlled-MpnwMukB.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BVbpKGW4.js";import"./useSlotProps-BJPSNPxe.js";import"./Popover-BPGweu0O.js";import"./useSlot-oz5jDBW1.js";import"./Paper-BlZnOFxL.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bybouti6.js";import"./utils-Dk7o1jss.js";import"./Fade-B3UeZkVw.js";import"./Alert-CtZ-R5Tr.js";import"./Tab-DpgwPT8y.js";import"./Button-ktTf_bCK.js";import"./axis-x-BC4n04G1.js";import"./Box-2ILZ1ZcC.js";import"./Select-8vL0VnQG.js";import"./listItemTextClasses-VJyiyMA6.js";import"./MenuItem-D1x40Cfv.js";import"./dividerClasses-CepDCMsY.js";import"./ToggleButton-zlSVG8LW.js";import"./VelocitySlider-vJ-kDwjM.js";import"./Divider-Dp8CRSdT.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
