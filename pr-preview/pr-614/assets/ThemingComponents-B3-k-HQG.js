import{j as e,M as a,e as i,C as r}from"./iframe-DOikaZn2.js";import{useMDXComponents as n}from"./index-Cab0K6UI.js";import{D as p}from"./JoggingPanel.stories-BgNP5U-k.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DAAcKDIA.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BWlGQlaR.js";import"./useTheme-MiEZSqX3.js";import"./useLocalObservable-tPZ6uFKS.js";import"./Stack-CxpqR0u_.js";import"./Typography-CDFgRY4g.js";import"./styled-C9gWAxgT.js";import"./useThemeProps-DiQSXTXj.js";import"./getThemeProps-aP9BRdJd.js";import"./createSvgIcon-C_kpDAhd.js";import"./SvgIcon-BT8_RdvD.js";import"./getValidReactChildren-BvTRrJkO.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-DQ3SdwYm.js";import"./context-oU1KEh3q.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Cqm7cZSx.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CeL2sBdE.js";import"./hooks-CRHJ5pZl.js";import"./useTranslation-Dtv0lsDI.js";import"./IconButton-aBBjPNzC.js";import"./ButtonBase-mBGbf_II.js";import"./useTimeout-Db-qi6l6.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Bed-Unaq.js";import"./useControlled-B7EQGe-I.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DMMedFAN.js";import"./useSlotProps-BuLkksFO.js";import"./Popover-yJXhyrM7.js";import"./useSlot-DT3ojdWR.js";import"./Paper-Al6e6jXj.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B8jM0h3J.js";import"./utils-DQfIvqGu.js";import"./Fade-4N0gbrRq.js";import"./Alert-CudYxJbx.js";import"./Tab-DTH_Ssvw.js";import"./Button-DpP2ynTk.js";import"./axis-x-Dxw0XXv3.js";import"./rotation-D7bLw0o2.js";import"./JoggingCartesianAxisControl-C0hHwMAf.js";import"./Box-bWYavhQA.js";import"./Select-DPzG3blr.js";import"./listItemTextClasses-7lEEtM3V.js";import"./MenuItem-s5UuIWAy.js";import"./dividerClasses-DDou6iqG.js";import"./ToggleButton-BDsRata3.js";import"./VelocitySlider-BCrV8jJf.js";import"./Divider-B4s8TrOW.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
