import{j as e,M as s,e as r,C as i}from"./iframe-CL-edXTw.js";import{useMDXComponents as n}from"./index-CgANnAhB.js";import{D as a}from"./JoggingPanel.stories-DW3eudOk.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-CGE-hJcj.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-BjUeDt7B.js";import"./useTheme-fgOHMgns.js";import"./useLocalObservable-DLXTQs7w.js";import"./Stack-B6GSMolc.js";import"./Typography-DzQ3lFHr.js";import"./styled-DO2rxddS.js";import"./useThemeProps-DVvvt_4I.js";import"./getThemeProps-ClUx_wFD.js";import"./createSvgIcon-Nc08Icb7.js";import"./SvgIcon-Ds6AZaXJ.js";import"./getValidReactChildren-B2w3li0L.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-59hF3qLj.js";import"./context-CovjpBNc.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-DIw1f8JU.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-CYNKtWvL.js";import"./hooks-Cloa3X8O.js";import"./useTranslation--5dDCVkm.js";import"./IconButton-Mys-qOD8.js";import"./ButtonBase-DWKVx7tM.js";import"./useTimeout-PUthFASg.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-D_0fyICh.js";import"./useControlled-Bxzb7-Fy.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-TWfjtR2l.js";import"./useSlotProps-D-KGP_X-.js";import"./Popover-DGFqGLd_.js";import"./useSlot-Bjstjuyh.js";import"./Paper-DQU5icyX.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-Be8Qp1cS.js";import"./utils-D6l2ISkt.js";import"./Fade-DCUhO9vr.js";import"./Alert-BPi4mFEa.js";import"./Tab-BxOeUlCq.js";import"./Button-DHYDKkAM.js";import"./axis-x-BFXqFKXt.js";import"./rotation-BDXau6na.js";import"./JoggingCartesianAxisControl-Cx1V5Joh.js";import"./Box-CzEV8ehf.js";import"./Select-Bmqx_tbi.js";import"./listItemTextClasses-DV8vypFK.js";import"./MenuItem-DAFBNjCr.js";import"./dividerClasses-CiGBVBo1.js";import"./ToggleButton-DgEWUFvI.js";import"./VelocitySlider-C3iul_3g.js";import"./Divider-CNieV6hQ.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
