import{j as e,M as a,e as i,C as r}from"./iframe-C07m-IKX.js";import{useMDXComponents as n}from"./index-D5cTvBwF.js";import{D as p}from"./JoggingPanel.stories-QQaUVh2g.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-CsJAn4hN.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-v39rqgQk.js";import"./index-Dw_NJvXJ.js";import"./useTheme-Ce2whl9O.js";import"./useLocalObservable-C_sZprEr.js";import"./Stack-zux6E1d2.js";import"./Typography-Jm6qxxhF.js";import"./styled-DcXINnoC.js";import"./useThemeProps-KCR6C5tN.js";import"./getThemeProps-Cx5fvbyg.js";import"./createSvgIcon-CjP9B7RW.js";import"./SvgIcon-b_KZCA-W.js";import"./getValidReactChildren-CyBSny1w.js";import"./index-CIjxX3Ul.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-Cno-CCm3.js";import"./externalizeComponent-Ck7Htujg.js";import"./context-Dcj41OPp.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-DiSPItOJ.js";import"./converters-DABMUzRG.js";import"./CircularProgress-CPE-XVM3.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-B54Ux-lO.js";import"./hooks-Cty_LeQv.js";import"./useTranslation-DB7OsvkX.js";import"./IconButton-BO4uSwn8.js";import"./ButtonBase-BEvr7jey.js";import"./useTimeout-BdGB40KS.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-4mJC9WEy.js";import"./useControlled-Du5ML2Le.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-Y946gwbV.js";import"./useSlotProps-lVEaevsu.js";import"./Popover-BFAjdCvC.js";import"./useSlot-BjU0YYDi.js";import"./Paper-BLdlX3yg.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-B50M1dpa.js";import"./utils-DxvHo6Ug.js";import"./Fade-CL9Xa_a9.js";import"./Alert-CKKnFpqF.js";import"./Tab-BBQnnNFK.js";import"./Button-Dd3x1SNA.js";import"./axis-x-DfWfHvaO.js";import"./rotation-BkXA7jAK.js";import"./JoggingCartesianAxisControl-DHowRa6f.js";import"./Select-Bm8uB5Om.js";import"./listItemTextClasses-87JBuy2K.js";import"./MenuItem-BGSwgp5b.js";import"./dividerClasses-Dxfqqs6s.js";import"./Box-LwGkxjSJ.js";import"./ToggleButton-CcfBxZX8.js";import"./VelocitySlider-S43NYoOd.js";import"./Divider-D3z_ZGRT.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
`,e.jsx(r,{of:p,sourceState:"none"}),`
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
`,e.jsx(r,{of:h,sourceState:"none"})]})}function Te(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(m,{...o})}):m(o)}export{Te as default};
