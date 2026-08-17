import{j as e,M as s,e as r,C as i}from"./iframe-j0thzbNF.js";import{useMDXComponents as m}from"./index-kXhWkDSY.js";import{D as a}from"./JoggingPanel.stories-ySAyUuCA.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-7CkxRPxm.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-CkLGKCqa.js";import"./useTheme-riZ3Nb-b.js";import"./useLocalObservable-BAD2-Ju8.js";import"./Stack-DNZUvnSD.js";import"./Typography-DHGP9HtQ.js";import"./styled-DNInA09u.js";import"./useThemeProps-C4xyc_lx.js";import"./getThemeProps-BEtzBwuP.js";import"./createSvgIcon-DOM1Qtjr.js";import"./SvgIcon-comWsVMo.js";import"./getValidReactChildren-BfqmOFx5.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-DmMBs8OT.js";import"./context-ORfzidM9.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-dXp6F8dr.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BO_aFMQY.js";import"./hooks-XPCjPaeU.js";import"./useTranslation-Bu55FPaq.js";import"./IconButton-B2UCKFCf.js";import"./ButtonBase-DeUwRmEJ.js";import"./useTimeout-BP3yRsf9.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DybpwSIi.js";import"./useControlled-CHl7J0g1.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CRiaEWQk.js";import"./useSlotProps-Baoj46wx.js";import"./Popover-DX0q5QQy.js";import"./useSlot-DGlEB1Xo.js";import"./Paper-CNgzzeJy.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-CvZeoyqz.js";import"./utils-BXV9CZRY.js";import"./Fade-BL86EmbG.js";import"./Alert-BEDYEAyW.js";import"./Tab-DZ9tgUeL.js";import"./Button-B3k8MV1P.js";import"./axis-x-YJ8mIaNO.js";import"./Box-BNcG8HRw.js";import"./Select-Dbkiyovq.js";import"./listItemTextClasses-DE09cRdd.js";import"./MenuItem-CVnEexjc.js";import"./dividerClasses-BYzPB7zY.js";import"./ToggleButton-BS_byoh_.js";import"./VelocitySlider-CQ2hKjRr.js";import"./Divider-UT0GQxBo.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
