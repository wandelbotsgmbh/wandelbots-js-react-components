import{j as e,M as p,e as i,C as r}from"./iframe-VNBGIUsT.js";import{useMDXComponents as n}from"./index-CaAAU8-B.js";import{D as a}from"./JoggingPanel.stories-DWd3c27I.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CsWsc9wJ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-Ca2vBk9E.js";import"./useTheme-DnoFIzLK.js";import"./useLocalObservable-DUm77nfZ.js";import"./Stack-CWw0eW2v.js";import"./Typography-_xEovoiV.js";import"./styled-BFy2eu4m.js";import"./useThemeProps-DlFpyEcu.js";import"./getThemeProps-CAhrhVde.js";import"./createSvgIcon-DZEjwLoB.js";import"./SvgIcon-DIfmOT3J.js";import"./getValidReactChildren-CFOfgBtC.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CKt-t5hp.js";import"./context-BqaCWgSm.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-xt0Se-Jn.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CjIcCLim.js";import"./hooks-DRKma0Jy.js";import"./useTranslation-CuDcYM0Y.js";import"./IconButton-zsDAKERl.js";import"./ButtonBase-mCKICush.js";import"./useTimeout-D_QrI38A.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BSyoVbdu.js";import"./useControlled-8ikIL7Hh.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CT6FaOui.js";import"./useSlotProps-BBL2hYhL.js";import"./Popover-BD7XWTCb.js";import"./useSlot-Ci7jmD9b.js";import"./Paper-OBowjlcs.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bq3bGXdR.js";import"./utils-Bt8_1HxM.js";import"./Fade-Bsc3Qe_9.js";import"./Alert-DLL7x8dt.js";import"./Close-DlgNSEpq.js";import"./Button-CdB_hC51.js";import"./axis-x-BcLf7Tb1.js";import"./rotation-C79XxASZ.js";import"./JoggingCartesianAxisControl-oL-ht5xX.js";import"./Select-DS3CWJ6S.js";import"./listItemTextClasses-BZLiB4NU.js";import"./MenuItem-B8Uck2ve.js";import"./dividerClasses-DpD-BCCf.js";import"./Box-DihJe2Ys.js";import"./ToggleButton-BOK7mPZa.js";import"./VelocitySlider-DYmvx6PM.js";import"./Divider-CuPx9cWk.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
