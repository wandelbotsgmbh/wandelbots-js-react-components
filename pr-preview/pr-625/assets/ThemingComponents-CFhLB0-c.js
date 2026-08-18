import{j as e,M as s,e as r,C as i}from"./iframe-h8NL3EDU.js";import{useMDXComponents as m}from"./index-CdgsYKZV.js";import{D as a}from"./JoggingPanel.stories-C_3mbnIn.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DvotRUHZ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-EdzpymTz.js";import"./useTheme-BtjAgfmr.js";import"./useLocalObservable-BbL15z5x.js";import"./Stack-wsa88NAL.js";import"./Typography-D4ivK-bG.js";import"./styled-CYyeyU1o.js";import"./useThemeProps-BGjoWdPa.js";import"./getThemeProps-BpgR3-rx.js";import"./createSvgIcon-MTVCnYpQ.js";import"./SvgIcon-cJd-ZcDs.js";import"./getValidReactChildren-Ct7f2HsA.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-DIO01v_N.js";import"./context-DAKIBJEQ.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-7Qt-eMJA.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BXJ_PRFf.js";import"./hooks-D7dfztWp.js";import"./useTranslation-LaPgurl9.js";import"./IconButton-BooeBWB7.js";import"./ButtonBase-zUTg5apA.js";import"./useTimeout-BQJYND9D.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CtZf68pc.js";import"./useControlled-CNbt-DvH.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-vce7VFU4.js";import"./useSlotProps-CPX197hl.js";import"./Popover-l7k4o8Ix.js";import"./useSlot-B2ndZuD1.js";import"./Paper-CtgLLKSZ.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DYM9O7bs.js";import"./utils-DZkSmX42.js";import"./Fade-WBqH5IKz.js";import"./Alert-BaWQc3Io.js";import"./Tab-DiF69Ot2.js";import"./Button-B3scScxp.js";import"./axis-x-DKWxMEyf.js";import"./Box-BFA_5ioc.js";import"./Select-ByGcQ6FU.js";import"./listItemTextClasses-C7gC6VvM.js";import"./MenuItem-Cy_BnpDG.js";import"./dividerClasses-C3u_BcTx.js";import"./ToggleButton-CGR3IMGZ.js";import"./VelocitySlider-OmHtHlCG.js";import"./Divider-d65XVqbt.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
