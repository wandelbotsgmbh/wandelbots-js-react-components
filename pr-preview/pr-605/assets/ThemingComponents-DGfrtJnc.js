import{j as e,M as p,e as i,C as r}from"./iframe-DnBW-mpw.js";import{useMDXComponents as n}from"./index-B9tO1nFs.js";import{D as a}from"./JoggingPanel.stories-2thhsjSl.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BoZC97Nb.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BItImirN.js";import"./useTheme-BFoiBZoy.js";import"./useLocalObservable-dSinD089.js";import"./Stack-BCUYuGcw.js";import"./Typography-BYquKsyX.js";import"./styled-CoOsKz8W.js";import"./useThemeProps-C_VMY15T.js";import"./getThemeProps-Bp3Nlaib.js";import"./createSvgIcon-ORYM7w_U.js";import"./SvgIcon-BpNUpoak.js";import"./getValidReactChildren-CZQZtOBP.js";import"./index-Bcq_XY8v.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DGARq3aG.js";import"./context-B7Ar4VFo.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DU1lyo05.js";import"./converters-CNFysZQy.js";import"./CircularProgress-Dbo39_Tt.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DUlD3Zyy.js";import"./hooks-BWze59di.js";import"./useTranslation-Bzeprqlm.js";import"./IconButton-CEH1jFOg.js";import"./ButtonBase-B3B59gZR.js";import"./useTimeout-B7h2j2mv.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-uN-2JOJD.js";import"./useControlled-Cacd_F9b.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BwXq9l2S.js";import"./useSlotProps-C1JHAfse.js";import"./Popover-D6ZaQDXf.js";import"./useSlot-jqsv08Jr.js";import"./Paper-DNJytLmK.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CnFJN2Rv.js";import"./utils-BLfcrTUy.js";import"./Fade-CvmBYJuf.js";import"./Alert-D6LY7nwB.js";import"./Tab-DBxd1GDJ.js";import"./Button-B9bWVl4C.js";import"./axis-x-BrTqOgfc.js";import"./rotation-XpDIFKgh.js";import"./JoggingCartesianAxisControl-Bu3m9psr.js";import"./Select-CaaTvU43.js";import"./listItemTextClasses-Bmz8JzJT.js";import"./MenuItem-D-rCr5cI.js";import"./dividerClasses-BSTHesXm.js";import"./Box-BQeZ9a7Q.js";import"./ToggleButton-BsnYA2g0.js";import"./VelocitySlider-C9t6ngky.js";import"./Divider-DeB6ORWa.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
