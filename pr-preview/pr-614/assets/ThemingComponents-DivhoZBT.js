import{j as e,M as a,e as i,C as r}from"./iframe-BtrzgrV8.js";import{useMDXComponents as n}from"./index-BfzNLbOM.js";import{D as p}from"./JoggingPanel.stories-CC-e1dCS.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-UVuoRSTN.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Djihc4V2.js";import"./useTheme-B3DrdsdG.js";import"./useLocalObservable-lRYDAw9Y.js";import"./Stack-DqFw7jsi.js";import"./Typography-jpJgFQ2i.js";import"./styled-COx3iEBO.js";import"./useThemeProps-BlZlOzfv.js";import"./getThemeProps-CP60H-EU.js";import"./createSvgIcon-Cy8ZLq_g.js";import"./SvgIcon-CMTnfU9O.js";import"./getValidReactChildren-DCbVy6G9.js";import"./index-C5wSj4hZ.js";import"./context-BQk3xGAI-CLoR9YCx.js";import"./externalizeComponent-B3-zZMxO.js";import"./context-BarGEpDz.js";import"./novaCompat-CLCJAe3b.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DBAZ_PyH.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BWH_YqdQ.js";import"./hooks-BxhXja7c.js";import"./useTranslation-C1PxNd2-.js";import"./IconButton-OFaAZU8k.js";import"./ButtonBase-S3s4USaD.js";import"./useTimeout-CbipQpPA.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D_NlxjzI.js";import"./useControlled-C9DZghv8.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C6p3xKH-.js";import"./useSlotProps-CWtFffqL.js";import"./Popover-D4oC11ri.js";import"./useSlot-0sN3Lnz3.js";import"./Paper-B8zJb-6j.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-qIp9Gu_e.js";import"./utils-11de4an7.js";import"./Fade-DtpFn_mI.js";import"./Alert-BsqvO31n.js";import"./Tab-RKbsVhd1.js";import"./Button-T578rp8F.js";import"./axis-x-BBC6oTfa.js";import"./rotation-DvO_g55l.js";import"./JoggingCartesianAxisControl-CVRa7zqt.js";import"./Box-BGzzxwU-.js";import"./Select-DTMqUkHE.js";import"./listItemTextClasses-CEXWd6rV.js";import"./MenuItem-RFb3K2Tx.js";import"./dividerClasses-DmGC_F47.js";import"./ToggleButton-Bev1SFVz.js";import"./VelocitySlider-ByGaWEcz.js";import"./Divider-DM-e6NG6.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
