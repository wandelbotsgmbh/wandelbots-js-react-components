import{j as e,M as p,e as i,C as r}from"./iframe-LALOZN-F.js";import{useMDXComponents as n}from"./index-DWvdt-UQ.js";import{D as a}from"./JoggingPanel.stories-DnFTJre7.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-D1aWROWK.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-Br4K_1eJ.js";import"./useTheme-BFfoDheP.js";import"./useLocalObservable-Cv5DJmcY.js";import"./Stack-BfsrEyT5.js";import"./Typography-BiioHOtl.js";import"./styled-3sXY9-6B.js";import"./useThemeProps-CEGX7FhJ.js";import"./getThemeProps-A7XPW7Hz.js";import"./createSvgIcon-Dc0zdbun.js";import"./SvgIcon-CVRt6gBr.js";import"./getValidReactChildren-CxadR_6q.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BV-4vh52.js";import"./context-DlYdp_bM.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B8D7nPKJ.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Cr_VtKZW.js";import"./hooks-DZ2AgNCF.js";import"./useTranslation-CQu2Xlq8.js";import"./IconButton-DUSj2IBL.js";import"./ButtonBase-CmUDboTJ.js";import"./useTimeout-DizItLVc.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DGspmWgZ.js";import"./useControlled-CYJnRy0B.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CeMMO6qp.js";import"./useSlotProps-B1esMxNN.js";import"./Popover-CohJYgKa.js";import"./useSlot-DloJ_rNX.js";import"./Paper-DF38Nh1S.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D_F_Ft-f.js";import"./utils-CSocEYyf.js";import"./Fade-C8akLH92.js";import"./Alert-BRp2UQyn.js";import"./Tab-D5x8iDOC.js";import"./Button-CeXyAHoX.js";import"./axis-x-vpEDCWhh.js";import"./rotation-UdCo9sdX.js";import"./JoggingCartesianAxisControl-D-8IfxWG.js";import"./Select-Ccf1tX8T.js";import"./listItemTextClasses-Dh-hMnUV.js";import"./MenuItem-CZBxsSgZ.js";import"./dividerClasses-DHTHURVx.js";import"./Box-DWv2XJjX.js";import"./ToggleButton-DR1w2SEB.js";import"./VelocitySlider-BmlukL0j.js";import"./Divider-Cr95W7ZP.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
