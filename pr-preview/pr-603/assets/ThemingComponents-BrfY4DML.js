import{j as e,M as p,e as i,C as r}from"./iframe-CTXJna5z.js";import{useMDXComponents as n}from"./index-CldcGkGi.js";import{D as a}from"./JoggingPanel.stories-CHlW_B5m.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-y-Shlh4e.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-Blpsr57i.js";import"./useTheme-DNYSHzv7.js";import"./useLocalObservable-sRLt_D5n.js";import"./Stack-CNPQ083j.js";import"./Typography-ChVS9r8q.js";import"./styled-_rnDdv6m.js";import"./useThemeProps-CjyaSlQl.js";import"./getThemeProps-Bv2vVnUP.js";import"./createSvgIcon-921n9FUR.js";import"./SvgIcon-BcMHFmlH.js";import"./getValidReactChildren-C0GgTy2y.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CG2_aJmX.js";import"./context-D710SZCY.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Dy51q-Vj.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CWm2l0r_.js";import"./hooks-B8E-qRtK.js";import"./useTranslation-lTCtwxeZ.js";import"./IconButton-fVHP6YAy.js";import"./ButtonBase-DjbfjuLU.js";import"./useTimeout-DlxaCm6p.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CrLFz9jc.js";import"./useControlled-BSyizBJp.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D26Zj0ke.js";import"./useSlotProps-DShK-e95.js";import"./Popover-Bp6R_hEa.js";import"./useSlot-CCRHhE0S.js";import"./Paper-BlgjF9z7.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Dv8OU4SL.js";import"./utils-CYH3bSy_.js";import"./Fade-C6-zWtrx.js";import"./Alert-CHb6qYzQ.js";import"./Tab-ptPh2VTK.js";import"./Button-DbqO249p.js";import"./axis-x-Oz4S_HpA.js";import"./rotation-B0bWWWTk.js";import"./JoggingCartesianAxisControl-B9iXLlbK.js";import"./Select-z9XtF5WE.js";import"./listItemTextClasses-BWpS95jW.js";import"./MenuItem-D0nNFOsM.js";import"./dividerClasses-DCWLtBv-.js";import"./Box-CJqBV3my.js";import"./ToggleButton-IzYhf12W.js";import"./VelocitySlider-rJX37pjV.js";import"./Divider-CJdsQtUx.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
