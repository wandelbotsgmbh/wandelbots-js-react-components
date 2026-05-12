import{j as e,M as p,e as i,C as r}from"./iframe-CFL8p0Ds.js";import{useMDXComponents as n}from"./index-CUY-zwZ8.js";import{D as a}from"./JoggingPanel.stories-CDjCsFrg.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DaAGDb_o.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DWGa8oyW.js";import"./useTheme-DRw8hrsD.js";import"./useLocalObservable-Bz5snwQw.js";import"./Stack-Ct_AAowl.js";import"./Typography-BnZJVhAb.js";import"./styled-BN63rhj0.js";import"./useThemeProps-BHHQx-__.js";import"./getThemeProps-jEEsBWVU.js";import"./createSvgIcon-DuDYgGcf.js";import"./SvgIcon-yWN82Agu.js";import"./getValidReactChildren-BESWTF8v.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-FyvlocEs.js";import"./context-BnQZ-WQd.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-MLUDSYP1.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-u2NxCb0W.js";import"./hooks-CBYGuJUC.js";import"./useTranslation-D0bXKje8.js";import"./IconButton-CGMBzQI4.js";import"./ButtonBase-Dy2NmHJ6.js";import"./useTimeout-zF1KbbjZ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DW_ssf6J.js";import"./useControlled-A2mDahpW.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-ZbsI7CjF.js";import"./useSlotProps-Bp-s0Qxh.js";import"./Popover-B_3mbTo9.js";import"./useSlot-D61Lckvr.js";import"./Paper-BA6JPuV7.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-4moZPUDp.js";import"./utils-8hLKq199.js";import"./Fade-DeJtR000.js";import"./Alert-CvzSYS_C.js";import"./Tab-BXuDoHq5.js";import"./Button-C3ADz-zL.js";import"./axis-x-C81va4Eo.js";import"./rotation-CJZGdc6p.js";import"./JoggingCartesianAxisControl-CEraUH6M.js";import"./Select-D8pu2vKh.js";import"./listItemTextClasses-DzsSB9Ar.js";import"./MenuItem-DDzjEaQj.js";import"./dividerClasses-B0AGhz01.js";import"./Box-Cl7-mo-_.js";import"./ToggleButton-t2tXOPqT.js";import"./VelocitySlider-BywkDm0Y.js";import"./Divider-eQYCW0HG.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
