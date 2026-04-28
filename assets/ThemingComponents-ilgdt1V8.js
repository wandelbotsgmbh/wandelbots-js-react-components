import{j as e,M as p,e as i,C as r}from"./iframe-U90q-Qg9.js";import{useMDXComponents as n}from"./index-DDOEFVW5.js";import{D as a}from"./JoggingPanel.stories-DPk7G-iC.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-7LJYULgr.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DXvSpTmn.js";import"./useTheme-CQTOaPs8.js";import"./useLocalObservable-Dd4ziqLG.js";import"./Stack-5nAG4JGA.js";import"./Typography-C665qnkZ.js";import"./styled-BTdGtO3P.js";import"./useThemeProps-BBZZPq4s.js";import"./getThemeProps-DIz0JqPi.js";import"./createSvgIcon-Bj0ArM1R.js";import"./SvgIcon-AwT4NHC6.js";import"./getValidReactChildren-BYvkwQXA.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CnHa-WmA.js";import"./context-CsLkZmZr.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Bow2iK7e.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-oWIemyd4.js";import"./hooks-DSMC_8Um.js";import"./useTranslation-Cvjs35aZ.js";import"./IconButton-BeaRf6MY.js";import"./ButtonBase-DB3bIiMP.js";import"./useTimeout-gWXbI-4c.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BchgAd2y.js";import"./useControlled-CGUg6r88.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-27_Qgvkm.js";import"./useSlotProps-Cb5CQC2O.js";import"./Popover--Vcr7Z6T.js";import"./useSlot-BvqAt5se.js";import"./Paper-BZ2GBpUt.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DupZdIva.js";import"./utils-CDMZqfm9.js";import"./Fade-33q5qA2H.js";import"./Alert-CwkUJAIs.js";import"./Tab-CVpoywy8.js";import"./Button-CFEY8081.js";import"./axis-x-URfiA24t.js";import"./rotation-Bv0wQMBL.js";import"./JoggingCartesianAxisControl-0cAeEXpi.js";import"./Select-ju6MYEEj.js";import"./listItemTextClasses-DJTIya_7.js";import"./MenuItem-CZHqObfh.js";import"./dividerClasses-B0AszB9a.js";import"./Box-DraEcN3V.js";import"./ToggleButton-C6FiOv2o.js";import"./VelocitySlider-DdYjp-fu.js";import"./Divider-WPFLkOh1.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
