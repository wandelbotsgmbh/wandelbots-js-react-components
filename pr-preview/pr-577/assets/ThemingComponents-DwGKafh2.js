import{j as e,M as a,e as i,C as r}from"./iframe-_RYo2JIA.js";import{useMDXComponents as n}from"./index-C9LS5zGd.js";import{D as p}from"./JoggingPanel.stories-qg70vWKC.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-8h5mfL8H.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B4I10Jtc.js";import"./useTheme-IxdNAN3G.js";import"./useLocalObservable-BLQnb-B5.js";import"./Stack-ibPF5CS1.js";import"./Typography-FABigBVM.js";import"./styled-Zhqt0UU3.js";import"./useThemeProps-DcmGm_te.js";import"./getThemeProps-3_LeOcqk.js";import"./createSvgIcon-wqDgMg8N.js";import"./SvgIcon-CdGksEMM.js";import"./getValidReactChildren-CE4jL60S.js";import"./index-Wo_1NHhm.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-C_hTTjRw.js";import"./externalizeComponent-ZD5YR1N6.js";import"./context-B8MGCvuk.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-C7w3jKCK.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CSNNI3hI.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-9-FBeXRN.js";import"./hooks-j8mQlLuy.js";import"./useTranslation-C4IUwKmI.js";import"./IconButton-C7MYT_Qz.js";import"./ButtonBase-YNwrcsX1.js";import"./useTimeout-CSZacgEd.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Cqwl9J9P.js";import"./useControlled-DmDemGJj.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CTICiVxB.js";import"./useSlotProps-DG4OvPqH.js";import"./Popover-CbzkPeZV.js";import"./useSlot-DxFZy2mo.js";import"./Paper-BmYJpO2Z.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-CMO9hA5x.js";import"./utils-RlZKy7iu.js";import"./Fade-B0QQe4AI.js";import"./Alert-CcvghnhV.js";import"./Tab-gp2fscVd.js";import"./Button-BfWH79FO.js";import"./axis-x-Db50k0Mv.js";import"./rotation-D_bCCHYm.js";import"./JoggingCartesianAxisControl-DgORG-7l.js";import"./Select-I1KQDllS.js";import"./listItemTextClasses-CTD_9mpN.js";import"./MenuItem-DHCPTX9o.js";import"./dividerClasses-ChrUcE8B.js";import"./Box-D-IVt8YJ.js";import"./ToggleButton-HpxQb7Ku.js";import"./VelocitySlider-D3LzWOYH.js";import"./Divider-B-cZjR-Z.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
