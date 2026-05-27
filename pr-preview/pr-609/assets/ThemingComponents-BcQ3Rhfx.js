import{j as e,M as p,e as i,C as r}from"./iframe-Dw-aDc3x.js";import{useMDXComponents as n}from"./index-D_J1Vcnc.js";import{D as a}from"./JoggingPanel.stories-CEJK6Syn.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-8uiq91qF.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-C0nnP9hV.js";import"./useTheme-L0gwFtnq.js";import"./useLocalObservable-fon2mMx1.js";import"./Stack-C_mYGwGo.js";import"./Typography-Cvf5naJQ.js";import"./styled-CsN-KrtD.js";import"./useThemeProps-BuvoJeGe.js";import"./getThemeProps-BqH3cNwf.js";import"./createSvgIcon-CPOZ2SXk.js";import"./SvgIcon-D0zqiTf-.js";import"./getValidReactChildren-DJxmbfR2.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-B7xqTWP8.js";import"./context-B11HR0Yh.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B0WhehdO.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DnQwwZkM.js";import"./hooks-vb6jjEMz.js";import"./useTranslation-DXduvh6P.js";import"./IconButton-DZw8pBVz.js";import"./ButtonBase-C2s7F2E4.js";import"./useTimeout-oAL5oMgw.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-sLA8Sh_Q.js";import"./useControlled-BOyfU4p7.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DmTZaDUp.js";import"./useSlotProps-BTopYdGP.js";import"./Popover-DJhJrIOk.js";import"./useSlot-DzfuiiH3.js";import"./Paper-DKgVsGt7.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Cus7BKra.js";import"./utils-Bkj_bO9g.js";import"./Fade-BX8odah9.js";import"./Alert-B49PKiot.js";import"./Tab-BZDTAuuJ.js";import"./Button-Brp1Iwkj.js";import"./axis-x-C9prgVyV.js";import"./rotation-BzyMVs7M.js";import"./JoggingCartesianAxisControl-hOruM_so.js";import"./Select-BKcjz4sM.js";import"./listItemTextClasses-B5SG5999.js";import"./MenuItem-CyLIUZh6.js";import"./dividerClasses-DDRyKStY.js";import"./ToggleButton-CQOOGHmm.js";import"./Box-BhN-sHsU.js";import"./VelocitySlider-Dha5K_YN.js";import"./Divider-FJ1OdM0N.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
