import{j as e,M as s,e as r,C as i}from"./iframe-CyD9rD0D.js";import{useMDXComponents as m}from"./index-BeZObc6P.js";import{D as a}from"./JoggingPanel.stories-MJDIRsAo.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-D2EiVhiQ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Dqg1PPa0.js";import"./useTheme-BYrdovPt.js";import"./useLocalObservable-BSPCJfHl.js";import"./Stack-37_jsn52.js";import"./Typography-CeJalG0m.js";import"./styled-Cq6ngS8T.js";import"./useThemeProps-DYEd5J4c.js";import"./getThemeProps-C6HLSFE8.js";import"./createSvgIcon-CTNAzbdZ.js";import"./SvgIcon-BCJAo3PQ.js";import"./getValidReactChildren-DY2r1Ijx.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-DX2gn8bo.js";import"./context-Dpnh0CK8.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-D9Me9nDi.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CoYzHQB6.js";import"./hooks-WB2FlDBq.js";import"./useTranslation-XOomKenF.js";import"./IconButton-BpELGcAI.js";import"./ButtonBase-nZ_xAdWC.js";import"./useTimeout-CCgVkqtM.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DDWMQ6y7.js";import"./useControlled-CN0qBHif.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-wKmKeqQz.js";import"./useSlotProps-DpZJqu5B.js";import"./Popover-DKtvRjal.js";import"./useSlot-DsX7NklW.js";import"./Paper-DVmjI36g.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Bfy7dlc7.js";import"./utils-DM7FDu1i.js";import"./Fade-D_nVJisO.js";import"./Alert-BOprKsh8.js";import"./Tab-DPDPtfTi.js";import"./Button-DT0_0zr9.js";import"./axis-x-CcNBwoS-.js";import"./Box-Cd13N0JR.js";import"./Select-CE6g6KMh.js";import"./listItemTextClasses-FG8IvNcm.js";import"./MenuItem-BDxnweul.js";import"./dividerClasses-DjENhNDT.js";import"./ToggleButton-DGVdZR5T.js";import"./VelocitySlider-Y_8tj1yp.js";import"./Divider-BCi39qkW.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
