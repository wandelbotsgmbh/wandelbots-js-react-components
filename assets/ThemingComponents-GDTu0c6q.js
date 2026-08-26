import{j as e,M as s,e as r,C as i}from"./iframe-BJQa-ykD.js";import{useMDXComponents as m}from"./index-BOQtRgMM.js";import{D as a}from"./JoggingPanel.stories-BwJNz92v.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-CeM2DspL.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Cf7qDuTI.js";import"./useTheme-Dio5vgl0.js";import"./useLocalObservable-BBPRrTib.js";import"./Stack-w7OHLazp.js";import"./Typography-CsoFWogS.js";import"./styled-DlLA3eoN.js";import"./useThemeProps-CUcrUFL4.js";import"./getThemeProps-Ck549EvU.js";import"./createSvgIcon-OUMzsPds.js";import"./SvgIcon-0UQRRWsS.js";import"./getValidReactChildren-DcPAz4GL.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-OtApy5U4.js";import"./context-BLKvZ0Of.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DqFZbISL.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl--nDjo0a3.js";import"./hooks-B2k3PqV6.js";import"./useTranslation-DXhQpk11.js";import"./IconButton-CI0KtmRu.js";import"./ButtonBase-BJLYQLeI.js";import"./useTimeout-BlLrA5Dk.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-GN39vZ9F.js";import"./useControlled-BaqZjwTS.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-lp0dLWyX.js";import"./useSlotProps-DEZdGyWP.js";import"./Popover-CIXGTnwz.js";import"./useSlot-bcoxvXjg.js";import"./Paper-CAEv2D__.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DGU0bXdG.js";import"./utils-CCfnI1Et.js";import"./Fade-BBKwi58L.js";import"./Alert-CuyGcxmb.js";import"./Tab-CxxJbgRt.js";import"./Button-T8ut9evi.js";import"./axis-x-B8CFK0sc.js";import"./Box-DgbLzk1a.js";import"./Select-t_JlS7LK.js";import"./listItemTextClasses-DGpD097a.js";import"./MenuItem-Civu2YwV.js";import"./dividerClasses-BYmY3odh.js";import"./ToggleButton-DZjszsAe.js";import"./VelocitySlider-QlBJPbE9.js";import"./Divider-CDr7_Llk.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
