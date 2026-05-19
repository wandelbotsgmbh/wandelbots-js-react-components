import{j as e,M as p,e as i,C as r}from"./iframe-CAKmp4rk.js";import{useMDXComponents as n}from"./index-Dt8xiTB0.js";import{D as a}from"./JoggingPanel.stories-BndBOuUh.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-8FNKwoQD.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DLxTeJeK.js";import"./useTheme-aBLdMIW5.js";import"./useLocalObservable-C3PF6pgr.js";import"./Stack-CEioPeho.js";import"./Typography-APz3h4le.js";import"./styled-8O9hxnuF.js";import"./useThemeProps-IzrxH-NF.js";import"./getThemeProps-y04XkB-q.js";import"./createSvgIcon-BdnYsR2H.js";import"./SvgIcon-lT4dItk1.js";import"./getValidReactChildren-CHld9ZOA.js";import"./index-CXJ13SqB.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DFr6_erU.js";import"./context-Dyvr6kXv.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DU1lyo05.js";import"./converters-CNFysZQy.js";import"./CircularProgress-BigYyNVf.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-D198Ekeq.js";import"./hooks-DeE9Sm2q.js";import"./useTranslation-BeZwOp74.js";import"./IconButton-Utnw2syr.js";import"./ButtonBase-prxtXDoG.js";import"./useTimeout-CO-grCLr.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-0M9WeRt6.js";import"./useControlled-BhICY6xO.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D3MCcSy3.js";import"./useSlotProps-C55IjNaP.js";import"./Popover-DyqoPakX.js";import"./useSlot-KeS48scm.js";import"./Paper-DciqH-ZU.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D3SvCFT3.js";import"./utils-DsxKZj0F.js";import"./Fade-DS2YC1OP.js";import"./Alert-Cp6Vd1DV.js";import"./Tab-DIqVb73k.js";import"./Button-Dfebia43.js";import"./axis-x-DvBBgiK3.js";import"./rotation-DS85tfOF.js";import"./JoggingCartesianAxisControl-DikWUj23.js";import"./Select-BJs0l-a6.js";import"./listItemTextClasses-DXqa03lp.js";import"./MenuItem-Bx26uCvw.js";import"./dividerClasses-DxQJEgPW.js";import"./Box-cojHj64w.js";import"./ToggleButton-CkiMr3m5.js";import"./VelocitySlider-C-wBe-vS.js";import"./Divider-Dwox8smq.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
