import{j as e,M as s,e as r,C as i}from"./iframe-B5PFQy9-.js";import{useMDXComponents as m}from"./index-C6JfVJTX.js";import{D as a}from"./JoggingPanel.stories-DssApRGp.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-KjilnXmX.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-egR-tRzh.js";import"./useTheme-BPu14NQi.js";import"./useLocalObservable-LrjqsH1E.js";import"./Stack-CnFyifxT.js";import"./Typography-CyKnxWK6.js";import"./styled-Bc_rMeX1.js";import"./useThemeProps-raU1XFRw.js";import"./getThemeProps-3BKRl8To.js";import"./createSvgIcon-DAO-R13K.js";import"./SvgIcon-CZyxW_Fg.js";import"./getValidReactChildren-tBjTFqM_.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-C8UCWtGC.js";import"./context-BxXh1kDg.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DZoB8bff.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CpOtIcrW.js";import"./hooks-BbU_Ydud.js";import"./useTranslation-C2jogqqk.js";import"./IconButton-DdiOvGHm.js";import"./ButtonBase-ojmHqgLV.js";import"./useTimeout-Dn_iGzU0.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DAyD6o-Q.js";import"./useControlled-B8kShZZw.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CFZGZN8p.js";import"./useSlotProps-C8c992tN.js";import"./Popover-CyW7q0te.js";import"./useSlot-CQjmWY8S.js";import"./Paper-DzRu06Ou.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-ClCvCyAY.js";import"./utils-7dBYBRql.js";import"./Fade-B0qkhVig.js";import"./Alert-DFNRfWzG.js";import"./Tab-CJ6jbMQw.js";import"./Button-D3RqUawu.js";import"./axis-x-19r8iJqT.js";import"./Box--wBh1mrf.js";import"./Select-BnErlo87.js";import"./listItemTextClasses-CTZxknfm.js";import"./MenuItem-DC43MNke.js";import"./dividerClasses-D3nGeTJ4.js";import"./ToggleButton-Cx3ipT6F.js";import"./VelocitySlider-ENxaZpF3.js";import"./Divider-ST5jJwlU.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
