import{j as e,M as p,e as i,C as r}from"./iframe-C-_PEr4F.js";import{useMDXComponents as n}from"./index-PAStVa5D.js";import{D as a}from"./JoggingPanel.stories-Cbdskcgx.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DVUi3A1X.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DJ0FHusK.js";import"./useTheme-BzvwfQCq.js";import"./useLocalObservable-D1exJJcS.js";import"./Stack-D9IuXArQ.js";import"./Typography-hrPxMBZb.js";import"./styled-DqMoxixX.js";import"./useThemeProps-xqY9KdM5.js";import"./getThemeProps-Cn6keKKw.js";import"./createSvgIcon-bSv65n4k.js";import"./SvgIcon-DGX9lv5B.js";import"./getValidReactChildren-DI1kzd46.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DhvSt_J5.js";import"./context-D3bl-uv7.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-_ua-Fk3G.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Dn8KVbCw.js";import"./hooks-Bh6IAmbV.js";import"./useTranslation-DwsPAW-v.js";import"./IconButton-k-tsBcjF.js";import"./ButtonBase-DDVfuFIX.js";import"./useTimeout-BU701t-H.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BBLZom2B.js";import"./useControlled-DWK5kEAD.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BSbGI1mo.js";import"./useSlotProps-Cbb-pAeM.js";import"./Popover-BC9VSNK3.js";import"./useSlot-CeiUI52W.js";import"./Paper-E18E0ptN.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BRY_bIIC.js";import"./utils-5kT5oPbZ.js";import"./Fade-DPU9QbVm.js";import"./Alert-BxWV2nfZ.js";import"./Tab-D_mmHgAa.js";import"./Button-Cn78zCTv.js";import"./axis-x-B1F9phsw.js";import"./rotation-C4yR5WrK.js";import"./JoggingCartesianAxisControl-DUmd0t-Y.js";import"./Box-DW652qMW.js";import"./Select-BNnimodo.js";import"./listItemTextClasses-wkq5rM8u.js";import"./MenuItem-DI_ivNdE.js";import"./dividerClasses-C8pLxzae.js";import"./ToggleButton-oPb8l3bU.js";import"./VelocitySlider-DRDFgoAO.js";import"./Divider-BU1-X-ww.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
