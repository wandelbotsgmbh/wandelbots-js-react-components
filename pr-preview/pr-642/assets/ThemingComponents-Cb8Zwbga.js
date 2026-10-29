import{j as e,M as s,e as r,C as i}from"./iframe-C3i5VtH2.js";import{useMDXComponents as n}from"./index-sRPPmJLD.js";import{D as a}from"./JoggingPanel.stories-C6GYrhHW.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DVQwuLjF.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Df0MqWjx.js";import"./useTheme-CORFzKCN.js";import"./useLocalObservable-BhXObKCE.js";import"./Stack-CHa2am4J.js";import"./Typography-DuDXt270.js";import"./styled-C810q6lS.js";import"./useThemeProps-BwMjOkoo.js";import"./getThemeProps-B1MzFs2r.js";import"./createSvgIcon-DlbDLNHf.js";import"./SvgIcon-CPGH9cXu.js";import"./getValidReactChildren-BJQ00d8F.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-B9zSvggg.js";import"./context-BW3BpTE1.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-DLx0FoJz.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl--GCdeOwD.js";import"./hooks-Cw34NS25.js";import"./useTranslation-DStRh7Dg.js";import"./IconButton-Aa0CaESU.js";import"./ButtonBase-DqfXtwmx.js";import"./useTimeout-BXSeW2QP.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CB_tzp3u.js";import"./useControlled-DoIH9NaX.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-B816zYuf.js";import"./useSlotProps-DRv-pCx1.js";import"./Popover-CS9vlDpp.js";import"./useSlot-Dmg8EyfP.js";import"./Paper-lkxFwJ-Z.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BQHDhcYJ.js";import"./utils-CUCN_3XZ.js";import"./Fade-DfqcjNjN.js";import"./Alert-CZV1NTyG.js";import"./Tab-kcawMyLH.js";import"./Button-KODbTWy5.js";import"./axis-x-BitIOSCe.js";import"./Box-BXzJm3dS.js";import"./Select-CHTurhBL.js";import"./listItemTextClasses-Dv0pTvZA.js";import"./MenuItem-DC0jJlRe.js";import"./dividerClasses-cwPm_23Z.js";import"./ToggleButton-BXZHt781.js";import"./VelocitySlider-BEB5AdXx.js";import"./Divider-Bqs_33Oj.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
