import{j as e,M as p,e as i,C as r}from"./iframe-d0d6_6nB.js";import{useMDXComponents as n}from"./index-DwsvK5RM.js";import{D as a}from"./JoggingPanel.stories-B72Q4Mm8.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DUv0F2-3.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DeGL77EV.js";import"./useTheme-f_mA3yV5.js";import"./useLocalObservable-D52_pdYK.js";import"./Stack-D-8kzB8m.js";import"./Typography-PL2p-I1G.js";import"./styled-C_OuhPVC.js";import"./useThemeProps-BU040dvJ.js";import"./getThemeProps-7b-klxdi.js";import"./createSvgIcon-D041jSaU.js";import"./SvgIcon-B7xoBCZS.js";import"./getValidReactChildren-cDv3Bpfg.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BL2rj_SF.js";import"./context-CzI_zTJ7.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-XzU522EY.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DCMhNgAU.js";import"./hooks-BND-ZCX0.js";import"./useTranslation-Dm8mlqdz.js";import"./IconButton-BY9BlTYX.js";import"./ButtonBase-Bdv7Z0O3.js";import"./useTimeout-DJsmCn_u.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-UkT5C3Zp.js";import"./useControlled-Dj6xVzWS.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Ccdjw24j.js";import"./useSlotProps-CzKMYj9b.js";import"./Popover-Dd4FnYS6.js";import"./useSlot-DfgUEkJi.js";import"./Paper-CXCuV4Np.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Crw_eBEJ.js";import"./utils-BAHNRu6w.js";import"./Fade-B9Fy5kj2.js";import"./Alert-BT59ruxk.js";import"./Close-QZ9F75xp.js";import"./Button-CeCxbCtw.js";import"./axis-x-HMgn1dNo.js";import"./rotation-ChwM1eG-.js";import"./JoggingCartesianAxisControl--SPEClsu.js";import"./Select-VarcbTla.js";import"./listItemTextClasses-BEDgkstk.js";import"./MenuItem-C0JSfUy3.js";import"./dividerClasses-Bkjwzpw7.js";import"./Box-EyQb8sRT.js";import"./ToggleButton-B2TKHOaI.js";import"./VelocitySlider-DcYUIWX7.js";import"./Divider-Bpi2oOdW.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
