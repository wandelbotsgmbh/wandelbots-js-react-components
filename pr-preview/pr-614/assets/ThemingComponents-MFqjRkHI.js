import{j as e,M as a,e as i,C as r}from"./iframe-DHLZxDk2.js";import{useMDXComponents as n}from"./index-BT6H3Ort.js";import{D as p}from"./JoggingPanel.stories-CShIj7Gq.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BY4ks4ef.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BDxrS0DO.js";import"./useTheme-BVqqz3Ma.js";import"./useLocalObservable-CM65C0Jt.js";import"./Stack-CjNl26fg.js";import"./Typography-SeUMkerZ.js";import"./styled-CDsBB1OD.js";import"./useThemeProps-DObzeCIW.js";import"./getThemeProps-BI-Nr62g.js";import"./createSvgIcon-CepTjeIv.js";import"./SvgIcon-BBR7t137.js";import"./getValidReactChildren-Dnxj9E3G.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-DQ_wlx5p.js";import"./context-yDNSQZ-N.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CLDqnjTl.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Bzln7OQl.js";import"./hooks-BSBK1TUo.js";import"./useTranslation-C_7uSPP7.js";import"./IconButton-UUSYIXci.js";import"./ButtonBase-S6boMzXk.js";import"./useTimeout-CIIgN2b7.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-L3PptOvd.js";import"./useControlled-Ci2_O6-S.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BNT6GgWx.js";import"./useSlotProps-DA3nuVzb.js";import"./Popover-mC0J53kV.js";import"./useSlot-D33Mnr7I.js";import"./Paper-lxQITlLY.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-ahxVIYjq.js";import"./utils-BQ8mk8g2.js";import"./Fade-W2QmvGDf.js";import"./Alert-CaxxIsML.js";import"./Tab-DZMPcpX3.js";import"./Button-BFo8UAFG.js";import"./axis-x-BI6xDl5t.js";import"./rotation-DtdXARpG.js";import"./JoggingCartesianAxisControl-DW-2zfuz.js";import"./Box-DsxLsmXk.js";import"./Select-BdzNLhG5.js";import"./listItemTextClasses-mAgHenQX.js";import"./MenuItem-BUep-jZ8.js";import"./dividerClasses-CkbndXiT.js";import"./ToggleButton-DS-O0Rd4.js";import"./VelocitySlider-BZ38bE6x.js";import"./Divider-C77cEbe-.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
