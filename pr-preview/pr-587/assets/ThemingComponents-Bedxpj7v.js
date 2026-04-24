import{j as e,M as p,e as i,C as r}from"./iframe-lSRc8Kry.js";import{useMDXComponents as n}from"./index-Dh8qIJNA.js";import{D as a}from"./JoggingPanel.stories-hIbShIxi.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BwTH0A8H.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-HgSIB8X0.js";import"./useTheme-CBXsMXri.js";import"./useLocalObservable-BaHkTNj8.js";import"./Stack-B3c5imzn.js";import"./Typography-5Pc4-azQ.js";import"./styled-CFGTLu5P.js";import"./useThemeProps-FOlGIRxm.js";import"./getThemeProps-DmtdMtKF.js";import"./createSvgIcon-BpkQB3oN.js";import"./SvgIcon-DnKliW6C.js";import"./getValidReactChildren-DwyQTwEU.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-CXQJobDn.js";import"./context-BQX-Ltts.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-uuJD8bHC.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-4tvi_vM7.js";import"./hooks-iChk73XH.js";import"./useTranslation-dCmy8IH1.js";import"./IconButton-BrR-WDQi.js";import"./ButtonBase-Blz7Rgfg.js";import"./useTimeout-CbLclIbx.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CgDkizw_.js";import"./useControlled-DojgYW6k.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CngkMY-H.js";import"./useSlotProps-D-WXCSGZ.js";import"./Popover-BAvjMlqd.js";import"./useSlot-CeMrY-J1.js";import"./Paper-Bc8LSlF_.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DY1gkC5i.js";import"./utils-DeOodEku.js";import"./Fade-CFKJ6LMp.js";import"./Alert-BYaBXQNg.js";import"./Tab-CPxpAmuF.js";import"./Button-DpNV2gGM.js";import"./axis-x-1JitYHAa.js";import"./rotation-CyyB02nt.js";import"./JoggingCartesianAxisControl-Bl5rlrbu.js";import"./Select-IQtwEBpD.js";import"./listItemTextClasses-wYy5oLy-.js";import"./MenuItem-By614huF.js";import"./dividerClasses-DArCPYSc.js";import"./Box-BTbmGrRi.js";import"./ToggleButton-P9rskELk.js";import"./VelocitySlider-DqmStU9f.js";import"./Divider-YzPKwy8G.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
