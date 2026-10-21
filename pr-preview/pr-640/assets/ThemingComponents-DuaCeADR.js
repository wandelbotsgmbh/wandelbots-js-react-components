import{j as e,M as s,e as r,C as i}from"./iframe-C-1QXTc1.js";import{useMDXComponents as n}from"./index-CFCshvHz.js";import{D as a}from"./JoggingPanel.stories-7aTjEhzR.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DbDxV0Hj.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-ChT4Uvyp.js";import"./useTheme-CReI2mBA.js";import"./useLocalObservable-CS_Df-7F.js";import"./Stack-CDNN68Us.js";import"./Typography-BRa19HZ0.js";import"./styled-p2lVGt_y.js";import"./useThemeProps-DATolmrO.js";import"./getThemeProps-BsS-E9D6.js";import"./createSvgIcon-oFSVzeaF.js";import"./SvgIcon-xi-7rvsa.js";import"./getValidReactChildren-Ki3SuHAU.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-N9XphJ3G.js";import"./context-BRmSTh3b.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-CxPFYYan.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-D1ZfPP2i.js";import"./hooks-Bj-XkPYd.js";import"./useTranslation-BZFm40h9.js";import"./IconButton-C8KUrlQC.js";import"./ButtonBase-BsafTb3q.js";import"./useTimeout-B7lhD6gV.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B8kTijO2.js";import"./useControlled-0kzWwm6G.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-QniukcKU.js";import"./useSlotProps-C1E1jjGT.js";import"./Popover-CzaXcAic.js";import"./useSlot-CMJa1bry.js";import"./Paper-CeLmSilj.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-rOg918s5.js";import"./utils-BJNS-cp8.js";import"./Fade-DtqmhdYD.js";import"./Alert-CkUE0QXZ.js";import"./Tab-DT21xZCz.js";import"./Button-DRKw4OEE.js";import"./axis-x-BpPwBG_w.js";import"./Box-CLrpVc2B.js";import"./Select-CIurdDI9.js";import"./listItemTextClasses-ZDTuq83E.js";import"./MenuItem-EVWbQO4T.js";import"./dividerClasses--8bSTBiR.js";import"./ToggleButton-COddYyw8.js";import"./VelocitySlider-Bew_hW1o.js";import"./Divider-DbvUoeBR.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
