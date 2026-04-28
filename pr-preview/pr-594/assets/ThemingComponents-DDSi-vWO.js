import{j as e,M as p,e as i,C as r}from"./iframe-BrnONMw0.js";import{useMDXComponents as n}from"./index-Dge_MOXM.js";import{D as a}from"./JoggingPanel.stories-EXq6XPnZ.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BXCYKD6V.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-C068wZhC.js";import"./useTheme-CRxijQya.js";import"./useLocalObservable-yxKyLvtM.js";import"./Stack-UEmqruWd.js";import"./Typography-DYzupmba.js";import"./styled-DOQ7WG3p.js";import"./useThemeProps-DQDz93yQ.js";import"./getThemeProps-D25QP68p.js";import"./createSvgIcon-Dc8GZyfD.js";import"./SvgIcon-CUG56wVz.js";import"./getValidReactChildren-D4Hg-UuX.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-qYnVXIzD.js";import"./context-BJ5rln0u.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-ntQJ96Y-.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DVzc4tlO.js";import"./hooks-ByAgsILT.js";import"./useTranslation-C15E4Efj.js";import"./IconButton-pw2r3n3w.js";import"./ButtonBase-BSiht2oU.js";import"./useTimeout-D7NR9fVI.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BL1QlIj8.js";import"./useControlled-D9m4a-bf.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CvPfpLzy.js";import"./useSlotProps-IZOWyLSF.js";import"./Popover-BBqxGnpF.js";import"./useSlot-B6uK05aG.js";import"./Paper-D2DUEe9f.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Vsr8woe8.js";import"./utils-BBxGlK1p.js";import"./Fade-BWFMirVs.js";import"./Alert-CMXUuE7e.js";import"./Tab-CTjWQhOq.js";import"./Button-C1mbzRpF.js";import"./axis-x-DeMcNy7Y.js";import"./rotation-BHZ2NNBp.js";import"./JoggingCartesianAxisControl-CP7paMhv.js";import"./Select-CnRQLt6d.js";import"./listItemTextClasses-C04UfnMW.js";import"./MenuItem-Bd_oDF4m.js";import"./dividerClasses-BEz629pa.js";import"./Box-CoTZIo7n.js";import"./ToggleButton-BjoxpCsx.js";import"./VelocitySlider-DtN6AOng.js";import"./Divider-CrRFQY0J.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
