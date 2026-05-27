import{j as e,M as p,e as i,C as r}from"./iframe-CM7yJV8d.js";import{useMDXComponents as n}from"./index-DJFbaP7r.js";import{D as a}from"./JoggingPanel.stories-CpzTS3p7.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-C1piM_IA.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BHPOMfTO.js";import"./useTheme-z5AdC5JJ.js";import"./useLocalObservable-CrNoSYzC.js";import"./Stack-7SO3NtYX.js";import"./Typography-DZPgDbRn.js";import"./styled-DFKj8Qa5.js";import"./useThemeProps-DDHHA-H4.js";import"./getThemeProps-DF3Lnwyt.js";import"./createSvgIcon-B1L4HWYf.js";import"./SvgIcon-Cz970-H4.js";import"./getValidReactChildren-CDO-0oPm.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-TMKJ5AQS.js";import"./context-VSYot3tW.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BULUfrO4.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DBgihZO6.js";import"./hooks-DXd3-Sog.js";import"./useTranslation-Vco4mH-V.js";import"./IconButton-CES9VijH.js";import"./ButtonBase-Civ89Hsn.js";import"./useTimeout-BMwhRLm1.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BVlLyAjK.js";import"./useControlled-CpDQSSut.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CUp63VMv.js";import"./useSlotProps-Bv0DHkGB.js";import"./Popover-BcdlVbeB.js";import"./useSlot-Cg36KikH.js";import"./Paper-B0lTKRlq.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BtxUzP4C.js";import"./utils-DfP829hM.js";import"./Fade-gUC3c_nb.js";import"./Alert-B5Zh1tf-.js";import"./Tab-CCt4gu_O.js";import"./Button-BK3K8Q_1.js";import"./axis-x-UUUsqmCl.js";import"./rotation-D-rkIrC7.js";import"./JoggingCartesianAxisControl-BP90aWjs.js";import"./Select-BWIMDkPT.js";import"./listItemTextClasses-DjFGcWBI.js";import"./MenuItem-CyIbKlS3.js";import"./dividerClasses-CcL5DJfd.js";import"./ToggleButton-UICF_cPV.js";import"./Box-DuC_CC2P.js";import"./VelocitySlider-Bx-pCXIC.js";import"./Divider-BZ4ur7AQ.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
