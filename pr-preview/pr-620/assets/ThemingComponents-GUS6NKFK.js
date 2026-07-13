import{j as e,M as s,e as r,C as i}from"./iframe-DYyNtN06.js";import{useMDXComponents as n}from"./index-DOy4v5ZT.js";import{D as a}from"./JoggingPanel.stories-CyXWHLk6.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-CxsnyBft.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BF4_id_r.js";import"./useTheme-D6VgL8HS.js";import"./useLocalObservable-BzBI_s65.js";import"./Stack-C6xDQ_wI.js";import"./Typography-CMcz4DFJ.js";import"./styled-BiXrH4p5.js";import"./useThemeProps-anOV7Es0.js";import"./getThemeProps-ESRjCcgF.js";import"./createSvgIcon-Ci9MBYBu.js";import"./SvgIcon-B5iUi_dv.js";import"./getValidReactChildren-BCv1lHhn.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-Dpc_CLIh.js";import"./context-DZFEO8-v.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B7l9M-5O.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DOuRSNqC.js";import"./hooks-Dg2oeIXr.js";import"./useTranslation-gcD6CVL1.js";import"./IconButton-CNYpAeVC.js";import"./ButtonBase-Ctd8q0yy.js";import"./useTimeout-C61zSYzb.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-pa7340h0.js";import"./useControlled-DoH44Ezb.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CbgCMPNG.js";import"./useSlotProps-e4iicfoB.js";import"./Popover-C4qql3I-.js";import"./useSlot-DIBM1CTl.js";import"./Paper-CNEqEsvG.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DFZiaYYd.js";import"./utils-BzVUSSgS.js";import"./Fade-JQaZ39Q6.js";import"./Alert-DuPx0zwz.js";import"./Tab-DeyIqOHP.js";import"./Button-1wIGWp2J.js";import"./axis-x-DFYs0U3g.js";import"./rotation-BieLM9HL.js";import"./JoggingCartesianAxisControl-o_VRdLvI.js";import"./Box-x1NN5IwL.js";import"./Select-DafOBTYl.js";import"./listItemTextClasses-Cjw61rjP.js";import"./MenuItem-Nvjge9s1.js";import"./dividerClasses-h4uMIfRF.js";import"./ToggleButton-DbrV262m.js";import"./VelocitySlider-ClmMl_yB.js";import"./Divider-BMn-4DDQ.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
