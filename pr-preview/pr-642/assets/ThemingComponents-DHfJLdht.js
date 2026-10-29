import{j as e,M as s,e as r,C as i}from"./iframe-DQSx3FpI.js";import{useMDXComponents as n}from"./index-tGrfmCc8.js";import{D as a}from"./JoggingPanel.stories-U7PpuADr.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-VigOizJe.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-p6sASWlq.js";import"./useTheme-BBMANvYx.js";import"./useLocalObservable-DydgWij_.js";import"./Stack-BpFn-_6R.js";import"./Typography-Ku1V1lcB.js";import"./styled-C8c8ewel.js";import"./useThemeProps-DSlVNiCA.js";import"./getThemeProps-Jr__qZNO.js";import"./createSvgIcon-DpxcV1wl.js";import"./SvgIcon-Coh3-2pB.js";import"./getValidReactChildren-BB7qmbJz.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-CW7p8V6I.js";import"./context-DizzZv2X.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-pGSHK5z0.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DJFKLKaA.js";import"./hooks-Dg7hcLp6.js";import"./useTranslation-BmPVaMTz.js";import"./IconButton-CFSqMTzQ.js";import"./ButtonBase-D06kRmmp.js";import"./useTimeout-BVxqqW_f.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-C0NqLS4G.js";import"./useControlled-J8dlEwwH.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-9GD2WVoK.js";import"./useSlotProps-DvusYCcv.js";import"./Popover-nF8PhaFQ.js";import"./useSlot-DUBklCtE.js";import"./Paper-DhkDwtKD.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-lyZlFCYD.js";import"./utils-n-5vLEiA.js";import"./Fade-BZb8OeI_.js";import"./Alert-aEF6dX8L.js";import"./Tab-eSyWAD8Q.js";import"./Button-BAU3USEP.js";import"./axis-x-BU3Idq0O.js";import"./Box-D5mZh4HN.js";import"./Select-DS04mur0.js";import"./listItemTextClasses-CemFiV0k.js";import"./MenuItem-NoKH6NjH.js";import"./dividerClasses-DtTxKCNl.js";import"./ToggleButton-Sil-EiaA.js";import"./VelocitySlider-DP0AmEuH.js";import"./Divider-BMvwisZG.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
