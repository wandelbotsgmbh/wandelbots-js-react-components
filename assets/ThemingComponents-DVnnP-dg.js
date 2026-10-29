import{j as e,M as s,e as r,C as i}from"./iframe-thrxo2Nv.js";import{useMDXComponents as n}from"./index-BENrqwg9.js";import{D as a}from"./JoggingPanel.stories-DGBr7pFr.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-B4Poz2BT.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BoTvZ4AC.js";import"./useTheme-CUJqkKyv.js";import"./useLocalObservable-D26gGSsO.js";import"./Stack-Cy_XserE.js";import"./Typography-DQDqRtH5.js";import"./styled-OTyuFKS0.js";import"./useThemeProps-COHJr5Jc.js";import"./getThemeProps-Cw2ehNnN.js";import"./createSvgIcon-D-QAyx8G.js";import"./SvgIcon-Czt8aDBR.js";import"./getValidReactChildren-Bp60WvUU.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-C1xl5akl.js";import"./context-D2CMOXZU.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-BHOpG9pC.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Bpvrrqo3.js";import"./hooks-CS9vnErw.js";import"./useTranslation-CsIxc40s.js";import"./IconButton-BTzc7LFi.js";import"./ButtonBase-BBm3c9gu.js";import"./useTimeout-CymiKGsG.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BN0Hkb9G.js";import"./useControlled-opMXDOo7.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C8AaGziJ.js";import"./useSlotProps-KIMnxfFm.js";import"./Popover-TNgCtkaB.js";import"./useSlot-B3_ip8PF.js";import"./Paper-DwQ1eQyY.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D5iKhnWE.js";import"./utils-BTzuTdVV.js";import"./Fade-5W3Sj3pk.js";import"./Alert-CUx4KYwh.js";import"./Tab-CG1cF87y.js";import"./Button-BLtAvx2H.js";import"./axis-x-PecEyAb4.js";import"./Box-D39Zps6G.js";import"./Select-DuD9aif9.js";import"./listItemTextClasses-BPgoyIvV.js";import"./MenuItem-CJaNj_cT.js";import"./dividerClasses-D2RQns_9.js";import"./ToggleButton-CiZtngi2.js";import"./VelocitySlider-DSO_Pr_r.js";import"./Divider-CQq-EbTl.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
