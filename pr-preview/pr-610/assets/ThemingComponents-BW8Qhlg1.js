import{j as e,M as p,e as i,C as r}from"./iframe-Bs93Cmuy.js";import{useMDXComponents as n}from"./index-DyHyw214.js";import{D as a}from"./JoggingPanel.stories-z6zWQWun.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Cap7C1wE.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-DO4Lx69s.js";import"./useTheme-C3gcx3LF.js";import"./useLocalObservable-DzvZ5Gzb.js";import"./Stack-BUQ6j-GQ.js";import"./Typography-Do2RZT0N.js";import"./styled-C0LrGXlW.js";import"./useThemeProps-FlxZaJqz.js";import"./getThemeProps-B9thdXYp.js";import"./createSvgIcon-Czdv3772.js";import"./SvgIcon-DaRZEuUg.js";import"./getValidReactChildren-BW4askwh.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-Cuxcw2GU.js";import"./context-CJqIUTOv.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-B07tln9G.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CVp1e-wh.js";import"./hooks-C34kwCXy.js";import"./useTranslation-rpCy-8SP.js";import"./IconButton-D3gUKoDy.js";import"./ButtonBase-Dzz3fGVQ.js";import"./useTimeout-DZMysQnm.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CWpyrshd.js";import"./useControlled-C_9hQIb-.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-zn5sdWwH.js";import"./useSlotProps-B4rn0cU4.js";import"./Popover-hYALo3de.js";import"./useSlot-DetuhBgA.js";import"./Paper-Vo6N-m_A.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-wUStjj0g.js";import"./utils-BwsrCMpV.js";import"./Fade-DV80J1qt.js";import"./Alert-DUKQ1-UN.js";import"./Tab-CDEzWCnW.js";import"./Button-Wr8ALqoI.js";import"./axis-x-BAPRA7us.js";import"./rotation-yWNRtyDt.js";import"./JoggingCartesianAxisControl-Bk7YVqCg.js";import"./Select-Cri6HUG3.js";import"./listItemTextClasses-DHirL5h6.js";import"./MenuItem-Cz-iAHbN.js";import"./dividerClasses-aNg_NK0w.js";import"./Box-CPsmUjbp.js";import"./ToggleButton-B590zMmD.js";import"./VelocitySlider-ClxYPUYJ.js";import"./Divider-B9l5CtjC.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
