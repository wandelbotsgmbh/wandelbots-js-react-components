import{j as e,M as p,e as i,C as r}from"./iframe-BQswGLQo.js";import{useMDXComponents as n}from"./index-mtpjM1A2.js";import{D as a}from"./JoggingPanel.stories-DDT-00f6.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BdGUb2Nn.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BodMWuCO.js";import"./useTheme-BqJmB9xs.js";import"./useLocalObservable-DGCzBUqH.js";import"./Stack-Dw9LpDy1.js";import"./Typography-C61CSdkt.js";import"./styled-C40GvXnj.js";import"./useThemeProps-T_BR1aD0.js";import"./getThemeProps-ChwIeg81.js";import"./createSvgIcon-DNCq4Y8p.js";import"./SvgIcon-C-EjauRw.js";import"./getValidReactChildren-CGbjface.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-tOwP7QJB.js";import"./context-C5VyNP--.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BNJ6G_02.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BlpLAJLX.js";import"./hooks-B98UQ2XD.js";import"./useTranslation-VuPALtwl.js";import"./IconButton-DMkPID8r.js";import"./ButtonBase-Dh5IH7ah.js";import"./useTimeout-BCmj0WzM.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B7947HYv.js";import"./useControlled-CclbEWb4.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DB9QTWiJ.js";import"./useSlotProps-BVMmFfrb.js";import"./Popover-DT1Mkgcp.js";import"./useSlot-DrR4MYST.js";import"./Paper-BKvyeRF3.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D1EdNHwA.js";import"./utils-qvWW5KJi.js";import"./Fade-DMlEtzdD.js";import"./Alert-DU5WFCAh.js";import"./Tab-DpVuPPUR.js";import"./Button-Cl4W2dlQ.js";import"./axis-x-BMbVY1Tu.js";import"./rotation-CwFtJ899.js";import"./JoggingCartesianAxisControl-SiwrD59G.js";import"./Select-DDKYblT1.js";import"./listItemTextClasses-CzTCo7dz.js";import"./MenuItem-DfL_lUgE.js";import"./dividerClasses-BeECLjhL.js";import"./Box-3KAvMgbz.js";import"./ToggleButton-DcMSUj_I.js";import"./VelocitySlider-CGPyE1Sk.js";import"./Divider-C5M5bOxp.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
