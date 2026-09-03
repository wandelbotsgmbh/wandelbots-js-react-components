import{j as e,M as s,e as r,C as i}from"./iframe-Dm6jcncn.js";import{useMDXComponents as n}from"./index-D1qU77Il.js";import{D as a}from"./JoggingPanel.stories-5_lqGONu.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-BG8ff8ZC.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DMY9vike.js";import"./useTheme-Bri5kmPW.js";import"./useLocalObservable-BqG6iSAx.js";import"./Stack-DQ3H5ZFG.js";import"./Typography-ySm70typ.js";import"./styled-BMlA1CF6.js";import"./useThemeProps-DFZmpcoV.js";import"./getThemeProps-DLFonx5W.js";import"./createSvgIcon-VwN9eH0O.js";import"./SvgIcon-DhMKheaS.js";import"./getValidReactChildren-BM7AX112.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-B9hn1_kS.js";import"./context-qK1fYBkc.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-DLKmdOM1.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BfEyXoQh.js";import"./hooks-CT6iGKTy.js";import"./useTranslation-CuqNDjy6.js";import"./IconButton-DsFTMB4Z.js";import"./ButtonBase-2znkRrXt.js";import"./useTimeout-BS4gSS4F.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D0MK-wwN.js";import"./useControlled-Dq48Cbjr.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BshJEO3y.js";import"./useSlotProps-Dr3tMw5C.js";import"./Popover-BBNYS7SO.js";import"./useSlot-D5zs2RfM.js";import"./Paper-yQc4B77S.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B7_6nmB6.js";import"./utils-hzNV6h3P.js";import"./Fade-BhkX6A2J.js";import"./Alert-CT0nXhmN.js";import"./Tab-BKM7UqMF.js";import"./Button-DFNapvNV.js";import"./axis-x-D1elhTc-.js";import"./Box-kDg82Vig.js";import"./Select-Dy1tibfT.js";import"./listItemTextClasses-CH3HfcII.js";import"./MenuItem-C2djCXiM.js";import"./dividerClasses-CBzuBNGP.js";import"./ToggleButton-BHieImcN.js";import"./VelocitySlider-BmhfhL6P.js";import"./Divider-BaX25ODv.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
