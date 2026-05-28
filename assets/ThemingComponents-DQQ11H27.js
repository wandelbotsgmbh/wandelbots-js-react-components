import{j as e,M as p,e as i,C as r}from"./iframe-Waa6VYzJ.js";import{useMDXComponents as n}from"./index-Mhh_WMH6.js";import{D as a}from"./JoggingPanel.stories-B92VVV-D.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BT8wEx-U.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DOCai-oV.js";import"./useTheme-CL_tyFms.js";import"./useLocalObservable-BH0DylXN.js";import"./Stack-CeRKZF7m.js";import"./Typography-DY5O9HeQ.js";import"./styled-BSRcJChX.js";import"./useThemeProps-3fkEqJXH.js";import"./getThemeProps-CNgtLbT8.js";import"./createSvgIcon-DadHriq4.js";import"./SvgIcon-gx3vOPYm.js";import"./getValidReactChildren-lfdl057i.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-Bw2Mwq5j.js";import"./context-Bj76iq7P.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BlWgyOfX.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-C2kni53F.js";import"./hooks-DN9KtMrg.js";import"./useTranslation-D7HR-wlp.js";import"./IconButton-ecjhIcOM.js";import"./ButtonBase-BwWfyHmz.js";import"./useTimeout-B9-Q51tP.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DBnPGOZM.js";import"./useControlled-DlxjQNji.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-q9ck1PPS.js";import"./useSlotProps-fEGg9ULY.js";import"./Popover-Cr8fRFsT.js";import"./useSlot-YZMZfCg5.js";import"./Paper-CeFLz4HS.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Ddy7rmyb.js";import"./utils-BSPm6bp3.js";import"./Fade-DfJYid_D.js";import"./Alert-CNAIFpYw.js";import"./Tab-BaLRfoZx.js";import"./Button-BWcN-fVy.js";import"./axis-x-B9H8lVX1.js";import"./rotation-ABMcWjIM.js";import"./JoggingCartesianAxisControl-BaFG-b_-.js";import"./Box-D-TeUImx.js";import"./Select-DU-ktNCC.js";import"./listItemTextClasses-BBPti5cl.js";import"./MenuItem-RUne-M0O.js";import"./dividerClasses-CYWXTyDJ.js";import"./ToggleButton-D-Y30pP3.js";import"./VelocitySlider-BqXTyKRE.js";import"./Divider-xeMiRDv_.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
