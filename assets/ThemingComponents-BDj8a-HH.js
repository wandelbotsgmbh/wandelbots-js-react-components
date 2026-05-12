import{j as e,M as p,e as i,C as r}from"./iframe-cfdVx8Cc.js";import{useMDXComponents as n}from"./index-zMY1CA4i.js";import{D as a}from"./JoggingPanel.stories-CtGw3Wkf.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-C3OFqUNi.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CEvamZOH.js";import"./useTheme-ChZm421A.js";import"./useLocalObservable-B6hUbUjm.js";import"./Stack-suQcEKDY.js";import"./Typography-6afosi2l.js";import"./styled-D_e4LsFS.js";import"./useThemeProps-C9w_Ca8v.js";import"./getThemeProps-CZO3bs5z.js";import"./createSvgIcon-C2wYP7B7.js";import"./SvgIcon-ujziTsxV.js";import"./getValidReactChildren-C4hcGp-c.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-O9XMYABf.js";import"./context-BVsrAZlT.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DQcCngpD.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DRCzw0H2.js";import"./hooks-DLNG519z.js";import"./useTranslation-Dl7gv-kW.js";import"./IconButton-DpR_Az12.js";import"./ButtonBase-xbXnwGNz.js";import"./useTimeout-BxZAkZQt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BnFd1YwE.js";import"./useControlled-Bb7Ltx_b.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-9TP3HNR3.js";import"./useSlotProps-DrYlhehi.js";import"./Popover-IVTowpQa.js";import"./useSlot-DL1AA0MN.js";import"./Paper-BAHsxK1c.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-6liuLpfF.js";import"./utils-BpNTcCS8.js";import"./Fade-CoXXWFFx.js";import"./Alert-Cjcbe6Pa.js";import"./Tab-Cr8C2rMo.js";import"./Button-BGMqq5mX.js";import"./axis-x-B0BXkspM.js";import"./rotation-CJAB3g_e.js";import"./JoggingCartesianAxisControl-4Hv47LSR.js";import"./Select-Z-79C6p3.js";import"./listItemTextClasses-2OKd2yhF.js";import"./MenuItem-Swgjmc3j.js";import"./dividerClasses-wX7qLEgB.js";import"./Box-2iBkKvbV.js";import"./ToggleButton-UQinItQa.js";import"./VelocitySlider-K-wvHGww.js";import"./Divider-_lVvx4WV.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
