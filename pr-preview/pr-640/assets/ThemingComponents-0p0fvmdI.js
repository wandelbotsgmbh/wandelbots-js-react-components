import{j as e,M as s,e as r,C as i}from"./iframe-D884141u.js";import{useMDXComponents as n}from"./index-Dr86W9SG.js";import{D as a}from"./JoggingPanel.stories-x93oRN6a.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DtMTlvX-.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-GdkLYj2b.js";import"./useTheme-DlfWPF4G.js";import"./useLocalObservable-DIHGezwG.js";import"./Stack-DtIhmKcN.js";import"./Typography-V06HsBqI.js";import"./styled-B0ao0ZAV.js";import"./useThemeProps-CHMSUCul.js";import"./getThemeProps-DO3TSdEy.js";import"./createSvgIcon-BnYqwPby.js";import"./SvgIcon-BgvEQeou.js";import"./getValidReactChildren-kFGK7thM.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-Bd1pXgg0.js";import"./context-yX39zROz.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-C73PxTiL.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-DcrH6yGP.js";import"./hooks-DX_5z7A3.js";import"./useTranslation-BYJW-skX.js";import"./IconButton-lxGgnN1D.js";import"./ButtonBase-DZTjYyES.js";import"./useTimeout-BCiwPjbb.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Bi_aIPcm.js";import"./useControlled-Ckhs2-JN.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BoRcc9DH.js";import"./useSlotProps-BkTr94iK.js";import"./Popover-BcQb6pCU.js";import"./useSlot-B0rwcHxP.js";import"./Paper-B0NnY_8H.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DGR3w91M.js";import"./utils-BhuaU_eo.js";import"./Fade-6DUK05bt.js";import"./Alert-CNbfDNRk.js";import"./Tab-DjKjf_C8.js";import"./Button-D6MJ5xqo.js";import"./axis-x-aJHZZ6bR.js";import"./Box-mOBt15YC.js";import"./Select-C3I5VoZz.js";import"./listItemTextClasses-CydzYEF0.js";import"./MenuItem-4jdCzo2q.js";import"./dividerClasses-BxMGW2ul.js";import"./ToggleButton-MB6apC_5.js";import"./VelocitySlider-NDBjCUUn.js";import"./Divider-CsdrGC5Y.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
