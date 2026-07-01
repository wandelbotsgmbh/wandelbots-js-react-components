import{j as e,M as a,e as i,C as r}from"./iframe-BuuPyDNL.js";import{useMDXComponents as n}from"./index-CKbMnS24.js";import{D as p}from"./JoggingPanel.stories-BzVLnZAf.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-C3E14bOU.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-iJs5jWCw.js";import"./useTheme-EvfctsYy.js";import"./useLocalObservable-CPocix26.js";import"./Stack-m3tCKIbj.js";import"./Typography-DKwhcGvn.js";import"./styled-KxI98Yl1.js";import"./useThemeProps-C7Jr8d6z.js";import"./getThemeProps-B9EUPU2l.js";import"./createSvgIcon-Bzq0m25E.js";import"./SvgIcon-DcGW5tyF.js";import"./getValidReactChildren-B3cjLp0W.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-C-qzYzHb.js";import"./context-NHSCVuX4.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-9f38TWZJ.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C9DBfxMC.js";import"./hooks-23bh908V.js";import"./useTranslation-BzUO71Ru.js";import"./IconButton-1xnEV7uZ.js";import"./ButtonBase-BhgQEx9s.js";import"./useTimeout-DQEzINZ6.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-ZI1qWi6t.js";import"./useControlled-DyvrEtyM.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B7CrqStn.js";import"./useSlotProps-2nyAoVM_.js";import"./Popover-DSSwHFBD.js";import"./useSlot-Bc-0cQ1b.js";import"./Paper-C1gOATfU.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-fhE7VVxo.js";import"./utils-IGTPJ_th.js";import"./Fade-DYqDU9q6.js";import"./Alert-DbHdESF0.js";import"./Tab-CopY2xfK.js";import"./Button-3q8uASl3.js";import"./axis-x-Cb_XebIW.js";import"./rotation-yvxQS2Qp.js";import"./JoggingCartesianAxisControl-Cjd8XetS.js";import"./Box-DmNL1czu.js";import"./Select-B7FLkjfH.js";import"./listItemTextClasses-DRLcrXcs.js";import"./MenuItem-C45ZTdQ2.js";import"./dividerClasses-ToQBN7ZJ.js";import"./ToggleButton-BloE06oR.js";import"./VelocitySlider-C1O9MCA9.js";import"./Divider-X-zgREit.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
