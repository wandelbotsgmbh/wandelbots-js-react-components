import{j as e,M as s,e as r,C as i}from"./iframe-CFoP9jN5.js";import{useMDXComponents as n}from"./index-BDFp8MOR.js";import{D as a}from"./JoggingPanel.stories-yrOqbjdW.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-L65xRY2O.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DgLwXr1K.js";import"./useTheme-BOonRYZ1.js";import"./useLocalObservable-BL-yq5kq.js";import"./Stack-BjaExvKF.js";import"./Typography-CqqRKYoO.js";import"./styled-DKQ2PoAh.js";import"./useThemeProps-BnfDRSfN.js";import"./getThemeProps-BU5MPTj2.js";import"./createSvgIcon-BNUS_1B0.js";import"./SvgIcon-Ck1sFqon.js";import"./getValidReactChildren-BkzdQ88k.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-BtY_6Jm0.js";import"./context-CNFP59DB.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BhlicnA7.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C8citgOt.js";import"./hooks-bBfedl-o.js";import"./useTranslation-DHMAmPyP.js";import"./IconButton-CL4iDnMS.js";import"./ButtonBase-K4Rwa3h7.js";import"./useTimeout-BSnwyZ2B.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DG2KfczU.js";import"./useControlled-DGPptLn0.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CF_p-w0N.js";import"./useSlotProps-C6_G92FL.js";import"./Popover-B3R6wwIj.js";import"./useSlot-BTtZ_q25.js";import"./Paper-BdVbPhUi.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DXI6gLsu.js";import"./utils-BN9l69iS.js";import"./Fade-Di8QG6WX.js";import"./Alert-BvJkqXz8.js";import"./Tab-sTGGawq2.js";import"./Button-Dy5I_Kvy.js";import"./axis-x-O1CwZRjD.js";import"./rotation-Df1o266e.js";import"./JoggingCartesianAxisControl-DNW8YFi-.js";import"./Box-iCJ4afvA.js";import"./Select-C-3WWtEo.js";import"./listItemTextClasses-PH9M2X7m.js";import"./MenuItem-D5_CPTs6.js";import"./dividerClasses-B0QCCtsS.js";import"./ToggleButton-j7BiYLn0.js";import"./VelocitySlider-CT3y7rzx.js";import"./Divider-HYiXAryb.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
