import{j as e,M as s,e as r,C as i}from"./iframe-hUXCLP2m.js";import{useMDXComponents as m}from"./index-1yhvyELA.js";import{D as a}from"./JoggingPanel.stories-CE4YEcS5.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DD9qjaRc.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DWsux1hp.js";import"./useTheme-5lEezaxf.js";import"./useLocalObservable-C9nsCxbm.js";import"./Stack-MVU6gAtW.js";import"./Typography-BpCcFgCs.js";import"./styled-BFYDQIR0.js";import"./useThemeProps-Dqkq_xij.js";import"./getThemeProps-jXOs3pzp.js";import"./createSvgIcon-goP6fANp.js";import"./SvgIcon-D08quMO8.js";import"./getValidReactChildren-BWccCPKZ.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-NNZ3telc.js";import"./context-CeZbWtx4.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DkF5K0_N.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-ufxIa7Mn.js";import"./hooks-D001HZ_G.js";import"./useTranslation-BTvbScQM.js";import"./IconButton-BJcuGlK9.js";import"./ButtonBase-fgbzlvIM.js";import"./useTimeout-CAUgCEbZ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DNkZLfmU.js";import"./useControlled-BjmXxUM9.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-SeF-jlW5.js";import"./useSlotProps-BYWaBF4F.js";import"./Popover-BRwnmwmz.js";import"./useSlot-BuNbhcF2.js";import"./Paper-BFoLHb1r.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CU8JZsfJ.js";import"./utils-C06F0_GZ.js";import"./Fade-7nvlBWGD.js";import"./Alert-B3Dz1xQs.js";import"./Tab-BzIYVN2h.js";import"./Button-DnetH9eQ.js";import"./axis-x-BAgE1uTm.js";import"./Box-BK6tP84J.js";import"./Select-aLwTZZZ3.js";import"./listItemTextClasses-DXNzZVcW.js";import"./MenuItem-DQzcnUDY.js";import"./dividerClasses-grkBmdn-.js";import"./ToggleButton-oSwJGI3X.js";import"./VelocitySlider-k8bGT4Vu.js";import"./Divider-oMDi41DX.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
