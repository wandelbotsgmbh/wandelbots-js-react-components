import{j as e,M as p,e as i,C as r}from"./iframe-DX1qAlno.js";import{useMDXComponents as n}from"./index-NGzPqXFh.js";import{D as a}from"./JoggingPanel.stories-O3_cc1aX.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CLvrOez_.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DrBxTQyV.js";import"./useTheme-CYdZjSm6.js";import"./useLocalObservable-x9BPsUo3.js";import"./Stack-DJzwG-rI.js";import"./Typography-Bhsp7_1J.js";import"./styled-D6giLOdr.js";import"./useThemeProps-4GP7w5os.js";import"./getThemeProps-BtpaZ8cH.js";import"./createSvgIcon-BrVYGM75.js";import"./SvgIcon-1BqDE2z0.js";import"./getValidReactChildren-C7RHxwUy.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-D523zEaq.js";import"./context--wP1qJEe.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B1q_ewP0.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BHAq4JXh.js";import"./hooks-CFi-lGdH.js";import"./useTranslation-WZRm5Ixy.js";import"./IconButton-HEjok0pb.js";import"./ButtonBase-yAaOO8N1.js";import"./useTimeout-o6UDMqpq.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Byk5Ejew.js";import"./useControlled-Cfw0Dg1d.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Dzio96Dt.js";import"./useSlotProps-BLqIHUAy.js";import"./Popover-BOS_JiaA.js";import"./useSlot-B_HrPfzE.js";import"./Paper-B4eK6TqM.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CnMq2WYx.js";import"./utils-DKWVYrT5.js";import"./Fade-BJXGV1W_.js";import"./Alert-DTtyTvUO.js";import"./Tab-Dl9ny-ve.js";import"./Button-BXPPskL2.js";import"./axis-x-Cb7Cs3E3.js";import"./rotation-Bg1qv5bu.js";import"./JoggingCartesianAxisControl-Cudc_TFZ.js";import"./Select-DIGvAZNk.js";import"./listItemTextClasses-CyzKzMoY.js";import"./MenuItem-D_KdiF2R.js";import"./dividerClasses-CRv8KTlR.js";import"./Box-x-iCpWMl.js";import"./ToggleButton-CntQqTJT.js";import"./VelocitySlider-BpGVnXsB.js";import"./Divider-B0acIp4N.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
