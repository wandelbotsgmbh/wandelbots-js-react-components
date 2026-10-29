import{j as e,M as s,e as r,C as i}from"./iframe-BhlBWSZR.js";import{useMDXComponents as n}from"./index-DiBes79Z.js";import{D as a}from"./JoggingPanel.stories-BERUzIPd.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DLx86jtW.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CmYzcTVI.js";import"./useTheme-Gt3OiB7t.js";import"./useLocalObservable-DzP16WKg.js";import"./Stack-C3Fdk60l.js";import"./Typography-Byg24-1_.js";import"./styled-BsImAE4J.js";import"./useThemeProps-DlTsXD3t.js";import"./getThemeProps-k-63bx6P.js";import"./createSvgIcon-DxjAq5r4.js";import"./SvgIcon-BSPHsXvA.js";import"./getValidReactChildren-CEmYW87A.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-mFj2eSAS.js";import"./context-B9TbbZ4R.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-Db975Rfp.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CcV5pxlx.js";import"./hooks-CsyL5JCX.js";import"./useTranslation-ZkZIQglv.js";import"./IconButton-BhcpJ3zO.js";import"./ButtonBase-BN2uQD9z.js";import"./useTimeout-BWGcR7MB.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DY6v8xZF.js";import"./useControlled-EoZqWi_W.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Bvm8x1qp.js";import"./useSlotProps-BBGzaLfO.js";import"./Popover-Dztx6h4q.js";import"./useSlot-DJCsDy7A.js";import"./Paper-BRMuTstt.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CoCFn1sK.js";import"./utils-D0bQDSZ2.js";import"./Fade-DOj5hkoo.js";import"./Alert-DAhUrVOI.js";import"./Tab-nP8--JCS.js";import"./Button-CoIbJ_A3.js";import"./axis-x-CUaqH2FQ.js";import"./Box-D5YiNWTF.js";import"./Select-BBfLdUiQ.js";import"./listItemTextClasses-CS1056KE.js";import"./MenuItem-hrMZ1nJe.js";import"./dividerClasses-Bf27BKDg.js";import"./ToggleButton-8QT2glU0.js";import"./VelocitySlider-CKQDktax.js";import"./Divider-C-wnn04I.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
