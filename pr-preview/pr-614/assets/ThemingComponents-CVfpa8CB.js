import{j as e,M as a,e as i,C as r}from"./iframe-Boc2Vj5X.js";import{useMDXComponents as n}from"./index-DAPNWzz5.js";import{D as p}from"./JoggingPanel.stories-B5MAj56y.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DynEvPbw.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-B_mGVRlj.js";import"./useTheme-CFT5e2eW.js";import"./useLocalObservable-B6rJruff.js";import"./Stack-Xx2r355d.js";import"./Typography-yaxxP4Et.js";import"./styled-CHx0uQd6.js";import"./useThemeProps-BGiPEC9V.js";import"./getThemeProps-DxiFhODp.js";import"./createSvgIcon-D13Rdsea.js";import"./SvgIcon-YLn8gzNO.js";import"./getValidReactChildren-73x8jkg5.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-ZE08aDRw.js";import"./context-CvY8aWti.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CUwMqeoR.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-27MdH76H.js";import"./hooks-C_kk7p-W.js";import"./useTranslation-CfikRDu7.js";import"./IconButton-lXK2Y4f-.js";import"./ButtonBase-C8leKDN-.js";import"./useTimeout-Bk5GKJzO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Dc35Xrlb.js";import"./useControlled-Cn2eh8A5.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DP4m3IbG.js";import"./useSlotProps-gZhz9P5L.js";import"./Popover-Dj0b-X0j.js";import"./useSlot-BgFO0DGq.js";import"./Paper-Dexq5-VZ.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BasmjBcQ.js";import"./utils-BLv-fyJE.js";import"./Fade-BI4Bp2sL.js";import"./Alert-DUq4JCr6.js";import"./Tab-bm6iQza2.js";import"./Button-DLVpD6dX.js";import"./axis-x-DvrefwwS.js";import"./rotation-BZS6KqWG.js";import"./JoggingCartesianAxisControl-C76Uj3RI.js";import"./Box-CiyM976l.js";import"./Select-B0i59AYC.js";import"./listItemTextClasses-KuIDwNU5.js";import"./MenuItem-DFEBo0Ie.js";import"./dividerClasses-pI2GrlSV.js";import"./ToggleButton-CufuvQ2e.js";import"./VelocitySlider-d88JvRE8.js";import"./Divider-B5OJFazL.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
