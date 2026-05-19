import{j as e,M as p,e as i,C as r}from"./iframe-OBhjQyWz.js";import{useMDXComponents as n}from"./index-gzTGp83N.js";import{D as a}from"./JoggingPanel.stories-HM-KEJUe.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-mTM88zbz.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-C19wQv0V.js";import"./useTheme-Dxxhmn9l.js";import"./useLocalObservable-D9B0SpIX.js";import"./Stack-DPkQxlU0.js";import"./Typography-B1KoJ2q7.js";import"./styled-Bni2CDhE.js";import"./useThemeProps-BNLaQ9IC.js";import"./getThemeProps-DLFV0jFg.js";import"./createSvgIcon-BLKUZehO.js";import"./SvgIcon-oVV5Gf8c.js";import"./getValidReactChildren-DtSytMta.js";import"./index-CXJ13SqB.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BlaERw2M.js";import"./context-DTYHCVEI.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DU1lyo05.js";import"./converters-CNFysZQy.js";import"./CircularProgress-DsiK7eqQ.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DPZrsWpb.js";import"./hooks-B_S4tzsg.js";import"./useTranslation-bcLqfiOI.js";import"./IconButton-CAONvW6I.js";import"./ButtonBase-BApT6k7C.js";import"./useTimeout-Cvg84d-X.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-R4x6UPYI.js";import"./useControlled-tcRm9rgB.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-D08EeVE5.js";import"./useSlotProps-DZkyJ_im.js";import"./Popover-R5pz_910.js";import"./useSlot-BCcXSrtW.js";import"./Paper-BN646I5A.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BN4vs4bk.js";import"./utils-zv1GRV67.js";import"./Fade-Z3yzqCAa.js";import"./Alert-DtGnnnTs.js";import"./Tab-zH9n28nt.js";import"./Button-BaNxG2Qa.js";import"./axis-x-Bf-LXm65.js";import"./rotation-D9coiw3m.js";import"./JoggingCartesianAxisControl-D0Yan-K2.js";import"./Select-BcBly8Br.js";import"./listItemTextClasses-D5eVZ8Zo.js";import"./MenuItem-BUIq4Nwd.js";import"./dividerClasses-DoqiyinD.js";import"./Box-C1paHLJs.js";import"./ToggleButton-BWEGAR7_.js";import"./VelocitySlider-Ceu_MK_b.js";import"./Divider-BMKh3gOB.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
