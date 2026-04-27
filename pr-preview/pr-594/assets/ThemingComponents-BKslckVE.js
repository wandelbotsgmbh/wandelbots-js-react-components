import{j as e,M as p,e as i,C as r}from"./iframe-BMcQktZ7.js";import{useMDXComponents as n}from"./index-n41gtyfp.js";import{D as a}from"./JoggingPanel.stories-ClzeUmGh.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-C418n7hf.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-D_Tghz0F.js";import"./useTheme-CVHHyit9.js";import"./useLocalObservable-BnJ0w_YJ.js";import"./Stack-H_tb6mOT.js";import"./Typography-SB9KT5aK.js";import"./styled-CQMNb9Wh.js";import"./useThemeProps-CIuOYlJZ.js";import"./getThemeProps-CA3k7Ef7.js";import"./createSvgIcon-dFiwPo3H.js";import"./SvgIcon-BuXAn5KV.js";import"./getValidReactChildren-BWituB71.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CQd4s9WX.js";import"./context-DGUnB9hR.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Bhl9BAk3.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-38-3ZVQq.js";import"./hooks-DYlmsZZ5.js";import"./useTranslation-DgRet9Ly.js";import"./IconButton-CSsSGLnv.js";import"./ButtonBase-BKDHvGCl.js";import"./useTimeout-CoqDFAAI.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-3WFxASz6.js";import"./useControlled-B3vcnMzr.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Db6HpuFL.js";import"./useSlotProps-CfI_iy_s.js";import"./Popover-DPAuDENX.js";import"./useSlot-CpDF6RBR.js";import"./Paper-t26AaJqV.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-3Ji79hD4.js";import"./utils-C7WBIsRU.js";import"./Fade-CFzm-TAc.js";import"./Alert-CX4m12cb.js";import"./Tab-dttpQ477.js";import"./Button-DL9teXyp.js";import"./axis-x-WmS10yDc.js";import"./rotation-DTEukPbE.js";import"./JoggingCartesianAxisControl-DZ9_ggs_.js";import"./Select-D6sqF8Zd.js";import"./listItemTextClasses-Dj8AON83.js";import"./MenuItem-Cks6x4mZ.js";import"./dividerClasses-BmNZzEOQ.js";import"./Box-D75yl4w_.js";import"./ToggleButton-DGBlmN9H.js";import"./VelocitySlider-kuNNgMtl.js";import"./Divider-Bitp7At7.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
