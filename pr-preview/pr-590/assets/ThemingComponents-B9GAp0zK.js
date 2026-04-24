import{j as e,M as p,e as i,C as r}from"./iframe-CTE0GIbJ.js";import{useMDXComponents as n}from"./index-8uCzZDLg.js";import{D as a}from"./JoggingPanel.stories-BxarGLHY.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-1WdXKVVq.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-CdLrUG4h.js";import"./useTheme-Iqiw1k9D.js";import"./useLocalObservable-B8Hkkzt0.js";import"./Stack-B9XEDb0H.js";import"./Typography-Db3ykyd3.js";import"./styled-k8sceZtu.js";import"./useThemeProps-DpR-AaBe.js";import"./getThemeProps-DJEJk0Gu.js";import"./createSvgIcon-DT3ljQvf.js";import"./SvgIcon-HHbXGek5.js";import"./getValidReactChildren-K1L-Us30.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DYDhe802.js";import"./context-CqbUFnuw.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-D6kKMAyM.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-Dtf_JmIU.js";import"./hooks-Cmk7OOsj.js";import"./useTranslation-GtDa0d6D.js";import"./IconButton-hGyqLi5i.js";import"./ButtonBase-x7ldbRLb.js";import"./useTimeout-CHumXHIt.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-B-Ysct_o.js";import"./useControlled-BTr1s3VO.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-DK5tyUBm.js";import"./useSlotProps-B3ERqcWs.js";import"./Popover-CnEdQzIh.js";import"./useSlot-B4-BZ_yn.js";import"./Paper-BwQJ5arR.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-B8SVPxVp.js";import"./utils-Ck8wcpK5.js";import"./Fade-CZxxJluB.js";import"./Alert-B9RSSke_.js";import"./Tab-COoR0LSn.js";import"./Button-BDGALnmF.js";import"./axis-x-Cq-KmIsV.js";import"./rotation-Bxl7u2hp.js";import"./JoggingCartesianAxisControl-Muu-DHpx.js";import"./Select-CsaC1fjB.js";import"./listItemTextClasses-B-93gjlK.js";import"./MenuItem-DvH9_uCB.js";import"./dividerClasses-CXk2MNPg.js";import"./Box-Cg_8zK6M.js";import"./ToggleButton-CMFVvtdU.js";import"./VelocitySlider-bal94pf5.js";import"./Divider-XzczFp1T.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
