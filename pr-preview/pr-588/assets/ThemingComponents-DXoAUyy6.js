import{j as e,M as p,e as i,C as r}from"./iframe-Bk0-2QxL.js";import{useMDXComponents as n}from"./index-LlL1glrS.js";import{D as a}from"./JoggingPanel.stories-ChdPHszM.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-C0DH9kZK.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-ce9GG-Gm.js";import"./useTheme-DQRgQ4nY.js";import"./useLocalObservable-DGQ1omOk.js";import"./Stack-BssoHIRZ.js";import"./Typography-Bgt_gqro.js";import"./styled-DCwxt8BU.js";import"./useThemeProps-DfsbA9PU.js";import"./getThemeProps-C59z48vn.js";import"./createSvgIcon-CSoa__ZT.js";import"./SvgIcon-BEwAl7P9.js";import"./getValidReactChildren-BDPcRI1j.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DDgP2jxI.js";import"./context-BnvAqd9w.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-jDBJqDzV.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BMDr8y6s.js";import"./hooks-BicqekkX.js";import"./useTranslation-Cww5mk0t.js";import"./IconButton-msqth0gC.js";import"./ButtonBase-BZyLO8cB.js";import"./useTimeout-BcKZ6GGZ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-c56txrcA.js";import"./useControlled-D9Tjxq4w.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BnP2yRvC.js";import"./useSlotProps-DMw4oIjV.js";import"./Popover-1rYLFNi8.js";import"./useSlot-CRkZLo76.js";import"./Paper-C2JMCm7D.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-xT5THvxb.js";import"./utils-DK-RRRZn.js";import"./Fade-DvPUCNYA.js";import"./Alert-C3H-pWIt.js";import"./Tab-CqREvd3V.js";import"./Button-DkH1onzK.js";import"./axis-x-YptehGIs.js";import"./rotation-C0cRgQ-p.js";import"./JoggingCartesianAxisControl-COnTW-Vd.js";import"./Select-DR2GrtsN.js";import"./listItemTextClasses-VN5wKzyl.js";import"./MenuItem-CQHDnver.js";import"./dividerClasses-KKzH3zDL.js";import"./Box-BqX1MVsk.js";import"./ToggleButton-FOeY8FCq.js";import"./VelocitySlider-Cm8mZpoZ.js";import"./Divider-Ch8Ef-ir.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
