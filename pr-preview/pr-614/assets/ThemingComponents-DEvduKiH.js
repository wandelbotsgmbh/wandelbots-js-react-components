import{j as e,M as a,e as i,C as r}from"./iframe-DDTXLvOw.js";import{useMDXComponents as n}from"./index-C_dUECTL.js";import{D as p}from"./JoggingPanel.stories-BgqbPRY7.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DS4hbjcb.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CTPXTmdp.js";import"./useTheme-CZOnp54v.js";import"./useLocalObservable-uQmtwbyt.js";import"./Stack-D2627u9U.js";import"./Typography-CUP0grXy.js";import"./styled-DQy_d1xN.js";import"./useThemeProps-BFsj70fR.js";import"./getThemeProps-BpadWtvG.js";import"./createSvgIcon-o9K7giso.js";import"./SvgIcon-vpUkJrwW.js";import"./getValidReactChildren-C1RBtmMw.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-a1Y6uaPT.js";import"./context-DuzUiMG7.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-ao0gYHEk.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-lKfH8sek.js";import"./hooks-DDuAmhnv.js";import"./useTranslation-hFRHNMaB.js";import"./IconButton-BQqAgMK3.js";import"./ButtonBase-B6HGoOFo.js";import"./useTimeout-CcJLFniF.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-C97JEQLN.js";import"./useControlled-D2pK702F.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BGi2w5mF.js";import"./useSlotProps-DkyS6phj.js";import"./Popover-CpGSRkCr.js";import"./useSlot-vwvj5WkK.js";import"./Paper-Cn2fCz5k.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CzIU-iU5.js";import"./utils-CEXmX7RL.js";import"./Fade-Ca0SPhrH.js";import"./Alert-BZEvdQGl.js";import"./Tab-DRVBR1VS.js";import"./Button-C_UdjCB5.js";import"./axis-x-DNOhdWgR.js";import"./rotation-Dbw8B2st.js";import"./JoggingCartesianAxisControl-Brbi1vtF.js";import"./Box-ZdOj145j.js";import"./Select-DGw_vVaG.js";import"./listItemTextClasses-5aA43rcO.js";import"./MenuItem-D3fJ1Z9K.js";import"./dividerClasses-BNA_nXQP.js";import"./ToggleButton-BzoDjUFY.js";import"./VelocitySlider-DBy7IxdD.js";import"./Divider-8bL4_h-H.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
