import{j as e,M as s,e as r,C as i}from"./iframe-BF58rWUt.js";import{useMDXComponents as n}from"./index-CJs_SMj4.js";import{D as a}from"./JoggingPanel.stories-DKUkd770.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DUhXYLpH.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Ba2wACYV.js";import"./useTheme-MkHF-WjG.js";import"./useLocalObservable-D7m4WYi6.js";import"./Stack-CBYliyMZ.js";import"./Typography-B6BpdpHM.js";import"./styled-BLu4EuWF.js";import"./useThemeProps-B-I8OL7i.js";import"./getThemeProps-CehkZgyq.js";import"./createSvgIcon-a-D4oG-Z.js";import"./SvgIcon-DbMvS4W9.js";import"./getValidReactChildren-C0UFTXtw.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-BmUE7o8g.js";import"./context-DmIccY1f.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DmKXmdlY.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BLq5M5KB.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-D5IqDXp0.js";import"./hooks-PvkPgkGz.js";import"./useTranslation-CVCd3Srj.js";import"./IconButton-dSJcbeyx.js";import"./ButtonBase-iaoVNle8.js";import"./useTimeout-ShLoy47y.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Dw2u9QkT.js";import"./useControlled-DLtqorVV.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-C9JxP70e.js";import"./useSlotProps-_UXLUcLs.js";import"./Popover-i8z0wEDW.js";import"./useSlot-RnOvUYrY.js";import"./Paper-_qjcJUIi.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DjqFPrZz.js";import"./utils-CMrZGE3i.js";import"./Fade-DMmc-5f5.js";import"./Alert-BLOSi7UM.js";import"./Tab-DEsw7vcT.js";import"./Button-qu90ZdXx.js";import"./axis-x-Dp1DzUT-.js";import"./Box-BII0NUxj.js";import"./Select-D0zca3zu.js";import"./listItemTextClasses-C6I04Mbq.js";import"./MenuItem-EhCW8kf-.js";import"./dividerClasses-DtKCHcTs.js";import"./ToggleButton-4qh1rNxc.js";import"./VelocitySlider-u-ssN7yT.js";import"./Divider-tzGk-9BN.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
