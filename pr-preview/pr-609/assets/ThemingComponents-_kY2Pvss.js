import{j as e,M as p,e as i,C as r}from"./iframe-DsUmfJSm.js";import{useMDXComponents as n}from"./index-k01BtSUO.js";import{D as a}from"./JoggingPanel.stories-DNgY_zNh.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DV1RVQ9k.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BXZs1GoX.js";import"./useTheme-DufqDysx.js";import"./useLocalObservable-CGDjSXaJ.js";import"./Stack-Bt6fIear.js";import"./Typography-qGTMw4GJ.js";import"./styled-NYwgL3DE.js";import"./useThemeProps-Bnv9_XyV.js";import"./getThemeProps-Dx-CnyDg.js";import"./createSvgIcon-CHAGv8R0.js";import"./SvgIcon-C8klQgEI.js";import"./getValidReactChildren-CgEhzll2.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-C1dp0D93.js";import"./context-C9r-NdSV.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BVSMhwVd.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-D03Qj8fH.js";import"./hooks-Cx-h7byX.js";import"./useTranslation-DnexozJr.js";import"./IconButton-B7H7nq-p.js";import"./ButtonBase-LOzYJsY3.js";import"./useTimeout-DqXxMr3N.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BIOegyXx.js";import"./useControlled-CZgoEVpv.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DcusVXcS.js";import"./useSlotProps-BNV2_yYu.js";import"./Popover-CgAA4VqW.js";import"./useSlot-X54YKWe7.js";import"./Paper-CFJ8ram0.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DHkhJzD2.js";import"./utils-BPa-Grcl.js";import"./Fade-To34lP5j.js";import"./Alert-CSJleMUg.js";import"./Tab-DMtJr5hN.js";import"./Button-D5-LN_13.js";import"./axis-x-D46iEiTR.js";import"./rotation-ps9Q3SWs.js";import"./JoggingCartesianAxisControl-tpFQoHxO.js";import"./Select-LX96Vr4M.js";import"./listItemTextClasses-DkXCITbk.js";import"./MenuItem-olvp6wZn.js";import"./dividerClasses-DFVU_BVQ.js";import"./ToggleButton-V5PO3jxS.js";import"./Box-GDlSCJRY.js";import"./VelocitySlider-CJOxrBHq.js";import"./Divider-DvTS1biu.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
