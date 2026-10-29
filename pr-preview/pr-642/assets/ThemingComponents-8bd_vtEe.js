import{j as e,M as s,e as r,C as i}from"./iframe-CHRrQrpf.js";import{useMDXComponents as n}from"./index-D7iVsuG-.js";import{D as a}from"./JoggingPanel.stories-Cblvp8IU.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-nHmouYPo.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CA7Pcsd9.js";import"./useTheme-14eFBSLu.js";import"./useLocalObservable-CK3VrntY.js";import"./Stack-chcLftao.js";import"./Typography-scsTkIWG.js";import"./styled-Czcq0AwZ.js";import"./useThemeProps-N-UYjPi1.js";import"./getThemeProps-BrgMGzIv.js";import"./createSvgIcon-pw13r3-e.js";import"./SvgIcon-3NA9EXNl.js";import"./getValidReactChildren-BekppnJ6.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-DE-553Eg.js";import"./context-jM6KHFiw.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-CVfgvaXz.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CDEFk6MC.js";import"./hooks-CJpKxu3k.js";import"./useTranslation-DgJIWOkJ.js";import"./IconButton-DZz85T-S.js";import"./ButtonBase-CLMrMBL2.js";import"./useTimeout-DX5FA95s.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DSlQwd6p.js";import"./useControlled-BBuMN09C.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-EWh3k8H1.js";import"./useSlotProps-0vt-uzNm.js";import"./Popover-axjAzeZl.js";import"./useSlot-MrVdrNIp.js";import"./Paper-BgUFvY5I.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-gLv9JpB-.js";import"./utils-BpoNUnYa.js";import"./Fade-ChgJ7mm7.js";import"./Alert-Bwb8LO5U.js";import"./Tab-D-I1BrML.js";import"./Button-CbJiUMaX.js";import"./axis-x-B6sE3uNl.js";import"./Box-W09X9YSz.js";import"./Select-cTCdab8B.js";import"./listItemTextClasses-BSUch6BX.js";import"./MenuItem-Bn-875Ae.js";import"./dividerClasses-jsROuSr_.js";import"./ToggleButton-BBzZWUnx.js";import"./VelocitySlider-OAizjgZt.js";import"./Divider-BSmH7X2a.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
