import{j as e,M as s,e as r,C as i}from"./iframe-CkNgdxeF.js";import{useMDXComponents as n}from"./index-COMHaLL2.js";import{D as a}from"./JoggingPanel.stories-DZ4rx2xV.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-jekHRjQs.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-dKfZFlMx.js";import"./useTheme-CDqTuutn.js";import"./useLocalObservable-DmZAVxFP.js";import"./Stack-CUoNksGc.js";import"./Typography-CF7wFBPN.js";import"./styled-BxUOQt-w.js";import"./useThemeProps-BT3T52rl.js";import"./getThemeProps-Cb0A8BUx.js";import"./createSvgIcon-DqkDMCkp.js";import"./SvgIcon-BvbJMwnL.js";import"./getValidReactChildren-Hu7h3U4y.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-CegwMWPl.js";import"./context-BZPJXfZC.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DmKXmdlY.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B_IE56LL.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-5B8glykZ.js";import"./hooks-BZZw9sb8.js";import"./useTranslation-CzhDuMmp.js";import"./IconButton-BRWfR7k0.js";import"./ButtonBase-CnjBY7VK.js";import"./useTimeout-BjFS5r2H.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BqA-4m09.js";import"./useControlled-OtMMyrJG.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps--TtYLRfs.js";import"./useSlotProps-DKvs31ta.js";import"./Popover-8hOq99B5.js";import"./useSlot-DJc-LRt3.js";import"./Paper-Da0usnJ2.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Cw1SZYW9.js";import"./utils-7rrYUnS9.js";import"./Fade-BMBwUSeg.js";import"./Alert-BWu_LU8a.js";import"./Tab-BI6GlSfI.js";import"./Button-BDq74niP.js";import"./axis-x-DUoSzc8h.js";import"./Box-CiapCYj-.js";import"./Select-uDuA350u.js";import"./listItemTextClasses-C31q-Qxo.js";import"./MenuItem-Q2IBCxYs.js";import"./dividerClasses-BitFvwUN.js";import"./ToggleButton-DoWy7y9d.js";import"./VelocitySlider-CJ5PcNhf.js";import"./Divider-CJpgj33t.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
