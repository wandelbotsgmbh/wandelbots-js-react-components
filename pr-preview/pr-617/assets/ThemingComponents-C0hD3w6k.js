import{j as e,M as a,e as i,C as r}from"./iframe-DDZb5C_9.js";import{useMDXComponents as n}from"./index-sZ4tiABQ.js";import{D as p}from"./JoggingPanel.stories-C9the8WO.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-2_PYOwLv.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DNmjjrZM.js";import"./useTheme-C9eHsOs_.js";import"./useLocalObservable-J42_yMDp.js";import"./Stack-BM5xfkCw.js";import"./Typography-D7t3e7Ha.js";import"./styled-fqtkY4XR.js";import"./useThemeProps-CpUyiTkc.js";import"./getThemeProps-BLymj9cx.js";import"./createSvgIcon-Be5Su7zx.js";import"./SvgIcon-DKd9hJOE.js";import"./getValidReactChildren-D6xyuTh0.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-Ddy9lapu.js";import"./context-uvdwl_PX.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CklX4QOf.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CT6--Mx7.js";import"./hooks-0P9Wlusu.js";import"./useTranslation-BnxI-5Vi.js";import"./IconButton-ClsoVu8a.js";import"./ButtonBase-Cv5ElOYw.js";import"./useTimeout-6uieEHO-.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Yp4in-Mx.js";import"./useControlled-C5lXQPVS.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BQUBHHSC.js";import"./useSlotProps-Bo3tHGaK.js";import"./Popover-D_S-WADF.js";import"./useSlot-MKhUHBtw.js";import"./Paper-ABE1pKvr.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DwbGmv57.js";import"./utils-BCbcidwG.js";import"./Fade-O3LKgWHx.js";import"./Alert-DapZiqVA.js";import"./Tab-BX0F1Ttf.js";import"./Button-BO-u8ST8.js";import"./axis-x-yc64Ap6M.js";import"./rotation-RD4QQBTa.js";import"./JoggingCartesianAxisControl-DBTqjjmx.js";import"./Box-D6gXKZ28.js";import"./Select-D9uWjG1g.js";import"./listItemTextClasses-opSSFfoZ.js";import"./MenuItem-RG5jZ3VM.js";import"./dividerClasses-Bx7bIUc1.js";import"./ToggleButton-CKXtWcDl.js";import"./VelocitySlider-DFQyE6G4.js";import"./Divider-DHreXzw5.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
