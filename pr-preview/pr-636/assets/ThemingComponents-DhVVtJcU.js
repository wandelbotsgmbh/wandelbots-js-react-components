import{j as e,M as s,e as r,C as i}from"./iframe-Ba2IKQt4.js";import{useMDXComponents as n}from"./index-CI4M6hsn.js";import{D as a}from"./JoggingPanel.stories-CfXOntuj.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-BeG1Z-AO.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CUv-2ooQ.js";import"./useTheme-Bd3j7BQU.js";import"./useLocalObservable-CDWTXvo2.js";import"./Stack-DnW68pGL.js";import"./Typography-CuK8FJXG.js";import"./styled-0xP5rHfk.js";import"./useThemeProps-_MAURq4F.js";import"./getThemeProps-TwCxgvSa.js";import"./createSvgIcon-C32sSfhx.js";import"./SvgIcon-BzPmyYxb.js";import"./getValidReactChildren-o_7xvp53.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-D5IOm6I6.js";import"./context-BefEgr-r.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-BwVJelX5.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C6gDRkIN.js";import"./hooks-BdgpvHHa.js";import"./useTranslation-BWb62jZZ.js";import"./IconButton-HdspM6zu.js";import"./ButtonBase-P2V8yCSY.js";import"./useTimeout-Dj9r2-70.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DQTslOaj.js";import"./useControlled-xzdmvjdv.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CM_rgZsI.js";import"./useSlotProps-DC7R9NCP.js";import"./Popover-BPDxwfBY.js";import"./useSlot-DTXU092J.js";import"./Paper-DCb0OlrC.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-AlUYG3Xq.js";import"./utils-BagDn_k3.js";import"./Fade-PZfov9YT.js";import"./Alert-JgDo4PCL.js";import"./Tab-CXNXp91p.js";import"./Button-BR7kCRcP.js";import"./axis-x-D19Txswo.js";import"./Box-C-RoxQTp.js";import"./Select-D5R3rZZl.js";import"./listItemTextClasses-6Q18s3DA.js";import"./MenuItem-BGD07v7T.js";import"./dividerClasses-Bt26paer.js";import"./ToggleButton-Pp4bc_zO.js";import"./VelocitySlider-B2O61fTS.js";import"./Divider-CzHs_M4_.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
