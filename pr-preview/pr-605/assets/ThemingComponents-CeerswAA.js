import{j as e,M as p,e as i,C as r}from"./iframe-DdWyWVDD.js";import{useMDXComponents as n}from"./index-CO0FximX.js";import{D as a}from"./JoggingPanel.stories-BuNl8E_2.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Wb-w2OQg.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-Dzy8eC-k.js";import"./useTheme-CDSN3cgg.js";import"./useLocalObservable-DU2PUmC1.js";import"./Stack-Bl_ppWKM.js";import"./Typography-Ck01T41X.js";import"./styled-bFkaIJxA.js";import"./useThemeProps-DtaAnbgQ.js";import"./getThemeProps-p89wCuJk.js";import"./createSvgIcon-DlSCvL73.js";import"./SvgIcon-Co7Jn47e.js";import"./getValidReactChildren-CLPAFsOt.js";import"./index-Bcq_XY8v.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-KLNC9fGa.js";import"./context-cJfUDo-s.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-CZfZ6yaf.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Diu7GYas.js";import"./hooks-CcD4ACUy.js";import"./useTranslation-D_U_Dx2m.js";import"./IconButton-Dzoi8YVQ.js";import"./ButtonBase-DoB0UBrl.js";import"./useTimeout-D5yuWDxJ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-fYfR2gbb.js";import"./useControlled-DMjVbNMR.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CLc7fnYi.js";import"./useSlotProps-q1uY7y4q.js";import"./Popover-CPh7LNu0.js";import"./useSlot-Yl7XXinQ.js";import"./Paper-BdF1yiZX.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DaZL1XBX.js";import"./utils-B2B_Jjp4.js";import"./Fade-D5oferu6.js";import"./Alert-BeV76nU7.js";import"./Tab-BAeSSayC.js";import"./Button-DnMIqc0-.js";import"./axis-x-1PqUSEvQ.js";import"./rotation-B021hzjs.js";import"./JoggingCartesianAxisControl-DCNKl-nM.js";import"./Select-CrL8uIeG.js";import"./listItemTextClasses-UHWtj3hi.js";import"./MenuItem-CkDO8ino.js";import"./dividerClasses-Suq3Ongg.js";import"./Box-BNw0iW83.js";import"./ToggleButton-9kHZN_bb.js";import"./VelocitySlider-BReqA2QI.js";import"./Divider-dmRNAj5x.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
