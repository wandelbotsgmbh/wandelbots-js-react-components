import{j as e,M as s,e as r,C as i}from"./iframe-3_1gAL3j.js";import{useMDXComponents as n}from"./index-CsGV3ZIf.js";import{D as a}from"./JoggingPanel.stories-BejAzjua.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DfFU-h07.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DAa-9Sif.js";import"./useTheme-0LdBglcA.js";import"./useLocalObservable--gp340nX.js";import"./Stack-CCNeUVvZ.js";import"./Typography-D3RtMN4n.js";import"./styled-xTHTdLIU.js";import"./useThemeProps-BaUP9mfX.js";import"./getThemeProps-BYWAdWcC.js";import"./createSvgIcon-DuwO-KD2.js";import"./SvgIcon-Bh49S5AI.js";import"./getValidReactChildren-Dy4J5mHE.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-CMLcXRvL.js";import"./context-CCseGEkZ.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-Cm-iQgwH.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BbxeYvFs.js";import"./hooks-zJ0e6Dx3.js";import"./useTranslation-Czaxo_CC.js";import"./IconButton-B9x48uNM.js";import"./ButtonBase-Bkrehxee.js";import"./useTimeout-Cl2tIbht.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DnbJor-6.js";import"./useControlled-CJ0nSNud.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-NjS1ZH_j.js";import"./useSlotProps-BhfcMN_f.js";import"./Popover-BN8HVKgy.js";import"./useSlot-DkQUSlOw.js";import"./Paper-uy4c7uUj.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-zQa3Mibf.js";import"./utils-cTlRF3Sf.js";import"./Fade-Dbf4LSmZ.js";import"./Alert-BeSBAkCQ.js";import"./Tab-CQecjpD3.js";import"./Button-D2lOmjnP.js";import"./axis-x-BGjRvglN.js";import"./Box-DTfyUXIw.js";import"./Select-B8E-pHkL.js";import"./listItemTextClasses-C1SCsOsk.js";import"./MenuItem-Bcc3LLWD.js";import"./dividerClasses-uDut7PLy.js";import"./ToggleButton-DV-v8qPG.js";import"./VelocitySlider-WBivAwX-.js";import"./Divider-CH8NiybY.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
