import{j as e,M as p,e as i,C as r}from"./iframe-DE2njiz1.js";import{useMDXComponents as n}from"./index-vAsu4v3Y.js";import{D as a}from"./JoggingPanel.stories-Dikdf3kP.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-GhtkePUi.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CHCS9h0a.js";import"./useTheme-DOBygOzZ.js";import"./useLocalObservable-3b9EqTzl.js";import"./Stack-tNVO4PVc.js";import"./Typography-BlRZVuTA.js";import"./styled-DMKZ1Toz.js";import"./useThemeProps-C0Dzrly5.js";import"./getThemeProps-C80AW5gi.js";import"./createSvgIcon-eU0KLI9t.js";import"./SvgIcon-DhP8axsb.js";import"./getValidReactChildren-D5qNA3-s.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B4itn4pz.js";import"./context-CbuTCtHY.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BSgxhpaX.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-tcfhiZHp.js";import"./hooks-BT5B75a2.js";import"./useTranslation-WELs7p-b.js";import"./IconButton-BCBaOQDG.js";import"./ButtonBase-a-0Hynlg.js";import"./useTimeout-AH_mefcC.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CFuCIJPi.js";import"./useControlled-DF1SuFK7.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DJVqsN6W.js";import"./useSlotProps-Cj-jJpdF.js";import"./Popover-BtmUYu-t.js";import"./useSlot-DH7ZdPy5.js";import"./Paper-BAJGX6uN.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CmQbebU6.js";import"./utils-BvVaRORx.js";import"./Fade-BbLIe0vw.js";import"./Alert-D7kfzI8N.js";import"./Tab-CEFqcMij.js";import"./Button-DxzV5Mkd.js";import"./axis-x-D-9__mkN.js";import"./rotation-e2G1Iy-A.js";import"./JoggingCartesianAxisControl-BoTlGUAh.js";import"./Select-NUEwyx5c.js";import"./listItemTextClasses-BlEfRVle.js";import"./MenuItem-B2x1lszQ.js";import"./dividerClasses-BodF566W.js";import"./Box-BSk8KSRk.js";import"./ToggleButton-BUx4C9sW.js";import"./VelocitySlider-nfb0Zt42.js";import"./Divider-D4LyppyM.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
