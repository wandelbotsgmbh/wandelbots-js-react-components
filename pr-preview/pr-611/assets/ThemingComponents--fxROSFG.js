import{j as e,M as p,e as i,C as r}from"./iframe-IA2p1po4.js";import{useMDXComponents as n}from"./index-B7Lf9-Vi.js";import{D as a}from"./JoggingPanel.stories-gQ9-iGzF.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BtLiIltP.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-C-DtPQAt.js";import"./useTheme-B-3kO3sD.js";import"./useLocalObservable-SGKDTOvr.js";import"./Stack-DIPCcrMn.js";import"./Typography-DpaiujBV.js";import"./styled-6SQBWaxe.js";import"./useThemeProps-CJYT0f8W.js";import"./getThemeProps-BwdJp2an.js";import"./createSvgIcon-CteLl8Zq.js";import"./SvgIcon-BeekDVw_.js";import"./getValidReactChildren-B2brgijl.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-y8qPrsT7.js";import"./context-Dkb--uYD.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-HTh_Ah9h.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C3y0qonD.js";import"./hooks-BGQPi58s.js";import"./useTranslation-Dwaq7Tai.js";import"./IconButton-2jP5UMqf.js";import"./ButtonBase-B2AnT0QV.js";import"./useTimeout-SFR-6WH-.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Cr-PMqK6.js";import"./useControlled-zYhHPKXn.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CNSytUQf.js";import"./useSlotProps-CR-co5aw.js";import"./Popover-HNyXdA4K.js";import"./useSlot-BJ5T4JGz.js";import"./Paper-DE9mW8En.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CUma3SnX.js";import"./utils-W4k7MCsG.js";import"./Fade-BytJEt24.js";import"./Alert-COYbbT_w.js";import"./Tab-q50P7Qsf.js";import"./Button-nReczDSm.js";import"./axis-x-Q6VTGz2I.js";import"./rotation-D4ZtgvbY.js";import"./JoggingCartesianAxisControl-BkoeCpbJ.js";import"./Select-BwDK_Awf.js";import"./listItemTextClasses-BSW7JZeM.js";import"./MenuItem-DiiN1wKB.js";import"./dividerClasses-C6TNXg_8.js";import"./Box-BHICY57P.js";import"./ToggleButton-3XfG25L2.js";import"./VelocitySlider-B2yiYYJw.js";import"./Divider-DPzz2s1d.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
