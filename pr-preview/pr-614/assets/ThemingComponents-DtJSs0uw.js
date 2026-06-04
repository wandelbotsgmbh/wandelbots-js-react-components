import{j as e,M as a,e as i,C as r}from"./iframe-CpXZ1sfw.js";import{useMDXComponents as n}from"./index-DpeChjgv.js";import{D as p}from"./JoggingPanel.stories-DHObqIoT.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CxL7PaY-.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DDaQ-Mwn.js";import"./useTheme-BvV1J_lS.js";import"./useLocalObservable-Cer9mEsC.js";import"./Stack-BCdMOuBd.js";import"./Typography-W2tkGr_I.js";import"./styled-DZPuci9R.js";import"./useThemeProps-BzatpvyN.js";import"./getThemeProps-D8HMFAjK.js";import"./createSvgIcon-CIAt2Bba.js";import"./SvgIcon-CZkt748a.js";import"./getValidReactChildren-CygeaIyE.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-BEXytYls.js";import"./context-DgGyg4U9.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-N6Pr6J1M.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BZvmLFnB.js";import"./hooks-CYTxnQxd.js";import"./useTranslation-FndilM1Y.js";import"./IconButton-M6m65Dft.js";import"./ButtonBase-D63WrDTT.js";import"./useTimeout-BXmFU7IG.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-oJRYaTrq.js";import"./useControlled-Bm78H0iL.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BYtytRHW.js";import"./useSlotProps-CATYtp46.js";import"./Popover-TACpv38m.js";import"./useSlot-CFEqSrfB.js";import"./Paper-BZARBTB4.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CXBastih.js";import"./utils-Hm1Nsoe7.js";import"./Fade-Bf9-aiAS.js";import"./Alert-ByWu2z_f.js";import"./Tab-CJXjLaiq.js";import"./Button-DZ52Zr9K.js";import"./axis-x-poyPnCj_.js";import"./rotation-C0MFW9Ih.js";import"./JoggingCartesianAxisControl-D6ssIrNv.js";import"./Box-D-TT-5fZ.js";import"./Select-Cb_yslO0.js";import"./listItemTextClasses-BSW-GxPp.js";import"./MenuItem-BK1zc40R.js";import"./dividerClasses-CF4eRuVQ.js";import"./ToggleButton-BCCt9KSD.js";import"./VelocitySlider-DfDsATGM.js";import"./Divider-CLdDBdH8.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
`,e.jsx(r,{of:p,sourceState:"none"}),`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
