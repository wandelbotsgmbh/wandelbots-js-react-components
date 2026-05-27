import{j as e,M as p,e as i,C as r}from"./iframe-D4uLF9TB.js";import{useMDXComponents as n}from"./index-Cp4yEjNb.js";import{D as a}from"./JoggingPanel.stories-CVC0KRKN.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BOFiU6r8.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BihLsniw.js";import"./useTheme-Bms5QHf0.js";import"./useLocalObservable-CPsGg8Nu.js";import"./Stack-a4dh9oo2.js";import"./Typography-Dy-nTLDq.js";import"./styled-DaT-ZLqM.js";import"./useThemeProps-knUI08R2.js";import"./getThemeProps-CJE8k7eI.js";import"./createSvgIcon-CP7Y9Rxk.js";import"./SvgIcon-CranwfZU.js";import"./getValidReactChildren-DhTpX6yM.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-UrgOdACs.js";import"./context-DXYmRPRN.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-s6n3lLpa.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C1XzG6SJ.js";import"./hooks-DNC3bfEP.js";import"./useTranslation-D9qZGfrO.js";import"./IconButton-DpBGEWZi.js";import"./ButtonBase-CRqxhArW.js";import"./useTimeout-B5dGmiFs.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BU5BHukA.js";import"./useControlled-CqYwyuYZ.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CJUwzrVL.js";import"./useSlotProps-B_qy4WHX.js";import"./Popover-B4UtBGwO.js";import"./useSlot-tLTcq4Q0.js";import"./Paper-BdtHCakD.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CDopbxRj.js";import"./utils-BiORq_tM.js";import"./Fade-CnUrSun7.js";import"./Alert-D-0c_GpV.js";import"./Tab-BwFtfawl.js";import"./Button-DefDVYzj.js";import"./axis-x-CCyp_WR0.js";import"./rotation-DAa2ESrR.js";import"./JoggingCartesianAxisControl-x-cf94pH.js";import"./Select-DPvc-h4J.js";import"./listItemTextClasses-BD6gXkFc.js";import"./MenuItem-JGPCpEPo.js";import"./dividerClasses-CcQA9d93.js";import"./Box-DPw2Q3LD.js";import"./ToggleButton-yPLBhxO4.js";import"./VelocitySlider-ByJKqzRj.js";import"./Divider-8qvowRcs.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
