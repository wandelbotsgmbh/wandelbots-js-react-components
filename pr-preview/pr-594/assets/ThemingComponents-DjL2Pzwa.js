import{j as e,M as p,e as i,C as r}from"./iframe-bBEJQEds.js";import{useMDXComponents as n}from"./index-DVUI7X0I.js";import{D as a}from"./JoggingPanel.stories-uHGeuWHg.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BUcR4dWD.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DoEeHceI.js";import"./useTheme-BdsD46aS.js";import"./useLocalObservable-CdyrNAtf.js";import"./Stack-xC_0XcBD.js";import"./Typography-Dwqy70mz.js";import"./styled-ByeKu3ow.js";import"./useThemeProps-BR_7Qw_j.js";import"./getThemeProps-B674xtKh.js";import"./createSvgIcon-Cmm04yzo.js";import"./SvgIcon-CiJOt2sZ.js";import"./getValidReactChildren-Be4o2bQi.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DLrNwbvW.js";import"./context-DLuZ7TM-.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Cw7se-Mx.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-0xwDkjKx.js";import"./hooks-D7czrHZA.js";import"./useTranslation-C9zVIkME.js";import"./IconButton-BXs58941.js";import"./ButtonBase-CFfTI7X0.js";import"./useTimeout-DHf2iQkr.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CAIpJRqQ.js";import"./useControlled-DmyUTsTh.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BCKYnMIV.js";import"./useSlotProps-DeEJLnM-.js";import"./Popover-DHvglnMP.js";import"./useSlot-B4apvZMh.js";import"./Paper-FULSlh0n.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-96Pfxnnf.js";import"./utils-DYmQ7Bdk.js";import"./Fade-CuIw1BRt.js";import"./Alert-Cv5k1HHo.js";import"./Tab-Bj9v4zmi.js";import"./Button-N07hVmnv.js";import"./axis-x-CDt-KfqD.js";import"./rotation-COUjhu_3.js";import"./JoggingCartesianAxisControl-CrjHLDYw.js";import"./Select-CTUdj7n4.js";import"./listItemTextClasses-CY4P9mor.js";import"./MenuItem-BiCQzyuH.js";import"./dividerClasses-DTTypBm6.js";import"./Box-BAC3Irbd.js";import"./ToggleButton-B31hd1Qu.js";import"./VelocitySlider-D_sZ0hFC.js";import"./Divider-BFuWLydX.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
