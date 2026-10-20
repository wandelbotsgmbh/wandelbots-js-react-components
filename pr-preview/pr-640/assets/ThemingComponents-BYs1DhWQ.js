import{j as e,M as s,e as r,C as i}from"./iframe-Dv2r0G3e.js";import{useMDXComponents as n}from"./index-CELfvErL.js";import{D as a}from"./JoggingPanel.stories-cGUgqH2f.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-rQsUEyrZ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DiQNYaWC.js";import"./useTheme-CKN4NDlc.js";import"./useLocalObservable-iItvMiE1.js";import"./Stack-DTNpShGK.js";import"./Typography-Ds9vyzS4.js";import"./styled-9A3zxk-n.js";import"./useThemeProps-CmaU1Veu.js";import"./getThemeProps-CDDjZIKX.js";import"./createSvgIcon-BpJ8uP8L.js";import"./SvgIcon-CB-nOVX_.js";import"./getValidReactChildren-BbImeSDi.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-DBQGefFw.js";import"./context-CkE3Rfbh.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-CqV9fE9p.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CQSqwhBT.js";import"./hooks-ois5_7OT.js";import"./useTranslation-BoMUJbmv.js";import"./IconButton-DnvKRAfC.js";import"./ButtonBase-CDA8rKA0.js";import"./useTimeout-CVL163BM.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BFujeFKv.js";import"./useControlled-DX04tJ_E.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D-vcIFUH.js";import"./useSlotProps-DPtkVV5v.js";import"./Popover-BYdt8hb0.js";import"./useSlot-ammARZYG.js";import"./Paper-HfafaySq.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-83k3OflH.js";import"./utils-ClRydWZj.js";import"./Fade-Qd4Qpw4O.js";import"./Alert-ClPWko4X.js";import"./Tab-YZMwmekB.js";import"./Button-BcRysXfd.js";import"./axis-x-DRUkUeor.js";import"./Box-BgUM0WAG.js";import"./Select-CGbz64Zw.js";import"./listItemTextClasses-BDzQl4uW.js";import"./MenuItem-Dj8oNNVh.js";import"./dividerClasses-BvRvRkcP.js";import"./ToggleButton-Bk4eMZuo.js";import"./VelocitySlider-DcFE1mr_.js";import"./Divider-mTyUSqqN.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
