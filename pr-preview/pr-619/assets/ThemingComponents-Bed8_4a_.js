import{j as e,M as s,e as r,C as i}from"./iframe-B5Ijub9I.js";import{useMDXComponents as n}from"./index-DObUQdxg.js";import{D as a}from"./JoggingPanel.stories-CixwdqwM.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-Cv3wOsbF.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-H7PJPIDg.js";import"./useTheme-BR6tVe-0.js";import"./useLocalObservable-trYuX90t.js";import"./Stack-By6aRm3g.js";import"./Typography-BeduDhH7.js";import"./styled-B5PeTkeA.js";import"./useThemeProps-Dq1d04UV.js";import"./getThemeProps-DBFYspaH.js";import"./createSvgIcon-DEWPX8IA.js";import"./SvgIcon-DaMiAJ7m.js";import"./getValidReactChildren-DwoPQ30I.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-Bgk64OIa.js";import"./context-BsjbqM7p.js";import"./three.module-BfWIdBXu.js";import"./rotationVector-DKUTJqRd.js";import"./novaCompat-DBu8Nre9.js";import"./errorHandling-COKL7wto.js";import"./converters-CFNBtQGJ.js";import"./CircularProgress-CHVuvRsH.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-4HRtFNkw.js";import"./hooks-nBCnzZYu.js";import"./useTranslation-DRedNMdh.js";import"./IconButton-wyD4JqA7.js";import"./ButtonBase-HbXbjD-d.js";import"./useTimeout-_mXMqDhl.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-C5N3QTVh.js";import"./useControlled-DBJ7n3Pm.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DPl4aS9q.js";import"./useSlotProps-jqNPguSO.js";import"./Popover-UTpUo9bi.js";import"./useSlot-EEzG71Pe.js";import"./Paper-AQKndPN6.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CfaW_TrE.js";import"./utils-BLmn4C0X.js";import"./Fade-Br3kJgQu.js";import"./Alert-DtZkz1_Q.js";import"./Tab-_nfNVOyv.js";import"./Button-DwodJOVF.js";import"./axis-x-Cm27YG9p.js";import"./rotation-Cg11oDLb.js";import"./JoggingCartesianAxisControl-cROn8hFN.js";import"./Box-C5dL6iIZ.js";import"./Select-CJ4A24ro.js";import"./listItemTextClasses-Cq9ziFWs.js";import"./MenuItem-BKTf9463.js";import"./dividerClasses-z4x-S7B4.js";import"./ToggleButton-MzN-A-LV.js";import"./VelocitySlider-6d4pTLCl.js";import"./Divider-B0wJvKpe.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
`,e.jsx(i,{of:p,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
