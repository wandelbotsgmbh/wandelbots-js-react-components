import{j as e,M as p,e as i,C as r}from"./iframe-DC4iWNaz.js";import{useMDXComponents as n}from"./index-BENVgoYa.js";import{D as a}from"./JoggingPanel.stories-NeFVS1lC.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Dz6zExlb.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-IZSgfnBJ.js";import"./useTheme-CdwGmyvQ.js";import"./useLocalObservable-BNEJ_0Ny.js";import"./Stack-B5C88iOH.js";import"./Typography-SMWrZwY5.js";import"./styled-CrJWBdiL.js";import"./useThemeProps-CU_2HpCW.js";import"./getThemeProps-DDMH7tRp.js";import"./createSvgIcon-C4bHV54J.js";import"./SvgIcon-BZRxNZFI.js";import"./getValidReactChildren-DL6tzlf3.js";import"./index-CW2dP9i_.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B0rpBNAw.js";import"./context-DfqC7GsF.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-Dl3XmUFg.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-oru35fXB.js";import"./hooks-c3rZU3vK.js";import"./useTranslation-BQminkmD.js";import"./IconButton-DcDBhWKi.js";import"./ButtonBase-Rx9yiQVJ.js";import"./useTimeout-0F6kPdfz.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-9CM9i3Vz.js";import"./useControlled-CO66ZHfw.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-4sBA9Gx6.js";import"./useSlotProps-Dm3N3kPi.js";import"./Popover-Cly7vEQH.js";import"./useSlot-Bn9wABzF.js";import"./Paper-Bm94lbgZ.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DrnY7Dgy.js";import"./utils-CPCmjnQX.js";import"./Fade-CMZJhtd_.js";import"./Alert-qNSwbQy8.js";import"./Tab-CgTaMCBI.js";import"./Button-mBnneziD.js";import"./axis-x-flMm11cI.js";import"./rotation-yPkdjLQp.js";import"./JoggingCartesianAxisControl-BAOydKfh.js";import"./Select-DYyaKnRf.js";import"./listItemTextClasses-D_Uxtcux.js";import"./MenuItem-CmQr7jWG.js";import"./dividerClasses-CTrpwM_g.js";import"./Box-OMtI9Y7C.js";import"./ToggleButton-BMbBM1mJ.js";import"./VelocitySlider-C5znDtuC.js";import"./Divider-CGicO57b.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
