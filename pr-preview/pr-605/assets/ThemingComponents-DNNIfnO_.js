import{j as e,M as p,e as i,C as r}from"./iframe-DtiRLENr.js";import{useMDXComponents as n}from"./index-Ckte2jAc.js";import{D as a}from"./JoggingPanel.stories-rtqugE5A.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DD4hK9nN.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B29k2Z6t.js";import"./useTheme-DGw6sctI.js";import"./useLocalObservable-tZvHIlQX.js";import"./Stack-DWZJAes8.js";import"./Typography-CbqdGqIA.js";import"./styled-C-S2gy1s.js";import"./useThemeProps-84FL5F3q.js";import"./getThemeProps-D7c4XuWz.js";import"./createSvgIcon-N7Tnr47b.js";import"./SvgIcon-dUljdHEN.js";import"./getValidReactChildren-JkuvTBtb.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-Czyi4ZjS.js";import"./context-7xJ7erWY.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-CQCxWSu9.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BdEX7X38.js";import"./hooks-CCtcoWL4.js";import"./useTranslation-09t5emci.js";import"./IconButton-DgBu6amV.js";import"./ButtonBase-CVBkE61i.js";import"./useTimeout-DciHL5hH.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-e1Ufz6Tt.js";import"./useControlled-7_zBQ-7P.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DXgBOhoI.js";import"./useSlotProps-CHpSAnQI.js";import"./Popover-Cn9crKEa.js";import"./useSlot-Ba29BbID.js";import"./Paper-DTC4QZjN.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DOofyrSN.js";import"./utils-Czag9zuk.js";import"./Fade-CRhzyC-S.js";import"./Alert-OlkaQjGT.js";import"./Tab-CbIO47yy.js";import"./Button-7t4pJR4X.js";import"./axis-x-CkalnZFQ.js";import"./rotation-7PyGv4YX.js";import"./JoggingCartesianAxisControl-DzUIVEAI.js";import"./Select-IgOIgipA.js";import"./listItemTextClasses-DoJm4fOu.js";import"./MenuItem-DBac0KC1.js";import"./dividerClasses-B2xlyl9b.js";import"./Box-zvvdYgkw.js";import"./ToggleButton-aDcDrI5p.js";import"./VelocitySlider-CFCpLo2L.js";import"./Divider-BkjaGoMT.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:a,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme({
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
`,e.jsx(r,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(i,{dark:!0,code:`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function we(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{we as default};
