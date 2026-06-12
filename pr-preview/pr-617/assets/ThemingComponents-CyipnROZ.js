import{j as e,M as a,e as i,C as r}from"./iframe-DchEWV59.js";import{useMDXComponents as n}from"./index-D2FjxY4S.js";import{D as p}from"./JoggingPanel.stories-CCDZtVhe.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BOMs-aXp.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Df-spXDe.js";import"./useTheme-CP0vZSll.js";import"./useLocalObservable-CWyWt-RU.js";import"./Stack-DhzmrS6D.js";import"./Typography-DMtLnw89.js";import"./styled-De1-Mpdo.js";import"./useThemeProps-n75W-Y7c.js";import"./getThemeProps-BFZGWln5.js";import"./createSvgIcon-DUldrXoq.js";import"./SvgIcon-COvp3Gfh.js";import"./getValidReactChildren-BG5dXzX7.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-BZt87fnG.js";import"./context-DvoWthvk.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DBmYDAjf.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DB31x0BF.js";import"./hooks-x-x5ADq8.js";import"./useTranslation-BTH5kuWp.js";import"./IconButton-AdU4wRWw.js";import"./ButtonBase-D1py1Eto.js";import"./useTimeout-Dx8AlRKo.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DX-aS3tM.js";import"./useControlled-aV93uKLx.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DqFprrt2.js";import"./useSlotProps-b6Xb8rV3.js";import"./Popover-CBx-AUZN.js";import"./useSlot-Dg6JUlBp.js";import"./Paper-BFQKP65K.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Cns6RQXW.js";import"./utils-DbE9S4yb.js";import"./Fade-C8NxSv6l.js";import"./Alert-F0Th9dV2.js";import"./Tab-D3tEEjK_.js";import"./Button-D9S9QBoe.js";import"./axis-x-CbLAno5D.js";import"./rotation-Dk1VRVVN.js";import"./JoggingCartesianAxisControl-BfAC6bEb.js";import"./Box-5o7oNvkM.js";import"./Select-BMO9UAg1.js";import"./listItemTextClasses-CL84kKxf.js";import"./MenuItem-CFIPuZPp.js";import"./dividerClasses-C-vJPTUp.js";import"./ToggleButton-CW6aalCE.js";import"./VelocitySlider-D71snSH5.js";import"./Divider-DRwZVymp.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
