import{j as e,M as p,e as i,C as r}from"./iframe-DmFjQ5Bx.js";import{useMDXComponents as n}from"./index-gkxOxS1q.js";import{D as a}from"./JoggingPanel.stories-BacaegQw.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-D5Dn1I8q.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-BVdm2w2x.js";import"./useTheme-CN3kyOmF.js";import"./useLocalObservable-BuX34bpq.js";import"./Stack-BoUZoXe-.js";import"./Typography-DGXi_W3G.js";import"./styled-CwW2V0ZY.js";import"./useThemeProps-D02WdLDy.js";import"./getThemeProps-B6_soYah.js";import"./createSvgIcon-Di9BeXBT.js";import"./SvgIcon-ieK5DRoI.js";import"./getValidReactChildren-Do32Dkl_.js";import"./index-Bcq_XY8v.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-D8_p-pUa.js";import"./context-Cxw0pEVe.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DfkOzqTR.js";import"./converters-bkii-Zhi.js";import"./CircularProgress-BtRN2GYX.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-g2b6rdRn.js";import"./hooks-BbCMat4_.js";import"./useTranslation-DhDBnBFB.js";import"./IconButton-BOZyo1m2.js";import"./ButtonBase-CyTCj4P4.js";import"./useTimeout-UBvimZzO.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-PMaN384p.js";import"./useControlled-Cu_Bc94N.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CRMdGftQ.js";import"./useSlotProps-CD93msS5.js";import"./Popover-IvobXe5I.js";import"./useSlot-BDAdJvAN.js";import"./Paper-DIah2kFb.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D2Z9-soz.js";import"./utils-Cq10Dre7.js";import"./Fade-CMNbKxzB.js";import"./Alert-DJdhxi8i.js";import"./Tab-BGkmwyVk.js";import"./Button-D1-420sk.js";import"./axis-x-CXDRDbGx.js";import"./rotation-BGk4_psh.js";import"./JoggingCartesianAxisControl-BY6oYRd3.js";import"./Select-BrLViYjt.js";import"./listItemTextClasses-C-Qlb8nN.js";import"./MenuItem-BDbKpOpq.js";import"./dividerClasses-5yzmI50h.js";import"./Box--Do-lTK_.js";import"./ToggleButton-4wWEbIAC.js";import"./VelocitySlider-BaESO779.js";import"./Divider-DyxvodHs.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
