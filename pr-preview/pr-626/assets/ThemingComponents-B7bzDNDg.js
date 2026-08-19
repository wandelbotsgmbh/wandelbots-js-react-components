import{j as e,M as s,e as r,C as i}from"./iframe-CnZ9Mng8.js";import{useMDXComponents as m}from"./index-1oJqwH9K.js";import{D as a}from"./JoggingPanel.stories-CNxbTfSa.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-wpFgS7ZC.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BVIODB1N.js";import"./useTheme-CMQDsrfD.js";import"./useLocalObservable-GE0RNDwt.js";import"./Stack-DYirZNf7.js";import"./Typography-Cd-WNHwN.js";import"./styled-LQF_JMND.js";import"./useThemeProps-CR1z2hYz.js";import"./getThemeProps-Cgwt0oxK.js";import"./createSvgIcon-_KPFtV3u.js";import"./SvgIcon-Bm-wnoir.js";import"./getValidReactChildren-tqIIn5Mb.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-_3tG58oM.js";import"./context-qGUtD0ut.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-A3Yb6f33.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DtVvouVM.js";import"./hooks-BoSQGGdr.js";import"./useTranslation-C5Dz8biH.js";import"./IconButton-C4rly0he.js";import"./ButtonBase-_Bt-dsyf.js";import"./useTimeout-B6-6SsYi.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-C_PP4G5B.js";import"./useControlled-D3AhS6zk.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CfsmG-gm.js";import"./useSlotProps-BQ1XW5do.js";import"./Popover-DX3KcAEq.js";import"./useSlot-D7StEfVB.js";import"./Paper-BPzQwQda.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BevpjGuD.js";import"./utils-BrcR983F.js";import"./Fade-DJe09_M-.js";import"./Alert-dp2Lf24h.js";import"./Tab-DaVODwfF.js";import"./Button-Ct0c-m0P.js";import"./axis-x-Cp2Ia8L2.js";import"./Box-Bnmyl29q.js";import"./Select-FAye96_6.js";import"./listItemTextClasses-BJa8uoB5.js";import"./MenuItem-KrkwzG1R.js";import"./dividerClasses-D9AGWgEr.js";import"./ToggleButton-CnW1gksd.js";import"./VelocitySlider-ycslZudA.js";import"./Divider-DXOpNvLs.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
