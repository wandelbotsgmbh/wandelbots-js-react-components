import{j as e,M as p,e as i,C as r}from"./iframe-dhOuvM8D.js";import{useMDXComponents as n}from"./index-BofxRCp_.js";import{D as a}from"./JoggingPanel.stories-C2U_Agcn.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-_lwljGQJ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DepYaynq.js";import"./useTheme-DlbuQjGV.js";import"./useLocalObservable-BzpcMRgp.js";import"./Stack-CCB_6TEs.js";import"./Typography-D3iOPdMx.js";import"./styled-Cd2_dVog.js";import"./useThemeProps-CgL90HkU.js";import"./getThemeProps-B19nLseI.js";import"./createSvgIcon-PgI1tX6L.js";import"./SvgIcon-BTooWbP3.js";import"./getValidReactChildren-DGbAzUsx.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B0wZ8b20.js";import"./context-Bz2fzNSr.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-BSiQjMXq.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BovQiOuI.js";import"./hooks-MAEIlcdH.js";import"./useTranslation-BgExkeUZ.js";import"./IconButton-CtSMArGg.js";import"./ButtonBase-BSJrCdxZ.js";import"./useTimeout-BFQMwTB5.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Dx4s8XEv.js";import"./useControlled-DxgpyFPb.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CK7QCHnT.js";import"./useSlotProps-CXohapnH.js";import"./Popover-DGOuvxSN.js";import"./useSlot-he-k2HYu.js";import"./Paper-Bn0h6Lpv.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CCB8IO1F.js";import"./utils-Da7caJRk.js";import"./Fade-opRMPXK0.js";import"./Alert-6vm7AQdZ.js";import"./Tab-BASBy4nN.js";import"./Button-DolDkrT7.js";import"./axis-x-Djmkv01y.js";import"./rotation-DOz8n3DB.js";import"./JoggingCartesianAxisControl-wXw1EDcQ.js";import"./Select-CAxWlGBD.js";import"./listItemTextClasses-BPErteJA.js";import"./MenuItem-DmQwfvOO.js";import"./dividerClasses-BF0nc_IV.js";import"./Box-DOz5anPS.js";import"./ToggleButton-Dp3aU-vq.js";import"./VelocitySlider-CY-JVx27.js";import"./Divider-Dn4mQRTI.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
