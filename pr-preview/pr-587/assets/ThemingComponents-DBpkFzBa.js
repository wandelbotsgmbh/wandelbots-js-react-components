import{j as e,M as p,e as i,C as r}from"./iframe-B_v-8-lB.js";import{useMDXComponents as n}from"./index-DK5kUrD4.js";import{D as a}from"./JoggingPanel.stories-DoZo1_vg.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BpyY7S43.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-i_j3MnXf.js";import"./useTheme-BKO7b-Ch.js";import"./useLocalObservable-C0eA7Yxg.js";import"./Stack-C4IDteqL.js";import"./Typography-4lR3XSTa.js";import"./styled-GW4sxa-Y.js";import"./useThemeProps-Bh3Szyyg.js";import"./getThemeProps-B1B3XMuQ.js";import"./createSvgIcon-Dqt9y506.js";import"./SvgIcon-DJxTodtR.js";import"./getValidReactChildren-C_EzaRMB.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CNJDZNsU.js";import"./context-D7ew06eA.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Gauv6ce0.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Bz7GaqBG.js";import"./hooks-B8nHRCtZ.js";import"./useTranslation-CSMi3gr6.js";import"./IconButton-DxVI0dVb.js";import"./ButtonBase-Dk8luv4C.js";import"./useTimeout-CnwhIyYy.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-C_f8BuRS.js";import"./useControlled-BOMStj6E.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D4bznKvs.js";import"./useSlotProps-B3A6MMdF.js";import"./Popover-Bgh94QCZ.js";import"./useSlot-DZaV-B4q.js";import"./Paper-BGSOpvsh.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-JuJjBr4T.js";import"./utils-CjZO3exs.js";import"./Fade-B_cdR4El.js";import"./Alert-B-qXoerF.js";import"./Close-DqSRvGOz.js";import"./Button-WdoRxMhU.js";import"./axis-x-DvE4tO-Z.js";import"./rotation-BhaMtbSD.js";import"./JoggingCartesianAxisControl-B97YqBcj.js";import"./Select-D0UTCFQn.js";import"./listItemTextClasses-VZdPZnib.js";import"./MenuItem-jTwoopp3.js";import"./dividerClasses-BFajjhdI.js";import"./Box-BVuFRonp.js";import"./ToggleButton-DHHBxdpJ.js";import"./VelocitySlider-DOOZ-SnO.js";import"./Divider-pKtyNwUa.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
