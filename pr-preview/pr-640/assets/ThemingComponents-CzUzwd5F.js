import{j as e,M as s,e as r,C as i}from"./iframe-DxjNtV5G.js";import{useMDXComponents as n}from"./index-DYtA5l1-.js";import{D as a}from"./JoggingPanel.stories-ClJcZnHt.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-BtoMUSL5.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BIY31JZ5.js";import"./useTheme-WHH3ZhK1.js";import"./useLocalObservable-mxnAZSXT.js";import"./Stack-I6XWcQdr.js";import"./Typography-KDUfJtI1.js";import"./styled-Dc04te6Q.js";import"./useThemeProps-BirirTAX.js";import"./getThemeProps-B1o3cVUs.js";import"./createSvgIcon-D7ETxAVw.js";import"./SvgIcon-DO0SMkfC.js";import"./getValidReactChildren-DGv0q7iD.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-B9ljJS-W.js";import"./context-BIdKPyeo.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-ChHpKvd6.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Zu1FftN6.js";import"./hooks-CBbBGuGR.js";import"./useTranslation-gJjlbm23.js";import"./IconButton-BZtjMMt-.js";import"./ButtonBase-B94-ZOQK.js";import"./useTimeout-BkO27O8J.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-BEPT64dv.js";import"./useControlled-DkztYEL6.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Ck11REZz.js";import"./useSlotProps-lhzc0hw8.js";import"./Popover-U-yDzvMm.js";import"./useSlot-dp_RLp9m.js";import"./Paper-DxIiUlPF.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BpTs1Id1.js";import"./utils-D0m6SFFz.js";import"./Fade-BtLK9r-p.js";import"./Alert-BsKV7uXY.js";import"./Tab-D3U2W6Bw.js";import"./Button-BVXjV5Nq.js";import"./axis-x-Cycaq17Z.js";import"./Box-6Km7Ie0b.js";import"./Select-Bjiiam_3.js";import"./listItemTextClasses-BxPmiEsq.js";import"./MenuItem-DA4ceDED.js";import"./dividerClasses-e4jviKbz.js";import"./ToggleButton-7fWqTDGY.js";import"./VelocitySlider-OlFMBZyr.js";import"./Divider-DKoO3kIr.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
