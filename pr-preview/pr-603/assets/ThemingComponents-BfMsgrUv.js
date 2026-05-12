import{j as e,M as p,e as i,C as r}from"./iframe-QlxCEF0f.js";import{useMDXComponents as n}from"./index-CJXTqmj3.js";import{D as a}from"./JoggingPanel.stories-Bj6A60-h.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-BkBwsoyF.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-TTmthknU.js";import"./useTheme-C02dBQHj.js";import"./useLocalObservable-COBQJ5Ax.js";import"./Stack-BxTuxgLD.js";import"./Typography-D9h2Ip6P.js";import"./styled-BAUq8f3m.js";import"./useThemeProps-CrRSV36O.js";import"./getThemeProps-BC8EGLHF.js";import"./createSvgIcon-DWCmMCDn.js";import"./SvgIcon-YSJMwUPz.js";import"./getValidReactChildren-Bzbz1imH.js";import"./index-BHJ0r4qt.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-DIb6zsEU.js";import"./externalizeComponent-DAaWnwD3.js";import"./context-9Ofit6Eh.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DyhKzT3L.js";import"./converters-DABMUzRG.js";import"./CircularProgress-D6sWrly4.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-VN_i9UT6.js";import"./hooks-BUZRzr8Y.js";import"./useTranslation-D594zgMR.js";import"./IconButton-CSRyS8HJ.js";import"./ButtonBase-BrXE-YKK.js";import"./useTimeout-HlOPIonK.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-CjLCEfgO.js";import"./useControlled-bTet-ea8.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-CZfqZwon.js";import"./useSlotProps-CGBPfxI-.js";import"./Popover-3Smzkt9Z.js";import"./useSlot-Tubf4_hd.js";import"./Paper-CpH6QZqP.js";import"./ownerWindow-HkKU3E4x.js";import"./getActiveElement-DA87hiaC.js";import"./Portal-C6xX7wjm.js";import"./utils-CuUgICqJ.js";import"./Fade-yDZfDAst.js";import"./Alert-xleHOzeU.js";import"./Tab-B6TldVaB.js";import"./Button-BdYVM1mn.js";import"./axis-x-tlkOTcfz.js";import"./rotation-MKSwTtp9.js";import"./JoggingCartesianAxisControl-CWWJGL2N.js";import"./Select-COltPF5v.js";import"./listItemTextClasses-KnCVkcfF.js";import"./MenuItem-CsHaMjLl.js";import"./dividerClasses-DVLYTuFp.js";import"./Box-BPNEVVPQ.js";import"./ToggleButton-DfZN5Dk8.js";import"./VelocitySlider-B4StnU_h.js";import"./Divider-k_a-t-c4.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Theming/Theming components"}),`
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
