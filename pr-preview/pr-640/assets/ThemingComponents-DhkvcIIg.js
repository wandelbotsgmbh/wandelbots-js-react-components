import{j as e,M as s,e as r,C as i}from"./iframe-BTaUecuH.js";import{useMDXComponents as n}from"./index-D4SMC-JH.js";import{D as a}from"./JoggingPanel.stories-CVtUJK-K.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DswNV0oC.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Cm3cbzTp.js";import"./useTheme-CFOqftXY.js";import"./useLocalObservable-CHmbqIfq.js";import"./Stack-CES2rYfK.js";import"./Typography-8IxL4PEX.js";import"./styled-BGBtoES-.js";import"./useThemeProps-BTdDPMYS.js";import"./getThemeProps-Db8SbAnQ.js";import"./createSvgIcon-CYoU8uEs.js";import"./SvgIcon-HPWlfptg.js";import"./getValidReactChildren-CMvB3Cu9.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-Bxsg7yuJ.js";import"./context-BQOmf8OU.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-DgQWL7Sp.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BCZx4XQk.js";import"./hooks-CIwwpPSw.js";import"./useTranslation-C7_zsDRp.js";import"./IconButton-vCzw7UtJ.js";import"./ButtonBase-DfHmQn-S.js";import"./useTimeout-J9g92Bif.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CdAh8JON.js";import"./useControlled-B9v_sXXB.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BxTfWixE.js";import"./useSlotProps-DiU4oK3R.js";import"./Popover-CrkoMpkh.js";import"./useSlot-DGAHhsvD.js";import"./Paper-bno0t8D5.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-D5Tf750N.js";import"./utils-Bu4aQ3z7.js";import"./Fade-3tu_AmNs.js";import"./Alert-DoUge7_g.js";import"./Tab-DhqOmyb2.js";import"./Button-CvxF3nwV.js";import"./axis-x-8_NL8zb7.js";import"./Box-BTwJY6Ci.js";import"./Select-D79XSfSI.js";import"./listItemTextClasses-09D_mkub.js";import"./MenuItem-C6eZUMYE.js";import"./dividerClasses-DKVyjcQ3.js";import"./ToggleButton-CDpLFcNP.js";import"./VelocitySlider-DJb5udo-.js";import"./Divider-PcrD3YFr.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
