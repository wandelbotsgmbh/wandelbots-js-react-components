import{j as e,M as a,e as i,C as r}from"./iframe-DeM2dlXB.js";import{useMDXComponents as n}from"./index-pTg_E5nV.js";import{D as p}from"./JoggingPanel.stories-CwaQ0eQK.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Blda3_4w.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-ByCmrNHq.js";import"./useTheme-DXEkWXhe.js";import"./useLocalObservable-iPLtCFx0.js";import"./Stack-ClwOHmiG.js";import"./Typography-BGGlcvk4.js";import"./styled-B6xwWCeI.js";import"./useThemeProps-2cL-71wr.js";import"./getThemeProps-Cows3naL.js";import"./createSvgIcon-C_rZBQmf.js";import"./SvgIcon-BkI4IVFL.js";import"./getValidReactChildren-BNRuXSA9.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-Bs7Wd-OB.js";import"./context-DalZFnB3.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-C3MqscAl.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CS189fsV.js";import"./hooks-BwkFJGcK.js";import"./useTranslation-v0dx6B-k.js";import"./IconButton-BVGEiR_R.js";import"./ButtonBase-B_7b6jYD.js";import"./useTimeout-5ZCUeKvY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-2vv9mqRj.js";import"./useControlled-kwgz8Nro.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BY-JCkyx.js";import"./useSlotProps-CQxGFzh4.js";import"./Popover-D8vUVmH9.js";import"./useSlot-BeLMw7Pj.js";import"./Paper-DVa6y2Qz.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DF5J-mwq.js";import"./utils-DGMtgLpI.js";import"./Fade-B82O4YTs.js";import"./Alert-BtsBhsWX.js";import"./Tab-BiZt2rr8.js";import"./Button-C4BSGe6k.js";import"./axis-x-B4rgDX_Y.js";import"./rotation-Z1rvAP4a.js";import"./JoggingCartesianAxisControl-DTwtBCWJ.js";import"./Box-Bc6eAzlK.js";import"./Select-CIHomdi9.js";import"./listItemTextClasses-Wv11sEd0.js";import"./MenuItem-BARmsFpx.js";import"./dividerClasses-DbQZy1R3.js";import"./ToggleButton-EzXYTPyO.js";import"./VelocitySlider-DJ_afFiK.js";import"./Divider-CmNGqqIf.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
