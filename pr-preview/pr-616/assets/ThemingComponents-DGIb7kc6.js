import{j as e,M as a,e as r,C as i}from"./iframe-DsIznll6.js";import{useMDXComponents as n}from"./index-Cu9z6NLM.js";import{D as p}from"./JoggingPanel.stories-BEdW2NoP.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BB7EGHKr.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-C6ovD_FK.js";import"./useTheme-B0FSM7P6.js";import"./useLocalObservable-D6t2bHC_.js";import"./Stack-BEWfguQ2.js";import"./Typography-BxHRdZ9I.js";import"./styled-CMvJS0dM.js";import"./useThemeProps-BapssDN1.js";import"./getThemeProps-Cr2DU6F7.js";import"./createSvgIcon-PMG1r61Z.js";import"./SvgIcon-DoN0bCkI.js";import"./getValidReactChildren-BTpOBsZP.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-BIfxugPc.js";import"./context-d2CPQsug.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-D6oZ61_8.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CBTiYsOZ.js";import"./hooks-F7aCTiAq.js";import"./useTranslation-CdcCvAMV.js";import"./IconButton-B4PNVDVK.js";import"./ButtonBase-DQ7U0C-3.js";import"./useTimeout-BOvcVN-v.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DQ9Nl8Bf.js";import"./useControlled-CiqNq30m.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-RfnMYMpl.js";import"./useSlotProps-DfJcPf-6.js";import"./Popover-BW8Rb4dP.js";import"./useSlot-D9OoSkzS.js";import"./Paper-McALZ7Oz.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bl5PbDcM.js";import"./utils-DoOhbL3j.js";import"./Fade-BrMVxWCP.js";import"./Alert-DYq4WO-D.js";import"./Tab-BfDpxBMP.js";import"./Button-BcWovFl4.js";import"./axis-x-rLraqa-I.js";import"./rotation-BkOSNpm-.js";import"./JoggingCartesianAxisControl-DNJlhAgo.js";import"./Box-Djfsij3E.js";import"./Select-CA9j9mig.js";import"./listItemTextClasses-YSV6tf82.js";import"./MenuItem-d4_0BGjr.js";import"./dividerClasses-kmKSPPUW.js";import"./ToggleButton-Cr0eLvSG.js";import"./VelocitySlider-DOc-YGGM.js";import"./Divider-C3suUyIf.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
