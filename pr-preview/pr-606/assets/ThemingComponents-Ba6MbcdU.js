import{j as e,M as a,e as i,C as r}from"./iframe-CrnI26pq.js";import{useMDXComponents as n}from"./index-DXN0MUOF.js";import{D as p}from"./JoggingPanel.stories-M1Rxe6xP.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-B3cyM_kE.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-Ckma7CcD.js";import"./useTheme-BLJFR6cv.js";import"./useLocalObservable-D28yU5Ew.js";import"./Stack-Bv51tItc.js";import"./Typography-Bjdz118C.js";import"./styled--BcJjMEz.js";import"./useThemeProps-CUED_EFs.js";import"./getThemeProps-COHO8jbd.js";import"./createSvgIcon-B4c6XfeA.js";import"./SvgIcon-ClYQLYi8.js";import"./getValidReactChildren-Cc5dAQu9.js";import"./index-DHCxF5fF.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-Ci0nU1vS.js";import"./externalizeComponent-C6R6DUdk.js";import"./context-BMRpBBQQ.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-CgeMb0GA.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BJc8XS3H.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DpSGsbIF.js";import"./hooks-BcA-vURs.js";import"./useTranslation-Gu-exPZ-.js";import"./IconButton-PtOsaORq.js";import"./ButtonBase-DTs6PPNJ.js";import"./useTimeout-CK740mVH.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DwBMnDLQ.js";import"./useControlled-T928lM1P.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BxcAXsM5.js";import"./useSlotProps-DcedS0zY.js";import"./Popover-BSJn5iSw.js";import"./useSlot-C17nw9RZ.js";import"./Paper-BRv-Tz-m.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-CGminMKw.js";import"./utils-CUEv2nuH.js";import"./Fade-CknnbYUa.js";import"./Alert-Bv6pca36.js";import"./Tab-BPZEqFfr.js";import"./Button-DNksvveI.js";import"./axis-x-CaSw2USQ.js";import"./rotation-BPQyogNH.js";import"./JoggingCartesianAxisControl-D7CS7iIy.js";import"./Select-CdctDk4l.js";import"./listItemTextClasses-DiAqBBuu.js";import"./MenuItem-BhGKJO80.js";import"./dividerClasses-B-AHBhf4.js";import"./Box-jw_GGJTT.js";import"./ToggleButton-DNp3xl71.js";import"./VelocitySlider-DOOa9vE-.js";import"./Divider-DcoTU4I1.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
