import{j as e,M as p,e as i,C as r}from"./iframe-BiSlx2o3.js";import{useMDXComponents as n}from"./index-Dgb7MzCP.js";import{D as a}from"./JoggingPanel.stories-BZuy-7mk.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BJUA_aAj.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-m9-ozRyU.js";import"./useTheme-Df3h_s_x.js";import"./useLocalObservable-zKPrCXdp.js";import"./Stack-Do3U0AvA.js";import"./Typography-Bko41uo5.js";import"./styled-Cjh5LcH-.js";import"./useThemeProps-BaaiqUtG.js";import"./getThemeProps-iz1S-R3y.js";import"./createSvgIcon-Bd_IYjVD.js";import"./SvgIcon-sm7iy7-9.js";import"./getValidReactChildren-D9_gZAKi.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BTSNedBE.js";import"./context-juYuDbok.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BwgJ9gMK.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-KatzaHYE.js";import"./hooks-CUfH7twn.js";import"./useTranslation-DKlUronL.js";import"./IconButton-DRc6RXZ1.js";import"./ButtonBase-CQxYZYaC.js";import"./useTimeout-C2hQuwhO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DRUm_uPY.js";import"./useControlled-B6yXPymE.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CIuyXxKP.js";import"./useSlotProps-CMUEcVdf.js";import"./Popover-BI5avqjJ.js";import"./useSlot-DSXzhfp3.js";import"./Paper-DByRRslH.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B7FY_-9M.js";import"./utils-ZCL6MqWU.js";import"./Fade-CgU8sKN4.js";import"./Alert-BOvwyLSk.js";import"./Tab-DV3YOvYH.js";import"./Button-gihjrsje.js";import"./axis-x-DtZje8yG.js";import"./rotation-B_BeOEsx.js";import"./JoggingCartesianAxisControl-EMws-tr9.js";import"./Box-VI9HBkWT.js";import"./Select-BcvtUNCA.js";import"./listItemTextClasses-UkfzvELO.js";import"./MenuItem-DSthRLtp.js";import"./dividerClasses-Dz5hjvZ8.js";import"./ToggleButton-Duu9Y-Tf.js";import"./VelocitySlider-CXkj54yi.js";import"./Divider-HWbcxoGQ.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
