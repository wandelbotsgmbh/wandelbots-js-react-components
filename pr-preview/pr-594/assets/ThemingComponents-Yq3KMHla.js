import{j as e,M as p,e as i,C as r}from"./iframe-Bp-eZQR_.js";import{useMDXComponents as n}from"./index-DolcIjfm.js";import{D as a}from"./JoggingPanel.stories-C0LhLylt.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CQnHEbRW.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B4zmVt_G.js";import"./useTheme-BNgDLTr9.js";import"./useLocalObservable-6TnFnjZV.js";import"./Stack-uLGyNHmk.js";import"./Typography-D5AR0ySX.js";import"./styled-BKObgSi9.js";import"./useThemeProps-xpqrEkCq.js";import"./getThemeProps-CXweWoHo.js";import"./createSvgIcon-BBr1DZtN.js";import"./SvgIcon-nZ7tFYYe.js";import"./getValidReactChildren-Dqo_bR9R.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BtNmMQuq.js";import"./context-CmvUXe3s.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BSiEkpaf.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CFt1TtHx.js";import"./hooks-CmjEk91d.js";import"./useTranslation-34E3aZtA.js";import"./IconButton-7sMRwxMQ.js";import"./ButtonBase-CGYWLec6.js";import"./useTimeout-DLCnn4U9.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-R9dqCe-6.js";import"./useControlled-OcfU0DID.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-ByuWleP4.js";import"./useSlotProps-koKiZoWi.js";import"./Popover-BOUv47eD.js";import"./useSlot-BS_FAULt.js";import"./Paper-DQvVD6mu.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B5QEAO6-.js";import"./utils-B8nhvYDF.js";import"./Fade-BvujggVO.js";import"./Alert-BpFoM5YL.js";import"./Tab-CJ5VNzYK.js";import"./Button-bsiYTJib.js";import"./axis-x-BI7PO3Rv.js";import"./rotation-BjH8K9zI.js";import"./JoggingCartesianAxisControl-BBVvTwSw.js";import"./Select-CEwPNVop.js";import"./listItemTextClasses-C0yIUBcz.js";import"./MenuItem-B-1xm_JQ.js";import"./dividerClasses-CAX6EUaK.js";import"./Box-Br6ASEc1.js";import"./ToggleButton-D8O7Cri1.js";import"./VelocitySlider-BeaZEDhJ.js";import"./Divider-nfEG--Lv.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
