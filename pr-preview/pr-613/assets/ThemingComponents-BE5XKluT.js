import{j as e,M as p,e as i,C as r}from"./iframe-BAWr6Ij4.js";import{useMDXComponents as n}from"./index-DxDCHGrO.js";import{D as a}from"./JoggingPanel.stories-DkB0R2xP.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-ByXEhdsi.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-C1Z7jxTk.js";import"./useTheme-mvsmifwt.js";import"./useLocalObservable-DXCfayHk.js";import"./Stack-9rSG3tXj.js";import"./Typography-ByYuPzbL.js";import"./styled-50D-k2xQ.js";import"./useThemeProps-DZ_htPuE.js";import"./getThemeProps-Ba6ZL8s5.js";import"./createSvgIcon-Dwf6Ieza.js";import"./SvgIcon-CfRio2hI.js";import"./getValidReactChildren-BVU3frth.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-MytkGlYH.js";import"./context-DCqurv4E.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BlEzZ_4n.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CEc0sMdx.js";import"./hooks-D4odOn3n.js";import"./useTranslation-dqOqrHsD.js";import"./IconButton-DEf8ii_w.js";import"./ButtonBase-Cm5Kv4PO.js";import"./useTimeout-q5uRhSgJ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D13VSSZg.js";import"./useControlled-CH-eN4Y7.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C7d8Iac_.js";import"./useSlotProps-CUEN5nCK.js";import"./Popover-BO5_o2yg.js";import"./useSlot-mk9xQPix.js";import"./Paper-CnHTsteM.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CPPx-Otu.js";import"./utils-Dg_C6cry.js";import"./Fade-CGGIEajx.js";import"./Alert-CZEQhz3l.js";import"./Tab-Bj55B6P4.js";import"./Button-CPU8BZiZ.js";import"./axis-x-D0eena3U.js";import"./rotation-DCpVfzWI.js";import"./JoggingCartesianAxisControl-C9ZZjgrY.js";import"./Box-B_Un0H0n.js";import"./Select-DwDab80O.js";import"./listItemTextClasses-Df6ZdKBJ.js";import"./MenuItem-CvMmY7Yh.js";import"./dividerClasses-BNbHl2Cj.js";import"./ToggleButton-DM87bCqE.js";import"./VelocitySlider-OPJOIpLm.js";import"./Divider-CPYyAZ8M.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
