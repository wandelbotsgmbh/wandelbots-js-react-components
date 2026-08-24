import{j as e,M as s,e as r,C as i}from"./iframe-Cfpn6AnA.js";import{useMDXComponents as m}from"./index-CEipWoxG.js";import{D as a}from"./JoggingPanel.stories-CRCtz0ab.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-BpzxjsRh.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CbBFWTNj.js";import"./useTheme-B6scBczm.js";import"./useLocalObservable-BSLS_h-v.js";import"./Stack-4bJiq57Y.js";import"./Typography-CErKEqpU.js";import"./styled-BoiceWH7.js";import"./useThemeProps-Cb3OjXe3.js";import"./getThemeProps-DAII0hVq.js";import"./createSvgIcon-Cnnf11au.js";import"./SvgIcon-Ds_UxC8s.js";import"./getValidReactChildren-B-AWzSTg.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-BZdo9UBH.js";import"./context-qz4xXuXR.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BFRoVToB.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DGAIMoUa.js";import"./hooks-DzZ12S6c.js";import"./useTranslation-CLnPKG-h.js";import"./IconButton-BSt3XNo9.js";import"./ButtonBase-vziP4r3Q.js";import"./useTimeout-DCUfdBrU.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Decf1MmP.js";import"./useControlled-BKtRi9Kf.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DPSOiPkq.js";import"./useSlotProps-Df1FhVcq.js";import"./Popover-DROQg7O5.js";import"./useSlot-BFUtYE45.js";import"./Paper-BRm-pAJ_.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BEQ85evd.js";import"./utils-D6e1KYsT.js";import"./Fade-BRvJafNo.js";import"./Alert-CrwjVA6J.js";import"./Tab-BQ1tiPQa.js";import"./Button-B2b0n6BO.js";import"./axis-x-wB6zPUsE.js";import"./Box-Bth11ovj.js";import"./Select-peYPYfqb.js";import"./listItemTextClasses-bp71X-AF.js";import"./MenuItem-ub1-8F3T.js";import"./dividerClasses-xorLfWyY.js";import"./ToggleButton-BUfZ99v7.js";import"./VelocitySlider-CLW9jB86.js";import"./Divider-BD_wL247.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
