import{j as e,M as a,e as i,C as r}from"./iframe-B9F5iZda.js";import{useMDXComponents as n}from"./index-BLnTGf82.js";import{D as p}from"./JoggingPanel.stories-DG1MgfZq.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BeHNRB12.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-zdMddhfW.js";import"./useTheme-yxLqqDqL.js";import"./useLocalObservable-D4ObcsVZ.js";import"./Stack-ruSYhJ3p.js";import"./Typography-DqVhG7kq.js";import"./styled-D3Igtyhg.js";import"./useThemeProps-D8pmlMqC.js";import"./getThemeProps-BEbE1hzy.js";import"./createSvgIcon-DPz_DFR5.js";import"./SvgIcon-CpGJwWSR.js";import"./getValidReactChildren-2L1Citkn.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-D54vYJpq.js";import"./context-HY_5LgCr.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DgenPePO.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DOZ3TMgP.js";import"./hooks-D2YNkPPv.js";import"./useTranslation-CoyN_gLZ.js";import"./IconButton-Djj2i-TE.js";import"./ButtonBase-tzEInArf.js";import"./useTimeout-uivG_Tex.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Dyk6fQO3.js";import"./useControlled-DffW1y8K.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B1fBSrR0.js";import"./useSlotProps-Djl5Swys.js";import"./Popover-BgnnJ3Nz.js";import"./useSlot-nWFN0B3Q.js";import"./Paper-BPSUiw3x.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BpwCfqFs.js";import"./utils-Cvw1gOUC.js";import"./Fade-TGyLMQ_n.js";import"./Alert-BekP6s-G.js";import"./Tab-Bntd84va.js";import"./Button-C-xukK9K.js";import"./axis-x-CcI2kjiL.js";import"./rotation-DqNeC5rv.js";import"./JoggingCartesianAxisControl-2-pQP6Fl.js";import"./Box-DJoGMdib.js";import"./Select-Dc1Su7qb.js";import"./listItemTextClasses-D3W_ZLnm.js";import"./MenuItem-BXq2lZco.js";import"./dividerClasses-B-rJzWXx.js";import"./ToggleButton-DB60jxk2.js";import"./VelocitySlider-C_3OqW82.js";import"./Divider-D1_3hkMn.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
`,e.jsx(r,{of:p,sourceState:"none"}),`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
