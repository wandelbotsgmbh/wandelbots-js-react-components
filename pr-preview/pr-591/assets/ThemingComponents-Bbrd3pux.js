import{j as e,M as p,e as i,C as r}from"./iframe-MIriT0nl.js";import{useMDXComponents as n}from"./index-Dfb9mtFr.js";import{D as a}from"./JoggingPanel.stories-Bte-Oafb.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-ClokrS1K.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-D3-2qLHK.js";import"./useTheme-B-feZ2Ip.js";import"./useLocalObservable-B48pqdV9.js";import"./Stack-Dz8j2g4N.js";import"./Typography-CNiP0_wm.js";import"./styled-ClnsY_bS.js";import"./useThemeProps-CD0delGH.js";import"./getThemeProps-CG3bCcME.js";import"./createSvgIcon-BuebzpOu.js";import"./SvgIcon-Ct8sJvRg.js";import"./getValidReactChildren-BL2leNor.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DMbcls_E.js";import"./context-Cq8P_2h0.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DJUlHJvF.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-D-FV5C-8.js";import"./hooks-DL_8og-P.js";import"./useTranslation-C3F3Zbb4.js";import"./IconButton-DkWP2e-9.js";import"./ButtonBase-3p_pdqvv.js";import"./useTimeout-Cv9hfpK0.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CTy-aPOT.js";import"./useControlled-DAUbxM7a.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BPr6vHcR.js";import"./useSlotProps-BAkbrVY4.js";import"./Popover-BHFAk9My.js";import"./useSlot-Fc9_QjGa.js";import"./Paper-B42PQXlw.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BKSCO0Ex.js";import"./utils-CbEw5kHR.js";import"./Fade-B1j14a9s.js";import"./Alert-DLozDsfI.js";import"./Tab-D2QB50s1.js";import"./Button-BB1lEv_N.js";import"./axis-x-DyOC0ICD.js";import"./rotation-DxD8Y9m7.js";import"./JoggingCartesianAxisControl-DEuLmWNv.js";import"./Select-Yc1sdwef.js";import"./listItemTextClasses-Ba6REEec.js";import"./MenuItem-vvdz3UKF.js";import"./dividerClasses-DQUnA9aZ.js";import"./Box-LUV0JySQ.js";import"./ToggleButton-C-MwxGMq.js";import"./VelocitySlider-og72yljq.js";import"./Divider-Kh6NRF5Y.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
