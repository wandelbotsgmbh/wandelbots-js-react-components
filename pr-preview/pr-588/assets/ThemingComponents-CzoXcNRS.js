import{j as e,M as p,e as i,C as r}from"./iframe-BBmVBaXS.js";import{useMDXComponents as n}from"./index-lAh9eyM2.js";import{D as a}from"./JoggingPanel.stories-BHgPE6Fu.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-0Mcn7bUx.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index---O79GTn.js";import"./useTheme-D2eBzOSs.js";import"./useLocalObservable-B5A1rGmw.js";import"./Stack-DbB5Agwv.js";import"./Typography-C1U95F0t.js";import"./styled-Hs5-_FkZ.js";import"./useThemeProps-D-iJag9A.js";import"./getThemeProps-C5W9ryFb.js";import"./createSvgIcon-B40FZVUG.js";import"./SvgIcon-BtAVmWyZ.js";import"./getValidReactChildren-BKpF2kUk.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BkopyABe.js";import"./context-BXq1Kzxk.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DxiIqKl9.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BANXzfPx.js";import"./hooks-DNYH08pb.js";import"./useTranslation-DlOwPPSE.js";import"./IconButton-DtKNsbH8.js";import"./ButtonBase-CF-tky-V.js";import"./useTimeout-nLurqOe3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DrXV9arZ.js";import"./useControlled-BpH0Flz0.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BGcK5O9j.js";import"./useSlotProps-Qbmopmh5.js";import"./Popover-Dv_hg5yX.js";import"./useSlot-CJi7OSrX.js";import"./Paper-D273xkrv.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D6lHd-UN.js";import"./utils-ChFxB50m.js";import"./Fade-D0hM0czw.js";import"./Alert-CJpJTFls.js";import"./Tab-Bg21U47I.js";import"./Button-OovAzzPo.js";import"./axis-x-sf6iN4Xu.js";import"./rotation-BeF6ix07.js";import"./JoggingCartesianAxisControl-C3e06Qad.js";import"./Select-maptVLdv.js";import"./listItemTextClasses-CF9sc0k3.js";import"./MenuItem-sURWPfZv.js";import"./dividerClasses-a2ssiwrq.js";import"./Box-CQ-kzbOs.js";import"./ToggleButton-Bpbt6xAj.js";import"./VelocitySlider-BJFxDg8o.js";import"./Divider-B0qiys6E.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
