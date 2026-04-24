import{j as e,M as p,e as i,C as r}from"./iframe-CjkWaB0r.js";import{useMDXComponents as n}from"./index-CXHC9Mr7.js";import{D as a}from"./JoggingPanel.stories-DsZCqYaW.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DgdwoQlA.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B9V_kV2d.js";import"./useTheme-Bk4_ueQb.js";import"./useLocalObservable-DgVsS8od.js";import"./Stack-BDML2keN.js";import"./Typography-D-u8sNmY.js";import"./styled-AyDrVyP9.js";import"./useThemeProps-CSGMSxPc.js";import"./getThemeProps-DF-Ra3BQ.js";import"./createSvgIcon-BPZeSsoz.js";import"./SvgIcon-CKDKiHSc.js";import"./getValidReactChildren-Rss1cyvr.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-xf8oVIAh.js";import"./context-6Lwi58kF.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B6pQwjho.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl--oLSZ4Iy.js";import"./hooks-CINipDZ8.js";import"./useTranslation-Cep-YPFm.js";import"./IconButton-DwBaVFAI.js";import"./ButtonBase-CemTr4II.js";import"./useTimeout-CWUswA-U.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B-LlarhK.js";import"./useControlled-BRGJcJ5q.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B06vc6RE.js";import"./useSlotProps-DL1aIr2Y.js";import"./Popover-eUO7yTZF.js";import"./useSlot-t_aYngUb.js";import"./Paper-BAz4g2wF.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bz29Sl6k.js";import"./utils-BI6BwBf9.js";import"./Fade-Dxls6hfm.js";import"./Alert-DgnPYXu6.js";import"./Tab-CzsBWHFR.js";import"./Button-Cm6cd10T.js";import"./axis-x-CUuzFLiC.js";import"./rotation-5-LOTbCD.js";import"./JoggingCartesianAxisControl-DFLGRtpv.js";import"./Select-DQ0T1oeA.js";import"./listItemTextClasses-Cu_k14aa.js";import"./MenuItem-DCixZLnk.js";import"./dividerClasses-D40HZ8Rf.js";import"./Box-DpEzWbYz.js";import"./ToggleButton-CGaI5pEe.js";import"./VelocitySlider-BmZFhpYe.js";import"./Divider-CdwfA451.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
