import{j as e,M as a,e as i,C as r}from"./iframe-CpUKlncv.js";import{useMDXComponents as n}from"./index-CWkA06wa.js";import{D as p}from"./JoggingPanel.stories-BqRoOhZw.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-wWKPF_Qp.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-SBQdlFb3.js";import"./useTheme-D8cDHp8q.js";import"./useLocalObservable-BgY9cam5.js";import"./Stack-R1iheqkd.js";import"./Typography-DupreqQF.js";import"./styled-Dvms5KRu.js";import"./useThemeProps-D94sfPpT.js";import"./getThemeProps-rODPrKUx.js";import"./createSvgIcon-Ci6L_j4k.js";import"./SvgIcon-CAcr4Ch0.js";import"./getValidReactChildren-C-2NJYVj.js";import"./index-CIjxX3Ul.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-Cno-CCm3.js";import"./externalizeComponent-Bwpi0YXV.js";import"./context-DpBUgnSd.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DiSPItOJ.js";import"./converters-DABMUzRG.js";import"./CircularProgress-noRxEc5w.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DCczroSX.js";import"./hooks-DzfLADr-.js";import"./useTranslation-DNR4ereO.js";import"./IconButton-43bHWoQk.js";import"./ButtonBase-CeKP6lH-.js";import"./useTimeout-DYojldLV.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CgqOu8zd.js";import"./useControlled-GnzUNTcZ.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Blt9sFy3.js";import"./useSlotProps-DOk7hy72.js";import"./Popover-CHpvEMV1.js";import"./useSlot-BQrLGsuy.js";import"./Paper-D26N1_LG.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-CT0o4a4g.js";import"./utils-DuECi3Zb.js";import"./Fade-DThocLAa.js";import"./Alert-Dah04zma.js";import"./Tab-4JWcE3Lg.js";import"./Button-Dlegblqu.js";import"./axis-x-BHij9S0C.js";import"./rotation-Dj5uNjbb.js";import"./JoggingCartesianAxisControl-Cr3Wlx-v.js";import"./Select-CH4ri50D.js";import"./listItemTextClasses-DLjdz3Dn.js";import"./MenuItem-pS0K8BwJ.js";import"./dividerClasses-CTlFQKjB.js";import"./Box-C4kGhlzZ.js";import"./ToggleButton-DI65bc5p.js";import"./VelocitySlider-CJLo7oB5.js";import"./Divider-Bkotv3fU.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
