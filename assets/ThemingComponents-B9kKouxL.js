import{j as e,M as p,e as i,C as r}from"./iframe-g1tvjZqV.js";import{useMDXComponents as n}from"./index-hX-1XT3x.js";import{D as a}from"./JoggingPanel.stories-j1JqXDtZ.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CJPWAh2-.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BHbykjbo.js";import"./useTheme-D7Stu3Yl.js";import"./useLocalObservable-CLG9lHEW.js";import"./Stack-CE6s3fQO.js";import"./Typography-CyF5_Nc8.js";import"./styled-DS8zqvnZ.js";import"./useThemeProps-8R2KET3C.js";import"./getThemeProps-WgGzirjS.js";import"./createSvgIcon-C74oxuC1.js";import"./SvgIcon-BtS-QEpr.js";import"./getValidReactChildren-BIi9uS3N.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-Cl2hSBGR.js";import"./context-DAtywzRo.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-J4HPYlOd.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DHTFOuBW.js";import"./hooks-1poHIRDL.js";import"./useTranslation-BXFIdZRq.js";import"./IconButton-B0Iwr5vD.js";import"./ButtonBase-DFN-PRSf.js";import"./useTimeout-De7OyFTn.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CisjSHhm.js";import"./useControlled-BQduLGtP.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Cmf30Ddw.js";import"./useSlotProps-D_dSDeXQ.js";import"./Popover-kNJEAMfa.js";import"./useSlot-BgnWcro6.js";import"./Paper-Bk-q_sqO.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CZEUHTem.js";import"./utils-CjZ05U2d.js";import"./Fade-BEyxrvCi.js";import"./Alert-CnJgIVez.js";import"./Tab-DR8o8T9b.js";import"./Button-Du0yi4lF.js";import"./axis-x-ttlNBtS4.js";import"./rotation-DncGVEhI.js";import"./JoggingCartesianAxisControl-DYxwGXwA.js";import"./Select-CRC6_weX.js";import"./listItemTextClasses-Cr5hWba2.js";import"./MenuItem-CpF4ccSS.js";import"./dividerClasses-DXExzmI5.js";import"./Box-CZQODqqE.js";import"./ToggleButton-DPmfMTyN.js";import"./VelocitySlider-D6SIZAgi.js";import"./Divider-BFY55GOd.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
