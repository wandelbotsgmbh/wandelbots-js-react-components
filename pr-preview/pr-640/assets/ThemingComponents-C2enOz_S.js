import{j as e,M as s,e as r,C as i}from"./iframe-CcEZ_qSY.js";import{useMDXComponents as n}from"./index-c3y8u5dO.js";import{D as a}from"./JoggingPanel.stories-CTBhUGNS.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-q5ZsQrLQ.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BMMkZJs3.js";import"./useTheme-73kFwhQI.js";import"./useLocalObservable-D5LAhCpD.js";import"./Stack-BD3IIN95.js";import"./Typography-D6jid27D.js";import"./styled-BebcqQ4p.js";import"./useThemeProps-B7vhisMx.js";import"./getThemeProps-CTCJDgej.js";import"./createSvgIcon-4q7DkNPb.js";import"./SvgIcon-D02hs19z.js";import"./getValidReactChildren-CYnbkeDY.js";import"./index-BFBfO7D5.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./index-BlzXKUI8.js";import"./externalizeComponent-D17srCFj.js";import"./context-C2W6U0go.js";import"./novaCompat-2dTa2FyQ.js";import"./three.module-IMxEiD3l.js";import"./three.core-EPGyoDIa.js";import"./errorHandling-C8VLbxdD.js";import"./converters-DteXOVEB.js";import"./CircularProgress-BKY1YvAv.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-FOvufjb3.js";import"./hooks-DTZMYzxf.js";import"./useTranslation-CjGP_4RD.js";import"./IconButton-DNYJDC4z.js";import"./ButtonBase-mXZNferh.js";import"./useTimeout-DlkP_xm3.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-Dw3e8R-K.js";import"./useControlled-sD7Nds3Z.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CNrZgcqr.js";import"./useSlotProps-DGML88_c.js";import"./Popover-D9ZBhVe8.js";import"./useSlot-Lm66yU7i.js";import"./Paper-UE5zM-Xg.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CYop8iSy.js";import"./utils-qT78mNwc.js";import"./Fade-BooDPsxk.js";import"./Alert-WZMP7AWc.js";import"./Tab-C86vl7YK.js";import"./Button-BE-5XmEI.js";import"./axis-x-sGGZAQiH.js";import"./Box-DuC4hTOz.js";import"./Select-MfwEkFZY.js";import"./listItemTextClasses-DTZPF7vq.js";import"./MenuItem-CmsZDfDf.js";import"./dividerClasses-BfPnpJbt.js";import"./ToggleButton-CeCZLf5C.js";import"./VelocitySlider-YBS-1mD3.js";import"./Divider-DB6aWe9Y.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
