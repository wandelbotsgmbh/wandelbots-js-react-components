import{j as e,M as s,e as r,C as i}from"./iframe-BULENBHd.js";import{useMDXComponents as m}from"./index-ChdTMMLq.js";import{D as a}from"./JoggingPanel.stories-CQeI6YxH.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-Brk_F6qG.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Dm2Ic8Rz.js";import"./useTheme-DCM-apCM.js";import"./useLocalObservable-D_KuG6ck.js";import"./Stack-BXDyryDC.js";import"./Typography-CARqZca3.js";import"./styled-Dqw9CmZ9.js";import"./useThemeProps-DZ-EXUYI.js";import"./getThemeProps-B2nkLcbG.js";import"./createSvgIcon-sLy3FjYc.js";import"./SvgIcon-nQTFzumX.js";import"./getValidReactChildren-YaqulXmv.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-BvhamZqx.js";import"./context-DFJAjtTV.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CukT95En.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-lg-XaaPu.js";import"./hooks-CuNiUMc9.js";import"./useTranslation-CddlYMz8.js";import"./IconButton-pjEx_P91.js";import"./ButtonBase-DOLyEsKI.js";import"./useTimeout-04jR6ZL1.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BDzTQe0o.js";import"./useControlled-BbfoK_k3.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C_H8PwmJ.js";import"./useSlotProps-Ckf3mzOD.js";import"./Popover-MsnhAfIu.js";import"./useSlot-C6dvsjnW.js";import"./Paper-GkpUQsdz.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-gJuR3Sso.js";import"./utils-CZdWku2T.js";import"./Fade-CUUmvSB6.js";import"./Alert-BwW18oXL.js";import"./Tab-Dod_GHdh.js";import"./Button-C2xfuuZr.js";import"./axis-x-CfYXoMrf.js";import"./Box-CX3FDlk8.js";import"./Select-sChawSsR.js";import"./listItemTextClasses-B4EUYCcH.js";import"./MenuItem-AfCImRDX.js";import"./dividerClasses-C_v1rRJ8.js";import"./ToggleButton-vSgYFmss.js";import"./VelocitySlider-DSqbeQlX.js";import"./Divider-To49ufJF.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Migration note:"})," ",e.jsx(t.code,{children:"createNovaMuiTheme"})," has been renamed to ",e.jsx(t.code,{children:"createNovaTheme"}),`.
The old export still works but is deprecated and will be removed in the next major release.
`,e.jsx(t.code,{children:"createNovaTheme"})," also accepts multiple ",e.jsx(t.code,{children:"ThemeOptions"})," arguments (variadic) for easier composition."]}),`
`]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(i,{of:a,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(r,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaTheme({
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
`,e.jsx(i,{of:h,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(r,{dark:!0,code:`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function je(o={}){const{wrapper:t}={...m(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{je as default};
