import{j as e,M as p,e as i,C as r}from"./iframe-C5c9tU-p.js";import{useMDXComponents as n}from"./index-BGGinTHt.js";import{D as a}from"./JoggingPanel.stories-Cu3sSnOy.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-COu3sBjF.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-yIWn6OwT.js";import"./useTheme-cuXy1hCP.js";import"./useLocalObservable-eA0h3owH.js";import"./Stack-DSfreFD9.js";import"./Typography-BfEehDz8.js";import"./styled-C0V3kd0o.js";import"./useThemeProps-B8utN0Pw.js";import"./getThemeProps-EmFAGg0A.js";import"./createSvgIcon-DzmMlF_Q.js";import"./SvgIcon-DFeIuTd2.js";import"./getValidReactChildren-0ta3bBT6.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BuIeh7Xb.js";import"./context-BEJoRi31.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BEgKeOHX.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-EU01P-bu.js";import"./hooks-C23r5Yxh.js";import"./useTranslation-DIaOaGw1.js";import"./IconButton-Bxwckqr2.js";import"./ButtonBase-XrKeXN30.js";import"./useTimeout-jun5qSCw.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-1TD4TBhC.js";import"./useControlled-BqbpyBLT.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D4yW1jM8.js";import"./useSlotProps-C4AM_AcR.js";import"./Popover-l2ja7UPg.js";import"./useSlot-CPhX8sVD.js";import"./Paper-BzmZ4c3I.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-C432OD__.js";import"./utils-ChORfhZf.js";import"./Fade-BzQXM4Je.js";import"./Alert-BCw7BlEA.js";import"./Tab-FLhnGHzp.js";import"./Button-DLjGdiBg.js";import"./axis-x-B1K-38M3.js";import"./rotation-C1ojat-a.js";import"./JoggingCartesianAxisControl-BcG7kOVO.js";import"./Select-YyRu609r.js";import"./listItemTextClasses-D0D2RLbR.js";import"./MenuItem-jJJunO45.js";import"./dividerClasses-DAl4FEBH.js";import"./Box-BVA2QCpv.js";import"./ToggleButton-BsuOpCRf.js";import"./VelocitySlider-DiGVG1F_.js";import"./Divider-CeJpi28C.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
