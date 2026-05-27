import{j as e,M as p,e as i,C as r}from"./iframe-DzfWrSPr.js";import{useMDXComponents as n}from"./index-BOhUO5Fc.js";import{D as a}from"./JoggingPanel.stories-Dam4yRbm.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-EHt7X_28.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DksnX6Bs.js";import"./useTheme-pFzUWaqK.js";import"./useLocalObservable-D-7l3MHG.js";import"./Stack-DJuvZJyF.js";import"./Typography-DvmypobY.js";import"./styled-BxyiA9Wk.js";import"./useThemeProps-DLEjcKXI.js";import"./getThemeProps-BC6ADCv4.js";import"./createSvgIcon-B7TTzAlC.js";import"./SvgIcon-DrcM7-tb.js";import"./getValidReactChildren-BjV1Ux19.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CC2NvLCj.js";import"./context-BsWOb5tu.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CuXVFhFm.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BOpSaDJS.js";import"./hooks-CYPbh8pX.js";import"./useTranslation-D_kGHCZr.js";import"./IconButton-7j7aJIku.js";import"./ButtonBase-CHXd6DbZ.js";import"./useTimeout-CO9LbGyt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BHZHdISy.js";import"./useControlled-C73fIbx-.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-mUbZpGx1.js";import"./useSlotProps-CtCL7rPg.js";import"./Popover-C9KVxpWg.js";import"./useSlot-C1tSz0gq.js";import"./Paper-Cy9khsp7.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-4QvXWliX.js";import"./utils-BsvALDLy.js";import"./Fade-B0hFfAad.js";import"./Alert-mKDNu8Zk.js";import"./Tab-Bu-AdRB_.js";import"./Button-lv6k5ezl.js";import"./axis-x-CoU0IOU-.js";import"./rotation-BomBm8C0.js";import"./JoggingCartesianAxisControl-Bhg69Xnw.js";import"./Select-CG7p3Zhc.js";import"./listItemTextClasses-DtuEiL5J.js";import"./MenuItem-CBDQad_I.js";import"./dividerClasses-bdtJcw_r.js";import"./ToggleButton-D-7HenYI.js";import"./Box-C-I5h5KP.js";import"./VelocitySlider-BYtSYnQs.js";import"./Divider-DF6sKptc.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
