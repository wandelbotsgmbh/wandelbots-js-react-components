import{j as e,M as p,e as i,C as r}from"./iframe-DmWrSOEO.js";import{useMDXComponents as n}from"./index-D8Zpn89l.js";import{D as a}from"./JoggingPanel.stories-CDwKwoiQ.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Buk_WP9C.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CRS37spD.js";import"./useTheme-MMsUXTKm.js";import"./useLocalObservable-Cph6TKWl.js";import"./Stack-DiXKl1xv.js";import"./Typography-DxaxNoiH.js";import"./styled-CWKJBPFi.js";import"./useThemeProps-DDjR6HIq.js";import"./getThemeProps-D1nbxefB.js";import"./createSvgIcon-BF5G2ZAl.js";import"./SvgIcon-BLj97Ng9.js";import"./getValidReactChildren-BA5oVa5k.js";import"./index-CXJ13SqB.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BIFJjxz7.js";import"./context-DrRBIKK8.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DU1lyo05.js";import"./converters-CNFysZQy.js";import"./CircularProgress-DNbZQgqF.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Bj3uMxmv.js";import"./hooks-HYf_yGq_.js";import"./useTranslation-B3zE01wm.js";import"./IconButton-BvPGJluI.js";import"./ButtonBase-DZlJ_kXj.js";import"./useTimeout-h43r87Sj.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BDGUY7Mv.js";import"./useControlled-ZZFLVrJl.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BPo8AolI.js";import"./useSlotProps-_OIqGBMY.js";import"./Popover-DqCr4PFB.js";import"./useSlot--zttzNcS.js";import"./Paper-B3tLmsc5.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CakRNTf3.js";import"./utils-p52p785Y.js";import"./Fade-BMCKoO5Q.js";import"./Alert-D02kdrYm.js";import"./Tab-DTZnAcCq.js";import"./Button-csQUkHsC.js";import"./axis-x-CAcWAtuW.js";import"./rotation-C3lDS45w.js";import"./JoggingCartesianAxisControl-CUwIgLtE.js";import"./Select-0h5t4R6h.js";import"./listItemTextClasses-BoYYJ7x7.js";import"./MenuItem-DNZXC8NB.js";import"./dividerClasses-DnnmBU_N.js";import"./Box-9kJ4zQP6.js";import"./ToggleButton-DEATAyxD.js";import"./VelocitySlider-CHXd1ZF4.js";import"./Divider-Ccop-7RL.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
