import{j as e,M as p,e as i,C as r}from"./iframe-CtlxfIm5.js";import{useMDXComponents as n}from"./index-Dfa7621Y.js";import{D as a}from"./JoggingPanel.stories-BBwpIBC4.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-DYImJOX_.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-B08e6uJr.js";import"./useTheme-B64QnTMR.js";import"./useLocalObservable-9cbodk2M.js";import"./Stack-BoPWqgs_.js";import"./Typography-Ln-i8CgU.js";import"./styled-CrtGsq4g.js";import"./useThemeProps-ChquWVSs.js";import"./getThemeProps-bL27AOxK.js";import"./createSvgIcon-rHzc-oWj.js";import"./SvgIcon-Cq3ZH_vE.js";import"./getValidReactChildren-BeIUCzgA.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-BoRH8jCz.js";import"./context-C5gDIydU.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-Csw8k20n.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-B3rPo3xl.js";import"./hooks-Be9mdjkj.js";import"./useTranslation-Bqdg7N-s.js";import"./IconButton-0XF08Wpn.js";import"./ButtonBase-NofM-t9b.js";import"./useTimeout-D4d-mIpE.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-DjSsMqbd.js";import"./useControlled-DBugiPWe.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DcCEPYkb.js";import"./useSlotProps-DsLOgQJf.js";import"./Popover-Cv6Asgcb.js";import"./useSlot-Bm-O5tEt.js";import"./Paper-t4_MWTj4.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-DYJUtiHf.js";import"./utils-CTdnRKh3.js";import"./Fade-DcBXY3tb.js";import"./Alert-BiNHWxee.js";import"./Tab-CdNWxJ3u.js";import"./Button-DZpRQccq.js";import"./axis-x-CwoCEmFP.js";import"./rotation-C2EGwTVO.js";import"./JoggingCartesianAxisControl-BbaDMmzu.js";import"./Select-JuhuE5O3.js";import"./listItemTextClasses-DsTrWpkO.js";import"./MenuItem-DjKofzmL.js";import"./dividerClasses-Cg8gdeW7.js";import"./Box-BjMHgAQT.js";import"./ToggleButton-BMX2Ujf4.js";import"./VelocitySlider-D2nIi6yZ.js";import"./Divider-DXyXO5wq.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
`,e.jsx(t.h1,{id:"theming-components",children:"Theming components"}),`
`,e.jsxs(t.p,{children:["The UI components presented in this library will respect the ",e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/",rel:"nofollow",children:"Material UI theme"}),` of
the application they are rendered within, allowing customization with the MUI theming system.`]}),`
`,e.jsx(t.h2,{id:"using-the-wandelbots-mui-theme",children:"Using the Wandelbots MUI theme"}),`
`,e.jsxs(t.p,{children:["To make the components look exactly like they do in the storybook, pass the Wandelbots MUI theme to ",e.jsx(t.code,{children:"ThemeProvider"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme()

<ThemeProvider theme={theme}>
<JoggingPanel ... />
</ThemeProvider>
`}),`
`,e.jsx(r,{of:a,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"extending-the-default-theme",children:"Extending the default theme"}),`
`,e.jsxs(t.p,{children:[`You can also use the Wandelbots theme as a base and extend it with your own customizations, or even merge it
with another theme using MUI `,e.jsx(t.a,{href:"https://mui.com/material-ui/customization/theming/#api",rel:"nofollow",children:"theme composition"}),"."]}),`
`,e.jsx(i,{dark:!0,code:`
import { ThemeProvider } from "@mui/material";
import { createNovaMuiTheme, JoggingPanel } from "@wandelbots/wandelbots-js-react-components/core"

const theme = createNovaMuiTheme({
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
`,e.jsx(r,{of:s,sourceState:"none"}),`
`,e.jsx(t.h2,{id:"use-your-own-theme",children:"Use your own theme"}),`
`,e.jsx(t.p,{children:"You could instead use an entirely different MUI theme and style the components as you like."}),`
`,e.jsx(i,{dark:!0,code:`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function we(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{we as default};
