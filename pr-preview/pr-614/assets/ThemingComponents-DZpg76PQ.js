import{j as e,M as a,e as i,C as r}from"./iframe-CMU3u0HA.js";import{useMDXComponents as n}from"./index-DysE3pbY.js";import{D as p}from"./JoggingPanel.stories-ryLm3aM0.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BZqn6s-8.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CkBZzoxV.js";import"./useTheme-qwUVGq-e.js";import"./useLocalObservable-nglgGy0k.js";import"./Stack-CET-Wtzx.js";import"./Typography-DWoQoo9A.js";import"./styled-CeV3f7M7.js";import"./useThemeProps-TesQ26B5.js";import"./getThemeProps-BPfhjIvo.js";import"./createSvgIcon-FVOhcLFy.js";import"./SvgIcon-DkcsZYDb.js";import"./getValidReactChildren-D4vghnpN.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-CijBPjDB.js";import"./context-BT1bscDP.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BGChkIlh.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BlgpNH52.js";import"./hooks-CiiBCTh5.js";import"./useTranslation-CqibVMlN.js";import"./IconButton-Bk-AOAl-.js";import"./ButtonBase-BCXWKyhl.js";import"./useTimeout-Cg-XXa24.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-C0uVMpyR.js";import"./useControlled-jk8WrmvX.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-5eTz2etK.js";import"./useSlotProps-BzoeY0Ro.js";import"./Popover-B-bedZ6V.js";import"./useSlot-BjLbfy_u.js";import"./Paper-C3KF2QaH.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Cg6BRwiN.js";import"./utils-CfaxCg-E.js";import"./Fade-9MMaHtT7.js";import"./Alert-BVUNvVLz.js";import"./Tab-D1woAEl2.js";import"./Button-Cy5LSu30.js";import"./axis-x-ZJ7-HFnp.js";import"./rotation-Bsg6-9p8.js";import"./JoggingCartesianAxisControl-uyRva9xh.js";import"./Box-D39dE2EF.js";import"./Select-CNLMBdoI.js";import"./listItemTextClasses-D4fNHVHn.js";import"./MenuItem-DOwA7kCj.js";import"./dividerClasses-BLbr3mjb.js";import"./ToggleButton-By7agk2B.js";import"./VelocitySlider-D-jaKVsl.js";import"./Divider-BVt2iEag.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
