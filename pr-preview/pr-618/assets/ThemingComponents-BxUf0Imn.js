import{j as e,M as a,e as i,C as r}from"./iframe-B5QuGMjp.js";import{useMDXComponents as n}from"./index-C2J499iS.js";import{D as p}from"./JoggingPanel.stories-DfXiW-IX.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CzqQoAX7.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-jzs0njo_.js";import"./useTheme-DyBIfWj3.js";import"./useLocalObservable-Cvb-zTQ7.js";import"./Stack-BHDH169f.js";import"./Typography-CrlbwWDa.js";import"./styled-D1uX4bve.js";import"./useThemeProps-N88UKK0O.js";import"./getThemeProps-C8th2CFP.js";import"./createSvgIcon-Umkb0fkK.js";import"./SvgIcon-B3mqJ87k.js";import"./getValidReactChildren-DrMpihL5.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-DMOifEec.js";import"./context-CA8FdNYC.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-voHYLowf.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DCqyM3Dv.js";import"./hooks-uSjawiLJ.js";import"./useTranslation-qv8ysC4d.js";import"./IconButton--XqJkMhJ.js";import"./ButtonBase-B6geqTjM.js";import"./useTimeout-BS8fzZm4.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BNc6ancs.js";import"./useControlled-sSW6TrFX.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BwNMEpYD.js";import"./useSlotProps-DvNmar4i.js";import"./Popover-DjWxNMXL.js";import"./useSlot-DCpDVAbb.js";import"./Paper-BY3n15DG.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B96oIiUe.js";import"./utils-DZiPGVC9.js";import"./Fade-CG24A_l8.js";import"./Alert-AzGNL5ty.js";import"./Tab-DgL5P33O.js";import"./Button-BctY-s9Q.js";import"./axis-x-asypowEL.js";import"./rotation-3tOI0828.js";import"./JoggingCartesianAxisControl-CM4ShY-z.js";import"./Box-DeghQrm3.js";import"./Select-BqhqJDVu.js";import"./listItemTextClasses-B1ePVTyV.js";import"./MenuItem-mVlhW2OA.js";import"./dividerClasses-DNgfhWmf.js";import"./ToggleButton-Cm788TSC.js";import"./VelocitySlider-75vV_1ew.js";import"./Divider-CRgkCow-.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
