import{j as e,M as p,e as i,C as r}from"./iframe-CdHz7w5e.js";import{useMDXComponents as n}from"./index-XItlfvkJ.js";import{D as a}from"./JoggingPanel.stories-BNTJgdf9.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BeNdryNh.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-y9YD2Xww.js";import"./useTheme-BaH26PvS.js";import"./useLocalObservable-Bd7u1pDM.js";import"./Stack-D4bFz7zd.js";import"./Typography-Ca7p4FzY.js";import"./styled-sd3eOX1V.js";import"./useThemeProps-ZIiox3IC.js";import"./getThemeProps-CLvbHdkH.js";import"./createSvgIcon-Ds3ol630.js";import"./SvgIcon-B6gk0W3H.js";import"./getValidReactChildren-DATRBq6g.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-hxlgDZiE.js";import"./context-DS34pASV.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-9kq8-4kc.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DCk93eA5.js";import"./hooks-CTQi3vNS.js";import"./useTranslation-CTNLNFAH.js";import"./IconButton-DIGZqcJH.js";import"./ButtonBase-D6-zmjRJ.js";import"./useTimeout-ChaJoZfL.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-tjx4kjuH.js";import"./useControlled-Bqqzx8gX.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DyYx1Khf.js";import"./useSlotProps-C0GKuS3Y.js";import"./Popover-COo_Sg5X.js";import"./useSlot-BrNGdnED.js";import"./Paper-CbAXsvFZ.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-x1ZQknCn.js";import"./utils-D3bkdeHa.js";import"./Fade-DTmTm7rz.js";import"./Alert-D2FHLDZx.js";import"./Tab-DTKWoEXZ.js";import"./Button-BS5HHNoG.js";import"./axis-x-6Q-5CE1a.js";import"./rotation-CqvVD3H-.js";import"./JoggingCartesianAxisControl-H1AFaU1o.js";import"./Select-DLPNSFq3.js";import"./listItemTextClasses-Bd4CRAv6.js";import"./MenuItem-DxyEOFxC.js";import"./dividerClasses-C1aaSyut.js";import"./Box-CE_763cl.js";import"./ToggleButton-CkR8WTz9.js";import"./VelocitySlider-BSjlLaup.js";import"./Divider-BlK1jQUg.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
