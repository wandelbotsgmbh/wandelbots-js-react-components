import{j as e,M as p,e as i,C as r}from"./iframe-DYY95HYM.js";import{useMDXComponents as n}from"./index-DEE-R3Z-.js";import{D as a}from"./JoggingPanel.stories-Bew3Ghw9.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-D6ef3kGa.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DjtPdiy9.js";import"./useTheme-BLClqO1h.js";import"./useLocalObservable-D6TdRi8y.js";import"./Stack-DEwgRLqX.js";import"./Typography--nLqRGAu.js";import"./styled-BRm6JC1V.js";import"./useThemeProps-Bv1FYu_P.js";import"./getThemeProps-BC9l4Nee.js";import"./createSvgIcon-D-bR9a_R.js";import"./SvgIcon-CZ54g-o7.js";import"./getValidReactChildren-CoSd4PRI.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B7cwCZh0.js";import"./context-CoxmOV92.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-LMlWQ7mD.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl--84-wOm_.js";import"./hooks-BB9PYOfZ.js";import"./useTranslation-BLAjWEC-.js";import"./IconButton-DzgcGNUK.js";import"./ButtonBase-C3QhcuDX.js";import"./useTimeout-CKpxJawG.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-4vTW56Wm.js";import"./useControlled-BL59xnXL.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C22PEeuL.js";import"./useSlotProps-DG4qWOLY.js";import"./Popover-BE_TpCE7.js";import"./useSlot-DGg492ce.js";import"./Paper-CEWM88yN.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DfzA2o1W.js";import"./utils-BwhWsQGb.js";import"./Fade-VGu7HuM7.js";import"./Alert-DE8gt1iJ.js";import"./Tab-B9JeFWnO.js";import"./Button-B2ewRLlW.js";import"./axis-x-CNsgHJTw.js";import"./rotation-Da54M0KF.js";import"./JoggingCartesianAxisControl-SRvDms8i.js";import"./Select-CASsKQuf.js";import"./listItemTextClasses-HKUeXqpk.js";import"./MenuItem-BVRKXd0n.js";import"./dividerClasses-DuX1CO81.js";import"./Box-QzjKRH-n.js";import"./ToggleButton-BCj2uDAH.js";import"./VelocitySlider-D7HGzngM.js";import"./Divider-CkrWMEqI.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
