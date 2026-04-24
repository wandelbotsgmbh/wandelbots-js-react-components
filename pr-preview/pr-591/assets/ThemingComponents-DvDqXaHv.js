import{j as e,M as p,e as i,C as r}from"./iframe-DF6c2dkY.js";import{useMDXComponents as n}from"./index-DdGBgiQq.js";import{D as a}from"./JoggingPanel.stories-BqcTEj0e.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DlseY_8c.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CQtjIe7Y.js";import"./useTheme-ypqlOKkP.js";import"./useLocalObservable-COp2RnkE.js";import"./Stack-YlC1Rb40.js";import"./Typography-Bgg-Huzl.js";import"./styled-C9DKh_lZ.js";import"./useThemeProps-D8mWAyUm.js";import"./getThemeProps-BvXfbr_G.js";import"./createSvgIcon-C_gd4y8_.js";import"./SvgIcon-DADENsJK.js";import"./getValidReactChildren-Bsc0Xmyd.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B56U4FqE.js";import"./context-Cvg5SO6c.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CKMUUu8_.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DzMnvwum.js";import"./hooks-Os9sFqT0.js";import"./useTranslation-CxsBUn11.js";import"./IconButton-27pDd_-2.js";import"./ButtonBase-CbXdqDA1.js";import"./useTimeout-6B51JAm4.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Ca2phYq-.js";import"./useControlled-um3Rc1wn.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CdjMYrAd.js";import"./useSlotProps-GRJWPVRB.js";import"./Popover-Caqw3INv.js";import"./useSlot-BVw2G__l.js";import"./Paper-AXuX-76d.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Dt1uXJ9G.js";import"./utils-BncWIjs1.js";import"./Fade-kmtJmqRa.js";import"./Alert-BKbbBdBF.js";import"./Tab-CU5OX7pG.js";import"./Button-hXFdvZGW.js";import"./axis-x-CR_OQQ1e.js";import"./rotation-CBcJJE14.js";import"./JoggingCartesianAxisControl-CvbEMpZP.js";import"./Select-lRGTUlbr.js";import"./listItemTextClasses-dXnqZ-av.js";import"./MenuItem-BRezWIXX.js";import"./dividerClasses-CewJnzUd.js";import"./Box-B-UgyHUp.js";import"./ToggleButton-DBw-YLWf.js";import"./VelocitySlider-BIFB8Om3.js";import"./Divider-Cf-aO2oW.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
