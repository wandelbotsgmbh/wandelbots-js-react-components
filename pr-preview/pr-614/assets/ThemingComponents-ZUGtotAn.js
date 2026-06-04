import{j as e,M as a,e as i,C as r}from"./iframe-DfWPFmHR.js";import{useMDXComponents as n}from"./index-DjAywOnV.js";import{D as p}from"./JoggingPanel.stories--tGL0bxN.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Co006UZ9.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-C6zBSsDS.js";import"./useTheme-CQuiQKlK.js";import"./useLocalObservable-DDfjf65l.js";import"./Stack-CJ5_8D7X.js";import"./Typography-BLYFB-H6.js";import"./styled-l6iecieT.js";import"./useThemeProps-Qc9rWBpD.js";import"./getThemeProps-BQvTXkAz.js";import"./createSvgIcon-BQPOlWPh.js";import"./SvgIcon-CD3_c9Hi.js";import"./getValidReactChildren-Cv7hA9ys.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-C6tO6kDg.js";import"./context-DvXoX9AM.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-D9aPwPBt.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CKBKO2JN.js";import"./hooks-DafG6l1N.js";import"./useTranslation-ovRbdi0R.js";import"./IconButton-giGHxeHF.js";import"./ButtonBase-C3XcEfzS.js";import"./useTimeout-NRm9GukT.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BNDy54j-.js";import"./useControlled-BVYEcAfq.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B9WdnHSX.js";import"./useSlotProps-C4LcECm2.js";import"./Popover-BbXhLCPa.js";import"./useSlot-BsG9Jq0v.js";import"./Paper-LA4HZB9z.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-C28uELVK.js";import"./utils-C2bj6Z0W.js";import"./Fade--rSJHSZ2.js";import"./Alert-B5R5px7k.js";import"./Tab-DD7na1Kb.js";import"./Button-Cw-z3Q1s.js";import"./axis-x-RnbRiTdm.js";import"./rotation-CPHOs4eo.js";import"./JoggingCartesianAxisControl-BlD-x4-J.js";import"./Box-DboErsje.js";import"./Select-DtjY7ZIZ.js";import"./listItemTextClasses-DgpCbqQv.js";import"./MenuItem-BE3OCfuR.js";import"./dividerClasses-BYzXGtzT.js";import"./ToggleButton-CrYSjXNr.js";import"./VelocitySlider-CcD7OOxH.js";import"./Divider-COsuHxuj.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
