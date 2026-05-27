import{j as e,M as p,e as i,C as r}from"./iframe-B5gnKzR8.js";import{useMDXComponents as n}from"./index-BocPsVM9.js";import{D as a}from"./JoggingPanel.stories-XrEx0rEm.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BPTrElUT.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BEWniK0A.js";import"./useTheme-DgP_RzB7.js";import"./useLocalObservable-ChoMnqV-.js";import"./Stack-C3YWb0Vw.js";import"./Typography-8QTXvSJU.js";import"./styled-avzr92DQ.js";import"./useThemeProps-9LGvPA_t.js";import"./getThemeProps-BTdH1Pa0.js";import"./createSvgIcon-Bzkn0_Mm.js";import"./SvgIcon-B5uCuBEJ.js";import"./getValidReactChildren-ChzMpj7E.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-6301sCHQ.js";import"./context---8VY5lp.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BaETmBNL.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Qv_Beds-.js";import"./hooks-DthmdjGa.js";import"./useTranslation-CTp-aG5J.js";import"./IconButton-DlDTESJK.js";import"./ButtonBase-Cuc241Tn.js";import"./useTimeout-6QWZFQfi.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Di5VqwNz.js";import"./useControlled-DJHwGg7J.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Vj43-_z3.js";import"./useSlotProps-5b8S2OYf.js";import"./Popover-nJjzloit.js";import"./useSlot-BSKXXeDt.js";import"./Paper-DoAfOi-p.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BoVP4rd5.js";import"./utils-CD3UBHew.js";import"./Fade-D_eaYSmz.js";import"./Alert-CpDJZkb0.js";import"./Tab-CIPbFkCP.js";import"./Button-CImLezly.js";import"./axis-x-uCHVHFwQ.js";import"./rotation-DbzJmynZ.js";import"./JoggingCartesianAxisControl-BJZQFDyz.js";import"./Select-DEF5L2SF.js";import"./listItemTextClasses-BjLknrsS.js";import"./MenuItem-CnpOKjYj.js";import"./dividerClasses-TqeWzT6V.js";import"./ToggleButton-2IPbjRkH.js";import"./Box-Da8-yky0.js";import"./VelocitySlider-mHzvbZE1.js";import"./Divider-CdPyDjQ5.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
