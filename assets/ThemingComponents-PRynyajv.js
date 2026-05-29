import{j as e,M as p,e as i,C as r}from"./iframe-DY_IO8c8.js";import{useMDXComponents as n}from"./index-C7IjzBrz.js";import{D as a}from"./JoggingPanel.stories-GMZ8f17h.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-3FxPoilL.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BE2DiOSe.js";import"./useTheme-DrFw6D_u.js";import"./useLocalObservable-Cwx5516q.js";import"./Stack-DhlPXTc7.js";import"./Typography-Fa3ajHU7.js";import"./styled-DtpyQBcf.js";import"./useThemeProps-igg2zpwF.js";import"./getThemeProps-CKlwOt8G.js";import"./createSvgIcon-ITmClUvp.js";import"./SvgIcon-DqnXvElq.js";import"./getValidReactChildren-D5IvabZK.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-4lBGU2R5.js";import"./context-CGzCXoAR.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BjMzktpI.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-E7wOQlBq.js";import"./hooks-CUpjnY3d.js";import"./useTranslation-Bn5Fea5l.js";import"./IconButton-BS0lUVAZ.js";import"./ButtonBase-Vc7MHbHD.js";import"./useTimeout-BOq0MMlw.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-AsKEgAnA.js";import"./useControlled-D3NIlsD7.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps--QLpn-k1.js";import"./useSlotProps-B9CHFuFe.js";import"./Popover-XCafoHn8.js";import"./useSlot-Dz-UKd6T.js";import"./Paper-Y0exr2ky.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DHr1pSUL.js";import"./utils-CQ76Iv63.js";import"./Fade-CUyXHLF7.js";import"./Alert-CKXxGvZD.js";import"./Tab-DwL7PlcS.js";import"./Button-qnvr5D63.js";import"./axis-x-DJaA9hAM.js";import"./rotation-_oLN0Ocp.js";import"./JoggingCartesianAxisControl-ByCn9Jkq.js";import"./Box-BupPFMzk.js";import"./Select-BVG2pEWP.js";import"./listItemTextClasses-DZo8nSZc.js";import"./MenuItem-B73Xfzo-.js";import"./dividerClasses-CXCLijuN.js";import"./ToggleButton-BlQfuLtL.js";import"./VelocitySlider-ia2xH343.js";import"./Divider-CW8VMU4E.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
