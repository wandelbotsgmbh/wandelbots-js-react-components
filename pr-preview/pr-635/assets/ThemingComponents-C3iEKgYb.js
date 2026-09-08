import{j as e,M as s,e as r,C as i}from"./iframe-DYTX7wAR.js";import{useMDXComponents as n}from"./index-CPW1b6Fr.js";import{D as a}from"./JoggingPanel.stories-DyGoHSp0.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-hRmLNDBl.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-Dn3bLKiP.js";import"./useTheme-DuaDv9u6.js";import"./useLocalObservable-CBZqlRmK.js";import"./Stack-LGByhYoZ.js";import"./Typography-CAlWe7IC.js";import"./styled-Bbt82TbU.js";import"./useThemeProps-C_yIZhz1.js";import"./getThemeProps-CccIGP6S.js";import"./createSvgIcon-CCbHjsbF.js";import"./SvgIcon-By_QyyhL.js";import"./getValidReactChildren-koMmtBGF.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-Dx9Xmeca.js";import"./context-Alb2AyRI.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-BedGh8A5.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BfFzLebg.js";import"./hooks-BzuiqANY.js";import"./useTranslation-CA6iH7pv.js";import"./IconButton-D1RGLoLX.js";import"./ButtonBase-gZVlVl5a.js";import"./useTimeout-CTU1lD2w.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-LVKir6cb.js";import"./useControlled-8fAOB_F6.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-UPbiAEcF.js";import"./useSlotProps-fmZCCnoV.js";import"./Popover-BH7BFmaa.js";import"./useSlot-BkIRJy81.js";import"./Paper-BpuYudHq.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B_Ex1sh-.js";import"./utils-D_eAC1T_.js";import"./Fade-CwX6uvV7.js";import"./Alert-H_ehVnMt.js";import"./Tab-DIS8PS68.js";import"./Button-Bjf16zt8.js";import"./axis-x-Bxi5mxyq.js";import"./Box-DN0P7hR8.js";import"./Select-DA-2rcK7.js";import"./listItemTextClasses-pfOj542Z.js";import"./MenuItem-haDre_y4.js";import"./dividerClasses-DmLmEbD2.js";import"./ToggleButton-CNSvP1Ys.js";import"./VelocitySlider-sOzYJN-m.js";import"./Divider-CJV89IoD.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
