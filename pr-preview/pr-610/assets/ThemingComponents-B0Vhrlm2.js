import{j as e,M as p,e as i,C as r}from"./iframe-DQctPXZS.js";import{useMDXComponents as n}from"./index-BP4QWN_y.js";import{D as a}from"./JoggingPanel.stories-BqH5KsEs.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Bog8XcOy.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B9eZU3Wq.js";import"./useTheme-B-GT2ylB.js";import"./useLocalObservable-qeJK7864.js";import"./Stack-BJtyeTDk.js";import"./Typography-BdQKjGf9.js";import"./styled-Ci-DApia.js";import"./useThemeProps-DbsftK8Q.js";import"./getThemeProps-CM4qDgYG.js";import"./createSvgIcon-DFzcTgCW.js";import"./SvgIcon-vssUOJYe.js";import"./getValidReactChildren-dVOBwHaK.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B2ZbOJnX.js";import"./context-v8FDDpD-.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Cpv82dzt.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-rw-LA3ic.js";import"./hooks-DmjDEDJR.js";import"./useTranslation-BlE48dg5.js";import"./IconButton-DqtWBlsu.js";import"./ButtonBase-DWK5tMGY.js";import"./useTimeout-DK6ihIX6.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DosFUhMB.js";import"./useControlled-BWCMXJ-l.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BZKirTal.js";import"./useSlotProps-DpeO9RKp.js";import"./Popover-Cb-Np1te.js";import"./useSlot-CDDinKN0.js";import"./Paper-DAEJqr4u.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DZnZnpmt.js";import"./utils-CL7KL7_R.js";import"./Fade-Cqf2Tf1d.js";import"./Alert-BwFrSfWO.js";import"./Tab-bbQdJ16Y.js";import"./Button-3LlB3Zp4.js";import"./axis-x-CGoQkPKf.js";import"./rotation-CfFEWuEy.js";import"./JoggingCartesianAxisControl-vyA_aL9U.js";import"./Select-B4tlIcij.js";import"./listItemTextClasses-CNI1EDn8.js";import"./MenuItem-B8SeA80S.js";import"./dividerClasses-DGTbMvgZ.js";import"./Box-Dwod3OvE.js";import"./ToggleButton-HJvCMGuf.js";import"./VelocitySlider-SXbjSKCc.js";import"./Divider-jd1H6Jvr.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
