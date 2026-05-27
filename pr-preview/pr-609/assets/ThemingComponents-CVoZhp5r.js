import{j as e,M as p,e as i,C as r}from"./iframe-C6efqv-b.js";import{useMDXComponents as n}from"./index-GiS8QRlh.js";import{D as a}from"./JoggingPanel.stories-Dmq37_ZA.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-Cp0QI6Ey.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-dAvcuCIs.js";import"./useTheme-BL5iGsl1.js";import"./useLocalObservable-DemvKRM6.js";import"./Stack-CKJ_TzTV.js";import"./Typography-Bo0MZfat.js";import"./styled-tImL_YU6.js";import"./useThemeProps-DHBfJ2BH.js";import"./getThemeProps-BctRbvUZ.js";import"./createSvgIcon-By9YLSaT.js";import"./SvgIcon-Cn7goNaQ.js";import"./getValidReactChildren-nQdDtGKg.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-XwlA-YqM.js";import"./context-1EyHmWU5.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Czc3mMCY.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DMnWTRPO.js";import"./hooks-tO8uibjR.js";import"./useTranslation-DJJ0WgRF.js";import"./IconButton-CsdhbdwO.js";import"./ButtonBase-Dw5oWCva.js";import"./useTimeout-C1o2m10z.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-HAE0CluQ.js";import"./useControlled-7_zNxTDA.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-bceKToba.js";import"./useSlotProps-vreILQyR.js";import"./Popover-CornEv8g.js";import"./useSlot-DG91fb9b.js";import"./Paper-CN6FDtrs.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BgnjKL3h.js";import"./utils-S5i3maOq.js";import"./Fade-T8dzFM2c.js";import"./Alert-Dsul4Ik_.js";import"./Tab-CdNl6UDw.js";import"./Button-ZnBBCIKU.js";import"./axis-x-DFjwNXAr.js";import"./rotation-C_fLnGL2.js";import"./JoggingCartesianAxisControl-knIUbo2x.js";import"./Select-BA0D7Wv4.js";import"./listItemTextClasses-D_U_raHz.js";import"./MenuItem-BfIOlI4c.js";import"./dividerClasses---uiWqaz.js";import"./ToggleButton-Bf2p3Qwe.js";import"./Box-BByRVkM-.js";import"./VelocitySlider-DR5VsE70.js";import"./Divider-CT0V-ryi.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
