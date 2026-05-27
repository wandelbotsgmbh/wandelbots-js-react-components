import{j as e,M as p,e as i,C as r}from"./iframe-B7eLhB1G.js";import{useMDXComponents as n}from"./index-D3dSVpuR.js";import{D as a}from"./JoggingPanel.stories-DHPWjCYb.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Bm7r2_og.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DTv5M8L7.js";import"./useTheme-IUPPQnTY.js";import"./useLocalObservable-BXIuKSF-.js";import"./Stack-Bukd3C8T.js";import"./Typography-BIi6HOl1.js";import"./styled-DxMcYi3O.js";import"./useThemeProps-DQl74Wc6.js";import"./getThemeProps-DxLpSNSy.js";import"./createSvgIcon-UCPh6Xpv.js";import"./SvgIcon-DbAvX_u_.js";import"./getValidReactChildren-a_8z_1-O.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-D4IaLvUJ.js";import"./context-C66GAeig.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-c4b45OuK.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DSuJFRWb.js";import"./hooks-CYQ0fC8u.js";import"./useTranslation-DDXwJqKN.js";import"./IconButton-BrfOctZK.js";import"./ButtonBase-B-i_deDD.js";import"./useTimeout-DlGHZIfH.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-npyyyMct.js";import"./useControlled-DXGWV2sT.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CHFRxy9U.js";import"./useSlotProps-Miadi8ka.js";import"./Popover-gNHlVkoy.js";import"./useSlot-BR0XpeGg.js";import"./Paper-bHYUPcQX.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Di0PKSQE.js";import"./utils-DiJe37tT.js";import"./Fade-BbENL1qV.js";import"./Alert-6XWm531k.js";import"./Tab-CzYDunOu.js";import"./Button-CylckVM6.js";import"./axis-x-DzGP-s3R.js";import"./rotation-DOjQ0SNL.js";import"./JoggingCartesianAxisControl-DT5d9brt.js";import"./Select-CY201DMi.js";import"./listItemTextClasses-Reo79Ye1.js";import"./MenuItem-CiUdOvEy.js";import"./dividerClasses-CfoS94OU.js";import"./Box-CcKEiYfK.js";import"./ToggleButton-CdDIFL1g.js";import"./VelocitySlider-DkTlJDEy.js";import"./Divider-U221b03p.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
