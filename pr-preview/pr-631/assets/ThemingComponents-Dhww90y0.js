import{j as e,M as s,e as r,C as i}from"./iframe-DVABygGB.js";import{useMDXComponents as n}from"./index-FD8o0OGF.js";import{D as a}from"./JoggingPanel.stories-Ch9jzUnv.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-QsL43mPH.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Dd-CTDOS.js";import"./useTheme-o35uV6O-.js";import"./useLocalObservable-GFfQCHcq.js";import"./Stack-Cq707yTR.js";import"./Typography-opa92pxK.js";import"./styled-CZ_inNSq.js";import"./useThemeProps-D1ZVKsgN.js";import"./getThemeProps-VrgOpOq4.js";import"./createSvgIcon-BxnmXMCS.js";import"./SvgIcon-CAK9whZL.js";import"./getValidReactChildren-BuWC21AR.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-B2-IdwDO.js";import"./context-BXUSAXvA.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-DbKSzzOa.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CNbj0ipm.js";import"./hooks-DOG0M4p0.js";import"./useTranslation-CLAbGEI8.js";import"./IconButton-Bq5Zq_jm.js";import"./ButtonBase-DuZV6Rh1.js";import"./useTimeout-CaF7kKa6.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DFpCWrJh.js";import"./useControlled-dTJo4MDw.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Bt-plzGd.js";import"./useSlotProps-DUGzrhIo.js";import"./Popover-CcgJKWBi.js";import"./useSlot-C8Pjq9xN.js";import"./Paper-tXuYQBmX.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Boz6v1X4.js";import"./utils-BnKYtJRX.js";import"./Fade-CAWlMldG.js";import"./Alert-B1FcaLwz.js";import"./Tab-Wx1YwtYL.js";import"./Button-SiU2wBhD.js";import"./axis-x-Cqu4sxRH.js";import"./Box-C_oyWmqa.js";import"./Select-CH1PRBEz.js";import"./listItemTextClasses-Cl0fFQXA.js";import"./MenuItem-S6pInyrF.js";import"./dividerClasses-CvoeQLaf.js";import"./ToggleButton-QAbAEBXa.js";import"./VelocitySlider-C_eBu2Za.js";import"./Divider-VDKWHRDO.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
