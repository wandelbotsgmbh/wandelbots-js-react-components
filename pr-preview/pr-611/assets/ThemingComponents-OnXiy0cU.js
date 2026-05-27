import{j as e,M as p,e as i,C as r}from"./iframe-CiJ45Zeg.js";import{useMDXComponents as n}from"./index-J4e-9xQx.js";import{D as a}from"./JoggingPanel.stories-B2L6MfQp.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CvuP_jc6.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DpC29VAD.js";import"./useTheme-COES8ddT.js";import"./useLocalObservable-BX587AH5.js";import"./Stack-Bau0kugi.js";import"./Typography-B6OsmCiz.js";import"./styled-D360Stk3.js";import"./useThemeProps-I9PJMevl.js";import"./getThemeProps-C3y5Thmw.js";import"./createSvgIcon-DjSokbEX.js";import"./SvgIcon-DMISf78W.js";import"./getValidReactChildren-BIN41f--.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DRVU3xBR.js";import"./context-Bektb0XU.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DdUgbw18.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-COu64L7q.js";import"./hooks-xcM5bbPi.js";import"./useTranslation-C2QgpIJR.js";import"./IconButton-B3ZiSfxX.js";import"./ButtonBase-FQFNyz5R.js";import"./useTimeout-BGG7eGiZ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BQAmriaU.js";import"./useControlled-iq2dRFdS.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BlRFNH9z.js";import"./useSlotProps-DpqSNY4k.js";import"./Popover-CSa4WI03.js";import"./useSlot-C4Y9IYbL.js";import"./Paper-d-_Uyi_C.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B5IN8D17.js";import"./utils-DkM3t20z.js";import"./Fade-DkZyTYNq.js";import"./Alert-DLpThtmD.js";import"./Tab-DmPDMVJx.js";import"./Button-CJVAaz2W.js";import"./axis-x-DsAIDfnI.js";import"./rotation-Cg8OKTSd.js";import"./JoggingCartesianAxisControl-CFQKfSzi.js";import"./Select-CuFla_ot.js";import"./listItemTextClasses-DfuPICho.js";import"./MenuItem-CXJ4WNtS.js";import"./dividerClasses-DyflQhwF.js";import"./Box-KUCZ06KF.js";import"./ToggleButton-CiQRX9qk.js";import"./VelocitySlider-D1arKPYO.js";import"./Divider-bdRSm6ZA.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
