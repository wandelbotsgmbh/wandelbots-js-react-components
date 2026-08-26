import{j as e,M as s,e as r,C as i}from"./iframe-BrmrOCzp.js";import{useMDXComponents as m}from"./index-B5dPVPCi.js";import{D as a}from"./JoggingPanel.stories-CD2LioB7.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-ujwbsE7H.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-C6Zwcgws.js";import"./useTheme-BPXyZQUs.js";import"./useLocalObservable-BUda2fMb.js";import"./Stack-BQ613KHW.js";import"./Typography-Dq-ZZ20F.js";import"./styled-Cn81LYqI.js";import"./useThemeProps-DXCRiTur.js";import"./getThemeProps-Cg-ZuiXr.js";import"./createSvgIcon-B2kYwyZD.js";import"./SvgIcon-Ciq8AI-7.js";import"./getValidReactChildren-Bvve1TwL.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-DXyyqZs7.js";import"./context-DgBZYKyV.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-D0xnzDae.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CX1JQnDX.js";import"./hooks-DUAjvDxk.js";import"./useTranslation-Cwk78oft.js";import"./IconButton-BSbIGxvn.js";import"./ButtonBase-DcDC2r4x.js";import"./useTimeout-CPdwtlmY.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-COk_Dl3F.js";import"./useControlled-Bq8FnJqZ.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-rLIgBGjk.js";import"./useSlotProps-CBLUJ1-6.js";import"./Popover-BQgfEbHN.js";import"./useSlot-C8qAsIOn.js";import"./Paper-h8QfcexE.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BAO1eqlZ.js";import"./utils-CpK6nZ72.js";import"./Fade-yVr_W3cf.js";import"./Alert-DXSFpbbd.js";import"./Tab-Cf7vx-2b.js";import"./Button-CWt_e4k5.js";import"./axis-x-alHq0u1G.js";import"./Box-CcZxxKlY.js";import"./Select-DQKXCi4P.js";import"./listItemTextClasses-vH7koIJz.js";import"./MenuItem-CXHa_5Ii.js";import"./dividerClasses-DYKnHf30.js";import"./ToggleButton-CiXnys1j.js";import"./VelocitySlider-DLeJVJT6.js";import"./Divider-BbQ04ioF.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
