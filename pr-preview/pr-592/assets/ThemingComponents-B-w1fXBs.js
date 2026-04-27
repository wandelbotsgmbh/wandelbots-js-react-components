import{j as e,M as p,e as i,C as r}from"./iframe-DhdsUEIY.js";import{useMDXComponents as n}from"./index-BBBh85Ii.js";import{D as a}from"./JoggingPanel.stories-Cf-CdJXg.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Bcxmv9zY.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B8vobFSU.js";import"./useTheme-CAYi9Yas.js";import"./useLocalObservable-B_FjvN3C.js";import"./Stack-BNYMr0Rx.js";import"./Typography-CqVlkvmb.js";import"./styled-Br-UfBGC.js";import"./useThemeProps-CvsSN_yF.js";import"./getThemeProps-Cj5lKWUP.js";import"./createSvgIcon-HM7GVLHh.js";import"./SvgIcon-qdWXT4rN.js";import"./getValidReactChildren-DnRJHYRl.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-Inrp6oT6.js";import"./context-CtggvLOJ.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BKh6uyg1.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Cne_j2om.js";import"./hooks-Ckcx9piC.js";import"./useTranslation-COYoMYHG.js";import"./IconButton-CH4QGYXB.js";import"./ButtonBase-CKVI9M2b.js";import"./useTimeout-HYXGpxb5.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-NVXy70CU.js";import"./useControlled-BR_agXVe.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DLKdOERb.js";import"./useSlotProps-Cp7NOKUY.js";import"./Popover-CMZw7wsu.js";import"./useSlot-DfQrFRVx.js";import"./Paper-B4njx4d6.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-TZn5baU1.js";import"./utils-CZ_Efy11.js";import"./Fade-Df5WRmS_.js";import"./Alert-B-bGNoIg.js";import"./Tab-8dUSp7N-.js";import"./Button-ru7IzA0e.js";import"./axis-x-Dbmt8K5p.js";import"./rotation-CxyX3a2E.js";import"./JoggingCartesianAxisControl-CK5LSkW3.js";import"./Select-B-E0v3nY.js";import"./listItemTextClasses-bo7R06wP.js";import"./MenuItem-BQZixSLN.js";import"./dividerClasses-BINWen7d.js";import"./Box-BXLGUvTJ.js";import"./ToggleButton-IDPe1ZWO.js";import"./VelocitySlider-BsDEZB13.js";import"./Divider-2J9y3fhY.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
