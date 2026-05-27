import{j as e,M as p,e as i,C as r}from"./iframe-C4X6DbwW.js";import{useMDXComponents as n}from"./index-Bz4myz6U.js";import{D as a}from"./JoggingPanel.stories-Cg_c9lJ_.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CN0LG5Kl.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CsEeB92-.js";import"./useTheme-C5CdIxmL.js";import"./useLocalObservable-y5jgtH9K.js";import"./Stack-DvavnoCs.js";import"./Typography-DFEEvr9-.js";import"./styled-Cxuh8You.js";import"./useThemeProps-C4EK_XHx.js";import"./getThemeProps-DfvRs0Wh.js";import"./createSvgIcon-Wrx9RGeB.js";import"./SvgIcon-BiPpAoyL.js";import"./getValidReactChildren-Bk_sGT76.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CYnAAZw0.js";import"./context-BglkCNdI.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BvH1MklR.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C-WC_Msx.js";import"./hooks-CAbiNAn9.js";import"./useTranslation-DsJ3aZFI.js";import"./IconButton-ZCSvVEu0.js";import"./ButtonBase-CqVZecld.js";import"./useTimeout-CCiJeLTo.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BcAdgzrU.js";import"./useControlled-Fab2aNQh.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D8zPUAbS.js";import"./useSlotProps-BaXBozge.js";import"./Popover-DUHxQF0u.js";import"./useSlot-B-55KECa.js";import"./Paper-CmqOqz87.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-eK4SOPEU.js";import"./utils-CUj-OOCK.js";import"./Fade-CQtMc7dg.js";import"./Alert-DYh0c9Qh.js";import"./Tab-BdZnw_dz.js";import"./Button-CHXA_VL1.js";import"./axis-x-2LgDo7-6.js";import"./rotation-CBs6c0Ks.js";import"./JoggingCartesianAxisControl-DKHH7Zs2.js";import"./Select-DQKdnfzu.js";import"./listItemTextClasses-Cf7Mq72g.js";import"./MenuItem-B9qSwNRw.js";import"./dividerClasses-De7NamSU.js";import"./Box-B688Cah7.js";import"./ToggleButton-Oh3rdSsi.js";import"./VelocitySlider-D7BbEgtQ.js";import"./Divider-DEo-2Ajc.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
