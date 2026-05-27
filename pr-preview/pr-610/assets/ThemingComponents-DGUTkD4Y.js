import{j as e,M as p,e as i,C as r}from"./iframe-44hoIhP5.js";import{useMDXComponents as n}from"./index-C14ySbsR.js";import{D as a}from"./JoggingPanel.stories-DQQQNBZY.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BuDovzwn.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-JNXVytam.js";import"./useTheme-DDsUOZZW.js";import"./useLocalObservable-DJ6m9l3M.js";import"./Stack-DKD_mngY.js";import"./Typography-BvzhM_O5.js";import"./styled-244R6eLn.js";import"./useThemeProps-BXYlZaLn.js";import"./getThemeProps-CV7cE1Dp.js";import"./createSvgIcon-BDo7lS3l.js";import"./SvgIcon-CqUiKtq6.js";import"./getValidReactChildren-Bs0U7isG.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CO3o4x07.js";import"./context-CRXxSswD.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-C4fjEma5.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-sj6Cuf0D.js";import"./hooks-01Z8cBSl.js";import"./useTranslation-Cg6UPIkg.js";import"./IconButton-CjQWLDqc.js";import"./ButtonBase-Bgn2EZlQ.js";import"./useTimeout-B9Hv7638.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BjDwBpma.js";import"./useControlled-DOaGVFmw.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-m-QT1kb6.js";import"./useSlotProps-iZprujtb.js";import"./Popover-CmGW7EoJ.js";import"./useSlot-0MBGqVe7.js";import"./Paper-BlN86j55.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D1f_ot7q.js";import"./utils-CT7Acchw.js";import"./Fade-C0yU-RH2.js";import"./Alert-BcbxwhLm.js";import"./Tab-Cf5852KE.js";import"./Button-Df_yjjlD.js";import"./axis-x-CRPqoHv4.js";import"./rotation-NHUc8k0n.js";import"./JoggingCartesianAxisControl-CczTZyDX.js";import"./Select-DturI76y.js";import"./listItemTextClasses-DUz29HtO.js";import"./MenuItem-5oA_-LIL.js";import"./dividerClasses-Ks-kWDZK.js";import"./Box-DKrR8TZY.js";import"./ToggleButton-C5OwUQAp.js";import"./VelocitySlider-gdtSwsQV.js";import"./Divider-DhWET0ef.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
