import{j as e,M as a,e as i,C as r}from"./iframe-DlVyBzpi.js";import{useMDXComponents as n}from"./index-FIg5dnsw.js";import{D as p}from"./JoggingPanel.stories-DywlfoWc.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BYmZP6FI.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Bsgq13ma.js";import"./useTheme-kw-UmSir.js";import"./useLocalObservable-BmLqewsd.js";import"./Stack-Cfn1Rccn.js";import"./Typography-C2l6Re_h.js";import"./styled-DSPUPZpQ.js";import"./useThemeProps-C-QfhJkQ.js";import"./getThemeProps-cuYpjEUq.js";import"./createSvgIcon-7Pk92ygQ.js";import"./SvgIcon-j6zUy6_U.js";import"./getValidReactChildren-CyLW5cVS.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-CGu16mc7.js";import"./context-BQrBuDwe.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-umI-wE3P.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-K7-kYWBL.js";import"./hooks-DC-6qlcE.js";import"./useTranslation-DiLAa0U5.js";import"./IconButton-BPaBVlU0.js";import"./ButtonBase-BZyoBJ6y.js";import"./useTimeout-DT9FEl5p.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BABbXdB6.js";import"./useControlled-B8VEYPCH.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-MiAiPoXo.js";import"./useSlotProps-Cn3iRUcL.js";import"./Popover-BDC13S1F.js";import"./useSlot-DpMwvKlY.js";import"./Paper-BzNUsV-K.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Cp41W3FY.js";import"./utils-B9xuRM3M.js";import"./Fade-DO4JEcHl.js";import"./Alert-j9eyTxRI.js";import"./Tab-CWmpp1Be.js";import"./Button-CwzLgPPM.js";import"./axis-x-Cvjck_zS.js";import"./rotation-Cr1cDKoi.js";import"./JoggingCartesianAxisControl-BwZxA5hP.js";import"./Box-qwGWoIt1.js";import"./Select-CzqHmd91.js";import"./listItemTextClasses-ZZ6K7qVk.js";import"./MenuItem-D46MnSRv.js";import"./dividerClasses-CD3T0C7c.js";import"./ToggleButton-Pl-GZCCS.js";import"./VelocitySlider-CHB6R4i6.js";import"./Divider-DgFx0_NV.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
