import{j as e,M as a,e as i,C as r}from"./iframe-s7ZrqLNA.js";import{useMDXComponents as n}from"./index-euhUF8Zx.js";import{D as p}from"./JoggingPanel.stories-CiJGZD_8.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BL4Bp0RQ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CX2VC1kx.js";import"./useTheme-BfuSoypX.js";import"./useLocalObservable-CyMciJc9.js";import"./Stack-CjQwbftk.js";import"./Typography-BrDDMUAE.js";import"./styled-BWAYR4uy.js";import"./useThemeProps-BVma5PsW.js";import"./getThemeProps-o67rY4qy.js";import"./createSvgIcon-I-Pj84Gs.js";import"./SvgIcon-CBPNTyO7.js";import"./getValidReactChildren-DDEWDiVl.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-CInLho51.js";import"./context-DWM2Yq5H.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BIoqLhir.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DF1h8zgi.js";import"./hooks-TZRkPQSQ.js";import"./useTranslation-BcBAI8a_.js";import"./IconButton-BAWUNZKJ.js";import"./ButtonBase-CF724c6F.js";import"./useTimeout-HSgdfMDh.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-fAnroGmK.js";import"./useControlled-CyhfE2jr.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DPqwijDN.js";import"./useSlotProps-HIFXCtAH.js";import"./Popover-BNXCCSvf.js";import"./useSlot-B6Ro0KqX.js";import"./Paper-Roz3drq0.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BSfp1gtY.js";import"./utils-DCzyp8Tx.js";import"./Fade-Ftal6ojF.js";import"./Alert-BpKfPXvb.js";import"./Tab-DnFazTYC.js";import"./Button-BcNV_ykx.js";import"./axis-x-DXPjuv3O.js";import"./rotation-D-WC15tH.js";import"./JoggingCartesianAxisControl-BNHBCg1U.js";import"./Box-Bdq25nDB.js";import"./Select-C4Jk1Exb.js";import"./listItemTextClasses-0FeK4-uz.js";import"./MenuItem-DnxrhkI0.js";import"./dividerClasses-4UOoYjb4.js";import"./ToggleButton-CGzPjMBk.js";import"./VelocitySlider-CycW_34L.js";import"./Divider-CyXR8F2i.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
