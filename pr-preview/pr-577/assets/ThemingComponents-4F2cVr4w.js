import{j as e,M as a,e as i,C as r}from"./iframe-BAbLwoVP.js";import{useMDXComponents as n}from"./index-BdSXySMh.js";import{D as p}from"./JoggingPanel.stories-Cn1_2HhV.js";import{JoggingStoryExtendedTheme as s,JoggingStoryReplacedTheme as h}from"./theming.stories-g0X6ZFfE.js";import"./preload-helper-Dp1pzeXC.js";import"./mobx.esm-DvxsEwe8.js";import"./index-oGouDztR.js";import"./useTheme-Ci7JcOyo.js";import"./useLocalObservable-BIBBvgsa.js";import"./Stack-iF9PR87R.js";import"./Typography-Dj9A1KJz.js";import"./styled-CjPHcWNK.js";import"./useThemeProps-SahJ4aIa.js";import"./getThemeProps-BN_77y89.js";import"./createSvgIcon-CISxd6WL.js";import"./SvgIcon-rAAhGlnv.js";import"./getValidReactChildren-CsdyRWRl.js";import"./index-Wo_1NHhm.js";import"./LoginWithAuth0-CEUVGw1--CLoR9YCx.js";import"./index-C_hTTjRw.js";import"./externalizeComponent-CbtIm1gA.js";import"./context-Cpegwh7k.js";import"./motionStateUpdate-DhiNLbY7.js";import"./three.module-JKIWMgkV.js";import"./three.core-CGXRouN8.js";import"./errorHandling-C7w3jKCK.js";import"./converters-DABMUzRG.js";import"./CircularProgress-BY7j-tft.js";import"./isObjectLike-Dipz0mOK.js";import"./JoggingJointValueControl-BIlsh6rq.js";import"./hooks-f9urJFYp.js";import"./useTranslation-u16HVwtV.js";import"./IconButton-DUpKTgEz.js";import"./ButtonBase-CLBSmLNh.js";import"./useTimeout-DcHxBoad.js";import"./isFocusVisible-B8k4qzLc.js";import"./Slider-2roIOQFt.js";import"./useControlled-Bs1xI5T1.js";import"./ownerDocument-DW-IO8s5.js";import"./mergeSlotProps-BBftFkGD.js";import"./useSlotProps-BWZapZRn.js";import"./Popover-BjSURI00.js";import"./useSlot-CZX-5yEn.js";import"./Paper-Vl9WxGDO.js";import"./getActiveElement-DxURyTVq.js";import"./Portal-DTDfDT7O.js";import"./utils-CjtlAP_o.js";import"./Fade-DkzvUp7O.js";import"./Alert-Ga1eBVau.js";import"./Tab-mkh3We2S.js";import"./Button-CX_FRzwU.js";import"./axis-x-B1JVgc7E.js";import"./rotation-BEUHJOHq.js";import"./JoggingCartesianAxisControl-gskiD4U1.js";import"./Select-jvFapZqY.js";import"./listItemTextClasses-EBuWJ8Uu.js";import"./MenuItem-Dli-WI5z.js";import"./dividerClasses-N20-8wuD.js";import"./Box-CYDdlylx.js";import"./ToggleButton-LjmKPOhj.js";import"./VelocitySlider-Bh9ypwTK.js";import"./Divider-Ch9nnPql.js";function m(o){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Theming/Theming components"}),`
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
