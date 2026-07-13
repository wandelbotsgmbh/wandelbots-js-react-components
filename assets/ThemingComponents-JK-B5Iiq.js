import{j as e,M as s,e as r,C as i}from"./iframe-DxiXdM2q.js";import{useMDXComponents as n}from"./index-CKP6HLyW.js";import{D as a}from"./JoggingPanel.stories-Chc_GJoX.js";import{JoggingStoryExtendedTheme as h,JoggingStoryReplacedTheme as p}from"./theming.stories-DXU1lDeX.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-D1cTsgoC.js";import"./index-aWGotAyL.js";import"./useTheme-CKxhqilf.js";import"./useLocalObservable-DQXeJDVn.js";import"./Stack-iaxVYi6Z.js";import"./Typography-RtYt0vXR.js";import"./styled-brFqv9Tq.js";import"./useThemeProps-BRABdsUe.js";import"./getThemeProps-Bj25HqHJ.js";import"./createSvgIcon-C7DcmS5k.js";import"./SvgIcon-DCzXKrgG.js";import"./getValidReactChildren-CB1AqURb.js";import"./index-B5rnV39A.js";import"./context-BQk3xGAI-BYlX17Lw.js";import"./externalizeComponent-BnFfily6.js";import"./context-CuzJde4p.js";import"./novaCompat-Dczxmkh6.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DluoU25l.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CUKbrnRk.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-FhRfCLKt.js";import"./hooks-4fx0JDDx.js";import"./useTranslation-Bd9Tu93l.js";import"./IconButton-BALMdA_U.js";import"./ButtonBase-Bbb_yUxx.js";import"./useTimeout-ydVVigZK.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DEnbddxI.js";import"./useControlled-Bh-PgyEM.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DCbnvAlJ.js";import"./useSlotProps-D0JEbO3W.js";import"./Popover-C-4p8BNI.js";import"./useSlot-Ca3ZvXKF.js";import"./Paper-xQeAj1Up.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-BiUkWUW0.js";import"./utils-DrYvmE-0.js";import"./Fade-DauWtePj.js";import"./Alert-DTvf42Vu.js";import"./Tab-Dfcd-zrY.js";import"./Button-5ey_LRkw.js";import"./axis-x-C80TFFMg.js";import"./rotation-D7HVkdee.js";import"./JoggingCartesianAxisControl-BsmptSVw.js";import"./Box-5W93FfVl.js";import"./Select-Cco8BKrQ.js";import"./listItemTextClasses-Dc1d-6Kc.js";import"./MenuItem-DYe_bhAL.js";import"./dividerClasses-0RjaPv4f.js";import"./ToggleButton-5smkVpuJ.js";import"./VelocitySlider-DLiQhFSE.js";import"./Divider-BY88MHT9.js";function m(o){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",strong:"strong",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Theming/Theming components"}),`
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
