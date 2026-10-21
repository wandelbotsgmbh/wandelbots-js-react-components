import{j as e,M as s,e as r,C as i}from"./iframe-6oA2lFHu.js";import{useMDXComponents as n}from"./index-CAz9CoZd.js";import{D as a}from"./JoggingPanel.stories-CCU4SALz.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-Cd4jVPAB.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-DegmekRv.js";import"./useTheme-DX8YEvoe.js";import"./useLocalObservable-CvKxaziJ.js";import"./Stack-aDX_r0WY.js";import"./Typography-BnveLTa3.js";import"./styled-h2Uh2WnL.js";import"./useThemeProps-BFN1al8P.js";import"./getThemeProps-CBZbJXCp.js";import"./createSvgIcon-Usrg-WB6.js";import"./SvgIcon-DvZdtkzv.js";import"./getValidReactChildren-u6DLZoKd.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-Bdu2hrYy.js";import"./context-BWZhWyts.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-CC3qmAxm.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DN_WAY9H.js";import"./hooks-DPcBmqfz.js";import"./useTranslation-BbCtMdVC.js";import"./IconButton-fr1_TtTM.js";import"./ButtonBase-eNTHA6Xp.js";import"./useTimeout-C6DvDclQ.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D5YUBVE0.js";import"./useControlled-CcNxqU4p.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BZvwqfIZ.js";import"./useSlotProps-CbsjE05e.js";import"./Popover-BMhvYLyA.js";import"./useSlot-C22hsMXN.js";import"./Paper-Bue-LRLf.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BCN8GEVb.js";import"./utils-DCUnKPzL.js";import"./Fade-g2pBjZiB.js";import"./Alert-CMop-_U9.js";import"./Tab-BCWUaEsh.js";import"./Button-DEaUTV-M.js";import"./axis-x-CtBw9kqk.js";import"./Box-DEkb0HT5.js";import"./Select-DpkEYS1l.js";import"./listItemTextClasses-BGym45JZ.js";import"./MenuItem-CqhMeLOD.js";import"./dividerClasses-CxPYFVUO.js";import"./ToggleButton-BmkUeCpd.js";import"./VelocitySlider-DqWv6vMk.js";import"./Divider-DeusJQdQ.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function fe(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{fe as default};
