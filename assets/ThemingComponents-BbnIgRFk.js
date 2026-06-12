import{j as e,M as a,e as i,C as r}from"./iframe-CdvPq_J5.js";import{useMDXComponents as n}from"./index-C6ifmIzS.js";import{D as p}from"./JoggingPanel.stories-Ct2BbaC9.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CBVSZtEw.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BEQkG5uV.js";import"./useTheme-BMx762vv.js";import"./useLocalObservable-BwQwtxan.js";import"./Stack-V5ehjch4.js";import"./Typography-DVy_lahi.js";import"./styled-DTrVGn0e.js";import"./useThemeProps-DdtoHKOe.js";import"./getThemeProps-DRkLRDNT.js";import"./createSvgIcon-0eJjmrY7.js";import"./SvgIcon-Dy8tNe0F.js";import"./getValidReactChildren--y9s-WLY.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-erqo-p00.js";import"./context-JO7Y_tQP.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DSt6uf_m.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-D-N0s-au.js";import"./hooks-BFQhHYxu.js";import"./useTranslation-C6JMG1P_.js";import"./IconButton-CUbUZMMh.js";import"./ButtonBase-DkQQQ3uW.js";import"./useTimeout-BEOqa_ew.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CGcTbh2b.js";import"./useControlled-sE8ajiih.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DWuP01E-.js";import"./useSlotProps-DFpAi_-D.js";import"./Popover-DSwpcnD5.js";import"./useSlot-CBoorv5_.js";import"./Paper-DZ5YLlbu.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BcIkMm-t.js";import"./utils-7Y-xYDUZ.js";import"./Fade--TkY-6Gj.js";import"./Alert-cjbyA2gH.js";import"./Tab-Vvbj-3qw.js";import"./Button-B9KnpnbJ.js";import"./axis-x-D6lHFie5.js";import"./rotation-DTfFDEDo.js";import"./JoggingCartesianAxisControl-DgDJ864l.js";import"./Box-QvXRImCh.js";import"./Select-BIoFwkJb.js";import"./listItemTextClasses-h-k4lcfa.js";import"./MenuItem-CCZznAcE.js";import"./dividerClasses-CjeXueck.js";import"./ToggleButton-BCkBbQ7X.js";import"./VelocitySlider-D8DCun4U.js";import"./Divider-BTamV_gx.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
