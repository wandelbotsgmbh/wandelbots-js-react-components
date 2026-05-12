import{j as e,M as p,e as i,C as r}from"./iframe-fqcQmF3Q.js";import{useMDXComponents as n}from"./index-CFkI5lBH.js";import{D as a}from"./JoggingPanel.stories-DB7xdV0g.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DB1j73be.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CE3hraxR.js";import"./useTheme-62ohso46.js";import"./useLocalObservable-DgIPAeLb.js";import"./Stack-BCkCXLUk.js";import"./Typography-BIkbrq7L.js";import"./styled-C57JLxY4.js";import"./useThemeProps-BOQ5O-9-.js";import"./getThemeProps-D2kw5W3I.js";import"./createSvgIcon-P6h4Qoq-.js";import"./SvgIcon-Bp1Lxvpt.js";import"./getValidReactChildren-DrpagpHg.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BODOFgMG.js";import"./context-CO-c0hk4.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-3hch-vff.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DGO2pN6P.js";import"./hooks-D3smniiC.js";import"./useTranslation-Br-yn1Zj.js";import"./IconButton-BuhxkpYK.js";import"./ButtonBase-DFSMmqoq.js";import"./useTimeout-DJgwiHjA.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BKbbwd3Z.js";import"./useControlled-D9sRsPFY.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C3BFbINK.js";import"./useSlotProps-yr9fD2Uw.js";import"./Popover-CYosJrzG.js";import"./useSlot-Cp-2ydpp.js";import"./Paper-Dt2b-LBz.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D4geYSex.js";import"./utils-DYUmMNg3.js";import"./Fade-D4XsnP-k.js";import"./Alert-aguOZ8zg.js";import"./Tab-BLCbfAVX.js";import"./Button-BSi43MVn.js";import"./axis-x-C10DMPHR.js";import"./rotation-B2bLtEAl.js";import"./JoggingCartesianAxisControl-bwRoiVw7.js";import"./Select-DGI0nL5O.js";import"./listItemTextClasses-B5llrfhh.js";import"./MenuItem-DUt7P48I.js";import"./dividerClasses-CpehJv7q.js";import"./Box-D1Lbx9pH.js";import"./ToggleButton-BG9ihbJ8.js";import"./VelocitySlider-waEVb54r.js";import"./Divider-BHcF_4G4.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
