import{j as e,M as p,e as i,C as r}from"./iframe-C7xEWNK7.js";import{useMDXComponents as n}from"./index-DNMqzkQO.js";import{D as a}from"./JoggingPanel.stories-Bg-Bcnfv.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BGufbsJA.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CTyz9DXQ.js";import"./useTheme-Bu9-ccFP.js";import"./useLocalObservable-BxCZVZ2u.js";import"./Stack-CpBWYhzk.js";import"./Typography-4x9EgFN8.js";import"./styled-DnpNcwRh.js";import"./useThemeProps-CWGbb3xY.js";import"./getThemeProps-rxOIgxSj.js";import"./createSvgIcon-CBs1NLyo.js";import"./SvgIcon-CU6ZXLAC.js";import"./getValidReactChildren-v2gCXwYn.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DF4E-5ZW.js";import"./context-BCAr3CMY.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BP78AaYc.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-y5W8R-9o.js";import"./hooks-B1vPUlB-.js";import"./useTranslation-DhG_Cm1i.js";import"./IconButton-DhQKXmK3.js";import"./ButtonBase-CArdJ1LK.js";import"./useTimeout-DGAuAM58.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Szxw0tnA.js";import"./useControlled-DTF4bgBP.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DiQcYUks.js";import"./useSlotProps-yI0kBNx8.js";import"./Popover-CjlIZE8G.js";import"./useSlot-KjnR5l5Y.js";import"./Paper-CGJLdHH_.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BtHpdPAE.js";import"./utils-IcFnE6wl.js";import"./Fade-BMQ145in.js";import"./Alert-DMWMSeVB.js";import"./Tab-DnGDs1wj.js";import"./Button-BSUd8iaS.js";import"./axis-x-D6DipFCb.js";import"./rotation-BefM85rv.js";import"./JoggingCartesianAxisControl-fl9sctDB.js";import"./Select-D8FvCw2B.js";import"./listItemTextClasses-BcidDDlS.js";import"./MenuItem-qQPhJE6f.js";import"./dividerClasses-bN1yRyfL.js";import"./Box-DeV0gvSL.js";import"./ToggleButton-Lq-7u3PU.js";import"./VelocitySlider-lKRcKayl.js";import"./Divider-BIfx_wKR.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
