import{j as e,M as a,e as r,C as i}from"./iframe-Cad1GJBg.js";import{useMDXComponents as n}from"./index-CsuHhnFA.js";import{D as p}from"./JoggingPanel.stories-MR6O1h45.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BIZrzT-G.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-B9p5Gkek.js";import"./useTheme-wgipxAd6.js";import"./useLocalObservable-DVBJLKj7.js";import"./Stack-BRAgtNbF.js";import"./Typography-DIvN_j2f.js";import"./styled-Dk0-1zX5.js";import"./useThemeProps-bwZOTb_0.js";import"./getThemeProps-BwFTiJT3.js";import"./createSvgIcon-BzGowDrd.js";import"./SvgIcon-BnEp_D_A.js";import"./getValidReactChildren-B2mQQ9us.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-CRLYvFhp.js";import"./context-DIMlD-Eo.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-adOvCmT-.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-PVdHddeT.js";import"./hooks-NKPOmrDj.js";import"./useTranslation-D0NTPn30.js";import"./IconButton-DxtG7YEv.js";import"./ButtonBase-C83Z7jJT.js";import"./useTimeout-CBu4Gfj9.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DSB1W-da.js";import"./useControlled-BePhG-XX.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BnXvEYWn.js";import"./useSlotProps-DwSbD0CS.js";import"./Popover-dG34-gg0.js";import"./useSlot-CD-RBfEb.js";import"./Paper-Bg9cWXUW.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Y0SYKYUt.js";import"./utils-DaMUXLCD.js";import"./Fade-CHAENy7L.js";import"./Alert-BrXUg3XO.js";import"./Tab-DVJD83gH.js";import"./Button-Co_hWmKo.js";import"./axis-x-C-D04iM_.js";import"./rotation-CGG7qBZQ.js";import"./JoggingCartesianAxisControl-CbCzwdGr.js";import"./Box-DUd3MqRt.js";import"./Select-C6sozSke.js";import"./listItemTextClasses-cXtulD4f.js";import"./MenuItem-C3EWGP_4.js";import"./dividerClasses-D0UokfId.js";import"./ToggleButton-yXlU1G1y.js";import"./VelocitySlider-BTQvOidx.js";import"./Divider-C3xJ9_yx.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(i,{of:p,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme({
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
`,e.jsx(i,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(r,{dark:!0,code:`
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
`,e.jsx(i,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
