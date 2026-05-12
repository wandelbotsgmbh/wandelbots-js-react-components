import{j as e,M as p,e as i,C as r}from"./iframe-hXx5oMQp.js";import{useMDXComponents as n}from"./index-QLDr0DE2.js";import{D as a}from"./JoggingPanel.stories-DioXQzRF.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Be4mmLQv.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BuwKkyeq.js";import"./useTheme-DRrqKVgv.js";import"./useLocalObservable-Dwq2s9bJ.js";import"./Stack-BFsbkQv7.js";import"./Typography-B05m_3uR.js";import"./styled-CJBq1w2Z.js";import"./useThemeProps-CyhkD0JX.js";import"./getThemeProps-DkGuqda-.js";import"./createSvgIcon-DjscTYY8.js";import"./SvgIcon-BwYJMJ1H.js";import"./getValidReactChildren-aLg8ETmP.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BcXOS-uX.js";import"./context-BPYY6mhq.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-WuZsF_M_.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DUGQGC3B.js";import"./hooks-B-nxMb6C.js";import"./useTranslation-BpEg6LoI.js";import"./IconButton-CjO82949.js";import"./ButtonBase-BDET1SPp.js";import"./useTimeout-C6VzMoWz.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DfNOsES0.js";import"./useControlled-DaN6Z31o.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C5EnmoRF.js";import"./useSlotProps-DCgpz4Rw.js";import"./Popover-DLMtlWRc.js";import"./useSlot-CtzbODUV.js";import"./Paper-3MAz6v8d.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BsNN7h77.js";import"./utils-BlghJGm5.js";import"./Fade-FyEyWS8O.js";import"./Alert-W1L2tL5j.js";import"./Tab-D7J4BueO.js";import"./Button-BHDn1__y.js";import"./axis-x-Pm3377Z9.js";import"./rotation-C_tzKJTu.js";import"./JoggingCartesianAxisControl-C1_cFfav.js";import"./Select-CjNm5GnI.js";import"./listItemTextClasses-Bkgjpfua.js";import"./MenuItem-BU-2bcKx.js";import"./dividerClasses-3tvRBj86.js";import"./Box-14EnU6IS.js";import"./ToggleButton-Dk1c1ayt.js";import"./VelocitySlider-CfN-oBvi.js";import"./Divider-gJmTvG7m.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
