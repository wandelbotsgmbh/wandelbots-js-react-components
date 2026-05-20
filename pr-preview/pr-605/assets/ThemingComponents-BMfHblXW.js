import{j as e,M as p,e as i,C as r}from"./iframe-CxmfdHuz.js";import{useMDXComponents as n}from"./index-BkmO7D1P.js";import{D as a}from"./JoggingPanel.stories-D_e1iEBJ.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-oU93t1MO.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BwwCr1o_.js";import"./useTheme-C1yjOFf-.js";import"./useLocalObservable-Ch0X9Lm9.js";import"./Stack-i1dNGq43.js";import"./Typography-jr8ADynv.js";import"./styled-C2YkWhUp.js";import"./useThemeProps-Cq7L-F1-.js";import"./getThemeProps-DH3ZUBOg.js";import"./createSvgIcon-hjnmR2te.js";import"./SvgIcon-C3bJ3kMJ.js";import"./getValidReactChildren-CaA-zBNo.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-D2LPhBva.js";import"./context-CFahWQCx.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-Clrjn_pK.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Bxcus1Uv.js";import"./hooks-Qwwjthxc.js";import"./useTranslation--kydLXKw.js";import"./IconButton-DFyFMFGn.js";import"./ButtonBase-B7AdsNN5.js";import"./useTimeout-DBywIGx_.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BhvQDILg.js";import"./useControlled-AgAaFqdE.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CuLHjvyk.js";import"./useSlotProps-AU9O2JWv.js";import"./Popover-BEZi7uq_.js";import"./useSlot-SWRv0Orq.js";import"./Paper-D7RVQxGh.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Cg_sLgT8.js";import"./utils--2hH7hw6.js";import"./Fade-D1AID9wn.js";import"./Alert-CKNp4L05.js";import"./Tab-CwLbCCPC.js";import"./Button-CnkLqXWa.js";import"./axis-x-DYOp2_4Q.js";import"./rotation-D22sXwAz.js";import"./JoggingCartesianAxisControl-DxvZMJ4U.js";import"./Select-DW3lS5jH.js";import"./listItemTextClasses-DCZSA69C.js";import"./MenuItem-DRYvi57N.js";import"./dividerClasses-BebhLpgx.js";import"./Box-jGcenm8Q.js";import"./ToggleButton-COFUKIPR.js";import"./VelocitySlider-cgDpVj5x.js";import"./Divider-Q-aPUU2E.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
