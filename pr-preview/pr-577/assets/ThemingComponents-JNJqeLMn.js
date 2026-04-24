import{j as e,M as a,e as i,C as r}from"./iframe-DL5e0S_l.js";import{useMDXComponents as n}from"./index-CSiFneDS.js";import{D as p}from"./JoggingPanel.stories-C1mlqDkm.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BKE1Ej3_.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-sPVwWBw_.js";import"./useTheme-Cr4RgH4M.js";import"./useLocalObservable-D2NQn3Qi.js";import"./Stack-CpZ7C_On.js";import"./Typography-Drrk7Ky8.js";import"./styled-CdcEW-fr.js";import"./useThemeProps-4xOdbMzs.js";import"./getThemeProps-yLNQyANG.js";import"./createSvgIcon-CtkL9aA9.js";import"./SvgIcon-Cqdtv9DW.js";import"./getValidReactChildren-VlVeyoPV.js";import"./index-Wo_1NHhm.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-C_hTTjRw.js";import"./externalizeComponent-Da5hHv6Y.js";import"./context-_HSbiEUw.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-C7w3jKCK.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DHLsWtdN.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DBshQJg6.js";import"./hooks-6R2ABYlb.js";import"./useTranslation-BLDf63eT.js";import"./IconButton-BjyUWtSk.js";import"./ButtonBase-DADJ_6-r.js";import"./useTimeout-BTfqadnm.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BfUHQUjU.js";import"./useControlled-DXiEyV09.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CpXDc-BL.js";import"./useSlotProps-T1YN27-s.js";import"./Popover-B03nG1sP.js";import"./useSlot-BFzBy1xU.js";import"./Paper-B7dLlJDe.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-D3CfJRNk.js";import"./utils-DQTc6dXX.js";import"./Fade-CgJmQRMA.js";import"./Alert-CAV3-WKY.js";import"./Tab-B57gIgF7.js";import"./Button-DxxNUKg6.js";import"./axis-x-CxeywzwP.js";import"./rotation-BgHpop5Y.js";import"./JoggingCartesianAxisControl-Bbg46pXH.js";import"./Select-CP-k7JJh.js";import"./listItemTextClasses-De5SEvu7.js";import"./MenuItem-CrnomkSQ.js";import"./dividerClasses-DWKa8iRs.js";import"./Box-CZhzKmzT.js";import"./ToggleButton-BaT4mW59.js";import"./VelocitySlider-CrkouasC.js";import"./Divider-qZh_sY3l.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
