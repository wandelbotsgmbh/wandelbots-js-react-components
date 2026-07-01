import{j as e,M as a,e as i,C as r}from"./iframe-BFeF9gk2.js";import{useMDXComponents as n}from"./index-ozDmechc.js";import{D as p}from"./JoggingPanel.stories-DQEDA3MT.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DlPZRsSX.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CKIQFzya.js";import"./useTheme-CJCRPKcM.js";import"./useLocalObservable-Cs4K8wqH.js";import"./Stack-BH-NSAfB.js";import"./Typography-hI18_TwR.js";import"./styled-CH-DqwsO.js";import"./useThemeProps-DCty8Iof.js";import"./getThemeProps-B0jypEog.js";import"./createSvgIcon-DZsBN_jU.js";import"./SvgIcon-f85fcE7w.js";import"./getValidReactChildren-B9eySIEQ.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-BQ1u6IUA.js";import"./context-CcjSgJEl.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-C7jJUx11.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-wQTHNx85.js";import"./hooks-BCfLugnp.js";import"./useTranslation-CXsvNAI4.js";import"./IconButton-CWuSKACi.js";import"./ButtonBase-sRQUBi5w.js";import"./useTimeout-DHMgKmaj.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D_S7SGGO.js";import"./useControlled-C1F4iWXj.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DnUMdTYF.js";import"./useSlotProps-fqu9cOGN.js";import"./Popover-BuKSX9t8.js";import"./useSlot-CbKsaWOU.js";import"./Paper-CyDMh1-h.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DvqV-6aj.js";import"./utils-DVP9FpvH.js";import"./Fade-uSRWjqvd.js";import"./Alert-B1Spb9mW.js";import"./Tab-CWMSE8tr.js";import"./Button-Bq92fsRd.js";import"./axis-x-DB7m5_De.js";import"./rotation-Bj2F8pQX.js";import"./JoggingCartesianAxisControl-o1pViVQg.js";import"./Box-BKRViR-C.js";import"./Select-CGoigSZ0.js";import"./listItemTextClasses-DseFidaJ.js";import"./MenuItem-C2Swpt5T.js";import"./dividerClasses-CHYLQ8Z7.js";import"./ToggleButton-CzZNhe74.js";import"./VelocitySlider-Yel1zH6F.js";import"./Divider-DTbnxmub.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
